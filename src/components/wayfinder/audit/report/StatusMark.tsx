import { AlertTriangle, Check, Info, X } from "lucide-react";
import type { CheckStatus } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

export const statusLabel: Record<CheckStatus, string> = {
  pass: "Passed",
  warn: "Needs improvement",
  fail: "Needs fixing",
  info: "For information",
};

/** Text colour for a status on paper (each ≥ 4.5:1 on paper and paper-2). */
export function statusText(status: CheckStatus) {
  switch (status) {
    case "pass":
      return "text-wf-pass";
    case "warn":
      return "text-wf-warn";
    case "fail":
      return "text-wf-fail";
    default:
      return "text-wf-muted";
  }
}

/** Score colour: green when comfortable, amber when middling, red when not. */
export function scoreTone(score: number | null) {
  if (score === null) return "text-wf-muted";
  if (score >= 75) return "text-wf-pass";
  if (score >= 60) return "text-wf-warn";
  return "text-wf-fail";
}

export function scoreBar(score: number | null) {
  if (score === null) return "bg-wf-line-2";
  if (score >= 75) return "bg-wf-pass";
  if (score >= 60) return "bg-wf-warn";
  return "bg-wf-fail";
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
      <Icon size={size} strokeWidth={2.6} aria-hidden />
    </span>
  );
}
