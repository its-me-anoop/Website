import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Booking } from "../core/types";

/**
 * File-backed booking persistence. A JSON file keeps the system
 * dependency-free and easy to inspect; the path is swappable via
 * BOOKING_STORE_FILE for hosting environments with a mounted volume.
 *
 * Concurrency: access is funnelled through an in-process queue AND a
 * cross-process advisory lock file (O_CREAT|O_EXCL), so read-check-write
 * cycles cannot interleave between processes sharing one store file.
 * Note the limit: serverless instances that do NOT share a filesystem
 * (default Vercel, where each lambda has its own /tmp) cannot be
 * coordinated by any file lock — see docs/BOOKING.md for the honest
 * durability story there.
 */

export function storeFile(): string {
  if (process.env.BOOKING_STORE_FILE) return process.env.BOOKING_STORE_FILE;
  // Serverless filesystems (e.g. Vercel lambdas) are read-only outside
  // /tmp, so default there when deployed; durability guidance lives in
  // docs/BOOKING.md.
  if (process.env.VERCEL) return path.join("/tmp", "flutterly-bookings.json");
  return path.join(process.cwd(), ".data", "bookings.json");
}

/** A lock older than this is presumed abandoned by a dead process. */
const staleLockMs = 10_000;
const lockWaitMs = 5_000;

async function acquireFileLock(file: string): Promise<() => Promise<void>> {
  const lockPath = `${file}.lock`;
  await mkdir(path.dirname(file), { recursive: true });
  const deadline = Date.now() + lockWaitMs;
  for (;;) {
    try {
      await writeFile(lockPath, String(process.pid), { flag: "wx" });
      return () => rm(lockPath, { force: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      try {
        const info = await stat(lockPath);
        if (Date.now() - info.mtimeMs > staleLockMs) {
          await rm(lockPath, { force: true });
          continue;
        }
      } catch {
        continue; // The holder released between our attempt and stat.
      }
      if (Date.now() > deadline) {
        throw new Error("Timed out waiting for the booking store lock.");
      }
      await new Promise((resolve) => setTimeout(resolve, 25 + Math.random() * 50));
    }
  }
}

const queues = new Map<string, Promise<unknown>>();

/**
 * Serialise access to a file in-process (per-path promise queue), then
 * across processes (the advisory lock file).
 */
export function withFileLock<T>(file: string, fn: () => Promise<T>): Promise<T> {
  const critical = async () => {
    const release = await acquireFileLock(file);
    try {
      return await fn();
    } finally {
      await release();
    }
  };
  const queue = queues.get(file) ?? Promise.resolve();
  const next = queue.then(critical, critical);
  // Keep the chain alive whether or not the section throws.
  queues.set(file, next.catch(() => undefined));
  return next;
}

/** Serialise booking-store access. */
export function withStoreLock<T>(fn: () => Promise<T>): Promise<T> {
  return withFileLock(storeFile(), fn);
}

export async function loadBookings(): Promise<Booking[]> {
  try {
    const raw = await readFile(storeFile(), "utf8");
    const parsed = JSON.parse(raw) as { bookings?: Booking[] };
    return Array.isArray(parsed.bookings) ? parsed.bookings : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function persistBookings(bookings: readonly Booking[]): Promise<void> {
  const file = storeFile();
  await mkdir(path.dirname(file), { recursive: true });
  // Write-then-rename keeps the store readable if the process dies mid-write.
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify({ bookings }, null, 2), "utf8");
  await rename(tmp, file);
}
