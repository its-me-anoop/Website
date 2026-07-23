/**
 * Content model for the Bloom marketing site — the homepage, sector
 * pages, packages and audit routes all read from here so copy, links
 * and imagery stay in one reviewable place.
 */

export type Project = {
  name: string;
  type: string;
  year: string;
  description: string;
  href: string;
  internal: boolean;
  image: string;
  /** Card / tile tint behind the artwork. */
  tint: string;
  tags: readonly string[];
};

export const projects: readonly Project[] = [
  {
    name: "Sandbourne",
    type: "Care web",
    year: "2024",
    description:
      "A reassuring digital presence for residential, supported-living and respite care services.",
    href: "https://sandbournecare.co.uk/",
    internal: false,
    image: "/project-sandbourne.png",
    tint: "#ece5f1",
    tags: ["Care sector", "UX writing", "Performance"],
  },
  {
    name: "Greenmead",
    type: "Accessible web",
    year: "2024",
    description:
      "A clear, person-centred website for a housing organisation supporting adults with complex needs.",
    href: "https://www.greenmead.co.uk/",
    internal: false,
    image: "/project-greenmead.png",
    tint: "#e2efe3",
    tags: ["Accessibility", "Next.js", "Content design"],
  },
  {
    name: "JJ Paper",
    type: "B2B web",
    year: "2024",
    description:
      "A commercial site that explains a sustainable paper supply chain without losing speed or credibility.",
    href: "https://www.jjpaperessential.com/",
    internal: false,
    image: "/project-jjpaper.png",
    tint: "#ece7dc",
    tags: ["Brand system", "Responsive web", "SEO"],
  },
  {
    name: "Sipli",
    type: "iOS + watchOS",
    year: "2026",
    description:
      "An adaptive hydration companion that turns changing goals, weather and HealthKit data into one calm daily rhythm.",
    href: "/projects/sipli",
    internal: true,
    image: "/projects/sipli/dashboard.png",
    tint: "#dbe7ee",
    tags: ["SwiftUI", "HealthKit", "On-device intelligence"],
  },
  {
    name: "Artling",
    type: "iOS",
    year: "2025",
    description:
      "A private visual archive for children’s artwork, milestones and family memories, designed to feel quiet and lasting.",
    href: "/projects/artling",
    internal: true,
    image: "/projects/artling/fox-painter.png",
    tint: "#f3e7d3",
    tags: ["SwiftUI", "Local first", "Family sharing"],
  },
] as const;

/** Wordmarks for the “Trusted by” band. */
export const trustedBy = [
  "Greenmead Housing",
  "JJ Paper Essential",
  "Sandbourne Care",
  "Sipli",
  "Artling",
  "Little Artist",
] as const;

/** Honest hero credentials — commitments, not invented statistics. */
export const heroStats = [
  { value: "5", label: "live products and client sites" },
  { value: "100%", label: "custom code — never a template" },
  { value: "WCAG 2.2 AA", label: "accessibility target on every build" },
  { value: "1 day", label: "to hear back on any enquiry" },
] as const;

/** The three service cards (“the suite”). */
export const suite = [
  {
    id: "healthcare-websites",
    title: "Healthcare websites",
    copy: "Websites for GP practices and care homes that patients, residents and families can actually use — accessible, fast and easy for your team to keep current.",
    points: ["GP practices", "Care homes", "Supported living"],
    cta: { label: "Explore sectors", href: "#sectors" },
    tone: "teal",
  },
  {
    id: "web-engineering",
    title: "Web & product engineering",
    copy: "Marketing sites, portals and web applications built on Next.js — static-first, measurable and maintained as systems rather than one-off pages.",
    points: ["Next.js & React", "Design systems", "SEO & performance"],
    cta: { label: "See the work", href: "#work" },
    tone: "pine",
  },
  {
    id: "mobile-apps",
    title: "Mobile apps",
    copy: "Native and cross-platform apps with careful interaction design, dependable architecture and a clear route to the App Store.",
    points: ["SwiftUI", "Flutter", "App Store releases"],
    cta: { label: "View a case study", href: "/projects/sipli" },
    tone: "light",
  },
] as const;

