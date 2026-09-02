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
  /**
   * Cal.com booking. `calLink` is what the embed takes (username/event
   * slug); `url` is the public page used by fallback links. The event
   * is "Short Discovery Meeting", 15 minutes, on cal.com.
   */
  booking: {
    calLink: "anoop-jose-jtij1j/short-discovery-meeting",
    url: "https://cal.com/anoop-jose-jtij1j/short-discovery-meeting",
    label: "Book a short discovery call",
    eventName: "Short Discovery Meeting",
    durationMinutes: 15,
  },
} as const;

export type Site = typeof site;
