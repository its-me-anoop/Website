"use client";

import { Check, X } from "lucide-react";
import { comparison } from "../data";
import { Rise, SectionHead } from "../primitives";

/**
 * "Never a page builder": a real `<table>` from `md` up, and a stacked
 * card list on small screens so phones never have to scroll sideways.
 */
export function Compare() {
  return (
    <section className="border-t border-k-line bg-k-bone-2/60">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <SectionHead
          eyebrow="Never a page builder"
          title={
            <>
              No templates. No plugins. <em>No excuses.</em>
            </>
          }
          copy="Most small-organisation websites sit on a page builder someone has to keep patching. Flutterly builds a different way."
        />

        {/* Mobile: stacked rows. Each area is a small card with both sides. */}
        <Rise className="mt-12 space-y-3 md:hidden">
          {comparison.rows.map((row) => (
            <article
              key={row.label}
              className="overflow-hidden rounded-[16px] ring-1 ring-k-line"
            >
              <h3 className="bg-k-paper px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-k-muted">
                {row.label}
              </h3>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="bg-k-paper px-5 py-4">
                  <p className="text-[12px] font-medium text-k-muted">{comparison.them}</p>
                  <p className="mt-2 flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-k-ink-soft">
                    <X size={15} aria-hidden className="mt-1 shrink-0 text-k-muted" />
                    {row.them}
                  </p>
                </div>
                <div className="on-coal bg-k-coal px-5 py-4">
                  <p className="k-display text-[18px] text-k-coal-ink">{comparison.us}</p>
                  <p className="mt-2 flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-k-coal-ink">
                    <Check
                      size={15}
                      strokeWidth={2.4}
                      aria-hidden
                      className="mt-1 shrink-0 text-k-fire-lite"
                    />
                    {row.us}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </Rise>

        {/* Tablet and up: the full table. */}
        <Rise className="mt-14 hidden md:block">
          <div
            tabIndex={0}
            role="region"
            aria-label="Comparison table"
            className="overflow-x-auto rounded-[18px] focus-visible:outline-offset-4"
          >
            <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-[18px] text-left ring-1 ring-k-line lg:min-w-0">
              <caption className="sr-only">
                Comparison of typical template builders against a Flutterly build
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[16%] border-b border-k-line bg-k-paper px-5 py-5 lg:px-6">
                    <span className="sr-only">Area</span>
                  </th>
                  <th
                    scope="col"
                    className="w-[42%] border-b border-k-line bg-k-paper px-5 py-5 text-[14.5px] font-medium text-k-ink-soft lg:px-6 lg:text-[15px]"
                  >
                    {comparison.them}
                  </th>
                  <th
                    scope="col"
                    className="k-display w-[42%] border-b border-k-coal-line bg-k-coal px-5 py-5 text-[20px] font-normal text-k-coal-ink lg:px-6 lg:text-[22px]"
                  >
                    {comparison.us}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, i) => {
                  const last = i === comparison.rows.length - 1;
                  return (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className={`bg-k-paper px-5 py-5 align-top text-[11px] font-medium uppercase tracking-[0.16em] text-k-muted lg:px-6 ${last ? "" : "border-b border-k-line"}`}
                      >
                        {row.label}
                      </th>
                      <td
                        className={`bg-k-paper px-5 py-5 align-top text-[14.5px] leading-[1.55] text-k-ink-soft lg:px-6 lg:text-[15px] ${last ? "" : "border-b border-k-line"}`}
                      >
                        <span className="flex items-start gap-2.5">
                          <X size={15} aria-hidden className="mt-1 shrink-0 text-k-muted" />
                          {row.them}
                        </span>
                      </td>
                      <td
                        className={`on-coal bg-k-coal px-5 py-5 align-top text-[14.5px] leading-[1.55] text-k-coal-ink lg:px-6 lg:text-[15px] ${last ? "" : "border-b border-k-coal-line"}`}
                      >
                        <span className="flex items-start gap-2.5">
                          <Check
                            size={15}
                            strokeWidth={2.4}
                            aria-hidden
                            className="mt-1 shrink-0 text-k-fire-lite"
                          />
                          {row.us}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Rise>
      </div>
    </section>
  );
}