/** Sector cards on the homepage. */
export const sectorCards = [
  {
    slug: "gp-websites",
    eyebrow: "For GP practices",
    title: "A practice website that takes work off the phones",
    copy: "Clear signposting to appointments, prescriptions and the NHS App, self-serve answers for common requests, and accessibility designed in from the start.",
    points: [
      "Signposting to NHS App and online services",
      "WCAG 2.2 AA accessibility target",
      "Self-serve pages that reduce reception calls",
      "Easy updates for practice news and alerts",
    ],
    accent: "nhs",
    cta: "GP practice websites",
    demoHref: "/demo/gp-practice",
    demoLabel: "Preview a sample practice site",
  },
  {
    slug: "care-home-websites",
    eyebrow: "For care homes",
    title: "A home families trust before they ever visit",
    copy: "Warm, photo-led design for relatives researching care — with your CQC rating, visiting information, admissions routes and recruitment handled properly.",
    points: [
      "Designed for families first",
      "CQC rating and report, front and centre",
      "Clear enquiry and admissions journeys",
      "Recruitment pages that attract carers",
    ],
    accent: "amber",
    cta: "Care home websites",
    demoHref: "/demo/care-home",
    demoLabel: "Preview a sample home site",
  },
] as const;

/** “Never a page builder” comparison table. */
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
      us: "No plugins — a small, auditable surface area",
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

