"use client";

import { ArrowRight } from "lucide-react";
import { rebrandProcess } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, Eyebrow } from "../ui/primitives";

/**
 * From first call to launch, and long after: four flaps on a sun-yellow
 * band that turn up in order, left to right, as the row scrolls in.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="tone-sun scroll-mt-20 border-y-2 border-s-rule py-[clamp(72px,9vw,128px)]">
      <Container className="flex flex-col gap-12">
        <div>
          <Eyebrow>Process</Eyebrow>
          <h2 id="process-title" className="s-display mt-5 max-w-[940px] text-[clamp(2.4rem,5.4vw,4.9rem)]">
            From first call to <em>launch,</em> and long after.
          </h2>
        </div>
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {rebrandProcess.map(([step, copy], i) => (
            <Reveal as="li" key={step} turn={84} delay={i * 0.13} className="h-full">
              <div className="tone-white relative flex h-full flex-col gap-3 rounded-[12px] border-2 border-s-rule p-6 shadow-[0_6px_0_0_var(--s-rule)]">
                <div className="flex items-center justify-between">
                  <span aria-hidden className="s-display s-num text-[52px] leading-none text-s-accent">
                    {i + 1}
                  </span>
                  {i < rebrandProcess.length - 1 ? <ArrowRight aria-hidden size={26} strokeWidth={2.4} className="max-lg:hidden" /> : null}
                </div>
                <h3 className="s-display mt-3 text-[27px]">{step}</h3>
                <p className="text-[16px] leading-[1.55] text-s-ink-soft">{copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
