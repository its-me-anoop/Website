"use client";

import { Check, X } from "lucide-react";
import { comparison } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

/**
 * "Never a page builder": a real <table> on paper with the Flutterly
 * column set in ink. On phones the table reflows into stacked rows so
 * nothing scrolls sideways.
 */
export function Compare() {
  return (
    <section className="a-paper relative py-24 sm:py-32">
      <Container>
        <SectionIntro
          eyebrow="Never a page builder"
          title={
            <>
              No templates. No plugins. <em>No excuses.</em>
            </>
          }
          copy="Most small-organisation websites sit on a page builder someone has to keep patching. Flutterly builds a different way."
        />
        <Reveal className="mt-14">
          <table className="w-full border-collapse text-left max-md:block">
            <caption className="sr-only">Comparison of typical template builders against a Flutterly build</caption>
            <thead className="max-md:hidden">
              <tr>
                <th scope="col" className="a-mono w-[18%] px-5 pb-5 text-[12px] font-medium uppercase tracking-[0.14em] text-a-muted">
                  Area
                </th>
                <th scope="col" className="w-[41%] px-5 pb-5 text-[16px] font-medium text-a-ink">
                  {comparison.them}
                </th>
                <th scope="col" className="a-on-ink w-[41%] rounded-t-[16px] px-6 pb-5 pt-5 text-[16px] font-medium">
                  {comparison.us}
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {comparison.rows.map((row, i) => (
                <tr
                  key={row.label}
                  className="border-t border-a-line transition-colors hover:bg-a-ink/[0.03] max-md:block max-md:py-6"
                >
                  <th scope="row" className="px-5 py-6 align-top text-[16px] font-medium text-a-ink max-md:block max-md:p-0">
                    {row.label}
                  </th>
                  <td className="px-5 py-6 align-top text-[15.5px] leading-[1.6] text-a-muted max-md:mt-3 max-md:block max-md:p-0">
                    <span className="flex items-start gap-3">
                      <X size={16} aria-hidden className="mt-1 shrink-0 text-a-muted" />
                      <span>
                        <span className="sr-only md:hidden">{comparison.them}: </span>
                        {row.them}
                      </span>
                    </span>
                  </td>
                  <td
                    className={
                      "a-on-ink px-6 py-6 align-top text-[15.5px] leading-[1.6] max-md:mt-3 max-md:block max-md:rounded-[14px] max-md:p-4 " +
                      (i === comparison.rows.length - 1 ? "md:rounded-b-[16px]" : "")
                    }
                  >
                    <span className="flex items-start gap-3">
                      <Check size={16} strokeWidth={2.6} aria-hidden className="mt-1 shrink-0 text-a-amber" />
                      <span>
                        <span className="sr-only md:hidden">{comparison.us}: </span>
                        {row.us}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
