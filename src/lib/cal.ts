import type { EventTypeId } from "@/features/booking/core/types";

/**
 * Public Cal.com booking links. Username and slugs are env-overridable;
 * defaults match Olivia’s live Flutterly product events (verified 2026-09-01).
 *
 *   https://cal.com/anoop-jose-jtij1j/intro             (15 min)
 *   https://cal.com/anoop-jose-jtij1j/consultation      (30 min)
 *   https://cal.com/anoop-jose-jtij1j/project-scoping   (60 min)
 *
 * Do not use short-discovery-meeting or 30-minutes-meeting for /book —
 * those are not the product booking types.
 * cal.com/flutterly is a 404; never default the username to "flutterly".
 */
const DEFAULT_USERNAME = "anoop-jose-jtij1j";
const DEFAULT_ORIGIN = "https://cal.com";

const DEFAULT_SLUGS = {
  "intro-call": "intro",
  consultation: "consultation",
  "project-scoping": "project-scoping",
} as const satisfies Record<EventTypeId, string>;

function readPublicEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export const calUsername =
  readPublicEnv("NEXT_PUBLIC_CAL_USERNAME") ?? DEFAULT_USERNAME;

export const calOrigin = (
  readPublicEnv("NEXT_PUBLIC_CAL_ORIGIN") ?? DEFAULT_ORIGIN
).replace(/\/$/, "");

const eventSlugs: Record<EventTypeId, string> = {
  "intro-call":
    readPublicEnv("NEXT_PUBLIC_CAL_EVENT_INTRO") ?? DEFAULT_SLUGS["intro-call"],
  consultation:
    readPublicEnv("NEXT_PUBLIC_CAL_EVENT_CONSULTATION") ??
    DEFAULT_SLUGS.consultation,
  "project-scoping":
    readPublicEnv("NEXT_PUBLIC_CAL_EVENT_SCOPING") ??
    DEFAULT_SLUGS["project-scoping"],
};

export function calEventSlug(eventTypeId: EventTypeId): string | undefined {
  return eventSlugs[eventTypeId];
}

export function calBookingUrl(eventTypeId: EventTypeId): string | null {
  const slug = calEventSlug(eventTypeId);
  if (!slug || !calUsername) return null;
  return `${calOrigin}/${calUsername}/${slug}`;
}
