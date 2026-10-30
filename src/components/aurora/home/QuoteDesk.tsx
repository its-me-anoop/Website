"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  quoteAlternative,
  quotePackage,
  quotePaths,
  type QuotePathId,
} from "@/lib/marketing/quote";
import { cn } from "@/lib/utils";

/**
 * A paper figure laid on the night hero. The buyer picks the organisation
 * they run and reads the published build price before they book. The
 * choice is carried to /book so the call starts from that figure.
 */
export function QuoteDesk({ className }: { className?: string }) {
  const [selected, setSelected] = useState<QuotePathId>("gp");
  const groupId = useId();
  const path = quotePaths.find((item) => item.id === selected) ?? quotePaths[0];
  const pkg = quotePackage(path);

  return (
    <section
      id="figure"
      aria-labelledby="figure-title"
      className={cn(
        "a-paper scroll-mt-28 w-full rounded-[28px] border border-white/15 px-5 py-6 text-a-ink sm:px-6 sm:py-7",
        className
      )}
    >
      <h2 id="figure-title" className="a-eyebrow">
        Published price
      </h2>

      <div aria-live="polite" aria-atomic="true" className="mt-5">
        <p className="sr-only">{path.label}</p>
        <p className="a-mono text-[12px] uppercase tracking-[0.14em] text-a-muted">{pkg.name}</p>
        <p id="figure-price" className="a-display mt-1 text-[clamp(3.25rem,6vw,4.5rem)] leading-none">
          {pkg.price}
        </p>
        <p className="mt-3 text-[15px] leading-snug text-a-ink-soft">{pkg.pricePeriod}</p>
        {pkg.priceNote ? <p className="mt-1 text-[14px] leading-snug text-a-muted">{pkg.priceNote}</p> : null}
      </div>

      <fieldset className="mt-6 border-0 p-0">
        <legend className="a-mono text-[11px] uppercase tracking-[0.14em] text-a-muted">What do you run?</legend>
        <div className="mt-2.5 grid gap-1.5">
          {quotePaths.map((item, index) => (
            <label
              key={item.id}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-3 rounded-[12px] border border-transparent px-2.5 text-[16px] leading-none transition-colors",
                "hover:bg-black/[0.04] has-[:checked]:border-[#17140f] has-[:checked]:bg-[#17140f] has-[:checked]:text-[#f6f1e8] has-[:checked]:hover:bg-[#17140f]"
              )}
            >
              <input
                type="radio"
                name={groupId}
                value={item.id}
                checked={item.id === path.id}
                onChange={() => setSelected(item.id)}
                className="h-4 w-4 shrink-0 accent-[#ffb020]"
              />
              <span aria-hidden="true" className="a-mono w-6 text-[11px] tracking-[0.08em] opacity-70">
                0{index + 1}
              </span>
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mt-5 text-[15.5px] leading-[1.55] text-a-ink">{path.outcome}</p>
      <p className="mt-2 text-[14px] leading-[1.5] text-a-muted">{quoteAlternative(path)}</p>

      <Link
        href={`/book?for=${path.id}`}
        data-magnetic
        data-cursor={path.bookLabel}
        className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-a-amber px-5 text-center text-[16.5px] font-medium text-a-void transition-colors duration-300 hover:bg-a-amber-hover"
      >
        {path.bookLabel}
        <ArrowRight size={18} aria-hidden />
      </Link>

      <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
        {path.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              data-cursor={link.label}
              className="text-[14.5px] text-a-ink underline decoration-a-line-2 underline-offset-[5px] transition-colors hover:decoration-[#b4421a]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
