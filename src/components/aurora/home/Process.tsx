"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";
import { Container, Display, Eyebrow } from "../ui/primitives";

/**
 * Four steps on a vertical rail that fills with light as the page
 * scrolls; the heading stays pinned beside it on wide screens.
 */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const motion = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-36">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Process</Eyebrow>
            <Display size="xl" className="mt-6 max-w-[11ch]">
              From first call to <em>launch</em>.
            </Display>
            <p className="mt-6 max-w-[440px] text-[17px] leading-[1.65] text-a-ink-soft">
              Working pages early, small reviewable slices, and accessibility checked all the way through, not bolted
              on at the end.
            </p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative space-y-6 pl-10 sm:pl-14">
          <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-a-line-2 sm:left-[15px]" />
          <m.span
            aria-hidden
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top sm:left-[15px]"
            style={{ scaleY: motion ? scaleY : 1, background: "linear-gradient(180deg,#9b8cff,#45e3d4,#d4ff4f)" }}
          />
          {processSteps.map(([title, copy], i) => (
            <Reveal as="li" key={title} delay={i * 0.05} className="relative">
              <span
                aria-hidden
                className="absolute -left-10 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-a-line-2 bg-a-void sm:-left-14 sm:h-8 sm:w-8"
              >
                <span className="h-2 w-2 rounded-full bg-a-lime shadow-[0_0_12px_3px_rgba(212,255,79,0.55)]" />
              </span>
              <article className="a-glass a-spot rounded-[26px] p-7 sm:p-9">
                <p className="a-mono text-[12px] tracking-[0.14em] text-a-muted">STEP 0{i + 1}</p>
                <h3 className="a-display mt-4 text-[clamp(2rem,3.4vw,2.8rem)]">{title}</h3>
                <p className="mt-3 max-w-[48ch] text-[16px] leading-[1.65] text-a-ink-soft">{copy}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
