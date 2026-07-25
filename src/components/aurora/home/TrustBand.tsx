"use client";

import { Marquee, Reveal } from "@/components/fx";
import { trustedBy } from "../data";

const capabilities = [
  "Next.js",
  "React",
  "TypeScript",
  "SwiftUI",
  "Flutter",
  "WCAG 2.2 AA",
  "Core Web Vitals",
  "Design systems",
  "UK hosting",
  "Content design",
] as const;

/**
 * Two counter-running bands: the organisations Flutterly has built for
 * on top, the studio's toolkit beneath. The duplicated halves inside
 * `Marquee` are hidden from assistive tech, so each list is announced
 * exactly once.
 */
export function TrustBand() {
  return (
    <section
      aria-label="Organisations Flutterly has built for"
      className="relative border-y border-white/8 bg-white/[0.015] py-8"
    >
      <Reveal y={12} blur={4}>
        <p className="au-mono mb-6 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-au-muted">
          Trusted by
        </p>

        <Marquee duration={40}>
          {trustedBy.map((name) => (
            <span key={name} className="flex items-center">
              <span className="whitespace-nowrap px-7 text-[clamp(1rem,2vw,1.3rem)] font-medium tracking-tight text-au-ink-2 transition-colors duration-300 hover:text-au-ink">
                {name}
              </span>
              <span
                aria-hidden
                className="h-1 w-1 shrink-0 rounded-full bg-au-teal/60"
              />
            </span>
          ))}
        </Marquee>

        <Marquee duration={54} reverse className="mt-5 opacity-70">
          {capabilities.map((item) => (
            <span
              key={item}
              className="au-mono mx-2 whitespace-nowrap rounded-full border border-white/8 px-4 py-1.5 text-[11.5px] uppercase tracking-[0.16em] text-au-muted"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
