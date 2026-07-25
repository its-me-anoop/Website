"use client";

import { m, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { EASE, Reveal } from "@/components/fx";
import { comparison } from "../data";
import { SectionHead } from "../primitives";

/**
 * The daylight interlude. One bright panel per page breaks the dark
 * canvas and gives the densest content — a real comparison table — the
 * legibility of paper. Semantics are untouched: a `<table>` with a
 * screen-reader caption, row headers and column headers.
 */
export function Compare() {
  const reduce = useReducedMotion();

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-3 py-14 sm:px-6 sm:py-20">
      <div className="au-day-panel au-grain relative overflow-hidden rounded-[32px] px-5 py-20 sm:rounded-[44px] sm:px-10 sm:py-28">
        <SectionHead
          tone="day"
          eyebrow="Never a page builder"
          title={[
            { text: "No templates." },
            { text: "No plugins.", tone: "day" },
            { text: "No excuses.", tone: "day-muted" },
          ]}
          copy="Most small-organisation websites sit on a page builder someone has to keep patching. Flutterly builds a different way."
        />

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-[1000px]">
          {/* The table needs room to breathe, so on a phone it scrolls
              sideways. A scrollable region has to be focusable and named
              to stay keyboard-operable — WCAG 2.2 §2.1.1. */}
          <div
            role="region"
            aria-label="Template builders compared with a Flutterly build"
            tabIndex={0}
            className="relative overflow-x-auto rounded-[24px] border border-au-day-line bg-white/70 shadow-[0_30px_80px_-50px_rgba(6,35,28,0.6)] backdrop-blur-sm"
          >
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
              <caption className="sr-only">
                Comparison of typical template builders against a Flutterly build
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-[18%] border-b border-au-day-line px-6 py-5"
                  >
                    <span className="sr-only">Area</span>
                  </th>
                  <th
                    scope="col"
                    className="w-[41%] border-b border-au-day-line px-6 py-5 text-[14.5px] font-semibold text-au-day-muted"
                  >
                    {comparison.them}
                  </th>
                  <th
                    scope="col"
                    className="relative w-[41%] border-b border-au-day-line bg-au-teal-deep/[0.07] px-6 py-5 text-[14.5px] font-semibold text-au-teal-deep"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#0e7a63,#22b79a,#3aa0ff)]"
                    />
                    {comparison.us}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, i) => {
                  const last = i === comparison.rows.length - 1;
                  const border = last ? "" : "border-b border-au-day-line";
                  return (
                    <m.tr
                      key={row.label}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                      transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
                    >
                      <th
                        scope="row"
                        className={`au-mono px-6 py-5 align-top text-[11.5px] font-medium uppercase tracking-[0.16em] text-au-day-muted ${border}`}
                      >
                        {row.label}
                      </th>
                      <td
                        className={`px-6 py-5 align-top text-[14.5px] leading-relaxed text-au-day-soft ${border}`}
                      >
                        <span className="flex items-start gap-2.5">
                          <X
                            size={16}
                            aria-hidden
                            className="mt-0.5 shrink-0 text-au-day-muted/70"
                          />
                          {row.them}
                        </span>
                      </td>
                      <td
                        className={`bg-au-teal-deep/[0.07] px-6 py-5 align-top text-[14.5px] font-medium leading-relaxed text-au-day-ink ${border}`}
                      >
                        <span className="flex items-start gap-2.5">
                          <Check
                            size={16}
                            strokeWidth={2.8}
                            aria-hidden
                            className="mt-0.5 shrink-0 text-au-teal-deep"
                          />
                          {row.us}
                        </span>
                      </td>
                    </m.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="au-mono mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-au-day-muted sm:hidden">
            Scroll the table sideways to compare
          </p>
        </Reveal>
      </div>
    </section>
  );
}
