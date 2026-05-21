"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const details = [
  {
    k: "Write",
    v: (
      <Link
        href="mailto:anoop@flutterly.co.uk"
        className="transition-colors hover:text-[var(--accent)] font-semibold"
      >
        anoop@flutterly.co.uk
      </Link>
    ),
  },
  {
    k: "Ring",
    v: (
      <Link
        href="tel:+447780580534"
        className="transition-colors hover:text-[var(--accent)] font-semibold"
      >
        +44 7780 580 534
      </Link>
    ),
  },
  { k: "Visit", v: "Reading, UK" },
  { k: "Usual reply", v: "Within a working day" },
];

/**
 * Contact section, redesigned with high-end, fullscreen obsidian digital aesthetics.
 * Conforms to SOLID guidelines, features premium typographic scaling, and uses interactive links.
 */
export function Contact() {
  return (
    <section
      id="brief"
      className="relative overflow-hidden border-t border-white/5 bg-transparent pb-[120px] pt-[140px] text-white"
    >
      {/* Cobalt animated top line divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, var(--accent) 50%, transparent 90%)",
        }}
      />

      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[140px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">
          № 06 · The brief
        </div>

        <h2 className="mt-6 font-sans font-black leading-[0.92] tracking-[-0.04em] text-white text-[clamp(56px,9.5vw,130px)]">
          Got a brief
          <br />
          <span className="italic font-light text-[var(--accent)]">worth</span> building?
        </h2>

        <div className="mt-12 grid items-end gap-10 border-t border-white/5 pt-10 md:grid-cols-2 md:gap-16">
          <p className="max-w-[420px] text-[15px] leading-[1.65] text-zinc-400">
            We only take a handful of projects a year, so not every fit is the
            right fit. Write anyway — if we can&rsquo;t help, we&rsquo;ll usually
            know someone who can.
          </p>
          
          <Link
            href="mailto:anoop@flutterly.co.uk"
            className="group inline-flex items-center gap-3 self-start border-b border-white/10 pb-2 font-sans text-[clamp(20px,3vw,32px)] font-bold tracking-tight text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:self-end"
          >
            anoop@flutterly.co.uk
            <svg
              width="24"
              height="24"
              viewBox="0 0 22 22"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-zinc-500 group-hover:text-[var(--accent)]"
              aria-hidden="true"
            >
              <path
                d="M5 17 17 5M8 5h9v9"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>

        {/* Details Grid */}
        <div className="mt-24 grid gap-7 border-t border-white/5 pt-10 md:grid-cols-4">
          {details.map((d) => (
            <div
              key={d.k}
              className="group flex flex-col gap-1.5 transition-all duration-300 hover:translate-y-[-1px]"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
                {d.k}
              </span>
              <span className="font-sans text-[16px] text-zinc-300 font-medium tracking-tight group-hover:text-white transition-colors">
                {d.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
