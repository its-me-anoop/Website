"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { BtnLink, Eyebrow, RevealWords, Rise } from "../primitives";

export function About() {
  return (
    <section id="about" className="mx-auto grid w-full max-w-[1240px] scroll-mt-24 items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.85fr_1.15fr]">
      <Rise className="relative mx-auto w-full max-w-[380px]">
        <div className="bl-card overflow-hidden rounded-[28px] border border-bl-line">
          <Image
            src="/anoop-jose.jpg"
            alt="Anoop Jose, founder of Flutterly"
            width={760}
            height={950}
            className="h-auto w-full object-cover"
          />
        </div>
        <p className="bl-card absolute -bottom-5 left-6 rounded-2xl border border-bl-line bg-bl-surface px-5 py-3 text-[13.5px] font-medium text-bl-ink">
          {site.founder} · Founder
        </p>
      </Rise>

      <div>
        <Eyebrow className="mb-4">Leadership &amp; accountability</Eyebrow>
        <RevealWords
          as="h2"
          className="max-w-[560px] text-[clamp(1.9rem,4.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]"
          segments={[
            { text: "The person you brief" },
            { text: "is the person who builds.", tone: "teal" },
          ]}
        />
        <Rise delay={0.15}>
          <p className="mt-5 max-w-[540px] text-[16px] leading-relaxed text-bl-ink-soft">
            Flutterly Limited is a digital delivery company led by {site.founder},
            a designer and engineer in Reading, UK. Clients have a direct line to
            the person accountable for scope, technical decisions and delivery.
          </p>
          <p className="mt-4 max-w-[540px] text-[16px] leading-relaxed text-bl-ink-soft">
            The company works across websites, products, business systems and
            campaigns, with particular experience in the high-trust journeys used
            by patients, families, staff and local communities.
          </p>
        </Rise>
        <Rise delay={0.25} className="mt-8 flex flex-wrap gap-3">
          <BtnLink href={`mailto:${site.email}`} tone="teal">
            Email {site.founder.split(" ")[0]}
          </BtnLink>
          <BtnLink href={site.social.linkedin} tone="outline" external>
            LinkedIn
          </BtnLink>
        </Rise>
      </div>
    </section>
  );
}
