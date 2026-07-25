"use client";

import type { ReactNode } from "react";
import { Reveal, TextReveal } from "@/components/fx";
import { Shell } from "./Shell";

/**
 * The long-form document layout — accessibility statement and privacy
 * policies. Atmosphere is dialled back to `calm` so nothing competes
 * with the reading: a wide measure, a clear numbered spine down the
 * left, and generous line height.
 */
export function LegalPage({
  eyebrow = "Legal",
  title,
  meta,
  children,
}: {
  eyebrow?: string;
  title: string;
  /** Effective date, review date — whatever sits under the title. */
  meta?: string;
  children: ReactNode;
}) {
  return (
    <Shell intensity="calm">
      <header className="relative overflow-hidden px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[460px] w-[620px] rounded-full bg-au-amber/12 blur-[120px]"
        />
        <div className="relative mx-auto max-w-[920px]">
          <Reveal y={12} blur={4}>
            <span className="au-label inline-flex items-center gap-2 rounded-full border border-au-line bg-au-paper-2 px-3.5 py-1.5 tracking-[0.22em] text-au-ink-3">
              <span className="h-1.5 w-1.5 rounded-full bg-au-teal-deep" aria-hidden />
              {eyebrow}
            </span>
          </Reveal>
          <TextReveal
            as="h1"
            delay={0.1}
            className="au-display-hero mt-6 text-[clamp(2.1rem,5.2vw,3.6rem)]"
            segments={[{ text: title }]}
          />
          {meta ? (
            <Reveal delay={0.2}>
              <p className="au-label mt-5 tracking-[0.18em] text-au-muted">
                {meta}
              </p>
            </Reveal>
          ) : null}
        </div>
      </header>

      <div className="relative pb-10">{children}</div>
    </Shell>
  );
}

/** One numbered clause of a policy. */
export function PolicySection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-au-line px-5 py-12 sm:px-8 md:py-16">
      <div className="mx-auto grid max-w-[920px] gap-x-14 gap-y-4 md:grid-cols-[64px_1fr] md:items-start">
        <p className="au-label text-au-teal-deep md:pt-1.5">
          {label}
        </p>
        <Reveal y={18} blur={5}>
          <h2 className="au-display mb-5 text-[21px] md:text-[24px]">
            {title}
          </h2>
          <div className="max-w-[660px] space-y-4 text-[15.5px] leading-[1.75] text-au-ink-2">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** A bullet with an optional lead-in term. */
export function Bullet({
  bold,
  children,
}: {
  bold?: string;
  children?: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-au-teal-deep"
        aria-hidden
      />
      <span>
        {bold ? <strong className="font-semibold text-au-ink">{bold} </strong> : null}
        {children}
      </span>
    </li>
  );
}
