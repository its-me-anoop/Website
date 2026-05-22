"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { TiltParallaxCard } from "@/components/ui/TiltParallaxCard";
import { motion, useInView } from "framer-motion";

function ArrowUp({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
      default: return "bg-white/[0.04]";
    }
  };

  return (
    <div
      aria-hidden="true"
      className="my-2.5 grid flex-1 grid-cols-12 gap-[3px]"
      style={{ aspectRatio: "12/7" }}
    >
      {cells.map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.008, duration: 0.3 }}
          className={`aspect-square rounded-[2px] transition-colors ${bg(c)}`}
        />
      ))}
    </div>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.98,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
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
 * A beautiful, highly modular Bento Grid displaying Flutterly's product portfolio.
 * Enhanced with fluid Apple-style animations and scroll-triggered reveals.
 */
export function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="work"
      className="relative border-t border-white/[0.04] bg-transparent py-[130px]"
    >
      {/* background glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.03] blur-[150px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Section Head */}
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
              № 02 · Ledger of ships
            </motion.div>
            <h2 className="mt-3 font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">
              Selected ships
              <br />
              <span className="text-zinc-500 font-light">built to last.</span>
            </h2>
          </motion.div>
          <motion.p 
            className="max-w-[420px] text-[15px] leading-[1.65] text-zinc-400"
            variants={headerVariants}
          >
            A running catalog of client products, operations, and open-source models. 
            We design, develop, and refine every line of code so they feel premium on every interaction.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid gap-4 md:gap-5"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "140px",
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Sipli Card */}
          <motion.div 
            variants={itemVariants}
            className="max-md:col-span-full max-md:row-span-3 md:col-span-7 md:row-span-3"
          >
            <Link
              href="/projects/sipli"
              className="group relative block h-full w-full"
            >
              <TiltParallaxCard
                glowColor="rgba(0, 113, 227, 0.15)"
                className="h-full w-full bg-[linear-gradient(165deg,#040e1a,#05162a)] border-white/[0.04]"
              >
                {({ xOffsetInverse, yOffsetInverse }) => (
                  <>
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-20 -right-10 h-[70%] w-[52%] overflow-hidden rounded-[36px] border border-white/[0.08] shadow-2xl md:-bottom-24 md:-right-16 md:h-[120%] md:w-[46%] md:rounded-[44px]"
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
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </motion.div>

                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-400">
                      01 · 2026 · iOS · watchOS
                    </span>
                    <div className="relative max-w-[70%] md:max-w-[65%] mt-6 z-10">
                      <h3 className="font-sans text-2xl font-bold tracking-tight text-white md:text-3xl transition-colors duration-300 group-hover:text-white">
                        Sipli.
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.55] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                        An AI-powered hydration model built with clean SwiftUI architecture. 
                        Includes high-precision metrics, Watch Ultra logs, and predictive alerts.
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 z-10">
                      <span className="inline-flex items-center gap-1.5 text-zinc-300 transition-colors duration-300 group-hover:text-[var(--accent)] font-semibold">
                        Case study <ArrowUp />
                      </span>
                      <span>Active</span>
                    </div>
                  </>
                )}
              </TiltParallaxCard>
            </Link>
          </motion.div>

          {/* Active Status Bench Card */}
          <motion.div 
            variants={itemVariants}
            className="max-md:col-span-full md:col-span-5 md:row-span-1"
          >
            <Link href="#brief" className="group block h-full w-full">
              <BentoCard
                glowColor="rgba(255, 255, 255, 0.08)"
                className="h-full w-full bg-[var(--accent)] border-none text-white transition-all duration-500 hover:bg-[var(--accent-hover)] hover:shadow-xl hover:shadow-[var(--accent)]/20"
                interactive={false}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-blue-100/80">
                  Now · on the bench
                </span>
                <div className="flex items-end justify-between gap-4 mt-2">
                  <h3 className="font-sans text-xl font-bold tracking-tight text-white md:text-2xl">
                    Sipli 3.0 — shipping Friday.
                  </h3>
                  <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-blue-100/80">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    Live
                  </span>
                </div>
              </BentoCard>
            </Link>
          </motion.div>

          {/* Artling Card */}
          <motion.div 
            variants={itemVariants}
            className="max-md:col-span-6 max-md:row-span-2 md:col-span-3 md:row-span-2"
          >
            <Link href="#" className="group block h-full w-full">
              <TiltParallaxCard
                glowColor="rgba(217, 154, 95, 0.15)"
                className="h-full w-full bg-[linear-gradient(165deg,#1c120a,#2c1b0d)] border-white/[0.04]"
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
                        className="w-full opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 md:opacity-85"
                      />
                    </motion.div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-400">
                      02 · 2025 · iOS
                    </span>
                    <div className="mt-6 z-10">
                      <h3 className="font-sans text-xl font-bold tracking-tight text-white transition-colors duration-300">
                        Artling.
                      </h3>
                      <p className="mt-2 text-[12px] leading-[1.55] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                        A beautiful visual archive preserving children&rsquo;s milestones.
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 z-10">
                      <span className="inline-flex items-center gap-1.5 text-zinc-300 transition-colors duration-300 group-hover:text-[var(--accent)]">
                        Case <ArrowUp />
                      </span>
                    </div>
                  </>
                )}
              </TiltParallaxCard>
            </Link>
          </motion.div>

          {/* GitHub Activity Heatmap Block */}
          <motion.div
            variants={itemVariants}
            aria-label="Open source activity"
            className="relative max-md:col-span-6 max-md:row-span-2 md:col-span-2 md:row-span-2"
          >
            <BentoCard glowColor="rgba(255, 255, 255, 0.04)" className="h-full w-full bg-[#0a0a0a]">
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
          </motion.div>

          {/* Greenmead Card */}
          <motion.div 
            variants={itemVariants}
            className="max-md:col-span-full max-md:row-span-1 md:col-span-4 md:row-span-1"
          >
            <Link href="#" className="group block h-full w-full">
              <BentoCard
                glowColor="rgba(48, 209, 88, 0.12)"
                className="h-full w-full bg-[linear-gradient(135deg,#06130b,#0c2114)] border-white/[0.04]"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                  03 · 2024 · Brand
                </span>
                <div className="flex items-end justify-between mt-4">
                  <h3 className="font-sans text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-100">
                    Greenmead.
                  </h3>
                  <motion.span 
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300"
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </div>
              </BentoCard>
            </Link>
          </motion.div>

          {/* JJ Paper Card */}
          <motion.div 
            variants={itemVariants}
            className="max-md:col-span-full max-md:row-span-1 md:col-span-4 md:row-span-1"
          >
            <Link href="#" className="group block h-full w-full">
              <BentoCard
                glowColor="rgba(255, 255, 255, 0.06)"
                className="h-full w-full bg-[#111111] border-white/[0.04]"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                  04 · 2024 · Commerce
                </span>
                <div className="flex items-end justify-between mt-4">
                  <h3 className="font-sans text-xl font-bold tracking-tight text-white transition-colors duration-300">
                    JJ Paper.
                  </h3>
                  <motion.span 
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300"
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </div>
              </BentoCard>
            </Link>
          </motion.div>

          {/* Sandbourne Card */}
          <motion.div 
            variants={itemVariants}
            className="max-md:col-span-full max-md:row-span-2 md:col-span-4 md:row-span-2"
          >
            <Link href="#" className="group block h-full w-full">
              <BentoCard
                glowColor="rgba(0, 113, 227, 0.1)"
                className="h-full w-full bg-[linear-gradient(180deg,#0a111a,#050a10)] border-white/[0.04]"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                  05 · 2024 · Hospitality
                </span>
                <div className="mt-6">
                  <h3 className="font-sans text-xl font-bold tracking-tight text-white transition-colors duration-300">
                    Sandbourne.
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.55] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                    A high-throughput reservations engine for boutique hotel booking, designed from click to room key.
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  <span className="inline-flex items-center gap-1.5 text-zinc-300 transition-colors duration-300 group-hover:text-[var(--accent)]">
                    Case study <ArrowUp />
                  </span>
                </div>
              </BentoCard>
            </Link>
          </motion.div>

          {/* Journal Link */}
          <motion.div 
            variants={itemVariants}
            className="max-md:col-span-full md:col-span-8 md:row-span-1"
          >
            <Link href="#" className="group block h-full w-full">
              <TiltParallaxCard
                glowColor="rgba(0, 113, 227, 0.08)"
                className="h-full w-full bg-[#111111] border-white/[0.04]"
              >
                {() => (
                  <>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                      Journal · weekly
                    </span>
                    <h3 className="font-sans text-lg font-bold tracking-tight text-white mt-1.5 transition-colors duration-300">
                      № 18 — <span className="text-[var(--accent)] font-semibold transition-colors duration-300 group-hover:text-blue-300">Design at the code.</span> Why we sketch in Figma but design in HTML/Swift.
                    </h3>
                    <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      <span className="inline-flex items-center gap-1.5 text-zinc-300 transition-colors duration-300 group-hover:text-[var(--accent)]">
                        Read article <ArrowUp />
                      </span>
                      <span>6 min read</span>
                    </div>
                  </>
                )}
              </TiltParallaxCard>
            </Link>
          </motion.div>
        </motion.div>

        <motion.p 
          className="mt-12 max-w-[480px] font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Some projects remain hidden behind enterprise NDAs. We can present specific systems on request during briefs.
        </motion.p>
      </div>
    </section>
  );
}
