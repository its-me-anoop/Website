import { site } from "@/lib/site";
import type { Booking, EventType } from "./types";

/** RFC 5545 text escaping: backslash, separators, newlines. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 lines fold at 75 octets with a leading space continuation. */
function foldLine(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const chunks: string[] = [];
  let current = "";
  let currentBytes = 0;
  for (const char of line) {
    const charBytes = new TextEncoder().encode(char).length;
    const limit = chunks.length === 0 ? 75 : 74;
    if (currentBytes + charBytes > limit) {
      chunks.push(current);
      current = "";
      currentBytes = 0;
    }
    current += char;
    currentBytes += charBytes;
  }
  if (current) chunks.push(current);
  return chunks.join("\r\n ");
}

function icsUtcStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * A single-event calendar file the client can import anywhere. Times are
 * emitted in UTC so every calendar app renders them in the viewer's own
 * timezone.
 */
export function buildIcs(booking: Booking, eventType: EventType): string {
  const location = eventType.location === "video-call" ? "Video call" : "Phone call";
  const description = [
    `${eventType.name} with ${site.founder} (${site.studio}).`,
    `Booking reference: ${booking.reference}.`,
    `Joining details will be sent to ${booking.email} before the call.`,
    `Need to change it? Email ${site.email} and quote the reference.`,
  ].join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.studio}//Booking//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${booking.reference.toLowerCase()}@flutterly.co.uk`,
    `DTSTAMP:${icsUtcStamp(booking.createdAtIso)}`,
    `DTSTART:${icsUtcStamp(booking.startIso)}`,
    `DTEND:${icsUtcStamp(booking.endIso)}`,
    `SUMMARY:${escapeText(`${eventType.name} — ${site.studio}`)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(location)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(foldLine).join("\r\n") + "\r\n";
}
