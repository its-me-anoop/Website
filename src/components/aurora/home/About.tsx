"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal, Tilt, WipeReveal } from "../effects/Motion";
import { ButtonLink, Container, Display, Eyebrow } from "../ui/primitives";

/**
 * The studio statement: the founder's portrait inside a slowly
 * rotating aurora rim, beside the one promise that matters.
 */
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(194,65,12,0.45), transparent)" }}
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-24">
        <Reveal className="mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none">
          <Tilt max={6}>
            <figure className="a-conic relative aspect-[4/5] rounded-[32px] bg-a-deep p-2">
              <div className="relative h-full w-full overflow-hidden rounded-[26px]">
                <WipeReveal className="absolute inset-0">
                <Image
                  src="/anoop-jose.jpg"
                  alt={`${site.founder}, founder of Flutterly, at the studio in Reading`}
                  fill
                  sizes="(min-width: 1024px) 460px, 92vw"
                  className="object-cover"
                />
                </WipeReveal>
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-a-void/80 via-transparent to-transparent" />
              </div>
              <figcaption className="a-glass absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-[18px] px-4 py-3">
                <span className="text-[15px] font-medium">{site.founder}</span>
                <span className="a-mono text-[11px] uppercase tracking-[0.12em] text-a-ink-soft">
                  Founder · Design · Engineering
                </span>
              </figcaption>
            </figure>
          </Tilt>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>About the studio</Eyebrow>
            <Display size="xl" className="mt-6 max-w-[14ch]">
              The person you brief is the person who <em>builds</em>.
            </Display>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 max-w-[580px] space-y-5 text-[17.5px] leading-[1.7] text-a-ink-soft">
            <p>
              Flutterly is the independent studio of {site.founder}, a designer and engineer in Reading. No account
              managers, no hand-offs, no outsourcing. Every website and app is designed, built and supported by the
              same pair of hands.
            </p>
            <p>
              That matters most in healthcare, where a website is often the first, and sometimes the only, way a
              patient or family reaches you. It has to work for everyone, every time.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`} magnetic>
              Email the studio
            </ButtonLink>
            <ButtonLink href={site.social.linkedin} tone="glass" external arrow="up">
              LinkedIn
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
