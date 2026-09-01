import type { EventTypeId } from "@/features/booking/core/types";

/**
 * Cal.com booking links for the public /book journey.
 * Set NEXT_PUBLIC_CAL_USERNAME to your Cal.com username (e.g. "flutterly").
 * Optional per-event overrides map Flutterly event ids to Cal event slugs.
 */
const username = (process.env.NEXT_PUBLIC_CAL_USERNAME ?? "flutterly").trim();
const origin = (process.env.NEXT_PUBLIC_CAL_ORIGIN ?? "https://cal.com").replace(/\/$/, "");

const eventSlugs: Record<EventTypeId, string> = {
  "intro-call": process.env.NEXT_PUBLIC_CAL_EVENT_INTRO?.trim() || "intro",
  consultation: process.env.NEXT_PUBLIC_CAL_EVENT_CONSULTATION?.trim() || "consultation",
  "project-scoping":
    process.env.NEXT_PUBLIC_CAL_EVENT_SCOPING?.trim() || "project-scoping",
};

export const cal = {
  username,
  origin,
  /** True when a username is configured so embeds and deep links can resolve. */
  enabled: username.length > 0,
  eventSlugs,
} as const;

export function calPathFor(eventTypeId: EventTypeId): string {
  return `${cal.username}/${cal.eventSlugs[eventTypeId]}`;
}

export function calBookingUrl(eventTypeId: EventTypeId): string {
  return `${cal.origin}/${calPathFor(eventTypeId)}`;
}

export function calEmbedUrl(eventTypeId: EventTypeId): string {
  const params = new URLSearchParams({
    embed: "true",
    theme: "dark",
    layout: "month_view",
  });
  return `${calBookingUrl(eventTypeId)}?${params.toString()}`;
}
