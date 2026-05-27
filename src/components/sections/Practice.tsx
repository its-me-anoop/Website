"use client";

import React, { useRef } from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { motion, useInView } from "framer-motion";

const rules = [
  {
    n: "Rule 01",
    title: "One brief at a time.",
    body: "We run one engagement at full depth at a time. You get our attention, not our availability. It keeps the work honest and the calendar clear.",
    glow: "rgba(0, 113, 227, 0.12)",
  },
  {
    n: "Rule 02",
    title: "Friday ships.",
    body: "We commit to weekly shippable progress — something real you can click, tap, or show a teammate. If we can't demo by Friday, we change the plan, not the deadline.",
    glow: "rgba(48, 209, 88, 0.12)",
  },
  {
    n: "Rule 03",
    title: "Design at the code.",
    body: "Design decisions happen in the editor, not in pixel-perfect Figma handoffs. Figma is a sketchpad; the browser is the studio. It's faster, and the details are actually real.",
    glow: "rgba(168, 85, 247, 0.12)",
  },
  {
    n: "Rule 04",
    title: "Yours to own.",
    body: "You own everything — code, credentials, domains, runbooks. When we're done, you could hire any other team to keep going. No lock-in, not even a little.",
    glow: "rgba(245, 158, 11, 0.12)",
  },
];

const stack = [
  { k: "Web", v: "Next.js · React · TypeScript · Tailwind · Astro" },
  { k: "Mobile", v: "Swift · SwiftUI · Flutter · React Native" },
  { k: "Backend", v: "Node · Postgres · GraphQL · Supabase · AWS" },
  { k: "Tooling", v: "Figma · Linear · GitHub · Vercel · Sentry" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 35,
    scale: 0.98,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
};

const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: "blur(8px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Practice section with Apple-style fluid animations and scroll-triggered reveals.
 */
export function Practice() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="practice"
      className="relative border-t border-white/[0.04] bg-transparent py-[130px] text-white overflow-hidden"
    >
      {/* Dynamic ambient radial glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/[0.03] blur-[160px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Section Header */}
        <motion.div 
          className="mb-16 grid items-end gap-10 md:grid-cols-2 md:gap-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={headerVariants}>
            <motion.div 
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              № 03 · The practice
            </motion.div>
            <h2 className="mt-3 font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              Four working rules
              <br />
              <span className="text-zinc-500 font-light">we don&rsquo;t break.</span>
            </h2>
          </motion.div>
          <motion.p 
            className="max-w-[420px] text-[15px] leading-[1.65] text-zinc-400"
            variants={headerVariants}
          >
            We don&rsquo;t have a glossy methodology. We have four rules
            we&rsquo;ve earned the hard way — the reason our clients come back.
          </motion.p>
        </motion.div>

        {/* Rules Bento Grid */}
        <motion.div 
          className="grid gap-5 md:grid-cols-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {rules.map((r, index) => (
            <motion.div key={r.n} variants={itemVariants}>
              <BentoCard
                glowColor={r.glow}
                className="group flex flex-col justify-between min-h-[220px] border-white/[0.04] bg-[#0a0a0a]/50 backdrop-blur-sm transition-all duration-500 hover:bg-[#0a0a0a]/80 hover:border-white/[0.08]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <motion.span 
                      className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)] font-semibold"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {r.n}
                    </motion.span>
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 transition-all duration-500 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_12px_rgba(0,113,227,0.5)]" />
                  </div>
                  <h3 className="font-sans text-xl font-bold tracking-tight text-white md:text-2xl transition-colors duration-300">
                    {r.title}
                  </h3>
                </div>
                <p className="mt-4 text-[14px] leading-[1.65] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                  {r.body}
                </p>
              </BentoCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Stack Spec Sheet */}
        <motion.div 
          className="mt-28 border-t border-white/[0.04] pt-14"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500 font-semibold bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.04]">
              Specs
            </span>
            <h4 className="font-sans text-sm font-semibold tracking-tight text-white">
              Appendix · Tools on the bench
            </h4>
          </div>

          <div className="divide-y divide-white/[0.04] border-t border-b border-white/[0.04]">
            {stack.map((s, index) => (
              <motion.div
                key={s.k}
                className="group grid grid-cols-1 py-5 md:grid-cols-[160px_1fr] gap-2 md:gap-8 items-center transition-all duration-300 hover:bg-white/[0.01] px-3 rounded-lg -mx-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium transition-colors duration-300 group-hover:text-zinc-400">
                  {s.k}
                </span>
                <span className="font-sans text-[15px] font-semibold text-zinc-300 tracking-tight transition-colors duration-300 group-hover:text-white">
                  {s.v}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
