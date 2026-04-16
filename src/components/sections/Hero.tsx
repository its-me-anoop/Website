"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-background px-4 pt-24 pb-10 sm:px-6 sm:pt-32 md:px-10 md:pt-36"
      aria-label="Flutterly — A product studio from Reading, UK"
    >
      {/* Soft editorial grid — column rules */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full -translate-x-1/2 opacity-[0.05] md:block"
        style={{
          maxWidth: 1200,
          backgroundImage:
            "linear-gradient(90deg, rgba(237,237,237,0.4) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-[1200px] flex-col justify-between"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Ledger bar — top meta */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 gap-4 border-b border-border pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary sm:grid-cols-4 sm:pb-5 sm:text-[11px]"
        >
          <MetaCell label="Studio" value="Flutterly Ltd" />
          <MetaCell label="Est." value="Reading, UK · 2024" />
          <MetaCell label="On the bench" value="Sipli 2.0" />
          <MetaCell
            label="Status"
            value={
              <span className="inline-flex items-center gap-2 text-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Taking briefs · Summer ’26
              </span>
            }
          />
        </motion.div>

        {/* Headline block */}
        <div className="flex flex-1 flex-col justify-center py-14 sm:py-20 md:py-24">
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(2.5rem,8.2vw,7.25rem)] font-light leading-[0.94] tracking-[-0.035em] text-foreground"
          >
            <span className="block italic text-foreground-secondary/90">
              A small studio
            </span>
            <span className="block">
              building{" "}
              <span className="relative inline-block">
                <span className="relative z-10">products</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.08em] h-[0.18em] bg-accent/70"
                />
              </span>{" "}
              people
            </span>
            <span className="block font-normal">want to keep open.</span>
          </motion.h1>

          {/* Lede — offset, narrow, asymmetric */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-1 items-start gap-6 sm:mt-14 md:grid-cols-12 md:gap-10"
          >
            <div className="hidden md:col-span-5 md:block" aria-hidden />
            <p className="md:col-span-6 text-pretty text-[17px] leading-[1.55] text-foreground-secondary sm:text-lg">
              Flutterly is a UK design-and-engineering practice led by{" "}
              <span className="text-foreground">Anoop Jose</span>. We ship web
              and mobile products that feel considered, fast, and alive — then
              keep shipping long after launch.
            </p>
          </motion.div>

          {/* CTA row */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-start gap-4 sm:mt-14 sm:flex-row sm:items-center sm:gap-6"
          >
            <Link
              href="#brief"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-background transition-colors hover:bg-accent-hover"
            >
              <span>Send a brief</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="#work"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground-secondary transition-colors hover:text-foreground"
            >
              <span className="border-b border-border pb-1 group-hover:border-foreground">
                Read the ledger
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom rule — signature + disclosure */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary sm:flex-row sm:items-end sm:justify-between sm:text-[11px]"
        >
          <p className="max-w-sm leading-relaxed normal-case tracking-normal font-sans text-[13px] text-foreground-secondary">
            <span className="italic text-foreground">№ 01 </span> — An
            introduction. Scroll for the ledger, the practice, and how to put
            something on our bench.
          </p>
          <p>
            Reading, UK · 51.4543° N, 0.9781° W
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MetaCell({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-foreground-tertiary">{label}</span>
      <span className="text-foreground-secondary">{value}</span>
    </div>
  );
}
