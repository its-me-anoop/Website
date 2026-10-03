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
 * The featured package is set in ink and carries the amber action.
 */
export function PackageCard({
  pkg,
  index,
  headingLevel = "h3",
  badge = "Most chosen",
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
    <Reveal as="li" delay={index * 0.1} className="h-full">
      <article
        className={cn(
          "a-card a-card-hover relative flex h-full flex-col rounded-[22px] p-7 sm:p-8",
          pkg.featured && "a-on-ink border-transparent"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <Heading className="a-display text-[30px]">{pkg.name}</Heading>
          {pkg.featured ? <Tag tone="amber">{badge}</Tag> : null}
        </div>
        <p className="mt-2 text-[15px] text-a-ink-soft">{pkg.strap}</p>
        <p className="a-display mt-9 text-[clamp(2.6rem,4.4vw,3.4rem)]">{pkg.price}</p>
        <p className="mt-2 text-[14px] text-a-ink-soft">{pkg.pricePeriod}</p>
        {pkg.priceNote ? (
          <p className="mt-1 max-w-[38ch] text-[14px] leading-[1.5] text-a-muted">{pkg.priceNote}</p>
        ) : null}
        <p className="mt-6 text-[15.5px] leading-[1.6] text-a-ink">{pkg.copy}</p>
        <ul className="mt-7 space-y-3 border-t border-a-line pt-7">
          {pkg.features.map((feature) => (
            <CheckItem key={feature}>{feature}</CheckItem>
          ))}
        </ul>
        <div className="mt-auto pt-9">
          <ButtonLink href={href} tone={pkg.featured ? "primary" : "outline"} className="w-full">
            {pkg.cta}
          </ButtonLink>
        </div>
      </article>
    </Reveal>
  );
}
