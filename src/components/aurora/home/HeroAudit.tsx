"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { stages } from "../audit/report/Progress";
import { ScoreDial } from "../audit/report/ScoreDial";
import type { InstantAuditState } from "./useInstantAudit";

/**
 * The hero's address field. A real GET form to /audit, so without
 * JavaScript it opens the full report; with it, `onCheck` runs the
 * check in place.
 */
export function HeroAuditForm({
  inputRef,
  busy,
  onCheck,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  busy: boolean;
  onCheck: (url: string) => void;
}) {
  const [value, setValue] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      inputRef.current?.focus();
      return;
    }
    onCheck(value);
  }

  return (
    <form action="/audit" method="get" onSubmit={submit} className="w-full max-w-[520px]">
      <label htmlFor="hero-audit-url" className="mb-3 block text-[15px] text-a-ink-soft">
        Or get a free, instant score for your website address:
      </label>
      <div className="a-field-ring rounded-full">
        <div className="flex items-center gap-2 rounded-full bg-a-void/90 p-1.5 pl-5">
          <input
            ref={inputRef}
            id="hero-audit-url"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="yourbusiness.co.uk"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-[16px] text-a-ink placeholder:text-a-muted"
          />
          <button
            type="submit"
            disabled={busy}
            data-cursor="Check it"
            className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-a-line-2 px-4 text-[14.5px] font-medium text-a-ink transition-colors hover:border-a-amber hover:text-a-amber disabled:opacity-60 sm:px-5"
          >
            {busy ? "Checking…" : "Check it"}
            <ArrowRight size={16} aria-hidden />
          </button>
        </div>
      </div>
    </form>
  );
}

/** Ticks through the audit stages while the single request runs. */
function Stages() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, stages.length - 1)), 650);
    return () => clearInterval(timer);
  }, []);
  return (
    <ol className="flex flex-col gap-2.5">
      {stages.map((stage, i) => (
        <li
          key={stage}
          className={cn(
            "flex items-center gap-3 text-[15px] transition-colors duration-300",
            i < step ? "text-a-ink-soft" : i === step ? "text-a-ink" : "text-a-muted/60"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full border",
              i < step ? "border-a-amber bg-a-amber text-a-void" : i === step ? "animate-pulse border-a-amber" : "border-a-line-2"
            )}
          >
            {i < step && <Check size={12} />}
          </span>
          {stage}
        </li>
      ))}
    </ol>
  );
}

function bar(score: number) {
  return score >= 75 ? "bg-a-pass" : score >= 60 ? "bg-a-amber" : "bg-a-fail";
}

/**
 * Takes the butterfly's place once a check starts: the stages while it
 * runs, then the score, the category bars, the three fixes to make
 * first, and the two next steps.
 */
export function HeroAuditCard({ state, onReset }: { state: Exclude<InstantAuditState, { kind: "idle" }>; onReset: () => void }) {
  const ref = useRef<HTMLElement>(null);
  /* Below the lg breakpoint the card sits under the form, out of view. */
  useEffect(() => {
    const el = ref.current;
    if (!el?.scrollIntoView || !window.matchMedia?.("(max-width: 1023px)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Instant website check"
      className="a-card w-[min(100%,520px)] rounded-[28px] p-6 shadow-[0_30px_120px_-40px_rgba(255,140,40,0.45)] sm:p-7"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="a-mono truncate text-[12px] uppercase tracking-[0.14em] text-a-muted">
          {state.kind === "done" ? state.summary.host : state.host}
        </span>
        {state.kind !== "running" && (
          <button
            type="button"
            onClick={onReset}
            className="tap-target inline-flex shrink-0 items-center gap-1.5 text-[14px] text-a-ink-soft hover:text-a-ink"
          >
            <RotateCcw size={14} aria-hidden />
            Check another site
          </button>
        )}
      </div>

      {state.kind === "running" && (
        <>
          <p className="a-display mb-5 text-[24px] leading-tight text-a-ink">Checking {state.host}&hellip;</p>
          <Stages />
        </>
      )}

      {state.kind === "error" && (
        <div className="flex flex-col gap-4">
          <p className="a-display text-[24px] leading-tight text-a-ink">That one didn&rsquo;t work.</p>
          <p className="text-[16px] leading-[1.55] text-a-ink-soft">{state.message}</p>
        </div>
      )}

      {state.kind === "done" && <Result summary={state.summary} />}
    </section>
  );
}

function Result({ summary }: { summary: Extract<InstantAuditState, { kind: "done" }>["summary"] }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-5">
        <ScoreDial compact score={summary.score} grade={summary.grade} className="h-[120px] w-[120px] shrink-0 sm:h-[132px] sm:w-[132px]" />
        <p className="text-[16px] leading-[1.5] text-a-ink-soft">{summary.verdict}</p>
      </div>

      <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5">
        {summary.categories.map((c) => (
          <li key={c.name} className="flex flex-col gap-1">
            <span className="flex justify-between text-[13px] text-a-ink-soft">
              <span>{c.name}</span>
              <span className="a-mono text-a-muted">{c.score}</span>
            </span>
            <span aria-hidden className="h-1 overflow-hidden rounded-full bg-a-line">
              <span className={cn("block h-full rounded-full", bar(c.score))} style={{ width: `${c.score}%` }} />
            </span>
          </li>
        ))}
      </ul>

      {summary.topFixes.length > 0 && (
        <div>
          <p className="a-mono mb-2 text-[12px] uppercase tracking-[0.14em] text-a-muted">Fix first</p>
          <ol className="flex flex-col gap-1.5 text-[15px] text-a-ink">
            {summary.topFixes.map((fix, i) => (
              <li key={fix} className="flex gap-2.5">
                <span aria-hidden className="a-mono text-a-amber">
                  {i + 1}
                </span>
                {fix}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/book"
          data-cursor="Book a call"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-a-amber px-5 text-[15.5px] font-medium text-a-void transition-colors hover:bg-a-ink"
        >
          Book a call about these fixes
          <ArrowRight size={16} aria-hidden />
        </Link>
        <Link href={summary.reportHref} className="fx-ul inline-flex items-center gap-1 text-[15px] text-a-ink">
          See the full report
          <ArrowUpRight size={14} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
