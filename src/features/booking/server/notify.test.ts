import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getEventType } from "../core/config";
import type { Booking } from "../core/types";
import { notifyNewBooking } from "./notify";

const consultation = getEventType("consultation")!;

const booking: Booking = {
  reference: "FL-TEST2345",
  eventTypeId: "consultation",
  startIso: "2026-08-12T09:00:00.000Z",
  endIso: "2026-08-12T09:30:00.000Z",
  name: "Jo Bloggs",
  email: "jo@example.com",
  notes: "Care home rebuild",
  timeZone: "America/New_York",
  status: "confirmed",
  createdAtIso: "2026-08-06T09:00:00.000Z",
};

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("notifyNewBooking", () => {
  it("does nothing when no channel is configured", async () => {
    await notifyNewBooking(booking, consultation);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("emails the owner via Resend when a key is set", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv("BOOKING_NOTIFY_EMAIL", "owner@example.com");
    await notifyNewBooking(booking, consultation);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test_123");
    const payload = JSON.parse(String(init.body));
    expect(payload.to).toEqual(["owner@example.com"]);
    expect(payload.reply_to).toBe("jo@example.com");
    expect(payload.subject).toMatch(/New booking: Consultation with Jo Bloggs/);
    // Owner-facing times are UK wall clock regardless of client timezone.
    expect(payload.subject).toContain("10:00–10:30 (UK time)");
    expect(payload.text).toContain("Reference: FL-TEST2345");
    expect(payload.text).toContain("Booked in timezone: America/New_York");
  });

  it("sends both channels when both are configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv("BOOKING_NOTIFY_WEBHOOK", "https://hooks.example.com/bookings");
    await notifyNewBooking(booking, consultation);
    const urls = fetchMock.mock.calls.map((call) => String(call[0])).sort();
    expect(urls).toEqual(["https://api.resend.com/emails", "https://hooks.example.com/bookings"]);
  });

  it("swallows channel failures", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    fetchMock.mockRejectedValueOnce(new Error("network down"));
    await expect(notifyNewBooking(booking, consultation)).resolves.toBeUndefined();
  });
});
