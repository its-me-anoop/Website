"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";

const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "SwiftUI",
  "Flutter",
  "React Native",
  "Node.js",
  "Postgres",
  "GraphQL",
  "Supabase",
  "AWS",
  "Vercel",
  "Figma",
  "Storybook",
  "Stripe",
  "Sentry",
];

function TechBadge({ name }: { name: string }) {
  return (
    <div className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-line-2 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
      <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-70 transition-opacity group-hover:opacity-100" />
      <span className="font-display text-[14px] font-semibold tracking-tight text-ink-2 transition-colors group-hover:text-ink">
        {name}
      </span>
    </div>
  );
}

/** Toolbox marquee — two counter-scrolling rows of technology badges. */
export function Stack() {
  return (
    <section
      id="stack"
      aria-label="Technologies I work with"
      className="relative bg-canvas py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-[var(--gutter)]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            My toolbox
          </span>
          <h2 className="font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-tight text-ink">
            Modern tools, pragmatically picked.
          </h2>
        </motion.div>
      </div>

      <div className="space-y-3">
        <Marquee duration={52}>
          {tech.map((t) => (
            <TechBadge key={t} name={t} />
          ))}
        </Marquee>
        <Marquee duration={60} reverse>
          {tech.slice().reverse().map((t) => (
            <TechBadge key={`r-${t}`} name={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
