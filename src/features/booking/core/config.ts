import type { AvailabilityRules, EventType, EventTypeId } from "./types";

/**
 * The consultation types clients can book. Copy follows the site's
 * plain-English register: what the call is for, then what happens.
 */
export const eventTypes: readonly EventType[] = [
  {
    id: "intro-call",
    name: "Intro call",
    durationMinutes: 15,
    description:
      "A quick hello to see whether Flutterly is the right fit. No preparation needed and no obligation.",
    agenda: [
      "What you are trying to achieve",
      "Whether Flutterly can help",
      "Sensible next steps, even if that is elsewhere",
    ],
    location: "video-call",
  },
  {
    id: "consultation",
    name: "Consultation",
    durationMinutes: 30,
    description:
      "A working session on your website or digital project: current state, options and what good looks like.",
    agenda: [
      "Your current site or product, reviewed together",
      "Priorities: accessibility, speed, content, search",
      "A clear recommendation with rough costs",
    ],
    location: "video-call",
  },
  {
    id: "project-scoping",
    name: "Project scoping",
    durationMinutes: 60,
    description:
      "For projects that are ready to move: goals, scope, timeline and budget, mapped in one session.",
    agenda: [
      "Goals and success measures",
      "Scope, phases and a realistic timeline",
      "Budget bands and a written follow-up",
    ],
    location: "video-call",
  },
] as const;

export function getEventType(id: string): EventType | undefined {
  return eventTypes.find((eventType) => eventType.id === id);
}

export function isEventTypeId(id: string): id is EventTypeId {
  return eventTypes.some((eventType) => eventType.id === id);
}

/**
 * Default availability: CLOSED. No windows means no slots anywhere, so
 * nobody can book until the owner adds windows via /book/manage (or the
 * BOOKING_AVAILABILITY_JSON hosting env var). Wall times are
 * Europe/London and stay correct across GMT/BST once windows exist.
 */
export const defaultAvailabilityRules: AvailabilityRules = {
  timeZone: "Europe/London",
  weeklyWindows: [],
  minNoticeHours: 18,
  horizonDays: 60,
  bufferMinutes: 15,
};
