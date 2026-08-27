"use client";

import { site } from "@/lib/site";
import { BtnLink, Rise } from "./primitives";

/**
 * Full-width pine call-to-action band used above the footer on every
 * Bloom page. Copy is configurable per page; the actions are constant:
 * free audit, email, phone.
 */
export function CtaBand({
  title,
  copy,
  id,
  primaryLabel = "Discuss your project",
  primaryHref = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`,
  secondaryLabel = "Get a free website audit",
  secondaryHref = "/free-audit",
}: {
  title: string;
  copy: string;
  id?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section id={id} className="bg-bl-pine text-bl-pine-ink">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        <Rise className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(1.9rem,4.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-bl-pine-ink/70">
            {copy}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BtnLink href={primaryHref} tone="teal">
              {primaryLabel}
            </BtnLink>
            <BtnLink href={secondaryHref} tone="white">
              {secondaryLabel}
            </BtnLink>
          </div>
          <p className="mt-6 text-[15px] font-medium text-bl-pine-ink/80">
            Every enquiry gets a reply within one working day.
          </p>
        </Rise>
      </div>
    </section>
  );
}
