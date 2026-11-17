"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pillars, serviceHref, servicesInPillar } from "@/lib/marketing/services";
import { Reveal } from "../effects/Motion";
import { Shell } from "../layout/Shell";
import { PageHero } from "../layout/PageHero";
import { CtaBand } from "../layout/CtaBand";
import { ButtonLink, Container } from "../ui/primitives";
import { serviceTone } from "../ui/tones";

/**
 * Every service, grouped under the three pillars: Build (websites,
 * apps), Support (IT) and Grow (social, SEO). Each service is a card in
 * its own colour that tips up as its pillar scrolls in.
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
        <ButtonLink href="/book" size="lg" arrow="right">
          Book a call
        </ButtonLink>
      </PageHero>

      <div className="tone-white">
        {pillars.map((pillar, i) => (
          <section
            key={pillar.name}
            aria-labelledby={`pillar-${pillar.name}`}
            className="border-t-2 border-s-rule py-[clamp(56px,7vw,104px)] first:border-t-0"
          >
            <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
              <div className="flex flex-col gap-4">
                <span aria-hidden className="s-label s-num text-[13px] text-s-accent">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
                <h2 id={`pillar-${pillar.name}`} className="s-display text-[clamp(2.6rem,5vw,4.4rem)]">
                  {pillar.name}
                </h2>
                <p className="max-w-[340px] text-[17.5px] leading-[1.55] text-s-ink-soft">{pillar.line}</p>
              </div>
              <ul className="m-0 grid list-none gap-5 p-0">
                {servicesInPillar(pillar.name).map((service, n) => (
                  <Reveal as="li" key={service.slug} turn={50} delay={n * 0.1}>
                    <Link
                      href={serviceHref(service.slug)}
                      className={`${serviceTone[service.slug]} group grid items-center gap-x-10 gap-y-3 rounded-[16px] border-2 border-s-rule px-6 py-7 shadow-[0_7px_0_0_var(--s-rule)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_11px_0_0_var(--s-rule)] sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto]`}
                    >
                      <span className="s-display text-[clamp(2rem,3.4vw,3rem)]">{service.name}</span>
                      <span className="text-[17px] font-medium leading-[1.5] text-s-ink-soft">{service.summary}</span>
                      <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-[9px] border-2 border-s-ink">
                        <ArrowRight className="transition-transform duration-300 group-hover:-rotate-45" size={24} strokeWidth={2.4} />
                      </span>
                    </Link>
                  </Reveal>
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
