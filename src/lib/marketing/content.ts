/**
 * Content model for the Kiln marketing site. The homepage, sector
 * pages, packages and audit routes all read from here so copy, links
 * and imagery stay in one reviewable place.
 *
 * Voice: short declarative sentences, plain English, no invented
 * statistics. Fictional sample sites are always called sample sites.
 */

import { serviceHref, services } from "./services";

/* ─────────────────────────────────────────────────────────────
   Sample sites — the studio's proof of work.
   ───────────────────────────────────────────────────────────── */

export type Sample = {
  slug: "gp" | "care" | "dental" | "pharmacy" | "physio";
  /** Short tab label. */
  tab: string;
  /** Fictional organisation name. */
  name: string;
  sector: string;
  href: string;
  /** Marketing page for this sector, where one exists. */
  sectorHref?: string;
  image: string;
  imageAlt: string;
  /** First screen of the site on a phone (390 × 844), shown in the 3D phone. */
  mobileImage: string;
  strap: string;
  points: readonly [string, string, string];
};

export const samples: readonly Sample[] = [
  {
    slug: "gp",
    tab: "GP practice",
    name: "Willowbrook Surgery",
    sector: "NHS GP practice",
    href: "/demo/gp-practice",
    sectorHref: "/gp-websites",
    image: "/demos/gp-home.png",
    mobileImage: "/demos/gp-mobile.webp",
    imageAlt:
      "Homepage of the Willowbrook Surgery sample site: a task-first NHS practice website",
    strap: "A practice website that answers before patients call.",
    points: [
      "Appointments, prescriptions and the NHS App one tap from the homepage",
      "Self-serve answers for the requests reception repeats all day",
      "Built to the NHS service manual and WCAG 2.2 AA",
    ],
  },
  {
    slug: "care",
    tab: "Care home",
    name: "Oakfield House",
    sector: "Residential care home",
    href: "/demo/care-home",
    sectorHref: "/care-home-websites",
    image: "/demos/care-home.png",
    mobileImage: "/demos/care-mobile.webp",
    imageAlt:
      "Homepage of the Oakfield House sample site: a warm, photo-led care home website",
    strap: "A home families trust before they ever visit.",
    points: [
      "Fees, funding and the CQC report published plainly",
      "Visiting, admissions and enquiries one step from every page",
      "Careers pages that recruit carers as well as reassure relatives",
    ],
  },
  {
    slug: "dental",
    tab: "Dental",
    name: "Kennet Bridge Dental",
    sector: "Mixed NHS and private dental practice",
    href: "/demo/dental-practice",
    image: "/demos/dental-home.png",
    mobileImage: "/demos/dental-mobile.webp",
    imageAlt:
      "Homepage of the Kennet Bridge Dental sample site: a quietly premium dental practice website",
    strap: "NHS bands and private fees, explained without a phone call.",
    points: [
      "Every fee published, NHS and private side by side",
      "A calm route for nervous patients and urgent toothache",
      "New-patient registration that takes minutes, not forms",
    ],
  },
  {
    slug: "pharmacy",
    tab: "Pharmacy",
    name: "Willowbrook Pharmacy",
    sector: "Independent community pharmacy",
    href: "/demo/pharmacy",
    image: "/demos/pharmacy-home.png",
    mobileImage: "/demos/pharmacy-mobile.webp",
    imageAlt:
      "Homepage of the Willowbrook Pharmacy sample site: a task-first community pharmacy website",
    strap: "Pharmacy First, repeat prescriptions and honest opening hours.",
    points: [
      "Pharmacy First conditions listed so people know before they walk in",
      "Repeat prescription ordering explained step by step",
      "GPhC regulatory details on every page, as required",
    ],
  },
  {
    slug: "physio",
    tab: "Physio",
    name: "Forbury Physiotherapy",
    sector: "Private physiotherapy clinic",
    href: "/demo/physio-clinic",
    image: "/demos/physio-home.png",
    mobileImage: "/demos/physio-mobile.webp",
    imageAlt:
      "Homepage of the Forbury Physiotherapy sample site: an athletic editorial clinic website",
    strap: "Published prices and first-visit guidance that fill the diary.",
    points: [
      "Prices on the website, not on request",
      "What happens at a first appointment, before anyone books",
      "The trust and regulation page most clinics never write",
    ],
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Selected work — live client sites and shipped products.
   ───────────────────────────────────────────────────────────── */

export type Project = {
  name: string;
  type: string;
  year: string;
  description: string;
  href: string;
  internal: boolean;
  image: string;
  /** Tile tint behind the artwork. */
  tint: string;
  /** App artwork sits inside the tile; website screenshots fill it. */
  fit?: "cover" | "contain";
  tags: readonly string[];
  /** Shown as a small tag on the tile, e.g. "In development". */
  status?: string;
};

export const projects: readonly Project[] = [
  {
    name: "Pembroke Care",
    type: "Care home website",
    year: "2026",
    description:
      "A full website rebuild for a boutique residential, respite and transitional-living provider in Reading, spanning Pembroke Lodge, Alexandra Lodge and Pembroke Apartments. Built around its Hospital to Home recovery pathway, with Cloud Medical as clinical governance partner.",
    href: "https://pembrokecare.com/",
    internal: false,
    image: "/project-pembroke.png",
    tint: "#e6e2d6",
    tags: ["Care sector", "Hospital to Home", "Next.js + Payload CMS"],
  },
  {
    name: "Sandbourne",
    type: "Care provider website",
    year: "2024",
    description:
      "A reassuring digital presence for residential, supported-living and respite care services.",
    href: "https://sandbournecare.co.uk/",
    internal: false,
    image: "/project-sandbourne.png",
    tint: "#e4dde6",
    tags: ["Care sector", "UX writing", "Performance"],
  },
  {
    name: "Greenmead",
    type: "Accessible website",
    year: "2024",
    description:
      "A clear, person-centred website for a housing organisation supporting adults with complex needs.",
    href: "https://www.greenmead.co.uk/",
    internal: false,
    image: "/project-greenmead.png",
    tint: "#dde4da",
    tags: ["Accessibility", "Next.js", "Content design"],
  },
  {
    name: "JJ Paper",
    type: "B2B website",
    year: "2024",
    description:
      "A commercial site that explains a sustainable paper supply chain without losing speed or credibility.",
    href: "https://www.jjpaperessential.com/",
    internal: false,
    image: "/project-jjpaper.png",
    tint: "#e8e1d2",
    tags: ["Brand system", "Responsive web", "SEO"],
  },
  {
    name: "Sipli",
    type: "iOS, iPadOS and watchOS app",
    year: "2026",
    description:
      "An adaptive hydration companion for iPhone, iPad and Apple Watch that turns changing goals, weather and Apple Health data into one calm daily rhythm.",
    href: "/projects/sipli",
    internal: true,
    image: "/projects/sipli/iphone_and_ipad.png",
    tint: "#d9e2e6",
    fit: "contain",
    tags: ["SwiftUI", "HealthKit", "On-device intelligence"],
  },
  {
    name: "Little Artist",
    type: "iOS and iPadOS app",
    year: "2026",
    description:
      "A private archive for children's artwork, milestones and family memories, designed to feel quiet and lasting. Free on the App Store.",
    href: "/projects/artling",
    internal: true,
    image: "/projects/artling/fox-painter.png",
    tint: "#ede1cd",
    fit: "contain",
    tags: ["SwiftUI", "Local first", "Family sharing"],
  },
  {
    name: "Little Lifeline",
    type: "iOS and iPadOS game",
    year: "2026",
    description:
      "A miniature 3D clinic management game: patients check in, wait, receive care and drive home while you grow the clinic one room at a time. Free, with no advertisements.",
    href: "/projects/little-lifeline",
    internal: true,
    image: "/projects/little-lifeline/app-icon.png",
    tint: "#dde8e4",
    fit: "contain",
    tags: ["Unity", "Idle management", "Offline first"],
  },
] as const;

/**
 * Hero headline audiences. The first entry is the static word screen
 * readers hear; the visual word cycles through all of them. Each colour
 * is a Kiln glaze checked at ≥ 3:1 against bone for large display text.
 */
export const heroAudiences = [
  { word: "patients", color: "#bf3a15" }, // fire
  { word: "service users", color: "#1e6e66" }, // verdigris
  { word: "residents", color: "#3d7838" }, // moss
  { word: "clients", color: "#2d5c9c" }, // cobalt
  { word: "customers", color: "#7a3a5c" }, // mulberry
  { word: "families", color: "#8f5f00" }, // ochre
  { word: "visitors", color: "#7a4a2a" }, // clay
] as const;

/** Ticker entries: client names interleaved with plain commitments. */
export const ticker = [
  "Pembroke Care",
  "WCAG 2.2 AA on every build",
  "Greenmead Housing",
  "Custom code, never a template",
  "Sandbourne Care",
  "UK hosted, daily backups",
  "JJ Paper Essentials",
  "One accountable person",
  "Sipli",
  "A reply within one working day",
  "Little Artist",
  "Little Lifeline",
] as const;

/* ─────────────────────────────────────────────────────────────
   Who it is for.
   ───────────────────────────────────────────────────────────── */

export const personas = [
  {
    who: "Practice managers",
    statement:
      "Fewer calls to reception, because the website answered first. Appointments, prescriptions and the NHS App where patients expect them.",
  },
  {
    who: "Care home owners",
    statement:
      "Families who arrive for a visit already reassured. Fees, the CQC report and daily life shown honestly, before anyone picks up the phone.",
  },
  {
    who: "Dental practices",
    statement:
      "NHS bands and private fees explained side by side, a calm route for nervous patients, and urgent care that is easy to find at 7am.",
  },
  {
    who: "Pharmacies",
    statement:
      "Pharmacy First, repeat prescriptions and real opening hours on every phone, so people know before they walk in.",
  },
  {
    who: "Clinics and therapists",
    statement:
      "Published prices and first-visit guidance that fill the diary, on a site you can update yourself between patients.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Process.
   ───────────────────────────────────────────────────────────── */

export const processSteps = [
  [
    "Listen",
    "Understand your organisation, the people you serve and what the website has to achieve before touching the interface.",
  ],
  [
    "Shape",
    "Structure, plain-English content and a visual language you can react to early, as working pages rather than static mock-ups.",
  ],
  [
    "Build",
    "Engineer the site in small, reviewable slices, with accessibility and speed checked throughout rather than bolted on at the end.",
  ],
  [
    "Ship",
    "Launch, measure and keep improving. The person who built it stays responsible for it.",
  ],
] as const;

/* ─────────────────────────────────────────────────────────────
   Never a page builder.
   ───────────────────────────────────────────────────────────── */

export const comparison = {
  them: "Off-the-shelf builders",
  us: "A Flutterly build",
  rows: [
    {
      label: "Custom design",
      them: "Usually a theme shared with other sites",
      us: "Designed and coded for your organisation",
    },
    {
      label: "Managed updates",
      them: "Plugins and themes you keep up to date yourself",
      us: "No plugins. A small, auditable surface area",
    },
    {
      label: "Speed",
      them: "Depends on the theme, plugins and hosting",
      us: "Static-first Next.js that stays fast on a poor signal",
    },
    {
      label: "Accessibility",
      them: "Whatever the theme happens to support",
      us: "WCAG 2.2 AA designed in from the first wireframe",
    },
    {
      label: "Clear ownership",
      them: "Depends on the platform's terms",
      us: "You own the code, the content and the domain",
    },
    {
      label: "Direct support",
      them: "Usually the platform's general support",
      us: "A direct line to the person who built it",
    },
  ],
} as const;

/* ─────────────────────────────────────────────────────────────
   Free website audit.
   ───────────────────────────────────────────────────────────── */

/** The seven scored areas, in the order the report shows them. */
export const auditChecks = [
  {
    title: "Accessibility",
    copy: "Language, alt text, labels, headings, landmarks, zoom and a published statement: the WCAG 2.2 basics that help everyone use a site.",
  },
  {
    title: "Speed",
    copy: "Server response, document weight, compression, render-blocking scripts, third parties and image handling, as a mid-range phone experiences them.",
  },
  {
    title: "Search",
    copy: "Titles, descriptions, indexability, canonical addresses, sitemap, social previews and structured data.",
  },
  {
    title: "Content and signposting",
    copy: "Can visitors complete the top tasks (book, order, enquire, find opening hours) without phoning you? Checked against what your sector\u2019s visitors actually arrive for.",
  },
  {
    title: "Mobile experience",
    copy: "Viewport setup, fixed-width layouts, tap-to-call numbers, readable type and responsive images.",
  },
  {
    title: "Security",
    copy: "HTTPS and its redirect, HSTS, protective headers, mixed content, leaked software versions and outdated libraries.",
  },
  {
    title: "Local presence",
    copy: "Whether Google can tell who you are, where you are, when you are open and what people think of you.",
  },
] as const;

export const auditPromises = [
  "Written in plain English, not a jargon-wrapped sales pitch",
  "Prioritised fixes you can hand to any developer",
  "Includes \u201ckeep what you have\u201d when that is the honest answer",
  "Free, with no follow-up pressure",
  "Nothing you enter is stored or shared",
] as const;

/* ─────────────────────────────────────────────────────────────
   Packages. Essentials and Standard publish a figure; Partnership
   is scoped after a short call. All prices exclude VAT.
   ───────────────────────────────────────────────────────────── */

export type Package = {
  name: string;
  strap: string;
  copy: string;
  features: readonly string[];
  featured?: boolean;
  /** Large figure, or a short stand-in for quoted work. */
  price: string;
  /** Cadence / VAT line under the figure. */
  pricePeriod: string;
  /** Optional extra, e.g. year-1 hosting. */
  priceNote?: string;
  cta: string;
};

export const packages: readonly Package[] = [
  {
    name: "Essentials",
    strap: "A focused site, done properly",
    copy: "For a small business or organisation that needs a clear, accessible website, hosted and backed up.",
    price: "£1,000",
    pricePeriod: "+ £29/month + VAT",
    cta: "Enquire about Essentials",
    features: [
      "Custom design and build, no themes or page builders",
      "Up to eight core pages, written in plain English",
      "WCAG 2.2 AA accessibility target with a published statement",
      "UK-served hosting, SSL and daily backups in the monthly fee",
      "Local SEO foundations and Google Business guidance",
      "Training so your team can edit with confidence",
    ],
  },
  {
    name: "Standard",
    strap: "Build plus a care plan",
    copy: "The full build with Flutterly looking after hosting, updates and small changes month to month.",
    price: "£1,000",
    pricePeriod: "+ £49/month + VAT",
    cta: "Enquire about Standard",
    features: [
      "Everything in Essentials",
      "Larger sitemap with news, vacancies and forms",
      "Managed hosting, monitoring and security updates",
      "A monthly allowance for content changes",
      "Quarterly accessibility and performance checks",
      "Same-week response on support requests",
    ],
    featured: true,
  },
  {
    name: "Partnership",
    strap: "An ongoing digital partner",
    copy: "For organisations that want the website continuously improved, not just maintained.",
    price: "Quoted",
    pricePeriod: "After a short scoping call",
    cta: "Talk about Partnership",
    features: [
      "Everything in Standard",
      "Content writing and photography direction",
      "New sections and journeys as your services change",
      "Search performance reviewed and acted on",
      "Priority response, including out-of-hours cover",
      "An annual in-person service review",
    ],
  },
] as const;

export const packagesFaq = [
  {
    q: "How much does a website cost?",
    a: "Essentials is £1,000 to build, then £29 a month, plus VAT, with hosting and backups included. Standard is £1,000 to build, then £49 a month, plus VAT, and adds updates, content changes and regular checks. Partnership is scoped after a short call, with a written quote within two working days.",
  },
  {
    q: "How long does a build take?",
    a: "The timeline is agreed at the first call and written into the quote. In practice the pace is set by how quickly content and photography come together, so that is where the plan starts.",
  },
  {
    q: "Do we own the website?",
    a: "Yes. The code, the content and the domain are yours. If you ever move on, everything is handed over cleanly. Nothing is held hostage in a subscription.",
  },
  {
    q: "Can you move our existing content across?",
    a: "Yes. Migration from an existing site, including rewriting pages into plain English where useful, is part of every build.",
  },
  {
    q: "Will the website be accessible?",
    a: "Every build targets WCAG 2.2 AA, is tested with keyboards and screen readers, and ships with an accessibility statement: the standard expected of NHS and public-sector websites.",
  },
  {
    q: "Where is the website hosted?",
    a: "On UK-served edge infrastructure with SSL, daily backups and monitoring. Every package includes hosting in the monthly fee. There is no plugin stack to patch, which removes the most common source of small-site security incidents.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Sector pages. GP practices and care homes share one template.
   ───────────────────────────────────────────────────────────── */

export type Sector = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  /** Optional italic emphasis rendered after the headline. */
  headlineEm?: string;
  intro: string;
  heroPoints: readonly string[];
  /** The hosted sample site built for this sector. */
  demo: {
    href: string;
    name: string;
    image: string;
    imageAlt: string;
    /** An inner page, so the second frame on the page shows depth. */
    innerImage: string;
    innerImageAlt: string;
    innerPath: string;
    /** The sample on a phone, for the 3D phone beside the inner page. */
    mobileImage: string;
    copy: string;
    points: readonly string[];
  };
  features: readonly { title: string; copy: string }[];
  compliance: {
    eyebrow: string;
    title: string;
    copy: string;
    points: readonly string[];
  };
  included: readonly string[];
  faqs: readonly { q: string; a: string }[];
  ctaTitle: string;
  ctaCopy: string;
};

export const gpSector: Sector = {
  slug: "gp-websites",
  metaTitle: "GP practice website design",
  metaDescription:
    "Accessible, fast websites for GP practices and surgeries: clear NHS signposting, self-serve patient journeys and WCAG 2.2 AA accessibility, designed, built and supported in the UK.",
  eyebrow: "Websites for GP practices",
  headline: "A practice website that works as hard as your reception team",
  intro:
    "Patients arrive stressed, in a hurry and often on an old phone. Your website should get them to the right service in seconds, and quietly take routine requests off the phones.",
  heroPoints: [
    "Signposting to the NHS App, online consultations and prescriptions",
    "WCAG 2.2 AA accessibility, tested with keyboards and screen readers",
    "Fast on any connection, with no page builders and no plugin stack",
  ],
  demo: {
    href: "/demo/gp-practice",
    name: "Willowbrook Surgery",
    image: "/demos/gp-home.png",
    imageAlt: "Homepage of the Willowbrook Surgery sample website",
    innerImage: "/demos/gp-appointments.png",
    innerImageAlt: "Appointments page of the Willowbrook Surgery sample website",
    innerPath: "/demo/gp-practice/appointments",
    mobileImage: "/demos/gp-mobile.webp",
    copy: "Willowbrook Surgery is a fictional practice built and hosted by Flutterly so you can judge the standard for yourself. Click around it on any device, exactly as your patients would.",
    points: [
      "Task-first homepage that answers before patients call",
      "NHS 111 and emergency signposting on every visit",
      "Self-serve answers, practice news and a published accessibility statement",
    ],
  },
  features: [
    {
      title: "Signposting that comes first",
      copy: "Appointments, prescriptions, online consultations and the NHS App sit front and centre, so the most common journeys take one tap rather than a hunt through menus.",
    },
    {
      title: "Accessible to every patient",
      copy: "Colour contrast, keyboard use, screen-reader labelling and plain-English content are designed in from the first wireframe, not patched in for an audit.",
    },
    {
      title: "Self-serve that cuts calls",
      copy: "Registration, fit notes, test results and travel advice become guided answers on the website, so reception spends less time repeating them on the phone.",
    },
    {
      title: "Easy for your team to update",
      copy: "Opening hours, closures, staff changes and practice news are simple, structured edits. No page builder to wrestle with between patients.",
    },
    {
      title: "Fast on every connection",
      copy: "Static-first engineering keeps pages quick on a poor mobile signal, which is exactly when many patients need you most.",
    },
    {
      title: "Dependable by design",
      copy: "UK-served hosting, SSL, daily backups and no plugins to patch. The boring things handled properly, permanently.",
    },
  ],
  compliance: {
    eyebrow: "Standards and compliance",
    title: "Built around the standards NHS websites are held to",
    copy: "Practice websites are expected to meet the public-sector accessibility regulations (WCAG 2.2 AA) and follow the NHS service manual. Every Flutterly build treats those as the starting line, not an add-on.",
    points: [
      "WCAG 2.2 AA target, aligned with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018",
      "A published accessibility statement, kept up to date",
      "Content patterns informed by the NHS service manual: plain English, task-first structure",
      "Clear privacy information and cookie behaviour that respects patients",
    ],
  },
  included: [
    "Discovery call and content review with your practice team",
    "Custom design, never an NHS-lookalike template refit",
    "All core pages: services, appointments, prescriptions, registration, team, news",
    "Self-serve patient guidance for your most common requests",
    "Accessibility statement and privacy pages",
    "Training, handover and ongoing support options",
  ],
  faqs: [
    {
      q: "Can you work with our existing appointment and prescription systems?",
      a: "Yes. The website links patients directly into the systems you already use (online consultation tools, the NHS App, your prescription ordering route) with clear guidance around each one.",
    },
    {
      q: "Do you meet the accessibility regulations that apply to NHS websites?",
      a: "Every build targets WCAG 2.2 AA, the level referenced by the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018, and ships with a maintained accessibility statement.",
    },
    {
      q: "Can the practice update the site itself?",
      a: "Yes. Day-to-day content (news, alerts, opening hours, team changes) is editable by your staff after a short training session, with Flutterly available for anything bigger.",
    },
    {
      q: "What happens to our current website?",
      a: "Content worth keeping is migrated and rewritten where useful, redirects preserve your search rankings, and the switchover happens without downtime.",
    },
  ],
  ctaTitle: "Ready to give your patients a better front door?",
  ctaCopy: "Start with the free audit, a written review of your current site against WCAG 2.2 AA and the NHS service manual, or book a short call to talk about a quote.",
};

export const careSector: Sector = {
  slug: "care-home-websites",
  metaTitle: "Care home website design",
  metaDescription:
    "Warm, trustworthy websites for care homes, designed for families researching care, with CQC transparency, admissions journeys and recruitment built in. UK design and support.",
  eyebrow: "Websites for care homes",
  headline: "The first visit to your home happens online",
  intro:
    "Choosing care is emotional and often urgent. Families need warmth they can feel and facts they can check, long before they pick up the phone.",
  heroPoints: [
    "Designed for relatives researching care, often late at night",
    "CQC rating and inspection report presented openly",
    "Clear routes to enquire, book a visit or request a brochure",
  ],
  demo: {
    href: "/demo/care-home",
    name: "Oakfield House",
    image: "/demos/care-home.png",
    imageAlt: "Homepage of the Oakfield House sample website",
    innerImage: "/demos/care-families.png",
    innerImageAlt: "For families page of the Oakfield House sample website",
    innerPath: "/demo/care-home/families",
    mobileImage: "/demos/care-mobile.webp",
    copy: "Oakfield House is a fictional care home built and hosted by Flutterly so you can judge the standard for yourself: warm, honest and clear, the way families need it to be.",
    points: [
      "Families-first structure with fees published plainly",
      "CQC-style transparency, front and centre",
      "Visiting, recruitment and daily life shown honestly",
    ],
  },
  features: [
    {
      title: "Families first",
      copy: "The site is structured around the questions relatives actually ask: what care you provide, what it feels like, what it costs and what happens next.",
    },
    {
      title: "Show the home honestly",
      copy: "Photo-led pages for rooms, gardens, food and daily life do more reassuring than any brochure copy, presented beautifully and loading fast.",
    },
    {
      title: "CQC transparency",
      copy: "Your rating and latest inspection report are easy to find and honestly framed. Openness reads as confidence, and families notice.",
    },
    {
      title: "Enquiries made easy",
      copy: "Phone, visit booking and brochure requests are one tap from every page, with each enquiry reaching the right person in your team.",
    },
    {
      title: "Recruitment that works",
      copy: "Carers research employers the way families research homes. Dedicated careers pages show your culture and make applying simple.",
    },
    {
      title: "News families can follow",
      copy: "Activities, events and seasonal moments are easy for your team to post, showing life in the home and reassuring relatives at a distance.",
    },
  ],
  compliance: {
    eyebrow: "Trust and transparency",
    title: "Built for the scrutiny care providers are under",
    copy: "Families cross-check everything: your CQC report, your fees page, your reviews. The website is designed so what they find confirms what you told them.",
    points: [
      "CQC rating displayed with a direct link to the full report",
      "Fee and funding information presented clearly, as CQC guidance encourages",
      "Accessible to older relatives: WCAG 2.2 AA target, larger type, clear contrast",
      "Visiting, safeguarding and complaints information easy to locate",
    ],
  },
  included: [
    "Discovery visit or call with your home's team",
    "Warm, custom design shaped around your home, never a template",
    "Pages for care types, rooms, life at the home, team, fees and FAQs",
    "Photography direction, or careful use of the photos you have",
    "Enquiry, visit-booking and recruitment journeys",
    "Training, handover and ongoing support options",
  ],
  faqs: [
    {
      q: "Can you build one site for a small group of homes?",
      a: "Yes. A group site with a consistent design and a distinct, findable section for each home works well, and each home can still hold its own place in local search results.",
    },
    {
      q: "We don't have good photography. Does that matter?",
      a: "It matters more than most things, so it is planned for: either direction for a local photographer or careful, honest use of what you already have until new photos exist.",
    },
    {
      q: "Can the site help with recruitment as well as occupancy?",
      a: "Yes. Careers pages with real staff voices and a simple application route are part of the build. The same website that reassures families also persuades carers.",
    },
    {
      q: "Who updates the website once it is live?",
      a: "Your team, for news and day-to-day changes, after a short training session. Flutterly handles anything structural, or everything, depending on the package you choose.",
    },
  ],
  ctaTitle: "Ready to give families a better first visit?",
  ctaCopy: "Start with the free audit, a written review of how your current site serves families, or book a short call to talk about your home.",
};

export const sectors = [gpSector, careSector] as const;

/* ─────────────────────────────────────────────────────────────
   Clear Path — Leaving My Surgery Website.
   Time-boxed GP migration for Berkshire / Thames Valley.
   Prices and CTAs are locked (see CLEAR-PATH-HANDOFF.md).
   ───────────────────────────────────────────────────────────── */

export const clearPath = {
  metaTitle: "Leaving My Surgery Website | Clear Path migration",
  metaDescription:
    "MSW hosting ends 31 March 2027. Clear Path is a time-boxed website migration for Berkshire and Thames Valley GP practices — a site you own, WCAG 2.2 AA, without a full redesign project.",
  packages: [
    {
      name: "Move Essentials",
      strap: "A time-boxed move, done properly",
      copy: "We move your content, sort the domain, and get you live on a modern site you own, hosted and backed up.",
      price: "£1,000",
      pricePeriod: "+ £29/mo + VAT",
      cta: "Book a free audit",
      ctaHref: "/free-audit",
      featured: false,
      features: [
        "Content moved from your current MSW site",
        "Domain sorted, on a site you own",
        "Built for WCAG 2.2 AA",
        "No WordPress page-builder stack",
        "Founder-led: you brief the person who builds",
      ],
    },
    {
      name: "Move Standard",
      strap: "Custom build plus ongoing care",
      copy: "A custom website migration with ongoing hosting and support.",
      price: "£1,000",
      pricePeriod: "+ £49/mo + VAT",
      cta: "Book a free audit",
      ctaHref: "/free-audit",
      featured: true,
      features: [
        "Everything in Move Essentials",
        "Custom design, not a managed template",
        "Appointments and prescriptions still easy to find",
        "Managed hosting in the monthly fee",
        "Handover: who updates what, hosting path, support",
        "Same-week response on support requests",
      ],
    },
  ],
  steps: [
    {
      title: "Free audit",
      copy: "We review your current MSW site and flag what has to move.",
    },
    {
      title: "Clear quote",
      copy: "Essentials or Standard, timeline, and what you own — in writing.",
    },
    {
      title: "Migration",
      copy: "Domain, content, appointments and prescriptions still easy to find, then go-live.",
    },
    {
      title: "Handover",
      copy: "Who updates what, the hosting path, and how support works after launch.",
    },
  ],
  dates: [
    {
      label: "Domain pressure",
      when: "1 September 2026",
      copy: "Domain and support pressure often around this date if MSW administers your domain — confirm in your letter.",
    },
    {
      label: "MSW hosting ends",
      when: "31 March 2027",
      copy: "Public notices point to hosting ending on this date. Check your own MSW letter for your exact dates.",
    },
    {
      label: "Reserve by",
      when: "31 October 2026",
      copy: "Clear Path places are reserved by this date so go-live is not left to the last months of hosting.",
    },
  ],
} as const;

/* ─────────────────────────────────────────────────────────────
   Navigation and footer.
   ───────────────────────────────────────────────────────────── */

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/gp-websites", label: "Healthcare" },
  { href: "/#studio", label: "Studio" },
  { href: "/#contact", label: "Contact" },
] as const;

export const footerColumns = [
  {
    title: "Services",
    links: [
      ...services.map((s) => ({ label: s.name, href: serviceHref(s.slug) })),
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Healthcare",
    links: [
      { label: "GP practice websites", href: "/gp-websites" },
      { label: "Care home websites", href: "/care-home-websites" },
      { label: "Leaving My Surgery Website", href: "/leaving-msw" },
      { label: "Website packages", href: "/packages" },
      { label: "Free website audit", href: "/free-audit" },
    ],
  },
  {
    title: "Sample sites",
    links: samples.map((s) => ({ label: s.name, href: s.href })),
  },
  {
    title: "Work",
    links: [
      { label: "Pembroke Care", href: "https://pembrokecare.com/" },
      { label: "Sandbourne", href: "https://sandbournecare.co.uk/" },
      { label: "Greenmead", href: "https://www.greenmead.co.uk/" },
      { label: "JJ Paper", href: "https://www.jjpaperessential.com/" },
      { label: "Sipli", href: "/projects/sipli" },
      { label: "Little Artist", href: "/projects/artling" },
      { label: "Little Lifeline", href: "/projects/little-lifeline" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/#studio" },
      { label: "Process", href: "/#process" },
      { label: "Book a call", href: "/book" },
      { label: "Accessibility statement", href: "/accessibility" },
      { label: "GitHub", href: "https://github.com/its-me-anoop" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anoop-jose-0b308a296/" },
    ],
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Rebrand homepage: the hero line, the work tiles and the process.
   ───────────────────────────────────────────────────────────── */

export const heroCopy = {
  lines: ["Your", "digital side,"] as const,
  emphasis: "sorted.",
  copy: "Websites and apps, the IT that runs underneath them, and the search and social that bring people in. Designed, coded and looked after in Reading by the person you brief.",
  /** Bottom strip of the hero frame. */
  strip: ["Reading, UK · 51.4543° N 0.9781° W", "Websites / Apps / IT support / Social / SEO", "Build · Run · Grow"] as const,
} as const;

/**
 * The work section's tiles, in grid order. Rows pair a wide tile (7 of
 * 12 columns) with a narrow one (5); a "full" tile takes the whole row.
 * `project` names the matching entry in `projects`, so every project
 * appears exactly once.
 */
export const featuredWork = [
  {
    key: "pembroke",
    project: "Pembroke Care",
    span: "wide",
    eyebrow: "Care provider · Website rebuild · 2026",
    title: "Pembroke Care",
    copy: "A full rebuild for a boutique residential, respite and transitional-living provider in Reading, written for families choosing care.",
    href: "https://pembrokecare.com/",
    linkLabel: "Visit pembrokecare.com",
    cursor: "Visit Pembroke Care",
    sketch: "site",
    sketchLabel: "IMG · Live site · 1920 × 1200",
    image: { src: "/project-pembroke.png", alt: "Pembroke Care website, home page" },
  },
  {
    key: "sipli",
    project: "Sipli",
    span: "narrow",
    eyebrow: "iPhone, iPad and Apple Watch · Our app",
    title: "Sipli",
    copy: "An adaptive hydration companion that turns goals, weather and Apple Health data into one calm daily rhythm.",
    href: "/projects/sipli",
    linkLabel: "Read the Sipli story",
    cursor: "Sipli case study",
    sketch: "phone",
    sketchLabel: "Screen · 1284 × 2778",
  },
  {
    key: "lifeline",
    project: "Little Lifeline",
    span: "narrow",
    eyebrow: "iPhone and iPad game · Our app",
    title: "Little Lifeline",
    copy: "A miniature 3D clinic management game. Start with one reception desk and grow from there.",
    href: "/projects/little-lifeline",
    linkLabel: "Read the Little Lifeline story",
    cursor: "Little Lifeline case study",
    sketch: "type",
    sketchLabel: "Icon · 512 × 512",
  },
  {
    key: "sandbourne",
    project: "Sandbourne",
    span: "wide",
    eyebrow: "Care provider · Website · 2024",
    title: "Sandbourne Care",
    copy: "A reassuring digital presence for residential, supported-living and respite care services.",
    href: "https://sandbournecare.co.uk/",
    linkLabel: "Visit sandbournecare.co.uk",
    cursor: "Visit Sandbourne Care",
    sketch: "site",
    sketchLabel: "IMG · Live site · 1920 × 1200",
    image: { src: "/project-sandbourne.png", alt: "Sandbourne Care website, home page" },
  },
  {
    key: "greenmead",
    project: "Greenmead",
    span: "wide",
    eyebrow: "Housing organisation · Accessible website · 2024",
    title: "Greenmead Housing",
    copy: "A clear, person-centred website for a housing organisation supporting adults with complex needs.",
    href: "https://www.greenmead.co.uk/",
    linkLabel: "Visit greenmead.co.uk",
    cursor: "Visit Greenmead Housing",
    sketch: "site",
    sketchLabel: "IMG · Live site · 1920 × 1200",
    image: { src: "/project-greenmead.png", alt: "Greenmead Housing website, home page" },
  },
  {
    key: "artling",
    project: "Little Artist",
    span: "narrow",
    eyebrow: "iPhone and iPad app · Our app",
    title: "Little Artist",
    copy: "A private archive for children's artwork, milestones and family memories, designed to feel quiet and lasting.",
    href: "/projects/artling",
    linkLabel: "Read the Little Artist story",
    cursor: "Little Artist case study",
    sketch: "portrait",
    sketchLabel: "Art · 600 × 840",
  },
  {
    key: "jjpaper",
    project: "JJ Paper",
    span: "full",
    eyebrow: "B2B supplier · Website · 2024",
    title: "JJ Paper Essentials",
    copy: "A commercial site that explains a sustainable paper supply chain without losing speed or credibility.",
    href: "https://www.jjpaperessential.com/",
    linkLabel: "Visit jjpaperessential.com",
    cursor: "Visit JJ Paper Essentials",
    sketch: "site",
    sketchLabel: "IMG · Live site · 1920 × 1200",
    image: { src: "/project-jjpaper.png", alt: "JJ Paper Essentials website, home page" },
  },
] as const;

export const rebrandProcess = [
  ["Call", "A short call about what you need and what good looks like."],
  ["Plan", "A written proposal with scope, price and timeline before anything gets built."],
  ["Build", "Designed, coded and tested, with a working link you can click through as it grows."],
  ["Look after", "Hosting, updates, IT, search and social for as long as you want them."],
] as const;
