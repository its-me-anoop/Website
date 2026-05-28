"use client";

import { m } from "framer-motion";
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
    <div className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white/[0.03] px-4 py-2 backdrop-blur transition-colors duration-300 hover:border-line-3 hover:bg-white/[0.06]">
      <span className="h-1.5 w-1.5 rounded-full bg-signal opacity-70 transition-opacity group-hover:opacity-100" />
      <span className="font-display text-[14px] font-semibold tracking-tight text-ink-2 transition-colors group-hover:text-ink">
        {name}
      </span>
    </div>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      aria-label="Technologies we work with"
      className="relative border-t border-line py-20"
    >
      <div className="mx-auto w-full max-w-[1280px] px-[var(--gutter)]">
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
            Our toolbox
          </span>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-semibold tracking-tight text-ink">
            Modern tools, pragmatically picked.
          </h2>
        </m.div>
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
