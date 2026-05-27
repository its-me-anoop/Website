"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  {
    icon: Compass,
    n: "01",
    title: "Discover",
    duration: "Week 1",
    body:
      "We start with the people who&apos;ll use what we build. Workshops, prototypes, and a one-page brief that survives contact with reality.",
    color: "from-brand to-violet",
    dot: "bg-brand",
  },
  {
    icon: PenTool,
    n: "02",
    title: "Design",
    duration: "Week 2–3",
    body:
      "Figma sketches, then code-as-design. Real components, real data, on a real device — long before launch.",
    color: "from-violet to-fuchsia",
    dot: "bg-violet",
  },
  {
    icon: Code2,
    n: "03",
    title: "Build",
    duration: "Week 4–8",
    body:
      "Weekly demoable progress. Type-safe, tested, and reviewed every Friday. You see it grow — no big-bang reveals.",
    color: "from-fuchsia to-amber",
    dot: "bg-fuchsia",
  },
  {
    icon: Rocket,
    n: "04",
    title: "Launch",
    duration: "Week 9",
    body:
      "App Store submission, monitoring, analytics, and a launch plan. We sweat the dotted i&rsquo;s and the press kit alike.",
    color: "from-amber to-mint",
    dot: "bg-amber",
  },
  {
    icon: LifeBuoy,
    n: "05",
    title: "Support",
    duration: "Ongoing",
    body:
      "We keep shipping after launch. SLAs, version-1.1 work, and on-call response when production hiccups.",
    color: "from-mint to-cyan",
    dot: "bg-mint",
  },
];

const stack = [
  { k: "Frontend", v: "Next.js · React · TypeScript · Tailwind · Framer Motion" },
  { k: "Mobile", v: "Swift · SwiftUI · Flutter · React Native" },
  { k: "Backend", v: "Node · Postgres · GraphQL · Supabase · AWS" },
  { k: "Tooling", v: "Figma · Linear · GitHub · Vercel · Sentry" },
];

export function Practice() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="practice"
      className="relative border-t border-white/[0.04] py-24 md:py-32"
      aria-labelledby="process-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 grid items-end gap-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold tracking-tight text-ink-3 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia" />
              How we work
            </motion.span>
            <motion.h2
              id="process-heading"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
            >
              A clear path,
              <br />
              <span className="text-gradient">launch in 9 weeks.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[440px] text-[15.5px] leading-[1.65] text-ink-3"
          >
            A pragmatic, transparent process built around weekly shippable
            progress. No black-boxes, no vague status updates — just real
            software you can click on, every Friday.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <ol
          aria-label="Our 5-step process"
          className="relative"
        >
          {/* Vertical line for desktop / mobile */}
          <div
            aria-hidden="true"
            className="absolute left-[28px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/40 via-fuchsia/30 to-mint/20 md:left-1/2 md:-translate-x-1/2"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLeft = i % 2 === 0;
            return (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12"
                style={{ paddingBottom: i === steps.length - 1 ? 0 : 36 }}
              >
                {/* Mobile layout & node */}
                <div className="relative flex items-start gap-5 md:hidden">
                  <motion.div
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg shadow-black/40`}
                  >
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </motion.div>
                  <StepCard step={step} />
                </div>

                {/* Desktop alternating layout */}
                <div
                  className={`hidden md:block ${
                    isLeft ? "md:order-1 md:pr-12 md:text-right" : "md:order-2 md:pl-12"
                  }`}
                >
                  <StepCard step={step} alignRight={isLeft} />
                </div>

                <div
                  className={`hidden md:flex md:items-center md:justify-center ${
                    isLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <motion.div
                    whileInView={{ scale: [0.85, 1.08, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div
                      className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${step.color} shadow-xl shadow-black/40`}
                    >
                      <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 -z-10 rounded-3xl ${step.dot}`}
                      style={{ filter: "blur(28px)", opacity: 0.45 }}
                    />
                  </motion.div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-md md:p-10"
        >
          <div className="mb-7 flex items-center justify-between gap-3">
            <h3 className="font-display text-[22px] font-bold tracking-tight text-white md:text-[26px]">
              Tools on the bench
            </h3>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              The stack
            </span>
          </div>
          <ul className="divide-y divide-white/[0.06]">
            {stack.map((s, i) => (
              <motion.li
                key={s.k}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.06 }}
                className="group flex flex-col gap-2 py-4 transition-colors duration-300 hover:bg-white/[0.01] md:grid md:grid-cols-[140px_1fr] md:items-center md:gap-8"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink-3">
                  {s.k}
                </span>
                <span className="font-display text-[15px] font-semibold tracking-tight text-ink-2 transition-colors group-hover:text-white">
                  {s.v}
                </span>
              </motion.li>
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
      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em]">
        <span className="text-muted">Step {step.n}</span>
        <span className="h-1 w-1 rounded-full bg-muted/60" />
        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-ink-3">
          {step.duration}
        </span>
      </div>
      <h3 className="mt-3 font-display text-[26px] font-bold tracking-tight text-white md:text-[30px]">
        {step.title}
      </h3>
      <p
        className="mt-3 text-[14.5px] leading-[1.6] text-ink-3"
        dangerouslySetInnerHTML={{ __html: step.body }}
      />
    </div>
  );
}
