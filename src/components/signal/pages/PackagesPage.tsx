"use client";

import Link from "next/link";
import { packages, packagesFaq } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { Compare } from "../home/Compare";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { PackageCard } from "../ui/PackageCard";
import { Container, FaqList, SectionIntro } from "../ui/primitives";

/**
 * Packages: the three cards straight under the hero, then the
 * anti-template table and the questions people ask before a quote.
 */
export function PackagesPage() {
  return (
    <Shell>
      <PageHero
        label="Packages and pricing"
        title={
          <>
            Clear packages. <em>Honest</em> prices.
          </>
        }
        copy={
          <p>
            Essentials is a one-off build with year-one hosting included. Standard adds a monthly care plan.
            Partnership is for organisations that want a digital partner, quoted after a short call. All prices
            exclude VAT.
          </p>
        }
      />

      <section className="pb-24">
        <Container>
          <ul className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} headingLevel="h2" />
            ))}
          </ul>
          <Reveal className="mt-10 max-w-[680px]">
            <p className="text-[17px] leading-[1.6] text-s-on-ink-2">
              Not sure which fits? Start with the{" "}
              <Link href="/free-audit" className="text-s-on-ink underline decoration-s-signal decoration-2 underline-offset-4">
                free website audit
              </Link>
              . It ends with a recommendation either way, including &ldquo;keep what you have&rdquo; when that is the
              honest answer.
            </p>
          </Reveal>
        </Container>
      </section>

      <Compare />

      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <SectionIntro label="Questions" title="Before you get in touch." size="md" />
          <Reveal delay={0.08}>
            <FaqList items={packagesFaq} />
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Tell Flutterly what you <em>need</em>.
          </>
        }
        copy="A short call or email is enough to scope most projects, and every conversation ends with a clear, written next step."
        id="contact"
      />
    </Shell>
  );
}
