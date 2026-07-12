"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { site } from "@/lib/site";
import styles from "./EditorialHome.module.css";

const navigation = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

const projects = [
  {
    name: "Sipli",
    type: "iOS + watchOS",
    year: "2026",
    description:
      "An adaptive hydration companion that turns changing goals, weather and HealthKit data into one calm daily rhythm.",
    href: "/projects/sipli",
    internal: true,
    visual: "sipli",
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
    visual: "artling",
    tags: ["SwiftUI", "Local first", "Family sharing"],
  },
  {
    name: "Greenmead",
    type: "Accessible web",
    year: "2024",
    description:
      "A clear, person-centred website for a housing organisation supporting adults with complex needs.",
    href: "https://www.greenmead.co.uk/",
    visual: "greenmead",
    tags: ["Next.js", "Accessibility", "Content design"],
  },
  {
    name: "JJ Paper",
    type: "B2B web",
    year: "2024",
    description:
      "A commercial site that explains a sustainable paper supply chain without losing speed or credibility.",
    href: "https://www.jjpaperessential.com/",
    visual: "jjpaper",
    tags: ["Brand system", "Responsive web", "SEO"],
  },
  {
    name: "Sandbourne",
    type: "Care web",
    year: "2024",
    description:
      "A reassuring digital presence for residential, supported-living and respite care services.",
    href: "https://sandbournecare.co.uk/",
    visual: "sandbourne",
    tags: ["UX writing", "Responsive web", "Performance"],
  },
] as const;

const services = [
  {
    number: "01",
    title: "Product direction",
    copy: "Turn an early idea, tangled feature list or existing product into a focused plan people can understand and use.",
    items: ["Discovery and scope", "User flows", "Prototypes", "Design systems"],
  },
  {
    number: "02",
    title: "Web engineering",
    copy: "Fast, accessible websites and web applications built around maintainable systems rather than one-off pages.",
    items: ["Next.js and React", "TypeScript", "CMS integration", "Performance and SEO"],
  },
  {
    number: "03",
    title: "App development",
    copy: "Native and cross-platform apps with careful interaction design, dependable architecture and a clear route to release.",
    items: ["SwiftUI", "Flutter", "API integration", "App Store delivery"],
  },
] as const;

const steps = [
  ["Listen", "Define the real problem, audience and constraints before touching the interface."],
  ["Shape", "Build the structure, visual language and prototype around the decisions that matter."],
  ["Build", "Engineer the product in small, reviewable slices with quality visible throughout."],
  ["Ship", "Launch, measure and improve without handing the product to a completely different team."],
] as const;

