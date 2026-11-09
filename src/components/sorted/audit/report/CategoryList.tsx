"use client";

import { categoryMeta } from "@/lib/audit/score";
import type { CategoryScore, Check } from "@/lib/audit/types";
import { cn } from "@/lib/utils";
import { Reveal } from "../../effects/Motion";
import { Display, Eyebrow } from "../../ui/primitives";
import { scoreBar, scoreTone, StatusMark } from "./StatusMark";

function CheckRow({ check }: { check: Check }) {
  return (
    <li className="flex items-start gap-3 py-3.5">
      <StatusMark status={check.status} className="mt-[3px]" />
      <div className="min-w-0 flex-1">
        <p className="text-[15.5px] font-semibold leading-snug text-s-ink">{check.title}</p>
        <p className="mt-1 max-w-[70ch] text-[14.5px] leading-[1.55] text-s-ink-soft">{check.detail}</p>
        {check.fix ? (
          <p className="mt-1.5 max-w-[70ch] text-[14.5px] leading-[1.55] text-s-ink">
            <span className="font-semibold">Fix:</span> {check.fix}
          </p>
        ) : null}
        {check.evidence && check.evidence.length ? (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {check.evidence.map((e) => (
              <li
                key={e}
                className="max-w-full truncate rounded-[6px] bg-s-chalk-2 px-2 py-1 font-mono text-[12px] text-s-ink-soft"
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
    <Reveal as="li" delay={Math.min(index, 4) * 0.04} className="border-t-[1.5px] border-s-line-2">
      <details className="group" open={index === 0 || counts.fail > 0}>
        <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 py-7 sm:grid-cols-[3rem_1fr_minmax(0,220px)_5rem] sm:items-center sm:gap-x-8 [&::-webkit-details-marker]:hidden">
          <span className="s-display text-[13px] tabular-nums text-s-accent sm:pt-0">0{index + 1}</span>
          <span className="min-w-0">
            <span className="s-display block text-[24px] text-s-ink sm:text-[26px]">
              {category.name}
            </span>
            <span className="mt-1 block text-[14px] leading-snug text-s-ink-soft">
              {categoryMeta[category.id].blurb}
            </span>
          </span>
          <span className="col-start-2 sm:col-start-3">
            <span className="flex items-center justify-between text-[13px] text-s-muted">
              <span>{category.summary}</span>
            </span>
            <span className="mt-2 block h-2 w-full overflow-hidden rounded-[2px] bg-s-chalk-2">
              <span
                className={cn("block h-full", scoreBar(score))}
                style={{ width: `${score ?? 0}%` }}
              />
            </span>
          </span>
          <span className={cn("row-start-1 col-start-3 justify-self-end s-display text-[40px] s-num sm:col-start-4 sm:row-auto sm:text-[44px]", scoreTone(score))}>
            {score === null ? "–" : score}
          </span>
        </summary>
        <div className="pb-8 sm:pl-[calc(3rem+2rem)]">
          <p className="sr-only">
            {counts.pass} passed, {counts.warn} to improve, {counts.fail} to fix, {counts.info} informational.
          </p>
          <ul className="divide-y divide-s-line border-t-[1.5px] border-s-line-2">
            {category.checks.map((check) => (
              <CheckRow key={check.id} check={check} />
            ))}
          </ul>
        </div>
      </details>
    </Reveal>
  );
}

export function CategoryList({ categories }: { categories: CategoryScore[] }) {
  return (
    <section id="categories" aria-labelledby="categories-heading" className="border-t-[1.5px] border-s-line-2">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="max-w-[720px]">
          <Eyebrow className="text-s-muted">Seven areas</Eyebrow>
          <Display as="h2" id="categories-heading" size="md" className="mt-5 text-s-ink">
            How the site scores, area by <em>area</em>.
          </Display>
          <p className="mt-4 text-[16px] leading-[1.6] text-s-ink-soft">
            Each area is weighted by how much it affects the people these sites serve. Open a row to see
            every check, what was found and how to fix it.
          </p>
        </Reveal>
        <ol className="mt-10 border-b-[1.5px] border-s-line-2">
          {categories.map((category, i) => (
            <CategoryRow key={category.id} category={category} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
