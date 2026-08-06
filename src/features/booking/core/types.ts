/**
 * Domain types for the consultation booking system. Times are exchanged
 * as UTC ISO-8601 instants; availability rules are expressed as wall
 * times in the host's timezone (see config.ts) so clocks stay correct
 * across GMT/BST transitions.
 */

export type EventTypeId = "intro-call" | "consultation" | "project-scoping";

export type EventType = {
  id: EventTypeId;
  name: string;
  durationMinutes: number;
  description: string;
  /** What the client should expect, shown on the scheduler side panel. */
  agenda: readonly string[];
  location: "video-call" | "phone-call";
};

/**
 * A recurring bookable window: one weekday (1 = Monday … 7 = Sunday)
 * with "HH:MM" wall times in the host timezone.
 */
export type WeeklyWindow = {
  day: number;
  start: string;
  end: string;
};

/**
 * Owner-editable availability. With no windows, no slots exist and
 * booking is closed — the default until the owner adds some via
 * /book/manage (or BOOKING_AVAILABILITY_JSON in hosting env).
 */
export type AvailabilityRules = {
  /** IANA timezone the working hours are defined in. */
  timeZone: string;
  /** Recurring weekly windows; empty means booking is closed. */
  weeklyWindows: readonly WeeklyWindow[];
  /** Earliest a slot may start, measured from "now". */
  minNoticeHours: number;
  /** How far ahead bookings are accepted. */
  horizonDays: number;
  /** Breathing room enforced around existing bookings. */
  bufferMinutes: number;
};

export type BookingStatus = "confirmed" | "cancelled";

export type Booking = {
  /** Short human-readable reference, e.g. "FL-7K2M9QDW". */
  reference: string;
  eventTypeId: EventTypeId;
  /** Slot start as a UTC ISO instant. */
  startIso: string;
  /** Slot end as a UTC ISO instant. */
  endIso: string;
  name: string;
  email: string;
  notes: string;
  /** IANA timezone the client booked in, for correspondence. */
  timeZone: string;
  status: BookingStatus;
  createdAtIso: string;
};

/** Payload accepted by POST /api/booking/bookings. */
export type BookingRequest = {
  eventTypeId: EventTypeId;
  startIso: string;
  name: string;
  email: string;
  notes?: string;
  timeZone?: string;
};
