"use client";

import Link from "next/link";
import { m as motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/visual/DashboardPreview";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Lumen hero — a composed, Lumio-style opening: small caps label,
 * sentence-case display headline, supporting line, paired CTAs, and the
 * live studio-dashboard preview as the centrepiece beneath.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <header id="top" className="relative isolate overflow-hidden bg-canvas px-[var(--gutter)] pb-20 pt-32 md:pt-40">
      {/* Soft top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
        style={{
          background:
            "radial-gradient(55% 65% at 50% 0%, rgba(47,214,195,0.10), transparent 70%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center text-center">
        {/* Label */}
        <motion.p
          {...enter(0.1)}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-accent"
        >
          Flutterly — Product studio, Reading UK
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...enter(0.2)}
          className="mt-6 max-w-[17ch] font-display text-[clamp(40px,6.5vw,84px)] font-semibold leading-[1.04] tracking-[-0.025em] text-ink"
        >
          Apps people love opening.
          <br />
          <span className="text-ink-3">Designed &amp; built end to end.</span>
        </motion.h1>

        {/* Support line */}
        <motion.p
          {...enter(0.32)}
          className="mt-7 max-w-[560px] text-[16px] leading-[1.7] text-ink-3 md:text-[17px]"
        >
          Fast, polished web and mobile products with Next.js, React, SwiftUI
          and Flutter — one accountable studio from first sketch to App Store.
        </motion.p>

        {/* CTAs */}
        <motion.div {...enter(0.44)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="#brief" aria-label="Start a project">
            <Button variant="primary" size="lg" className="group">
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="#work" aria-label="See my work">
            <Button variant="outline" size="lg" className="group">
              See the work
              <ArrowUpRight className="h-4 w-4 text-ink-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Dashboard centrepiece */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.6, ease }}
        className="mx-auto mt-16 w-full max-w-[1000px] md:mt-20"
      >
        <DashboardPreview />
      </motion.div>
    </header>
  );
}
