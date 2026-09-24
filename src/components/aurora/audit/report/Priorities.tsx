"use client";

import { categoryMeta, sectorAudience } from "@/lib/audit/score";
import type { AuditReport } from "@/lib/audit/types";
import { Reveal } from "../../effects/Motion";
import { Display, Eyebrow } from "../../ui/primitives";
import { StatusMark } from "./StatusMark";

const impactLabel = { high: "High impact", medium: "Medium impact", low: "Low impact" } as const;

/**
 * The five things to do first, on coal: failing checks ranked by impact,
 * then warnings. Each carries what was found and the fix, so the list
 * can be handed to any developer.
 */
export function Priorities({ report }: { report: AuditReport }) {
  const top = report.priorities.slice(0, 5);
  const rest = report.priorities.length - top.length;
  const who = sectorAudience(report.sector);

  return (
    <section id="fix-first" aria-labelledby="fix-first-heading" className="">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow className="text-a-ink-soft">Fix first</Eyebrow>
            <Display as="h2" id="fix-first-heading" size="md" className="mt-5 text-a-ink">
              {top.length === 0 ? (
                <>
                  Nothing urgent. <em>Genuinely.</em>
                </>
              ) : (
                <>
                  The {top.length === 1 ? "one change" : `${top.length} changes`} that would help {who} <em>most</em>.
                </>
              )}
            </Display>
            <p className="mt-5 text-[15.5px] leading-[1.6] text-a-ink-soft">
              {top.length === 0
                ? "Every automated check passed or came back as informational. The written audit looks at the things a machine cannot: design, content quality and how real visitors get on."
                : `Ranked by how much each one affects ${who}, then by how badly it is failing. Everything here can be handed to whoever looks after the site${rest > 0 ? `; the other ${rest} sit in the area breakdown above` : ""}.`}
            </p>
          </Reveal>

          {top.length > 0 ? (
            <ol className="grid">
              {top.map((check, i) => (
                <Reveal as="li" key={check.id} delay={i * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-a-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-6">
                  <span className="a-display text-[40px] leading-none text-a-amber sm:text-[48px]">{i + 1}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h3 className="a-display text-[24px] leading-tight text-a-ink">{check.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-a-ink-soft">
                        <StatusMark status={check.status} size={13} />
                        {impactLabel[check.impact]} &middot; {categoryMeta[check.category].name}
                      </span>
                    </div>
                    <p className="mt-3 max-w-[64ch] text-[15.5px] leading-[1.6] text-a-ink-soft">{check.detail}</p>
                    {check.fix ? (
                      <p className="mt-2.5 max-w-[64ch] text-[15.5px] leading-[1.6] text-a-ink">
                        <span className="font-medium text-a-amber">Fix: </span>
                        {check.fix}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </section>
  );
}
