"use client";

import { KilnShell } from "../KilnShell";
import { CtaBand } from "../CtaBand";
import type { Sector } from "../data";
import {
  BrowserFrame,
  BtnLink,
  CheckItem,
  Display,
  Eyebrow,
  FaqList,
  Rise,
  SectionHead,
} from "../primitives";

/**
 * Shared landing-page template for the GP-practice and care-home
 * sectors, entirely data-driven from `Sector` so both pages stay
 * consistent as the offer evolves.
 */
export function SectorPage({ sector }: { sector: Sector }) {
  return (
    <KilnShell>
      {/* Hero: centred serif statement, then the sample site large. */}
      <section id="top" className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center sm:px-8">
          <Rise>
            <Eyebrow className="text-k-muted">{sector.eyebrow}</Eyebrow>
          </Rise>
          <Rise delay={0.06}>
            <Display as="h1" size="xl" className="mt-5 max-w-[18ch] text-k-ink sm:mt-6">
              {sector.headline}
              {sector.headlineEm ? (
                <>
                  {" "}
                  <em>{sector.headlineEm}</em>
                </>
              ) : null}
            </Display>
          </Rise>
          <Rise delay={0.14}>
            <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-[1.6] text-k-ink-soft sm:mt-7 sm:text-[17.5px]">
              {sector.intro}
            </p>
          </Rise>
          <Rise delay={0.22} className="mt-8 flex w-full max-w-[420px] flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
            <BtnLink href="/free-audit" tone="fire" size="lg" arrow="right" className="w-full sm:w-auto">
              Get your free audit
            </BtnLink>
            <BtnLink href={sector.demo.href} tone="outline" size="lg" className="w-full sm:w-auto">
              Open the sample site
            </BtnLink>
          </Rise>
        </div>

        <Rise delay={0.3} className="mx-auto mt-12 w-full max-w-[1120px] px-5 sm:mt-16 sm:px-8">
          <BrowserFrame
            src={sector.demo.image}
            alt={sector.demo.imageAlt}
            url={`flutterly.uk${sector.demo.href}`}
            priority
            sizes="(min-width: 1200px) 1120px, 92vw"
          />
        </Rise>

        <div className="mx-auto mt-10 w-full max-w-[1280px] px-5 pb-20 sm:mt-12 sm:px-8 sm:pb-32">
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-3 sm:gap-x-10">
            {sector.heroPoints.map((point, i) => (
              <Rise as="li" key={point} delay={0.35 + i * 0.06} className="border-t border-k-line pt-5">
                <span className="text-[15.5px] leading-[1.55] text-k-ink">{point}</span>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      {/* What the website does: numbered editorial rows, no cards. */}
      <section className="border-t border-k-line bg-k-bone-2/60">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <Rise>
              <Eyebrow className="text-k-muted">What the website does</Eyebrow>
              <Display as="h2" size="md" className="mt-5 text-k-ink">
                Designed around real journeys, not page templates.
              </Display>
            </Rise>
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {sector.features.map((feature, i) => (
                <Rise as="li" key={feature.title} delay={(i % 2) * 0.06} className="border-t border-k-line py-7">
                  <span className="k-display block text-[13px] tabular-nums text-k-fire">
                    0{i + 1}
                  </span>
                  <h3 className="k-display mt-3 text-[24px] text-k-ink">{feature.title}</h3>
                  <p className="mt-2.5 max-w-[40ch] text-[15px] leading-[1.6] text-k-ink-soft">
                    {feature.copy}
                  </p>
                </Rise>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Live sample site */}
      <section className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Rise>
            <Eyebrow className="text-k-muted">See it for yourself</Eyebrow>
            <Display as="h2" size="md" className="mt-5 max-w-[16ch] text-k-ink">
              Click around <em>{sector.demo.name}</em> before you talk to anyone.
            </Display>
            <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.6] text-k-ink-soft">
              {sector.demo.copy}
            </p>
          </Rise>
          <Rise delay={0.1}>
            <ul className="mt-6 space-y-2.5">
              {sector.demo.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </Rise>
          <Rise delay={0.18} className="mt-8">
            <BtnLink href={sector.demo.href} tone="coal" arrow="up">
              Explore the sample site
            </BtnLink>
          </Rise>
        </div>

        <Rise delay={0.15}>
          <a
            href={sector.demo.innerPath}
            aria-label={`Open the ${sector.demo.name} sample website`}
            className="group block rounded-[18px] focus-visible:outline-offset-4"
          >
            <BrowserFrame
              src={sector.demo.innerImage}
              alt={sector.demo.innerImageAlt}
              url={`flutterly.uk${sector.demo.innerPath}`}
              className="transition-transform duration-500 ease-out group-hover:-translate-y-1"
            />
            <span className="mt-3 block text-center text-[13px] text-k-muted">
              A live, hosted sample. The organisation shown is fictional.
            </span>
          </a>
        </Rise>
      </section>

      {/* Compliance / trust, on coal */}
      <section className="on-coal bg-k-coal text-k-coal-ink">
        <div className="mx-auto grid w-full max-w-[1280px] items-start gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-16">
          <Rise>
            <Eyebrow className="text-k-coal-soft">{sector.compliance.eyebrow}</Eyebrow>
            <Display as="h2" size="md" className="mt-5 max-w-[18ch] text-k-coal-ink">
              {sector.compliance.title}
            </Display>
            <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.6] text-k-coal-soft">
              {sector.compliance.copy}
            </p>
          </Rise>
          <Rise delay={0.12}>
            <ul className="divide-y divide-k-coal-line border-y border-k-coal-line">
              {sector.compliance.points.map((point) => (
                <CheckItem key={point} onCoal className="py-4">
                  {point}
                </CheckItem>
              ))}
            </ul>
          </Rise>
        </div>
      </section>

      {/* What's included */}
      <section className="border-b border-k-line">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHead
            eyebrow="Every build includes"
            title={
              <>
                Nothing essential is an <em>add-on</em>.
              </>
            }
          />
          <Rise className="mx-auto mt-14 max-w-[900px]">
            <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {sector.included.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </Rise>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[860px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead eyebrow="Questions" title="Asked and answered." align="left" size="md" />
        <Rise className="mt-12">
          <FaqList items={sector.faqs} />
        </Rise>
      </section>

      <CtaBand title={sector.ctaTitle} copy={sector.ctaCopy} id="contact" />
    </KilnShell>
  );
}
