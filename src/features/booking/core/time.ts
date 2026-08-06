/**
 * Dependency-free timezone arithmetic built on Intl. Availability rules
 * are wall times in the host timezone; everything exchanged with clients
 * is a UTC instant. These helpers convert between the two without
 * assuming a fixed offset, so GMT/BST transitions stay correct.
 */

export type WallParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  /** ISO weekday: 1 = Monday … 7 = Sunday. */
  weekday: number;
};

const partFormatters = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = partFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
      hour12: false,
    });
    partFormatters.set(timeZone, formatter);
  }
  return formatter;
}

const isoWeekdays: Record<string, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

/** Wall-clock parts of a UTC instant, observed in the given timezone. */
export function wallParts(instant: Date, timeZone: string): WallParts {
  const parts: Record<string, string> = {};
  for (const part of getFormatter(timeZone).formatToParts(instant)) {
    parts[part.type] = part.value;
  }
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    // "24" can appear for midnight in some ICU versions; normalise it.
    hour: Number(parts.hour) % 24,
    minute: Number(parts.minute),
    weekday: isoWeekdays[parts.weekday] ?? 0,
  };
}

/** Zone offset (zone − UTC) in milliseconds at the given instant. */
export function timeZoneOffsetMs(instant: Date, timeZone: string): number {
  const wall = wallParts(instant, timeZone);
  const asUtc = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute);
  const truncated = Math.floor(instant.getTime() / 60000) * 60000;
  return asUtc - truncated;
}

/**
 * The UTC instant at which a wall clock in `timeZone` shows the given
 * date and "HH:MM" time. Two-pass offset resolution handles daylight
 * saving; times skipped by a spring-forward resolve to the shifted
 * clock, which is acceptable for slot generation.
 */
export function wallTimeToUtc(dateKey: string, time: string, timeZone: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const firstOffset = timeZoneOffsetMs(new Date(guess), timeZone);
  const candidate = guess - firstOffset;
  const secondOffset = timeZoneOffsetMs(new Date(candidate), timeZone);
  return new Date(guess - secondOffset);
}

/** "YYYY-MM-DD" of an instant as observed in the given timezone. */
export function dateKeyInZone(instant: Date, timeZone: string): string {
  const wall = wallParts(instant, timeZone);
  return `${wall.year}-${String(wall.month).padStart(2, "0")}-${String(wall.day).padStart(2, "0")}`;
}

/** Pure calendar-date arithmetic on "YYYY-MM-DD" keys. */
export function addDaysToKey(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return shifted.toISOString().slice(0, 10);
}

/** ISO weekday (1–7) of a calendar date key, independent of timezone. */
export function weekdayOfKey(dateKey: string): number {
  const [year, month, day] = dateKey.split("-").map(Number);
  const utcDay = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return utcDay === 0 ? 7 : utcDay;
}
