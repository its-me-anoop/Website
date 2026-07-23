"use client";

import { Check, X } from "lucide-react";
import { comparison } from "../data";
import { Rise, SectionHead } from "../primitives";

export function Compare() {
  return (
    <section className="border-y border-bl-line bg-bl-band">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          eyebrow="Never a page builder"
          title={[
            { text: "No templates." },
            { text: "No plugins.", tone: "teal" },
            { text: "No excuses.", tone: "muted" },
          ]}
          copy="Most small-organisation websites sit on a page builder someone has to keep patching. Flutterly builds a different way."
        />

        <Rise className="mt-14 overflow-x-auto">
          <table className="bl-card w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-[26px] border border-bl-line bg-bl-surface text-left">
            <caption className="sr-only">
              Comparison of typical template builders against a Flutterly build
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[18%] border-b border-bl-line px-6 py-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-bl-muted">
                  <span className="sr-only">Area</span>
                </th>
                <th scope="col" className="w-[41%] border-b border-bl-line px-6 py-5 text-[14.5px] font-semibold text-bl-ink-soft">
                  {comparison.them}
                </th>
                <th scope="col" className="w-[41%] border-b border-bl-line bg-bl-teal-soft/60 px-6 py-5 text-[14.5px] font-semibold text-bl-teal">
                  {comparison.us}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => {
                const last = i === comparison.rows.length - 1;
                const border = last ? "" : "border-b border-bl-line";
                return (
                  <tr key={row.label}>
                    <th scope="row" className={`px-6 py-5 align-top text-[13px] font-semibold uppercase tracking-[0.14em] text-bl-muted ${border}`}>
                      {row.label}
                    </th>
                    <td className={`px-6 py-5 align-top text-[14.5px] leading-relaxed text-bl-ink-soft ${border}`}>
                      <span className="flex items-start gap-2.5">
                        <X size={16} aria-hidden className="mt-0.5 shrink-0 text-bl-muted" />
                        {row.them}
                      </span>
                    </td>
                    <td className={`bg-bl-teal-soft/60 px-6 py-5 align-top text-[14.5px] font-medium leading-relaxed text-bl-ink ${border}`}>
                      <span className="flex items-start gap-2.5">
                        <Check size={16} strokeWidth={2.6} aria-hidden className="mt-0.5 shrink-0 text-bl-teal" />
                        {row.us}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Rise>
      </div>
    </section>
  );
}
