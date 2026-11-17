import type { ServiceSlug } from "@/lib/marketing/services";

/**
 * The twelve pieces on the hero's sorting table: the parts of an
 * organisation's digital side, each with the state it is often found
 * in and the state it is left in. They are illustrations of the work,
 * not claims about a client, so none carries a statistic.
 *
 * `c`/`r` place a piece on the wide table (three across, four down, in
 * service order) and `mc`/`mr` on the narrow one (two across), which
 * leaves out the four marked `extra`.
 */
export type Piece = {
  key: string;
  title: string;
  found: string;
  sorted: string;
  service: ServiceSlug;
  icon: "globe" | "at" | "access" | "phone" | "mail" | "backup" | "key" | "wifi" | "heart" | "star" | "search" | "pin";
  c: number;
  r: number;
  mc?: number;
  mr?: number;
  extra?: boolean;
};

export const pieces: readonly Piece[] = [
  { key: "website", title: "Website", found: "Not secure", sorted: "Secure and quick", service: "websites", icon: "globe", c: 0, r: 0, mc: 0, mr: 0 },
  { key: "domain", title: "Domain", found: "Expires on Friday", sorted: "Renewed, in your name", service: "websites", icon: "at", c: 1, r: 0, extra: true },
  { key: "access", title: "Accessibility", found: "Fails contrast", sorted: "WCAG 2.2 AA", service: "websites", icon: "access", c: 2, r: 0, mc: 1, mr: 0 },
  { key: "app", title: "App", found: "Crashes on open", sorted: "On the App Store", service: "apps", icon: "phone", c: 0, r: 1, mc: 0, mr: 1 },
  { key: "email", title: "Email", found: "Bouncing since May", sorted: "On every device", service: "it-support", icon: "mail", c: 1, r: 1, mc: 1, mr: 1 },
  { key: "backups", title: "Backups", found: "Last run: unknown", sorted: "Ran last night", service: "it-support", icon: "backup", c: 2, r: 1, mc: 0, mr: 2 },
  { key: "passwords", title: "Passwords", found: "On a sticky note", sorted: "Two-step sign-in", service: "it-support", icon: "key", c: 0, r: 2, extra: true },
  { key: "wifi", title: "Wi-Fi", found: "Drops at 3pm", sorted: "Solid in every room", service: "it-support", icon: "wifi", c: 1, r: 2, mc: 1, mr: 2 },
  { key: "social", title: "Social", found: "Last post: 2021", sorted: "Posted this week", service: "social-media", icon: "heart", c: 2, r: 2, mc: 0, mr: 3 },
  { key: "reviews", title: "Reviews", found: "Left unanswered", sorted: "Answered", service: "social-media", icon: "star", c: 0, r: 3, extra: true },
  { key: "search", title: "Search", found: "Hidden from Google", sorted: "Indexed and readable", service: "seo", icon: "search", c: 1, r: 3, mc: 1, mr: 3 },
  { key: "listing", title: "Google listing", found: "Wrong opening hours", sorted: "Hours right", service: "seo", icon: "pin", c: 2, r: 3, extra: true },
] as const;

/** A fixed pseudo-random number in [-1, 1] for piece `i`, stream `k`: the same on the server and the client. */
export function scatter(i: number, k: number): number {
  const x = Math.sin((i + 1) * 12.9898 + (k + 1) * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/** Where piece `i` lies before it is sorted: an offset in table units and a turn on each axis. */
export function scatterOf(i: number) {
  const round = (n: number) => Math.round(n * 10) / 10;
  return {
    mx: round(scatter(i, 0) * 15),
    my: round(scatter(i, 1) * 14),
    mz: round(6 + scatter(i, 2) * 26),
    rx: round(scatter(i, 3) * 40),
    ry: round(scatter(i, 4) * 44),
    rz: round(scatter(i, 5) * 26),
  };
}
