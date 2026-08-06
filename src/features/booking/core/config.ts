import type { AvailabilityConfig, EventType, EventTypeId } from "./types";

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
 * Working hours for consultations, kept deliberately narrower than the
 * working week so client calls cluster rather than fragment focus time.
 * Wall times are Europe/London and stay correct across GMT/BST.
 */
export const availabilityConfig: AvailabilityConfig = {
  timeZone: "Europe/London",
  workingDays: [1, 2, 3, 4, 5],
  windows: [
    { start: "09:30", end: "12:30" },
    { start: "14:00", end: "17:30" },
  ],
  minNoticeHours: 18,
  horizonDays: 60,
  bufferMinutes: 15,
};
