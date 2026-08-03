"use client";

import { Check, X } from "lucide-react";
import { comparison } from "../data";
import { Rise, SectionHead } from "../primitives";

export function Compare() {
  return (
    <section className="border-y border-bl-line bg-bl-band">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          align="left"
          eyebrow="A joined-up delivery model"
          title={[
            { text: "Fewer gaps between" },
            { text: "the plan and the outcome.", tone: "muted" },
          ]}
          copy="Websites, business systems and campaigns work better when someone understands how they connect. Flutterly keeps responsibility clear from first decision through support."
        />

        <Rise className="mt-14">
          <div
            data-comparison-mobile
            role="region"
            aria-label="Comparison of fragmented digital delivery against Flutterly Limited"
            className="overflow-hidden rounded-[26px] border border-bl-line bg-bl-surface md:hidden"
          >
            {comparison.rows.map((row) => (
              <article
                key={row.label}
                className="border-b border-bl-line last:border-b-0"
              >
                <h3 className="px-5 pb-0 pt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-bl-muted">
                  {row.label}
                </h3>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[12.5px] font-semibold text-bl-ink-soft">
                    <X size={15} aria-hidden className="shrink-0 text-bl-muted" />
                    {comparison.them}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-bl-ink-soft">
                    {row.them}
                  </p>
                </div>
                <div className="bg-bl-teal-soft/60 px-5 py-4">
                  <p className="flex items-center gap-2 text-[12.5px] font-semibold text-bl-teal">
                    <Check
                      size={15}
                      strokeWidth={2.6}
                      aria-hidden
                      className="shrink-0"
                    />
                    {comparison.us}
                  </p>
                  <p className="mt-2 text-[14px] font-medium leading-[1.6] text-bl-ink">
                    {row.us}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <table
            data-comparison-desktop
            className="bl-card hidden w-full border-separate border-spacing-0 overflow-hidden rounded-[26px] border border-bl-line bg-bl-surface text-left md:table"
          >
            <caption className="sr-only">
              Comparison of fragmented digital delivery against Flutterly Limited
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
