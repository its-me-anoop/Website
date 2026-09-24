"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { ButtonLink, Container, Display, Label } from "../ui/primitives";

/** The studio statement, beside a real portrait of the founder. */
export function About() {
  return (
    <section id="about" className="s-paper scroll-mt-16 py-24 sm:py-32">
      <Container className="grid items-end gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal>
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-s-paper-2">
              <Image
                src="/anoop-jose.jpg"
                alt={`${site.founder}, founder of Flutterly, at the studio in Reading`}
                fill
                sizes="(min-width: 1024px) 520px, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 text-[14.5px] text-s-on-paper-2">
              <span className="font-semibold text-s-on-paper">{site.founder}</span>
              <span>Founder, designer, engineer</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:pb-10">
          <Reveal>
            <Label className="text-s-on-paper-2">About the studio</Label>
            <Display size="xl" className="mt-5 max-w-[14ch]">
              The person you brief is the person who <em>builds</em>.
            </Display>
          </Reveal>
          <Reveal delay={0.08} className="mt-8 max-w-[600px] space-y-5 text-[18px] leading-[1.65] text-s-on-paper-2">
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
          <Reveal delay={0.14} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`} tone="ink">
              Email the studio
            </ButtonLink>
            <ButtonLink href={site.social.linkedin} tone="outline-paper" external arrow="up">
              LinkedIn
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
