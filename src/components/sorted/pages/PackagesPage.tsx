"use client";

import Link from "next/link";
import { packages, packagesFaq } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { PackageCard } from "../ui/PackageCard";
import { Container, FaqList, SectionIntro } from "../ui/primitives";
import { Compare } from "./Compare";

/**
 * Packages: the three price cards straight under the hero, then the
 * anti-template table and the questions people ask before a quote.
 */
export function PackagesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Website packages & pricing"
        title={
          <>
            Website <em>packages.</em>
          </>
        }
        copy={
          <p>
            Choose how much you want to manage after launch. Hosting is included at £29 a month on a five-year term or £49 a month on a one-year term.
          </p>
        }
      />

      <section className="tone-chalk py-16 sm:py-24">
        <Container>
          <ul className="inner-price-grid">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} headingLevel="h2" />
            ))}
          </ul>
          <Reveal turn={0} className="inner-package-note">
            <p className="text-[16.5px] leading-[1.6] text-s-ink-soft">
              Not sure which fits? Start with the{" "}
              <Link href="/free-audit" className="font-semibold text-s-ink underline decoration-s-accent decoration-2 underline-offset-4">
                free website audit
              </Link>
              . It ends with a recommendation either way, including &ldquo;keep what you have&rdquo; when that is the
              honest answer.
            </p>
          </Reveal>
        </Container>
      </section>

      <Compare />

      <section className="tone-white py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <SectionIntro eyebrow="Questions" title="Before you get in touch." size="md" />
          <Reveal turn={0} delay={0.08}>
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
