import clsx from "clsx";
import type { PublishStatus } from "../core/types";

export function StatusBadge({ status }: { status: PublishStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-semibold",
        status === "published"
          ? "bg-[var(--cms-positive-soft)] text-[var(--cms-positive)]"
          : "bg-[var(--cms-warning-soft)] text-[var(--cms-warning)]"
      )}
    >
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-[var(--cms-ink)]">{label}</span>
      {hint ? (
        <span className="mt-1 block max-w-[68ch] text-sm leading-5 text-[var(--cms-muted)]">
          {hint}
        </span>
      ) : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export const inputClass =
  "min-h-12 w-full rounded-xl border border-[var(--cms-line-strong)] bg-[var(--cms-surface)] px-3.5 text-base text-[var(--cms-ink)] outline-none placeholder:text-[var(--cms-faint)] focus:border-[var(--cms-brand)] focus:ring-3 focus:ring-[var(--cms-focus)]";

export const textareaClass = `${inputClass} min-h-28 resize-y py-3 leading-6`;

export function EmptyState({
  title,
  copy,
  action,
}: {
  title: string;
  copy: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--cms-line-strong)] bg-[var(--cms-soft)] p-6 sm:p-8">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 max-w-[58ch] text-sm leading-6 text-[var(--cms-muted)]">{copy}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
