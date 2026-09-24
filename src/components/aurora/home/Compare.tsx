"use client";

import { Check, X } from "lucide-react";
import { comparison } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

/**
 * "Never a page builder": a real <table> with the Flutterly column lit
 * from within. On phones the table reflows into stacked rows so
 * nothing scrolls sideways.
 */
export function Compare() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <SectionIntro
          align="center"
          eyebrow="Never a page builder"
          title={
            <>
              No templates. No plugins. <em>No excuses.</em>
            </>
          }
          copy="Most small-organisation websites sit on a page builder someone has to keep patching. Flutterly builds a different way."
        />
        <Reveal className="mt-14">
          <div className="a-glass overflow-hidden rounded-[30px]">
            <table className="w-full border-collapse text-left max-md:block">
              <caption className="sr-only">Comparison of typical template builders against a Flutterly build</caption>
              <thead className="max-md:hidden">
                <tr>
                  <th scope="col" className="w-[18%] px-7 py-6">
                    <span className="sr-only">Area</span>
                  </th>
                  <th scope="col" className="w-[41%] px-7 py-6 text-[15px] font-medium text-a-muted">
                    {comparison.them}
                  </th>
                  <th scope="col" className="relative w-[41%] px-7 py-6">
                    <span className="a-display a-grad-text text-[24px]">{comparison.us}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="max-md:block">
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-t border-a-line max-md:block max-md:px-6 max-md:py-6">
                    <th
                      scope="row"
                      className="a-mono px-7 py-6 align-top text-[12px] font-medium uppercase tracking-[0.14em] text-a-ink-soft max-md:block max-md:p-0"
                    >
                      {row.label}
                    </th>
                    <td className="px-7 py-6 align-top text-[15px] leading-[1.6] text-a-muted max-md:mt-3 max-md:block max-md:p-0">
                      <span className="flex items-start gap-3">
                        <X size={16} aria-hidden className="mt-1 shrink-0 text-a-fail/80" />
                        <span>
                          <span className="sr-only md:hidden">{comparison.them}: </span>
                          {row.them}
                        </span>
                      </span>
                    </td>
                    <td className="bg-gradient-to-r from-a-lime/[0.07] to-a-cyan/[0.05] px-7 py-6 align-top text-[15px] leading-[1.6] text-a-ink max-md:mt-3 max-md:block max-md:rounded-[14px] max-md:p-4">
                      <span className="flex items-start gap-3">
                        <Check size={16} strokeWidth={2.6} aria-hidden className="mt-1 shrink-0 text-a-lime" />
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
