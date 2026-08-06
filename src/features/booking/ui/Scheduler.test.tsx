import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { getEventType } from "../core/config";
import { Scheduler } from "./Scheduler";

const consultation = getEventType("consultation")!;

/** Slots the mocked availability API offers (UTC; jsdom runs in UTC). */
const offeredSlots = [
  "2026-08-12T09:00:00.000Z",
  "2026-08-12T09:30:00.000Z",
  "2026-08-13T14:00:00.000Z",
];

const confirmedBooking = {
  booking: {
    reference: "FL-TEST2345",
    eventTypeId: "consultation",
    startIso: "2026-08-12T09:00:00.000Z",
    endIso: "2026-08-12T09:30:00.000Z",
    name: "Jo Bloggs",
    email: "jo@example.com",
    timeZone: "UTC",
  },
  ics: "BEGIN:VCALENDAR\r\nEND:VCALENDAR\r\n",
};

function renderScheduler() {
  return render(
    <LazyMotion features={domMax} strict>
      <Scheduler eventType={consultation} />
    </LazyMotion>
  );
}

beforeEach(() => {
  vi.useFakeTimers({ now: new Date("2026-08-10T09:00:00Z"), toFake: ["Date"] });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/booking/availability")) {
        return new Response(
          JSON.stringify({
            slots: offeredSlots,
            durationMinutes: 30,
            hostTimeZone: "Europe/London",
            horizonDays: 60,
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/booking/bookings") && init?.method === "POST") {
        return new Response(JSON.stringify(confirmedBooking), { status: 201 });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Scheduler", () => {
  it("walks from calendar to confirmed booking", async () => {
    renderScheduler();

    expect(
      screen.getByRole("heading", { level: 1, name: consultation.name })
    ).toBeInTheDocument();

    // Availability loads for the current month and the first open day is
    // preselected, showing its times.
    const firstSlot = await screen.findByRole("button", { name: "09:00" });
    expect(screen.getByRole("button", { name: "09:30" })).toBeInTheDocument();

    // A day without slots is disabled.
    expect(
      screen.getByRole("button", { name: /Tuesday 11 August — no times/ })
    ).toBeDisabled();

    fireEvent.click(firstSlot);
    expect(screen.getByText(/Confirm your consultation/i)).toBeInTheDocument();
    expect(document.body.textContent).toContain("Wednesday, 12 August 2026, 09:00–09:30");

    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: "Jo Bloggs" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jo@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /confirm booking/i }));

    expect(
      await screen.findByRole("heading", { name: /you.re booked in/i })
    ).toBeInTheDocument();
    expect(screen.getByText("FL-TEST2345")).toBeInTheDocument();
    const icsLink = screen.getByRole("link", { name: /add to calendar/i });
    expect(icsLink).toHaveAttribute("download", "flutterly-FL-TEST2345.ics");
    expect(icsLink.getAttribute("href")).toMatch(/^data:text\/calendar/);
  });

  it("returns to the calendar when the slot was taken meanwhile", async () => {
    const fetchMock = globalThis.fetch as ReturnType<typeof vi.fn>;
    fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/booking/availability")) {
        return new Response(
          JSON.stringify({
            slots: offeredSlots,
            durationMinutes: 30,
            hostTimeZone: "Europe/London",
            horizonDays: 60,
          }),
          { status: 200 }
        );
      }
      return new Response(
        JSON.stringify({ error: "That time has just been taken. Pick another slot." }),
        { status: 409 }
      );
    });

    renderScheduler();
    fireEvent.click(await screen.findByRole("button", { name: "09:00" }));
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Jo" } });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jo@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /confirm booking/i }));

    // Back on the picker with the conflict explained.
    await waitFor(() =>
      expect(screen.getByText(/just been taken/i)).toBeInTheDocument()
    );
    expect(screen.getByRole("button", { name: /previous month/i })).toBeInTheDocument();

    // Picking another slot shows the form with the typed details intact.
    fireEvent.click(screen.getByRole("button", { name: "09:30" }));
    expect(screen.getByLabelText(/your name/i)).toHaveValue("Jo");
    expect(screen.getByLabelText(/email address/i)).toHaveValue("jo@example.com");
  });
});
