"use client";

import { m } from "framer-motion";
import { processSteps } from "@/lib/marketing/content";
import { EASE, Reveal } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";
import { Container, SectionIntro } from "../ui/primitives";

/**
 * Four steps across a horizontal rail on paper. The rail fills with
 * ember once the section scrolls into view; the steps rise after it.
 */
export function Process() {
  const motion = useMotionAllowed();
  return (
    <section id="process" className="a-paper-2 relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionIntro
          eyebrow="Process"
          title={
            <>
              From first call to <em>launch</em>.
            </>
          }
          copy="Working pages early, small reviewable slices, and accessibility checked all the way through, not bolted on at the end."
        />
        <div className="mt-14">
          <div aria-hidden className="relative h-[2px] overflow-hidden bg-a-line-2">
            <m.span
              className="a-rail-fill absolute inset-0 bg-a-gold"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: motion ? 1.8 : 0, ease: EASE }}
            />
          </div>
          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(([title, copy], i) => (
              <Reveal as="li" key={title} delay={0.15 + i * 0.18} className="pt-8 lg:pr-6">
                <p className="a-mono text-[12px] tracking-[0.14em] text-a-gold">STEP 0{i + 1}</p>
                <h3 className="a-display mt-4 text-[clamp(1.9rem,2.6vw,2.2rem)]">{title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.65] text-a-ink-soft">{copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
