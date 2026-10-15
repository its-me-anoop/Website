/**
 * The five services of the rebranded studio. The homepage rows, the
 * services index, each `/services/[slug]` page, the nav sheet, the
 * footer, the sitemap and the Service JSON-LD all read from here, so a
 * service is added or renamed in one place.
 *
 * Voice: short declarative sentences, plain English, no invented
 * statistics or prices. Anything that needs a number is quoted after a
 * call, and says so.
 */

export type ServiceSlug = "websites" | "apps" | "it-support" | "social-media" | "seo";

/** Build, Support, Grow: the three pillars the five services sit under. */
export type Pillar = "Build" | "Support" | "Grow";

export type ServiceLink = { label: string; href: string };

export type Service = {
  slug: ServiceSlug;
  pillar: Pillar;
  /** Row and nav label. */
  name: string;
  /** Page heading, before and after the one italic emphasis word. */
  heading: { lead: string; emphasis: string; trail?: string };
  /** One line for the homepage row and the services index. */
  summary: string;
  /** Mono tag at the end of the homepage row. */
  tag: string;
  /** Label the custom cursor shows over this service's links. */
  cursorLabel: string;
  /** Opening paragraph on the service page. */
  intro: string;
  /** What the service covers. */
  includes: readonly { title: string; copy: string }[];
  /** Who it tends to suit. */
  goodFor: readonly string[];
  faqs: readonly { q: string; a: string }[];
  /** Proof and next steps that live elsewhere on the site. */
  related: readonly ServiceLink[];
  /** Meta description for the service page (≤ 160 characters). */
  metaDescription: string;
  /**
   * The closing band: what to tell Flutterly before a call, and whether
   * the website audit is the main alternative (websites, SEO) or only a
   * small cross-link (services that are not about an existing site).
   */
  nextStep: { prompt: string; audit: "primary" | "link" };
};

