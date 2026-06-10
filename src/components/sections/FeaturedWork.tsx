"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { m as motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    n: "001",
    href: "/projects/sipli",
    title: "Sipli",
    tags: "iOS · watchOS · AI",
    year: "2026",
    image: "/images/sipli/iphone/01-hero-1320x2868.jpg",
    tint: "#0e8aa3",
  },
  {
    n: "002",
    href: "/projects/artling",
    title: "Artling",
    tags: "iOS · Family",
    year: "2025",
    image: "/projects/artling/fox-painter.png",
    tint: "#e07a1f",
  },
  {
    n: "003",
    href: "#brief",
    title: "Greenmead",
    tags: "Brand · Web",
    year: "2024",
    image: "/project-greenmead.png",
    tint: "#3fd4c0",
  },
  {
    n: "004",
    href: "#brief",
    title: "JJ Paper",
    tags: "Commerce",
    year: "2024",
    image: "/project-jjpaper.png",
    tint: "#7b78ff",
  },
  {
    n: "005",
    href: "#brief",
    title: "Sandbourne",
    tags: "Hospitality",
    year: "2024",
    image: "/project-sandbourne.png",
    tint: "#ff5c8a",
  },
];

/**
 * Selected work as an index: numbered rows with oversized titles. Hovering a
 * row reveals a floating preview image that trails the row, while the row
 * itself shifts and tints — the classic awwwards portfolio list.
 */
export function FeaturedWork() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
      className="relative bg-canvas px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Head */}
        <div className="mb-14 flex items-end justify-between gap-6 md:mb-18">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
              Selected work ({projects.length})
            </p>
            <h2
              id="work-heading"
              className="mt-5 font-display text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.06] tracking-[-0.02em] text-ink"
            >
              Products we&rsquo;re proud to sign.
            </h2>
          </div>
          <p className="hidden max-w-[300px] pb-2 text-[14px] leading-[1.7] text-ink-3 md:block">
            Client products and original apps, 2024 — today. Every line of code
            passes through one keyboard.
          </p>
        </div>

        {/* Index */}
        <ul className="relative border-t border-line" onMouseLeave={() => setActive(null)}>
          {projects.map((p, i) => {
            return (
              <motion.li
                key={p.n}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-line"
              >
                <Link
                  href={p.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[70px_1fr_auto_90px_auto] md:gap-8 md:py-8"
                  aria-label={`${p.title} — ${p.tags}`}
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-accent">
                    {p.n}
                  </span>
                  <span
                    className="font-display text-[clamp(26px,4.2vw,54px)] font-semibold leading-none tracking-[-0.02em] text-ink transition-all duration-400 group-hover:translate-x-3 group-hover:text-accent md:group-hover:translate-x-6"
                  >
                    {p.title}
                  </span>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 md:block">
                    {p.tags}
                  </span>
                  <span className="hidden font-mono text-[11px] tracking-[0.16em] text-muted md:block">
                    {p.year}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-ink-3 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </motion.li>
            );
          })}

          {/* Floating preview that tracks the hovered row (desktop only) */}
          {!reduce && (
            <div className="pointer-events-none absolute inset-y-0 right-[14%] z-10 hidden w-[190px] lg:block" aria-hidden="true">
              <AnimatePresence>
                {active !== null && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 3,
                      top: `${((active + 0.5) / projects.length) * 100}%`,
                    }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute h-[240px] w-[190px] -translate-y-1/2 overflow-hidden rounded-[var(--r-md)] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]"
                    style={{ background: projects[active].tint }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={projects[active].image}
                          alt=""
                          fill
                          sizes="190px"
                          className="object-cover object-top opacity-95"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </ul>

        <p className="mt-8 text-[13px] text-muted">
          + a few under NDA — happy to walk you through them on a brief.
        </p>
      </div>
    </section>
  );
}
