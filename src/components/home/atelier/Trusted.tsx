"use client";

import { trustedBy } from "./data";
import { RevealWords, Rise } from "./primitives";

export function Trusted() {
  return (
    <section aria-label="Clients and products" className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
      <RevealWords
        as="h2"
        className="text-[clamp(1.8rem,4vw,2.6rem)] font-medium tracking-[-0.03em]"
        segments={[{ text: "Trusted by the" }, { text: "best.", tone: "muted" }]}
      />
      <Rise delay={0.15}>
        <p className="mt-3 max-w-[430px] text-[14.5px] leading-relaxed text-at-ink-soft">
          Owned products and client work across health, family, care, housing
          and sustainable commerce.
        </p>
      </Rise>

      <Rise delay={0.25} className="edge-mask mt-12 overflow-hidden">
        <div className="animate-marquee flex w-max items-center [--marquee-duration:38s]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center gap-14 pr-14"
            >
              {trustedBy.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-14 whitespace-nowrap text-[19px] font-medium tracking-tight text-at-ink-soft"
                >
                  {name}
                  <span className="h-1.5 w-1.5 rounded-full bg-at-line-2" aria-hidden />
                </span>
              ))}
            </div>
          ))}
        </div>
      </Rise>
    </section>
  );
}
