"use client";

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
];

/**
 * Toolbox strip — a quiet, Lumio-style logo band: small caps label and a
 * single slow marquee of the technologies the studio ships with.
 */
export function Stack() {
  return (
    <section
      id="stack"
      aria-label="Technologies the studio works with"
      className="relative border-y border-line bg-canvas-2 py-12 md:py-14"
    >
      <p className="mb-8 text-center font-mono text-[10.5px] font-medium uppercase tracking-[0.28em] text-muted">
        Shipping with the modern stack
      </p>
      <Marquee duration={56} className="select-none">
        {tech.map((t) => (
          <span
            key={t}
            className="flex items-center gap-8 whitespace-nowrap pr-8 font-display text-[19px] font-medium tracking-tight text-ink-3 transition-colors hover:text-ink"
          >
            {t}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
