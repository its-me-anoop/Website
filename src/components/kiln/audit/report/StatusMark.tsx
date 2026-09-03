import { AlertTriangle, Check, Info, X } from "lucide-react";
import type { CheckStatus } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

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
