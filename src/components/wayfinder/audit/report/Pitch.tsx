"use client";

import { site } from "@/lib/site";
import { categoryMeta } from "@/lib/audit/score";
import type { AuditReport } from "@/lib/audit/types";
import { ButtonLink } from "../../ui/Button";
import { PackageCard } from "../../ui/PackageCard";
import { Heading, Kicker } from "../../ui/Type";
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
    <section id="next-steps" aria-labelledby="next-steps-heading" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>What Flutterly would do</Kicker>
            <Heading as="h2" id="next-steps-heading" size="md" className="mt-6">
              {keep ? (
                <>
                  Honest answer: <mark className="wf-mark">keep what you have.</mark>
                </>
              ) : (
                <>
                  Every Flutterly build is checked against this <mark className="wf-mark">same list</mark> before launch.
                </>
              )}
            </Heading>
            <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.6] text-wf-ink-soft">
              {keep
                ? `This site is in good shape. Fix the items above with whoever built it, and if you would like a second pair of eyes on the things a machine cannot judge, the written audit is free.`
                : `Below are the three areas where the current site is weakest, and what a Flutterly build does about each of them for ${who}.`}
            </p>

            {!keep ? (
              <ol className="mt-10 grid border-b-[1.5px] border-wf-line-2">
                {weakest.map((cat) => (
                  <li key={cat.id} className="grid grid-cols-[4.5rem_1fr] gap-x-5 border-t-[1.5px] border-wf-line-2 py-6">
                    <span className={`text-[40px] font-extrabold leading-none tracking-[-0.03em] tabular-nums ${scoreTone(cat.score)}`}>
                      {cat.score}
                    </span>
                    <div>
                      <h3 className="text-[22px] font-extrabold leading-tight tracking-[-0.02em]">{cat.name}</h3>
                      <p className="mt-1.5 text-[15.5px] leading-[1.55] text-wf-ink-soft">
                        <span className="font-bold text-wf-ink">Now:</span> {cat.summary}
                      </p>
                      <p className="mt-1.5 text-[15.5px] leading-[1.55] text-wf-ink-soft">
                        <span className="font-bold text-wf-ink">A Flutterly build:</span> {promise[cat.id]}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}

            <div className="mt-10 border-t-2 border-wf-ink pt-8">
              <h3 className="text-[24px] font-extrabold tracking-[-0.02em]">Next step: the full written audit, free.</h3>
              <p className="mt-3 max-w-[56ch] text-[16.5px] leading-[1.6] text-wf-ink-soft">
                Anoop reviews the site by hand: design, content, real-device speed, the journeys {who} actually take.
                You get a scored, plain-English report within a week, yours to act on with anyone.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ButtonLink href={mailto}>Send me the written audit</ButtonLink>
                <ButtonLink href="/book" tone="outline">
                  Book a {site.booking.durationMinutes}-minute call
                </ButtonLink>
              </div>
              <p className="mt-4 text-[14.5px] text-wf-muted">
                The email opens prefilled with this report&rsquo;s summary. No follow-up pressure.
              </p>
            </div>
          </div>

          <div>
            <p className="wf-label text-wf-ink-soft">{keep ? "If a refresh is due" : "Suggested starting point"}</p>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-wf-ink-soft">
              {recommended.featured
                ? `With ${report.totals.fail} failing checks${report.page.platform?.kind === "page-builder" ? ` and a ${report.page.platform.name} build to maintain` : ""}, a managed build with monitoring and monthly checks keeps it fixed once it is fixed.`
                : "A focused custom build resolves most of the list above in one go, with hosting for the first year included."}{" "}
              Published prices, plus VAT.
            </p>
            <ul className="mt-6 grid">
              <PackageCard pkg={recommended} index={0} headingLevel="h3" />
            </ul>
            <div className="mt-5">
              <ButtonLink href="/packages" tone="text">
                Compare all three packages
              </ButtonLink>
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-[80ch] border-t-[1.5px] border-wf-line-2 pt-8 text-[15px] leading-[1.6] text-wf-ink-soft">
          The scores above weight {categoryMeta.accessibility.name.toLowerCase()} and content most heavily because those
          are what {who} feel first. Flutterly builds websites for GP practices, care homes and clinics from Reading, UK,
          and runs this same list against every site before it goes live.
        </p>
      </div>
    </section>
  );
}
