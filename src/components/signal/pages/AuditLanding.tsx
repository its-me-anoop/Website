"use client";

import { auditChecks, auditPromises } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { AuditBar, ButtonLink, CheckItem, Container, Label, SectionIntro } from "../ui/primitives";

const steps = [
  {
    title: "Paste your website address",
    copy: "Press the button and the instant audit runs in a few seconds. No form, no sign-up, nothing stored.",
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
    points: [
      "Runs in seconds, in your browser",
      "Reads the page’s HTML and response headers",
      "Around sixty checks across seven areas",
      "Sector-aware: GP, care home, dental, pharmacy, physio",
      "Shareable link, and a designed PDF to hand round",
    ],
  },
  {
    label: "Written audit",
    points: [
      "Reviewed by hand, usually within a week",
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
        label="Free website audit"
        title={
          <>
            Find out how your website <em>really</em> performs.
          </>
        }
        copy={
          <p>
            Paste your address and get a scored report in seconds: accessibility, speed, search, content, mobile,
            security and local presence, each explained in plain English with the fix. Then, if you want it, a
            written review by a person. Both free.
          </p>
        }
      >
        <AuditBar hint="Paste your address and press the button. The report appears in a few seconds." />
        <ButtonLink href="/packages" tone="link" className="self-start text-[16px]">
          Or see the packages first
        </ButtonLink>
      </PageHero>

      <section className="s-paper py-24 sm:py-32">
        <Container>
          <SectionIntro
            onPaper
            label="What gets checked"
            title={
              <>
                Seven areas, scored and <em>explained</em>.
              </>
            }
            copy="Each area is weighted by how much it affects the people your website serves. Accessibility and content count most, because those are what patients and families feel first."
          />
          <ol className="mt-14 border-t border-s-line-paper">
            {auditChecks.map((check, i) => (
              <Reveal
                as="li"
                key={check.title}
                delay={i * 0.03}
                className="grid gap-3 border-b border-s-line-paper py-7 md:grid-cols-[3rem_minmax(0,4fr)_minmax(0,7fr)] md:gap-8"
              >
                <span className="text-[14px] tabular-nums text-s-on-paper-2">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="s-display text-[28px]">{check.title}</h3>
                <p className="max-w-[62ch] text-[17px] leading-[1.6] text-s-on-paper-2">{check.copy}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro
            label="How it works"
            title={
              <>
                Seconds now, a <em>written review</em> within a week.
              </>
            }
          />
          <ol className="mt-14 grid gap-10 border-t border-s-line pt-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.06}>
                <span aria-hidden className="s-display block text-[88px] leading-[0.8] text-s-signal">
                  {i + 1}
                </span>
                <h3 className="s-display mt-8 text-[28px]">{step.title}</h3>
                <p className="mt-3 max-w-[38ch] text-[17px] leading-[1.6] text-s-on-ink-2">{step.copy}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-24">
            <h2 className="s-display text-[clamp(1.8rem,3.4vw,2.8rem)]">
              What each audit can <em>see</em>
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {instantVsWritten.map((col, i) => (
                <div key={col.label} className={i === 1 ? "s-paper rounded-[4px] p-8" : "rounded-[4px] border border-s-line-2 p-8"}>
                  <Label className={i === 1 ? "text-s-on-paper-2" : "text-s-on-ink-2"}>{col.label}</Label>
                  <ul className="mt-6 space-y-3.5">
                    {col.points.map((p) => (
                      <CheckItem key={p} onPaper={i === 1}>
                        {p}
                      </CheckItem>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-24 grid gap-10 border-t border-s-line pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <h2 className="s-display text-[clamp(1.8rem,3.4vw,2.8rem)]">The audit promise</h2>
            <ul className="space-y-4">
              {auditPromises.map((promise) => (
                <CheckItem key={promise}>{promise}</CheckItem>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            A few seconds now, a clear picture within a <em>week</em>.
          </>
        }
        copy="Paste your website address for the instant report. Ask for the written review from the results page, and Flutterly will do the rest: whoever ends up making the fixes."
        id="contact"
      />
    </Shell>
  );
}