/** What the free website audit covers. */
export const auditChecks = [
  {
    title: "Accessibility",
    copy: "Automated and manual checks against WCAG 2.2 AA — contrast, keyboard use, screen-reader labelling and focus order.",
  },
  {
    title: "Speed & Core Web Vitals",
    copy: "Lab and field performance on a mid-range phone over 4G, with the fixes ranked by impact.",
  },
  {
    title: "Mobile experience",
    copy: "Layout, tap targets and readability at the sizes most patients and families actually browse on.",
  },
  {
    title: "Content & signposting",
    copy: "Can visitors complete the top tasks — book, enquire, find opening hours — without phoning you?",
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

/** Why organisations choose an independent studio. */
export const whyFlutterly = [
  {
    title: "One accountable person",
    copy: "You work directly with the designer-engineer who builds your site — no account managers, hand-offs or juniors learning on your project.",
  },
  {
    title: "Built for the people you serve",
    copy: "Patients in a hurry, relatives researching care at midnight, staff updating a page between tasks — every decision starts with them.",
  },
  {
    title: "Evidence over promises",
    copy: "A free, written audit before any commitment, live client sites you can visit today, and measurable targets for speed and accessibility.",
  },
] as const;

export const processSteps = [
  ["Listen", "Understand your organisation, the people you serve and what the website must achieve before touching the interface."],
  ["Shape", "Structure, plain-English content and a visual language you can react to early — as working pages, not static mock-ups."],
  ["Build", "Engineer the site in small, reviewable slices with accessibility and speed checked throughout, not bolted on at the end."],
  ["Ship", "Launch, measure and keep improving — the same person who built it stays responsible for it."],
] as const;

/* ─────────────────────────────────────────────────────────────
   Packages — presented without hard prices (quotes are tailored
   after a short scoping call, mirroring how the studio works).
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
      "Custom design and build — no themes or page builders",
      "Up to eight core pages, written for plain English",
      "WCAG 2.2 AA accessibility target with statement",
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
    a: "It depends on the size of the site and how much ongoing help you want, so every quote is prepared individually after a short call. You will have a written, fixed quote within two working days — no surprises afterwards.",
  },
  {
    q: "How long does a build take?",
    a: "Most GP practice and care home websites launch four to eight weeks after the first call, depending on how quickly content and photography come together.",
  },
  {
    q: "Do we own the website?",
    a: "Yes. The code, the content and the domain are yours. If you ever move on, everything is handed over cleanly — nothing is held hostage in a subscription.",
  },
  {
    q: "Can you move our existing content across?",
    a: "Yes. Migration from an existing site — including rewriting pages into plain English where useful — is part of every build.",
  },
  {
    q: "Will the website be accessible?",
    a: "Every build targets WCAG 2.2 AA, is tested with keyboards and screen readers, and ships with an accessibility statement — the standard expected of NHS and public-sector websites.",
  },
  {
    q: "Where is the website hosted?",
    a: "On UK-served edge infrastructure with SSL, daily backups and monitoring included. There is no plugin stack to patch, which removes the most common source of small-site security incidents.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Sector pages — GP practices and care homes share one template.
   ───────────────────────────────────────────────────────────── */

export type Sector = {
  slug: string;
  accent: "nhs" | "amber";
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  heroPoints: readonly string[];
  heroImage: { src: string; alt: string; tint: string };
  /** The hosted sample site built for this sector. */
  demo: {
    href: string;
    name: string;
    image: string;
    imageAlt: string;
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
  accent: "nhs",
  metaTitle: "GP practice website design",
  metaDescription:
    "Accessible, fast websites for GP practices and surgeries — clear NHS signposting, self-serve patient journeys and WCAG 2.2 AA accessibility, designed, built and supported in the UK.",
  eyebrow: "Websites for GP practices",
  headline: "A practice website that works as hard as your reception team",
  intro:
    "Patients arrive stressed, in a hurry and often on an old phone. Your website should get them to the right service in seconds — and quietly take routine requests off the phones.",
  heroPoints: [
    "Signposting to the NHS App, online consultations and prescriptions",
    "WCAG 2.2 AA accessibility, tested with real assistive technology",
    "Fast on any connection — no page builders, no plugin stack",
  ],
  heroImage: {
    src: "/demos/gp-home.png",
    alt: "The Willowbrook Surgery sample website — a task-first GP practice homepage built by Flutterly",
    tint: "var(--bl-nhs-soft)",
  },
  demo: {
    href: "/demo/gp-practice",
    name: "Willowbrook Surgery",
    image: "/demos/gp-home.png",
    imageAlt: "Homepage of the Willowbrook Surgery sample website",
    copy: "Willowbrook Surgery is a fictional practice built and hosted by Flutterly so you can judge the standard for yourself — click around it on any device, exactly as your patients would.",
    points: [
      "Task-first homepage that answers before patients call",
      "NHS 111 and emergency signposting on every visit",
      "Self-serve answers, practice news and a published accessibility statement",
    ],
  },
  features: [
    {
      title: "Signposting that comes first",
      copy: "Appointments, prescriptions, online consultations and the NHS App sit front and centre, so the most common journeys take one tap — not a hunt through menus.",
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
      copy: "Opening hours, closures, staff changes and practice news are simple, structured edits — no page builder to wrestle with between patients.",
    },
    {
      title: "Fast on every connection",
      copy: "Static-first engineering keeps pages quick on a poor mobile signal, which is exactly when many patients need you most.",
    },
    {
      title: "Dependable by design",
      copy: "UK-served hosting, SSL, daily backups and no plugins to patch — the boring things handled properly, permanently.",
    },
  ],
  compliance: {
    eyebrow: "Standards & compliance",
    title: "Built around the standards NHS websites are held to",
    copy: "Practice websites are expected to meet public-sector accessibility regulations and NHS content guidance. Every Flutterly build treats those as the starting line, not an add-on.",
    points: [
      "WCAG 2.2 AA target, aligned with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018",
      "A published accessibility statement, kept up to date",
      "Content patterns informed by the NHS service manual — plain English, task-first structure",
      "Clear privacy information and cookie behaviour that respects patients",
    ],
  },
  included: [
    "Discovery call and content review with your practice team",
    "Custom design — no NHS-lookalike template refits",
    "All core pages: services, appointments, prescriptions, registration, team, news",
    "Self-serve patient guidance for your most common requests",
    "Accessibility statement and privacy pages",
    "Training, handover and ongoing support options",
  ],
  faqs: [
    {
      q: "Can you work with our existing appointment and prescription systems?",
      a: "Yes. The website links patients directly into the systems you already use — online consultation tools, the NHS App, your prescription ordering route — with clear guidance around each one.",
    },
    {
      q: "Do you meet NHS accessibility requirements?",
      a: "Every build targets WCAG 2.2 AA — the level referenced by the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 — and ships with a maintained accessibility statement.",
    },
    {
      q: "Can the practice update the site itself?",
      a: "Yes. Day-to-day content — news, alerts, opening hours, team changes — is editable by your staff after a short training session, with Flutterly available for anything bigger.",
    },
    {
      q: "What happens to our current website?",
      a: "Content worth keeping is migrated and rewritten where useful, redirects preserve your search rankings, and the switchover happens without downtime.",
    },
  ],
  ctaTitle: "Ready to give your patients a better front door?",
  ctaCopy: "Start with the free audit — a written review of your current site against NHS accessibility and content standards — or get in touch for a quote.",
};

export const careSector: Sector = {
  slug: "care-home-websites",
  accent: "amber",
  metaTitle: "Care home website design",
  metaDescription:
    "Warm, trustworthy websites for care homes — designed for families researching care, with CQC transparency, admissions journeys and recruitment built in. UK design and support.",
  eyebrow: "Websites for care homes",
  headline: "The first visit to your home happens online",
  intro:
    "Choosing care is emotional and often urgent. Families need warmth they can feel and facts they can check — long before they pick up the phone.",
  heroPoints: [
    "Designed for relatives researching care, often late at night",
    "CQC rating and inspection report presented openly",
    "Clear routes to enquire, book a visit or request a brochure",
  ],
  heroImage: {
    src: "/project-sandbourne.png",
    alt: "The Sandbourne Care website built by Flutterly",
    tint: "var(--bl-amber-soft)",
  },
  demo: {
    href: "/demo/care-home",
    name: "Oakfield House",
    image: "/demos/care-home.png",
    imageAlt: "Homepage of the Oakfield House sample website",
    copy: "Oakfield House is a fictional care home built and hosted by Flutterly so you can judge the standard for yourself — warm, honest and clear, the way families need it to be.",
    points: [
      "Families-first structure with fees published plainly",
      "CQC-style transparency, front and centre",
      "Visiting, recruitment and daily life shown honestly",
    ],
  },
  features: [
    {
      title: "Families first",
      copy: "The site is structured around the questions relatives actually ask — what care you provide, what it feels like, what it costs and what happens next.",
    },
    {
      title: "Show the home honestly",
      copy: "Photo-led pages for rooms, gardens, food and daily life do more reassuring than any brochure copy — presented beautifully and loading fast.",
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
      copy: "Activities, events and seasonal moments are easy for your team to post — showing life in the home and reassuring relatives at a distance.",
    },
  ],
  compliance: {
    eyebrow: "Trust & transparency",
    title: "Built for the scrutiny care providers are under",
    copy: "Families cross-check everything — your CQC report, your fees page, your reviews. The website is designed so what they find confirms what you told them.",
    points: [
      "CQC rating displayed with a direct link to the full report",
      "Fee and funding information presented clearly, as CQC guidance encourages",
      "Accessible to older relatives — WCAG 2.2 AA target, larger type, clear contrast",
      "Visiting, safeguarding and complaints information easy to locate",
    ],
  },
  included: [
    "Discovery visit or call with your home’s team",
    "Warm, custom design shaped around your home — never a template",
    "Pages for care types, rooms, life at the home, team, fees and FAQs",
    "Photography direction, or careful use of the photos you have",
    "Enquiry, visit-booking and recruitment journeys",
    "Training, handover and ongoing support options",
  ],
  faqs: [
    {
      q: "Can you build one site for a small group of homes?",
      a: "Yes. A group site with a consistent design and a distinct, findable section for each home works well — and each home can still hold its own place in local search results.",
    },
    {
      q: "We don’t have good photography. Does that matter?",
      a: "It matters more than most things, so it is planned for: either direction for a local photographer or careful, honest use of what you already have until new photos exist.",
    },
    {
      q: "Can the site help with recruitment as well as occupancy?",
      a: "Yes. Careers pages with real staff voices and a simple application route are part of the build — the same website that reassures families also persuades carers.",
    },
    {
      q: "Who updates the website once it is live?",
      a: "Your team, for news and day-to-day changes, after a short training session. Flutterly handles anything structural, or everything, depending on the package you choose.",
    },
  ],
  ctaTitle: "Ready to give families a better first visit?",
  ctaCopy: "Start with the free audit — a written review of how your current site serves families — or get in touch to talk about your home.",
};

export const sectors = [gpSector, careSector] as const;

/* ─────────────────────────────────────────────────────────────
   Footer
   ───────────────────────────────────────────────────────────── */

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
    title: "Studio",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Work", href: "/#work" },
      { label: "Process", href: "/#process" },
      { label: "About", href: "/#about" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Sipli", href: "/projects/sipli" },
      { label: "Artling", href: "/projects/artling" },
      { label: "Greenmead", href: "https://www.greenmead.co.uk/" },
      { label: "JJ Paper", href: "https://www.jjpaperessential.com/" },
      { label: "Sandbourne", href: "https://sandbournecare.co.uk/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Accessibility statement", href: "/accessibility" },
      { label: "Artling privacy", href: "/projects/artling/privacy-policy" },
      { label: "Sipli privacy", href: "/projects/sipli/privacy-policy" },
      { label: "GitHub", href: "https://github.com/its-me-anoop" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anoop-jose-0b308a296/" },
    ],
  },
] as const;
