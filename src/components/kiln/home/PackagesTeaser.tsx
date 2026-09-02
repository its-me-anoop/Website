"use client";

import { site } from "@/lib/site";
import { packages } from "../data";
import { BtnLink, CheckItem, Display, Eyebrow, Rise, Tag } from "../primitives";
import { cn } from "@/lib/utils";

/**
 * Three ways to work together. Paper cards on coal, serif names,
 * a published figure, then a plain list.
 */
export function PackageCard({
  pkg,
  index,
  headingLevel = "h3",
}: {
  pkg: (typeof packages)[number];
  index: number;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <Rise
      as="li"
      delay={index * 0.08}
      className={cn(
        "h-full",
        pkg.featured && "md:col-span-2 xl:col-span-1 md:order-first xl:order-none"
      )}
    >
      <article
        className={cn(
          "relative flex h-full flex-col rounded-[16px] bg-k-paper p-6 text-k-ink sm:p-7 xl:p-8",
          pkg.featured &&
            "shadow-[0_0_0_1px_rgba(255,138,91,0.5),0_40px_90px_-40px_rgba(255,138,91,0.55)]"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <Heading className="k-display text-[32px] leading-none">{pkg.name}</Heading>
          {pkg.featured ? <Tag tone="fire">Most popular</Tag> : null}
        </div>
        <p className="mt-2 text-[15px] text-k-ink-soft">{pkg.strap}</p>
        <p className="k-display mt-8 text-[clamp(2.1rem,3.4vw,2.75rem)] leading-none text-k-ink">
          {pkg.price}
        </p>
        <p className="mt-2 text-[15px] leading-[1.45] text-k-ink-soft">{pkg.pricePeriod}</p>
        {pkg.priceNote ? (
          <p className="mt-2 max-w-[38ch] text-[14.5px] leading-[1.5] text-k-ink-soft">
            {pkg.priceNote}
          </p>
        ) : null}
        <p className="mt-5 text-[15.5px] leading-[1.55] text-k-ink">{pkg.copy}</p>
        <ul className="mt-6 space-y-2.5 border-t border-k-line pt-6">
          {pkg.features.map((feature) => (
            <CheckItem key={feature}>{feature}</CheckItem>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <BtnLink
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              `Enquiry: ${pkg.name} package`
            )}`}
            tone={pkg.featured ? "fire" : "coal"}
            className="w-full"
          >
            {pkg.cta}
          </BtnLink>
        </div>
      </article>
    </Rise>
  );
}

export function PackagesTeaser() {
  return (
    <section id="packages">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <Rise className="max-w-[640px]">
            <Eyebrow className="text-k-coal-soft">Packages</Eyebrow>
            <Display as="h2" size="lg" className="mt-5 text-k-coal-ink">
              Three ways to work together.
            </Display>
          </Rise>
          <Rise delay={0.08}>
            <p className="max-w-[380px] text-[15px] leading-[1.55] text-k-coal-soft sm:text-[15.5px] sm:text-right">
              Published prices, plus VAT. Partnership is scoped after a short
              call, with a written quote within two working days.
            </p>
          </Rise>
        </div>
        <ul className="mt-12 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3 sm:mt-14">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </ul>
        <Rise className="mt-8 text-center">
          <BtnLink href="/packages" tone="outline-coal" arrow="right">
            Compare the packages in detail
          </BtnLink>
        </Rise>
      </div>
    </section>
  );
}
