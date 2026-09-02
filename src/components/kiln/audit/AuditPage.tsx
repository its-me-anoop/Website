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
    title: "Send your website address",
    copy: "One email is all it takes. No forms, no calls unless you want one. Just say who you are and where the site lives.",
  },
  {
    title: "Flutterly reviews it properly",
    copy: "Automated checks plus a manual review of accessibility, speed, mobile experience, content and local search: the same lens used on paid projects.",
  },
  {
    title: "You get a written report",
    copy: "A scored, plain-English review with prioritised recommendations, usually within a week. Yours to act on with anyone, no obligation.",
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
              A written review of your current site against the standards that
              matter for GP practices and care homes: accessibility, speed,
              mobile experience, content and local search. Free, honest and
              yours to keep.
            </p>
          </Rise>
          <Rise delay={0.24} className="mt-10 flex w-full justify-center">
            <AuditBar hint="Paste your address and press the arrow. A prefilled email opens; send it and the audit is underway." />
          </Rise>
          <Rise delay={0.3} className="mt-6">
            <BtnLink href="/packages" tone="ghost" size="sm">
              Or see the packages first
            </BtnLink>
          </Rise>
        </div>
      </section>

      {/* Six areas: numbered rows on the deeper bone band. */}
      <section className="border-t border-k-line bg-k-bone-2/60">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <Rise>
              <Eyebrow className="text-k-muted">What gets checked</Eyebrow>
              <Display as="h2" size="md" className="mt-5 text-k-ink">
                Six areas, no stone unturned.
              </Display>
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
                Three steps, <em>one email</em>.
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
            Two minutes now, a clear picture within a <em>week</em>.
          </>
        }
        copy="Send your website address and Flutterly will do the rest: a written, scored review with the fixes that matter most, whoever ends up making them."
        id="contact"
      />
    </KilnShell>
  );
}
