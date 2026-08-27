import { NextResponse } from "next/server";
import { adminConfigured, isAuthorisedAdmin } from "@/features/booking/server/admin-auth";
import { buildIcs } from "@/features/booking/core/ics";
import { getEventType } from "@/features/booking/core/config";
import {
  createBooking,
  listBookings,
  validateBookingRequest,
} from "@/features/booking/server/bookings";
import { clientKeyFrom, isRateLimited } from "@/features/booking/server/rate-limit";

function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}


/**
 * POST /api/booking/bookings — book a slot. Returns the confirmed
 * booking plus its .ics text so the client can offer a calendar file
 * without a further round trip.
 */
export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "This request must come from the site." }, { status: 403 });
  }
  if (isRateLimited(clientKeyFrom(request))) {
    return NextResponse.json(
      { error: "Too many booking attempts from this connection. Try again in a few minutes." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = validateBookingRequest(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const result = await createBooking(parsed);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const { booking, eventType } = result;
  return NextResponse.json(
    {
      booking: {
        reference: booking.reference,
        eventTypeId: booking.eventTypeId,
        startIso: booking.startIso,
        endIso: booking.endIso,
        name: booking.name,
        email: booking.email,
        timeZone: booking.timeZone,
      },
      ics: buildIcs(booking, eventType),
    },
    { status: 201 }
  );
}

/**
 * GET /api/booking/bookings — the owner's view of the diary. Requires
 * BOOKING_ADMIN_TOKEN to be configured and presented as a bearer token.
 */
export async function GET(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  }
  if (!isAuthorisedAdmin(request)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }
  const bookings = await listBookings();
  const sorted = [...bookings].sort((a, b) => a.startIso.localeCompare(b.startIso));
  return NextResponse.json({
    bookings: sorted.map((booking) => ({
      ...booking,
      eventTypeName: getEventType(booking.eventTypeId)?.name ?? booking.eventTypeId,
    })),
  });
}
