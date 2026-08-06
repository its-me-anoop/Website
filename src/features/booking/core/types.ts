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

/** A bookable window inside a working day, as "HH:MM" wall times. */
export type AvailabilityWindow = {
  start: string;
  end: string;
};

export type AvailabilityConfig = {
  /** IANA timezone the working hours are defined in. */
  timeZone: string;
  /** ISO weekday numbers with availability (1 = Monday … 7 = Sunday). */
  workingDays: readonly number[];
  /** Bookable windows within each working day. */
  windows: readonly AvailabilityWindow[];
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
