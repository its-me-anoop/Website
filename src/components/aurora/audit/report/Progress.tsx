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
 * Coal panel shown while the API works: the address in a browser pill
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
    <div className="mx-auto w-full max-w-[640px] rounded-[18px] bg-a-deep p-2 text-a-ink shadow-[0_40px_90px_-40px_rgba(23,20,15,0.6)]">
      <div className="flex items-center gap-2 px-2 pb-2 pt-1">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="ml-1 truncate rounded-[6px] bg-white/[0.04] px-2.5 py-1 text-[11.5px] text-a-ink-soft">
          {host}
        </span>
      </div>
      <div className="rounded-[12px] bg-white/[0.04] px-5 py-6 sm:px-7 sm:py-8">
        <div className="flex items-center gap-3">
          <Image src="/flutterly-logo.png" alt="" width={22} height={22} className="opacity-90" />
          <p className="a-display text-[22px] text-a-ink sm:text-[26px]">
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
                  "flex items-center gap-3 text-[15px] transition-colors duration-300",
                  done ? "text-a-ink-soft" : active ? "text-a-ink" : "text-a-muted/60"
                )}
                aria-current={active ? "step" : undefined}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1",
                    done ? "bg-a-amber/15 ring-a-amber/40 text-a-amber" : active ? "ring-a-amber" : "ring-a-line-2"
                  )}
                >
                  {done ? <Check size={12} strokeWidth={3} /> : active ? <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-a-amber" /> : null}
                </span>
                {label}
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-[13.5px] leading-snug text-a-ink-soft">
          Usually a few seconds. Slow sites take longer, which is itself a finding.
        </p>
      </div>
    </div>
  );
}
