"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  bookHref,
  briefLines,
  emptyBrief,
  isBriefStarted,
  mailtoHref,
  needOptions,
  nextStep,
  stageOptions,
  timingOptions,
  toggleNeed,
  type Brief,
  type Option,
} from "@/lib/marketing/brief";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Three taps instead of a blank form: pick what needs sorting, where
 * things stand and when, and the brief writes itself beside the
 * choices. The call is then booked (or the email drafted) with that
 * brief attached, so the 15 minutes start from the visitor's own words.
 *
 * Native checkboxes and radios under fieldsets carry the semantics;
 * the pills are only their labels.
 */
export function BriefBuilder() {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const started = isBriefStarted(brief);
  const lines = briefLines(brief);
  const name = useId();

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-14">
      <div className="flex flex-col gap-9">
        <fieldset>
          <Legend step="01">What needs sorting?</Legend>
          <p className="mb-4 text-[14px] text-a-muted">Pick as many as you like.</p>
          <div className="flex flex-wrap gap-2.5">
            {needOptions.map((o) => (
              <Pill
                key={o.value}
                type="checkbox"
                name={`${name}-needs`}
                option={o}
                checked={brief.needs.includes(o.value)}
                onChange={() => setBrief((b) => toggleNeed(b, o.value))}
              />
            ))}
          </div>
        </fieldset>

        <ChoiceGroup
          step="02"
          legend="Where are you now?"
          name={`${name}-stage`}
          options={stageOptions}
          value={brief.stage}
          onChange={(stage) => setBrief((b) => ({ ...b, stage }))}
        />

        <ChoiceGroup
          step="03"
          legend="When?"
          name={`${name}-timing`}
          options={timingOptions}
          value={brief.timing}
          onChange={(timing) => setBrief((b) => ({ ...b, timing }))}
        />
      </div>

      <section
        aria-label="Your brief"
        className="a-card relative flex flex-col gap-6 self-start rounded-[28px] p-7 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <span className="a-mono text-[12px] uppercase tracking-[0.14em] text-a-muted">Your brief</span>
          <span
            aria-hidden
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-500",
              started ? "bg-a-amber shadow-[0_0_12px_var(--color-a-amber)]" : "bg-a-line-2"
            )}
          />
        </div>

        <div aria-live="polite" className="min-h-[132px]">
          {started ? (
            <div className="flex flex-col gap-2">
              {lines.map((line) => (
                <p key={line} className="a-display text-[clamp(20px,1.9vw,25px)] leading-[1.25] text-a-ink">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-[16px] leading-[1.55] text-a-ink-soft">
                Pick what needs sorting and your brief writes itself here, ready to send with your booking.
              </p>
              <span aria-hidden className="block h-3 w-[86%] rounded bg-a-line" />
              <span aria-hidden className="block h-3 w-[64%] rounded bg-a-line" />
            </div>
          )}
        </div>

        {started && nextStep(brief) === "audit" && (
          <p className="rounded-[16px] border border-a-line-2 px-4 py-3 text-[14.5px] leading-snug text-a-ink-soft">
            Tip:{" "}
            <a href="#audit" className="text-a-ink underline decoration-a-amber underline-offset-4 hover:text-a-amber">
              start with the free audit
            </a>{" "}
            below. You&rsquo;ll get a report on your current site to bring to the call.
          </p>
        )}

        <div className="flex flex-col gap-4">
          <Link
            href={bookHref(brief)}
            data-magnetic
            data-cursor="Book a call"
            className="inline-flex min-h-16 items-center justify-center gap-3 rounded-full bg-a-amber px-6 text-[17px] whitespace-nowrap sm:px-8 sm:text-[18px] font-medium text-a-void transition-colors duration-300 hover:bg-a-ink"
          >
            {started ? "Book a call with this brief" : `Book a ${site.booking.durationMinutes}-minute call`}
            <ArrowRight size={18} aria-hidden />
          </Link>
          {started ? (
            <a
              href={mailtoHref(brief)}
              data-cursor="Email Anoop"
              className="fx-ul self-center text-[15.5px] text-a-ink-soft hover:text-a-ink"
            >
              Email this brief instead
            </a>
          ) : (
            <a
              href={`mailto:${site.email}`}
              data-cursor="Email Anoop"
              className="fx-ul self-center text-[15.5px] text-a-ink-soft hover:text-a-ink"
            >
              {site.email}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function Legend({ step, children }: { step: string; children: ReactNode }) {
  return (
    <legend className="mb-4 flex items-baseline gap-3">
      <span aria-hidden className="a-mono text-[12px] text-a-amber">
        {step}
      </span>
      <span className="a-display text-[clamp(22px,2.2vw,30px)] leading-tight text-a-ink">{children}</span>
    </legend>
  );
}

function ChoiceGroup<T extends string>({
  step,
  legend,
  name,
  options,
  value,
  onChange,
}: {
  step: string;
  legend: string;
  name: string;
  options: readonly Option<T>[];
  value?: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset role="radiogroup" aria-label={legend}>
      <Legend step={step}>{legend}</Legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <Pill
            key={o.value}
            type="radio"
            name={name}
            option={o}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}

function Pill<T extends string>({
  type,
  name,
  option,
  checked,
  onChange,
}: {
  type: "checkbox" | "radio";
  name: string;
  option: Option<T>;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "tap-target relative inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border px-5 text-[16px] transition-[background-color,border-color,color] duration-300 select-none",
        "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-a-amber",
        checked
          ? "border-a-amber bg-a-amber text-a-void"
          : "border-a-line-2 text-a-ink-soft hover:border-a-ink-soft hover:text-a-ink"
      )}
    >
      <input type={type} name={name} value={option.value} checked={checked} onChange={onChange} className="sr-only" />
      {checked && <Check size={16} aria-hidden />}
      {option.label}
    </label>
  );
}
