import type { ServiceSlug } from "@/lib/marketing/services";

/**
 * The colour code. Each service keeps one tone everywhere it appears:
 * its divider in the card index, its page hero, its tab on a project,
 * its mark in the menu. Tone classes are defined in globals.css.
 */
export const serviceTone: Record<ServiceSlug, string> = {
  websites: "tone-cobalt",
  apps: "tone-flame",
  "it-support": "tone-jade",
  "social-media": "tone-pink",
  seo: "tone-sun",
};

/** The same colours as raw values, for 3D scenes that paint their own faces. */
export const serviceColour: Record<ServiceSlug, string> = {
  websites: "var(--s-cobalt)",
  apps: "var(--s-flame)",
  "it-support": "var(--s-jade)",
  "social-media": "var(--s-pink)",
  seo: "var(--s-sun)",
};
