"use client";

import {
  Box,
  Brush,
  Gem,
  Heart,
  Lightbulb,
  Origami,
  Palette,
} from "lucide-react";
import { tickerItems } from "./data";
import { Rise } from "./primitives";

const chips = [Gem, Box, Heart, Brush, Origami, Lightbulb, Palette] as const;

export function Ticker() {
  return (
    <section aria-label="Studio capabilities" className="mx-auto w-full max-w-[1240px] px-5 pb-24 pt-4 sm:px-8">
      <Rise>
        <div className="relative overflow-hidden rounded-[36px] bg-at-lime px-4 pb-12 pt-14 sm:pb-16 sm:pt-20">
          <div className="edge-mask overflow-hidden">
            <div className="animate-marquee flex w-max items-center [--marquee-duration:44s]">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-8 pr-8">
                  {tickerItems.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-8 whitespace-nowrap text-[clamp(2rem,4.6vw,3.2rem)] font-medium tracking-[-0.03em] text-at-ink"
                    >
                      {item}
                      <span className="text-at-ink/40" aria-hidden>
                        ✦
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 pl-6 text-[11px] font-medium uppercase tracking-[0.24em] text-at-ink-soft">
            2026 · Reading, UK
          </p>

          <div className="mt-10 flex flex-wrap gap-3 pl-4" aria-hidden>
            {chips.map((Icon, i) => (
              <span
                key={i}
                className="liquid flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
                style={{ transform: `translateY(${(i % 3) * 6 - 6}px)` }}
              >
                <Icon size={24} strokeWidth={1.4} />
              </span>
            ))}
          </div>
        </div>
      </Rise>
    </section>
  );
}
