"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, Server, Boxes, ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    tag: "Web",
    desc: "Production-grade web apps with Next.js, React and TypeScript. Server components, edge-rendered, and tuned for 100/100 Lighthouse.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    glow: "rgba(99, 102, 241, 0.20)",
    accent: "from-brand to-violet",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    tag: "iOS · Android",
    desc: "Native iOS with SwiftUI, cross-platform Flutter and React Native. App Store-ready apps with the polish people expect from their daily tools.",
    tech: ["SwiftUI", "Flutter", "React Native"],
    glow: "rgba(34, 211, 238, 0.22)",
    accent: "from-cyan to-brand",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    tag: "Cloud",
    desc: "Type-safe APIs, real-time sync, auth and infra. Postgres, GraphQL, Supabase and AWS — wired up so the product just works.",
    tech: ["Node", "Postgres", "GraphQL", "AWS"],
    glow: "rgba(168, 85, 247, 0.20)",
    accent: "from-violet to-fuchsia",
  },
  {
    icon: Boxes,
    title: "Design Systems",
    tag: "Design",
    desc: "UI/UX, design tokens, and a component library your engineers will actually use. Figma + code, kept in sync.",
    tech: ["Figma", "Tokens", "Storybook"],
    glow: "rgba(236, 72, 153, 0.20)",
    accent: "from-fuchsia to-amber",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 18, mass: 0.8 },
  },
};

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative border-t border-white/[0.04] py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 grid items-end gap-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold tracking-tight text-ink-3 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              What we build
            </motion.span>
            <motion.h2
              id="services-heading"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
            >
              End-to-end product
              <br />
              <span className="text-gradient">engineering & design.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[440px] text-[15.5px] leading-[1.65] text-ink-3"
          >
            From the first whiteboard sketch to the App Store submission. Four
            tightly-knit disciplines, one team, one accountable engineer.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid gap-4 md:grid-cols-2 md:gap-5"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={itemVariants}>
                <BentoCard
                  glowColor={s.glow}
                  className="group h-full min-h-[280px]"
                >
                  <div className="flex items-start justify-between">
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} shadow-lg shadow-black/40`}
                    >
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </motion.div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {s.tag}
                    </span>
                  </div>

                  <div className="mt-6 flex-1">
                    <h3 className="font-display text-[22px] font-bold tracking-tight text-white md:text-[24px]">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-[1.6] text-ink-3 transition-colors duration-300 group-hover:text-ink-2">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {s.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] font-medium text-ink-3"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="#brief"
                      className="group/cta inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-ink-3 transition-all duration-300 hover:border-white/[0.18] hover:bg-white hover:text-black"
                      aria-label={`Discuss ${s.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:rotate-12" />
                    </Link>
                  </div>
                </BentoCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
