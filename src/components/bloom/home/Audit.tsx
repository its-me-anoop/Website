"use client";

import { auditChecks } from "../data";
import { BtnLink, Eyebrow, RevealWords, Rise } from "../primitives";

/** Decorative report bars — purely illustrative, hidden from AT. */
const reportBars = [
  { label: "Accessibility", width: "42%" },
  { label: "Speed", width: "58%" },
  { label: "Mobile", width: "35%" },
  { label: "Content", width: "70%" },
] as const;

export function Audit() {
  return (
    <section className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <Eyebrow className="mb-4">Free website audit</Eyebrow>
        <RevealWords
          as="h2"
          className="max-w-[560px] text-[clamp(1.9rem,4.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]"
          segments={[
            { text: "How does your current site" },
            { text: "measure up?", tone: "teal" },
          ]}
        />
        <Rise delay={0.15}>
          <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-bl-ink-soft">
            Before you spend anything, get a written review of your existing
            website — scored against the standards that matter for GP practices
            and care homes, with the fixes ranked by impact.
          </p>
        </Rise>
        <Rise delay={0.25}>
          <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {auditChecks.map((check) => (
              <li key={check.title}>
                <h3 className="text-[15px] font-semibold tracking-tight text-bl-ink">
                  {check.title}
                </h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-bl-ink-soft">
                  {check.copy}
                </p>
              </li>
            ))}
          </ul>
        </Rise>
        <Rise delay={0.35} className="mt-9">
          <BtnLink href="/free-audit" tone="teal" arrow>
            Get your free audit
          </BtnLink>
        </Rise>
      </div>

      <Rise delay={0.2} className="mx-auto w-full max-w-[420px]">
        <div aria-hidden className="bl-card rounded-[26px] border border-bl-line bg-bl-surface p-7">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-bl-muted">
            Website audit
          </p>
          <p className="mt-1 text-[19px] font-semibold tracking-tight text-bl-ink">
            yourpractice.nhs.uk
          </p>
          <div className="mt-6 space-y-5">
            {reportBars.map((bar) => (
              <div key={bar.label}>
                <div className="flex items-center justify-between text-[12.5px] font-medium text-bl-ink-soft">
                  <span>{bar.label}</span>
                  <span className="text-bl-muted">needs work</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-bl-band">
                  <div
                    className="h-2 rounded-full bg-bl-teal/70"
                    style={{ width: bar.width }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-2xl bg-bl-band p-4 text-[13px] leading-relaxed text-bl-ink-soft">
            12 prioritised recommendations, in plain English — free, whether or
            not you work with Flutterly afterwards.
          </div>
        </div>
      </Rise>
    </section>
  );
}
