"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { BtnLink, Display, Eyebrow, Rise } from "../primitives";

/**
 * The studio statement. A real portrait of the founder beside the
 * promise, on the deeper bone band with a concave bite where the
 * canvas bows into it. One person, one accountable pair of hands.
 */
export function Statement() {
  return (
    <section id="about" className="scroll-mt-24">
      {/* The bone canvas bows down into the deeper band. */}
      <div aria-hidden className="k-bite-top h-20 w-full bg-k-bone-2 sm:h-32 lg:h-40" />
      <div className="bg-k-bone-2">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 px-5 pb-20 sm:gap-12 sm:px-8 sm:pb-28 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20 lg:pb-32">
        <Rise className="mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:mx-0">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-k-paper shadow-[0_40px_90px_-40px_rgba(23,20,15,0.5)] sm:rounded-[24px]">
            <Image
              src="/anoop-jose.jpg"
              alt={`${site.founder}, founder of Flutterly, at the studio in Reading`}
              fill
              sizes="(min-width: 1024px) 420px, 92vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex flex-col gap-0.5 rounded-[12px] bg-k-coal/85 px-3.5 py-3 text-k-coal-ink backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4">
              <span className="text-[14px] font-medium sm:text-[14.5px]">{site.founder}</span>
              <span className="text-[12px] text-k-coal-soft sm:text-[12.5px]">
                Founder, designer, engineer
              </span>
            </figcaption>
          </figure>
        </Rise>

        <div>
          <Rise>
            <Eyebrow className="text-k-muted">About the studio</Eyebrow>
            <Display as="h2" size="lg" className="mt-5 max-w-[16ch] text-k-ink">
              The person you brief is the person who <em>builds</em>.
            </Display>
          </Rise>
          <Rise delay={0.1} className="mt-7 max-w-[560px] space-y-4 text-[17px] leading-[1.6] text-k-ink-soft">
            <p>
              Flutterly is the independent studio of {site.founder}, a designer
              and engineer in Reading. No account managers, no hand-offs, no
              outsourcing. Every website and app is designed, built and
              supported by the same pair of hands.
            </p>
            <p>
              That matters most in healthcare, where a website is often the
              first, and sometimes the only, way a patient or family reaches
              you. It has to work for everyone, every time.
            </p>
          </Rise>
          <Rise delay={0.18} className="mt-9 flex flex-wrap gap-3">
            <BtnLink href={`mailto:${site.email}`} tone="fire">
              Email the studio
            </BtnLink>
            <BtnLink href={site.social.linkedin} tone="outline" external arrow="up">
              LinkedIn
            </BtnLink>
          </Rise>
        </div>
      </div>
      </div>
    </section>
  );
}
