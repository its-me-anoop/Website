"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pillars, serviceHref, servicesInPillar } from "@/lib/marketing/services";
import { Shell } from "../layout/Shell";
import { PageHero } from "../layout/PageHero";
import { CtaBand } from "../layout/CtaBand";
import { ButtonLink, Container } from "../ui/primitives";

/**
 * Every service, grouped under the three pillars of the rebrand:
 * Build (websites, apps), Support (IT) and Grow (social, SEO).
 */
export function ServicesIndexPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Build it. Run it. <em>Grow it.</em>
          </>
        }
        copy={
          <p>
            Five services from one studio in Reading. Pick the one you need now, and add the rest when you are ready,
            without briefing a new agency each time.
          </p>
        }
      >
        <ButtonLink href="/book" size="lg" arrow="right" magnetic>
          Book a call
        </ButtonLink>
      </PageHero>

      <div className="a-paper bg-a-paper text-a-paper-ink">
        {pillars.map((pillar, i) => (
          <section
            key={pillar.name}
            aria-labelledby={`pillar-${pillar.name}`}
            className="fx-grid border-t border-a-paper-line-2 py-[clamp(64px,8vw,120px)] first:border-t-0"
          >
            <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
              <div className="flex flex-col gap-4">
                <span aria-hidden className="a-mono text-[12px] text-a-ink-soft">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
                <h2
                  id={`pillar-${pillar.name}`}
                  className="fx-wt a-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] text-a-ink"
                >
                  {pillar.name}
                </h2>
                <p className="fx-wp max-w-[340px] text-[17px] leading-[1.6] text-a-ink-soft">{pillar.line}</p>
              </div>
              <ul className="m-0 list-none border-t border-a-paper-line-2 p-0">
                {servicesInPillar(pillar.name).map((service) => (
                  <li key={service.slug} className="fx-row border-b border-a-paper-line-2">
                    <div className="fx-row-fill" aria-hidden="true" />
                    <Link
                      href={serviceHref(service.slug)}
                      data-cursor={service.cursorLabel}
                      className="grid items-baseline gap-x-10 gap-y-2 px-3 py-8 text-a-ink md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto]"
                    >
                      <span className="fx-row-ink a-display text-[clamp(2rem,3.6vw,3.25rem)] leading-none tracking-[-0.035em]">
                        {service.name}
                      </span>
                      <span className="fx-wp fx-row-ink text-[17px] leading-[1.55] text-a-ink-soft">{service.summary}</span>
                      <ArrowRight className="fx-row-arrow fx-row-ink" size={26} strokeWidth={1.6} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ))}
      </div>

      <CtaBand
        id="contact"
        title={
          <>
            Not sure where to <em>start?</em>
          </>
        }
        copy="Most people start with a short call or a free audit of their current website. Either way you get a plain written answer about what to do first."
      />
    </Shell>
  );
}
