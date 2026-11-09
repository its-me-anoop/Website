"use client";

import { useState } from "react";
import { auditChecks, auditPromises } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { AuditBar, ButtonLink, CheckItem, Container, Eyebrow, SectionIntro } from "../ui/primitives";
import { XRay } from "../ui/XRay";

const steps = [
  {
    title: "Paste your website address",
    copy: "Press the arrow and the instant audit runs in a few seconds. No form, no sign-up. The report is held in a short-lived cache for about ten minutes, then discarded.",
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
      "Runs in seconds on Flutterly\u2019s server",
      "Reads the page’s HTML and response headers",
      "Around sixty checks across seven areas",
      "General checks for any website, plus extra content checks for GP, care home, dental, pharmacy and physio sites",
      "Shareable link, and a designed PDF to hand round",
    ],
  },
  {
    label: "Written audit",
    points: [
      "Reviewed by hand, usually within a week",
      "Real devices, real connections, JavaScript included",
      "Design, content quality and the journeys visitors take",
      "For healthcare websites, the written review can also consider relevant NHS and CQC guidance",
      "A scored, written report with fixes in priority order",
    ],
  },
] as const;

/** The sheet colours of the exploded page, in audit order, as tone classes. */
const sheetTones = ["tone-white", "tone-sun", "tone-cobalt", "tone-pink", "tone-jade", "tone-flame", "tone-navy"] as const;

/**
 * /free-audit: the indexable landing page for the instant audit. The
 * hero pulls a web page apart into the seven areas the report scores;
 * each area below carries its sheet's colour and lifts that sheet when
 * pointed at.
 */
export function AuditLanding() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <Shell>
      <PageHero
        eyebrow="Free website audit"
        tone="tone-sky"
        art={<XRay active={active} />}
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
        <AuditBar hint="Paste your address and press the arrow. The report appears in a few seconds." />
        <ButtonLink href="/packages" tone="ghost" size="sm" className="mt-4">
          Or see the packages first
        </ButtonLink>
      </PageHero>

      <section className="tone-white py-20 sm:py-28">
        <Container>
          <SectionIntro
            eyebrow="What gets checked"
            title={
              <>
                Seven areas, scored and <em>explained</em>.
              </>
            }
            copy="Each area is weighted by how much it affects the people your website serves. Accessibility and content count most: accessibility and clear content help visitors find what they need and take the next step."
          />
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" onPointerLeave={() => setActive(null)}>
            {auditChecks.map((check, i) => (
              <Reveal
                as="li"
                key={check.title}
                turn={55}
                delay={(i % 4) * 0.07}
                className={i === 0 ? "h-full sm:col-span-2" : "h-full"}
              >
                <article
                  onPointerEnter={() => setActive(i)}
                  className={`${sheetTones[i]} flex h-full flex-col rounded-[14px] border-2 border-s-navy p-6 shadow-[0_6px_0_0_var(--s-navy)]`}
                >
                  <span aria-hidden className="s-display s-num text-[44px]">
                    0{i + 1}
                  </span>
                  <h3 className="s-display mt-6 text-[25px]">{check.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-[1.6] text-s-ink-soft">{check.copy}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="tone-chalk s-dots border-t-2 border-s-navy py-20 sm:py-28">
        <Container>
          <SectionIntro
            eyebrow="How it works"
            title={
              <>
                Seconds now, a <em>written review</em> within a week.
              </>
            }
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} turn={80} delay={i * 0.12} className="h-full">
                <article className="tone-white relative h-full rounded-[14px] border-2 border-s-navy p-7 shadow-[0_6px_0_0_var(--s-navy)]">
                  <p className="s-label inline-flex rounded-[5px] bg-s-navy px-2 py-1.5 text-[12.5px] leading-none text-white">STEP {i + 1}</p>
                  <h3 className="s-display mt-7 text-[25px]">{step.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-[1.6] text-s-ink-soft">{step.copy}</p>
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal turn={0} className="mt-20">
            <h2 className="s-display text-[clamp(1.7rem,3vw,2.5rem)]">
              What each audit can <em>see</em>
            </h2>
            <div className="mt-8 grid max-w-[1040px] gap-5 sm:grid-cols-2">
              {instantVsWritten.map((col, i) => (
                <div
                  key={col.label}
                  className={`${i === 1 ? "tone-navy" : "tone-white"} rounded-[14px] border-2 border-s-navy p-7`}
                >
                  <Eyebrow>{col.label}</Eyebrow>
                  <ul className="mt-6 grid gap-3.5">
                    {col.points.map((p) => (
                      <CheckItem key={p}>{p}</CheckItem>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal turn={0} className="mt-20 max-w-[900px]">
            <h2 className="s-display text-[clamp(1.7rem,3vw,2.5rem)]">The audit promise</h2>
            <ul className="mt-7 grid gap-x-10 border-t-2 border-s-navy sm:grid-cols-2">
              {auditPromises.map((promise) => (
                <CheckItem key={promise} className="border-b-[1.5px] border-s-line-2 py-4">
                  {promise}
                </CheckItem>
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
