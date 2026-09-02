import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Indexable routes only, on the canonical host. Demo sites (`/demo/*`)
 * are `noindex` and legacy redirects (e.g. `/little-artist/*`) are not
 * pages, so neither belongs here. No `lastModified`: the sitemap is
 * generated at build time, so a `new Date()` would claim every page
 * changed on every deploy.
 */
const routes: readonly {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/gp-websites", changeFrequency: "monthly", priority: 0.9 },
  { path: "/care-home-websites", changeFrequency: "monthly", priority: 0.9 },
  { path: "/packages", changeFrequency: "monthly", priority: 0.8 },
  { path: "/free-audit", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects/sipli", changeFrequency: "monthly", priority: 0.7 },
  { path: "/projects/artling", changeFrequency: "monthly", priority: 0.7 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.4 },
  { path: "/projects/sipli/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/projects/artling/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${site.url}/` : `${site.url}${path}`,
    changeFrequency,
    priority,
  }));
}
