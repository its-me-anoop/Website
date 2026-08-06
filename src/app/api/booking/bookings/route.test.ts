import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resetRateLimiter } from "@/features/booking/server/rate-limit";
import { GET, POST } from "./route";

const url = "https://flutterly.uk/api/booking/bookings";

function postRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const goodBody = {
  eventTypeId: "consultation",
  startIso: "2026-08-12T09:00:00.000Z",
  name: "Jo Bloggs",
  email: "jo@example.com",
  notes: "",
  timeZone: "Europe/London",
};

let dir: string;

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

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "booking-route-"));
  vi.stubEnv("BOOKING_STORE_FILE", path.join(dir, "bookings.json"));
  vi.stubEnv("BOOKING_AVAILABILITY_FILE", path.join(dir, "availability.json"));
  vi.stubEnv("BOOKING_AVAILABILITY_JSON", openRulesJson);
  vi.useFakeTimers({ now: new Date("2026-08-06T09:00:00Z"), toFake: ["Date"] });
  resetRateLimiter();
});

afterEach(async () => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  await rm(dir, { recursive: true, force: true });
});

describe("POST /api/booking/bookings", () => {
  it("books a free slot and returns the confirmation with an ics file", async () => {
    const response = await POST(postRequest(goodBody));
    expect(response.status).toBe(201);
    const payload = await response.json();
    expect(payload.booking.reference).toMatch(/^FL-/);
    expect(payload.booking.startIso).toBe(goodBody.startIso);
    expect(payload.ics).toContain("BEGIN:VCALENDAR");
    // The client's plain-text details never leak into the response beyond
    // what they submitted.
    expect(payload.booking.email).toBe("jo@example.com");
  });

  it("rejects cross-origin requests", async () => {
    const response = await POST(postRequest(goodBody, { origin: "https://evil.example" }));
    expect(response.status).toBe(403);
  });

  it("rejects invalid payloads with a plain-English error", async () => {
    const response = await POST(postRequest({ ...goodBody, email: "nope" }));
    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.error).toMatch(/email/i);
  });

  it("returns 409 when the slot was just taken", async () => {
    await POST(postRequest(goodBody));
    const response = await POST(postRequest({ ...goodBody, email: "second@example.com" }));
    expect(response.status).toBe(409);
  });

  it("rate-limits repeated bookings from one client", async () => {
    // Six well-spaced slots, distinct emails, one IP: the sixth attempt
    // must trip the sliding-window limit before reaching the store.
    const slots = [
      "2026-08-12T08:30:00.000Z",
      "2026-08-12T09:30:00.000Z",
      "2026-08-12T10:30:00.000Z",
      "2026-08-12T13:00:00.000Z",
      "2026-08-12T14:00:00.000Z",
      "2026-08-12T15:00:00.000Z",
    ];
    const headers = { "x-forwarded-for": "203.0.113.5, 10.0.0.1" };
    const statuses: number[] = [];
    for (const [i, startIso] of slots.entries()) {
      const response = await POST(
        postRequest({ ...goodBody, startIso, email: `client${i}@example.com` }, headers)
      );
      statuses.push(response.status);
    }
    expect(statuses.slice(0, 5)).toEqual([201, 201, 201, 201, 201]);
    expect(statuses[5]).toBe(429);

    // A different client is unaffected.
    const other = await POST(
      postRequest(
        { ...goodBody, startIso: "2026-08-13T08:30:00.000Z", email: "other@example.com" },
        { "x-forwarded-for": "198.51.100.9" }
      )
    );
    expect(other.status).toBe(201);
  });
});

describe("GET /api/booking/bookings", () => {
  it("is unavailable until an admin token is configured", async () => {
    const response = await GET(new Request(url));
    expect(response.status).toBe(503);
  });

  it("requires the right bearer token", async () => {
    vi.stubEnv("BOOKING_ADMIN_TOKEN", "secret-token");
    const denied = await GET(
      new Request(url, { headers: { authorization: "Bearer wrong" } })
    );
    expect(denied.status).toBe(401);

    await POST(postRequest(goodBody));
    const allowed = await GET(
      new Request(url, { headers: { authorization: "Bearer secret-token" } })
    );
    expect(allowed.status).toBe(200);
    const payload = await allowed.json();
    expect(payload.bookings).toHaveLength(1);
    expect(payload.bookings[0].eventTypeName).toBe("Consultation");
  });
});
