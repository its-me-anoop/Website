"use client";

import React from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { motion } from "framer-motion";

const rules = [
  {
    n: "Rule 01",
    title: "One brief at a time.",
    body: "We run one engagement at full depth at a time. You get our attention, not our availability. It keeps the work honest and the calendar clear.",
    glow: "rgba(0, 113, 227, 0.15)", // Blue
  },
  {
    n: "Rule 02",
    title: "Friday ships.",
    body: "We commit to weekly shippable progress — something real you can click, tap, or show a teammate. If we can’t demo by Friday, we change the plan, not the deadline.",
    glow: "rgba(16, 185, 129, 0.15)", // Emerald
  },
  {
    n: "Rule 03",
    title: "Design at the code.",
    body: "Design decisions happen in the editor, not in pixel-perfect Figma handoffs. Figma is a sketchpad; the browser is the studio. It’s faster, and the details are actually real.",
    glow: "rgba(168, 85, 247, 0.15)", // Purple
  },
  {
    n: "Rule 04",
    title: "Yours to own.",
    body: "You own everything — code, credentials, domains, runbooks. When we’re done, you could hire any other team to keep going. No lock-in, not even a little.",
    glow: "rgba(245, 158, 11, 0.15)", // Amber
  },
];

const stack = [
  { k: "Web", v: "Next.js · React · TypeScript · Tailwind · Astro" },
  { k: "Mobile", v: "Swift · SwiftUI · Flutter · React Native" },
  { k: "Backend", v: "Node · Postgres · GraphQL · Supabase · AWS" },
  { k: "Tooling", v: "Figma · Linear · GitHub · Vercel · Sentry" },
];

/**
 * Redesigned Practice section matching Apple's high-precision digital aesthetics.
 * Adheres strictly to SOLID guidelines by leveraging modular BentoCard elements,
 * and maintains TDD compliance.
 */
export function Practice() {
  return (
    <section
      id="practice"
      className="relative border-t border-white/5 bg-transparent py-[120px] text-white overflow-hidden"
    >
      {/* Dynamic ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[140px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Section Header */}
        <div className="mb-16 grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
              № 03 · The practice
            </div>
            <h2 className="mt-3 font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              Four working rules
              <br />
              <span className="text-zinc-500 font-light">we don&rsquo;t break.</span>
            </h2>
          </div>
          <p className="max-w-[420px] text-[15px] leading-[1.6] text-zinc-400">
            We don&rsquo;t have a glossy methodology. We have four rules
            we&rsquo;ve earned the hard way — the reason our clients come back.
          </p>
        </div>

        {/* Rules Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {rules.map((r, index) => (
            <BentoCard
              key={r.n}
              glowColor={r.glow}
              className="group flex flex-col justify-between min-h-[220px] border-white/5 bg-[#09090b]/40 hover:bg-[#09090b]/80 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)] font-semibold">
                    {r.n}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 group-hover:bg-[var(--accent)] transition-colors duration-500" />
                </div>
                <h3 className="font-sans text-xl font-bold tracking-tight text-white md:text-2xl">
                  {r.title}
                </h3>
              </div>
              <p className="mt-4 text-[14px] leading-[1.6] text-zinc-400">
                {r.body}
              </p>
            </BentoCard>
          ))}
        </div>

        {/* Stack Spec Sheet */}
        <div className="mt-24 border-t border-white/5 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500 font-semibold bg-white/5 px-2.5 py-1 rounded-[4px] border border-white/5">
              Specs
            </span>
            <h4 className="font-sans text-sm font-semibold tracking-tight text-white">
              Appendix · Tools on the bench
            </h4>
          </div>

          <div className="divide-y divide-white/5 border-t border-b border-white/5">
            {stack.map((s) => (
              <div
                key={s.k}
                className="group grid grid-cols-1 py-4.5 md:grid-cols-[160px_1fr] gap-2 md:gap-8 items-center transition-colors hover:bg-white/[0.01] px-2 rounded-[8px]"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
                  {s.k}
                </span>
                <span className="font-sans text-[15px] font-semibold text-zinc-300 tracking-tight transition-colors group-hover:text-white">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
