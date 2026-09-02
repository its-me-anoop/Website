"use client";

import { ticker } from "../data";

/**
 * Slow marquee of client names interleaved with plain commitments.
 * The list is duplicated once for a seamless loop; the copy is
 * announced once and the copy is hidden from assistive tech.
 */
export function Ticker() {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8 text-[14px] text-k-ink-soft"
    >
      {ticker.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
          <span className={i % 2 === 0 ? "k-display text-[20px] text-k-ink" : ""}>
            {item}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-k-fire" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Clients and commitments" className="border-y border-k-line py-5">
      <div className="k-ticker overflow-hidden">
        <div className="flex w-max animate-marquee [--marquee-duration:70s] motion-reduce:animate-none">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
