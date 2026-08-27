import { isSlotAvailable } from "../core/availability";
import { getEventType } from "../core/config";
import { createBookingReference } from "../core/reference";
import type { Booking, BookingRequest, EventType } from "../core/types";
import { resolveAvailability } from "./availability-store";
import { notifyNewBooking } from "./notify";
import { loadBookings, persistBookings, withStoreLock } from "./store";

export type CreateBookingResult =
  | { ok: true; booking: Booking; eventType: EventType }
  | { ok: false; status: 400 | 409; error: string };

/** Upcoming confirmed bookings one email address may hold at once. */
const maxFutureBookingsPerEmail = 3;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone });
    return true;
  } catch {
    return false;
  }
}

/** Field-level validation with plain-English messages the UI can show. */
export function validateBookingRequest(body: unknown): BookingRequest | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "The booking request could not be read." };
  }
  const record = body as Record<string, unknown>;
  const eventTypeId = typeof record.eventTypeId === "string" ? record.eventTypeId : "";
  if (!getEventType(eventTypeId)) return { error: "Choose a call type to book." };

  const startIso = typeof record.startIso === "string" ? record.startIso : "";
  if (Number.isNaN(Date.parse(startIso))) return { error: "Choose a time for the call." };

  const name = typeof record.name === "string" ? record.name.trim() : "";
  if (!name || name.length > 120) return { error: "Add your name so the call can be confirmed." };

  const email = typeof record.email === "string" ? record.email.trim() : "";
  if (!emailPattern.test(email) || email.length > 254) {
    return { error: "Add a working email address for the joining details." };
  }

  const notes = typeof record.notes === "string" ? record.notes.trim().slice(0, 2000) : "";

  const timeZone =
    typeof record.timeZone === "string" && isValidTimeZone(record.timeZone)
      ? record.timeZone
      : "Europe/London";

  return {
    eventTypeId: eventTypeId as BookingRequest["eventTypeId"],
    startIso: new Date(startIso).toISOString(),
    name,
    email,
    notes,
    timeZone,
  };
}

/**
 * Create a booking if the slot is still free. The availability check
 * runs inside the store lock so two clients cannot take the same slot.
 */
export async function createBooking(
  request: BookingRequest,
  now: Date = new Date()
): Promise<CreateBookingResult> {
  const eventType = getEventType(request.eventTypeId);
  if (!eventType) return { ok: false, status: 400, error: "That call type does not exist." };

  const result = await withStoreLock<CreateBookingResult>(async () => {
    const { rules } = await resolveAvailability();
    const bookings = await loadBookings();
    if (!isSlotAvailable(eventType, request.startIso, bookings, now, rules)) {
      return {
        ok: false,
        status: 409,
        error: "That time has just been taken. Pick another slot.",
      };
    }
    const upcomingForEmail = bookings.filter(
      (booking) =>
        booking.status === "confirmed" &&
        booking.email.toLowerCase() === request.email.toLowerCase() &&
        Date.parse(booking.startIso) > now.getTime()
    ).length;
    if (upcomingForEmail >= maxFutureBookingsPerEmail) {
      return {
        ok: false,
        status: 409,
        error:
          "That email already has several calls booked. Reply to a confirmation email to arrange more.",
      };
    }
    const start = new Date(request.startIso);
    const booking: Booking = {
      reference: createBookingReference(),
      eventTypeId: eventType.id,
      startIso: start.toISOString(),
      endIso: new Date(start.getTime() + eventType.durationMinutes * 60_000).toISOString(),
      name: request.name,
      email: request.email,
      notes: request.notes ?? "",
      timeZone: request.timeZone ?? "Europe/London",
      status: "confirmed",
      createdAtIso: now.toISOString(),
    };
    await persistBookings([...bookings, booking]);
    return { ok: true, booking, eventType };
  });

  if (result.ok) {
    // Best-effort owner notification; never blocks the confirmation.
    await notifyNewBooking(result.booking, result.eventType);
  }
  return result;
}

export function listBookings(): Promise<Booking[]> {
  return withStoreLock(loadBookings);
}
