"use client";

import { site } from "@/lib/site";
import { BeamCard, GlassCard, Reveal, TextReveal } from "@/components/fx";
import { Shell } from "../Shell";
import { CtaBand } from "../CtaBand";
import { Compare } from "../home/Compare";
import { packages, packagesFaq } from "../data";
import { Btn, CheckItem, Eyebrow, FaqList, Section, SectionHead } from "../primitives";

function PackageBody({ pkg }: { pkg: (typeof packages)[number] }) {
  return (
    <>
      {pkg.featured ? (
        <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-au-teal px-4 py-1 text-[11.5px] font-semibold text-au-teal-ink shadow-[0_10px_30px_-12px_rgba(47,216,173,0.9)]">
          Most popular
        </p>
      ) : null}
      <h2 className="text-[22px] font-semibold tracking-tight text-au-ink">
        {pkg.name}
      </h2>
      <p className="au-mono mt-1.5 text-[12px] uppercase tracking-[0.18em] text-au-teal">
        {pkg.strap}
      </p>
      <p className="mt-4 text-[14.5px] leading-relaxed text-au-ink-2">{pkg.copy}</p>
      <ul className="mt-7 space-y-3.5 border-t border-white/8 pt-7">
        {pkg.features.map((feature) => (
          <CheckItem key={feature}>{feature}</CheckItem>
        ))}
      </ul>
      <div className="mt-auto pt-9">
        <Btn
          href={`mailto:${site.email}?subject=${encodeURIComponent(
            `Quote request — ${pkg.name} package`
          )}`}
          tone={pkg.featured ? "primary" : "glass"}
          magnetic={false}
          className="w-full"
        >
          Get a tailored quote
        </Btn>
      </div>
    </>
  );
}

/**
 * Packages are presented without hard prices — quotes are tailored
 * after a short scoping call, which is how the studio actually works.
 * The featured tier is the only element on the page wearing the beam.
 */
export function PackagesPage() {
  return (
    <Shell>
      <section id="top" className="relative px-5 pb-10 pt-14 text-center sm:px-8 sm:pt-20">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-au-teal/12 blur-[120px]"
        />
        <div className="relative mx-auto w-full max-w-[1240px]">
          <Reveal y={14} blur={4}>
            <Eyebrow className="justify-center">Packages</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            delay={0.1}
            className="mx-auto mt-6 max-w-[720px] text-[clamp(2.3rem,5.8vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.04em]"
            segments={[
              { text: "Clear packages." },
              { text: "Honest quotes.", tone: "gradient" },
            ]}
          />
          <Reveal delay={0.24}>
            <p className="mx-auto mt-6 max-w-[580px] text-[16.5px] leading-relaxed text-au-ink-2">
              Every organisation is different, so pricing is tailored — but
              never vague. After a short call you get a written, fixed quote
              within two working days, and it does not change afterwards.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-10">
        <div className="grid items-stretch gap-6 pt-4 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.1} className="h-full">
              {pkg.featured ? (
                <BeamCard
                  className="h-full"
                  innerClassName="flex h-full flex-col p-7 sm:p-8"
                >
                  <PackageBody pkg={pkg} />
                </BeamCard>
              ) : (
                <GlassCard className="flex h-full flex-col p-7 sm:p-8">
                  <PackageBody pkg={pkg} />
                </GlassCard>
              )}
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="mx-auto max-w-[640px] text-center text-[13.5px] leading-relaxed text-au-muted">
            Not sure which fits? Start with the{" "}
            <a
              href="/free-audit"
              className="font-medium text-au-teal underline-offset-4 hover:underline"
            >
              free website audit
            </a>{" "}
            — it ends with a recommendation either way, including &ldquo;keep
            what you have&rdquo; when that is the honest answer.
          </p>
        </Reveal>
      </Section>

      <Compare />

      <Section width="narrow">
        <SectionHead
          eyebrow="Questions"
          title={[
            { text: "Before you ask" },
            { text: "for a quote.", tone: "muted" },
          ]}
        />
        <FaqList items={packagesFaq} className="mt-12" />
      </Section>

      <CtaBand
        title="Tell Flutterly what you need"
        copy="A short call or email is enough to scope most projects — and every conversation ends with a clear, written next step."
        id="contact"
      />
    </Shell>
  );
}
