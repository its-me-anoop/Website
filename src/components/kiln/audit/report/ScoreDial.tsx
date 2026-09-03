import type { Grade } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

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
