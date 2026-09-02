/**
 * Content model for the Kiln marketing site. The homepage, sector
 * pages, packages and audit routes all read from here so copy, links
 * and imagery stay in one reviewable place.
 *
 * Voice: short declarative sentences, plain English, no invented
 * statistics. Fictional sample sites are always called sample sites.
 */

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
    status: "In development",
    description:
      "A boutique residential, respite and transitional-living provider in Reading. A calm, warm site that replaces pembrokecare.com at launch.",
    href: "https://pembroke-care.vercel.app/",
    internal: false,
    image: "/project-pembroke.png",
    tint: "#e6e2d6",
    tags: ["Care sector", "Hospital to home", "Next.js"],
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
    type: "iOS and watchOS app",
    year: "2026",
    description:
      "An adaptive hydration companion that turns changing goals, weather and HealthKit data into one calm daily rhythm.",
    href: "/projects/sipli",
    internal: true,
    image: "/projects/sipli/iphone_and_ipad.png",
    tint: "#d9e2e6",
    fit: "contain",
    tags: ["SwiftUI", "HealthKit", "On-device intelligence"],
  },
  {
    name: "Artling",
    type: "iOS app",
    year: "2025",
    description:
      "A private visual archive for children's artwork, milestones and family memories, designed to feel quiet and lasting.",
    href: "/projects/artling",
    internal: true,
    image: "/projects/artling/fox-painter.png",
    tint: "#ede1cd",
    fit: "contain",
    tags: ["SwiftUI", "Local first", "Family sharing"],
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
  "JJ Paper Essential",
  "One accountable person",
  "Sipli",
  "A reply within one working day",
  "Artling",
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
  them: "Typical template builders",
  us: "A Flutterly build",
  rows: [
    {
      label: "Platform",
      them: "A generic theme shared with thousands of sites",
      us: "Designed and coded for your organisation",
    },
    {
      label: "Security",
      them: "A plugin stack that needs constant patching",
      us: "No plugins. A small, auditable surface area",
    },
    {
      label: "Speed",
      them: "Heavy page builders and slow scores",
      us: "Static-first Next.js that stays fast on a poor signal",
    },
    {
      label: "Accessibility",
      them: "Whatever the theme happens to support",
      us: "WCAG 2.2 AA designed in from the first wireframe",
    },
    {
      label: "Ownership",
      them: "Content locked inside a subscription",
      us: "You own the code, the content and the domain",
    },
    {
      label: "Support",
      them: "Ticket queues and account managers",
      us: "A direct line to the person who built it",
    },
  ],
} as const;

/* ─────────────────────────────────────────────────────────────
   Free website audit.
   ───────────────────────────────────────────────────────────── */

export const auditChecks = [
  {
    title: "Accessibility",
    copy: "Automated and manual checks against WCAG 2.2 AA: contrast, keyboard use, screen-reader labelling and focus order.",
  },
  {
    title: "Speed and Core Web Vitals",
    copy: "Lab and field performance on a mid-range phone over 4G, with the fixes ranked by impact.",
  },
  {
    title: "Mobile experience",
    copy: "Layout, tap targets and readability at the sizes most patients and families actually browse on.",
  },
  {
    title: "Content and signposting",
    copy: "Can visitors complete the top tasks (book, enquire, find opening hours) without phoning you?",
  },
  {
    title: "Local search",
    copy: "How you appear on Google for the searches that matter locally, and what is holding rankings back.",
  },
  {
    title: "Security basics",
    copy: "HTTPS, security headers, stale platform software and anything leaking more than it should.",
  },
] as const;

export const auditPromises = [
  "Written in plain English, not a jargon-wrapped sales pitch",
  "Prioritised fixes you can hand to any developer",
  "Includes \u201ckeep what you have\u201d when that is the honest answer",
  "Free, with no follow-up pressure",
] as const;

