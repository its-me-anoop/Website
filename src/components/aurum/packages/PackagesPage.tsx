"use client";

import { site } from "@/lib/site";
import { RuleCard, Plate, Reveal, TextReveal } from "@/components/fx";
import { Shell } from "../Shell";
import { CtaBand } from "../CtaBand";
import { Compare } from "../home/Compare";
import { packages, packagesFaq } from "../data";
import { Btn, CheckItem, Eyebrow, FaqList, Section, SectionHead } from "../primitives";

function PackageBody({ pkg }: { pkg: (typeof packages)[number] }) {
  return (
    <>
      <h2 className="au-display text-[25px]">{pkg.name}</h2>
      <p className="au-label mt-2 tracking-[0.18em] text-au-teal-deep">
        {pkg.strap}
      </p>
      <p className="mt-4 text-[14.5px] leading-relaxed text-au-ink-2">{pkg.copy}</p>
      <ul className="mt-7 space-y-3.5 border-t border-au-line pt-7">
        {pkg.features.map((feature) => (
          <CheckItem key={feature}>{feature}</CheckItem>
        ))}
      </ul>
      <div className="mt-auto pt-9">
        <Btn
          href={`mailto:${site.email}?subject=${encodeURIComponent(
            `Quote request — ${pkg.name} package`
          )}`}
          tone={pkg.featured ? "primary" : "plate"}
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
 * The featured tier is the only card on the page crowned by the rule.
 */
export function PackagesPage() {
  return (
    <Shell>
      <section id="top" className="relative px-5 pb-10 pt-14 text-center sm:px-8 sm:pt-20">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-au-amber/14 blur-[120px]"
        />
        <div className="relative mx-auto w-full max-w-[1240px]">
          <Reveal y={14}>
            <Eyebrow className="justify-center">Packages</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            delay={0.1}
            className="au-display-hero mx-auto mt-6 max-w-[720px] text-[clamp(2.3rem,5.6vw,3.9rem)]"
            segments={[
              { text: "Clear packages." },
              { text: "Honest quotes.", tone: "accent" },
            ]}
          />
          <Reveal delay={0.24}>
            <p className="mx-auto mt-6 max-w-[580px] text-[17px] leading-[1.6] text-au-ink-2">
              Every organisation is different, so pricing is tailored — but
              never vague. After a short call you get a written, fixed quote
              within two working days, and it does not change afterwards.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-10">
        <div className="grid items-stretch gap-6 pt-4 lg:grid-cols-3">
          {/* Every column carries the same `pt-3`, not just the featured
              one. The padding exists to leave room for the badge that
              rides above the card — but applying it to one column alone
              dropped that card's top edge 12px below its neighbours, and
              with the extra inner padding on top of that, its tier name,
              strapline and feature rules sat 20px out of line across the
              whole three-up grid. */}
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.1} className="h-full">
              <div className="relative h-full pt-3">
                {pkg.featured ? (
                  <>
                    <p className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-full bg-au-teal-deep px-4 py-1 text-[11.5px] font-semibold text-au-teal-ink shadow-[0_10px_26px_-12px_rgba(20,108,122,0.9)]">
                      Most popular
                    </p>
                    <RuleCard
                      /* Matched to the plain tiers' radius. RuleCard's
                         own 32px is right when it stands alone; beside
                         two 26px plates in the same row it just looks
                         like a different component. */
                      className="h-full rounded-[var(--r-xl)]"
                      /* Padding identical to the plain tiers, so all
                         three tier names sit on one line. The badge
                         overlaps the top edge but is centred, and the
                         content is left-aligned, so nothing collides. */
                      innerClassName="flex h-full flex-col p-7 sm:p-8"
                    >
                      <PackageBody pkg={pkg} />
                    </RuleCard>
                  </>
                ) : (
                  <Plate className="flex h-full flex-col p-7 sm:p-8">
                    <PackageBody pkg={pkg} />
                  </Plate>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="mx-auto max-w-[640px] text-center text-[13.5px] leading-relaxed text-au-muted">
            Not sure which fits? Start with the{" "}
            <a
              href="/free-audit"
              className="font-semibold text-au-teal-deep underline-offset-4 hover:underline"
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
