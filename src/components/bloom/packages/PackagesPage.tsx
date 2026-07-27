"use client";

import { site } from "@/lib/site";
import { BloomShell } from "../BloomShell";
import { CtaBand } from "../CtaBand";
import { Compare } from "../home/Compare";
import { packages, packagesFaq } from "../data";
import {
  BtnLink,
  CheckItem,
  FaqList,
  Rise,
  RevealWords,
  SectionHead,
} from "../primitives";

function PackageCard({
  pkg,
  index,
}: {
  pkg: (typeof packages)[number];
  index: number;
}) {
  return (
    <Rise delay={index * 0.1} className="h-full">
      <article
        className={
          pkg.featured
            ? "bl-card relative flex h-full flex-col rounded-[26px] border-2 border-bl-teal bg-bl-surface p-7 sm:p-8"
            : "flex h-full flex-col rounded-[26px] border border-bl-line bg-bl-surface p-7 sm:p-8"
        }
      >
        {pkg.featured ? (
          <p className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-bl-teal px-4 py-1 text-[12px] font-semibold text-white">
            Most popular
          </p>
        ) : null}
        <h2 className="text-[20px] font-semibold tracking-tight text-bl-ink">
          {pkg.name}
        </h2>
        <p className="mt-1 text-[13.5px] font-medium text-bl-teal">{pkg.strap}</p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-bl-ink-soft">
          {pkg.copy}
        </p>
        <ul className="mt-6 space-y-3 border-t border-bl-line pt-6">
          {pkg.features.map((feature) => (
            <CheckItem key={feature}>{feature}</CheckItem>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <BtnLink
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              `Quote request — ${pkg.name} package`
            )}`}
            tone={pkg.featured ? "teal" : "outline"}
            className="w-full"
          >
            Get a tailored quote
          </BtnLink>
        </div>
      </article>
    </Rise>
  );
}

export function PackagesPage() {
  return (
    <BloomShell>
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="bl-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-14 pt-14 text-center sm:px-8 sm:pt-20">
          <Rise>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-bl-teal">
              Packages
            </p>
          </Rise>
          <RevealWords
            as="h1"
            delay={0.08}
            className="mx-auto mt-4 max-w-[680px] text-[clamp(2.2rem,5.6vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em]"
            segments={[
              { text: "Clear packages." },
              { text: "Honest quotes.", tone: "teal" },
            ]}
          />
          <Rise delay={0.2}>
            <p className="mx-auto mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-bl-ink-soft">
              Every organisation is different, so pricing is tailored — but
              never vague. After a short call you get a written, fixed quote
              within two working days, and it does not change afterwards.
            </p>
          </Rise>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="grid items-stretch gap-5 pt-4 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>
        <Rise className="mt-8">
          <p className="mx-auto max-w-[640px] text-center text-[13.5px] leading-relaxed text-bl-muted">
            Not sure which fits? Start with the{" "}
            <a href="/free-audit" className="font-medium text-bl-teal underline-offset-2 hover:underline">
              free website audit
            </a>{" "}
            — it ends with a recommendation either way, including “keep what
            you have” when that is the honest answer.
          </p>
        </Rise>
      </section>

      <Compare />

      <section className="mx-auto w-full max-w-[860px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          eyebrow="Questions"
          title={[
            { text: "Before you ask" },
            { text: "for a quote.", tone: "muted" },
          ]}
        />
        <Rise className="mt-12">
          <FaqList items={packagesFaq} />
        </Rise>
      </section>

      <CtaBand
        title="Tell Flutterly what you need"
        copy="A short call or email is enough to scope most projects — and every conversation ends with a clear, written next step."
        id="contact"
      />
    </BloomShell>
  );
}
