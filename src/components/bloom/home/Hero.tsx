"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { deliveryPromises } from "../data";
import { BtnLink, RevealWords, Rise } from "../primitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* The desk, full bleed behind the whole fold. `object-right`
          keeps the two screens in frame as the section narrows: the
          left of the photograph is an empty wall, so it is the part
          that can be given up.

          The scrim is what makes the type legible over a photograph,
          and it is directional rather than a flat wash: near-solid
          canvas across the left 53%: the width of the stat row: then
          clearing away so the two screens still read.

          Those stops are measured, not judged by eye. Sampling the real
          painted pixels behind every text run, with the glyphs made
          transparent so it is the background being sampled, the fold
          clears WCAG 2.2 AA throughout; the binding case is the 13px
          stat caption at 4.62:1 against a 4.5 floor. Holding the
          near-solid stop at 48% instead measured 4.46:1 and failed. If
          this gradient is ever loosened, re-run that measurement.

          This layer is `lg` and up only: see the figure below for why. */}
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
        website on a laptop. Illustrative mock-up: the practice and care
        home shown are examples rather than Flutterly clients.
      </p>

      <div className="relative mx-auto grid w-full max-w-[1240px] px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-16 lg:min-h-[720px] lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:pb-24 lg:pt-20">
        <div>
          <Rise>
            <p className="flex max-w-max items-start gap-2 border-b border-bl-line-2 pb-2 text-[10.5px] font-semibold uppercase leading-[1.55] tracking-[0.15em] text-bl-ink-soft sm:text-[12px] sm:leading-normal sm:tracking-[0.18em]">
              <span className="mt-[0.38em] h-2 w-2 shrink-0 bg-bl-teal" aria-hidden />
              Flutterly Limited · Digital delivery company · Reading, UK
            </p>
          </Rise>
          <RevealWords
            as="h1"
            delay={0.1}
            className="mt-5 max-w-[720px] font-display text-[clamp(2.55rem,12.5vw,3rem)] font-semibold leading-[0.95] tracking-[-0.045em] sm:mt-7 sm:text-[clamp(3rem,7vw,5.6rem)] sm:leading-[0.93] sm:tracking-[-0.052em]"
            segments={[
              { text: "Digital delivery for" },
              { text: "organisations", tone: "teal" },
              { text: "people rely on." },
            ]}
          />
          <Rise delay={0.25}>
            <p className="mt-5 max-w-[620px] text-[15.5px] leading-[1.6] text-bl-ink-soft sm:mt-7 sm:text-[17px] sm:leading-[1.65]">
              Flutterly plans, builds and supports accessible websites, digital
              products, business email and social campaigns. GP practices and
              care homes are core specialisms, with the same disciplined delivery
              available to other organisations.
            </p>
          </Rise>
          <Rise delay={0.35} className="mt-6 grid gap-2.5 min-[380px]:flex min-[380px]:flex-wrap min-[380px]:items-center sm:mt-8 sm:gap-3">
            <BtnLink
              href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
              tone="teal"
              arrow
              className="w-full min-[380px]:w-auto min-[380px]:px-4 min-[380px]:text-[14px] sm:px-6 sm:text-[14.5px]"
            >
              <span className="sm:hidden">Discuss a project</span>
              <span className="hidden sm:inline">Discuss your project</span>
            </BtnLink>
            <BtnLink
              href="/services"
              tone="outline"
              className="w-full min-[380px]:w-auto min-[380px]:px-4 min-[380px]:text-[14px] sm:px-6 sm:text-[14.5px]"
            >
              Explore services
            </BtnLink>
          </Rise>

          {/* On compact screens the visual proof follows the proposition and
              actions directly. This keeps the same image-led character as the
              desktop hero without forcing small captions over a busy photo. */}
          <figure className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[22px] border border-bl-line bg-bl-surface shadow-[0_30px_70px_-28px_rgba(11,47,40,0.45)] min-[520px]:aspect-[1.9/1] sm:mt-10 lg:hidden">
            <Image
              src="/hero-desk.jpg"
              alt="A GP practice website open on a desktop screen beside a care home website on a laptop, on a warm wooden desk"
              fill
              priority
              sizes="(min-width: 640px) 92vw, calc(100vw - 40px)"
              className="object-cover object-[68%_center] sm:object-center"
            />
            <figcaption className="sr-only">
              Illustrative mock-up. The practice and care home shown are
              examples rather than Flutterly clients.
            </figcaption>
          </figure>

          <Rise delay={0.45}>
            <dl className="mt-8 grid max-w-[650px] gap-x-8 gap-y-5 border-t border-bl-line-2 pt-6 min-[520px]:grid-cols-2 sm:mt-10 sm:gap-y-6 sm:pt-7 lg:mt-12">
              {deliveryPromises.map((item) => (
                <div key={item.title} className="grid grid-cols-[20px_1fr] gap-3">
                  <Check size={15} strokeWidth={2.7} aria-hidden className="mt-1 text-bl-teal" />
                  <div>
                    <dt className="text-[13.5px] font-semibold text-bl-ink">{item.title}</dt>
                    <dd className="mt-1 text-[12.5px] leading-relaxed text-bl-muted">{item.copy}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Rise>
        </div>
      </div>
      <p className="sr-only">Contact Flutterly: {site.email}</p>
    </section>
  );
}
