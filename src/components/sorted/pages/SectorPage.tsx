"use client";

import { ShieldCheck } from "lucide-react";
import type { Sector } from "@/lib/marketing/content";
import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { SampleScene } from "../ui/SampleScene";
import { ButtonLink, CheckItem, Container, Display, Eyebrow, FaqList, SectionIntro } from "../ui/primitives";

/**
 * Shared landing page for the GP-practice and care-home sectors, driven
 * entirely by a `Sector` so both stay consistent as the offer evolves.
 * The sample site stands in the hero as a turned slab with its phone;
 * then what the site does, the sample again from the inside, the
 * standards on sun, what is included and the questions.
 */
export function SectorPage({ sector }: { sector: Sector }) {
  return (
    <Shell>
      <PageHero
        eyebrow={sector.eyebrow}
        size="lg"
        title={
          <>
            {sector.headline}
            {sector.headlineEm ? (
              <>
                {" "}
                <em>{sector.headlineEm}</em>
              </>
            ) : null}
          </>
        }
        copy={<p>{sector.intro}</p>}
        art={null}
        after={
          <Container className="pb-14 sm:pb-20">
            <a href={sector.demo.href} aria-label={`Open the ${sector.demo.name} sample website`} className="mx-auto block max-w-[1040px] rounded-[12px]">
              <SampleScene
                image={sector.demo.image}
                mobileImage={sector.demo.mobileImage}
                url={`${site.domain}${sector.demo.href}`}
                alt={`The ${sector.demo.name} sample site on a desktop and on a phone`}
                priority
              />
            </a>
            <ul className="mt-12 grid gap-4 sm:grid-cols-3">
              {sector.heroPoints.map((point, i) => (
                <Reveal as="li" key={point} turn={60} delay={i * 0.08} className="rounded-[12px] border-2 border-s-navy bg-white px-5 py-4 shadow-[0_5px_0_0_var(--s-navy)]">
                  <span className="s-label s-num text-[13px] text-s-accent">0{i + 1}</span>
                  <p className="mt-2 text-[16px] font-medium leading-[1.5] text-s-ink">{point}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        }
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/free-audit" arrow="right" size="lg">
            Get your free audit
          </ButtonLink>
          <ButtonLink href={sector.demo.href} tone="plain" size="lg" arrow="up">
            Open the sample site
          </ButtonLink>
        </div>
      </PageHero>

      {/* What the website does */}
      <section className="tone-white py-20 sm:py-28">
        <Container>
          <SectionIntro
            eyebrow="What the website does"
            title={
              <>
                Designed around real journeys, not <em>page templates</em>.
              </>
            }
          />
          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {sector.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} turn={0} delay={(i % 3) * 0.06} className="border-t-2 border-s-navy pb-10 pt-5">
                <span className="s-display s-num text-[40px] text-s-accent">0{i + 1}</span>
                <h3 className="s-display mt-4 text-[24px]">{feature.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-s-ink-soft">{feature.copy}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* The live sample, inner page */}
      <section className="tone-navy relative overflow-hidden py-20 sm:py-28">
        <Container className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal turn={0}>
              <Eyebrow>Live sample site</Eyebrow>
              <Display size="lg" className="mt-6 max-w-[15ch]">
                Click around{" "}
                {sector.demo.name.split(" ").map((word) => (
                  <span key={word}>
                    <em>{word}</em>{" "}
                  </span>
                ))}
                before you talk to anyone.
              </Display>
              <p className="mt-6 max-w-[520px] text-[17.5px] leading-[1.6] text-s-ink-soft">{sector.demo.copy}</p>
            </Reveal>
            <Reveal turn={0} delay={0.1}>
              <ul className="mt-8 space-y-3.5">
                {sector.demo.points.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal turn={0} delay={0.18} className="mt-10">
              <ButtonLink href={sector.demo.href} arrow="up">
                Explore the sample site
              </ButtonLink>
            </Reveal>
          </div>
          <div className="min-w-0">
            <a href={sector.demo.innerPath} aria-label={`Open the ${sector.demo.name} sample website`} className="block rounded-[12px]">
              <SampleScene image={sector.demo.innerImage} url={`${site.domain}${sector.demo.innerPath}`} />
            </a>
            <p className="mt-8 text-center text-[14px] text-s-muted">A live, hosted sample. The organisation shown is fictional.</p>
          </div>
        </Container>
      </section>

      {/* Standards */}
      <section className="tone-sun border-y-2 border-s-navy py-20 sm:py-28">
        <Container>
          <Reveal turn={0} className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-s-navy text-s-sun">
                <ShieldCheck size={28} strokeWidth={2} />
              </span>
              <Eyebrow className="mt-8">{sector.compliance.eyebrow}</Eyebrow>
              <Display size="md" className="mt-5">
                {sector.compliance.title}
              </Display>
              <p className="mt-5 text-[17px] leading-[1.6] text-s-ink-soft">{sector.compliance.copy}</p>
            </div>
            <ul className="space-y-3 self-center">
              {sector.compliance.points.map((point) => (
                <CheckItem key={point} className="tone-white rounded-[12px] border-2 border-s-navy p-4">
                  {point}
                </CheckItem>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Included */}
      <section className="tone-chalk py-20 sm:py-28">
        <Container>
          <SectionIntro
            eyebrow="Every build includes"
            title={
              <>
                Nothing essential is an <em>add-on</em>.
              </>
            }
          />
          <Reveal turn={0} className="mt-12 max-w-[1000px]">
            <ul className="grid gap-x-10 border-t-2 border-s-navy sm:grid-cols-2">
              {sector.included.map((item) => (
                <CheckItem key={item} className="border-b-[1.5px] border-s-line-2 py-4">
                  {item}
                </CheckItem>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="tone-white border-t-2 border-s-navy py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <SectionIntro eyebrow="Questions" title="Asked and answered." size="md" />
          <Reveal turn={0} delay={0.08}>
            <FaqList items={sector.faqs} />
          </Reveal>
        </Container>
      </section>

      <CtaBand title={sector.ctaTitle} copy={sector.ctaCopy} id="contact" />
    </Shell>
  );
}
