"use client";

import { useEffect, useRef } from "react";
import { categoryMeta } from "@/lib/audit/score";
import type { CategoryScore, Check } from "@/lib/audit/types";
import { cn } from "@/lib/utils";
import { Display, Eyebrow, Rise } from "../../primitives";
import { scoreBar, scoreTone, StatusMark } from "./StatusMark";

function CheckRow({ check }: { check: Check }) {
  return (
    <li className="flex items-start gap-3 py-3.5">
      <StatusMark status={check.status} className="mt-[3px]" />
      <div className="min-w-0 flex-1">
        <p className="text-[15.5px] font-medium leading-snug text-k-ink">{check.title}</p>
        <p className="mt-1 max-w-[70ch] text-[14.5px] leading-[1.55] text-k-ink-soft">{check.detail}</p>
        {check.fix ? (
          <p className="mt-1.5 max-w-[70ch] text-[14.5px] leading-[1.55] text-k-ink">
            <span className="font-medium">Fix:</span> {check.fix}
          </p>
        ) : null}
        {check.evidence && check.evidence.length ? (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {check.evidence.map((e) => (
              <li
                key={e}
                className="max-w-full truncate rounded-[6px] bg-k-bone-2 px-2 py-1 font-mono text-[12px] text-k-ink-soft"
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
    <Rise as="li" delay={Math.min(index, 4) * 0.04} className="border-t border-k-line">
      <details className="group" open={index === 0 || counts.fail > 0}>
        <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 py-7 sm:grid-cols-[3rem_1fr_minmax(0,220px)_5rem] sm:items-center sm:gap-x-8 [&::-webkit-details-marker]:hidden">
          <span className="k-display text-[13px] tabular-nums text-k-fire sm:pt-0">0{index + 1}</span>
          <span className="min-w-0">
            <span className="k-display block text-[24px] leading-tight text-k-ink sm:text-[26px]">
              {category.name}
            </span>
            <span className="mt-1 block text-[14px] leading-snug text-k-ink-soft">
              {categoryMeta[category.id].blurb}
            </span>
          </span>
          <span className="col-start-2 sm:col-start-3">
            <span className="flex items-center justify-between text-[13px] text-k-muted">
              <span>{category.summary}</span>
            </span>
            <span className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-k-line">
              <span
                className={cn("block h-full rounded-full", scoreBar(score))}
                style={{ width: `${score ?? 0}%` }}
              />
            </span>
          </span>
          <span className={cn("row-start-1 col-start-3 justify-self-end k-display text-[40px] leading-none tabular-nums sm:col-start-4 sm:row-auto sm:text-[44px]", scoreTone(score))}>
            {score === null ? "–" : score}
          </span>
        </summary>
        <div className="pb-8 sm:pl-[calc(3rem+2rem)]">
          <p className="sr-only">
            {counts.pass} passed, {counts.warn} to improve, {counts.fail} to fix, {counts.info} informational.
          </p>
          <ul className="divide-y divide-k-line border-t border-k-line">
            {category.checks.map((check) => (
              <CheckRow key={check.id} check={check} />
            ))}
          </ul>
        </div>
      </details>
    </Rise>
  );
}

/**
 * CSS cannot open a closed <details>, so a printed report would lose
 * every collapsed row. Open them all when printing starts and put the
 * reader's state back afterwards.
 */
function useOpenDetailsForPrint(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let closed: HTMLDetailsElement[] = [];
    const before = () => {
      /* Some browsers fire beforeprint more than once per print; keep the first snapshot. */
      if (closed.length) return;
      closed = Array.from(ref.current?.querySelectorAll<HTMLDetailsElement>("details:not([open])") ?? []);
      closed.forEach((d) => (d.open = true));
    };
    const after = () => {
      closed.forEach((d) => (d.open = false));
      closed = [];
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, [ref]);
}

export function CategoryList({ categories }: { categories: CategoryScore[] }) {
  const ref = useRef<HTMLElement>(null);
  useOpenDetailsForPrint(ref);
  return (
    <section ref={ref} id="categories" aria-labelledby="categories-heading" className="border-t border-k-line bg-k-bone-2/60">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
        <Rise className="max-w-[720px]">
          <Eyebrow className="text-k-muted">Seven areas</Eyebrow>
          <Display as="h2" id="categories-heading" size="md" className="mt-5 text-k-ink">
            How the site scores, area by <em>area</em>.
          </Display>
          <p className="mt-4 text-[16px] leading-[1.6] text-k-ink-soft">
            Each area is weighted by how much it affects the people these sites serve. Open a row to see
            every check, what was found and how to fix it.
          </p>
        </Rise>
        <ol className="mt-10 border-b border-k-line">
          {categories.map((category, i) => (
            <CategoryRow key={category.id} category={category} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
