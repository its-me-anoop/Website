import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
                  flutterly.uk/demo/gp-practice · Willowbrook Surgery
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
              Open the sample
              <ArrowUpRight aria-hidden size={16} strokeWidth={1.8} />
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
                <strong>{faq.question}</strong> {faq.answer}
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
      sizes="(min-width: 64rem) 50vw, 100vw"
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
            <a
              href={pembroke.href}
              className={`${styles.projectCard} ${styles.projectPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.primaryImageWrap}>
                <ProjectImage
                  src={pembroke.image}
                  alt="Pembroke Care website homepage"
                  priority
                />
                <span className={styles.statusBadge}>
                  {pembroke.status ? `${pembroke.status}, ` : ""}
                  {pembroke.year}
                </span>
              </span>
              <span className={styles.primaryProjectCopy}>
                <strong>{pembroke.name}</strong>
                <span>
                  Boutique residential, respite and transitional living · Reading
                </span>
              </span>
            </a>

            <div className={styles.supportingProjects}>
              <a
                href={sandbourne.href}
                className={`${styles.projectCard} ${styles.projectSupporting}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.supportingImageWrap}>
                  <ProjectImage
                    src={sandbourne.image}
                    alt="Sandbourne Care website homepage"
                  />
                </span>
                <span className={styles.supportingProjectCopy}>
                  <strong>{sandbourne.name}</strong>
                  <span>
                    {sandbourne.type} · {sandbourne.year}
                  </span>
                </span>
              </a>

              <a
                href={greenmead.href}
                className={`${styles.projectCard} ${styles.projectSupporting}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.supportingImageWrap}>
                  <ProjectImage
                    src={greenmead.image}
                    alt="Greenmead accessible housing website homepage"
                  />
                </span>
                <span className={styles.supportingProjectCopy}>
                  <strong>{greenmead.name}</strong>
                  <span>
                    {greenmead.type} · {greenmead.year}
                  </span>
                </span>
              </a>
            </div>
          </div>

          <p className={styles.cqcNote}>
            CQC ratings belong on the page as a small, honest fact; never occupancy
            copy, never “fills beds”.
          </p>

          <div className={styles.careSample}>
            <SampleBadge />
            <Link
              href="/demo/care-home"
              className={styles.careSampleLink}
              aria-label="Open the fictional Oakfield House care home sample website"
            >
              <span className={styles.careSampleImageWrap}>
                <Image
                  src="/demos/care-home.png"
                  alt="Oakfield House sample care home homepage"
                  fill
                  className={styles.projectImage}
                  sizes="144px"
                />
              </span>
              <span>Oakfield House, quieter than live work.</span>
            </Link>
          </div>

          <a
            className={styles.primaryButton}
            href={enquiryHref("Care home website enquiry")}
          >
            Discuss a care home website
          </a>
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
