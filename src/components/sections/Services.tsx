"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Smartphone, Server, Boxes, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    tag: "Web",
    desc: "Production-grade web apps with Next.js, React and TypeScript. Server components, edge-rendered, and tuned for 100/100 Lighthouse.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    glow: "rgba(212,242,76,0.12)",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    tag: "iOS · Android",
    desc: "Native iOS with SwiftUI, cross-platform Flutter and React Native. App Store-ready apps with the polish people expect from their daily tools.",
    tech: ["SwiftUI", "Flutter", "React Native"],
    glow: "rgba(124,155,255,0.14)",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    tag: "Cloud",
    desc: "Type-safe APIs, real-time sync, auth and infra. Postgres, GraphQL, Supabase and AWS — wired up so the product just works.",
    tech: ["Node", "Postgres", "GraphQL", "AWS"],
    glow: "rgba(181,140,255,0.14)",
  },
  {
    icon: Boxes,
    title: "Design Systems",
    tag: "Design",
    desc: "UI/UX, design tokens, and a component library your engineers will actually use. Figma + code, kept in sync.",
    tech: ["Figma", "Tokens", "Storybook"],
    glow: "rgba(88,224,199,0.14)",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-line px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader
          eyebrow="What we build"
          headingId="services-heading"
          title={
            <>
              End-to-end product
              <br />
              <em>engineering &amp; design.</em>
            </>
          }
          lede="From the first whiteboard sketch to the App Store submission. Four tightly-knit disciplines, one team, one accountable engineer."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid gap-4 md:grid-cols-2 md:gap-5"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={staggerItem}>
                <SpotlightCard glow={s.glow} className="h-full min-h-[280px]">
                  <div className="flex items-start justify-between">
                    <motion.span
                      whileHover={{ rotate: 6, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-2 bg-white/[0.04] text-signal"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                    <span className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {s.tag}
                    </span>
                  </div>

                  <div className="mt-6 flex-1">
                    <h3 className="font-display text-[23px] font-semibold tracking-tight text-ink md:text-[25px]">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-[1.65] text-ink-3 transition-colors duration-300 group-hover:text-ink-2">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {s.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] font-medium text-ink-3"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="#brief"
                      className="group/cta inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-2 bg-white/[0.03] text-ink-3 transition-all duration-300 hover:border-signal hover:bg-signal hover:text-signal-ink"
                      aria-label={`Discuss ${s.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:rotate-12" />
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
