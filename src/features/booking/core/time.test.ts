import { describe, expect, it } from "vitest";
import {
  addDaysToKey,
  dateKeyInZone,
  timeZoneOffsetMs,
  wallParts,
  wallTimeToUtc,
  weekdayOfKey,
} from "./time";

describe("wallTimeToUtc", () => {
  it("maps London winter wall time straight to UTC (GMT)", () => {
    expect(wallTimeToUtc("2026-01-15", "09:30", "Europe/London").toISOString()).toBe(
      "2026-01-15T09:30:00.000Z"
    );
  });

  it("shifts London summer wall time back an hour (BST)", () => {
    expect(wallTimeToUtc("2026-07-15", "09:30", "Europe/London").toISOString()).toBe(
      "2026-07-15T08:30:00.000Z"
    );
  });

  it("handles the morning after the spring-forward transition", () => {
    // Clocks go forward 29 March 2026; 09:30 BST is 08:30 UTC.
    expect(wallTimeToUtc("2026-03-29", "09:30", "Europe/London").toISOString()).toBe(
      "2026-03-29T08:30:00.000Z"
    );
  });

  it("handles the morning after the autumn fall-back transition", () => {
    // Clocks go back 25 October 2026; 09:30 GMT is 09:30 UTC.
    expect(wallTimeToUtc("2026-10-25", "09:30", "Europe/London").toISOString()).toBe(
      "2026-10-25T09:30:00.000Z"
    );
  });

  it("supports zones ahead of UTC", () => {
    expect(wallTimeToUtc("2026-08-06", "09:00", "Asia/Kolkata").toISOString()).toBe(
      "2026-08-06T03:30:00.000Z"
    );
  });
});

describe("timeZoneOffsetMs", () => {
  it("reports BST as +1h and GMT as 0", () => {
    expect(timeZoneOffsetMs(new Date("2026-07-01T12:00:00Z"), "Europe/London")).toBe(3_600_000);
    expect(timeZoneOffsetMs(new Date("2026-01-01T12:00:00Z"), "Europe/London")).toBe(0);
  });
});

describe("wallParts / dateKeyInZone", () => {
  it("rolls to the next calendar day past zone midnight", () => {
    expect(dateKeyInZone(new Date("2026-07-15T23:30:00Z"), "Europe/London")).toBe("2026-07-16");
    expect(dateKeyInZone(new Date("2026-01-15T23:30:00Z"), "Europe/London")).toBe("2026-01-15");
  });

  it("reports ISO weekdays", () => {
    // 15 July 2026 is a Wednesday.
    expect(wallParts(new Date("2026-07-15T10:00:00Z"), "Europe/London").weekday).toBe(3);
  });
});

describe("calendar-key helpers", () => {
  it("adds days across month boundaries", () => {
    expect(addDaysToKey("2026-08-30", 3)).toBe("2026-09-02");
    expect(addDaysToKey("2026-01-01", -1)).toBe("2025-12-31");
  });

  it("computes weekday of a key", () => {
    expect(weekdayOfKey("2026-08-10")).toBe(1); // Monday
    expect(weekdayOfKey("2026-08-09")).toBe(7); // Sunday
  });
});
