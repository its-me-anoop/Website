import { site } from "@/lib/site";
import type { Booking, EventType } from "../core/types";

/**
 * Owner notifications for new bookings, in two independent channels:
 *
 * - Email via the Resend HTTP API when RESEND_API_KEY is set, to
 *   BOOKING_NOTIFY_EMAIL (default: the site contact address). With an
 *   unverified domain, Resend's onboarding sender can only deliver to
 *   the Resend account owner's own address — good enough for a
 *   single-owner diary; verify the domain to lift that.
 * - A webhook POST when BOOKING_NOTIFY_WEBHOOK is set (e.g. Zapier or
 *   a Google Apps Script relay).
 *
 * Failures are logged and swallowed: the client already has their
 * confirmation, and the booking is in the store.
 */

function ownerFacingSummary(booking: Booking, eventType: EventType): string {
  const startLondon = new Date(booking.startIso).toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "full",
    timeStyle: "short",
  });
  const endLondon = new Date(booking.endIso).toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${eventType.name} with ${booking.name} — ${startLondon}–${endLondon} (UK time)`;
}

async function sendEmail(booking: Booking, eventType: EventType): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const to = process.env.BOOKING_NOTIFY_EMAIL || site.email;
  const from = process.env.BOOKING_EMAIL_FROM || "Flutterly bookings <onboarding@resend.dev>";

  const lines = [
    ownerFacingSummary(booking, eventType),
    "",
    `Client: ${booking.name} <${booking.email}>`,
    `Booked in timezone: ${booking.timeZone}`,
    `Reference: ${booking.reference}`,
    booking.notes ? `Notes: ${booking.notes}` : "Notes: (none)",
    "",
    `Reply to the client directly at ${booking.email} with the video link.`,
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: booking.email,
        subject: `New booking: ${ownerFacingSummary(booking, eventType)}`,
        text: lines.join("\n"),
      }),
    });
    if (!response.ok) {
      console.error(`Booking email failed: ${response.status} ${await response.text()}`);
    }
  } catch (error) {
    console.error("Booking email failed", error);
  }
}

async function sendWebhook(booking: Booking, eventType: EventType): Promise<void> {
  const webhook = process.env.BOOKING_NOTIFY_WEBHOOK;
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        kind: "booking.created",
        summary: ownerFacingSummary(booking, eventType),
        booking,
        eventType: { id: eventType.id, name: eventType.name },
        site: site.url,
      }),
    });
  } catch (error) {
    console.error("Booking notification failed", error);
  }
}

/** Best-effort owner notification; never blocks the confirmation. */
export async function notifyNewBooking(booking: Booking, eventType: EventType): Promise<void> {
  await Promise.all([sendEmail(booking, eventType), sendWebhook(booking, eventType)]);
}
