import type { Grade } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

const RADIUS = 56;
const STROKE = 9;
const CIRC = 2 * Math.PI * RADIUS;

function arcColour(score: number) {
  if (score >= 75) return "var(--s-pass)";
  if (score >= 60) return "var(--s-warn)";
  return "var(--s-fail)";
}

/**
 * The overall score as a large numeral inside a thick arc that draws in
 * on load. The arc colour follows the score band; the numeral stays ink.
 */
export function ScoreDial({ score, grade, className }: { score: number; grade: Grade; className?: string }) {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRC * (1 - clamped / 100);

  return (
    <div
      className={cn("relative h-[200px] w-[200px] sm:h-[232px] sm:w-[232px]", className)}
      role="img"
      aria-label={`Overall score ${score} out of 100, grade ${grade}`}
    >
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="var(--s-line)" strokeWidth={STROKE} />
        <circle
          cx="64"
          cy="64"
          r={RADIUS}
          fill="none"
          stroke={arcColour(score)}
          strokeWidth={STROKE}
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          className="k-dial-arc"
          style={{ ["--k-dial-circ" as string]: CIRC }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="s-display text-[76px] leading-none sm:text-[88px]">{score}</span>
        <span className="s-label mt-1 text-[11px] text-s-on-ink-2">out of 100</span>
      </div>
    </div>
  );
}
