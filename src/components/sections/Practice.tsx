"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import { Compass, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  {
    icon: Compass,
    n: "01",
    title: "Discover",
    duration: "Week 1",
    body: "It starts with the people who'll use what we build. Workshops, prototypes, and a one-page brief that survives contact with reality.",
  },
  {
    icon: PenTool,
    n: "02",
    title: "Design",
    duration: "Week 2–3",
    body: "Figma sketches, then code-as-design. Real components, real data, on a real device — long before launch.",
  },
  {
    icon: Code2,
    n: "03",
    title: "Build",
    duration: "Week 4–8",
    body: "Weekly demoable progress. Type-safe, tested, and reviewed every Friday. You see it grow — no big-bang reveals.",
  },
  {
    icon: Rocket,
    n: "04",
    title: "Launch",
    duration: "Week 9",
    body: "App Store submission, monitoring, analytics, and a launch plan. The dotted i's and the press kit get equal sweat.",
  },
  {
    icon: LifeBuoy,
    n: "05",
    title: "Support",
    duration: "Ongoing",
    body: "Shipping continues after launch. SLAs, version-1.1 work, and on-call response when production hiccups.",
  },
];

/**
 * How it works — a Lumio-style step grid: small caps label, sentence-case
 * heading, then five surface cards with teal icon tiles, step numbers and
 * duration chips, staggering in on scroll.
 */
export function Practice() {
  const reduce = useReducedMotion();

  return (
    <section
      id="practice"
      className="relative bg-canvas px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-14 max-w-2xl md:mb-18">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            How it works
          </p>
          <h2
            id="process-heading"
            className="mt-5 font-display text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.06] tracking-[-0.02em] text-ink"
          >
            A clear path — launch in 9 weeks.
          </h2>
          <p className="mt-5 max-w-[520px] text-[15.5px] leading-[1.7] text-ink-3">
            A pragmatic, transparent process built around weekly shippable
            progress. Real, clickable software every Friday — no black boxes,
            no vague status updates.
          </p>
        </div>

        <ol aria-label="The 5-step process" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.n}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex min-h-[230px] flex-col rounded-[var(--r-lg)] border border-line bg-surface p-6 transition-colors duration-400 hover:border-line-2 md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[var(--r-sm)] bg-accent-soft text-accent transition-transform duration-400 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[21px] font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-ink-3">
                  {step.body}
                </p>
                <span className="mt-5 inline-flex w-fit items-center rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {step.duration}
                </span>
              </motion.li>
            );
          })}

          {/* Filler tile keeps the 3-col grid balanced and sells the promise */}
          <motion.li
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
            className="hidden min-h-[230px] flex-col justify-between rounded-[var(--r-lg)] border border-accent/25 bg-accent-soft p-7 lg:flex"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Every Friday
            </span>
            <p className="font-display text-[24px] font-semibold leading-[1.25] tracking-tight text-ink">
              Software you can click on — not a status update.
            </p>
          </motion.li>
        </ol>
      </div>
    </section>
  );
}
