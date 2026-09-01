import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowUpRight,
  Gauge,
  Map,
  Search,
  Shield,
  Smartphone,
} from "lucide-react";
import { packagesFaq, projects, services, type Project } from "../data";
import { site } from "@/lib/site";
import { FaqAccordion } from "./FaqAccordion";
import { HeroGrain } from "./HeroGrain";
import { RedesignShell } from "./RedesignShell";
import { RotatingWords } from "./RotatingWords";
import { TestimonialCarousel } from "./TestimonialCarousel";
import styles from "./home.module.css";

const pillars = [
  {
    number: "01",
    title: "Websites",
    copy: "Accessible, fast websites for GP practices, care homes and other organisations people rely on — structured around the tasks visitors need to finish.",
  },
  {
    number: "02",
    title: "Digital products",
    copy: "Web platforms and mobile apps taken from a clear brief through design, engineering, launch and ongoing improvement.",
  },
  {
    number: "03",
    title: "Business technology",
    copy: "Professional email, collaboration tools and campaign support configured around your team, not a generic checklist.",
  },
] as const;

const testimonials = [
  {
    quote:
      "The person we briefed is the person who built our site. Decisions were documented, accessibility was treated as a requirement, and the handover was practical.",
    name: "Practice manager",
    role: "GP practice",
    org: "Berkshire",
  },
  {
    quote:
      "Families research care late at night. The site feels warm, shows the home honestly, and puts CQC information where relatives expect it.",
    name: "Registered manager",
    role: "Care home",
    org: "South East",
  },
  {
    quote:
      "We needed a site that worked on poor mobile signal and did not bury patient tasks. Reception calls dropped once the common questions had proper pages.",
    name: "Operations lead",
    role: "Healthcare organisation",
    org: "UK",
  },
] as const;

const auditChecks: readonly { label: string; icon: LucideIcon }[] = [
  { label: "Accessibility", icon: Accessibility },
  { label: "Speed", icon: Gauge },
  { label: "Mobile", icon: Smartphone },
  { label: "Signposting", icon: Map },
  { label: "Local search", icon: Search },
  { label: "Security basics", icon: Shield },
];

function PlusFrame({ children }: { children: React.ReactNode }) {
  return (
    <span className={styles.plusFrame}>
      <span className={styles.plusCorner} data-pos="tl" aria-hidden>
        +
      </span>
      <span className={styles.plusCorner} data-pos="tr" aria-hidden>
        +
      </span>
      <span className={styles.plusCorner} data-pos="bl" aria-hidden>
        +
      </span>
      <span className={styles.plusCorner} data-pos="br" aria-hidden>
        +
      </span>
      {children}
    </span>
  );
}

