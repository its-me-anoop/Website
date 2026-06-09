/**
 * Single source of truth for site-wide constants — consumed by layout
 * metadata, JSON-LD structured data, the sitemap and the footer so SEO
 * details never drift between files.
 */
export const site = {
  url: "https://flutterly.uk",
  name: "Anoop Jose",
  legalName: "Flutterly Ltd",
  studio: "Flutterly",
  tagline: "App & Web Developer",
  role: "Developer & Designer · Founder of Flutterly",
  description:
    "Anoop Jose is a UK-based developer and designer crafting fast, polished web and mobile apps with Next.js, React, SwiftUI and Flutter — founder of Flutterly, a product studio in Reading.",
  email: "anoop@flutterly.co.uk",
  phone: "+44-7780-580534",
  phoneDisplay: "+44 7780 580 534",
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
  ogImage: "/flutterly-title.png",
} as const;

export type Site = typeof site;
