import { site } from "@/lib/site";
import type { Package } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/Reveal";
import { CheckItem } from "./Bits";
import { ButtonLink } from "./Button";

export type CardPackage = Pick<
  Package,
  "name" | "strap" | "copy" | "price" | "pricePeriod" | "priceNote" | "cta" | "features"
> & {
  featured?: boolean;
  /** Where the action goes; defaults to a prefilled enquiry email. */
  ctaHref?: string;
};

/**
 * One package as a price plate: name, the published figure, what is
 * included, one action. The featured package carries a signal-yellow
 * header strip and a heavier ink edge.
 */
export function PackageCard({
  pkg,
  index = 0,
  headingLevel = "h3",
  badge = "Most popular",
}: {
  pkg: CardPackage;
  index?: number;
  headingLevel?: "h2" | "h3";
  badge?: string;
}) {
  const Heading = headingLevel;
  const href = pkg.ctaHref ?? `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${pkg.name} package`)}`;
  return (
    <Reveal as="li" delay={index * 80} className="h-full">
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-[10px] bg-wf-card",
          pkg.featured ? "border-[3px] border-wf-ink" : "border-[1.5px] border-wf-line-2"
        )}
      >
        {pkg.featured ? (
          <p className="wf-label flex items-center justify-between bg-wf-sign px-6 py-2.5 font-bold text-wf-ink sm:px-7">
            {badge}
            <span aria-hidden="true">★</span>
          </p>
        ) : null}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <Heading className="text-[28px] font-extrabold tracking-[-0.025em]">{pkg.name}</Heading>
          <p className="mt-1.5 text-[16px] text-wf-ink-soft">{pkg.strap}</p>
          <div className="mt-8 border-y-2 border-wf-ink py-5">
            <p className="wf-display text-[clamp(2.6rem,4.2vw,3.4rem)] leading-none">{pkg.price}</p>
            <p className="wf-mono mt-2 text-[14px] text-wf-ink-soft">{pkg.pricePeriod}</p>
            {pkg.priceNote ? <p className="mt-2 text-[14.5px] leading-[1.5] text-wf-muted">{pkg.priceNote}</p> : null}
          </div>
          <p className="mt-6 text-[16px] leading-[1.6]">{pkg.copy}</p>
          <ul className="mt-6 space-y-3">
            {pkg.features.map((feature) => (
              <CheckItem key={feature}>{feature}</CheckItem>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <ButtonLink href={href} tone={pkg.featured ? "sign" : "outline"} className="w-full justify-between">
              {pkg.cta}
            </ButtonLink>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
