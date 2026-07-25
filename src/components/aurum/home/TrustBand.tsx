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
      className="relative border-b border-au-line bg-au-paper-2/70 py-9"
    >
      <Reveal y={12}>
        <p className="au-label mb-6 text-center text-au-muted">Trusted by</p>

        <Marquee duration={40}>
          {trustedBy.map((name) => (
            <span key={name} className="flex items-center">
              <span className="au-display whitespace-nowrap px-7 text-[clamp(1.1rem,2.1vw,1.45rem)] text-au-ink-2 transition-colors duration-300 hover:text-au-ink">
                {name}
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-au-amber"
              />
            </span>
          ))}
        </Marquee>

        <Marquee duration={54} reverse className="mt-6">
          {capabilities.map((item) => (
            <span
              key={item}
              className="au-label mx-1.5 whitespace-nowrap rounded-full border border-au-line bg-au-paper-2 px-4 py-1.5 tracking-[0.16em] text-au-ink-3"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
