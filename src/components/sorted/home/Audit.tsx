"use client";

import { useState } from "react";
import { auditChecks } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { AuditBar, Container, Eyebrow } from "../ui/primitives";
import { XRay } from "../ui/XRay";

/**
 * The free audit, as the home page's second set piece: a web page
 * pulled apart into the seven areas the report scores, beside the bar
 * that runs it. Pointing at an area lifts its sheet out of the stack.
 */
export function Audit() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="audit" aria-labelledby="audit-title" className="tone-sky scroll-mt-20 overflow-hidden border-b-2 border-s-rule py-[clamp(72px,9vw,136px)]">
      <Container className="grid items-center gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <Reveal turn={0}>
            <Eyebrow>Free website audit</Eyebrow>
            <h2 id="audit-title" className="s-display mt-5 max-w-[760px] text-[clamp(2.4rem,5.4vw,4.9rem)]">
              See what needs <em>sorting</em> first.
            </h2>
            <p className="mt-6 max-w-[560px] text-[17.5px] leading-[1.55] text-s-ink-soft">
              Rather start with a report? Paste your website address for a free check of its accessibility, speed and
              search.
            </p>
            <AuditBar className="mt-8" placeholder="yourbusiness.co.uk" />
          </Reveal>
          <ol className="mt-10 grid max-w-[600px] grid-cols-2 gap-x-6 border-t-2 border-s-rule sm:grid-cols-2" onPointerLeave={() => setActive(null)}>
            {auditChecks.map((check, i) => (
              <li
                key={check.title}
                onPointerEnter={() => setActive(i)}
                className="flex items-baseline gap-3 border-b-[1.5px] border-s-line-2 py-3 text-[16px] font-semibold transition-colors data-[on]:text-s-accent"
                data-on={active === i ? "" : undefined}
              >
                <span aria-hidden className="s-label s-num text-[12.5px] text-s-muted">
                  0{i + 1}
                </span>
                {check.title}
              </li>
            ))}
          </ol>
        </div>
        <XRay active={active} className="mx-auto w-full max-w-[560px] max-lg:order-first max-lg:max-w-[400px]" />
      </Container>
    </section>
  );
}
