import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createBooking, listBookings, validateBookingRequest } from "./bookings";
import type { BookingRequest } from "../core/types";

/** A Wednesday 10:00 BST slot, comfortably inside notice and horizon. */
const slotIso = "2026-08-12T09:00:00.000Z";
const now = new Date("2026-08-06T09:00:00Z");

const request: BookingRequest = {
  eventTypeId: "consultation",
  startIso: slotIso,
  name: "Jo Bloggs",
  email: "jo@example.com",
  notes: "Care home site rebuild",
  timeZone: "Europe/London",
};

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "booking-store-"));
  vi.stubEnv("BOOKING_STORE_FILE", path.join(dir, "bookings.json"));
});

afterEach(async () => {
  vi.unstubAllEnvs();
  await rm(dir, { recursive: true, force: true });
});

describe("createBooking", () => {
  it("persists a confirmed booking and computes its end time", async () => {
    const result = await createBooking(request, now);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.booking.reference).toMatch(/^FL-[2-9A-HJKMNP-Z]{8}$/);
    expect(result.booking.endIso).toBe("2026-08-12T09:30:00.000Z");
    expect(result.booking.status).toBe("confirmed");

    const raw = JSON.parse(await readFile(path.join(dir, "bookings.json"), "utf8"));
    expect(raw.bookings).toHaveLength(1);
    expect(raw.bookings[0].email).toBe("jo@example.com");
  });

  it("rejects a slot outside the offered grid", async () => {
    const result = await createBooking({ ...request, startIso: "2026-08-12T09:10:00.000Z" }, now);
    expect(result).toMatchObject({ ok: false, status: 409 });
  });

  it("refuses to double-book, even for concurrent requests", async () => {
    const [first, second] = await Promise.all([
      createBooking(request, now),
      createBooking({ ...request, name: "Sam Rival", email: "sam@example.com" }, now),
    ]);
    const outcomes = [first.ok, second.ok].sort();
    expect(outcomes).toEqual([false, true]);
    expect(await listBookings()).toHaveLength(1);
  });

  it("blocks adjacent slots via the buffer once booked", async () => {
    await createBooking(request, now);
    const adjacent = await createBooking(
      { ...request, startIso: "2026-08-12T09:30:00.000Z", email: "next@example.com" },
      now
    );
    expect(adjacent).toMatchObject({ ok: false, status: 409 });
  });
});

describe("validateBookingRequest", () => {
  it("normalises a good request", () => {
    const parsed = validateBookingRequest({
      eventTypeId: "intro-call",
      startIso: "2026-08-12T09:00:00Z",
      name: "  Jo  ",
      email: "jo@example.com",
      notes: "hello",
      timeZone: "America/New_York",
    });
    expect(parsed).toMatchObject({
      eventTypeId: "intro-call",
      startIso: "2026-08-12T09:00:00.000Z",
      name: "Jo",
      timeZone: "America/New_York",
    });
  });

  it("falls back to the host timezone when the client's is invalid", () => {
    const parsed = validateBookingRequest({ ...request, timeZone: "Mars/Olympus" });
    expect(parsed).toMatchObject({ timeZone: "Europe/London" });
  });

  it.each([
    [{ ...request, eventTypeId: "walk-in" }, /call type/i],
    [{ ...request, startIso: "whenever" }, /time/i],
    [{ ...request, name: "" }, /name/i],
    [{ ...request, email: "not-an-email" }, /email/i],
    [null, /could not be read/i],
  ])("rejects bad input %#", (body, message) => {
    const parsed = validateBookingRequest(body);
    expect(parsed).toHaveProperty("error");
    if ("error" in parsed) expect(parsed.error).toMatch(message);
  });
});
