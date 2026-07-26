"use client";

import { m, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { EASE, Reveal } from "@/components/fx";
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
  const reduce = useReducedMotion();

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
        {/* Below `md` the two columns stack instead of scrolling sideways.
            The table needs 640px and the page gives it 704px at `md`, so
            anything narrower used to hide the Flutterly column off the
            right edge entirely — the reader saw only the criticism and
            had to discover a sideways scroll to find the answer to it. */}
        <div className="au-plate-strong overflow-hidden rounded-[var(--r-xl)] md:hidden">
          {/* The two sides are named once, here, rather than repeated on
              every row — six repetitions of "A Flutterly build" is a lot
              of a phone screen to spend on a label. Each value below
              still carries its own name for a screen reader, so nothing
              depends on having seen this legend, or on the colour. */}
          <p
            aria-hidden
            className="flex flex-wrap gap-x-5 gap-y-1.5 border-b border-au-line px-5 py-4 text-[12.5px] font-semibold"
          >
            <span className="flex items-center gap-1.5 text-au-muted">
              <X size={14} className="shrink-0 text-au-rose-ink/70" />
              {comparison.them}
            </span>
            <span className="flex items-center gap-1.5 text-au-teal-deep">
              <Check size={14} strokeWidth={2.8} className="shrink-0" />
              {comparison.us}
            </span>
          </p>

          <dl className="divide-y divide-au-line">
            {comparison.rows.map((row) => (
              <div key={row.label} className="p-5">
                <dt className="au-label tracking-[0.16em] text-au-muted">
                  {row.label}
                </dt>
                <dd className="mt-3 flex gap-2.5 text-[14.5px] leading-relaxed text-au-ink-3">
                  <X
                    size={16}
                    aria-hidden
                    className="mt-1 shrink-0 text-au-rose-ink/70"
                  />
                  <span>
                    <span className="sr-only">{comparison.them}: </span>
                    {row.them}
                  </span>
                </dd>
                <dd className="mt-2.5 flex gap-2.5 rounded-[var(--r-md)] bg-au-teal/[0.07] p-3.5 text-[14.5px] font-medium leading-relaxed text-au-ink">
                  <Check
                    size={16}
                    strokeWidth={2.8}
                    aria-hidden
                    className="mt-1 shrink-0 text-au-teal-deep"
                  />
                  <span>
                    <span className="sr-only">{comparison.us}: </span>
                    {row.us}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* From `md` the table fits, and a real table is the better
            reading of a comparison. `overflow-x-auto` stays as a
            safeguard for very large text settings; a scrollable region
            has to be focusable and named to stay keyboard-operable —
            WCAG 2.2 §2.1.1. */}
        <div
          role="region"
          aria-label="Template builders compared with a Flutterly build"
          tabIndex={0}
          className="au-plate-strong relative hidden overflow-x-auto rounded-[var(--r-xl)] md:block"
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
            <tbody>
              {comparison.rows.map((row, i) => {
                const last = i === comparison.rows.length - 1;
                const border = last ? "" : "border-b border-au-line";
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
                  </m.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
