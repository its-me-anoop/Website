import { auditChecks, auditPromises } from "@/lib/marketing/content";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { Reveal } from "../motion/Reveal";
import { AuditBar } from "../ui/AuditBar";
import { CheckItem } from "../ui/Bits";
import { ButtonLink } from "../ui/Button";
import { Container, SectionHead } from "../ui/Type";

const steps = [
  {
    title: "Paste your website address",
    copy: "Press the arrow and the instant audit runs in a few seconds. No form, no sign-up, nothing stored.",
  },
  {
    title: "Read the scored report",
    copy: "An overall score, seven area scores and every check explained: what was found, why it matters to your visitors, and how to fix it.",
  },
  {
    title: "Ask for the written review",
    copy: "One click opens a prefilled email. Flutterly then reviews the site by hand, covering design, content and real-device speed, usually within a week.",
  },
] as const;

const instantVsWritten = [
  {
    label: "Instant audit",
    when: "In seconds",
    points: [
      "Runs in your browser while you wait",
      "Reads the page’s HTML and response headers",
      "Around sixty checks across seven areas",
      "Sector-aware: GP, care home, dental, pharmacy, physio",
      "A shareable link, and a designed PDF to hand round",
    ],
  },
  {
    label: "Written audit",
    when: "Within a week",
    points: [
      "Reviewed by hand, by the person who would build the fix",
      "Real devices, real connections, JavaScript included",
      "Design, content quality and the journeys visitors take",
      "Set against the standards NHS and CQC-regulated sites are held to",
      "A scored, written report with fixes in priority order",
    ],
  },
] as const;

/** /free-audit: the indexable landing page for the instant audit. */
export function AuditLanding() {
  return (
    <Shell>
      <PageHero
        kicker="Free website audit"
        title={
          <>
            Where does your website <mark className="wf-mark">send people?</mark>
          </>
        }
        copy={
          <p>
            Paste your address and get a scored report in seconds on accessibility, speed, search, content, mobile,
            security and local presence, each explained in plain English with the fix. Then, if you want it, a written
            review by a person. Both are free.
          </p>
        }
      >
        <AuditBar hint="Press the arrow and the report appears in a few seconds. Nothing you enter is stored." />
        <div className="mt-6">
          <ButtonLink href="/packages" tone="text" size="sm">
            Or see the packages first
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHead
            kicker="What gets checked"
            title="Seven areas, scored and explained."
            copy="Each area is weighted by how much it affects the people your website serves. Accessibility and content count most, because those are what patients and families feel first."
          />
          <ol className="mt-12 border-t-2 border-wf-ink">
            {auditChecks.map((check, i) => (
              <Reveal
                as="li"
                key={check.title}
                delay={Math.min(i, 3) * 50}
                className="grid gap-2 border-b-[1.5px] border-wf-line-2 py-6 sm:grid-cols-[4rem_minmax(0,16rem)_1fr] sm:gap-6"
              >
                <span className="wf-mono text-[14px] text-wf-muted" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{check.title}</h3>
                <p className="max-w-[70ch] text-[16.5px] leading-[1.6] text-wf-ink-soft">{check.copy}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28">
        <Container>
          <SectionHead
            kicker="How it works"
            title={
              <>
                Seconds now, a written review <mark className="wf-mark">within a week.</mark>
              </>
            }
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80} className="wf-plate p-7">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-wf-sign text-[22px] font-extrabold"
                >
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[24px] font-extrabold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-[16.5px] leading-[1.6] text-wf-ink-soft">{step.copy}</p>
              </Reveal>
            ))}
          </ol>

          <h2 className="wf-display mt-20 text-[clamp(1.75rem,3.2vw,2.6rem)]">What each audit can see</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {instantVsWritten.map((col, i) => (
              <div
                key={col.label}
                className={i === 1 ? "wf-board wf-on-ink p-7 sm:p-9" : "wf-plate p-7 sm:p-9"}
              >
                <p className="flex items-baseline justify-between gap-4">
                  <span className="text-[24px] font-extrabold tracking-[-0.02em]">{col.label}</span>
                  <span className={i === 1 ? "wf-label text-wf-sign" : "wf-label text-wf-ink-soft"}>{col.when}</span>
                </p>
                <ul className="mt-6 space-y-3.5">
                  {col.points.map((p) => (
                    <CheckItem key={p}>{p}</CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <SectionHead kicker="The audit promise" title="Honest, even when that means no sale." size="md" />
          <ul className="grid content-start gap-x-10 gap-y-5 border-t-2 border-wf-ink pt-8 sm:grid-cols-2">
            {auditPromises.map((promise) => (
              <CheckItem key={promise}>{promise}</CheckItem>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            A few seconds now, a clear picture <mark className="wf-mark">within a week.</mark>
          </>
        }
        copy="Paste your website address for the instant report. Ask for the written review from the results page and Flutterly will do the rest, whoever ends up making the fixes."
        id="contact"
      />
    </Shell>
  );
}
