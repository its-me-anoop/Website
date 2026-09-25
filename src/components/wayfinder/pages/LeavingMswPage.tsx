import Link from "next/link";
import { site } from "@/lib/site";
import { clearPath, gpSector } from "@/lib/marketing/content";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { Reveal } from "../motion/Reveal";
import { CheckItem, CrossItem } from "../ui/Bits";
import { ButtonLink } from "../ui/Button";
import { ScreenFrame } from "../ui/Frames";
import { PackageCard } from "../ui/PackageCard";
import { Container, Heading, Kicker, SectionHead } from "../ui/Type";

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
 * and Thames Valley GP practices. Copy, prices and CTAs are locked; only
 * the presentation is Wayfinder's. The dates read like a departure
 * board, because that is what they are.
 */
export function LeavingMswPage() {
  return (
    <Shell>
      <PageHero
        kicker="Clear Path · GP migration"
        title={
          <>
            Leaving <mark className="wf-mark">My Surgery Website</mark>?
          </>
        }
        copy={
          <>
            <h2 className="mt-1 max-w-[30ch] text-[clamp(1.35rem,2.4vw,1.9rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-wf-ink">
              Clear Path moves you to a site you own — without turning it into a redesign project.
            </h2>
            <p className="mt-5">
              For Berkshire and Thames Valley practice managers who need to stay online, meet accessibility standards,
              and keep control of their domain.
            </p>
          </>
        }
        aside={<DeparturesBoard compact />}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/free-audit">Book a free audit</ButtonLink>
          <ButtonLink href="/book" tone="outline">
            Book a call
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {heroPoints.map((point) => (
            <li key={point} className="wf-label rounded-[4px] border-[1.5px] border-wf-ink px-3 py-1.5 font-bold">
              {point}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Why */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
          <SectionHead
            kicker="Why this page exists"
            size="md"
            title={<>MSW is shutting down. That&rsquo;s Clear Path.</>}
          />
          <div className="max-w-[62ch] space-y-5 border-t-2 border-wf-ink pt-8 text-[18px] leading-[1.7] text-wf-ink-soft">
            <p>
              My Surgery Website (MSW / FPM) is shutting down. Public notices point to pressure on domain instructions
              around September 2026 and hosting ending 31 March 2027 — check your own MSW letter for your exact
              dates.
            </p>
            <p>
              If you&rsquo;re a practice manager in Berkshire or the Thames Valley, you need a clear quote, a
              migration checklist, and a go-live date that won&rsquo;t leave reception under pressure.
            </p>
            <p className="text-[26px] font-extrabold tracking-[-0.02em] text-wf-ink">That&rsquo;s Clear Path.</p>
          </div>
        </Container>
      </section>

      {/* What it is */}
      <section className="border-y-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28">
        <Container>
          <SectionHead
            kicker="What Clear Path is"
            size="md"
            title="A time-boxed migration — not a six-month brand project."
            copy="We move your content, sort the domain, and get you live on a modern site you own. Built for WCAG 2.2 AA. No WordPress page-builder stack. Founder-led: you brief the person who builds."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="wf-plate p-7 sm:p-8">
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">Who it is for</h3>
              <ul className="mt-6 space-y-4">
                {forWho.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </div>
            <div className="rounded-[8px] border-[1.5px] border-dashed border-wf-line-2 p-7 sm:p-8">
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">Who it isn&rsquo;t for</h3>
              <ul className="mt-6 space-y-4">
                {notForWho.map((item) => (
                  <CrossItem key={item}>{item}</CrossItem>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHead
            kicker="Packages"
            title="Two ways to move."
            copy="Published prices, plus VAT. Reserve by 31 October 2026. Capacity is capped, so the quote includes a go-live date you can plan around."
          />
          <ul className="mt-12 grid max-w-[1000px] items-stretch gap-5 md:grid-cols-2">
            {clearPath.packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} badge="Premium custom" />
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-start gap-4">
            <p className="max-w-[64ch] text-[16.5px] leading-[1.65] text-wf-ink-soft">
              Reserve by 31 October 2026. Not sure which fits? Start with the free audit and say you&rsquo;re leaving
              MSW — we&rsquo;ll map the move.
            </p>
            <ButtonLink href="/book" tone="text" size="sm">
              Book a call
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="wf-on-ink bg-wf-ink py-20 text-wf-on-ink sm:py-28">
        <Container>
          <SectionHead kicker="How the move works" size="md" title="Four steps to a site you own." />
          <ol className="relative mt-14 grid gap-12 pl-14 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-16">
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[15px] top-2 w-[6px] rounded-full bg-wf-sign md:left-4 md:right-0 md:top-[15px] md:h-[6px] md:w-auto"
            />
            {clearPath.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-14 top-0 h-9 w-9 rounded-full border-[5px] border-wf-sign bg-wf-ink md:-top-16 md:left-0"
                />
                <p className="wf-label text-wf-sign">Step {i + 1}</p>
                <h3 className="mt-2 text-[26px] font-extrabold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 max-w-[34ch] text-[16.5px] leading-[1.6] text-wf-on-ink-soft">{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="mt-16 max-w-[70ch] border-t border-wf-on-ink-line pt-8 text-[17px] leading-[1.7] text-wf-on-ink-soft">
            Capacity is capped (about 2–3 builds/mo) so delivery stays honest. We won&rsquo;t claim thousands of
            surgeries. We will show you a live GP demo, our accessibility statement, and what the audit found on your
            site.
          </p>
        </Container>
      </section>

      {/* Dates */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHead
            kicker="Dates"
            size="md"
            title="The dates that matter."
            copy="Website migration path only. Not inventing clinical-system deadlines — check your own MSW letter for your exact dates."
          />
          <Reveal className="mt-12">
            <DeparturesBoard />
          </Reveal>
        </Container>
      </section>

      {/* Proof */}
      <section className="border-y-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Kicker>Proof</Kicker>
            <Heading size="md" className="mt-6 max-w-[18ch]">
              Click around {gpSector.demo.name} before you talk to anyone.
            </Heading>
            <p className="mt-5 max-w-[56ch] text-[17.5px] leading-[1.65] text-wf-ink-soft">
              A live GP demo, the accessibility statement, and published packages. Book your free audit — say
              you&rsquo;re leaving MSW and we&rsquo;ll map the move.
            </p>
            <ul className="mt-7 space-y-3">
              {proofLinks.map((item) => (
                <CheckItem key={item.href}>
                  <Link href={item.href} className="wf-link font-bold">
                    {item.label}
                  </Link>
                </CheckItem>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/free-audit">Book a free audit</ButtonLink>
              <ButtonLink href={gpSector.demo.href} tone="outline" arrow="up-right">
                Open the sample site
              </ButtonLink>
            </div>
          </div>
          <div className="min-w-0">
            <a href={gpSector.demo.href} className="block">
              <ScreenFrame src={gpSector.demo.image} alt={gpSector.demo.imageAlt} url={`${site.domain}${gpSector.demo.href}`} />
            </a>
            <p className="mt-4 text-[14.5px] text-wf-muted">A live, hosted sample. The organisation shown is fictional.</p>
          </div>
        </Container>
      </section>

      {/* Geography */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 border-y-2 border-wf-ink py-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Kicker>Geography</Kicker>
              <Heading size="md" className="mt-5">
                Berkshire and the Thames Valley.
              </Heading>
            </div>
            <p className="max-w-[50ch] text-[17.5px] leading-[1.65] text-wf-ink-soft">
              Berkshire / Thames Valley (RG / SL / OX / HP + wider Thames Valley ICB). Outside? Ask — we&rsquo;ll say
              if capacity fits.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Book a free audit — say you&rsquo;re leaving <mark className="wf-mark">MSW.</mark>
          </>
        }
        copy="We'll map the move from your current site: what has to come across, which package fits, and a go-live date that won't leave reception under pressure."
        id="contact"
      />
    </Shell>
  );
}

/**
 * The three Clear Path dates as a departures board: ink panel, mono
 * labels, yellow dates. `compact` is the hero version without notes.
 */
function DeparturesBoard({ compact }: { compact?: boolean }) {
  return (
    <div className="wf-board wf-on-ink overflow-hidden">
      <p className="wf-label flex items-center justify-between border-b border-wf-on-ink-line px-5 py-3 text-wf-on-ink-soft sm:px-6">
        <span>MSW migration</span>
        <span>Check your own letter</span>
      </p>
      <ol>
        {clearPath.dates.map((item) => (
          <li
            key={item.label}
            className={
              compact
                ? "flex items-baseline justify-between gap-4 border-b border-wf-on-ink-line px-5 py-4 last:border-b-0 sm:px-6"
                : "grid gap-2 border-b border-wf-on-ink-line px-5 py-6 last:border-b-0 sm:px-6 md:grid-cols-[minmax(0,220px)_minmax(0,260px)_1fr] md:items-baseline md:gap-8"
            }
          >
            {compact ? (
              <>
                <span className="text-[17px] font-bold">{item.label}</span>
                <span className="wf-mono shrink-0 text-[16px] text-wf-sign">{item.when}</span>
              </>
            ) : (
              <>
                <h3 className="text-[20px] font-extrabold tracking-[-0.01em]">{item.label}</h3>
                <p className="wf-mono text-[20px] text-wf-sign">{item.when}</p>
                <p className="text-[16px] leading-[1.6] text-wf-on-ink-soft">{item.copy}</p>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
