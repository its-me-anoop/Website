import { mkdtemp, readFile, rm, stat, utimes, writeFile } from "node:fs/promises";
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

/** Owner availability for tests: Mon–Fri, two London windows. */
const openRulesJson = JSON.stringify({
  timeZone: "Europe/London",
  weeklyWindows: [1, 2, 3, 4, 5].flatMap((day) => [
    { day, start: "09:30", end: "12:30" },
    { day, start: "14:00", end: "17:30" },
  ]),
  minNoticeHours: 18,
  horizonDays: 60,
  bufferMinutes: 15,
});

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "booking-store-"));
  vi.stubEnv("BOOKING_STORE_FILE", path.join(dir, "bookings.json"));
  vi.stubEnv("BOOKING_AVAILABILITY_FILE", path.join(dir, "availability.json"));
  vi.stubEnv("BOOKING_AVAILABILITY_JSON", openRulesJson);
});

afterEach(async () => {
  vi.unstubAllEnvs();
  await rm(dir, { recursive: true, force: true });
});

describe("storeFile", () => {
  it("prefers the explicit path, then /tmp on serverless, then .data", async () => {
    const { storeFile } = await import("./store");
    expect(storeFile()).toBe(path.join(dir, "bookings.json"));

    vi.stubEnv("BOOKING_STORE_FILE", "");
    vi.stubEnv("VERCEL", "1");
    expect(storeFile()).toBe("/tmp/flutterly-bookings.json");

    vi.stubEnv("VERCEL", "");
    expect(storeFile().endsWith(path.join(".data", "bookings.json"))).toBe(true);
  });
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

  it("rejects every booking when no availability is configured", async () => {
    vi.stubEnv("BOOKING_AVAILABILITY_JSON", "");
    const result = await createBooking(request, now);
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

  it("caps how many upcoming bookings one email can hold", async () => {
    // Three well-spaced slots on the same day (clear of each other's buffers).
    for (const startIso of [
      "2026-08-12T08:30:00.000Z",
      "2026-08-12T09:30:00.000Z",
      "2026-08-12T10:30:00.000Z",
    ]) {
      const result = await createBooking({ ...request, startIso }, now);
      expect(result.ok).toBe(true);
    }
    const fourth = await createBooking(
      { ...request, startIso: "2026-08-12T13:00:00.000Z", email: "JO@example.com" },
      now
    );
    expect(fourth).toMatchObject({ ok: false, status: 409 });
    if (!fourth.ok) expect(fourth.error).toMatch(/already has several calls/i);
  });

  it("waits for another process's store lock instead of interleaving", async () => {
    const lockPath = path.join(dir, "bookings.json.lock");
    await writeFile(lockPath, "99999", { flag: "wx" });
    let released = false;
    setTimeout(() => {
      released = true;
      void rm(lockPath, { force: true });
    }, 150);
    const result = await createBooking(request, now);
    expect(released).toBe(true);
    expect(result.ok).toBe(true);
  });

  it("steals a stale lock left by a dead process", async () => {
    const lockPath = path.join(dir, "bookings.json.lock");
    await writeFile(lockPath, "99999", { flag: "wx" });
    const old = (Date.now() - 60_000) / 1000;
    await utimes(lockPath, old, old);
    const result = await createBooking(request, now);
    expect(result.ok).toBe(true);
    // The lock is released again after the critical section.
    await expect(stat(lockPath)).rejects.toMatchObject({ code: "ENOENT" });
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
