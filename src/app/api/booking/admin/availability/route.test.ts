import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET as getAvailability } from "@/app/api/booking/availability/route";
import { GET, PUT } from "./route";

const url = "https://www.flutterly.co.uk/api/booking/admin/availability";

function withToken(init: RequestInit = {}, token = "manage-token-1234567890"): Request {
  return new Request(url, {
    ...init,
    headers: { authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });
}

const mondayRules = {
  timeZone: "Europe/London",
  weeklyWindows: [{ day: 1, start: "10:00", end: "12:00" }],
  minNoticeHours: 18,
  horizonDays: 60,
  bufferMinutes: 15,
};

let dir: string;

beforeEach(async () => {
  vi.useFakeTimers({
    now: new Date("2026-08-08T00:00:00Z"),
    toFake: ["Date"],
  });
  dir = await mkdtemp(path.join(tmpdir(), "booking-admin-"));
  vi.stubEnv("BOOKING_STORE_FILE", path.join(dir, "bookings.json"));
  vi.stubEnv("BOOKING_AVAILABILITY_FILE", path.join(dir, "availability.json"));
  vi.stubEnv("BOOKING_ADMIN_TOKEN", "manage-token-1234567890");
});

afterEach(async () => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  await rm(dir, { recursive: true, force: true });
});

describe("admin availability API", () => {
  it("is unavailable until a token is configured, and rejects wrong tokens", async () => {
    vi.stubEnv("BOOKING_ADMIN_TOKEN", "");
    expect((await GET(new Request(url))).status).toBe(503);
    vi.stubEnv("BOOKING_ADMIN_TOKEN", "manage-token-1234567890");
    expect((await GET(withToken({}, "wrong"))).status).toBe(401);
  });

  it("reports the closed default before the owner adds windows", async () => {
    const response = await GET(withToken());
    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.bookingOpen).toBe(false);
    expect(payload.source).toBe("default");
    expect(payload.rules.weeklyWindows).toEqual([]);
  });

  it("saves owner windows and opens booking with them", async () => {
    const put = await PUT(
      withToken({ method: "PUT", body: JSON.stringify(mondayRules) })
    );
    expect(put.status).toBe(200);
    const saved = await put.json();
    expect(saved.bookingOpen).toBe(true);
    expect(saved.source).toBe("file");
    expect(saved.envJson).toContain('"weeklyWindows"');

    // The public availability API now offers Monday slots.
    const publicResponse = await getAvailability(
      new Request(
        "https://www.flutterly.co.uk/api/booking/availability?eventType=consultation&from=2026-08-09T00:00:00Z&to=2026-08-11T00:00:00Z"
      )
    );
    const publicPayload = await publicResponse.json();
    expect(publicPayload.bookingOpen).toBe(true);
    // 2026-08-10 is a Monday: 10:00 & 10:30 & 11:00 & 11:30 BST fit 30-min slots.
    expect(publicPayload.slots).toContain("2026-08-10T09:00:00.000Z");
  });

  it("clears windows to pause booking entirely", async () => {
    await PUT(withToken({ method: "PUT", body: JSON.stringify(mondayRules) }));
    const paused = await PUT(
      withToken({
        method: "PUT",
        body: JSON.stringify({ ...mondayRules, weeklyWindows: [] }),
      })
    );
    expect((await paused.json()).bookingOpen).toBe(false);

    const publicResponse = await getAvailability(
      new Request(
        "https://www.flutterly.co.uk/api/booking/availability?eventType=consultation&from=2026-08-09T00:00:00Z&to=2026-08-11T00:00:00Z"
      )
    );
    const publicPayload = await publicResponse.json();
    expect(publicPayload.bookingOpen).toBe(false);
    expect(publicPayload.slots).toEqual([]);
  });

  it.each([
    { ...mondayRules, weeklyWindows: [{ day: 8, start: "10:00", end: "12:00" }] },
    { ...mondayRules, weeklyWindows: [{ day: 1, start: "12:00", end: "10:00" }] },
    { ...mondayRules, weeklyWindows: [{ day: 1, start: "25:00", end: "26:00" }] },
    { weeklyWindows: "monday mornings" },
    null,
  ])("rejects invalid rules %#", async (body) => {
    const response = await PUT(withToken({ method: "PUT", body: JSON.stringify(body) }));
    expect(response.status).toBe(400);
  });
});
