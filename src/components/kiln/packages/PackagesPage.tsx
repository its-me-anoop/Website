"use client";

import { KilnShell } from "../KilnShell";
import { CtaBand } from "../CtaBand";
import { Compare } from "../home/Compare";
import { PackageCard } from "../home/PackagesTeaser";
import { packages, packagesFaq } from "../data";
import { Display, Eyebrow, FaqList, Rise, SectionHead } from "../primitives";

/**
 * Packages page. Opens on coal like a pricing page should, with the
 * three paper cards, then the anti-template table and the questions
 * people ask before requesting a quote.
 */
export function PackagesPage() {
  return (
    <KilnShell>
      <section id="top" className="on-coal relative overflow-hidden bg-k-coal pt-32 text-k-coal-ink sm:pt-40">
        <div aria-hidden className="k-dots absolute inset-0 opacity-70" />
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center sm:px-8">
          <Rise>
            <Eyebrow className="text-k-coal-soft">Packages</Eyebrow>
          </Rise>
          <Rise delay={0.06}>
            <Display as="h1" size="xl" className="mt-6 max-w-[16ch]">
              Clear packages. <em>Honest</em> quotes.
            </Display>
          </Rise>
          <Rise delay={0.14}>
            <p className="mx-auto mt-7 max-w-[600px] text-[17.5px] leading-[1.6] text-k-coal-soft">
              Every organisation is different, so pricing is tailored, never
              vague. After a short call you get a written, fixed quote within
              two working days, and it does not change afterwards.
            </p>
          </Rise>
        </div>

        <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-24 pt-16 sm:px-8 sm:pb-32">
          <ul className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} headingLevel="h2" />
            ))}
          </ul>
          <Rise className="mt-10">
            <p className="mx-auto max-w-[640px] text-center text-[14.5px] leading-[1.6] text-k-coal-soft">
              Not sure which fits? Start with the{" "}
              <a
                href="/free-audit"
                className="text-k-coal-ink underline decoration-k-coal-line underline-offset-4 hover:decoration-k-coal-ink"
              >
                free website audit
              </a>
              . It ends with a recommendation either way, including &ldquo;keep
              what you have&rdquo; when that is the honest answer.
            </p>
          </Rise>
        </div>
      </section>

      <Compare />

      <section className="mx-auto w-full max-w-[860px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead
          eyebrow="Questions"
          title="Before you ask for a quote."
          align="left"
          size="md"
        />
        <Rise className="mt-12">
          <FaqList items={packagesFaq} />
        </Rise>
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
    </KilnShell>
  );
}
