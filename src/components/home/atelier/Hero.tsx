"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { site } from "@/lib/site";
import { projects } from "./data";
import { EASE, Eyebrow, HandleChip, Pill, RevealWords } from "./primitives";

/** rotate / offset recipe for the fanned deck, left to right. */
const fan = [
  { rotate: -12, y: 34 },
  { rotate: -5, y: 10 },
  { rotate: 1, y: 0 },
  { rotate: 8, y: 14 },
  { rotate: 15, y: 40 },
] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10 max-w-[560px]">
          <Eyebrow className="mb-6">
            Independent product studio · Reading, UK
          </Eyebrow>

          <RevealWords
            as="h1"
            className="text-[clamp(2.6rem,7.2vw,4.6rem)] font-medium leading-[1.04] tracking-[-0.035em]"
            segments={[
              { text: "Design, build," },
              { text: "& ship products", tone: "terracotta" },
              { text: "people love to use." },
            ]}
          />

          <m.p
            className="mt-8 max-w-[400px] text-[15.5px] leading-relaxed text-at-ink-soft"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          >
            Flutterly is the studio of {site.founder} — senior product thinking,
            interface design and engineering under one roof, with no agency
            hand-offs in between.
          </m.p>

          <m.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          >
            <Pill href={`mailto:${site.email}`} tone="dark" className="px-6 py-3">
              Start a project
            </Pill>
            <a
              href="#featured"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-at-ink-soft transition-colors hover:text-at-ink"
            >
              See the work <ArrowDownRight size={16} aria-hidden />
            </a>
          </m.div>
        </div>

        {/* Fanned deck of project cards */}
        <div
          className="relative mx-auto flex h-[300px] w-full max-w-[560px] items-end justify-center sm:h-[360px] lg:h-auto"
          role="img"
          aria-label="A fanned stack of Flutterly project artwork: Sipli, Artling, Greenmead, JJ Paper and Sandbourne"
        >
          <HandleChip
            handle="@sipli"
            tone="terracotta"
            className="animate-at-drift absolute left-[4%] top-[6%] z-20"
          />
          <HandleChip
            handle="@artling"
            tone="dark"
            className="animate-at-drift absolute right-[6%] top-[16%] z-20 rotate-[5deg] [animation-delay:1.4s]"
          />

          <div className="flex items-end">
            {projects.map((project, i) => (
              <m.div
                key={project.name}
                className="relative -ml-14 h-[210px] w-[150px] shrink-0 overflow-hidden rounded-3xl shadow-[0_30px_60px_-24px_rgba(34,33,31,0.4)] first:ml-0 sm:-ml-16 sm:h-[260px] sm:w-[185px]"
                style={{ backgroundColor: project.tint, zIndex: 10 - Math.abs(i - 2) }}
                initial={
                  reduce
                    ? false
                    : { rotate: 0, y: 80, x: (2 - i) * 60, opacity: 0 }
                }
                animate={{ rotate: fan[i].rotate, y: fan[i].y, x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.09 }}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="185px"
                  className="object-cover"
                  priority={i < 3}
                />
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