export const services: readonly Service[] = [
  {
    slug: "websites",
    pillar: "Build",
    name: "Websites",
    heading: { lead: "Websites that", emphasis: "work", trail: "for the people who use them." },
    summary: "Custom-coded in Next.js, accessible to WCAG 2.2 AA, quick on a phone and simple to update.",
    tag: "Next.js · React",
    cursorLabel: "Talk websites",
    intro:
      "Every site is designed and coded for the organisation it serves, never a theme shared with thousands of others. It loads quickly on a phone, works with a keyboard and a screen reader, and you can change the words yourself.",
    includes: [
      {
        title: "Design and build",
        copy: "Structure, plain-English content and a visual language you react to as working pages, then built in Next.js.",
      },
      {
        title: "Accessibility",
        copy: "WCAG 2.2 AA as the floor: contrast, keyboard use, screen readers and reduced motion checked on every build.",
      },
      {
        title: "Speed and search",
        copy: "Server-rendered pages, optimised images and structured data, so the site is quick and easy for search engines to read.",
      },
      {
        title: "Editing you can do",
        copy: "A simple content editor for the pages that change, so news and opening hours never wait for a developer.",
      },
      {
        title: "Hosting and care",
        copy: "UK hosting, daily backups, updates and fixes, looked after by the person who built it.",
      },
    ],
    goodFor: [
      "GP practices, care homes, dental practices, pharmacies and clinics",
      "Local businesses outgrowing a page builder",
      "Organisations that need to meet accessibility regulations",
    ],
    faqs: [
      {
        q: "Do you use templates?",
        a: "No. Each site is designed and coded for you. That is what keeps it fast, accessible and easy to change later.",
      },
      {
        q: "Can I update the site myself?",
        a: "Yes. The pages that change often come with a simple editor, and anything bigger is a short email away.",
      },
      {
        q: "What does a website cost?",
        a: "Healthcare packages are published on the packages page. Other sites are quoted in writing after a short call, before any work starts.",
      },
    ],
    related: [
      { label: "GP practice websites", href: "/gp-websites" },
      { label: "Care home websites", href: "/care-home-websites" },
      { label: "Website packages", href: "/packages" },
      { label: "Run a free website audit", href: "/free-audit" },
    ],
    metaDescription:
      "Custom-coded Next.js websites from Flutterly in Reading: accessible to WCAG 2.2 AA, fast on a phone, easy to update and looked after.",
    nextStep: {
      prompt: "A short call about your website is the quickest way to a written plan and a price. Or start with a free audit of the website you have today.",
      audit: "primary",
    },
  },
  {
    slug: "apps",
    pillar: "Build",
    name: "Apps",
    heading: { lead: "Apps people", emphasis: "keep", trail: "on their home screen." },
    summary: "iPhone, Apple Watch and Android apps in SwiftUI and Flutter, from first prototype to the App Store.",
    tag: "SwiftUI · Flutter",
    cursorLabel: "Talk apps",
    intro:
      "Native iPhone, iPad and Apple Watch apps in SwiftUI, and cross-platform apps in Flutter when Android matters too. The studio ships and runs its own apps on the App Store, so yours gets the same care.",
    includes: [
      {
        title: "Prototype first",
        copy: "A clickable build on your own phone early, so decisions are made with the real thing in your hand.",
      },
      {
        title: "Native and cross-platform",
        copy: "SwiftUI for Apple devices, Flutter when one codebase needs to reach iPhone and Android.",
      },
      {
        title: "Backends that fit",
        copy: "Firebase, CloudKit or a small API, chosen for what the app needs rather than what is fashionable.",
      },
      {
        title: "Store submission",
        copy: "App Store and Google Play listings, screenshots, privacy details and review, handled for you.",
      },
      {
        title: "Updates after launch",
        copy: "New OS versions, crash fixes and the next features, built test-first so each release stays stable.",
      },
    ],
    goodFor: [
      "Founders with an idea that needs to be in people's pockets",
      "Businesses replacing a spreadsheet or paper process with an app",
      "Teams that need an existing app rescued or rebuilt",
    ],
    faqs: [
      {
        q: "SwiftUI or Flutter?",
        a: "SwiftUI when the app is for Apple devices and should feel completely at home there. Flutter when one codebase has to serve iPhone and Android.",
      },
      {
        q: "Do you publish the app for me?",
        a: "Yes. Store listings, screenshots, privacy labels and the review process are part of the work.",
      },
    ],
    related: [
      { label: "Sipli case study", href: "/projects/sipli" },
      { label: "Little Artist case study", href: "/projects/artling" },
      { label: "Little Lifeline case study", href: "/projects/little-lifeline" },
    ],
    metaDescription:
      "iPhone, Apple Watch and Android apps in SwiftUI and Flutter from Flutterly in Reading, from first prototype to the App Store and beyond.",
    nextStep: {
      prompt: "Tell me what your app needs to do, who it is for and whether you have a prototype. A short call is the quickest way to a written plan and a price.",
      audit: "link",
    },
  },
  {
    slug: "it-support",
    pillar: "Support",
    name: "IT support",
    heading: { lead: "The IT underneath,", emphasis: "handled." },
    summary: "Domains, email, hosting, devices and backups, set up properly and kept that way.",
    tag: "Monthly plans",
    cursorLabel: "Talk IT support",
    intro:
      "The unglamorous parts that stop a business when they break: the domain that nearly expired, the shared inbox nobody can reach, the laptop with no backup. Set up properly once, then looked after on a monthly plan.",
    includes: [
      {
        title: "Domains and DNS",
        copy: "Renewals, records and email authentication (SPF, DKIM and DMARC) so your messages land in inboxes.",
      },
      {
        title: "Email and accounts",
        copy: "Google Workspace or Microsoft 365 set up, shared inboxes organised and staff added or removed cleanly.",
      },
      {
        title: "Devices",
        copy: "Laptops, phones and printers set up, updated and secured, with two-factor sign-in switched on.",
      },
      {
        title: "Backups",
        copy: "Automatic backups of the files and accounts that matter, checked so a restore actually works.",
      },
      {
        title: "Help when it breaks",
        copy: "One person to email when something stops working, who already knows how your setup fits together.",
      },
    ],
    goodFor: [
      "Small teams without an IT department",
      "Practices and care homes with a mix of shared and personal devices",
      "Businesses whose setup grew by accident and needs tidying",
    ],
    faqs: [
      {
        q: "How much is a support plan?",
        a: "Plans are priced on the number of people and devices. You get a written quote after a short call about your setup.",
      },
      {
        q: "Do you work on site?",
        a: "Most work is done remotely. Visits around Reading and Berkshire can be arranged when something needs hands on.",
      },
    ],
    related: [
      { label: "Book a call about your setup", href: "/book" },
      { label: "Websites", href: "/services/websites" },
    ],
    metaDescription:
      "IT support from Flutterly in Reading: domains, email, devices and backups for small teams, set up properly and looked after on a monthly plan.",
    nextStep: {
      prompt: "Tell me what is getting in the way, how many people need help and what you use today. A short call is the quickest way to a written plan and a price.",
      audit: "link",
    },
  },
  {
    slug: "social-media",
    pillar: "Grow",
    name: "Social media",
    heading: { lead: "Social media in", emphasis: "your", trail: "voice, every week." },
    summary: "Posts and short-form video for Instagram, LinkedIn, Facebook and X, written in your voice.",
    tag: "Plan · Post · Report",
    cursorLabel: "Talk social",
    intro:
      "A steady rhythm of posts that sound like you, planned a month ahead and approved by you before anything goes out. Short-form video and graphics are made to fit each platform rather than copied across.",
    includes: [
      {
        title: "A monthly plan",
        copy: "Themes, dates and post ideas agreed with you at the start of each month.",
      },
      {
        title: "Posts and video",
        copy: "Copy, graphics and short-form video made for Instagram, LinkedIn, Facebook and X.",
      },
      {
        title: "Your approval first",
        copy: "Nothing is published until you have seen it. Changes are one reply away.",
      },
      {
        title: "Profiles that match",
        copy: "Bios, links and imagery tidied so every profile points back to the same brand and website.",
      },
      {
        title: "A plain report",
        copy: "What went out, what people engaged with and what to try next month, in a few lines.",
      },
    ],
    goodFor: [
      "Businesses that know they should post but never find the time",
      "Care homes and practices sharing news with families and patients",
      "Launches that need a run of posts around one date",
    ],
    faqs: [
      {
        q: "Which platforms do you cover?",
        a: "Instagram, LinkedIn, Facebook and X. Most clients start with the two where their audience already is.",
      },
      {
        q: "Will it sound like us?",
        a: "Yes. Everything is written from a short voice guide agreed at the start, and you approve every post.",
      },
    ],
    related: [
      { label: "SEO", href: "/services/seo" },
      { label: "Book a call", href: "/book" },
    ],
    metaDescription:
      "Social media from Flutterly in Reading: planned posts and short-form video for Instagram, LinkedIn, Facebook and X, written in your voice.",
    nextStep: {
      prompt: "Tell me which channels you use, who you want to reach and what you need help creating. A short call is the quickest way to a written plan and a price.",
      audit: "link",
    },
  },
  {
    slug: "seo",
    pillar: "Grow",
    name: "SEO",
    heading: { lead: "Help more people", emphasis: "nearby", trail: "find you." },
    summary: "Technical fixes, local search and useful pages that help more people nearby find you.",
    tag: "Technical · Local",
    cursorLabel: "Talk SEO",
    intro:
      "Search starts with a site that loads quickly and says plainly what you do and where. From there it is local listings, structured data and pages that answer the questions people actually type.",
    includes: [
      {
        title: "Technical fixes",
        copy: "Speed, mobile layout, titles, headings, sitemaps and structured data, fixed at the source.",
      },
      {
        title: "Local search",
        copy: "Google Business Profile, consistent name, address and phone details, and reviews that are easy to leave.",
      },
      {
        title: "Useful pages",
        copy: "Service and location pages written for the questions people search, not stuffed with keywords.",
      },
      {
        title: "Measurement",
        copy: "Search Console and analytics set up, so you can see which searches bring people in.",
      },
      {
        title: "A monthly report",
        copy: "What changed, what moved and what comes next, in plain English.",
      },
    ],
    goodFor: [
      "Local businesses that want to appear for searches nearby",
      "Sites that rank below competitors with less to offer",
      "Organisations launching a new website without losing their search history",
    ],
    faqs: [
      {
        q: "Can you promise a number one ranking?",
        a: "No one honestly can. What can be promised is a technically sound site, accurate local listings and pages worth ranking.",
      },
      {
        q: "Where do we start?",
        a: "With the free website audit. It checks search, speed and accessibility in one report, so the first fixes are clear.",
      },
    ],
    related: [
      { label: "Run a free website audit", href: "/free-audit" },
      { label: "Social media", href: "/services/social-media" },
    ],
    metaDescription:
      "SEO from Flutterly in Reading: technical fixes, local search and Google Business Profile, and useful pages that help people nearby find you.",
    nextStep: {
      prompt: "A short call about your SEO is the quickest way to a written plan and a price. Or start with a free audit of the website you have today.",
      audit: "primary",
    },
  },
] as const;

export const pillars: readonly { name: Pillar; line: string }[] = [
  { name: "Build", line: "Websites and apps, designed and coded in house." },
  { name: "Support", line: "The IT underneath, set up properly and kept that way." },
  { name: "Grow", line: "Search and social that bring people in." },
] as const;

export const serviceSlugs: readonly ServiceSlug[] = services.map((s) => s.slug);

export function serviceHref(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

/** The service for a route segment, or undefined for an unknown slug. */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesInPillar(pillar: Pillar): readonly Service[] {
  return services.filter((s) => s.pillar === pillar);
}

/** Plain-text page heading, for metadata and accessible names. */
export function headingText(service: Service): string {
  const { lead, emphasis, trail } = service.heading;
  return [lead, emphasis, trail].filter(Boolean).join(" ").replace(/\s+([.,])/g, "$1");
}
