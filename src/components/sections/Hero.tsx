"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const capabilities = ["Web Platforms", "Mobile Apps", "Enterprise Systems"];

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background px-4 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-28 md:px-10 md:pt-40 md:pb-32"
      aria-label="Flutterly hero"
    >
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(237,237,237,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(237,237,237,0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1100px,160vw)] aspect-square rounded-full bg-[radial-gradient(circle,rgba(212,255,0,0.045)_0%,transparent_70%)]" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1200px]"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.p
          variants={fadeUp}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:mb-8 sm:text-xs"
        >
          Flutterly · Product Engineering Studio
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="max-w-4xl text-balance font-display text-[clamp(2.2rem,6.5vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
        >
          We design &amp; build
          <br className="hidden sm:block" />{" "}
          <span className="text-accent">digital products</span>{" "}
          that ship fast &amp; scale.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground-secondary sm:mt-7 sm:text-lg sm:leading-relaxed"
        >
          From strategy to shipping — we turn complex product ideas into
          clean digital experiences your users trust and your team can grow.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
        >
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-background transition-colors hover:bg-accent-hover sm:px-8 sm:py-4"
          >
            <span>Get in touch</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="#products"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground-secondary transition-colors hover:border-foreground-tertiary hover:text-foreground sm:px-8 sm:py-4"
          >
            View work
          </Link>
        </motion.div>

        {/* Capability tags */}
        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-wrap items-center gap-3 border-t border-border pt-8 sm:mt-20 sm:gap-4 sm:pt-10"
        >
          <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-tertiary sm:text-[11px]">
            What we do
          </span>
          {capabilities.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-secondary sm:px-4 sm:text-[11px]"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
