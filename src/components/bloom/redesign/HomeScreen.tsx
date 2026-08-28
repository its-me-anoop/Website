import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowUpRight,
  Check,
  Gauge,
  Map,
  Search,
  Shield,
  Smartphone,
} from "lucide-react";
import { site } from "@/lib/site";
import { projects, type Project } from "../data";
import { RedesignShell } from "./RedesignShell";
import styles from "./home.module.css";

const audiences = [
  {
    number: "01",
    title: "GP practices",
    copy: "A practice website that takes work off the phones",
    href: "/gp-websites",
    image: "/demos/gp-home.png",
    alt: "Fictional Willowbrook Surgery sample website",
    sample: true,
  },
  {
    number: "02",
    title: "Care homes",
    copy: "A home families trust before they ever visit",
    href: "/care-home-websites",
    image: "/project-pembroke.png",
    alt: "Pembroke Care website homepage",
    sample: false,
  },
  {
    number: "03",
    title: "Other trusted organisations",
    copy: "Purpose-led and local organisations, with the same direct delivery",
    href: "/services",
    image: "/project-jjpaper.png",
    alt: "JJ Paper Essentials website homepage",
    sample: false,
  },
] as const;

const deliveryCommitments = [
  "Direct delivery",
  "WCAG 2.2 AA target",
  "Built around operations",
  "UK-based, reply within one working day",
] as const;

const auditChecks: readonly { label: string; icon: LucideIcon }[] = [
  { label: "Accessibility", icon: Accessibility },
  { label: "Speed", icon: Gauge },
  { label: "Mobile", icon: Smartphone },
  { label: "Signposting", icon: Map },
  { label: "Local search", icon: Search },
  { label: "Security basics", icon: Shield },
];

function BrowserFrame({
  hostname,
  image,
  className,
}: {
  hostname: string;
  image: string;
  className: string;
}) {
  return (
    <div className={`${styles.browserFrame} ${className}`} aria-hidden="true">
      <div className={styles.browserBar}>
        <span />
        <span />
        <span />
        <small>{hostname}</small>
      </div>
      <div className={styles.browserViewport}>
        <Image
          src={image}
          alt=""
          width={1920}
          height={1200}
          sizes="(min-width: 1024px) 440px, 72vw"
          loading="eager"
        />
      </div>
    </div>
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
        {project.name === "Artling" ? (
          <span className={styles.artlingCaption} aria-hidden="true">
            A living family gallery.
          </span>
        ) : null}
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
        <div className={`${styles.site} ${styles.heroInner}`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                Flutterly Limited · Digital delivery · Reading, UK
              </p>
              <h1 id="home-heading">Digital delivery for organisations people rely on.</h1>
              <p className={styles.heroLead}>
                Accessible websites and products, built directly in Reading for GP practices,
                care homes and other trusted organisations.
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

            <figure className={styles.heroCollage} aria-label="A selection of websites delivered by Flutterly">
              <BrowserFrame
                hostname="sandbournecare.co.uk"
                image="/project-sandbourne.png"
                className={styles.frameSandbourne}
              />
              <BrowserFrame
                hostname="greenmead.co.uk"
                image="/project-greenmead.png"
                className={styles.frameGreenmead}
              />
              <BrowserFrame
                hostname="jjpaperessential.com"
                image="/project-jjpaper.png"
                className={styles.frameJjPaper}
              />
            </figure>
          </div>

          <div className={styles.audienceGrid}>
            {audiences.map((audience, index) => (
              <Link
                key={audience.href}
                href={audience.href}
                className={styles.audienceCard}
                style={{ "--home-delay": `${160 + index * 70}ms` } as React.CSSProperties}
              >
                <div className={styles.audienceMedia}>
                  <Image
                    src={audience.image}
                    alt={audience.alt}
                    fill
                    sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
                  />
                  {audience.sample ? (
                    <span className={styles.sampleBadge}>Sample · fictional</span>
                  ) : null}
                </div>
                <div className={styles.audienceBody}>
                  <span className={styles.number}>{audience.number}</span>
                  <h2>{audience.title}</h2>
                  <p>{audience.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.commitmentBand}>
          <ul className={styles.commitmentGrid} aria-label="Flutterly delivery commitments">
            {deliveryCommitments.map((commitment) => (
              <li key={commitment}>
                <Check aria-hidden size={16} />
                <span>{commitment}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.deliveryIntro} aria-labelledby="delivery-heading">
        <div className={styles.site}>
          <p className={styles.eyebrow}>Website delivery</p>
          <h2 id="delivery-heading">Sites people can actually use.</h2>
          <p>
            Website plus professional mailboxes (Microsoft 365, Google Workspace or Zoho)
            when you need them.
          </p>
        </div>
      </section>

      <section id="work" className={styles.workSection} aria-labelledby="work-heading">
        <div className={styles.site}>
          <p className={styles.eyebrow}>Selected delivery</p>
          <h2 id="work-heading">Work you can open</h2>
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

          <div className={styles.auditPanel}>
            <p className={styles.eyebrow}>Free audit</p>
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
            <Link href="/book" className={styles.darkSecondaryButton}>
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </RedesignShell>
  );
}
