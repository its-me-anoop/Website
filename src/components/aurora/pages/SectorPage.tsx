"use client";

import { ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import type { Sector } from "@/lib/marketing/content";
import { Reveal, ScrollTilt, Tilt, WipeReveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import {
  BrowserFrame,
  ButtonLink,
  CheckItem,
  Container,
  Display,
  Eyebrow,
  FaqList,
  SectionIntro,
} from "../ui/primitives";
import { Phone3D } from "../ui/Phone3D";

/**
 * Shared landing page for the GP-practice and care-home sectors, driven
 * entirely by a `Sector` so both stay consistent as the offer evolves.
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
        after={
          <Container className="max-w-[1180px] pb-10">
            <ScrollTilt>
              <BrowserFrame
                src={sector.demo.image}
                alt={sector.demo.imageAlt}
                url={`${site.domain}${sector.demo.href}`}
                priority
                sizes="(min-width: 1180px) 1140px, 94vw"
              />
            </ScrollTilt>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {sector.heroPoints.map((point, i) => (
                <Reveal as="li" key={point} delay={i * 0.06} className="a-glass rounded-[20px] px-5 py-4">
                  <span className="a-mono text-[11px] text-a-amber">0{i + 1}</span>
                  <p className="mt-2 text-[15px] leading-[1.55] text-a-ink">{point}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        }
      >
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/free-audit" arrow="right" size="lg" magnetic>
            Get your free audit
          </ButtonLink>
          <ButtonLink href={sector.demo.href} tone="glass" size="lg" arrow="up">
            Open the sample site
          </ButtonLink>
        </div>
      </PageHero>

      {/* What the website does */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro
            eyebrow="What the website does"
            title={
              <>
                Designed around real journeys, not <em>page templates</em>.
              </>
            }
          />
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sector.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={(i % 3) * 0.06} className="h-full">
                <article className="a-glass a-spot flex h-full flex-col rounded-[26px] p-7">
                  <span className="a-display a-grad-text text-[44px] leading-none">0{i + 1}</span>
                  <h3 className="a-display mt-8 text-[24px]">{feature.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-a-ink-soft">{feature.copy}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* The live sample, inner page */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/4 h-[600px] w-[800px] opacity-45"
          style={{ background: "radial-gradient(closest-side, rgba(245,158,11,0.5), rgba(194,65,12,0.3) 55%, transparent)" }}
        />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Live sample site</Eyebrow>
              <Display size="lg" className="mt-6 max-w-[14ch]">
                Click around <em>{sector.demo.name}</em> before you talk to anyone.
              </Display>
              <p className="mt-6 max-w-[520px] text-[17px] leading-[1.65] text-a-ink-soft">{sector.demo.copy}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-3.5">
                {sector.demo.points.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.18} className="mt-10">
              <ButtonLink href={sector.demo.href} arrow="up">
                Explore the sample site
              </ButtonLink>
            </Reveal>
          </div>
          <div className="relative min-w-0 pb-16 lg:pb-8">
          <WipeReveal delay={0.1}>
            <Tilt max={6}>
              <a
                href={sector.demo.innerPath}
                aria-label={`Open the ${sector.demo.name} sample website`}
                className="block rounded-[22px]"
              >
                <BrowserFrame
                  src={sector.demo.innerImage}
                  alt={sector.demo.innerImageAlt}
                  url={`${site.domain}${sector.demo.innerPath}`}
                />
              </a>
            </Tilt>
            <p className="mt-4 pl-[40%] text-right text-[13px] text-a-muted sm:pl-[30%] lg:pl-0 lg:text-center">
              A live, hosted sample. The organisation shown is fictional.
            </p>
          </WipeReveal>
          {/* Outside the wipe: its settled clip would cut off the overhang. */}
          <div className="pointer-events-none absolute -bottom-4 -left-2 origin-bottom-left scale-[0.5] sm:scale-[0.6] lg:-bottom-6 lg:-left-12 lg:scale-[0.72]">
            <Phone3D src={sector.demo.mobileImage} width={250} />
          </div>
          </div>
        </Container>
      </section>

      {/* Standards */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="a-conic grid gap-12 rounded-[36px] bg-a-deep p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:p-16">
              <div>
                <span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-a-amber/10 text-a-amber ring-1 ring-a-amber/30"
                >
                  <ShieldCheck size={26} strokeWidth={1.6} />
                </span>
                <Eyebrow className="mt-8">{sector.compliance.eyebrow}</Eyebrow>
                <Display size="md" className="mt-5">
                  {sector.compliance.title}
                </Display>
                <p className="mt-5 text-[16.5px] leading-[1.65] text-a-ink-soft">{sector.compliance.copy}</p>
              </div>
              <ul className="space-y-4 self-center">
                {sector.compliance.points.map((point) => (
                  <CheckItem key={point} className="rounded-[18px] border border-a-line bg-white/[0.03] p-4">
                    {point}
                  </CheckItem>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Included */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro
            align="center"
            eyebrow="Every build includes"
            title={
              <>
                Nothing essential is an <em>add-on</em>.
              </>
            }
          />
          <Reveal className="mx-auto mt-14 max-w-[980px]">
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {sector.included.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <SectionIntro eyebrow="Questions" title="Asked and answered." size="md" />
          <Reveal delay={0.08}>
            <FaqList items={sector.faqs} />
          </Reveal>
        </Container>
      </section>

      <CtaBand title={sector.ctaTitle} copy={sector.ctaCopy} id="contact" />
    </Shell>
  );
}
