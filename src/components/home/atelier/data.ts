/**
 * Content model for the Atelier homepage — every section reads from
 * here so copy, links and imagery stay in one reviewable place.
 */

export type Project = {
  name: string;
  handle: string;
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
    name: "Sipli",
    handle: "@sipli",
    type: "iOS + watchOS",
    year: "2026",
    description:
      "An adaptive hydration companion that turns changing goals, weather and HealthKit data into one calm daily rhythm.",
    href: "/projects/sipli",
    internal: true,
    image: "/projects/sipli/dashboard.png",
    tint: "var(--at-sky)",
    tags: ["SwiftUI", "HealthKit", "On-device intelligence"],
  },
  {
    name: "Artling",
    handle: "@artling",
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
  {
    name: "Greenmead",
    handle: "@greenmead",
    type: "Accessible web",
    year: "2024",
    description:
      "A clear, person-centred website for a housing organisation supporting adults with complex needs.",
    href: "https://www.greenmead.co.uk/",
    internal: false,
    image: "/project-greenmead.png",
    tint: "#e2efe3",
    tags: ["Next.js", "Accessibility", "Content design"],
  },
  {
    name: "JJ Paper",
    handle: "@jjpaper",
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
    name: "Sandbourne",
    handle: "@sandbourne",
    type: "Care web",
    year: "2024",
    description:
      "A reassuring digital presence for residential, supported-living and respite care services.",
    href: "https://sandbournecare.co.uk/",
    internal: false,
    image: "/project-sandbourne.png",
    tint: "#e9e3ee",
    tags: ["UX writing", "Responsive web", "Performance"],
  },
] as const;

/** The three slides of the featured-work showcase carousel. */
export const showcaseSlides = [
  {
    project: projects[0],
    eyebrow: "Case study · Adaptive hydration",
    panel: "#cfdfe9",
    cta: "View case study",
  },
  {
    project: projects[1],
    eyebrow: "Case study · Family memories",
    panel: "#ecd9bc",
    cta: "View case study",
  },
  {
    project: projects[2],
    eyebrow: "Client work · Inclusive housing",
    panel: "#d6e6d7",
    cta: "Visit the site",
  },
] as const;

/** Wordmarks for the “Trusted by” marquee. */
export const trustedBy = [
  "Greenmead Housing",
  "JJ Paper Essential",
  "Sandbourne Care",
  "Sipli",
  "Artling",
  "Little Artist",
] as const;

/** Services — rendered as the editorial story cards. */
export const services = [
  {
    number: "01",
    title: "Product direction",
    copy: "Turn an early idea, tangled feature list or existing product into a focused plan people can understand and use.",
    cta: { label: "How I work?", href: "#process" },
    variant: "fan",
  },
  {
    number: "02",
    title: "Web engineering",
    copy: "Fast, accessible websites and web applications built around maintainable systems rather than one-off pages.",
    cta: { label: "See the work", href: "#work" },
    variant: "violet",
  },
  {
    number: "03",
    title: "App development",
    copy: "Native and cross-platform apps with careful interaction design, dependable architecture and a clear route to release.",
    cta: { label: "Start yours", href: "#contact" },
    variant: "photo",
  },
] as const;

export const processSteps = [
  ["Listen", "Define the real problem, audience and constraints before touching the interface."],
  ["Shape", "Build the structure, visual language and prototype around the decisions that matter."],
  ["Build", "Engineer the product in small, reviewable slices with quality visible throughout."],
  ["Ship", "Launch, measure and improve without handing the product to a different team."],
] as const;

