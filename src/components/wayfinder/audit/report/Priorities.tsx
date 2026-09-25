"use client";

import { categoryMeta, sectorAudience } from "@/lib/audit/score";
import type { AuditReport } from "@/lib/audit/types";
import { Heading, Kicker } from "../../ui/Type";

const impactLabel = { high: "High impact", medium: "Medium impact", low: "Low impact" } as const;

/**
 * The five things to do first, on an ink board: failing checks ranked by impact,
 * then warnings. Each carries what was found and the fix, so the list
 * can be handed to any developer.
 */
export function Priorities({ report }: { report: AuditReport }) {
  const top = report.priorities.slice(0, 5);
  const rest = report.priorities.length - top.length;
  const who = sectorAudience(report.sector);

  return (
    <section id="fix-first" aria-labelledby="fix-first-heading" className="wf-on-ink bg-wf-ink text-wf-on-ink">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
          <div>
            <Kicker>Fix first</Kicker>
            <Heading as="h2" id="fix-first-heading" size="md" className="mt-6">
              {top.length === 0 ? (
                <>
                  Nothing urgent. <mark className="wf-mark">Genuinely.</mark>
                </>
              ) : (
                <>
                  The {top.length === 1 ? "one change" : `${top.length} changes`} that would help {who}{" "}
                  <mark className="wf-mark">most.</mark>
                </>
              )}
            </Heading>
            <p className="mt-5 text-[16.5px] leading-[1.6] text-wf-on-ink-soft">
              {top.length === 0
                ? "Every automated check passed or came back as informational. The written audit looks at the things a machine cannot: design, content quality and how real visitors get on."
                : `Ranked by how much each one affects ${who}, then by how badly it is failing. Everything here can be handed to whoever looks after the site${rest > 0 ? `; the other ${rest} sit in the area breakdown above` : ""}.`}
            </p>
          </div>

          {top.length > 0 ? (
            <ol className="grid border-b border-wf-on-ink-line">
              {top.map((check, i) => (
                <li
                  key={check.id}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-wf-on-ink-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-wf-sign text-[24px] font-extrabold text-wf-ink sm:h-12 sm:w-12"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h3 className="text-[23px] font-extrabold leading-tight tracking-[-0.02em]">{check.title}</h3>
                      <span className="wf-label inline-flex items-center gap-1.5 text-wf-on-ink-soft">
                        {impactLabel[check.impact]} &middot; {categoryMeta[check.category].name}
                        <span className="sr-only">. {check.status === "fail" ? "Needs fixing" : "Needs improvement"}.</span>
                      </span>
                    </div>
                    <p className="mt-3 max-w-[66ch] text-[16px] leading-[1.6] text-wf-on-ink-soft">{check.detail}</p>
                    {check.fix ? (
                      <p className="mt-2.5 max-w-[66ch] text-[16px] leading-[1.6]">
                        <span className="font-bold text-wf-sign">Fix: </span>
                        {check.fix}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </section>
  );
}
