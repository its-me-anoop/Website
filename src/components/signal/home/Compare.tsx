"use client";

import { Check, X } from "lucide-react";
import { comparison } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

/**
 * "Never a page builder": a real <table>. On phones each row reflows
 * into a stacked block so nothing scrolls sideways.
 */
export function Compare() {
  return (
    <section className="s-paper py-24 sm:py-32">
      <Container>
        <SectionIntro
          onPaper
          label="Never a page builder"
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
              <tr className="border-b-2 border-s-on-paper">
                <th scope="col" className="w-[18%] py-4 pr-6">
                  <span className="sr-only">Area</span>
                </th>
                <th scope="col" className="w-[41%] py-4 pr-6 text-[16px] font-semibold text-s-on-paper-2">
                  {comparison.them}
                </th>
                <th scope="col" className="s-display w-[41%] py-4 text-[26px]">
                  {comparison.us}
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {comparison.rows.map((row) => (
                <tr key={row.label} className="border-b border-s-line-paper max-md:block max-md:py-6">
                  <th scope="row" className="s-label py-6 pr-6 align-top text-[13px] max-md:block max-md:p-0">
                    {row.label}
                  </th>
                  <td className="py-6 pr-6 align-top text-[17px] leading-[1.55] text-s-on-paper-2 max-md:mt-3 max-md:block max-md:p-0">
                    <span className="flex items-start gap-3">
                      <X size={18} aria-hidden className="mt-[3px] shrink-0" />
                      <span>
                        <span className="sr-only md:hidden">{comparison.them}: </span>
                        {row.them}
                      </span>
                    </span>
                  </td>
                  <td className="py-6 align-top text-[17px] font-semibold leading-[1.55] max-md:mt-3 max-md:block max-md:p-0">
                    <span className="flex items-start gap-3">
                      <Check size={18} strokeWidth={2.8} aria-hidden className="mt-[3px] shrink-0" />
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
