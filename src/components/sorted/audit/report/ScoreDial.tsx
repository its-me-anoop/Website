import type { Grade } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

const RADIUS = 54;
const STROKE = 12;
const CIRC = 2 * Math.PI * RADIUS;

/** Arc colour for the score band: jade when comfortable, sun when middling, flame when not. */
function arcColour(score: number): string {
  if (score >= 75) return "var(--s-jade)";
  if (score >= 60) return "var(--s-sun)";
  return "var(--s-flame)";
}

/**
 * The overall score as a large numeral inside a thick flat arc that
 * draws in on load, set on a navy tile with a side. The arc colour
 * follows the score band.
 */
export function ScoreDial({ score, grade, className }: { score: number; grade: Grade; className?: string }) {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRC * (1 - clamped / 100);
  return (
    <div
      className={cn(
        "relative h-[200px] w-[200px] rounded-[20px] bg-s-navy p-4 text-white shadow-[0_8px_0_0_var(--s-cobalt)] sm:h-[232px] sm:w-[232px]",
        className
      )}
      role="img"
      aria-label={`Overall score ${score} out of 100, grade ${grade}`}
    >
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={STROKE} />
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
        <span className="s-display s-num text-[64px] sm:text-[76px]">{score}</span>
        <span className="s-label mt-1 text-[11.5px] text-[#c5c9de]">out of 100</span>
      </div>
    </div>
  );
}
