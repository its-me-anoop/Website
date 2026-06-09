"use client";

import { motion } from "framer-motion";
import { Compass, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    icon: Compass,
    n: "01",
    title: "Discover",
    duration: "Week 1",
    body:
      "I start with the people who’ll use what we build. Workshops, prototypes, and a one-page brief that survives contact with reality.",
  },
  {
    icon: PenTool,
    n: "02",
    title: "Design",
    duration: "Week 2–3",
    body:
      "Figma sketches, then code-as-design. Real components, real data, on a real device — long before launch.",
  },
  {
    icon: Code2,
    n: "03",
    title: "Build",
    duration: "Week 4–8",
    body:
      "Weekly demoable progress. Type-safe, tested, and reviewed every Friday. You see it grow — no big-bang reveals.",
  },
  {
    icon: Rocket,
    n: "04",
    title: "Launch",
    duration: "Week 9",
    body:
      "App Store submission, monitoring, analytics, and a launch plan. I sweat the dotted i’s and the press kit alike.",
  },
  {
    icon: LifeBuoy,
    n: "05",
    title: "Support",
    duration: "Ongoing",
    body:
      "I keep shipping after launch. SLAs, version-1.1 work, and on-call response when production hiccups.",
  },
];

const stack = [
  { k: "Frontend", v: "Next.js · React · TypeScript · Tailwind · Framer Motion" },
  { k: "Mobile", v: "Swift · SwiftUI · Flutter · React Native" },
  { k: "Backend", v: "Node · Postgres · GraphQL · Supabase · AWS" },
  { k: "Tooling", v: "Figma · Linear · GitHub · Vercel · Sentry" },
];

/**
 * How I work — an alternating five-step timeline on the grey band, followed
 * by a plain-spoken stack table. Steps rise in as they enter the viewport.
 */
export function Practice() {
  return (
    <section
      id="practice"
      className="relative bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHeader
          eyebrow="How I work"
          headingId="process-heading"
          dot="var(--teal)"
          title={
            <>
              A clear path,
              <br />
              <em>launch in 9 weeks.</em>
            </>
          }
          lede="A pragmatic, transparent process built around weekly shippable progress. No black-boxes, no vague status updates — just real software you can click on, every Friday."
        />

        {/* Timeline */}
        <ol aria-label="My 5-step process" className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[28px] bottom-2 top-2 w-px bg-line-2 md:left-1/2 md:-translate-x-1/2"
          />
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLeft = i % 2 === 0;
            return (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12"
                style={{ paddingBottom: i === steps.length - 1 ? 0 : 40 }}
              >
                {/* Mobile node */}
                <div className="relative flex items-start gap-5 md:hidden">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <StepCard step={step} />
                </div>

                {/* Desktop alternating */}
                <div className={`hidden md:block ${isLeft ? "md:order-1 md:pr-12 md:text-right" : "md:order-2 md:pl-12"}`}>
                  <StepCard step={step} alignRight={isLeft} />
                </div>
                <div className={`hidden md:flex md:items-center md:justify-center ${isLeft ? "md:order-2" : "md:order-1"}`}>
                  <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-line bg-surface text-accent shadow-[0_8px_30px_rgba(0,0,0,0.07)]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 rounded-[var(--r-xl)] border border-line bg-surface p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:p-10"
        >
          <div className="mb-7 flex items-center justify-between gap-3">
            <h3 className="font-display text-[22px] font-semibold tracking-tight text-ink md:text-[26px]">
              Tools on the bench
            </h3>
            <span className="rounded-full bg-surface-2 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
              The stack
            </span>
          </div>
          <ul className="divide-y divide-line">
            {stack.map((s) => (
              <li
                key={s.k}
                className="group flex flex-col gap-2 py-4 md:grid md:grid-cols-[140px_1fr] md:items-center md:gap-8"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink-3">
                  {s.k}
                </span>
                <span className="font-display text-[15.5px] font-semibold tracking-tight text-ink-2 transition-colors group-hover:text-ink">
                  {s.v}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  alignRight = false,
}: {
  step: (typeof steps)[number];
  alignRight?: boolean;
}) {
  return (
    <div className={alignRight ? "md:ml-auto md:max-w-[420px]" : "md:max-w-[420px]"}>
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className="text-muted">Step {step.n}</span>
        <span className="h-1 w-1 rounded-full bg-faint" />
        <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-ink-3">{step.duration}</span>
      </div>
      <h3 className="mt-3 font-display text-[26px] font-semibold tracking-tight text-ink md:text-[30px]">
        {step.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.65] text-ink-3">{step.body}</p>
    </div>
  );
}
