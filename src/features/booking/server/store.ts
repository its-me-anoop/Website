import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Booking } from "../core/types";

/**
 * File-backed booking persistence. A JSON file keeps the system
 * dependency-free and easy to inspect; the path is swappable via
 * BOOKING_STORE_FILE for hosting environments with a mounted volume.
 * All access is funnelled through a process-wide queue so concurrent
 * requests cannot interleave a read-check-write cycle.
 */

export function storeFile(): string {
  if (process.env.BOOKING_STORE_FILE) return process.env.BOOKING_STORE_FILE;
  // Serverless filesystems (e.g. Vercel lambdas) are read-only outside
  // /tmp, so default there when deployed; durability guidance lives in
  // docs/BOOKING.md.
  if (process.env.VERCEL) return path.join("/tmp", "flutterly-bookings.json");
  return path.join(process.cwd(), ".data", "bookings.json");
}

let queue: Promise<unknown> = Promise.resolve();

/** Serialise store access: each critical section runs after the last. */
export function withStoreLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  // Keep the chain alive whether or not the section throws.
  queue = next.catch(() => undefined);
  return next;
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
