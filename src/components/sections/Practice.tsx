"use client";

import { useRef } from "react";
import { m as motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";

const steps = [
  {
    n: "01",
    title: "Discover",
    duration: "Week 1",
    body: "It starts with the people who'll use what we build. Workshops, prototypes, and a one-page brief that survives contact with reality.",
  },
  {
    n: "02",
    title: "Design",
    duration: "Week 2–3",
    body: "Figma sketches, then code-as-design. Real components, real data, on a real device — long before launch.",
  },
  {
    n: "03",
    title: "Build",
    duration: "Week 4–8",
    body: "Weekly demoable progress. Type-safe, tested, and reviewed every Friday. You see it grow — no big-bang reveals.",
  },
  {
    n: "04",
    title: "Launch",
    duration: "Week 9",
    body: "App Store submission, monitoring, analytics, and a launch plan. The dotted i's and the press kit get equal sweat.",
  },
  {
    n: "05",
    title: "Support",
    duration: "Ongoing",
    body: "Shipping continues after launch. SLAs, version-1.1 work, and on-call response when production hiccups.",
  },
];

/** One sticky-stacked process card; later cards slide over earlier ones. */
function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // As the next card arrives, this one settles back and dims slightly.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <li ref={ref} className="sticky" style={{ top: `calc(96px + ${index * 14}px)` }}>
      <motion.article
        style={reduce ? undefined : { scale, opacity: dim }}
        className="grid min-h-[300px] grid-rows-[auto_1fr_auto] rounded-[var(--r-lg)] border border-line-2 bg-surface p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] md:p-10"
      >
        <div className="flex items-baseline justify-between border-b border-line pb-5">
          <span className="font-mono text-[11px] tracking-[0.24em] text-accent">
            Step {step.n}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {step.duration}
          </span>
        </div>
        <h3 className="flex items-center py-6 font-display text-[clamp(34px,6vw,72px)] font-semibold uppercase leading-none tracking-[-0.02em] text-ink">
          {step.title}
        </h3>
        <p className="max-w-[560px] text-[15px] leading-[1.7] text-ink-3">{step.body}</p>
      </motion.article>
    </li>
  );
}

/**
 * How I work — five process cards that stack as you scroll: each card pins
 * below the header while the next slides over it (the lafys "cards
 * animation" pattern). Reduced motion renders a plain vertical list.
 */
export function Practice() {
  return (
    <section
      id="practice"
      className="relative bg-canvas px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
          <h2
            id="process-heading"
            className="font-display font-semibold uppercase leading-[0.92] tracking-[-0.025em]"
          >
            <RevealText className="text-[clamp(40px,7vw,96px)] text-ink">How</RevealText>
            <RevealText delay={0.08} className="text-[clamp(40px,7vw,96px)]">
              <span className="text-stroke">I work</span>
            </RevealText>
          </h2>
          <p className="hidden max-w-[300px] pb-2 text-[14px] leading-[1.7] text-ink-3 md:block">
            A clear path — launch in 9 weeks. Real, clickable software every
            Friday; no black boxes.
          </p>
        </div>

        <ol aria-label="My 5-step process" className="grid gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
