"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { TiltParallaxCard } from "@/components/ui/TiltParallaxCard";
import { motion } from "framer-motion";

function ArrowUp({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M3 9 9 3M5 3h4v4"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniHeatmap() {
  const [cells, setCells] = useState<string[]>([]);
  useEffect(() => {
    const out: string[] = [];
    for (let i = 0; i < 12 * 5; i++) {
      const r = Math.random();
      if (r > 0.93) out.push("l4");
      else if (r > 0.8) out.push("l3");
      else if (r > 0.62) out.push("l2");
      else if (r > 0.4) out.push("l1");
      else out.push("");
    }
    setCells(out);
  }, []);

  const bg = (level: string) => {
    switch (level) {
      case "l4": return "bg-[var(--accent)]";
      case "l3": return "bg-blue-500/80";
      case "l2": return "bg-blue-500/50";
      case "l1": return "bg-blue-500/25";
      default: return "bg-white/5";
    }
  };

  return (
    <div
      aria-hidden="true"
      className="my-2.5 grid flex-1 grid-cols-12 gap-[3px]"
      style={{ aspectRatio: "12/7" }}
    >
      {cells.map((c, i) => (
        <span
          key={i}
          className={`aspect-square rounded-[2px] transition-colors ${bg(c)}`}
        />
      ))}
    </div>
  );
}

/**
 * A beautiful, highly modular Bento Grid displaying Flutterly's product portfolio.
 * Adheres strictly to:
 * - SOLID principles: Outsources card rendering to BentoCard, maintaining a single responsibility for list coordination.
 * - Apple aesthetic: Uses rich obsidian-black blocks, silver borders, glowing micro-details, and crisp Geist typography.
 */
export function FeaturedWork() {
  return (
    <section
      id="work"
      className="relative border-t border-white/5 bg-transparent py-[120px]"
    >
      {/* background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Section Head */}
        <div className="mb-14 grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
              № 02 · Ledger of ships
            </div>
            <h2 className="mt-3 font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">
              Selected ships
              <br />
              <span className="text-zinc-500 font-light">built to last.</span>
            </h2>
          </div>
          <p className="max-w-[420px] text-[15px] leading-[1.6] text-zinc-400">
            A running catalog of client products, operations, and open-source models. 
            We design, develop, and refine every line of code so they feel premium on every interaction.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="grid gap-[16px] md:gap-[20px]"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "140px",
          }}
        >
          {/* Sipli Card */}
          <Link
            href="/projects/sipli"
            className="group relative block max-md:col-span-full max-md:row-span-3 md:col-span-7 md:row-span-3"
          >
            <TiltParallaxCard
              glowColor="rgba(0, 113, 227, 0.2)"
              className="h-full w-full bg-[linear-gradient(165deg,#040e1a,#05162a)] border-white/5"
            >
              {({ xOffsetInverse, yOffsetInverse }) => (
                <>
                  {/* App Screenshot background layer */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -right-10 h-[70%] w-[52%] overflow-hidden rounded-[36px] border border-white/10 shadow-2xl md:-bottom-24 md:-right-16 md:h-[120%] md:w-[46%] md:rounded-[44px]"
                    style={{
                      x: xOffsetInverse,
                      y: yOffsetInverse,
                      rotate: 6,
                    }}
                  >
                    <Image
                      src="/images/sipli/iphone/01-hero-1320x2868.png"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 520px"
                      className="object-cover object-top"
                    />
                  </motion.div>

                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-400">
                    01 · 2026 · iOS · watchOS
                  </span>
                  <div className="relative max-w-[70%] md:max-w-[65%] mt-6 z-10">
                    <h3 className="font-sans text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Sipli.
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.5] text-zinc-400">
                      An AI-powered hydration model built with clean SwiftUI architecture. 
                      Includes high-precision metrics, Watch Ultra logs, and predictive alerts.
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 z-10">
                    <span className="inline-flex items-center gap-1.5 text-zinc-300 transition-colors group-hover:text-[var(--accent)] font-semibold">
                      Case study <ArrowUp />
                    </span>
                    <span>Active</span>
                  </div>
                </>
              )}
            </TiltParallaxCard>
          </Link>

          {/* Active Status Bench Card */}
          <Link
            href="#brief"
            className="group block max-md:col-span-full md:col-span-5 md:row-span-1"
          >
            <BentoCard
              glowColor="rgba(255, 255, 255, 0.08)"
              className="h-full w-full bg-[var(--accent)] border-none text-white hover:bg-[var(--accent-hover)] transition-colors"
              interactive={false}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-blue-100">
                Now · on the bench
              </span>
              <div className="flex items-end justify-between gap-4 mt-2">
                <h3 className="font-sans text-xl font-bold tracking-tight text-white md:text-2xl">
                  Sipli 3.0 — shipping Friday.
                </h3>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-blue-200">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
                  Live
                </span>
              </div>
            </BentoCard>
          </Link>

          {/* Artling Card */}
          <Link
            href="#"
            className="group block max-md:col-span-6 max-md:row-span-2 md:col-span-3 md:row-span-2"
          >
            <TiltParallaxCard
              glowColor="rgba(217, 154, 95, 0.2)"
              className="h-full w-full bg-[linear-gradient(165deg,#1c120a,#2c1b0d)] border-white/5"
            >
              {({ xOffset, yOffset }) => (
                <>
                  <motion.div
                    className="pointer-events-none absolute -right-4 top-4 w-[70px] md:top-8 md:w-[110px]"
                    style={{
                      x: xOffset,
                      y: yOffset,
                      rotate: 6,
                    }}
                  >
                    <Image
                      src="/projects/artling/fox-painter.png"
                      alt=""
                      width={120}
                      height={168}
                      sizes="120px"
                      className="w-full opacity-70 transition-opacity duration-300 group-hover:opacity-95 md:opacity-90"
                    />
                  </motion.div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-400">
                    02 · 2025 · iOS
                  </span>
                  <div className="mt-6 z-10">
                    <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                      Artling.
                    </h3>
                    <p className="mt-2 text-[12px] leading-[1.5] text-zinc-400">
                      A beautiful visual archive preserving children's milestones.
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 z-10">
                    <span className="inline-flex items-center gap-1.5 text-zinc-300">
                      Case <ArrowUp />
                    </span>
                  </div>
                </>
              )}
            </TiltParallaxCard>
          </Link>

          {/* GitHub Activity Heatmap Block */}
          <div
            aria-label="Open source activity"
            className="relative max-md:col-span-6 max-md:row-span-2 md:col-span-2 md:row-span-2"
          >
            <BentoCard glowColor="rgba(255, 255, 255, 0.05)" className="h-full w-full bg-[#09090b]">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                GitHub · 2026
              </span>
              <MiniHeatmap />
              <div className="mt-2">
                <div className="font-sans text-2xl font-bold text-white">41</div>
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  <span>ships · ytd</span>
                  <span>→</span>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Greenmead Card */}
          <Link
            href="#"
            className="group block max-md:col-span-full max-md:row-span-1 md:col-span-4 md:row-span-1"
          >
            <BentoCard
              glowColor="rgba(48, 209, 88, 0.15)"
              className="h-full w-full bg-[linear-gradient(135deg,#06130b,#0c2114)] border-white/5"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                03 · 2024 · Brand
              </span>
              <div className="flex items-end justify-between mt-4">
                <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                  Greenmead.
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">→</span>
              </div>
            </BentoCard>
          </Link>

          {/* JJ Paper Card */}
          <Link
            href="#"
            className="group block max-md:col-span-full max-md:row-span-1 md:col-span-4 md:row-span-1"
          >
            <BentoCard
              glowColor="rgba(255, 255, 255, 0.08)"
              className="h-full w-full bg-[#121214] border-white/5"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                04 · 2024 · Commerce
              </span>
              <div className="flex items-end justify-between mt-4">
                <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                  JJ Paper.
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">→</span>
              </div>
            </BentoCard>
          </Link>

          {/* Sandbourne Card */}
          <Link
            href="#"
            className="group block max-md:col-span-full max-md:row-span-2 md:col-span-4 md:row-span-2"
          >
            <BentoCard
              glowColor="rgba(0, 113, 227, 0.15)"
              className="h-full w-full bg-[linear-gradient(180deg,#0a111a,#050a10)] border-white/5"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                05 · 2024 · Hospitality
              </span>
              <div className="mt-6">
                <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                  Sandbourne.
                </h3>
                <p className="mt-2 text-[12px] leading-[1.5] text-zinc-400">
                  A high-throughput reservations engine for boutique hotel booking, designed from click to room key.
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <span className="inline-flex items-center gap-1.5 text-zinc-300">
                  Case study <ArrowUp />
                </span>
              </div>
            </BentoCard>
          </Link>

          {/* Journal Link */}
          <Link
            href="#"
            className="group block max-md:col-span-full md:col-span-8 md:row-span-1"
          >
            <TiltParallaxCard
              glowColor="rgba(0, 113, 227, 0.1)"
              className="h-full w-full bg-[#121214] border-white/5"
            >
              {() => (
                <>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                    Journal · weekly
                  </span>
                  <h3 className="font-sans text-lg font-bold tracking-tight text-white mt-1.5">
                    № 18 — <span className="text-[var(--accent)] font-semibold">Design at the code.</span> Why we sketch in Figma but design in HTML/Swift.
                  </h3>
                  <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    <span className="inline-flex items-center gap-1.5 text-zinc-300">
                      Read article <ArrowUp />
                    </span>
                    <span>6 min read</span>
                  </div>
                </>
              )}
            </TiltParallaxCard>
          </Link>
        </div>

        <p className="mt-10 max-w-[480px] font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          Some projects remain hidden behind enterprise NDAs. We can present specific systems on request during briefs.
        </p>
      </div>
    </section>
  );
}