/** Folder-tab work browser. */
export const folderTabs = [
  {
    id: "apps",
    label: "Apps",
    tiles: [
      { src: "/projects/sipli/dashboard.png", alt: "Sipli — today dashboard", tint: "var(--at-sky)" },
      { src: "/projects/artling/fox-painter.png", alt: "Artling — fox painter mascot", tint: "#f3e7d3" },
      { src: "/images/sipli/iphone/04-insights-1320x2868.jpg", alt: "Sipli — hydration insights", tint: "#e3ecf1" },
      { src: "/images/sipli-mascot.png", alt: "Sipli — water-drop mascot", tint: "#dfeaf0" },
      { src: "/images/sipli/iphone/07-widgets-1320x2868.jpg", alt: "Sipli — home-screen widgets", tint: "#e9eff3" },
      { src: "/projects/sipli/app-icon.png", alt: "Sipli — app icon", tint: "#d8e7ef" },
    ],
  },
  {
    id: "web",
    label: "Web",
    tiles: [
      { src: "/project-greenmead.png", alt: "Greenmead Housing website", tint: "#e2efe3" },
      { src: "/project-jjpaper.png", alt: "JJ Paper Essential website", tint: "#ece7dc" },
      { src: "/project-sandbourne.png", alt: "Sandbourne Care website", tint: "#e9e3ee" },
      { src: "/abstract-greenmead.png", alt: "Greenmead brand artwork", tint: "#dce8dd" },
      { src: "/abstract-jjpaper.png", alt: "JJ Paper brand artwork", tint: "#e5e0d5" },
      { src: "/abstract-sandbourne.png", alt: "Sandbourne brand artwork", tint: "#e2dbe8" },
    ],
  },
] as const;

/** Community wall — two drifting rows of product moments. */
export const wallRowTop = [
  { src: "/images/sipli/iphone/01-hero-1320x2868.jpg", alt: "Sipli home screen", tint: "#dfeaf0" },
  { src: "/projects/artling/fox-painter.png", alt: "Artling fox painter", tint: "#f3e7d3" },
  { src: "/project-greenmead.png", alt: "Greenmead website", tint: "#e2efe3" },
  { src: "/images/sipli/iphone/02-coach-1320x2868.jpg", alt: "Sipli hydration coach", tint: "#e3ecf1" },
  { src: "/abstract-jjpaper.png", alt: "JJ Paper artwork", tint: "#e5e0d5" },
  { src: "/images/sipli-mascot.png", alt: "Sipli mascot", tint: "#d8e7ef" },
  { src: "/project-jjpaper.png", alt: "JJ Paper website", tint: "#ece7dc" },
] as const;

export const wallRowBottom = [
  { src: "/images/sipli/iphone/06-diary-1320x2868.jpg", alt: "Sipli diary", tint: "#e9eff3" },
  { src: "/project-sandbourne.png", alt: "Sandbourne website", tint: "#e9e3ee" },
  { src: "/projects/sipli/app-icon.png", alt: "Sipli app icon", tint: "#dfeaf0" },
  { src: "/abstract-greenmead.png", alt: "Greenmead artwork", tint: "#dce8dd" },
  { src: "/images/sipli/iphone/03-beverages-1320x2868.jpg", alt: "Sipli beverages", tint: "#e3ecf1" },
  { src: "/anoop-jose.jpg", alt: "Anoop Jose, founder of Flutterly", tint: "#e8e2d8" },
  { src: "/abstract-sandbourne.png", alt: "Sandbourne artwork", tint: "#e2dbe8" },
] as const;

/** Lime ticker band phrases. */
export const tickerItems = [
  "Product strategy",
  "Interface design",
  "Next.js",
  "SwiftUI",
  "Flutter",
  "Design systems",
  "Inspired by people",
] as const;

export const footerColumns = [
  {
    title: "Studio",
    links: [
      { label: "Featured work", href: "#featured" },
      { label: "Selected work", href: "#work" },
      { label: "Services", href: "#services", badge: "New" },
      { label: "Process", href: "#process" },
      { label: "About", href: "#about" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Sipli", href: "/projects/sipli", badge: "New" },
      { label: "Artling", href: "/projects/artling" },
      { label: "Greenmead", href: "https://www.greenmead.co.uk/" },
      { label: "JJ Paper", href: "https://www.jjpaperessential.com/" },
      { label: "Sandbourne", href: "https://sandbournecare.co.uk/" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: "https://github.com/its-me-anoop" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anoop-jose-0b308a296/" },
      { label: "Artling privacy", href: "/projects/artling/privacy-policy" },
      { label: "Sipli privacy", href: "/projects/sipli/privacy-policy" },
    ],
  },
] as const;
