"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

// Logo glyph (simple monogram for each tech)
function TechBadge({ name }: { name: string }) {
  return (
    <div
      className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 backdrop-blur transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.06]"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-brand to-fuchsia opacity-70 transition-opacity group-hover:opacity-100" />
      <span className="font-display text-[14px] font-semibold tracking-tight text-ink-2 transition-colors group-hover:text-white">
        {name}
      </span>
    </div>
  );
}

export function Stack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="stack"
      aria-label="Technologies we work with"
      className="relative border-t border-white/[0.04] py-20"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-7">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold tracking-tight text-ink-3 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Our toolbox
          </span>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-white">
            Modern tools, pragmatically picked.
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="flex w-max gap-3 py-3 animate-marquee will-change-transform">
          {[...tech, ...tech].map((t, i) => (
            <TechBadge key={`${t}-${i}`} name={t} />
          ))}
        </div>
      </div>

      <div
        className="relative mt-3 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div
          className="flex w-max gap-3 py-3 will-change-transform"
          style={{
            animation: "marquee 50s linear infinite reverse",
          }}
        >
          {[...tech.slice().reverse(), ...tech.slice().reverse()].map((t, i) => (
            <TechBadge key={`${t}-r-${i}`} name={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
