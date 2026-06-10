"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";

const services = [
  {
    n: "01",
    title: "Web Applications",
    desc: "Production-grade web apps with Next.js, React and TypeScript. Server components, edge-rendered, and tuned for 100/100 Lighthouse.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    n: "02",
    title: "Mobile Apps",
    desc: "Native iOS with SwiftUI, cross-platform Flutter and React Native. App Store-ready apps with the polish people expect from their daily tools.",
    tech: ["SwiftUI", "Flutter", "React Native"],
  },
  {
    n: "03",
    title: "Backend & APIs",
    desc: "Type-safe APIs, real-time sync, auth and infra. Postgres, GraphQL, Supabase and AWS — wired up so the product just works.",
    tech: ["Node", "Postgres", "GraphQL", "AWS"],
  },
  {
    n: "04",
    title: "Design Systems",
    desc: "UI/UX, design tokens, and a component library your engineers will actually use. Figma + code, kept in sync.",
    tech: ["Figma", "Tokens", "Storybook"],
  },
];

/**
 * What I do — numbered accordion rows on the raised band. One row open at a
 * time; the open row exposes the description and a tech tag rail.
 */
export function Services() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      id="services"
      className="relative bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
          <h2
            id="services-heading"
            className="font-display font-semibold uppercase leading-[0.92] tracking-[-0.025em]"
          >
            <RevealText className="text-[clamp(40px,7vw,96px)] text-ink">What</RevealText>
            <RevealText delay={0.08} className="text-[clamp(40px,7vw,96px)]">
              <span className="text-stroke">I do</span>
            </RevealText>
          </h2>
          <p className="hidden max-w-[300px] pb-2 text-[14px] leading-[1.7] text-ink-3 md:block">
            End-to-end product engineering and design. Four disciplines, one
            accountable engineer.
          </p>
        </div>

        <ul className="border-t border-line-2">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.n} className="border-b border-line-2">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${i}`}
                  className="group flex w-full items-center gap-5 py-6 text-left md:gap-10 md:py-8"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-accent">
                    {s.n}
                  </span>
                  <span
                    className={`flex-1 font-display text-[clamp(24px,4vw,52px)] font-semibold uppercase leading-none tracking-[-0.02em] transition-colors duration-300 ${
                      isOpen ? "text-accent" : "text-ink group-hover:text-ink-2"
                    }`}
                  >
                    {s.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-line-2 text-ink-3 group-hover:border-line-3"
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 pl-[calc(11px+1.25rem)] md:grid-cols-[1fr_auto] md:pl-[calc(11px+2.5rem)]">
                        <p className="max-w-[560px] text-[15px] leading-[1.7] text-ink-3">
                          {s.desc}
                        </p>
                        <ul className="flex flex-wrap items-start gap-2 md:justify-end">
                          {s.tech.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-line-2 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
