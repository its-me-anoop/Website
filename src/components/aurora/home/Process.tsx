"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal, StaggerItem, Stagger } from "@/components/fx";
import { processSteps } from "../data";
import { Section, SectionHead } from "../primitives";

/**
 * Four steps on a line that draws itself as the section scrolls past —
 * horizontally on desktop, vertically on phones. The line is decoration;
 * the steps are an ordered list either way.
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
    <Section id="process">
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
          className="absolute left-0 right-0 top-[22px] hidden h-px bg-white/8 md:block"
        >
          <m.div
            className="h-full origin-left bg-[linear-gradient(90deg,#2fd8ad,#5ce6d5_35%,#5cb2ff_70%,#a48cff)]"
            style={{ scaleX: scale }}
          />
        </div>
        {/* Mobile rail */}
        <div
          aria-hidden
          className="absolute bottom-6 left-[22px] top-6 w-px bg-white/8 md:hidden"
        >
          <m.div
            className="h-full w-full origin-top bg-[linear-gradient(180deg,#2fd8ad,#5cb2ff)]"
            style={{ scaleY: scale }}
          />
        </div>

        <Stagger as="ol" className="relative grid gap-8 md:grid-cols-4 md:gap-5">
          {processSteps.map(([title, copy], i) => (
            <StaggerItem key={title} as="li" className="relative pl-14 md:pl-0">
              <span
                aria-hidden
                className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-au-teal/25 bg-[#08131a] text-[13px] font-semibold text-au-teal shadow-[0_0_0_6px_rgba(6,13,17,0.9)] md:relative md:mb-6"
              >
                <span className="au-mono">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3 className="text-[18px] font-medium tracking-tight text-au-ink md:mt-0">
                {title}
              </h3>
              <p className="mt-2.5 max-w-[280px] text-[14px] leading-relaxed text-au-ink-3">
                {copy}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Reveal delay={0.2} className="mt-14">
        <p className="au-mono mx-auto max-w-[560px] text-center text-[12px] uppercase tracking-[0.2em] text-au-muted">
          Typically four to eight weeks, start to launch
        </p>
      </Reveal>
    </Section>
  );
}
