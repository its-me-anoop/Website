"use client";

import { Check, X } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/fx";
import { comparison } from "../data";
import { Section, SectionHead } from "../primitives";

/**
 * The densest content on the page, and the one that most rewards being
 * set on paper: a real comparison table, on card stock, with the
 * Flutterly column crowned by the three-colour rule. Semantics are
 * untouched — a `<table>` with a screen-reader caption, row headers and
 * column headers.
 */
export function Compare() {
  return (
    <Section width="wide">
      <SectionHead
        eyebrow="Never a page builder"
        title={[
          { text: "No templates." },
          { text: "No plugins." },
          { text: "No excuses.", tone: "muted" },
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
          className="au-plate-strong relative overflow-x-auto rounded-[var(--r-xl)]"
        >
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
            <caption className="sr-only">
              Comparison of typical template builders against a Flutterly build
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[18%] border-b border-au-line px-6 py-5"
                >
                  <span className="sr-only">Area</span>
                </th>
                <th
                  scope="col"
                  className="w-[41%] border-b border-au-line px-6 py-5 text-[14.5px] font-semibold text-au-muted"
                >
                  {comparison.them}
                </th>
                <th
                  scope="col"
                  className="relative w-[41%] border-b border-au-line bg-au-teal/[0.07] px-6 py-5 text-[14.5px] font-semibold text-au-teal-deep"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--au-rule)]"
                  />
                  {comparison.us}
                </th>
              </tr>
            </thead>
            <Stagger as="tbody" gap={0.06}>
              {comparison.rows.map((row, i) => {
                const last = i === comparison.rows.length - 1;
                const border = last ? "" : "border-b border-au-line";
                return (
                  <StaggerItem as="tr" key={row.label}>
                    <th
                      scope="row"
                      className={`au-label px-6 py-5 align-top tracking-[0.16em] text-au-muted ${border}`}
                    >
                      {row.label}
                    </th>
                    <td
                      className={`px-6 py-5 align-top text-[14.5px] leading-relaxed text-au-ink-3 ${border}`}
                    >
                      <span className="flex items-start gap-2.5">
                        <X
                          size={16}
                          aria-hidden
                          className="mt-0.5 shrink-0 text-au-rose-ink/70"
                        />
                        {row.them}
                      </span>
                    </td>
                    <td
                      className={`bg-au-teal/[0.07] px-6 py-5 align-top text-[14.5px] font-medium leading-relaxed text-au-ink ${border}`}
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
                  </StaggerItem>
                );
              })}
            </Stagger>
          </table>
        </div>
        <p className="au-label mt-4 text-center tracking-[0.2em] text-au-muted sm:hidden">
          Scroll the table sideways to compare
        </p>
      </Reveal>
    </Section>
  );
}
