"use client";

import { useId } from "react";
import { site } from "@/lib/site";
import type { Package } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { Reveal } from "../effects/Motion";
import { ButtonLink, CheckItem, Tag } from "./primitives";

type CardPackage = Pick<Package, "name" | "strap" | "copy" | "price" | "pricePeriod" | "priceNote" | "cta" | "features" | "monthly"> & {
  featured?: boolean;
  /** Where the action goes; defaults to a prefilled enquiry email. */
  ctaHref?: string;
};

/**
 * One package as a price card that tips up into place: name, published
 * figure, what the build delivers and what the monthly fee covers, and
 * one action. The featured package is set on navy with a sun label.
 */
export function PackageCard({
  pkg,
  index,
  headingLevel = "h3",
  badge = "Build plus ongoing care",
}: {
  pkg: CardPackage;
  index: number;
  headingLevel?: "h2" | "h3";
  badge?: string;
}) {
  const Heading = headingLevel;
  const href = pkg.ctaHref ?? `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${pkg.name} package`)}`;
  return (
    <Reveal as="li" turn={50} delay={index * 0.12} className="h-full">
      <article
        className={cn(
          "relative flex h-full flex-col rounded-[16px] border-2 border-s-navy p-6 shadow-[0_8px_0_0_var(--s-navy)] sm:p-8",
          pkg.featured ? "tone-navy" : "tone-white"
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Heading className="s-display text-[30px]">{pkg.name}</Heading>
          {pkg.featured ? <Tag tone="sun">{badge}</Tag> : null}
        </div>
        <p className="mt-2 text-[15.5px] text-s-ink-soft">{pkg.strap}</p>
        <p className="s-display s-num mt-8 text-[clamp(3rem,5vw,4rem)]">{pkg.price}</p>
        <p className="mt-2 text-[15px] font-semibold text-s-ink">{pkg.pricePeriod}</p>
        {pkg.priceNote ? <p className="mt-1 max-w-[38ch] text-[14.5px] leading-[1.5] text-s-muted">{pkg.priceNote}</p> : null}
        <p className="mt-6 text-[16px] leading-[1.55] text-s-ink">{pkg.copy}</p>

        {pkg.monthly?.length ? (
          <>
            <IncludedList label="The build" items={pkg.features} />
            <IncludedList label="Every month" items={pkg.monthly} />
          </>
        ) : (
          <ul className="mt-7 space-y-3 border-t-2 border-s-line-2 pt-6">
            {pkg.features.map((feature) => (
              <CheckItem key={feature}>{feature}</CheckItem>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-9">
          <ButtonLink href={href} tone={pkg.featured ? "primary" : "navy"} className="w-full">
            {pkg.cta}
          </ButtonLink>
        </div>
      </article>
    </Reveal>
  );
}

/** A labelled group of inclusions; the label names the list for screen readers. */
function IncludedList({ label, items }: { label: string; items: readonly string[] }) {
  const id = useId();
  return (
    <div className="mt-7 border-t-2 border-s-line-2 pt-5">
      <p id={id} className="s-label text-[12.5px] text-s-muted">
        {label}
      </p>
      <ul aria-labelledby={id} className="mt-4 space-y-3">
        {items.map((item) => (
          <CheckItem key={item}>{item}</CheckItem>
        ))}
      </ul>
    </div>
  );
}
