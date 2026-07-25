import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  /* From `site`, not a second copy of the string: this file and the
     sitemap had both drifted onto a parked domain while the rest of the
     metadata moved on. */
  const baseUrl = site.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
