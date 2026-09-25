"use client";

import Link from "next/link";
import { CalendarClock, X } from "lucide-react";
import { site } from "@/lib/site";
import { clearPath, gpSector } from "@/lib/marketing/content";
import { Reveal, Tilt } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { PackageCard } from "../ui/PackageCard";
import {
  BrowserFrame,
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
  "Practices that only need a managed NHS template at the lowest annual fee — say so; a template SaaS may fit better",
  "Anyone hoping we'll undercut £269–£500/year SaaS bands — Standard stays a different product class",
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
        title={
          <>
            Leaving <em>My Surgery Website</em>?
          </>
        }
        copy={
          <>
            <h2 className="a-display mx-auto max-w-[28ch] text-[clamp(1.35rem,2.6vw,2rem)] text-a-ink">
              Clear Path moves you to a site you own — without turning it into a <em>redesign</em> project.
            </h2>
            <p className="mt-6">
              For Berkshire and Thames Valley practice managers who need to stay online, meet accessibility
              standards, and keep control of their domain.
            </p>
          </>
        }
      >
        <div className="flex w-full max-w-[420px] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <ButtonLink href="/free-audit" size="lg" arrow="right" magnetic className="w-full sm:w-auto">
            Book a free audit
          </ButtonLink>
          <ButtonLink href="/book" tone="glass" size="lg" className="w-full sm:w-auto">
            Book a call
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {heroPoints.map((point) => (
            <li key={point} className="a-glass rounded-full px-4 py-2 text-[14px] text-a-ink">
              {point}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Why */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
          <SectionIntro
            eyebrow="Why this page exists"
            size="md"
            title={
              <>
                MSW is shutting down. That&rsquo;s <em>Clear Path</em>.
              </>
            }
          />
          <Reveal delay={0.08} className="max-w-[62ch] space-y-5 text-[17px] leading-[1.7] text-a-ink-soft">
            <p>
              My Surgery Website (MSW / FPM) is shutting down. Public notices point to pressure on domain instructions
              around September 2026 and hosting ending 31 March 2027 — check your own MSW letter for your exact
              dates.
            </p>
            <p>
              If you&rsquo;re a practice manager in Berkshire or the Thames Valley, you need a clear quote, a
              migration checklist, and a go-live date that won&rsquo;t leave reception under pressure.
            </p>
            <p className="a-display text-[26px] text-a-ink">That&rsquo;s Clear Path.</p>
          </Reveal>
        </Container>
      </section>

      {/* What it is */}
      <section className="py-24 sm:py-32">
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
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Reveal className="a-glass rounded-[28px] p-8">
              <Eyebrow>Who it is for</Eyebrow>
              <ul className="mt-6 space-y-4">
                {forWho.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[28px] border border-a-line p-8">
              <p className="a-eyebrow before:!bg-a-fail before:!shadow-none">Who it isn&rsquo;t for</p>
              <ul className="mt-6 space-y-4">
                {notForWho.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-a-fail/10 text-a-fail ring-1 ring-a-fail/30"
                    >
                      <X size={11} strokeWidth={3} />
                    </span>
                    <span className="text-[15px] leading-[1.6] text-a-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section id="packages" className="relative scroll-mt-24 py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[480px] max-w-[900px] opacity-40"
          style={{ background: "radial-gradient(closest-side, rgba(253,230,138,0.4), rgba(194,65,12,0.3) 55%, transparent)" }}
        />
        <Container className="relative">
          <SectionIntro
            align="center"
            eyebrow="Packages"
            title={
              <>
                Two ways to <em>move</em>.
              </>
            }
            copy="Published prices, plus VAT. Reserve by 31 October 2026. Capacity is capped, so the quote includes a go-live date you can plan around."
          />
          <ul className="mx-auto mt-14 grid max-w-[980px] items-stretch gap-5 md:grid-cols-2">
            {clearPath.packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} badge="Premium custom" />
            ))}
          </ul>
          <Reveal className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="max-w-[640px] text-[15px] leading-[1.65] text-a-ink-soft">
              Reserve by 31 October 2026. Not sure which fits? Start with the free audit and say you&rsquo;re leaving
              MSW — we&rsquo;ll map the move.
            </p>
            <ButtonLink href="/book" tone="glass" size="sm" arrow="right">
              Book a call
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* Steps */}
      <section className="py-24 sm:py-32">
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
          <ol className="relative mt-14 grid gap-5 md:grid-cols-4">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-[27px] hidden h-px md:block"
              style={{ background: "linear-gradient(90deg,#ff7a1a,#ffc24a,#ffb020)" }}
            />
            {clearPath.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
                <span className="a-mono relative flex h-14 w-14 items-center justify-center rounded-full border border-a-line-2 bg-a-void text-[14px] text-a-amber">
                  0{i + 1}
                </span>
                <h3 className="a-display mt-6 text-[24px]">{step.title}</h3>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.65] text-a-ink-soft">{step.copy}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="a-glass mx-auto mt-16 max-w-[760px] rounded-[24px] p-7 text-center">
            <p className="text-[16px] leading-[1.7] text-a-ink-soft">
              Capacity is capped (about 2–3 builds/mo) so delivery stays honest. We won&rsquo;t claim thousands of
              surgeries. We will show you a live GP demo, our accessibility statement, and what the audit found on your
              site.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Dates */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro
            eyebrow="Dates"
            size="md"
            title={
              <>
                The dates that <em>matter</em>.
              </>
            }
            copy="Website migration path only. Not inventing clinical-system deadlines — check your own MSW letter for your exact dates."
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-3">
            {clearPath.dates.map((item, i) => (
              <Reveal as="li" key={item.label} delay={i * 0.08} className="h-full">
                <article className="a-glass a-spot flex h-full flex-col rounded-[26px] p-7">
                  <span className="flex items-center gap-2 text-a-gold">
                    <CalendarClock size={16} aria-hidden />
                    <span className="a-mono text-[12px] uppercase tracking-[0.14em]">{item.label}</span>
                  </span>
                  <h3 className="a-display mt-6 text-[clamp(1.6rem,2.6vw,2.1rem)]">{item.when}</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-a-ink-soft">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Proof */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Proof</Eyebrow>
              <Display size="md" className="mt-5 max-w-[16ch]">
                Click around <em>{gpSector.demo.name}</em> before you talk to anyone.
              </Display>
              <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.65] text-a-ink-soft">
                A live GP demo, the accessibility statement, and published packages. Book your free audit — say
                you&rsquo;re leaving MSW and we&rsquo;ll map the move.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-7 space-y-3">
                {proofLinks.map((item) => (
                  <CheckItem key={item.href}>
                    <Link
                      href={item.href}
                      className="underline decoration-a-line-2 underline-offset-4 transition-colors hover:decoration-a-amber"
                    >
                      {item.label}
                    </Link>
                  </CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.18} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/free-audit" arrow="right">
                Book a free audit
              </ButtonLink>
              <ButtonLink href={gpSector.demo.href} tone="glass" arrow="up">
                Open the sample site
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Tilt max={6}>
              <a
                href={gpSector.demo.href}
                aria-label={`Open the ${gpSector.demo.name} sample website`}
                className="block rounded-[22px]"
              >
                <BrowserFrame src={gpSector.demo.image} alt={gpSector.demo.imageAlt} url={`${site.domain}${gpSector.demo.href}`} />
              </a>
            </Tilt>
            <p className="mt-4 text-center text-[13px] text-a-muted">
              A live, hosted sample. The organisation shown is fictional.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Geography */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal className="a-glass flex flex-col gap-6 rounded-[28px] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Eyebrow>Geography</Eyebrow>
              <Display size="md" className="mt-4">
                Berkshire and the <em>Thames Valley</em>.
              </Display>
            </div>
            <p className="max-w-[46ch] text-[16.5px] leading-[1.65] text-a-ink-soft">
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
