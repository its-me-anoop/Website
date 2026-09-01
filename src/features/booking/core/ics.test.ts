import { describe, expect, it } from "vitest";
import { getEventType } from "./config";
import { buildIcs } from "./ics";
import type { Booking } from "./types";

const booking: Booking = {
  reference: "FL-7K2M9QDW",
  eventTypeId: "consultation",
  startIso: "2026-08-12T08:30:00.000Z",
  endIso: "2026-08-12T09:00:00.000Z",
  name: "Jo, from Willowbrook; PM",
  email: "jo@example.com",
  notes: "",
  timeZone: "Europe/London",
  status: "confirmed",
  createdAtIso: "2026-08-06T09:00:00.000Z",
};

describe("buildIcs", () => {
  const ics = buildIcs(booking, getEventType("consultation")!);

  it("emits a valid calendar envelope with UTC times", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("DTSTART:20260812T083000Z");
    expect(ics).toContain("DTEND:20260812T090000Z");
    expect(ics).toContain("DTSTAMP:20260806T090000Z");
    expect(ics).toContain("UID:fl-7k2m9qdw@flutterly.co.uk");
  });

  it("escapes text values and references the booking", () => {
    // Unfold continuation lines before asserting on content.
    const unfolded = ics.replace(/\r\n /g, "");
    expect(unfolded).toContain("Booking reference: FL-7K2M9QDW");
    // Escaped newline separators inside DESCRIPTION.
    expect(unfolded).toContain("\\n");
  });

  it("folds every line to 75 octets or fewer", () => {
    for (const line of ics.split("\r\n")) {
      expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    }
  });
});
