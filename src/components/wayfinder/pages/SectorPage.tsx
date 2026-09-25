import { site } from "@/lib/site";
import { sampleSigns, samples, type Sector } from "@/lib/marketing/content";
import { Fingerpost } from "../home/Fingerpost";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { Reveal } from "../motion/Reveal";
import { CheckItem, FaqList } from "../ui/Bits";
import { ButtonLink } from "../ui/Button";
import { PhoneFrame, ScreenFrame } from "../ui/Frames";
import { Container, Heading, Kicker, SectionHead } from "../ui/Type";

/**
 * Shared landing page for the GP-practice and care-home sectors, driven
 * entirely by a `Sector` so both stay consistent as the offer evolves.
 * The hero's fingerpost points at real pages on that sector's sample.
 */
export function SectorPage({ sector }: { sector: Sector }) {
  const sample = samples.find((s) => s.href === sector.demo.href);

  return (
    <Shell>
      <PageHero
        kicker={sector.eyebrow}
        size="lg"
        title={sector.headline}
        copy={<p>{sector.intro}</p>}
        aside={
          sample ? (
            <Fingerpost
              signs={sampleSigns(sample)}
              label={`Signs to pages on the ${sample.name} sample site`}
              caption={`Each arm opens a page on the ${sample.name} sample site.`}
              highlight={1}
              className="mx-auto w-full max-w-[520px]"
            />
          ) : undefined
        }
        after={
          <Container className="pb-16 sm:pb-20">
            <Reveal>
              <a href={sector.demo.href} className="block">
                <ScreenFrame
                  src={sector.demo.image}
                  alt={sector.demo.imageAlt}
                  url={`${site.domain}${sector.demo.href}`}
                  priority
                  sizes="(min-width: 1320px) 1256px, 94vw"
                />
              </a>
            </Reveal>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {sector.heroPoints.map((point, i) => (
                <Reveal as="li" key={point} delay={i * 60} className="wf-plate flex gap-4 p-5">
                  <span
                    aria-hidden="true"
                    className="wf-mono flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-wf-ink text-[13px] text-wf-sign"
                  >
                    {i + 1}
                  </span>
                  <p className="text-[16px] leading-[1.5]">{point}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        }
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/free-audit">Get your free audit</ButtonLink>
          <ButtonLink href={sector.demo.href} tone="outline" arrow="up-right">
            Open the sample site
          </ButtonLink>
        </div>
      </PageHero>

      {/* What the website does */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHead
            kicker="What the website does"
            title={
              <>
                Built around the journeys people <mark className="wf-mark">actually take.</mark>
              </>
            }
          />
          <ol className="mt-12 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {sector.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={(i % 3) * 60} className="border-t-2 border-wf-ink pb-8 pt-5">
                <p className="wf-label text-wf-muted">0{i + 1}</p>
                <h3 className="mt-3 text-[24px] font-extrabold tracking-[-0.02em]">{feature.title}</h3>
                <p className="mt-3 text-[16.5px] leading-[1.6] text-wf-ink-soft">{feature.copy}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* The live sample, inner page */}
      <section className="border-y-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Kicker>Live sample site</Kicker>
            <Heading size="md" className="mt-7 max-w-[20ch]">
              Click around {sector.demo.name} before you talk to anyone.
            </Heading>
            <p className="mt-6 max-w-[56ch] text-[18px] leading-[1.6] text-wf-ink-soft">{sector.demo.copy}</p>
            <ul className="mt-8 space-y-3.5">
              {sector.demo.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href={sector.demo.href} arrow="up-right">
                Explore the sample site
              </ButtonLink>
            </div>
          </div>
          <Reveal className="relative min-w-0 pb-16 lg:pb-10">
            <a href={sector.demo.innerPath} className="block">
              <ScreenFrame
                src={sector.demo.innerImage}
                alt={sector.demo.innerImageAlt}
                url={`${site.domain}${sector.demo.innerPath}`}
              />
            </a>
            <div className="absolute -bottom-2 right-3 sm:right-6">
              <PhoneFrame src={sector.demo.mobileImage} width={150} className="sm:w-[180px]!" />
            </div>
            <p className="mt-4 max-w-[60%] text-[14.5px] text-wf-muted sm:max-w-none">
              A live, hosted sample. The organisation shown is fictional.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Standards */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="wf-board wf-on-ink grid gap-12 p-7 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div>
              <Kicker>{sector.compliance.eyebrow}</Kicker>
              <Heading size="md" className="mt-6">
                {sector.compliance.title}
              </Heading>
              <p className="wf-lead mt-6 text-[17.5px] leading-[1.65]">{sector.compliance.copy}</p>
            </div>
            <ul className="space-y-5 self-center border-t border-wf-on-ink-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              {sector.compliance.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Included */}
      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <SectionHead kicker="Every build includes" title="Nothing essential is an add-on." size="md" />
          <ul className="grid content-start gap-x-10 gap-y-5 border-t-2 border-wf-ink pt-8 sm:grid-cols-2">
            {sector.included.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <SectionHead kicker="Questions" title="Asked and answered." size="md" />
          <FaqList items={sector.faqs} />
        </Container>
      </section>

      <CtaBand title={sector.ctaTitle} copy={sector.ctaCopy} id="contact" />
    </Shell>
  );
}
