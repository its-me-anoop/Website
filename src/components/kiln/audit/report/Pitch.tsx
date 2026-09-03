"use client";

import { site } from "@/lib/site";
import { categoryMeta } from "@/lib/audit/score";
import type { AuditReport } from "@/lib/audit/types";
import { PackageCard } from "../../home/PackagesTeaser";
import { BtnLink, Display, Eyebrow, Rise } from "../../primitives";
import { pitchModel, promise } from "./pitch-model";
import { scoreTone } from "./StatusMark";

export { summaryForEmail } from "./pitch-model";

/**
 * The sell, kept honest. The three weakest areas are set against what a
 * Flutterly build does about them, a package is suggested from the
 * score, and the free written audit is offered as the next step. A site
 * that scores well is told to keep what it has.
 */
export function Pitch({ report }: { report: AuditReport }) {
  const { who, weakest, keep, recommended, mailto } = pitchModel(report);

  return (
    <section id="next-steps" aria-labelledby="next-steps-heading" className="on-coal border-t border-k-coal-line bg-k-coal text-k-coal-ink">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Rise>
              <Eyebrow className="text-k-coal-soft">What Flutterly would do</Eyebrow>
              <Display as="h2" id="next-steps-heading" size="md" className="mt-5 text-k-coal-ink">
                {keep ? (
                  <>
                    Honest answer: <em>keep what you have.</em>
                  </>
                ) : (
                  <>
                    Every Flutterly build is checked against this <em>same list</em> before launch.
                  </>
                )}
              </Display>
              <p className="mt-5 max-w-[560px] text-[16px] leading-[1.6] text-k-coal-soft">
                {keep
                  ? `This site is in good shape. Fix the items above with whoever built it, and if you would like a second pair of eyes on the things a machine cannot judge, the written audit is free.`
                  : `Below are the three areas where the current site is weakest, and what a Flutterly build does about each of them for ${who}.`}
              </p>
            </Rise>

            {!keep ? (
              <ol className="mt-10 grid">
                {weakest.map((cat, i) => (
                  <Rise as="li" key={cat.id} delay={i * 0.06} className="grid grid-cols-[4.5rem_1fr] gap-x-5 border-t border-k-coal-line py-6">
                    <span className={`k-display text-[40px] leading-none tabular-nums ${scoreTone(cat.score, true)}`}>
                      {cat.score}
                    </span>
                    <div>
                      <h3 className="k-display text-[22px] leading-tight text-k-coal-ink">{cat.name}</h3>
                      <p className="mt-1.5 text-[14px] leading-[1.55] text-k-coal-soft">
                        <span className="font-medium text-k-coal-ink">Now:</span> {cat.summary}
                      </p>
                      <p className="mt-1.5 text-[14.5px] leading-[1.55] text-k-coal-soft">
                        <span className="font-medium text-k-fire-lite">A Flutterly build:</span> {promise[cat.id]}
                      </p>
                    </div>
                  </Rise>
                ))}
              </ol>
            ) : null}

            <Rise delay={0.12} className="mt-10 border-t border-k-coal-line pt-8">
              <h3 className="k-display text-[24px] text-k-coal-ink">Next step: the full written audit, free.</h3>
              <p className="mt-3 max-w-[540px] text-[15.5px] leading-[1.6] text-k-coal-soft">
                Anoop reviews the site by hand: design, content, real-device speed, the journeys {who} actually take. You get a
                scored, plain-English report within a week, yours to act on with anyone.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <BtnLink href={mailto} tone="fire" arrow="right">
                  Send me the written audit
                </BtnLink>
                <BtnLink href="/book" tone="outline-coal" arrow="right">
                  Book a {site.booking.durationMinutes}-minute call
                </BtnLink>
              </div>
              <p className="mt-4 text-[13.5px] text-k-coal-soft">
                The email opens prefilled with this report&rsquo;s summary. No follow-up pressure.
              </p>
            </Rise>
          </div>

          <div>
            <Rise delay={0.08}>
              <Eyebrow className="text-k-coal-soft">
                {keep ? "If a refresh is due" : "Suggested starting point"}
              </Eyebrow>
              <p className="mt-4 max-w-[440px] text-[15px] leading-[1.55] text-k-coal-soft">
                {recommended.featured
                  ? `With ${report.totals.fail} failing checks${report.page.platform?.kind === "page-builder" ? ` and a ${report.page.platform.name} build to maintain` : ""}, a managed build with monitoring and monthly checks keeps it fixed once it is fixed.`
                  : "A focused custom build resolves most of the list above in one go, with hosting for the first year included."}{" "}
                Published prices, plus VAT.
              </p>
            </Rise>
            <ul className="mt-6 grid">
              <PackageCard pkg={recommended} index={0} headingLevel="h3" />
            </ul>
            <Rise delay={0.16} className="mt-5">
              <BtnLink href="/packages" tone="ghost" arrow="right">
                Compare all three packages
              </BtnLink>
            </Rise>
          </div>
        </div>

        <Rise delay={0.2} className="mt-16 border-t border-k-coal-line pt-8">
          <p className="max-w-[760px] text-[14px] leading-[1.6] text-k-coal-soft">
            The scores above weight {categoryMeta.accessibility.name.toLowerCase()} and content most heavily because those
            are what {who} feel first. Flutterly builds websites for GP practices, care homes and clinics from Reading, UK,
            and runs this same list against every site before it goes live.
          </p>
        </Rise>
      </div>
    </section>
  );
}
