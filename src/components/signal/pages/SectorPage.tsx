"use client";

import { site } from "@/lib/site";
import type { Sector } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { useMediaQuery } from "../effects/hooks";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { LiveSite } from "../ui/LiveSite";
import { ButtonLink, CheckItem, Container, FaqList, Label, Screenshot, SectionIntro } from "../ui/primitives";

/**
 * Shared landing page for the GP-practice and care-home sectors, driven
 * entirely by a `Sector` so both stay consistent as the offer evolves.
 */
export function SectorPage({ sector }: { sector: Sector }) {
  const wide = useMediaQuery("(min-width: 1024px)");
  return (
    <Shell>
      <PageHero
        label={sector.eyebrow}
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
      >
        <ButtonLink href="/free-audit" arrow="right" size="lg">
          Get your free audit
        </ButtonLink>
        <ButtonLink href={sector.demo.href} tone="outline" size="lg" arrow="up">
          Open the sample site
        </ButtonLink>
      </PageHero>

      <section className="pb-24">
        <Container>
          <ul className="grid border-y border-s-line sm:grid-cols-3">
            {sector.heroPoints.map((point, i) => (
              <Reveal
                as="li"
                key={point}
                delay={i * 0.05}
                className="border-s-line py-6 text-[17px] leading-[1.55] sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
              >
                {point}
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* What the website does */}
      <section className="s-paper py-24 sm:py-32">
        <Container>
          <SectionIntro
            onPaper
            label="What the website does"
            title={
              <>
                Designed around real journeys, not <em>page templates</em>.
              </>
            }
          />
          <ol className="mt-14 grid gap-x-10 border-t border-s-line-paper sm:grid-cols-2 lg:grid-cols-3">
            {sector.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={(i % 3) * 0.05} className="border-b border-s-line-paper py-8">
                <span className="text-[14px] tabular-nums text-s-on-paper-2">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="s-display mt-4 text-[27px]">{feature.title}</h3>
                <p className="mt-3 text-[17px] leading-[1.6] text-s-on-paper-2">{feature.copy}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* The live sample */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro
            label="Live sample site"
            title={
              <>
                Click around <em>{sector.demo.name}</em> before you talk to anyone.
              </>
            }
            copy={sector.demo.copy}
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            <Reveal>
              {wide ? (
                <LiveSite
                  href={sector.demo.innerPath}
                  title={`${sector.demo.name}, a working sample site`}
                  poster={sector.demo.innerImage}
                />
              ) : (
                <Screenshot src={sector.demo.innerImage} alt={sector.demo.innerImageAlt} />
              )}
              <p className="mt-3 text-[14.5px] text-s-on-ink-2">
                {site.domain}
                {sector.demo.innerPath} · the organisation shown is fictional
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="space-y-4">
                {sector.demo.points.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
              <div className="mt-10">
                <ButtonLink href={sector.demo.href} arrow="up">
                  Explore the sample site
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Standards */}
      <section className="border-t border-s-line py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Label className="text-s-on-ink-2">{sector.compliance.eyebrow}</Label>
            <h2 className="s-display mt-5 text-[clamp(1.9rem,3.6vw,3rem)]">{sector.compliance.title}</h2>
            <p className="mt-6 text-[18px] leading-[1.6] text-s-on-ink-2">{sector.compliance.copy}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="divide-y divide-s-line border-y border-s-line">
              {sector.compliance.points.map((point) => (
                <CheckItem key={point} className="py-5">
                  {point}
                </CheckItem>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Included */}
      <section className="s-paper py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionIntro
            onPaper
            label="Every build includes"
            title={
              <>
                Nothing essential is an <em>add-on</em>.
              </>
            }
          />
          <Reveal delay={0.08}>
            <ul className="space-y-4">
              {sector.included.map((item) => (
                <CheckItem key={item} onPaper>
                  {item}
                </CheckItem>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <SectionIntro label="Questions" title="Asked and answered." size="md" />
          <Reveal delay={0.08}>
            <FaqList items={sector.faqs} />
          </Reveal>
        </Container>
      </section>

      <CtaBand title={sector.ctaTitle} copy={sector.ctaCopy} id="contact" />
    </Shell>
  );
}
