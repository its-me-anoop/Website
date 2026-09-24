"use client";

import { processSteps } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

/** Four steps in four columns, each opened by a large numeral. */
export function Process() {
  return (
    <section id="process" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <SectionIntro
          label="Process"
          title={
            <>
              From first call to <em>launch</em>.
            </>
          }
          copy="Working pages early, small reviewable slices, and accessibility checked all the way through, not bolted on at the end."
        />
        <ol className="mt-16 grid gap-10 border-t border-s-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map(([title, copy], i) => (
            <Reveal as="li" key={title} delay={i * 0.06}>
              <span aria-hidden className="s-display block text-[88px] leading-[0.8] text-s-signal">
                {i + 1}
              </span>
              <h3 className="s-display mt-8 text-[32px]">{title}</h3>
              <p className="mt-3 max-w-[34ch] text-[17px] leading-[1.6] text-s-on-ink-2">{copy}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
