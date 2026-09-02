"use client";

import { personas } from "../data";
import { Display, Eyebrow, Rise } from "../primitives";

/**
 * Who the studio builds for. A hairline list: the audience in small
 * sans on the left, the promise in serif on the right. No cards.
 */
export function Personas() {
  return (
    <section className="border-t border-k-line bg-k-bone-2/60">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
          <Rise>
            <Eyebrow className="text-k-muted">Who it is for</Eyebrow>
            <Display as="h2" size="md" className="mt-5 text-k-ink">
              Built for the people who run the front line of care.
            </Display>
          </Rise>

          <dl className="divide-y divide-k-line border-y border-k-line">
            {personas.map((p, i) => (
              <Rise key={p.who} delay={i * 0.05} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,160px)_1fr] sm:gap-6 sm:py-7 md:grid-cols-[180px_1fr] md:gap-8 lg:py-8">
                <dt className="pt-0.5 text-[12.5px] font-medium uppercase tracking-[0.12em] text-k-muted sm:pt-1.5 sm:text-[13px]">
                  {p.who}
                </dt>
                <dd className="k-display max-w-[38ch] text-[clamp(1.25rem,3.6vw,1.85rem)] leading-[1.2] text-k-ink sm:max-w-[34ch] sm:leading-[1.15]">
                  {p.statement}
                </dd>
              </Rise>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
