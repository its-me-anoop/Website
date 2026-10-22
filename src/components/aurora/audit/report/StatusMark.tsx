import { AlertTriangle, Check, Info, X } from "lucide-react";
import { scoreBand, statusLabel } from "@/lib/audit/score";
import type { CheckStatus } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

/** Text colour for a status on the night canvas (each ≥ 4.5:1). */
export function statusText(status: CheckStatus) {
  switch (status) {
    case "pass":
      return "text-a-pass";
    case "warn":
      return "text-a-warn";
    case "fail":
      return "text-a-fail";
    default:
      return "text-a-muted";
  }
}

/** Score colour: green when comfortable, amber when middling, red when not. */
export function scoreTone(score: number | null) {
  if (score === null) return "text-a-muted";
  return { good: "text-a-pass", fair: "text-a-warn", poor: "text-a-fail" }[scoreBand(score)];
}

export function scoreBar(score: number | null) {
  if (score === null) return "bg-a-line-2";
  return {
    good: "bg-a-pass shadow-[0_0_12px_rgba(94,230,160,0.6)]",
    fair: "bg-a-warn shadow-[0_0_12px_rgba(255,200,87,0.6)]",
    poor: "bg-a-fail shadow-[0_0_12px_rgba(255,122,122,0.6)]",
  }[scoreBand(score)];
}

export function StatusMark({
  status,
  size = 15,
  className,
}: {
  status: CheckStatus;
  size?: number;
  className?: string;
}) {
  const Icon = status === "pass" ? Check : status === "warn" ? AlertTriangle : status === "fail" ? X : Info;
  return (
    <span
      role="img"
      aria-label={statusLabel[status]}
      className={cn("inline-flex shrink-0 items-center justify-center", statusText(status), className)}
    >
      <Icon size={size} strokeWidth={2.4} aria-hidden />
    </span>
  );
}
