"use client";

import { ArrowRight } from "lucide-react";
import { rebrandProcess } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Floor } from "../ui/Room";
import { Container, Eyebrow } from "../ui/primitives";

/**
 * From first call to launch, and long after: four paper cards in the
 * mint room, numbered in the serif, that land in order and stand on
 * the tomato floor.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="tone-jade relative isolate scroll-mt-20">
      <Container className="flex flex-col gap-12 pt-[clamp(80px,10vw,152px)]">
        <div>
          <Eyebrow>Process</Eyebrow>
          <h2 id="process-title" className="s-display mt-5 max-w-[1000px] text-[clamp(2.6rem,6.4vw,6rem)]">
            From first call to <em>launch,</em> and long after.
          </h2>
        </div>
        <ol className="relative z-10 m-0 -mb-[clamp(32px,5vw,74px)] grid list-none gap-3 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {rebrandProcess.map(([step, copy], i) => (
            <Reveal as="li" key={step} turn={i % 2 ? 1 : -1} delay={i * 0.1} className="h-full">
              <div className="tone-white relative flex h-full flex-col gap-3 rounded-[28px] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span aria-hidden className="s-mark s-num text-[72px] leading-[0.8]">
                    {i + 1}
                  </span>
                  {i < rebrandProcess.length - 1 ? <ArrowRight aria-hidden size={26} strokeWidth={2.2} className="max-lg:hidden" /> : null}
                </div>
                <h3 className="s-display mt-4 text-[30px]">{step}</h3>
                <p className="text-[16px] leading-[1.55] text-s-ink-soft">{copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
      <Floor colour="tomato" />
    </section>
  );
}
