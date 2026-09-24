"use client";

import { Accessibility, Gauge, MapPin, MessagesSquare, Search, ShieldCheck, Smartphone } from "lucide-react";
import { auditChecks, auditPromises } from "@/lib/marketing/content";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { AuditBar, ButtonLink, CheckItem, Container, Eyebrow, SectionIntro } from "../ui/primitives";

const steps = [
  {
    title: "Paste your website address",
    copy: "Press the arrow and the instant audit runs in a few seconds. No form, no sign-up, nothing stored.",
  },
  {
    title: "Read the scored report",
    copy: "An overall score, seven area scores and every check explained: what was found, why it matters to your visitors, and how to fix it.",
  },
  {
    title: "Ask for the written review",
    copy: "One click opens a prefilled email. Flutterly then reviews the site by hand, covering design, content and real-device speed, usually within a week.",
  },
] as const;

const instantVsWritten = [
  {
    label: "Instant audit",
    points: [
      "Runs in seconds, in your browser",
      "Reads the page’s HTML and response headers",
      "Around sixty checks across seven areas",
      "Sector-aware: GP, care home, dental, pharmacy, physio",
      "Shareable link, and a designed PDF to hand round",
    ],
  },
  {
    label: "Written audit",
    points: [
      "Reviewed by hand, usually within a week",
      "Real devices, real connections, JavaScript included",
      "Design, content quality and the journeys visitors take",
      "Set against the standards NHS and CQC-regulated sites are held to",
      "A scored, written report with fixes in priority order",
    ],
  },
] as const;

const icons = [Accessibility, Gauge, Search, MessagesSquare, Smartphone, ShieldCheck, MapPin] as const;

/** /free-audit: the indexable landing page for the instant audit. */
export function AuditLanding() {
  return (
    <Shell>
      <PageHero
        eyebrow="Free website audit"
        title={
          <>
            Find out how your website <em>really</em> performs.
          </>
        }
        copy={
          <p>
            Paste your address and get a scored report in seconds: accessibility, speed, search, content, mobile,
            security and local presence, each explained in plain English with the fix. Then, if you want it, a
            written review by a person. Both free.
          </p>
        }
      >
        <AuditBar align="center" hint="Paste your address and press the arrow. The report appears in a few seconds." />
        <ButtonLink href="/packages" tone="ghost" size="sm" className="mt-6">
          Or see the packages first
        </ButtonLink>
      </PageHero>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro
            eyebrow="What gets checked"
            title={
              <>
                Seven areas, scored and <em>explained</em>.
              </>
            }
            copy="Each area is weighted by how much it affects the people your website serves. Accessibility and content count most, because those are what patients and families feel first."
          />
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {auditChecks.map((check, i) => {
              const Icon = icons[i];
              return (
                <Reveal
                  as="li"
                  key={check.title}
                  delay={(i % 4) * 0.05}
                  className={i === 0 ? "h-full sm:col-span-2" : "h-full"}
                >
                  <article className="a-glass a-spot flex h-full flex-col rounded-[26px] p-7">
                    <div className="flex items-center justify-between">
                      <span
                        aria-hidden
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-a-line-2 bg-white/5"
                      >
                        <Icon size={20} strokeWidth={1.6} />
                      </span>
                      <span className="a-mono text-[12px] text-a-muted">0{i + 1}</span>
                    </div>
                    <h3 className="a-display mt-8 text-[24px]">{check.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-a-ink-soft">{check.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro
            align="center"
            eyebrow="How it works"
            title={
              <>
                Seconds now, a <em>written review</em> within a week.
              </>
            }
          />
          <ol className="mt-16 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="h-full">
                <article className="a-glass a-spot relative h-full overflow-hidden rounded-[28px] p-8">
                  <span aria-hidden className="a-display a-grad-text absolute -right-2 -top-6 text-[140px] opacity-25">
                    {i + 1}
                  </span>
                  <p className="a-mono text-[12px] tracking-[0.14em] text-a-amber">STEP {i + 1}</p>
                  <h3 className="a-display relative mt-10 text-[26px]">{step.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-[1.65] text-a-ink-soft">{step.copy}</p>
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-20">
            <h2 className="a-display text-center text-[clamp(1.6rem,3vw,2.4rem)]">
              What each audit can <em>see</em>
            </h2>
            <div className="mx-auto mt-10 grid max-w-[1000px] gap-5 sm:grid-cols-2">
              {instantVsWritten.map((col, i) => (
                <div key={col.label} className={i === 1 ? "a-conic rounded-[28px] bg-a-deep p-8" : "a-glass rounded-[28px] p-8"}>
                  <Eyebrow>{col.label}</Eyebrow>
                  <ul className="mt-6 grid gap-3.5">
                    {col.points.map((p) => (
                      <CheckItem key={p}>{p}</CheckItem>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-20 max-w-[860px]">
            <h2 className="a-display text-center text-[clamp(1.6rem,3vw,2.4rem)]">The audit promise</h2>
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {auditPromises.map((promise) => (
                <CheckItem key={promise}>{promise}</CheckItem>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            A few seconds now, a clear picture within a <em>week</em>.
          </>
        }
        copy="Paste your website address for the instant report. Ask for the written review from the results page, and Flutterly will do the rest: whoever ends up making the fixes."
        id="contact"
      />
    </Shell>
  );
}

