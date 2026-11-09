"use client";

import { Check, X } from "lucide-react";
import { comparison } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

/**
 * "Never a page builder": a real <table> with the Flutterly column set
 * on cobalt. On phones the table reflows into stacked rows so nothing
 * scrolls sideways.
 */
export function Compare() {
  return (
    <section className="tone-chalk s-dots relative border-y-2 border-s-navy py-20 sm:py-28">
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
        <Reveal className="mt-12" turn={14}>
          <table className="w-full border-collapse overflow-hidden rounded-[14px] border-2 border-s-navy bg-white text-left max-md:block max-md:border-0 max-md:bg-transparent">
            <caption className="sr-only">Comparison of typical template builders against a Flutterly build</caption>
            <thead className="max-md:hidden">
              <tr className="border-b-2 border-s-navy">
                <th scope="col" className="s-label w-[18%] px-5 py-4 text-[12.5px] text-s-muted">
                  Area
                </th>
                <th scope="col" className="w-[41%] px-5 py-4 text-[16.5px] font-bold text-s-ink">
                  {comparison.them}
                </th>
                <th scope="col" className="tone-cobalt w-[41%] px-6 py-4 text-[16.5px] font-bold">
                  {comparison.us}
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {comparison.rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-t-[1.5px] border-s-line-2 first:border-t-0 max-md:mb-3 max-md:block max-md:overflow-hidden max-md:rounded-[12px] max-md:border-2 max-md:border-s-navy max-md:bg-white first:max-md:border-t-2"
                >
                  <th scope="row" className="px-5 py-5 align-top text-[16.5px] font-bold text-s-ink max-md:block max-md:px-4 max-md:pb-0 max-md:pt-4">
                    {row.label}
                  </th>
                  <td className="px-5 py-5 align-top text-[15.5px] leading-[1.55] text-s-muted max-md:block max-md:px-4 max-md:py-3">
                    <span className="flex items-start gap-3">
                      <X size={17} strokeWidth={2.6} aria-hidden className="mt-0.5 shrink-0" />
                      <span>
                        <span className="sr-only md:hidden">{comparison.them}: </span>
                        {row.them}
                      </span>
                    </span>
                  </td>
                  <td className="tone-cobalt px-6 py-5 align-top text-[15.5px] font-medium leading-[1.55] max-md:block max-md:px-4 max-md:py-4">
                    <span className="flex items-start gap-3">
                      <Check size={17} strokeWidth={3} aria-hidden className="mt-0.5 shrink-0 text-s-accent" />
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
