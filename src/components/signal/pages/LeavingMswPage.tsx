"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { site } from "@/lib/site";
import { clearPath, gpSector } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { PackageCard } from "../ui/PackageCard";
import { ButtonLink, CheckItem, Container, Label, Screenshot, SectionIntro } from "../ui/primitives";

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
        label="Clear Path, GP migration"
        title={
          <>
            Leaving <em>My Surgery Website</em>?
          </>
        }
        copy={
          <>
            <h2 className="s-display text-[clamp(1.5rem,2.6vw,2.1rem)] text-s-on-ink">
              Clear Path moves you to a site you own — without turning it into a redesign project.
            </h2>
            <p className="mt-6">
              For Berkshire and Thames Valley practice managers who need to stay online, meet accessibility
              standards, and keep control of their domain.
            </p>
          </>
        }
      >
        <ButtonLink href="/free-audit" size="lg" arrow="right">
          Book a free audit
        </ButtonLink>
        <ButtonLink href="/book" tone="outline" size="lg">
          Book a call
        </ButtonLink>
        <ul className="mt-2 space-y-2">
          {heroPoints.map((point) => (
            <CheckItem key={point}>{point}</CheckItem>
          ))}
        </ul>
      </PageHero>

      {/* Why */}
      <section className="s-paper py-24 sm:py-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <SectionIntro
            onPaper
            label="Why this page exists"
            size="md"
            title={
              <>
                MSW is shutting down. That&rsquo;s <em>Clear Path</em>.
              </>
            }
          />
          <Reveal delay={0.08} className="max-w-[62ch] space-y-5 text-[18px] leading-[1.65] text-s-on-paper-2">
            <p>
              My Surgery Website (MSW / FPM) is shutting down. Public notices point to pressure on domain instructions
              around September 2026 and hosting ending 31 March 2027 — check your own MSW letter for your exact
              dates.
            </p>
            <p>
              If you&rsquo;re a practice manager in Berkshire or the Thames Valley, you need a clear quote, a
              migration checklist, and a go-live date that won&rsquo;t leave reception under pressure.
            </p>
            <p className="s-display text-[28px] text-s-on-paper">That&rsquo;s Clear Path.</p>
          </Reveal>
        </Container>
      </section>

      {/* What it is */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro
            label="What Clear Path is"
            size="md"
            title={
              <>
                A time-boxed migration — not a six-month <em>brand</em> project.
              </>
            }
            copy="We move your content, sort the domain, and get you live on a modern site you own. Built for WCAG 2.2 AA. No WordPress page-builder stack. Founder-led: you brief the person who builds."
          />
          <div className="mt-14 grid gap-12 border-t border-s-line pt-10 md:grid-cols-2">
            <Reveal>
              <Label className="text-s-on-ink-2">Who it is for</Label>
              <ul className="mt-6 space-y-4">
                {forWho.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.06}>
              <Label className="text-s-on-ink-2">Who it isn&rsquo;t for</Label>
              <ul className="mt-6 space-y-4">
                {notForWho.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X size={17} strokeWidth={2.6} aria-hidden className="mt-[4px] shrink-0 text-s-fail" />
                    <span className="text-[16px] leading-[1.55] text-s-on-ink-2">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-16 border-t border-s-line py-24 sm:py-32">
        <Container>
          <SectionIntro
            label="Packages"
            title={
              <>
                Two ways to <em>move</em>.
              </>
            }
            copy="Published prices, plus VAT. Reserve by 31 October 2026. Capacity is capped, so the quote includes a go-live date you can plan around."
          />
          <ul className="mt-14 grid max-w-[1000px] items-stretch gap-5 md:grid-cols-2">
            {clearPath.packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} badge="Premium custom" />
            ))}
          </ul>
          <Reveal className="mt-10 flex flex-col items-start gap-4">
            <p className="max-w-[640px] text-[16.5px] leading-[1.6] text-s-on-ink-2">
              Reserve by 31 October 2026. Not sure which fits? Start with the free audit and say you&rsquo;re leaving
              MSW — we&rsquo;ll map the move.
            </p>
            <ButtonLink href="/book" tone="outline" size="sm" arrow="right">
              Book a call
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* Steps and dates */}
      <section className="s-paper py-24 sm:py-32">
        <Container>
          <SectionIntro
            onPaper
            label="How the move works"
            size="md"
            title={
              <>
                Four steps to a site you <em>own</em>.
              </>
            }
          />
          <ol className="mt-14 grid gap-10 border-t border-s-on-paper pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {clearPath.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.05}>
                <span className="text-[14px] tabular-nums text-s-on-paper-2">Step {i + 1}</span>
                <h3 className="s-display mt-3 text-[28px]">{step.title}</h3>
                <p className="mt-3 max-w-[34ch] text-[16.5px] leading-[1.6] text-s-on-paper-2">{step.copy}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14 max-w-[760px]">
            <p className="text-[17px] leading-[1.65] text-s-on-paper-2">
              Capacity is capped (about 2–3 builds/mo) so delivery stays honest. We won&rsquo;t claim thousands of
              surgeries. We will show you a live GP demo, our accessibility statement, and what the audit found on your
              site.
            </p>
          </Reveal>

          <h2 className="s-display mt-24 text-[clamp(1.8rem,3.6vw,3rem)]">
            The dates that <em>matter</em>.
          </h2>
          <p className="mt-5 max-w-[640px] text-[17px] leading-[1.6] text-s-on-paper-2">
            Website migration path only. Not inventing clinical-system deadlines — check your own MSW letter for your
            exact dates.
          </p>
          <ol className="mt-10 grid border-t border-s-line-paper sm:grid-cols-3">
            {clearPath.dates.map((item, i) => (
              <Reveal
                as="li"
                key={item.label}
                delay={i * 0.05}
                className="border-b border-s-line-paper py-7 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
              >
                <Label className="text-s-on-paper-2">{item.label}</Label>
                <h3 className="s-display mt-3 text-[clamp(1.7rem,2.6vw,2.2rem)]">{item.when}</h3>
                <p className="mt-3 max-w-[36ch] text-[16px] leading-[1.6] text-s-on-paper-2">{item.copy}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Proof */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-start gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <SectionIntro
              label="Proof"
              size="md"
              title={
                <>
                  Click around <em>{gpSector.demo.name}</em> before you talk to anyone.
                </>
              }
              copy="A live GP demo, the accessibility statement, and published packages. Book your free audit — say you're leaving MSW and we'll map the move."
            />
            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-3">
                {proofLinks.map((item) => (
                  <CheckItem key={item.href}>
                    <Link href={item.href} className="underline underline-offset-4 hover:decoration-s-signal hover:decoration-2">
                      {item.label}
                    </Link>
                  </CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.14} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/free-audit" arrow="right">
                Book a free audit
              </ButtonLink>
              <ButtonLink href={gpSector.demo.href} tone="outline" arrow="up">
                Open the sample site
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a href={gpSector.demo.href} aria-label={`Open the ${gpSector.demo.name} sample website`} className="block">
              <Screenshot
                src={gpSector.demo.image}
                alt={gpSector.demo.imageAlt}
                url={`${site.domain}${gpSector.demo.href} · the organisation shown is fictional`}
              />
            </a>
          </Reveal>
        </Container>
      </section>

      {/* Geography */}
      <section className="border-t border-s-line py-20">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 className="s-display text-[clamp(1.8rem,3.4vw,2.8rem)]">
            Berkshire and the <em>Thames Valley</em>.
          </h2>
          <p className="max-w-[52ch] text-[18px] leading-[1.6] text-s-on-ink-2">
            Berkshire / Thames Valley (RG / SL / OX / HP + wider Thames Valley ICB). Outside? Ask — we&rsquo;ll say if
            capacity fits.
          </p>
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
