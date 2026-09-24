import { AlertTriangle, Check, Info, X } from "lucide-react";
import type { CheckStatus } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

export const statusLabel: Record<CheckStatus, string> = {
  pass: "Passed",
  warn: "Needs improvement",
  fail: "Needs fixing",
  info: "For information",
};

/** Text colour for a status on the night canvas (each ≥ 4.5:1). */
export function statusText(status: CheckStatus) {
  switch (status) {
    case "pass":
      return "text-s-pass";
    case "warn":
      return "text-s-warn";
    case "fail":
      return "text-s-fail";
    default:
      return "text-s-on-ink-2";
  }
}

/** Score colour: green when comfortable, amber when middling, red when not. */
export function scoreTone(score: number | null) {
  if (score === null) return "text-s-on-ink-2";
  if (score >= 75) return "text-s-pass";
  if (score >= 60) return "text-s-warn";
  return "text-s-fail";
}

export function scoreBar(score: number | null) {
  if (score === null) return "bg-s-line-2";
  if (score >= 75) return "bg-s-pass";
  if (score >= 60) return "bg-s-warn";
  return "bg-s-fail";
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
