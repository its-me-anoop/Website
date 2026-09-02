"use client";

import { site } from "@/lib/site";
import { AuditBar, BtnLink, Display, Rise } from "./primitives";

/**
 * Closing band above the footer on every Kiln page: a serif
 * statement, the audit bar, and a direct email. Copy is configurable
 * per page; the actions are constant.
 */
export function CtaBand({
  title,
  copy,
  id,
}: {
  title: React.ReactNode;
  copy: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="on-coal relative overflow-hidden border-t border-k-coal-line bg-k-coal text-k-coal-ink"
    >
      <div aria-hidden className="k-dots absolute inset-0 opacity-70" />
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <Rise className="max-w-[760px]">
          <Display as="h2" size="lg">
            {title}
          </Display>
          <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-k-coal-soft">
            {copy}
          </p>
        </Rise>
        <Rise delay={0.1} className="mt-10 flex w-full justify-center">
          <AuditBar onCoal />
        </Rise>
        <Rise delay={0.18} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[15px] text-k-coal-soft">
          <span>Or write directly:</span>
          <BtnLink href={`mailto:${site.email}`} tone="outline-coal" size="sm">
            {site.email}
          </BtnLink>
          <span>A reply within one working day.</span>
        </Rise>
      </div>
    </section>
  );
}
