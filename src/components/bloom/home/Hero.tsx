"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { heroStats } from "../data";
import { BtnLink, RevealWords, Rise } from "../primitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* The desk, full bleed behind the whole fold. `object-right`
          keeps the two screens in frame as the section narrows — the
          left of the photograph is an empty wall, so it is the part
          that can be given up.

          The scrim is what makes the type legible over a photograph,
          and it is directional rather than a flat wash: near-solid
          canvas across the left 53% — the width of the stat row — then
          clearing away so the two screens still read.

          Those stops are measured, not judged by eye. Sampling the real
          painted pixels behind every text run, with the glyphs made
          transparent so it is the background being sampled, the fold
          clears WCAG 2.2 AA throughout; the binding case is the 13px
          stat caption at 4.62:1 against a 4.5 floor. Holding the
          near-solid stop at 48% instead measured 4.46:1 and failed. If
          this gradient is ever loosened, re-run that measurement.

          This layer is `lg` and up only — see the figure below for why. */}
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <Image
          src="/hero-desk.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 92vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(250,252,251,0.985)_0%,rgba(250,252,251,0.982)_53%,rgba(250,252,251,0.68)_64%,rgba(250,252,251,0.18)_79%,rgba(250,252,251,0.03)_92%)]" />
      </div>

      {/* Named for anyone who cannot see it: the practice and care home
          on the screens are illustrative, not clients. The real work is
          in Selected work; the two sample sites live under /demo. */}
      <p className="sr-only hidden lg:block">
        A GP practice website open on a desktop screen beside a care home
        website on a laptop. Illustrative mock-up — the practice and care
        home shown are examples rather than Flutterly clients.
      </p>

      <div className="relative mx-auto grid w-full max-w-[1240px] gap-14 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24">
        <div>
          <Rise>
            <p className="inline-flex items-center gap-2 rounded-full border border-bl-line-2 bg-bl-surface px-4 py-1.5 text-[12.5px] font-medium text-bl-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-bl-teal" aria-hidden />
              Independent product studio · Reading, UK
            </p>
          </Rise>
          <RevealWords
            as="h1"
            delay={0.1}
            className="mt-6 max-w-[620px] text-[clamp(2.5rem,6.4vw,4.2rem)] font-medium leading-[1.04] tracking-[-0.035em]"
            segments={[
              { text: "Websites that care for" },
              { text: "the people", tone: "teal" },
              { text: "who use them." },
            ]}
          />
          <Rise delay={0.25}>
            <p className="mt-6 max-w-[520px] text-[16.5px] leading-relaxed text-bl-ink-soft">
              Flutterly designs and builds accessible, fast websites for GP
              practices, care homes and ambitious products — custom-coded in
              the UK and looked after by the person who built them.
            </p>
          </Rise>
          <Rise delay={0.35} className="mt-8 flex flex-wrap items-center gap-3">
            <BtnLink href="/free-audit" tone="teal" arrow>
              Get your free website audit
            </BtnLink>
            <BtnLink href="/packages" tone="outline">
              See packages
            </BtnLink>
          </Rise>
          <Rise delay={0.45}>
            <dl className="mt-12 grid max-w-[560px] grid-cols-2 gap-x-8 gap-y-7 border-t border-bl-line pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[22px] font-semibold tracking-tight text-bl-ink">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[12.5px] leading-snug text-bl-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Rise>
        </div>

        {/* From `lg` this column is deliberately empty — it is the
            window onto the background photograph, and the copy sits
            clear of it on the left.

            Below `lg` there is no such window: the copy runs the full
            width, so a background would have to be scrimmed almost
            solid to keep 13px captions legible, and the picture would
            be a ghost. Measured that way it was invisible. So the
            photograph stops being a background and becomes a thing on
            the page, under the words, where it can actually be seen.

            The floating "WCAG 2.2 AA" / "UK hosting" / "No templates"
            chips that used to sit here are gone — over a picture they
            read as clutter, and each is already said in plain words
            (the stat row carries the accessibility target and "custom
            code — never a template", the lede says custom-coded in the
            UK). */}
        <figure className="relative overflow-hidden rounded-[22px] border border-bl-line bg-bl-surface shadow-[0_30px_70px_-28px_rgba(11,47,40,0.45)] lg:hidden">
          <Image
            src="/hero-desk.jpg"
            alt="A GP practice website open on a desktop screen beside a care home website on a laptop, on a warm wooden desk"
            width={2223}
            height={1186}
            priority
            sizes="(min-width: 1024px) 100vw, 92vw"
            className="h-auto w-full"
          />
          <figcaption className="sr-only">
            Illustrative mock-up. The practice and care home shown are
            examples rather than Flutterly clients.
          </figcaption>
        </figure>
      </div>
      <p className="sr-only">Contact Flutterly: {site.email}</p>
    </section>
  );
}
