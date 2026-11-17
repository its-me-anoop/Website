"use client";

import { Check, X } from "lucide-react";
import { comparison } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Container, SectionIntro } from "../ui/primitives";

/**
 * Column headings are repeated within each mobile row so side-by-side
 * figures remain attributable when the table stacks.
 */
export function Compare() {
  return (
    <section className="tone-white relative border-y border-s-line-2 py-20 sm:py-28">
      <Container>
        <SectionIntro
          eyebrow="Build comparison"
          title={
            <>
              How the two builds <em>compare.</em>
            </>
          }
          copy="Compare a custom Flutterly build with a typical page-builder website, from everyday editing to longer-term ownership."
        />
        <Reveal className="mt-12" turn={0}>
          <table className="w-full border-collapse overflow-hidden rounded-[14px] border border-s-line-2 bg-s-raised text-left max-md:block max-md:border-0 max-md:bg-transparent">
            <caption className="sr-only">Comparison of typical template builders against a Flutterly build</caption>
            <thead className="max-md:hidden">
              <tr className="border-b border-s-line-2">
                <th scope="col" className="s-label w-[18%] px-5 py-4 text-[12.5px] text-s-muted">
                  Area
                </th>
                <th scope="col" className="w-[41%] px-5 py-4 text-[16.5px] font-bold text-s-ink">
                  {comparison.them}
                </th>
                <th scope="col" className="tone-navy w-[41%] px-6 py-4 text-[16.5px] font-bold">
                  {comparison.us}
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {comparison.rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-t-[1.5px] border-s-line-2 first:border-t-0 max-md:mb-3 max-md:block max-md:overflow-hidden max-md:rounded-[12px] max-md:border-2 max-md:border-s-rule max-md:bg-s-raised first:max-md:border-t-2"
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
                  <td className="tone-navy px-6 py-5 align-top text-[15.5px] font-medium leading-[1.55] max-md:block max-md:px-4 max-md:py-4">
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
