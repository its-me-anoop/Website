"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "../effects/Motion";
import { ButtonLink, Container, Display, Eyebrow } from "../ui/primitives";

const facts = [
  ["Based in", `${site.address.addressLocality}, ${site.address.addressRegion}`],
  ["Replies within", "One working day"],
  ["Also builds", "iOS apps in SwiftUI"],
] as const;

/**
 * The studio statement on night: the founder's portrait beside the
 * one promise that matters, and three plain facts under a hairline.
 */
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-a-line bg-a-void py-24 sm:py-32">
      <Container className="grid items-start gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        <Reveal as="figure" className="m-0 mx-auto w-full max-w-[360px] lg:mx-0">
          <div className="group relative aspect-square overflow-hidden rounded-[24px] border border-a-line bg-a-deep">
            <Image
              src="/anoop-jose.jpg"
              alt={`${site.founder}, founder of Flutterly, at the studio in Reading`}
              fill
              sizes="(min-width: 1024px) 360px, 92vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </div>
          <figcaption className="mt-4 text-[14px] text-a-muted">
            {site.founder}, {site.legalName}, {site.address.addressLocality}
          </figcaption>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>About the studio</Eyebrow>
            <Display size="xl" className="mt-6 max-w-[16ch]">
              The person you brief is the person who <em>builds</em>.
            </Display>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 max-w-[600px] space-y-5 text-[17.5px] leading-[1.7] text-a-ink-soft">
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
          <Reveal delay={0.16}>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {facts.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1.5 border-t border-a-line-2 pt-5">
                  <dt className="a-mono text-[11.5px] uppercase tracking-[0.14em] text-a-muted">{label}</dt>
                  <dd className="text-[17px] text-a-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.22} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`} magnetic>
              Email the studio
            </ButtonLink>
            <ButtonLink href={site.social.linkedin} tone="outline" external arrow="up">
              LinkedIn
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
