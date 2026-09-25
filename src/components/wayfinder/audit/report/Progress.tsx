"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pictogram } from "../../ui/Bits";

export const stages = [
  "Finding the site",
  "Reading the page",
  "Checking accessibility",
  "Measuring speed signals",
  "Reading search and local signals",
  "Checking security headers",
  "Scoring the results",
] as const;

/**
 * An ink board shown while the API works: the address along the top
 * and the stages ticking through like a departures board. The audit is a single request, so
 * the ticks advance on a timer and stop at the last stage until the
 * result arrives.
 */
export function Progress({ host }: { host: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => Math.min(s + 1, stages.length - 1));
    }, 650);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="wf-board wf-on-ink mx-auto w-full max-w-[680px] overflow-hidden">
      <p className="wf-label flex items-center justify-between gap-4 border-b border-wf-on-ink-line px-5 py-3 text-wf-on-ink-soft sm:px-7">
        <span className="min-w-0 truncate">{host}</span>
        <span className="shrink-0 text-wf-sign">Auditing</span>
      </p>
      <div className="px-5 py-7 sm:px-7 sm:py-8">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-wf-sign text-wf-ink">
            <Pictogram size={24} />
          </span>
          <p className="min-w-0 break-words text-[22px] font-extrabold tracking-[-0.02em] sm:text-[26px]">
            Auditing <span className="text-wf-sign">{host}</span>
          </p>
        </div>
        <ol className="mt-7 grid gap-3" aria-label="Audit progress">
          {stages.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-3 text-[16px] transition-colors duration-300",
                  done ? "text-wf-on-ink-soft" : active ? "font-bold text-wf-on-ink" : "text-wf-on-ink-soft"
                )}
                aria-current={active ? "step" : undefined}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px]",
                    done ? "bg-wf-sign text-wf-ink" : active ? "border-2 border-wf-sign" : "border-2 border-wf-on-ink-line"
                  )}
                >
                  {done ? <Check size={14} strokeWidth={3.2} /> : active ? <span className="h-2 w-2 animate-pulse rounded-full bg-wf-sign" /> : null}
                </span>
                {label}
              </li>
            );
          })}
        </ol>
        <p className="mt-7 text-[15px] leading-snug text-wf-on-ink-soft">
          Usually a few seconds. Slow sites take longer, which is itself a finding.
        </p>
      </div>
    </div>
  );
}
