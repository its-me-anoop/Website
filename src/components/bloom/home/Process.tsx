"use client";

import { processSteps } from "../data";
import { Rise } from "../primitives";

export function Process() {
  return (
    <section id="process" className="border-y border-bl-line bg-bl-pine text-bl-pine-ink">
      <div className="mx-auto w-full max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-bl-teal-soft/80">
            The process
          </p>
          <h2 className="text-[clamp(1.9rem,4.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
            Four steps, one accountable person
          </h2>
        </div>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map(([title, copy], i) => (
            <li key={title}>
              <Rise delay={i * 0.08} className="h-full rounded-[24px] bg-bl-pine-2 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[13px] font-semibold tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-[17px] font-medium tracking-tight text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-bl-pine-ink/75">
                  {copy}
                </p>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
