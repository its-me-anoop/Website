"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal, StaggerItem, Stagger } from "@/components/fx";
import { processSteps } from "../data";
import { Band, Section, SectionHead } from "../primitives";

/**
 * The night interlude, and the page's second inversion.
 *
 * Four steps on a rail that draws itself in the three-colour rule as
 * the section scrolls past — horizontally on desktop, vertically on
 * phones. The rail is decoration; the steps are an ordered list either
 * way.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 62%"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const scale = reduce ? 1 : progress;

  return (
    <Band id="process" tone="night" rule="both">
      <Section>
        <SectionHead
          eyebrow="The process"
          title={[
            { text: "Four steps," },
            { text: "one accountable person.", tone: "muted" },
          ]}
        />

        <div ref={ref} className="relative mt-16">
          {/* Desktop rail */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[22px] hidden h-px bg-au-line md:block"
          >
            <m.div
              className="h-full origin-left bg-[image:var(--au-rule)]"
              style={{ scaleX: scale }}
            />
          </div>
          {/* Mobile rail */}
          <div
            aria-hidden
            className="absolute bottom-6 left-[22px] top-6 w-px bg-au-line md:hidden"
          >
            <m.div
              className="h-full w-full origin-top bg-[linear-gradient(180deg,#1b8fa1,#e89a2a_52%,#c73e6f)]"
              style={{ scaleY: scale }}
            />
          </div>

          <Stagger as="ol" className="relative grid gap-8 md:grid-cols-4 md:gap-5">
            {processSteps.map(([title, copy], i) => (
              <StaggerItem key={title} as="li" className="relative pl-14 md:pl-0">
                <span
                  aria-hidden
                  className="au-label absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-au-teal/40 bg-au-night text-[11px] text-au-teal shadow-[0_0_0_6px_var(--au-night)] md:relative md:mb-6"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="au-display text-[20px] md:mt-0">{title}</h3>
                <p className="mt-2.5 max-w-[280px] text-[14px] leading-relaxed text-au-ink-3">
                  {copy}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.2} className="mt-14">
          <p className="au-label mx-auto max-w-[560px] text-center tracking-[0.2em] text-au-muted">
            Typically four to eight weeks, start to launch
          </p>
        </Reveal>
      </Section>
    </Band>
  );
}
