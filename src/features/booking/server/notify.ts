import { site } from "@/lib/site";
import type { Booking, EventType } from "../core/types";

/**
 * Owner notification for new bookings. When BOOKING_NOTIFY_WEBHOOK is
 * set (e.g. a Zapier/Make hook that forwards to email), each booking is
 * POSTed there as JSON. Failures are logged and swallowed: the client
 * already has their confirmation, and the booking is in the store.
 */
export async function notifyNewBooking(booking: Booking, eventType: EventType): Promise<void> {
  const webhook = process.env.BOOKING_NOTIFY_WEBHOOK;
  if (!webhook) return;

  const startLondon = new Date(booking.startIso).toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        kind: "booking.created",
        summary: `${eventType.name} with ${booking.name} — ${startLondon} (UK time)`,
        booking,
        eventType: { id: eventType.id, name: eventType.name },
        site: site.url,
      }),
    });
  } catch (error) {
    console.error("Booking notification failed", error);
  }
}
