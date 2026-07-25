"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE, Plate, Reveal, TextReveal } from "@/components/fx";
import { auditChecks } from "../data";
import { Btn, Eyebrow, Section } from "../primitives";

/* Illustrative only — a stand-in report, not a real score. */
const bars = [
  { label: "Accessibility", value: 42 },
  { label: "Speed", value: 58 },
  { label: "Mobile", value: 35 },
  { label: "Content", value: 70 },
] as const;

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SCORE = 51;

export function Audit() {
  const reduce = useReducedMotion();
  const offset = CIRCUMFERENCE * (1 - SCORE / 100);

  return (
    <Section className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <Reveal>
          <Eyebrow>Free website audit</Eyebrow>
        </Reveal>
        <TextReveal
          as="h2"
          delay={0.06}
          className="au-display mt-5 max-w-[560px] text-[clamp(2.1rem,4.8vw,3.6rem)]"
          segments={[
            { text: "How does your current site" },
            { text: "measure up?", tone: "accent" },
          ]}
        />
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-au-ink-2">
            Before you spend anything, get a written review of your existing
            website — scored against the standards that matter for GP practices
            and care homes, with the fixes ranked by impact.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <ul className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {auditChecks.map((check, i) => (
              <li key={check.title} className="border-l-2 border-au-line pl-4">
                <h3 className="flex items-baseline gap-2 text-[15px] font-semibold tracking-tight text-au-ink">
                  <span className="au-label text-[10px] text-au-teal-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {check.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-au-ink-3">
                  {check.copy}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.32} className="mt-10">
          <Btn href="/free-audit" tone="primary" arrow>
            Get your free audit
          </Btn>
        </Reveal>
      </div>

      {/* An illustrative audit report, drawn as it scrolls in. */}
      <Reveal delay={0.15} className="mx-auto w-full max-w-[440px]">
        <Plate strong className="p-7 sm:p-8" interactive>
          <div aria-hidden className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="au-label text-au-muted">Website audit</p>
                <p className="au-display mt-2 text-[20px]">
                  yourpractice.nhs.uk
                </p>
              </div>
              <span className="rounded-full border border-au-amber/40 bg-au-amber/12 px-3 py-1 text-[11.5px] font-semibold text-au-amber-ink">
                Needs work
              </span>
            </div>

            <div className="mt-7 flex items-center gap-6">
              <div className="relative h-[124px] w-[124px] shrink-0">
                <svg viewBox="0 0 124 124" className="h-full w-full -rotate-90">
                  <circle
                    cx="62"
                    cy="62"
                    r={RADIUS}
                    fill="none"
                    stroke="rgba(82,50,42,0.12)"
                    strokeWidth="8"
                  />
                  <defs>
                    <linearGradient id="audit-gauge" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1b8fa1" />
                      <stop offset="52%" stopColor="#e89a2a" />
                      <stop offset="100%" stopColor="#c73e6f" />
                    </linearGradient>
                  </defs>
                  <m.circle
                    cx="62"
                    cy="62"
                    r={RADIUS}
                    fill="none"
                    stroke="url(#audit-gauge)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    initial={reduce ? false : { strokeDashoffset: CIRCUMFERENCE }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
                    style={reduce ? { strokeDashoffset: offset } : undefined}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="au-display text-[30px] font-medium text-au-ink">
                    {SCORE}
                  </span>
                  <span className="au-label text-[10px] text-au-muted">
                    / 100
                  </span>
                </div>
              </div>

              <div className="grow space-y-4">
                {bars.map((bar, i) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-[12.5px] font-medium text-au-ink-2">
                      <span>{bar.label}</span>
                      <span className="tabular-nums text-au-muted">
                        {bar.value}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-au-surface-3">
                      <m.div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#1b8fa1,#e89a2a)]"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${bar.value}%` }}
                        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                        transition={{
                          duration: 1.1,
                          ease: EASE,
                          delay: 0.35 + i * 0.12,
                        }}
                        style={reduce ? { width: `${bar.value}%` } : undefined}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-7 rounded-[var(--r-md)] border border-au-line bg-au-surface p-4 text-[13px] leading-relaxed text-au-ink-3">
              12 prioritised recommendations, in plain English — free, whether
              or not you work with Flutterly afterwards.
            </p>
          </div>
        </Plate>
      </Reveal>
    </Section>
  );
}
