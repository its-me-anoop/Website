"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { KilnShell } from "../KilnShell";
import { CtaBand } from "../CtaBand";
import { clearPath, gpSector } from "../data";
import {
  BrowserFrame,
  BtnLink,
  CheckItem,
  Display,
  Eyebrow,
  Rise,
  SectionHead,
  Tag,
} from "../primitives";

const heroPoints = [
  "Free website audit",
  "Reserve by 31 October 2026",
  "Reading-based studio",
] as const;

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
    <KilnShell>
      <section id="top" className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center sm:px-8">
          <Rise>
            <Eyebrow className="text-k-muted">Clear Path · GP migration</Eyebrow>
          </Rise>
          <Rise delay={0.06}>
            <Display as="h1" size="xl" className="mt-5 max-w-[18ch] text-k-ink sm:mt-6">
              Leaving <em>My Surgery Website</em>?
            </Display>
          </Rise>
          <Rise delay={0.12}>
            <Display as="h2" size="sm" className="mt-6 max-w-[28ch] text-k-ink">
              Clear Path moves you to a site you own — without turning it into a{" "}
              <em>redesign</em> project.
            </Display>
          </Rise>
          <Rise delay={0.18}>
            <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-[1.6] text-k-ink-soft sm:mt-6 sm:text-[17.5px]">
              For Berkshire and Thames Valley practice managers who need to stay
              online, meet accessibility standards, and keep control of their domain.
            </p>
          </Rise>
          <Rise
            delay={0.24}
            className="mt-8 flex w-full max-w-[420px] flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <BtnLink href="/free-audit" tone="fire" size="lg" arrow="right" className="w-full sm:w-auto">
              Book a free audit
            </BtnLink>
            <BtnLink href="/book" tone="outline" size="lg" className="w-full sm:w-auto">
              Book a call
            </BtnLink>
          </Rise>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1280px] px-5 pb-20 sm:mt-12 sm:px-8 sm:pb-32">
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-3 sm:gap-x-10">
            {heroPoints.map((point, i) => (
              <Rise as="li" key={point} delay={0.3 + i * 0.06} className="border-t border-k-line pt-5">
                <span className="text-[15.5px] leading-[1.55] text-k-ink">{point}</span>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-k-line bg-k-bone-2/60">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <Rise>
              <Eyebrow className="text-k-muted">Why this page exists</Eyebrow>
              <Display as="h2" size="md" className="mt-5 text-k-ink">
                MSW is shutting down. That&rsquo;s <em>Clear Path</em>.
              </Display>
            </Rise>
            <div className="max-w-[62ch] space-y-5 text-[16.5px] leading-[1.65] text-k-ink-soft">
              <Rise>
                <p>
                  My Surgery Website (MSW / FPM) is shutting down. Public notices
                  point to pressure on domain instructions around September 2026
                  and hosting ending 31 March 2027 — check your own MSW letter for
                  your exact dates.
                </p>
              </Rise>
              <Rise delay={0.06}>
                <p>
                  If you&rsquo;re a practice manager in Berkshire or the Thames
                  Valley, you need a clear quote, a migration checklist, and a
                  go-live date that won&rsquo;t leave reception under pressure.
                </p>
              </Rise>
              <Rise delay={0.1}>
                <p>That&rsquo;s Clear Path.</p>
              </Rise>
            </div>
          </div>
        </div>
      </section>

      <section className="on-coal bg-k-coal text-k-coal-ink">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHead
            eyebrow="What Clear Path is"
            title={
              <>
                A time-boxed migration — not a six-month <em>brand</em> project.
              </>
            }
            copy="We move your content, sort the domain, and get you live on a modern site you own. Built for WCAG 2.2 AA. No WordPress page-builder stack. Founder-led: you brief the person who builds."
            onCoal
            align="left"
            size="md"
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-12">
            <Rise>
              <p className="k-eyebrow text-k-coal-soft">Who it is for</p>
              <ul className="mt-5 divide-y divide-k-coal-line border-y border-k-coal-line">
                {forWho.map((item) => (
                  <CheckItem key={item} onCoal className="py-4">
                    {item}
                  </CheckItem>
                ))}
              </ul>
            </Rise>
            <Rise delay={0.08}>
              <p className="k-eyebrow text-k-coal-soft">Who it isn&rsquo;t for</p>
              <ul className="mt-5 divide-y divide-k-coal-line border-y border-k-coal-line">
                {notForWho.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-4">
                    <X
                      size={15}
                      strokeWidth={2.4}
                      aria-hidden
                      className="mt-[5px] shrink-0 text-k-coal-soft"
                    />
                    <span className="text-[15px] leading-[1.55] text-k-coal-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>
      </section>

      <section id="packages" className="on-coal relative scroll-mt-24 overflow-hidden bg-k-coal text-k-coal-ink">
        <div aria-hidden className="k-dots absolute inset-0 opacity-70" />
        <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHead
            eyebrow="Packages"
            title={
              <>
                Two ways to <em>move</em>.
              </>
            }
            copy="Published prices, plus VAT. Reserve by 31 October 2026. Capacity is capped, so the quote includes a go-live date you can plan around."
            onCoal
          />
          <ul className="mt-14 grid items-stretch gap-4 md:grid-cols-2">
            {clearPath.packages.map((pkg, i) => (
              <Rise as="li" key={pkg.name} delay={i * 0.08} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-[16px] bg-k-paper p-6 text-k-ink sm:p-7 xl:p-8",
                    pkg.featured &&
                      "shadow-[0_0_0_1px_rgba(255,138,91,0.5),0_40px_90px_-40px_rgba(255,138,91,0.55)]"
                  )}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="k-display text-[32px] leading-none">{pkg.name}</h3>
                    {pkg.featured ? (
                      <Tag tone="fire" className="self-start">
                        Premium custom
                      </Tag>
                    ) : null}
                  </div>
                  <p className="mt-2 text-[15px] text-k-ink-soft">{pkg.strap}</p>
                  <p className="k-display mt-8 text-[clamp(2.1rem,3.4vw,2.75rem)] leading-none text-k-ink">
                    {pkg.price}
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.45] text-k-ink-soft">{pkg.pricePeriod}</p>
                  {pkg.priceNote ? (
                    <p className="mt-2 max-w-[38ch] text-[14.5px] leading-[1.5] text-k-ink-soft">
                      {pkg.priceNote}
                    </p>
                  ) : null}
                  <p className="mt-5 text-[15.5px] leading-[1.55] text-k-ink">{pkg.copy}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-k-line pt-6">
                    {pkg.features.map((feature) => (
                      <CheckItem key={feature}>{feature}</CheckItem>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <BtnLink
                      href={pkg.ctaHref}
                      tone={pkg.featured ? "fire" : "coal"}
                      className="w-full"
                    >
                      {pkg.cta}
                    </BtnLink>
                  </div>
                </article>
              </Rise>
            ))}
          </ul>
          <Rise className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="max-w-[640px] text-[14.5px] leading-[1.6] text-k-coal-soft">
              Reserve by 31 October 2026. Not sure which fits? Start with the free
              audit and say you&rsquo;re leaving MSW — we&rsquo;ll map the move.
            </p>
            <BtnLink href="/book" tone="outline-coal" size="sm" arrow="right">
              Book a call
            </BtnLink>
          </Rise>
        </div>
      </section>

      <section className="border-t border-k-line">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <Rise>
              <Eyebrow className="text-k-muted">How the move works</Eyebrow>
              <Display as="h2" size="md" className="mt-5 text-k-ink">
                Four steps to a site you <em>own</em>.
              </Display>
            </Rise>
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {clearPath.steps.map((step, i) => (
                <Rise as="li" key={step.title} delay={(i % 2) * 0.06} className="border-t border-k-line py-7">
                  <span className="k-display block text-[13px] tabular-nums text-k-fire">
                    0{i + 1}
                  </span>
                  <h3 className="k-display mt-3 text-[24px] text-k-ink">{step.title}</h3>
                  <p className="mt-2.5 max-w-[40ch] text-[15px] leading-[1.6] text-k-ink-soft">
                    {step.copy}
                  </p>
                </Rise>
              ))}
            </ol>
          </div>
          <Rise className="mx-auto mt-12 max-w-[720px] border-t border-k-line pt-10 text-center sm:mt-16">
            <p className="text-[16.5px] leading-[1.65] text-k-ink-soft">
              Capacity is capped (about 2–3 builds/mo) so delivery stays honest. We
              won&rsquo;t claim thousands of surgeries. We will show you a live GP
              demo, our accessibility statement, and what the audit found on your
              site.
            </p>
          </Rise>
        </div>
      </section>

      <section className="border-t border-k-line bg-k-bone-2/60">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHead
            eyebrow="Dates"
            title={
              <>
                The dates that <em>matter</em>.
              </>
            }
            copy="Website migration path only. Not inventing clinical-system deadlines — check your own MSW letter for your exact dates."
            align="left"
            size="md"
          />
          <ol className="mt-14 grid gap-x-10 sm:grid-cols-3">
            {clearPath.dates.map((item, i) => (
              <Rise as="li" key={item.label} delay={i * 0.08} className="border-t border-k-line py-7">
                <span className="k-eyebrow text-k-muted">{item.label}</span>
                <h3 className="k-display mt-3 text-[clamp(1.4rem,2.4vw,1.85rem)] text-k-ink">
                  {item.when}
                </h3>
                <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.6] text-k-ink-soft">
                  {item.copy}
                </p>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Rise>
            <Eyebrow className="text-k-muted">Proof</Eyebrow>
            <Display as="h2" size="md" className="mt-5 max-w-[16ch] text-k-ink">
              Click around <em>{gpSector.demo.name}</em> before you talk to anyone.
            </Display>
            <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.6] text-k-ink-soft">
              A live GP demo, the accessibility statement, and published packages.
              Book your free audit — say you&rsquo;re leaving MSW and we&rsquo;ll
              map the move.
            </p>
          </Rise>
          <Rise delay={0.1}>
            <ul className="mt-6 space-y-2.5">
              {proofLinks.map((item) => (
                <CheckItem key={item.href}>
                  <Link
                    href={item.href}
                    className="underline decoration-k-line-2 underline-offset-4 transition-colors hover:decoration-k-ink"
                  >
                    {item.label}
                  </Link>
                </CheckItem>
              ))}
            </ul>
          </Rise>
          <Rise delay={0.18} className="mt-8 flex flex-wrap gap-3">
            <BtnLink href="/free-audit" tone="fire" arrow="right">
              Book a free audit
            </BtnLink>
            <BtnLink href={gpSector.demo.href} tone="outline" arrow="up">
              Open the sample site
            </BtnLink>
          </Rise>
        </div>

        <Rise delay={0.15}>
          <a
            href={gpSector.demo.href}
            aria-label={`Open the ${gpSector.demo.name} sample website`}
            className="group block rounded-[18px] focus-visible:outline-offset-4"
          >
            <BrowserFrame
              src={gpSector.demo.image}
              alt={gpSector.demo.imageAlt}
              url={`${site.domain}${gpSector.demo.href}`}
              className="transition-transform duration-500 ease-out group-hover:-translate-y-1"
            />
            <span className="mt-3 block text-center text-[13px] text-k-muted">
              A live, hosted sample. The organisation shown is fictional.
            </span>
          </a>
        </Rise>
      </section>

      <section className="border-t border-k-line bg-k-bone-2/60">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
            <Rise>
              <Eyebrow className="text-k-muted">Geography</Eyebrow>
              <Display as="h2" size="md" className="mt-5 text-k-ink">
                Berkshire and the <em>Thames Valley</em>.
              </Display>
            </Rise>
            <Rise delay={0.08}>
              <p className="max-w-[58ch] text-[16.5px] leading-[1.65] text-k-ink-soft">
                Berkshire / Thames Valley (RG / SL / OX / HP + wider Thames Valley
                ICB). Outside? Ask — we&rsquo;ll say if capacity fits.
              </p>
            </Rise>
          </div>
        </div>
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
    </KilnShell>
  );
}
