"use client";

import Link from "next/link";
import { CalendarClock, X } from "lucide-react";
import { site } from "@/lib/site";
import { clearPath, gpSector } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { SampleScene } from "../ui/SampleScene";
import { SlabStack } from "../ui/SlabStack";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { PackageCard } from "../ui/PackageCard";
import {
  ButtonLink,
  CheckItem,
  Container,
  Display,
  Eyebrow,
  SectionIntro,
} from "../ui/primitives";

const heroPoints = ["Free website audit", "Reserve by 31 October 2026", "Reading-based studio"] as const;

const forWho = [
  "Practice managers leaving MSW who want custom ownership and accessibility designed in",
  "Practices that care about year-one clarity and who updates the site after launch",
] as const;

const notForWho = [
  "If you only need a low-cost managed template, that may be the better fit. I can help you compare the options.",
] as const;

const proofLinks = [
  { href: "/free-audit", label: "Free website audit" },
  { href: gpSector.demo.href, label: `${gpSector.demo.name} sample site` },
  { href: "/accessibility", label: "Accessibility statement" },
  { href: "/packages", label: "Published packages" },
] as const;

/**
 * Clear Path campaign landing: a time-boxed MSW migration for Berkshire
 * and Thames Valley GP practices. Copy, prices and CTAs are locked.
 */
