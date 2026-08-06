import { NextResponse } from "next/server";
import { listAvailableSlots } from "@/features/booking/core/availability";
import { getEventType } from "@/features/booking/core/config";
import { resolveAvailability } from "@/features/booking/server/availability-store";
import { listBookings } from "@/features/booking/server/bookings";

/** Longest window a single request may ask for, in milliseconds. */
const maxSpanMs = 45 * 86_400_000;

/**
 * GET /api/booking/availability?eventType=consultation&from=…&to=…
 * Returns bookable slot starts (UTC ISO) between two instants, plus
 * whether booking is open at all (the owner may have no availability
 * configured). The client groups slots by day in the visitor's own
 * timezone.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const eventType = getEventType(url.searchParams.get("eventType") ?? "");
  if (!eventType) {
    return NextResponse.json({ error: "Unknown call type." }, { status: 404 });
  }

  const from = Date.parse(url.searchParams.get("from") ?? "");
  const to = Date.parse(url.searchParams.get("to") ?? "");
  if (Number.isNaN(from) || Number.isNaN(to) || to <= from) {
    return NextResponse.json(
      { error: "Provide a valid from/to window as ISO dates." },
      { status: 400 }
    );
  }
  if (to - from > maxSpanMs) {
    return NextResponse.json({ error: "Ask for 45 days at most." }, { status: 400 });
  }

  const { rules } = await resolveAvailability();
  const bookingOpen = rules.weeklyWindows.length > 0;
  const slots = bookingOpen
    ? listAvailableSlots({
        eventType,
        from: new Date(from),
        to: new Date(to),
        bookings: await listBookings(),
        now: new Date(),
        rules,
      })
    : [];

  return NextResponse.json(
    {
      slots,
      bookingOpen,
      durationMinutes: eventType.durationMinutes,
      hostTimeZone: rules.timeZone,
      horizonDays: rules.horizonDays,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
