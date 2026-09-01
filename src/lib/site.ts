/**
 * Single source of truth for site-wide constants: consumed by layout
 * metadata, JSON-LD structured data, the sitemap and the footer so SEO
 * details never drift between files.
 */
export const site = {
  url: "https://www.flutterly.co.uk",
  name: "Anoop Jose",
  legalName: "Flutterly Ltd",
  studio: "Flutterly",
  tagline: "Digital Delivery Company",
  role: "Founder & Digital Delivery Lead at Flutterly Limited",
  description:
    "Flutterly Limited is a digital delivery company in Reading, UK, building accessible websites and digital products, setting up business email and collaboration, and supporting social media campaigns for GP practices, care homes and other organisations.",
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
