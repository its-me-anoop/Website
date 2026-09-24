import { site } from "@/lib/site";

/**
 * Link builders for the instant audit. Pure functions so the audit
 * bar, the report and the print document all agree on one format.
 */

/** Shareable address of an instant report. */
export function auditHref(url: string, sector?: string) {
  const params = new URLSearchParams({ url: url.trim() });
  if (sector) params.set("sector", sector);
  return `/audit?${params.toString()}`;
}

/** Prefilled email asking for the human, written audit. */
export function auditMailto(url?: string, summary?: string) {
  const body = [
    "Hi Anoop,",
    "",
    "Please send us the full written audit of our website.",
    "",
    `Website address: ${url ?? ""}`,
    "Organisation (GP practice / care home / other): ",
    "Anything you'd like the audit to focus on: ",
    ...(summary ? ["", "Instant audit summary:", summary] : []),
    "",
    "Thanks,",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(
    url ? `Written website audit: ${url}` : "Written website audit request"
  )}&body=${encodeURIComponent(body)}`;
}
