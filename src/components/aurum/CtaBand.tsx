"use client";

import { site } from "@/lib/site";
import { Reveal, TextReveal } from "@/components/fx";
import { Btn } from "./primitives";

/**
 * The closing call to action every page ends on: a warm band cut top
 * and bottom by the three-colour rule — the heavy cut at the foot,
 * where the page hands over to the night footer. Two routes in (audit
 * or email) and the reply promise. Copy is set per page; the actions
 * never change.
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
    <section
      id={id}
      className="au-rule-top au-rule-bottom au-rule-heavy relative scroll-mt-28 overflow-hidden bg-au-sink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(27,143,161,0.1),transparent_62%),radial-gradient(55%_55%_at_50%_100%,rgba(232,154,42,0.12),transparent_62%)]"
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[780px] text-center">
          <TextReveal
            as="h2"
            segments={[{ text: title }]}
            className="au-display text-[clamp(2.1rem,5vw,3.7rem)]"
          />
          <Reveal delay={0.12}>
            <span aria-hidden className="au-tick mx-auto mt-7" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-7 max-w-[620px] text-[17px] leading-[1.6] text-au-ink-2">
              {copy}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Btn href="/free-audit" tone="primary" arrow>
                Get your free website audit
              </Btn>
              <Btn href={`mailto:${site.email}`} tone="plate">
                Email {site.founder.split(" ")[0]}
              </Btn>
            </div>
            <p className="au-label mt-9 tracking-[0.2em] text-au-muted">
              Every enquiry answered within one working day
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
