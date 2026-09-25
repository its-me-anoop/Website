"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { SignArrow } from "./Arrow";

/**
 * Paste a web address, press the arrow, and the instant audit runs at
 * /audit?url=…. A plain GET form, so it works before hydration and the
 * report address is shareable. The label is visible: the field says
 * what it is for, like the sign above a counter.
 */
export function AuditBar({
  className,
  label = "Paste your website address for a free instant audit",
  hideLabel,
  placeholder = "yourpractice.nhs.uk",
  hint = "About sixty checks in a few seconds. Nothing you enter is stored.",
  defaultValue = "",
  autoFocus,
}: {
  className?: string;
  label?: string;
  hideLabel?: boolean;
  placeholder?: string;
  hint?: string;
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const id = useId();

  function submit(e: FormEvent) {
    if (!value.trim()) {
      e.preventDefault();
      document.getElementById(id)?.focus();
    }
  }

  return (
    <form action="/audit" method="get" onSubmit={submit} className={cn("w-full max-w-[620px]", className)}>
      <label htmlFor={id} className={cn("mb-2.5 block text-[16px] font-bold leading-snug", hideLabel && "sr-only")}>
        {label}
      </label>
      <div className="wf-field flex h-[60px] items-stretch overflow-hidden rounded-[8px] border-2 border-wf-ink bg-white text-wf-ink">
        <span aria-hidden="true" className="wf-mono hidden items-center pl-4 pr-1 text-[15px] text-wf-muted sm:flex">
          https://
        </span>
        <input
          id={id}
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 text-[17px] placeholder:text-wf-muted sm:pl-1"
        />
        <button
          type="submit"
          aria-label="Run the free website audit"
          className="group/audit flex shrink-0 items-center gap-2 border-l-2 border-wf-ink bg-wf-sign px-4 text-[17px] font-extrabold transition-colors hover:bg-wf-sign-hover sm:px-6"
        >
          <span aria-hidden="true">Audit</span>
          <SignArrow size={19} className="transition-transform duration-300 group-hover/audit:translate-x-1" />
        </button>
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="wf-lead mt-2.5 text-[14.5px] leading-snug">
          {hint}
        </p>
      ) : null}
    </form>
  );
}
