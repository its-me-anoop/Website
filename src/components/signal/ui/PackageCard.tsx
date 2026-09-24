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
 * The featured package is set on paper so it reads first.
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
  const paper = !!pkg.featured;
  return (
    <Reveal as="li" delay={index * 0.06} className="h-full">
      <article
        className={cn(
          "flex h-full flex-col rounded-[4px] p-7 sm:p-8",
          paper ? "s-paper" : "border border-s-line-2"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <Heading className="s-display text-[34px]">{pkg.name}</Heading>
          {paper ? <Tag tone="signal">{badge}</Tag> : null}
        </div>
        <p className={cn("mt-2 text-[16px]", paper ? "text-s-on-paper-2" : "text-s-on-ink-2")}>{pkg.strap}</p>
        <p className="s-display mt-10 text-[clamp(3rem,5vw,4.2rem)]">{pkg.price}</p>
        <p className={cn("mt-2 text-[15.5px]", paper ? "text-s-on-paper-2" : "text-s-on-ink-2")}>{pkg.pricePeriod}</p>
        {pkg.priceNote ? (
          <p className={cn("mt-1 max-w-[38ch] text-[15px] leading-[1.5]", paper ? "text-s-on-paper-2" : "text-s-on-ink-2")}>
            {pkg.priceNote}
          </p>
        ) : null}
        <p className="mt-6 text-[17px] leading-[1.55]">{pkg.copy}</p>
        <ul className={cn("mt-7 space-y-3 border-t pt-7", paper ? "border-s-line-paper" : "border-s-line")}>
          {pkg.features.map((feature) => (
            <CheckItem key={feature} onPaper={paper}>
              {feature}
            </CheckItem>
          ))}
        </ul>
        <div className="mt-auto pt-9">
          <ButtonLink href={href} tone={paper ? "ink" : "signal"} className="w-full">
            {pkg.cta}
          </ButtonLink>
        </div>
      </article>
    </Reveal>
  );
}
