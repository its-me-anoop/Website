"use client";

import { trustedBy } from "../data";
import { Rise } from "../primitives";

export function TrustBar() {
  return (
    <section aria-label="Selected client work and products" className="border-y border-bl-line bg-bl-canvas">
      <Rise className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center gap-x-9 gap-y-3 px-5 py-7 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bl-muted">
          Client work &amp; products
        </p>
        {trustedBy.map((name) => (
          <span
            key={name}
            className="text-[14.5px] font-semibold tracking-tight text-bl-ink-soft/80"
          >
            {name}
          </span>
        ))}
      </Rise>
    </section>
  );
}