function ProjectAnchor({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  if (project.internal) {
    return (
      <Link href={project.href} className={styles.workCard} data-project-card>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={project.href}
      className={styles.workCard}
      data-project-card
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function WorkCard({ project }: { project: Project }) {
  const isProduct = project.name === "Sipli" || project.name === "Artling";

  return (
    <ProjectAnchor project={project}>
      <div
        className={`${styles.workMedia} ${isProduct ? styles.workMediaProduct : ""} ${
          project.name === "Artling" ? styles.workMediaArtling : ""
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.name} project preview`}
          fill
          sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
          className={isProduct ? styles.workImageProduct : styles.workImage}
        />
        {project.status ? (
          <span className={styles.statusBadge}>
            {project.status} · {project.year}
          </span>
        ) : null}
      </div>
      <div className={styles.workCardBody}>
        <h3>{project.name}</h3>
        <p>
          {project.type} · {project.year}
        </p>
      </div>
    </ProjectAnchor>
  );
}

export function HomeScreen() {
  return (
    <RedesignShell>
      <section className={styles.heroSection} aria-labelledby="home-heading">
        <HeroGrain />
        <div className={styles.gridOverlay} aria-hidden />
        <div className={`${styles.site} ${styles.heroInner}`}>
          <RotatingWords />
          <PlusFrame>
            <h1 id="home-heading">
              Digital delivery for organisations people rely on.
            </h1>
          </PlusFrame>
          <p className={styles.heroLead}>
            Accessible websites and products, built directly in Reading for GP
            practices, care homes and other trusted organisations.
          </p>
          <div className={styles.heroActions}>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
              className={styles.primaryButton}
            >
              Discuss a project <ArrowUpRight aria-hidden size={17} />
            </a>
            <Link href="/book" className={styles.secondaryButton}>
              Book a call
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.taglineBand} aria-label="Flutterly delivery principle">
        <div className={styles.taglineTrack}>
          <p className={styles.taglineText}>
            THE PERSON YOU BRIEF IS THE PERSON WHO BUILDS™ · DIRECT DELIVERY ·
            READING, UK ·
          </p>
          <p className={styles.taglineText} aria-hidden>
            THE PERSON YOU BRIEF IS THE PERSON WHO BUILDS™ · DIRECT DELIVERY ·
            READING, UK ·
          </p>
        </div>
      </section>

      <section id="work" className={styles.workSection} aria-labelledby="work-heading">
        <div className={styles.site}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>Selected delivery</p>
              <h2 id="work-heading">Work you can open</h2>
            </div>
            <span className={styles.workCount}>{projects.length}</span>
          </div>
          <div className={styles.workGrid}>
            {projects.map((project) => (
              <WorkCard key={project.name} project={project} />
            ))}
          </div>
          <div className={styles.sampleLinks}>
            <span className={styles.sampleBadge}>Sample · fictional</span>
            <Link href="/demo/gp-practice">Willowbrook Surgery</Link>
            <Link href="/demo/care-home">Oakfield House</Link>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection} aria-labelledby="about-heading">
        <div className={styles.site}>
          <p className={styles.eyebrow}>How we work</p>
          <h2 id="about-heading">
            A Reading team with one habit: make digital things people can actually
            use.
          </h2>
          <p className={styles.aboutLead}>
            Creative enough to earn attention, practical enough to ship. Every
            project is built in-house by the person you brief — no templates, no
            offshore handoffs, no beige.
          </p>
          <div className={styles.pillarGrid}>
            {pillars.map((pillar) => (
              <article key={pillar.number} className={styles.pillarCard}>
                <span className={styles.number}>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} aria-labelledby="services-heading">
        <div className={styles.site}>
          <p className={styles.eyebrow}>Services</p>
          <h2 id="services-heading">Start with the need, then choose the technology.</h2>
          <div className={styles.serviceList}>
            {services.slice(0, 3).map((service) => (
              <article key={service.id} className={styles.serviceRow}>
                <span className={styles.number}>{service.number}</span>
                <div>
                  <p className={styles.serviceKind}>{service.label}</p>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/services" className={styles.inlineLink}>
            View all services
          </Link>
        </div>
      </section>

      <section className={styles.highlightSection} aria-labelledby="highlight-heading">
        <div className={styles.site}>
          <div className={styles.highlightGrid}>
            <div>
              <p className={styles.eyebrowLight}>Accessibility</p>
              <h2 id="highlight-heading">WCAG 2.2 AA is the floor, not a stretch goal.</h2>
              <p className={styles.highlightCopy}>
                Every website build targets accessible structure, contrast,
                keyboard use and screen-reader labelling from the first wireframe —
                the standard expected of NHS and public-sector sites.
              </p>
            </div>
            <div className={styles.auditPanel}>
              <ul className={styles.auditGrid}>
                {auditChecks.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <Icon aria-hidden size={21} strokeWidth={1.8} />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
              <Link href="/free-audit" className={styles.auditLink}>
                Request a free audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.founderSection} aria-labelledby="founder-heading">
        <div className={`${styles.site} ${styles.founderGrid}`}>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>Founder</p>
            <h2 id="founder-heading">Anoop Jose</h2>
            <p>The person you brief is the person who builds.</p>
            <small>Reading, UK · Designer and engineer</small>
          </div>
          <div className={styles.portrait}>
            <Image
              src="/anoop-jose.jpg"
              alt="Anoop Jose, founder of Flutterly"
              fill
              sizes="(min-width: 1024px) 260px, 100vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className={styles.testimonialSection} aria-labelledby="testimonial-heading">
        <div className={styles.site}>
          <p className={styles.eyebrow}>They say it better than we do</p>
          <h2 id="testimonial-heading" className={styles.visuallyHidden}>
            Client feedback
          </h2>
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-heading">
        <div className={styles.site}>
          <p className={styles.eyebrow}>Frequently asked questions</p>
          <h2 id="faq-heading">Straight answers before you commit.</h2>
          <FaqAccordion items={packagesFaq.slice(0, 5)} />
        </div>
      </section>

      <section className={styles.closingSection} aria-labelledby="closing-heading">
        <div className={`${styles.site} ${styles.closingInner}`}>
          <h2 id="closing-heading">Ready when you are.</h2>
          <div className={styles.closingActions}>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
              className={styles.primaryButton}
            >
              Discuss a project
            </a>
            <Link href="/book" className={styles.secondaryButton}>
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </RedesignShell>
  );
}
