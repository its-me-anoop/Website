import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultAvailabilityRules } from "../core/config";
import type { AvailabilityRules, WeeklyWindow } from "../core/types";
import { withFileLock } from "./store";

/**
 * Owner-editable availability rules. Resolution order:
 *
 *   1. The rules file written by /book/manage (immediate local truth).
 *   2. BOOKING_AVAILABILITY_JSON — the durable bootstrap on serverless
 *      hosts whose filesystems reset (default Vercel): paste the JSON
 *      shown by /book/manage into the hosting env.
 *   3. The default: CLOSED (no windows, nothing bookable).
 */

export function availabilityFile(): string {
  if (process.env.BOOKING_AVAILABILITY_FILE) return process.env.BOOKING_AVAILABILITY_FILE;
  if (process.env.VERCEL) return path.join("/tmp", "flutterly-availability.json");
  return path.join(process.cwd(), ".data", "availability.json");
}

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Validate untrusted rules JSON; returns null when unusable. */
export function parseAvailabilityRules(raw: unknown): AvailabilityRules | null {
  if (typeof raw !== "object" || raw === null) return null;
  const record = raw as Record<string, unknown>;

  const windowsInput = Array.isArray(record.weeklyWindows) ? record.weeklyWindows : null;
  if (!windowsInput || windowsInput.length > 21) return null;
  const weeklyWindows: WeeklyWindow[] = [];
  for (const item of windowsInput) {
    if (typeof item !== "object" || item === null) return null;
    const { day, start, end } = item as Record<string, unknown>;
    if (
      typeof day !== "number" ||
      !Number.isInteger(day) ||
      day < 1 ||
      day > 7 ||
      typeof start !== "string" ||
      typeof end !== "string" ||
      !timePattern.test(start) ||
      !timePattern.test(end) ||
      start >= end
    ) {
      return null;
    }
    weeklyWindows.push({ day, start, end });
  }

  const numberIn = (value: unknown, min: number, max: number, fallback: number) =>
    typeof value === "number" && Number.isFinite(value) && value >= min && value <= max
      ? value
      : fallback;

  const defaults = defaultAvailabilityRules;
  const timeZone =
    typeof record.timeZone === "string" && isValidTimeZone(record.timeZone)
      ? record.timeZone
      : defaults.timeZone;

  return {
    timeZone,
    weeklyWindows: weeklyWindows.sort(
      (a, b) => a.day - b.day || a.start.localeCompare(b.start)
    ),
    minNoticeHours: numberIn(record.minNoticeHours, 0, 336, defaults.minNoticeHours),
    horizonDays: numberIn(record.horizonDays, 1, 365, defaults.horizonDays),
    bufferMinutes: numberIn(record.bufferMinutes, 0, 120, defaults.bufferMinutes),
  };
}

function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone });
    return true;
  } catch {
    return false;
  }
}

async function readRulesFile(): Promise<AvailabilityRules | null> {
  try {
    const raw = await readFile(availabilityFile(), "utf8");
    return parseAvailabilityRules(JSON.parse(raw));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    console.error("Availability rules file could not be read", error);
    return null;
  }
}

function readRulesEnv(): AvailabilityRules | null {
  const raw = process.env.BOOKING_AVAILABILITY_JSON;
  if (!raw) return null;
  try {
    return parseAvailabilityRules(JSON.parse(raw));
  } catch {
    console.error("BOOKING_AVAILABILITY_JSON is not valid JSON; ignoring it.");
    return null;
  }
}

export type ResolvedAvailability = {
  rules: AvailabilityRules;
  source: "file" | "env" | "default";
};

export async function resolveAvailability(): Promise<ResolvedAvailability> {
  const fromFile = await readRulesFile();
  if (fromFile) return { rules: fromFile, source: "file" };
  const fromEnv = readRulesEnv();
  if (fromEnv) return { rules: fromEnv, source: "env" };
  return { rules: defaultAvailabilityRules, source: "default" };
}

export async function saveAvailability(rules: AvailabilityRules): Promise<void> {
  const file = availabilityFile();
  await withFileLock(file, async () => {
    await mkdir(path.dirname(file), { recursive: true });
    const tmp = `${file}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(rules, null, 2), "utf8");
    await rename(tmp, file);
  });
}