function ProjectLink({ project }: { project: (typeof projects)[number] }) {
  const content = (
    <>
      View project
      {project.internal ? (
        <ArrowRight size={17} aria-hidden />
      ) : (
        <ExternalLink size={16} aria-hidden />
      )}
    </>
  );

  if (project.internal) {
    return (
      <Link className={styles.projectLink} href={project.href}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={styles.projectLink}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}

function ProjectVisual({ visual, name }: { visual: string; name: string }) {
  if (visual === "sipli") {
    return (
      <div className={`${styles.projectVisual} ${styles.sipliVisual}`}>
        <div className={styles.visualGrid} aria-hidden />
        <span className={styles.visualLabel}>Adaptive hydration</span>
        <Image
          src="/images/sipli-mascot.png"
          alt="Sipli water tracker mascot"
          width={320}
          height={320}
          className={styles.sipliMascot}
        />
        <span className={styles.visualNumber}>01</span>
      </div>
    );
  }

  if (visual === "artling") {
    return (
      <div className={`${styles.projectVisual} ${styles.artlingVisual}`}>
        <span className={styles.visualLabel}>The loud years, kept quietly</span>
        <div className={styles.artlingFrame}>
          <Image
            src="/projects/artling/fox-painter.png"
            alt="Artling fox painter mascot"
            width={290}
            height={406}
            className={styles.artlingMascot}
          />
        </div>
        <span className={styles.visualNumber}>02</span>
      </div>
    );
  }

  return (
    <div className={`${styles.projectVisual} ${styles[`${visual}Visual`]}`}>
      <span className={styles.visualLabel}>{name}</span>
      <span className={styles.projectMonogram}>{name.slice(0, 2)}</span>
      <span className={styles.visualNumber}>
        {String(projects.findIndex((project) => project.name === name) + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function EditorialHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.siteShell}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label="Flutterly home">
          <Image src="/flutterly-logo.png" alt="" width={38} height={38} priority />
          <span>Flutterly</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.headerCta} href="#contact">
          Start a project <ArrowDownRight size={17} aria-hidden />
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="editorial-mobile-menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={21} aria-hidden /> : <Menu size={21} aria-hidden />}
        </button>

        {menuOpen && (
          <nav
            id="editorial-mobile-menu"
            className={styles.mobileNav}
            aria-label="Mobile"
          >
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              <span>05</span>
              Start a project
            </a>
          </nav>
        )}
      </header>

      <main id="main">
        <section id="top" className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              Independent product studio · Reading, UK · Booking summer 2026
            </p>
            <h1>
              Small studio.
              <span>Serious products.</span>
            </h1>
            <p className={styles.heroIntro}>
              I design and build focused web and mobile products for teams that
              want senior thinking, direct communication and no hand-offs.
            </p>
            <div className={styles.heroActions}>
              <a href="#work" className={styles.primaryButton}>
                See selected work <ArrowDownRight size={18} aria-hidden />
              </a>
              <a href={`mailto:${site.email}`} className={styles.textButton}>
                {site.email} <ArrowRight size={18} aria-hidden />
              </a>
            </div>
          </div>

          <div className={styles.heroPanel} aria-label="Studio overview">
            <div className={styles.heroPanelTop}>
              <span>Flutterly / Product engineering</span>
              <span>2024 → now</span>
            </div>
            <div className={styles.heroOrbital} aria-hidden>
              <span className={styles.orbitOne} />
              <span className={styles.orbitTwo} />
              <span className={styles.orbitCore}>F*</span>
            </div>
            <div className={styles.heroStats}>
              <div>
                <strong>12+</strong>
                <span>products shipped</span>
              </div>
              <div>
                <strong>100</strong>
                <span>Lighthouse score</span>
              </div>
              <div>
                <strong>&lt;48h</strong>
                <span>typical reply</span>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.statementBand} aria-label="Core capabilities">
          <div>
            Product strategy <span>✳</span> Interface design <span>✳</span>
            Next.js <span>✳</span> SwiftUI <span>✳</span> Flutter <span>✳</span>
          </div>
        </div>

        <section id="work" className={styles.workSection}>
          <div className={styles.sectionHeading}>
            <p>01 / Selected work</p>
            <h2>Useful products, built with a point of view.</h2>
            <p>
              A mix of owned products and client work across health, family,
              care, housing and sustainable commerce.
            </p>
          </div>

          <div className={styles.featuredProjects}>
            {projects.slice(0, 2).map((project) => (
              <article key={project.name} className={styles.featuredCard} data-project-card>
                <ProjectVisual visual={project.visual} name={project.name} />
                <div className={styles.projectBody}>
                  <div className={styles.projectMeta}>
                    <span>{project.type}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ProjectLink project={project} />
                </div>
              </article>
            ))}
          </div>

          <div className={styles.secondaryProjects}>
            {projects.slice(2).map((project) => (
              <article key={project.name} className={styles.secondaryCard} data-project-card>
                <ProjectVisual visual={project.visual} name={project.name} />
                <div className={styles.secondaryBody}>
                  <div className={styles.projectMeta}>
                    <span>{project.type}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <ProjectLink project={project} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className={styles.servicesSection}>
          <div className={styles.sectionHeadingLight}>
            <p>02 / Services</p>
            <h2>One partner from first decision to final release.</h2>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article key={service.number} className={styles.serviceCard}>
                <span className={styles.serviceNumber}>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden /> {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className={styles.processSection}>
          <div className={styles.sectionHeading}>
            <p>03 / Process</p>
            <h2>Clear enough to move quickly. Rigorous enough to last.</h2>
          </div>
          <div className={styles.processGrid}>
            {steps.map(([title, copy], index) => (
              <article key={title} className={styles.processStep}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className={styles.aboutSection}>
          <div className={styles.aboutPortrait}>
            <Image
              src="/anoop-jose.jpg"
              alt="Anoop Jose, founder of Flutterly"
              fill
              sizes="(max-width: 860px) 100vw, 42vw"
            />
            <span>Anoop Jose · Founder and product engineer</span>
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>04 / About</p>
            <h2>Direct collaboration, without the agency relay race.</h2>
            <p>
              Flutterly is the studio I built for projects that benefit from one
              person holding the product, design and engineering context at the
              same time. You speak to the person doing the work, and decisions do
              not disappear between departments.
            </p>
            <p>
              My background spans front-end engineering, mobile applications,
              design systems and operational problem solving. The result is a
              practical studio that can move from rough idea to production code.
            </p>
            <div className={styles.aboutLinks}>
              <a href={site.social.github} target="_blank" rel="noopener noreferrer">
                <Github size={18} aria-hidden /> GitHub
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} aria-hidden /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.contactSection}>
          <p>05 / Start a conversation</p>
          <h2>Have a product that needs clarity and momentum?</h2>
          <a href={`mailto:${site.email}`} className={styles.contactLink}>
            {site.email}
            <ArrowDownRight size={36} aria-hidden />
          </a>
          <div className={styles.contactMeta}>
            <span>Reading, United Kingdom</span>
            <span>{site.phoneDisplay}</span>
            <span>Replies usually within 48 hours</span>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a href="#top" className={styles.brand} aria-label="Back to top">
          <Image src="/flutterly-logo.png" alt="" width={34} height={34} />
          <span>Flutterly</span>
        </a>
        <p>© {new Date().getFullYear()} {site.legalName}. Built in Reading.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
