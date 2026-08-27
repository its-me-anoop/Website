import { defaultAvailabilityRules } from "./config";
import { addDaysToKey, dateKeyInZone, wallTimeToUtc, weekdayOfKey } from "./time";
import type { AvailabilityRules, Booking, EventType } from "./types";

function parseMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function formatMinutes(totalMinutes: number): string {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

type SlotQuery = {
  eventType: EventType;
  /** Half-open window of interest; clamped to notice and horizon rules. */
  from: Date;
  to: Date;
  /** Existing bookings to avoid; cancelled ones are ignored. */
  bookings: readonly Booking[];
  now: Date;
  rules?: AvailabilityRules;
};

/**
 * All bookable slot starts (UTC ISO, sorted) for an event type between
 * two instants. Slots step by the event's own duration inside each
 * weekly window — the cal.com default — and respect minimum notice,
 * the booking horizon, and buffers around existing bookings. With no
 * windows configured (the default) there are never any slots.
 */
export function listAvailableSlots({
  eventType,
  from,
  to,
  bookings,
  now,
  rules = defaultAvailabilityRules,
}: SlotQuery): string[] {
  if (rules.weeklyWindows.length === 0) return [];

  const earliest = Math.max(
    from.getTime(),
    now.getTime() + rules.minNoticeHours * 3_600_000
  );
  const latest = Math.min(
    to.getTime() - 1,
    now.getTime() + rules.horizonDays * 86_400_000
  );
  if (earliest > latest) return [];

  const busy = bookings
    .filter((booking) => booking.status === "confirmed")
    .map((booking) => ({
      start: Date.parse(booking.startIso) - rules.bufferMinutes * 60_000,
      end: Date.parse(booking.endIso) + rules.bufferMinutes * 60_000,
    }));

  const durationMs = eventType.durationMinutes * 60_000;
  const slots: string[] = [];

  let dateKey = dateKeyInZone(new Date(earliest), rules.timeZone);
  const lastKey = dateKeyInZone(new Date(latest), rules.timeZone);
  while (dateKey <= lastKey) {
    const weekday = weekdayOfKey(dateKey);
    for (const window of rules.weeklyWindows) {
      if (window.day !== weekday) continue;
      const windowStart = parseMinutes(window.start);
      const windowEnd = parseMinutes(window.end);
      for (
        let minutes = windowStart;
        minutes + eventType.durationMinutes <= windowEnd;
        minutes += eventType.durationMinutes
      ) {
        const start = wallTimeToUtc(dateKey, formatMinutes(minutes), rules.timeZone);
        const startMs = start.getTime();
        const endMs = startMs + durationMs;
        if (startMs < earliest || startMs > latest) continue;
        if (busy.some((b) => startMs < b.end && endMs > b.start)) continue;
        slots.push(start.toISOString());
      }
    }
    dateKey = addDaysToKey(dateKey, 1);
  }

  return slots.sort();
}

/** True when the requested start is one of the currently offered slots. */
export function isSlotAvailable(
  eventType: EventType,
  startIso: string,
  bookings: readonly Booking[],
  now: Date,
  rules: AvailabilityRules = defaultAvailabilityRules
): boolean {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return false;
  const slots = listAvailableSlots({
    eventType,
    from: new Date(start.getTime() - 1),
    to: new Date(start.getTime() + 2),
    bookings,
    now,
    rules,
  });
  return slots.includes(start.toISOString());
}
