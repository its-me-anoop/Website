import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "../data";
import { RedesignShell } from "./RedesignShell";
import styles from "./sector.module.css";

export type SectorScreenKind = "gp" | "care";

const gpTopics = [
  "Appointments",
  "Prescriptions",
  "NHS App",
  "Self-serve",
  "Out of hours",
] as const;

const gpFaqs = [
  {
    question: "Existing systems?",
    answer:
      "The site links into the appointment and prescription tools you already use.",
  },
  {
    question: "Accessibility?",
    answer: "Every build targets WCAG 2.2 AA, with a published statement.",
  },
  {
    question: "Team updates?",
    answer: "Yes, after a short training session.",
  },
] as const;

const careProjectByName = Object.fromEntries(
  projects
    .filter((project) =>
      ["Pembroke Care", "Sandbourne", "Greenmead"].includes(project.name),
    )
    .map((project) => [project.name, project]),
);

function enquiryHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

function SampleBadge() {
  return <span className={styles.sampleBadge}>Sample · fictional</span>;
}

function GpScreen() {
  return (
    <>
      <section className={styles.gpHero} aria-labelledby="gp-sector-title">
        <div className={styles.gpHeroInner}>
          <div className={`${styles.gpCopy} ${styles.reveal}`}>
            <p className={styles.eyebrow}>GP practice websites</p>
            <h1 id="gp-sector-title" className={styles.gpTitle}>
              A practice website that works as hard as your reception team
            </h1>
            <p className={styles.gpLead}>
              Get patients to the right task in seconds.
            </p>
            <ul className={styles.topicList} aria-label="Common patient journeys">
              {gpTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <p className={styles.supportingCopy}>
              Website + professional mailboxes (Microsoft 365, Google Workspace,
              Zoho) when you need them.
            </p>
            <a
              className={styles.primaryButton}
              href={enquiryHref("GP practice website enquiry")}
            >
              Discuss your practice website
            </a>
          </div>

          <div className={`${styles.gpPreview} ${styles.reveal} ${styles.delay}`}>
            <SampleBadge />
            <Link
              href="/demo/gp-practice"
              className={styles.browserFrame}
              aria-label="Open the fictional Willowbrook Surgery sample website"
            >
              <span className={styles.browserBar} aria-hidden="true">
                <span className={styles.browserDots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.browserAddress}>
                  flutterly.co.uk/demo/gp-practice · Willowbrook Surgery
                </span>
              </span>
              <Image
                src="/demos/gp-home.png"
                alt="Willowbrook Surgery sample homepage with patient tasks and NHS signposting"
                width={1920}
                height={1290}
                priority
                className={styles.gpPreviewImage}
                sizes="(min-width: 64rem) 760px, calc(100vw - 2.5rem)"
              />
            </Link>
            <Link href="/demo/gp-practice" className={styles.sampleLink}>
              Willowbrook Surgery · Open the sample
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="gp-faq-title">
        <div className={styles.siteInner}>
          <h2 id="gp-faq-title" className={styles.eyebrow}>
            FAQ
          </h2>
          <ul className={styles.faqList}>
            {gpFaqs.map((faq) => (
              <li key={faq.question}>
                <strong>{faq.question}</strong>
                <span>{faq.answer}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand
        title="Less routine pressure on reception."
        label="Discuss your practice website"
        href={enquiryHref("GP practice website enquiry")}
        emphasis
      />
    </>
  );
}

function ProjectImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={styles.projectImage}
      sizes="(min-width: 64rem) 33vw, 100vw"
    />
  );
}

function CareScreen() {
  const pembroke = careProjectByName["Pembroke Care"];
  const sandbourne = careProjectByName.Sandbourne;
  const greenmead = careProjectByName.Greenmead;

  if (!pembroke || !sandbourne || !greenmead) {
    throw new Error("Care sector projects are missing from the Bloom project data.");
  }

  const workCards = [
    {
      project: pembroke,
      meta: "Boutique residential, respite and transitional living · Reading",
      imageAlt: "Pembroke Care website homepage",
    },
    {
      project: sandbourne,
      meta: `${sandbourne.type} · ${sandbourne.year}`,
      imageAlt: "Sandbourne Care website homepage",
    },
    {
      project: greenmead,
      meta: `${greenmead.type} · ${greenmead.year}`,
      imageAlt: "Greenmead accessible housing website homepage",
    },
  ] as const;

  return (
    <>
      <section className={styles.careHero} aria-labelledby="care-sector-title">
        <div className={styles.siteInner}>
          <div className={styles.reveal}>
            <p className={styles.eyebrow}>Care home websites</p>
            <h1 id="care-sector-title" className={styles.careTitle}>
              A home families trust before they ever visit.
            </h1>
            <p className={styles.careLead}>
              Warm, honest pages. Photos first. CQC facts in their place, not a
              lecture.
            </p>
          </div>

          <div className={`${styles.careProjects} ${styles.reveal} ${styles.delay}`}>
            {workCards.map((card, index) => (
              <a
                key={card.project.name}
                href={card.project.href}
                className={styles.projectCard}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.workImageWrap}>
                  <ProjectImage
                    src={card.project.image}
                    alt={card.imageAlt}
                    priority={index === 0}
                  />
                </span>
                <span className={styles.workCopy}>
                  <strong>{card.project.name}</strong>
                  <span>{card.meta}</span>
                </span>
              </a>
            ))}
          </div>

          <blockquote className={styles.cqcQuote}>
            “CQC ratings belong on the page as a small, honest fact; never occupancy
            copy, never &apos;fills beds&apos;.”
          </blockquote>

          <div className={styles.careSample}>
            <SampleBadge />
            <Link
              href="/demo/care-home"
              className={styles.careSampleLink}
            >
              Oakfield House, quieter than live work.
            </Link>
            <a
              className={styles.primaryButton}
              href={enquiryHref("Care home website enquiry")}
            >
              Discuss a care home website
            </a>
          </div>
        </div>
      </section>

      <ClosingBand
        title="A site families can trust before they visit."
        label="Book a call"
        href="/book"
      />
    </>
  );
}

function ClosingBand({
  title,
  label,
  href,
  emphasis = false,
}: {
  title: string;
  label: string;
  href: string;
  emphasis?: boolean;
}) {
  const buttonClass = emphasis
    ? styles.closingPrimaryButton
    : styles.closingSecondaryButton;
  const titleId = emphasis ? "gp-closing-title" : "care-closing-title";

  return (
    <section className={styles.closingBand} aria-labelledby={titleId}>
      <div className={styles.closingInner}>
        <h2 id={titleId}>{title}</h2>
        {href.startsWith("/") ? (
          <Link href={href} className={buttonClass}>
            {label}
          </Link>
        ) : (
          <a href={href} className={buttonClass}>
            {label}
          </a>
        )}
      </div>
    </section>
  );
}

export function SectorScreen({ sector }: { sector: SectorScreenKind }) {
  return (
    <RedesignShell>{sector === "gp" ? <GpScreen /> : <CareScreen />}</RedesignShell>
  );
}
