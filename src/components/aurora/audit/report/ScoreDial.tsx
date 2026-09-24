import { useId } from "react";
import type { Grade } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

const RADIUS = 56;
const STROKE = 6;
const CIRC = 2 * Math.PI * RADIUS;

/** Arc colours for the score band: a two-stop glow along the stroke. */
function arcStops(score: number): [string, string] {
  if (score >= 75) return ["#45e3d4", "#5ee6a0"];
  if (score >= 60) return ["#ffc857", "#ff9f5a"];
  return ["#ff7d5c", "#ff7a7a"];
}

/**
 * The overall score as a large numeral inside a glowing arc that draws
 * in on load. The arc colour follows the score band.
 */
export function ScoreDial({ score, grade, className }: { score: number; grade: Grade; className?: string }) {
  const id = useId();
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRC * (1 - clamped / 100);
  const [from, to] = arcStops(score);

  return (
    <div
      className={cn("relative h-[200px] w-[200px] sm:h-[232px] sm:w-[232px]", className)}
      role="img"
      aria-label={`Overall score ${score} out of 100, grade ${grade}`}
    >
      <div aria-hidden className="absolute inset-6 rounded-full opacity-50 blur-3xl" style={{ background: from }} />
      <svg viewBox="0 0 128 128" className="relative h-full w-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id={`${id}-arc`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={STROKE} />
        <circle
          cx="64"
          cy="64"
          r={RADIUS}
          fill="none"
          stroke={`url(#${id}-arc)`}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          className="k-dial-arc"
          style={{ ["--k-dial-circ" as string]: CIRC, filter: `drop-shadow(0 0 6px ${from})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="a-display text-[72px] leading-none sm:text-[84px]">{score}</span>
        <span className="a-mono mt-1 text-[11px] uppercase tracking-[0.16em] text-a-muted">out of 100</span>
      </div>
    </div>
  );
}
