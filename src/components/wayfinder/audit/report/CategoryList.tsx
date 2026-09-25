"use client";

import { categoryMeta } from "@/lib/audit/score";
import type { CategoryScore, Check } from "@/lib/audit/types";
import { cn } from "@/lib/utils";
import { Heading, Kicker } from "../../ui/Type";
import { scoreBar, scoreTone, StatusMark } from "./StatusMark";

function CheckRow({ check }: { check: Check }) {
  return (
    <li className="flex items-start gap-3 py-4">
      <StatusMark status={check.status} className="mt-[3px]" />
      <div className="min-w-0 flex-1">
        <p className="text-[16.5px] font-bold leading-snug">{check.title}</p>
        <p className="mt-1 max-w-[72ch] text-[15.5px] leading-[1.55] text-wf-ink-soft">{check.detail}</p>
        {check.fix ? (
          <p className="mt-1.5 max-w-[72ch] text-[15.5px] leading-[1.55]">
            <span className="font-bold">Fix:</span> {check.fix}
          </p>
        ) : null}
        {check.evidence && check.evidence.length ? (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {check.evidence.map((e) => (
              <li
                key={e}
                className="wf-mono max-w-full truncate rounded-[4px] border-[1.5px] border-wf-line-2 bg-wf-card px-2 py-0.5 text-[12.5px] text-wf-ink-soft"
                title={e}
              >
                {e}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

export function CategoryRow({ category, index }: { category: CategoryScore; index: number }) {
  const { score, counts } = category;
  return (
    <li className="border-t-[1.5px] border-wf-line-2">
      <details className="group" open={index === 0 || counts.fail > 0}>
        <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 py-6 sm:grid-cols-[3rem_1fr_minmax(0,220px)_5rem] sm:items-center sm:gap-x-8 [&::-webkit-details-marker]:hidden">
          <span className="wf-mono pt-1 text-[14px] tabular-nums text-wf-muted sm:pt-0">0{index + 1}</span>
          <span className="min-w-0">
            <span className="block text-[23px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[26px]">
              {category.name}
            </span>
            <span className="mt-1 block text-[15px] leading-snug text-wf-ink-soft">{categoryMeta[category.id].blurb}</span>
          </span>
          <span className="col-start-2 sm:col-start-3">
            <span className="block text-[14px] text-wf-ink-soft">{category.summary}</span>
            <span className="mt-2 block h-2.5 w-full overflow-hidden rounded-[2px] bg-wf-paper-2 ring-1 ring-wf-line-2">
              <span className={cn("block h-full", scoreBar(score))} style={{ width: `${score ?? 0}%` }} />
            </span>
          </span>
          <span
            className={cn(
              "col-start-3 row-start-1 justify-self-end text-[40px] font-extrabold leading-none tracking-[-0.03em] tabular-nums sm:col-start-4 sm:row-auto sm:text-[44px]",
              scoreTone(score)
            )}
          >
            {score === null ? "–" : score}
          </span>
        </summary>
        <div className="pb-8 sm:pl-[calc(3rem+2rem)]">
          <p className="sr-only">
            {counts.pass} passed, {counts.warn} to improve, {counts.fail} to fix, {counts.info} informational.
          </p>
          <ul className="divide-y divide-wf-line-2 border-t border-wf-line-2">
            {category.checks.map((check) => (
              <CheckRow key={check.id} check={check} />
            ))}
          </ul>
        </div>
      </details>
    </li>
  );
}

export function CategoryList({ categories }: { categories: CategoryScore[] }) {
  return (
    <section id="categories" aria-labelledby="categories-heading" className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
        <div className="max-w-[760px]">
          <Kicker>Seven areas</Kicker>
          <Heading as="h2" id="categories-heading" size="md" className="mt-6">
            How the site scores, area by area.
          </Heading>
          <p className="mt-4 text-[17px] leading-[1.6] text-wf-ink-soft">
            Each area is weighted by how much it affects the people these sites serve. Open a row to see every check,
            what was found and how to fix it.
          </p>
        </div>
        <ol className="mt-10 border-b-2 border-t-2 border-wf-ink [&>li:first-child]:border-t-0">
          {categories.map((category, i) => (
            <CategoryRow key={category.id} category={category} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
