"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
 * Browser window shown while the API works: the address in its bar
 * and the stages ticking through. The audit is a single request, so
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
    <div className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[14px] border-2 border-s-rule bg-s-raised text-s-ink shadow-[0_8px_0_0_var(--s-rule)]">
      <div className="flex h-9 items-center gap-1.5 border-b-2 border-s-rule bg-s-bg-2 px-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-[2px] bg-s-flame" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-s-sun" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-s-jade" />
        </span>
        <span className="ml-2 truncate text-[12.5px] font-semibold text-s-ink-soft">{host}</span>
      </div>
      <div className="px-5 py-6 sm:px-7 sm:py-8">
        <div className="flex items-center gap-3">
          <Image src="/flutterly-logo.png" alt="" width={26} height={26} />
          <p className="s-display text-[22px] text-s-ink sm:text-[26px]">
            Auditing <em>{host}</em>
          </p>
        </div>
        <ol className="mt-6 grid gap-2.5" aria-label="Audit progress">
          {stages.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-3 text-[15.5px] transition-colors duration-300",
                  done ? "text-s-ink-soft" : active ? "font-semibold text-s-ink" : "text-s-muted"
                )}
                aria-current={active ? "step" : undefined}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2",
                    done ? "border-s-jade bg-s-jade text-s-navy" : active ? "border-s-cobalt" : "border-s-line-2"
                  )}
                >
                  {done ? <Check size={12} strokeWidth={3.4} /> : active ? <span className="h-2 w-2 animate-pulse rounded-[2px] bg-s-cobalt" /> : null}
                </span>
                {label}
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-[14px] leading-snug text-s-muted">
          Usually a few seconds. Slow sites take longer, which is itself a finding.
        </p>
      </div>
    </div>
  );
}
