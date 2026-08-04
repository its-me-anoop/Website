import { z } from "zod";

/**
 * Shared content primitives for the demo-site CMS. Every rule here is a
 * house standard: UK phone formats, real calendar dates, images that
 * always carry descriptive alt text.
 */

/** UK phone number as displayed: leading 0, space-grouped digits. */
export const ukPhone = z
  .string()
  .regex(/^0\d{2,4}(?: \d{3,4}){2,3}$/, "expected a UK phone number like 0118 496 0123");

/** Derive the international tel: href from a display number. */
export function phoneToTel(phone: string): string {
  return `tel:+44${phone.replace(/\s/g, "").slice(1)}`;
}

const MONTH_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** ISO 8601 date that is also a real calendar date. */
export const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "expected an ISO date like 2026-07-18")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "not a real calendar date");

/** Render an ISO date the way the demos display dates: "18 July 2026". */
export function formatDate(iso: string): string {
  return MONTH_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}

/** True when a reviewed date is more than a year before today (NHS review pattern). */
export function isStale(reviewed: string, today: string): boolean {
  const elapsed = Date.parse(`${today}T00:00:00Z`) - Date.parse(`${reviewed}T00:00:00Z`);
  return elapsed > 365 * 24 * 60 * 60 * 1000;
}

/** Image reference: rooted under public/, descriptive alt text required. */
export const imageSchema = z.object({
  src: z.string().startsWith("/", "image src must be a rooted public/ path"),
  alt: z.string().min(10, "alt text must describe the image (10+ characters)"),
});

export type ImageRef = z.infer<typeof imageSchema>;
