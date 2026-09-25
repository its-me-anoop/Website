import type { Grade } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

const RADIUS = 54;
const STROKE = 12;
const CIRC = 2 * Math.PI * RADIUS;

/** Arc colour for the score band, from the status tokens. */
function arcColour(score: number) {
  if (score >= 75) return "var(--wf-pass)";
  if (score >= 60) return "var(--wf-warn)";
  return "var(--wf-fail)";
}

/**
 * The overall score as a heavy numeral inside a thick gauge arc that
 * draws in on load, like a dial on a meter. The arc colour follows the
 * score band.
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
        <circle cx="64" cy="64" r={RADIUS} fill="var(--wf-card)" stroke="var(--wf-paper-2)" strokeWidth={STROKE} />
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
        <circle cx="64" cy="64" r={RADIUS + STROKE / 2 + 1} fill="none" stroke="var(--wf-ink)" strokeWidth={2} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="wf-display text-[72px] leading-none tabular-nums sm:text-[84px]">{score}</span>
        <span className="wf-label mt-1 text-wf-ink-soft">out of 100</span>
      </div>
    </div>
  );
}
