import type { ReactNode } from "react";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import type { CheckStatus, Grade } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

/*
 * Paper-first pieces for the printed audit report. The on-screen report
 * runs the Signal language; the PDF keeps the light bone-and-coal
 * palette (the --k-* tokens) because it is printed and handed round.
 */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("k-eyebrow", className)}>{children}</p>;
}

export function Tag({
  children,
  tone = "bone",
  className,
}: {
  children: ReactNode;
  tone?: "bone" | "butter" | "fire" | "coal";
  className?: string;
}) {
  const tones = {
    bone: "bg-k-bone-2 text-k-ink-soft",
    butter: "bg-k-butter text-k-ink",
    fire: "bg-k-fire text-k-bone",
    coal: "bg-k-coal text-k-coal-ink",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] px-2 py-1 text-[11px] font-medium leading-none",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export const statusLabel: Record<CheckStatus, string> = {
  pass: "Passed",
  warn: "Needs improvement",
  fail: "Needs fixing",
  info: "For information",
};

/** Text colour for a status on bone or coal. */
export function statusText(status: CheckStatus, onCoal?: boolean) {
  switch (status) {
    case "pass":
      return onCoal ? "text-k-moss-lite" : "text-k-moss";
    case "warn":
      return onCoal ? "text-k-ochre-lite" : "text-k-ochre";
    case "fail":
      return onCoal ? "text-k-fire-lite" : "text-k-fire";
    default:
      return onCoal ? "text-k-coal-soft" : "text-k-muted";
  }
}

/** Score colour: green when comfortable, amber when middling, fire when not. */
export function scoreTone(score: number | null, onCoal?: boolean) {
  if (score === null) return onCoal ? "text-k-coal-soft" : "text-k-muted";
  if (score >= 75) return onCoal ? "text-k-moss-lite" : "text-k-moss";
  if (score >= 60) return onCoal ? "text-k-ochre-lite" : "text-k-ochre";
  return onCoal ? "text-k-fire-lite" : "text-k-fire";
}

export function scoreBar(score: number | null) {
  if (score === null) return "bg-k-line-2";
  if (score >= 75) return "bg-k-moss";
  if (score >= 60) return "bg-k-ochre";
  return "bg-k-fire";
}

export function StatusMark({
  status,
  onCoal,
  size = 15,
  className,
}: {
  status: CheckStatus;
  onCoal?: boolean;
  size?: number;
  className?: string;
}) {
  const Icon = status === "pass" ? Check : status === "warn" ? AlertTriangle : status === "fail" ? X : Info;
  return (
    <span
      role="img"
      aria-label={statusLabel[status]}
      className={cn("inline-flex shrink-0 items-center justify-center", statusText(status, onCoal), className)}
    >
      <Icon size={size} strokeWidth={2.4} aria-hidden />
    </span>
  );
}


const RADIUS = 56;
const STROKE = 7;
const CIRC = 2 * Math.PI * RADIUS;

/**
 * The overall score as a serif numeral inside a thin arc. The arc colour
 * follows the score; the numeral stays ink so it reads first.
 */
export function ScoreDial({
  score,
  grade,
  className,
}: {
  score: number;
  grade: Grade;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRC * (1 - clamped / 100);
  const stroke = score >= 75 ? "var(--k-moss)" : score >= 60 ? "var(--k-ochre)" : "var(--k-fire)";

  return (
    <div
      className={cn("relative h-[176px] w-[176px] sm:h-[208px] sm:w-[208px]", className)}
      role="img"
      aria-label={`Overall score ${score} out of 100, grade ${grade}`}
    >
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="var(--k-line)" strokeWidth={STROKE} />
        <circle
          cx="64"
          cy="64"
          r={RADIUS}
          fill="none"
          stroke={stroke}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          className="k-dial-arc"
          style={{ ["--k-dial-circ" as string]: CIRC }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="k-display text-[64px] leading-none text-k-ink sm:text-[76px]">{score}</span>
        <span className="mt-1 text-[12px] font-medium uppercase tracking-[0.14em] text-k-muted">
          out of 100
        </span>
      </div>
    </div>
  );
}
