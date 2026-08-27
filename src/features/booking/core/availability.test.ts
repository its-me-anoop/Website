import { describe, expect, it } from "vitest";
import { isSlotAvailable, listAvailableSlots } from "./availability";
import { getEventType } from "./config";
import type { AvailabilityRules, Booking } from "./types";

const consultation = getEventType("consultation")!;
const scoping = getEventType("project-scoping")!;

/** A quiet Thursday morning, well inside the horizon. */
const now = new Date("2026-08-06T09:00:00Z");

/** The owner's example schedule: Mon–Fri, two windows, London time. */
const weekdayWindows = [1, 2, 3, 4, 5].flatMap((day) => [
  { day, start: "09:30", end: "12:30" },
  { day, start: "14:00", end: "17:30" },
]);

const openRules: AvailabilityRules = {
  timeZone: "Europe/London",
  weeklyWindows: weekdayWindows,
  minNoticeHours: 18,
  horizonDays: 60,
  bufferMinutes: 15,
};

function slotsOn(dateKey: string, bookings: Booking[] = [], rules = openRules) {
  return listAvailableSlots({
    eventType: consultation,
    from: new Date(`${dateKey}T00:00:00Z`),
    to: new Date(`${dateKey}T23:59:59Z`),
    bookings,
    now,
    rules,
  });
}

function makeBooking(overrides: Partial<Booking>): Booking {
  return {
    reference: "FL-TEST2345",
    eventTypeId: "consultation",
    startIso: "2026-08-12T09:00:00.000Z",
    endIso: "2026-08-12T09:30:00.000Z",
    name: "Test Client",
    email: "client@example.com",
    notes: "",
    timeZone: "Europe/London",
    status: "confirmed",
    createdAtIso: now.toISOString(),
    ...overrides,
  };
}

describe("listAvailableSlots", () => {
  it("offers nothing at all by default: booking starts closed", () => {
    const slots = listAvailableSlots({
      eventType: consultation,
      from: new Date("2026-08-10T00:00:00Z"),
      to: new Date("2026-09-10T00:00:00Z"),
      bookings: [],
      now,
    });
    expect(slots).toEqual([]);
  });

  it("offers duration-stepped slots inside both working windows (BST)", () => {
    const slots = slotsOn("2026-08-12"); // a Wednesday
    // 09:30–12:30 London = 6 half-hour slots, 14:00–17:30 = 7.
    expect(slots).toHaveLength(13);
    expect(slots[0]).toBe("2026-08-12T08:30:00.000Z"); // 09:30 BST
    expect(slots[5]).toBe("2026-08-12T11:00:00.000Z"); // 12:00 BST
    expect(slots[6]).toBe("2026-08-12T13:00:00.000Z"); // 14:00 BST
    expect(slots[12]).toBe("2026-08-12T16:00:00.000Z"); // 17:00 BST
  });

  it("offers slots at UTC wall times in winter (GMT)", () => {
    const winterNow = new Date("2026-01-06T09:00:00Z");
    const slots = listAvailableSlots({
      eventType: consultation,
      from: new Date("2026-01-14T00:00:00Z"),
      to: new Date("2026-01-14T23:59:59Z"),
      bookings: [],
      now: winterNow,
      rules: openRules,
    });
    expect(slots[0]).toBe("2026-01-14T09:30:00.000Z");
  });

  it("only offers days that have windows", () => {
    expect(slotsOn("2026-08-08")).toEqual([]); // Saturday
    expect(slotsOn("2026-08-09")).toEqual([]); // Sunday
    // A Saturday-only schedule inverts that.
    const weekendRules: AvailabilityRules = {
      ...openRules,
      weeklyWindows: [{ day: 6, start: "10:00", end: "12:00" }],
    };
    expect(slotsOn("2026-08-08", [], weekendRules)).toHaveLength(4);
    expect(slotsOn("2026-08-12", [], weekendRules)).toEqual([]);
  });

  it("respects minimum notice", () => {
    // Now is Thursday 09:00Z; 18h notice reaches into Friday 03:00Z,
    // so nothing is left today but all of Friday remains.
    expect(slotsOn("2026-08-06")).toEqual([]);
    expect(slotsOn("2026-08-07")).toHaveLength(13);
  });

  it("respects the booking horizon", () => {
    expect(slotsOn("2026-11-04")).toEqual([]); // > 60 days out
  });

  it("blocks slots that collide with a booking, including buffers", () => {
    // Existing 10:00–10:30 BST booking (09:00–09:30Z) with 15-min buffer.
    const slots = slotsOn("2026-08-12", [makeBooking({})]);
    expect(slots).not.toContain("2026-08-12T08:30:00.000Z"); // ends inside buffer
    expect(slots).not.toContain("2026-08-12T09:00:00.000Z"); // exact overlap
    expect(slots).not.toContain("2026-08-12T09:30:00.000Z"); // starts inside buffer
    expect(slots).toContain("2026-08-12T10:00:00.000Z"); // clear of buffer
  });

  it("ignores cancelled bookings", () => {
    const slots = slotsOn("2026-08-12", [makeBooking({ status: "cancelled" })]);
    expect(slots).toContain("2026-08-12T09:00:00.000Z");
  });

  it("steps hour-long sessions so they fit the windows", () => {
    const slots = listAvailableSlots({
      eventType: scoping,
      from: new Date("2026-08-12T00:00:00Z"),
      to: new Date("2026-08-12T23:59:59Z"),
      bookings: [],
      now,
      rules: openRules,
    });
    // 09:30–12:30 fits 3 hour slots; 14:00–17:30 fits 3 (17:00 start would overrun).
    expect(slots).toHaveLength(6);
    expect(slots).not.toContain("2026-08-12T16:00:00.000Z");
  });

  it("treats the query window as half-open so month fetches never overlap", () => {
    // The client fetches [monthStart, nextMonthStart); a slot starting
    // exactly at `to` must belong to the next window only.
    const slots = listAvailableSlots({
      eventType: consultation,
      from: new Date("2026-08-12T00:00:00Z"),
      to: new Date("2026-08-12T08:30:00.000Z"),
      bookings: [],
      now,
      rules: openRules,
    });
    expect(slots).not.toContain("2026-08-12T08:30:00.000Z");
  });
});

describe("isSlotAvailable", () => {
  it("accepts an offered slot and rejects everything else", () => {
    expect(isSlotAvailable(consultation, "2026-08-12T08:30:00.000Z", [], now, openRules)).toBe(true);
    // 09:47 BST is not on the grid.
    expect(isSlotAvailable(consultation, "2026-08-12T08:47:00.000Z", [], now, openRules)).toBe(false);
    // No window that day.
    expect(isSlotAvailable(consultation, "2026-08-08T09:00:00.000Z", [], now, openRules)).toBe(false);
    // Garbage input.
    expect(isSlotAvailable(consultation, "not-a-date", [], now, openRules)).toBe(false);
  });

  it("rejects everything when booking is closed (the default)", () => {
    expect(isSlotAvailable(consultation, "2026-08-12T08:30:00.000Z", [], now)).toBe(false);
  });

  it("rejects a slot already taken", () => {
    expect(
      isSlotAvailable(consultation, "2026-08-12T09:00:00.000Z", [makeBooking({})], now, openRules)
    ).toBe(false);
  });
});