/* ─────────────────────────────────────────────────────────────
   Packages. Presented without hard prices: quotes are tailored
   after a short scoping call, mirroring how the studio works.
   ───────────────────────────────────────────────────────────── */

export type Package = {
  name: string;
  strap: string;
  copy: string;
  features: readonly string[];
  featured?: boolean;
};

export const packages: readonly Package[] = [
  {
    name: "Essentials",
    strap: "A focused site, done properly",
    copy: "For a practice or home that needs a clear, accessible website without ongoing extras.",
    features: [
      "Custom design and build, no themes or page builders",
      "Up to eight core pages, written in plain English",
      "WCAG 2.2 AA accessibility target with a published statement",
      "UK-served hosting, SSL and daily backups set up",
      "Local SEO foundations and Google Business guidance",
      "Training so your team can edit with confidence",
    ],
  },
  {
    name: "Standard",
    strap: "Build plus a care plan",
    copy: "The full build with Flutterly looking after hosting, updates and small changes month to month.",
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
    name: "Complete",
    strap: "An ongoing digital partner",
    copy: "For organisations that want the website continuously improved, not just maintained.",
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
    a: "It depends on the size of the site and how much ongoing help you want, so every quote is prepared individually after a short call. You will have a written, fixed quote within two working days, and it does not change afterwards.",
  },
  {
    q: "How long does a build take?",
    a: "Most GP practice and care home websites launch four to eight weeks after the first call, depending on how quickly content and photography come together.",
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
    a: "On UK-served edge infrastructure with SSL, daily backups and monitoring included. There is no plugin stack to patch, which removes the most common source of small-site security incidents.",
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
    "WCAG 2.2 AA accessibility, tested with real assistive technology",
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
    copy: "Practice websites are expected to meet public-sector accessibility regulations and NHS content guidance. Every Flutterly build treats those as the starting line, not an add-on.",
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
      q: "Do you meet NHS accessibility requirements?",
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
  ctaCopy: "Start with the free audit, a written review of your current site against NHS accessibility and content standards, or get in touch for a quote.",
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
  ctaCopy: "Start with the free audit, a written review of how your current site serves families, or get in touch to talk about your home.",
};

export const sectors = [gpSector, careSector] as const;

/* ─────────────────────────────────────────────────────────────
   Navigation and footer.
   ───────────────────────────────────────────────────────────── */

export const navLinks = [
  { href: "/#services", label: "Sample sites" },
  { href: "/gp-websites", label: "GP practices" },
  { href: "/care-home-websites", label: "Care homes" },
  { href: "/packages", label: "Packages" },
  { href: "/#work", label: "Work" },
] as const;

export const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "GP practice websites", href: "/gp-websites" },
      { label: "Care home websites", href: "/care-home-websites" },
      { label: "Packages", href: "/packages" },
      { label: "Free website audit", href: "/free-audit" },
    ],
  },
  {
    title: "Sample sites",
    links: [
      { label: "Willowbrook Surgery", href: "/demo/gp-practice" },
      { label: "Oakfield House", href: "/demo/care-home" },
      { label: "Kennet Bridge Dental", href: "/demo/dental-practice" },
      { label: "Willowbrook Pharmacy", href: "/demo/pharmacy" },
      { label: "Forbury Physiotherapy", href: "/demo/physio-clinic" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Pembroke Care", href: "https://pembroke-care.vercel.app/" },
      { label: "Sandbourne", href: "https://sandbournecare.co.uk/" },
      { label: "Greenmead", href: "https://www.greenmead.co.uk/" },
      { label: "JJ Paper", href: "https://www.jjpaperessential.com/" },
      { label: "Sipli", href: "/projects/sipli" },
      { label: "Artling", href: "/projects/artling" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Process", href: "/#process" },
      { label: "About", href: "/#about" },
      { label: "Accessibility statement", href: "/accessibility" },
      { label: "GitHub", href: "https://github.com/its-me-anoop" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anoop-jose-0b308a296/" },
    ],
  },
] as const;