export function LeavingMswPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Clear Path · GP migration"
        art={<SlabStack order={["navy", "jade", "sun", "flame", "cobalt", "white"]} />}
        title={
          <>
            Leaving <em>My Surgery</em> <em>Website</em>?
          </>
        }
        copy={
          <>
            <h2 className="s-display max-w-[28ch] text-[clamp(1.3rem,2.4vw,1.9rem)] text-s-ink [--lh:1.08]">
              Clear Path moves you to a site you own — without turning it into a <em>redesign</em> project.
            </h2>
            <p className="mt-6">
              For Berkshire and Thames Valley practice managers who need to stay online, meet accessibility
              standards, and keep control of their domain.
            </p>
          </>
        }
      >
        <div className="flex w-full max-w-[420px] flex-col gap-4 sm:max-w-none sm:flex-row">
          <ButtonLink href="/free-audit" size="lg" arrow="right" className="w-full sm:w-auto">
            Book a free audit
          </ButtonLink>
          <ButtonLink href="/book" tone="plain" size="lg" className="w-full sm:w-auto">
            Book a call
          </ButtonLink>
        </div>
        <ul className="mt-9 flex flex-wrap gap-2">
          {heroPoints.map((point) => (
            <li key={point} className="s-label rounded-[6px] border-[1.5px] border-s-line-2 bg-white px-3 py-2 text-[13px] text-s-ink">
              {point}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Why */}
      <section className="tone-white py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-20">
          <SectionIntro
            eyebrow="Why this page exists"
            size="md"
            title={
              <>
                A clear route from your current <em>MSW</em> website.
              </>
            }
          />
          <Reveal turn={0} delay={0.08} className="max-w-[62ch] space-y-5 border-t-2 border-s-navy pt-6 text-[17.5px] leading-[1.65] text-s-ink-soft">
            <p>
              My Surgery Website (MSW / FPM) is shutting down. Public notices point to pressure on domain instructions
              around September 2026 and hosting ending 31 March 2027 — check your own MSW letter for your exact
              dates.
            </p>
            <p>
              If you&rsquo;re a practice manager in Berkshire or the Thames Valley, you need a clear quote, a
              migration checklist, and a go-live date that won&rsquo;t leave reception under pressure.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What it is */}
      <section className="tone-chalk s-dots border-y-2 border-s-navy py-20 sm:py-28">
        <Container>
          <SectionIntro
            eyebrow="What Clear Path is"
            size="md"
            title={
              <>
                A time-boxed migration — not a six-month <em>brand</em> project.
              </>
            }
            copy="We move your content, sort the domain, and get you live on a modern site you own. Built for WCAG 2.2 AA. No WordPress page-builder stack. Founder-led: you brief the person who builds."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal turn={50} className="tone-cobalt rounded-[14px] border-2 border-s-navy p-7 shadow-[0_6px_0_0_var(--s-navy)]">
              <Eyebrow>Who it is for</Eyebrow>
              <ul className="mt-6 space-y-4">
                {forWho.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal turn={50} delay={0.1} className="tone-white rounded-[14px] border-2 border-s-navy p-7 shadow-[0_6px_0_0_var(--s-navy)]">
              <p className="s-eyebrow">Who it isn&rsquo;t for</p>
              <ul className="mt-6 space-y-4">
                {notForWho.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] bg-s-fail text-white">
                      <X size={12} strokeWidth={3.4} />
                    </span>
                    <span className="text-[15.5px] leading-[1.55] text-s-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section id="packages" className="tone-sun relative scroll-mt-20 border-b-2 border-s-navy py-20 sm:py-28">
        <Container className="relative">
          <SectionIntro
            eyebrow="Packages"
            title={
              <>
                Two ways to <em>move</em>.
              </>
            }
            copy="Published prices. Reserve by 31 October 2026. Capacity is capped, so the quote includes a go-live date you can plan around."
          />
          <ul className="mt-12 grid max-w-[1000px] items-stretch gap-6 md:grid-cols-2">
            {clearPath.packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} badge="Premium custom" />
            ))}
          </ul>
          <Reveal turn={0} className="mt-12 flex flex-col items-start gap-5">
            <p className="max-w-[640px] text-[16px] leading-[1.6] text-s-ink-soft">
              Reserve by 31 October 2026. Not sure which fits? Start with the free audit and say you&rsquo;re leaving
              MSW — we&rsquo;ll map the move.
            </p>
            <ButtonLink href="/book" size="sm" arrow="right">
              Book a call
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* Steps */}
      <section className="tone-white py-20 sm:py-28">
        <Container>
          <SectionIntro
            eyebrow="How the move works"
            size="md"
            title={
              <>
                Four steps to a site you <em>own</em>.
              </>
            }
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clearPath.steps.map((step, i) => (
              <Reveal as="li" key={step.title} turn={84} delay={i * 0.12} className="h-full">
                <div className="h-full rounded-[12px] border-2 border-s-navy bg-s-chalk p-6 shadow-[0_6px_0_0_var(--s-navy)]">
                  <span aria-hidden className="s-display s-num text-[48px] text-s-accent">
                    {i + 1}
                  </span>
                  <h3 className="s-display mt-5 text-[25px]">{step.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-[1.6] text-s-ink-soft">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal turn={0} className="mt-12 max-w-[760px] border-l-0 border-t-2 border-s-navy pt-6">
            <p className="text-[16.5px] leading-[1.65] text-s-ink-soft">
              Capacity is capped (about 2–3 builds/mo) so delivery stays honest. Explore the live GP sample, read the
              accessibility statement and ask for an audit of your current site.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Dates */}
      <section className="tone-navy py-20 sm:py-28">
        <Container>
          <SectionIntro
            eyebrow="Dates"
            size="md"
            title={
              <>
                The dates that <em>matter</em>.
              </>
            }
            copy="These dates cover the website move only. Check the dates in your own provider letter before planning the move."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-3">
            {clearPath.dates.map((item, i) => (
              <Reveal as="li" key={item.label} turn={70} delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col rounded-[14px] border-2 border-s-line-2 bg-s-raised p-7">
                  <span className="flex items-center gap-2 text-s-accent">
                    <CalendarClock size={17} aria-hidden />
                    <span className="s-label text-[13px]">{item.label}</span>
                  </span>
                  <h3 className="s-display s-num mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)]">{item.when}</h3>
                  <p className="mt-3 text-[15.5px] leading-[1.6] text-s-ink-soft">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Proof */}
      <section className="tone-chalk overflow-hidden py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal turn={0}>
              <Eyebrow>Proof</Eyebrow>
              <Display size="md" className="mt-5 max-w-[16ch]">
                Click around <em>{gpSector.demo.name}</em> before you talk to anyone.
              </Display>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-s-ink-soft">
                A live GP demo, the accessibility statement, and published packages. Book your free audit — say
                you&rsquo;re leaving MSW and we&rsquo;ll map the move.
              </p>
            </Reveal>
            <Reveal turn={0} delay={0.1}>
              <ul className="mt-7 space-y-3">
                {proofLinks.map((item) => (
                  <CheckItem key={item.href}>
                    <Link href={item.href} className="font-semibold underline decoration-s-accent decoration-2 underline-offset-4">
                      {item.label}
                    </Link>
                  </CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal turn={0} delay={0.18} className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/free-audit" arrow="right">
                Book a free audit
              </ButtonLink>
              <ButtonLink href={gpSector.demo.href} tone="plain" arrow="up">
                Open the sample site
              </ButtonLink>
            </Reveal>
          </div>
          <div className="min-w-0">
            <a href={gpSector.demo.href} aria-label={`Open the ${gpSector.demo.name} sample website`} className="block rounded-[12px]">
              <SampleScene image={gpSector.demo.image} mobileImage={gpSector.demo.mobileImage} url={`${site.domain}${gpSector.demo.href}`} />
            </a>
            <p className="mt-8 text-center text-[14px] text-s-muted">A live, hosted sample. The organisation shown is fictional.</p>
          </div>
        </Container>
      </section>

      {/* Geography */}
      <section className="tone-jade border-t-2 border-s-navy py-14 sm:py-20">
        <Container>
          <Reveal turn={0} className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Eyebrow>Geography</Eyebrow>
              <Display size="md" className="mt-4">
                Berkshire and the <em>Thames Valley</em>.
              </Display>
            </div>
            <p className="max-w-[46ch] text-[17px] font-medium leading-[1.6] text-s-ink-soft">
              Berkshire / Thames Valley (RG / SL / OX / HP + wider Thames Valley ICB). Outside? Ask — we&rsquo;ll say
              if capacity fits.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Book a free audit — say you&rsquo;re leaving <em>MSW</em>.
          </>
        }
        copy="We'll map the move from your current site: what has to come across, which package fits, and a go-live date that won't leave reception under pressure."
        id="contact"
      />
    </Shell>
  );
}
