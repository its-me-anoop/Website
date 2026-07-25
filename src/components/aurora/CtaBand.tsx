"use client";

import { site } from "@/lib/site";
import { BeamCard, Reveal, TextReveal } from "@/components/fx";
import { Btn } from "./primitives";

/**
 * The closing call to action every page ends on: one beam-lit card,
 * two routes in (audit or email) and the reply promise. Copy is set
 * per page; the actions never change.
 */
export function CtaBand({
  title,
  copy,
  id,
}: {
  title: string;
  copy: string;
  id?: string;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-[1240px] scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <BeamCard innerClassName="px-6 py-16 sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(47,216,173,0.16),transparent_62%)]"
        />
        <div className="relative mx-auto max-w-[760px] text-center">
          <TextReveal
            as="h2"
            segments={[{ text: title }]}
            className="text-[clamp(2rem,5vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.035em] text-au-ink"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-[600px] text-[16.5px] leading-relaxed text-au-ink-2">
              {copy}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Btn href="/free-audit" tone="primary" arrow>
                Get your free website audit
              </Btn>
              <Btn href={`mailto:${site.email}`} tone="glass">
                Email {site.founder.split(" ")[0]}
              </Btn>
            </div>
            <p className="au-mono mt-8 text-[12.5px] uppercase tracking-[0.2em] text-au-muted">
              Every enquiry answered within one working day
            </p>
          </Reveal>
        </div>
      </BeamCard>
    </section>
  );
}
