"use client";

import { KilnShell } from "../KilnShell";
import { CtaBand } from "../CtaBand";
import { auditChecks, auditPromises } from "../data";
import {
  AuditBar,
  BtnLink,
  CheckItem,
  Display,
  Eyebrow,
  Rise,
  SectionHead,
} from "../primitives";

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
    points: [
      "Runs in seconds, in your browser",
      "Reads the page\u2019s HTML and response headers",
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

export function AuditPage() {
  return (
    <KilnShell>
      <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 pb-24 text-center sm:px-8 sm:pb-32">
          <Rise>
            <Eyebrow className="text-k-muted">Free website audit</Eyebrow>
          </Rise>
          <Rise delay={0.06}>
            <Display as="h1" size="xl" className="mt-6 max-w-[16ch] text-k-ink">
              Find out how your website <em>really</em> performs.
            </Display>
          </Rise>
          <Rise delay={0.14}>
            <p className="mx-auto mt-7 max-w-[600px] text-[17.5px] leading-[1.6] text-k-ink-soft">
              Paste your address and get a scored report in seconds: accessibility, speed, search,
              content, mobile, security and local presence, each explained in plain English with the
              fix. Then, if you want it, a written review by a person. Both free.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex w-full justify-center">
            <AuditBar hint="Paste your address and press the arrow. The report appears in a few seconds." />
          </Rise>
          <Rise delay={0.3} className="mt-6">
            <BtnLink href="/packages" tone="ghost" size="sm">
              Or see the packages first
            </BtnLink>
          </Rise>
        </div>
      </section>

      {/* Seven areas: numbered rows on the deeper bone band. */}
      <section className="border-t border-k-line bg-k-bone-2/60">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <Rise>
              <Eyebrow className="text-k-muted">What gets checked</Eyebrow>
              <Display as="h2" size="md" className="mt-5 text-k-ink">
                Seven areas, scored and <em>explained</em>.
              </Display>
              <p className="mt-5 text-[15.5px] leading-[1.6] text-k-ink-soft">
                Each area is weighted by how much it affects the people your website serves.
                Accessibility and content count most, because those are what patients and families
                feel first.
              </p>
            </Rise>
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {auditChecks.map((check, i) => (
                <Rise as="li" key={check.title} delay={(i % 2) * 0.06} className="border-t border-k-line py-7">
                  <span className="k-display block text-[13px] tabular-nums text-k-fire">
                    0{i + 1}
                  </span>
                  <h3 className="k-display mt-3 text-[24px] text-k-ink">{check.title}</h3>
                  <p className="mt-2.5 max-w-[40ch] text-[15px] leading-[1.6] text-k-ink-soft">
                    {check.copy}
                  </p>
                </Rise>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* How it works, on coal. */}
      <section className="on-coal bg-k-coal text-k-coal-ink">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                Seconds now, a <em>written review</em> within a week.
              </>
            }
            onCoal
          />
          <ol className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {steps.map((step, i) => (
              <Rise as="li" key={step.title} delay={i * 0.08} className="border-t border-k-coal-line pt-6">
                <span className="k-display block text-[56px] leading-none text-k-fire-lite">
                  {i + 1}
                </span>
                <h3 className="k-display mt-6 text-[26px] text-k-coal-ink">{step.title}</h3>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-k-coal-soft">
                  {step.copy}
                </p>
              </Rise>
            ))}
          </ol>

          {/* Instant vs written: two hairline columns. */}
          <Rise className="mx-auto mt-20 max-w-[900px] border-t border-k-coal-line pt-10">
            <h2 className="k-display text-center text-[clamp(1.5rem,2.6vw,2.1rem)] text-k-coal-ink">
              What each audit can <em>see</em>
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
              {instantVsWritten.map((col) => (
                <div key={col.label}>
                  <p className="k-eyebrow text-k-coal-soft">{col.label}</p>
                  <ul className="mt-4 grid gap-3">
                    {col.points.map((p) => (
                      <CheckItem key={p} onCoal>
                        {p}
                      </CheckItem>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Rise>

          <Rise className="mx-auto mt-20 max-w-[760px] border-t border-k-coal-line pt-10">
            <h2 className="k-display text-center text-[clamp(1.5rem,2.6vw,2.1rem)] text-k-coal-ink">
              The audit promise
            </h2>
            <ul className="mt-7 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
              {auditPromises.map((promise) => (
                <CheckItem key={promise} onCoal>
                  {promise}
                </CheckItem>
              ))}
            </ul>
          </Rise>
        </div>
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
    </KilnShell>
  );
}
