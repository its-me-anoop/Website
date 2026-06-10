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
 * Full-bleed divider strip: an oversized availability marquee in vermilion
 * over a counter-scrolling toolbox ticker — the Noir section transition.
 */
export function Stack() {
  return (
    <section id="stack" aria-label="Technologies I work with" className="relative border-y border-line bg-canvas py-10 md:py-14">
      <Marquee duration={30} className="select-none">
        {["Available for freelance", "Web", "Mobile", "Design"].map((t, i) => (
          <span key={i} className="flex items-center gap-6 pr-6">
            <span
              className={`font-display text-[clamp(36px,6vw,84px)] font-semibold uppercase leading-none tracking-[-0.02em] ${
                i === 0 ? "text-accent" : "text-stroke"
              }`}
            >
              {t}
            </span>
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
        ))}
      </Marquee>

      <div className="mt-8">
        <Marquee duration={56} reverse>
          {tech.map((t) => (
            <span
              key={t}
              className="flex items-center gap-3 whitespace-nowrap pr-3 font-mono text-[12px] uppercase tracking-[0.22em] text-ink-3"
            >
              {t}
              <span aria-hidden="true" className="text-muted">/</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
