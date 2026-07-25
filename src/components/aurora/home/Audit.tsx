"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE, GlassCard, Reveal, TextReveal } from "@/components/fx";
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
          className="mt-5 max-w-[560px] text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em]"
          segments={[
            { text: "How does your current site" },
            { text: "measure up?", tone: "gradient" },
          ]}
        />
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-au-ink-2">
            Before you spend anything, get a written review of your existing
            website — scored against the standards that matter for GP practices
            and care homes, with the fixes ranked by impact.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <ul className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {auditChecks.map((check, i) => (
              <li key={check.title} className="border-l border-white/10 pl-4">
                <h3 className="flex items-baseline gap-2 text-[15px] font-medium tracking-tight text-au-ink">
                  <span className="au-mono text-[11px] text-au-teal">
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
        <GlassCard strong className="p-7 sm:p-8" interactive>
          <div aria-hidden className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="au-mono text-[10.5px] uppercase tracking-[0.22em] text-au-muted">
                  Website audit
                </p>
                <p className="mt-1.5 text-[18px] font-semibold tracking-tight text-au-ink">
                  yourpractice.nhs.uk
                </p>
              </div>
              <span className="rounded-full border border-au-amber/25 bg-au-amber/10 px-3 py-1 text-[11.5px] font-medium text-au-amber">
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
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="8"
                  />
                  <defs>
                    <linearGradient id="audit-gauge" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#2fd8ad" />
                      <stop offset="60%" stopColor="#5cb2ff" />
                      <stop offset="100%" stopColor="#a48cff" />
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
                  <span className="text-[27px] font-semibold tracking-tight text-au-ink">
                    {SCORE}
                  </span>
                  <span className="au-mono text-[10px] uppercase tracking-[0.18em] text-au-muted">
                    / 100
                  </span>
                </div>
              </div>

              <div className="grow space-y-4">
                {bars.map((bar, i) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-[12.5px] font-medium text-au-ink-2">
                      <span>{bar.label}</span>
                      <span className="au-mono text-au-muted">{bar.value}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                      <m.div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#2fd8ad,#5cb2ff)]"
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

            <p className="mt-7 rounded-2xl border border-white/8 bg-white/[0.035] p-4 text-[13px] leading-relaxed text-au-ink-3">
              12 prioritised recommendations, in plain English — free, whether
              or not you work with Flutterly afterwards.
            </p>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
