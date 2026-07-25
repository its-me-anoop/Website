/**
 * Single source of truth for site-wide constants — consumed by layout
 * metadata, JSON-LD structured data, the sitemap and the footer so SEO
 * details never drift between files.
 */
export const site = {
  /**
   * The origin the site is actually served from, and the one every
   * canonical, og:url, sitemap entry and JSON-LD @id is built on.
   *
   * `flutterly.uk` is a registrar parking page, not this site: every
   * path on it returns the same 114-byte redirect stub. Pointing the
   * canonicals there told search engines the real version of each page
   * lived somewhere that serves no content, and made every social
   * unfurl fetch its og:image from a stub. `flutterly.co.uk` redirects
   * to the `www` host, so the canonical is the `www` form — matching
   * `site.email`, which has always been on `.co.uk`.
   */
  url: "https://www.flutterly.co.uk",
  /** The bare host, for prose that names the site rather than links it. */
  domain: "flutterly.co.uk",
  name: "Anoop Jose",
  legalName: "Flutterly Ltd",
  studio: "Flutterly",
  tagline: "App & Web Developer",
  role: "Developer & Designer · Founder of Flutterly",
  description:
    "Flutterly is an independent product studio in Reading, UK — designing and building accessible websites for GP practices and care homes, plus web and mobile products with Next.js, SwiftUI and Flutter.",
  email: "anoop@flutterly.co.uk",
  founder: "Anoop Jose",
  locale: "en_GB",
  address: {
    streetAddress: "Flat 21, 3 Erleigh Road",
    addressLocality: "Reading",
    addressRegion: "Berkshire",
    postalCode: "RG1 5LR",
    addressCountry: "GB",
  },
  social: {
    github: "https://github.com/its-me-anoop",
    githubHandle: "its-me-anoop",
    linkedin: "https://www.linkedin.com/in/anoop-jose-0b308a296/",
  },
  ogImage: "/og-image.png",
  logo: "/flutterly-logo.png",
} as const;

export type Site = typeof site;
