"use client";

import { site } from "@/lib/site";
import type { Package } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { Reveal } from "../effects/Motion";
import { ButtonLink, CheckItem, Tag } from "./primitives";

type CardPackage = Pick<Package, "name" | "strap" | "copy" | "price" | "pricePeriod" | "priceNote" | "cta" | "features"> & {
  featured?: boolean;
  /** Where the action goes; defaults to a prefilled enquiry email. */
  ctaHref?: string;
};

/**
 * One package: name, published figure, a plain list and one action.
 * The featured package gets the rotating conic rim.
 */
export function PackageCard({
  pkg,
  index,
  headingLevel = "h3",
  badge = "Most popular",
}: {
  pkg: CardPackage;
  index: number;
  headingLevel?: "h2" | "h3";
  badge?: string;
}) {
  const Heading = headingLevel;
  const href =
    pkg.ctaHref ?? `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${pkg.name} package`)}`;
  return (
    <Reveal as="li" delay={index * 0.08} className="h-full">
      <article
        className={cn(
          "relative flex h-full flex-col rounded-[28px] p-7 sm:p-8",
          /* The conic rim and the spotlight both draw with pseudo-elements,
             so a card takes one or the other. */
          pkg.featured ? "a-conic bg-a-deep" : "a-glass a-spot"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <Heading className="a-display text-[30px]">{pkg.name}</Heading>
          {pkg.featured ? <Tag tone="amber">{badge}</Tag> : null}
        </div>
        <p className="mt-2 text-[15px] text-a-ink-soft">{pkg.strap}</p>
        <p className={cn("a-display mt-10 text-[clamp(2.6rem,4.4vw,3.6rem)]", pkg.featured && "a-grad-text")}>
          {pkg.price}
        </p>
        <p className="a-mono mt-2 text-[13px] text-a-ink-soft">{pkg.pricePeriod}</p>
        {pkg.priceNote ? (
          <p className="mt-2 max-w-[38ch] text-[14px] leading-[1.5] text-a-muted">{pkg.priceNote}</p>
        ) : null}
        <p className="mt-6 text-[15.5px] leading-[1.6] text-a-ink">{pkg.copy}</p>
        <ul className="mt-7 space-y-3 border-t border-a-line pt-7">
          {pkg.features.map((feature) => (
            <CheckItem key={feature}>{feature}</CheckItem>
          ))}
        </ul>
        <div className="mt-auto pt-9">
          <ButtonLink href={href} tone={pkg.featured ? "primary" : "glass"} className="w-full">
            {pkg.cta}
          </ButtonLink>
        </div>
      </article>
    </Reveal>
  );
}
