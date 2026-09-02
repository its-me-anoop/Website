"use client";

import { processSteps } from "../data";
import { Display, Eyebrow, Rise } from "../primitives";

/**
 * How a build runs. Four steps as columns on coal, each with an
 * oversized serif numeral; the h3s are the step names.
 */
export function Process() {
  return (
    <section id="process" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 pt-20 sm:px-8 sm:pt-28 lg:pt-32">
        <Rise className="max-w-[640px]">
          <Eyebrow className="text-k-coal-soft">How a build runs</Eyebrow>
          <Display as="h2" size="lg" className="mt-5 text-k-coal-ink">
            Four steps. One accountable person throughout.
          </Display>
        </Rise>
        <ol className="mt-12 grid gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
          {processSteps.map(([title, copy], i) => (
            <Rise as="li" key={title} delay={i * 0.08} className="border-t border-k-coal-line pt-5 sm:pt-6">
              <span className="k-display block text-[48px] leading-none text-k-fire-lite sm:text-[56px]">
                {i + 1}
              </span>
              <h3 className="k-display mt-5 text-[24px] text-k-coal-ink sm:mt-6 sm:text-[28px]">{title}</h3>
              <p className="mt-3 max-w-[34ch] text-[14.5px] leading-[1.6] text-k-coal-soft sm:max-w-[30ch] sm:text-[15px]">
                {copy}
              </p>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}
