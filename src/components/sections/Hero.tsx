"use client";

import Link from "next/link";
import { m as motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { LiquidGlass } from "@/components/ui/LiquidGlass";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "12+", label: "Apps shipped" },
  { value: "10y", label: "Experience" },
  { value: "<48h", label: "Reply time" },
];

/**
 * Noir hero — a full-viewport, type-led opening: availability meta up top,
 * an oversized two-line display (solid + outline-stroke) refracted by a
 * gently drifting liquid-glass lens, and a grounded bottom row with intro
 * copy, a scroll cue, and trust stats. The whole stage parallaxes away as
 * you scroll past it.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 600], [1, 0]);
  const drift = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <header id="top" className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-canvas">
      <motion.div
        style={reduce ? undefined : { opacity: fade, y: drift }}
        className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col px-[var(--gutter)] pb-10 pt-28 md:pt-32"
      >
        {/* Meta row */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3"
        >
          <span className="inline-flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
            </span>
            Open for briefs — Summer ’26
          </span>
          <span className="hidden md:inline">Developer &amp; Designer</span>
          <span>Reading, UK</span>
        </motion.div>

        {/* Display */}
        <div className="flex flex-1 items-center">
          <LiquidGlass
            className="w-full py-6"
            scene="var(--canvas)"
            radius="var(--r-lg)"
            shape={{ width: 320, height: 190, radius: 95, depth: 12, curvature: 2.8 }}
            optics={{ scale: 18, chroma: 0.06 }}
            highlight={0.5}
            smoothing={0.09}
          >
            <h1 className="font-display font-semibold uppercase leading-[0.88] tracking-[-0.03em]">
              <RevealText onMount delay={0.35} className="text-[clamp(56px,12.5vw,178px)] text-ink">
                Developer
              </RevealText>
              <RevealText onMount delay={0.5} className="text-[clamp(56px,12.5vw,178px)]">
                <span className="text-accent">&amp;</span>{" "}
                <span className="text-stroke">Designer</span>
              </RevealText>
            </h1>
          </LiquidGlass>
        </div>

        {/* Bottom row */}
        <div className="grid items-end gap-8 border-t border-line pt-7 md:grid-cols-[1.2fr_auto_1fr]">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="max-w-[420px] text-[15px] leading-[1.7] text-ink-3"
          >
            I&rsquo;m Anoop Jose — I design and engineer fast, beautiful web and
            mobile apps with Next.js, React, SwiftUI and Flutter, through my
            studio{" "}
            <Link
              href="#studio"
              className="text-ink underline decoration-line-3 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Flutterly
            </Link>
            .
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="hidden items-center gap-3 md:flex"
            aria-hidden="true"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-line-2">
              <span className="animate-scroll-cue absolute inset-x-0 h-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Scroll
            </span>
            <ArrowDown className="h-3 w-3 text-muted" />
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="flex justify-start gap-10 md:justify-end"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dd className="font-display text-[24px] font-semibold leading-none text-ink">
                  {s.value}
                </dd>
                <dt className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Quick path to the work */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="mt-6 flex justify-end"
        >
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 transition-colors duration-300 hover:text-accent"
            aria-label="See my work"
          >
            Selected work
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
}
