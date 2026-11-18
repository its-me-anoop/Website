"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { services } from "@/lib/marketing/services";
import { Reveal, Tilt } from "../effects/Motion";
import { Floor } from "../ui/Room";
import { Container, Eyebrow } from "../ui/primitives";
import { serviceTone } from "../ui/tones";

const facts = [
  ["Based in", `${site.address.addressLocality}, ${site.address.addressRegion}`],
  ["Builds with", "Next.js, Flutter, SwiftUI"],
  ["Works to", "WCAG 2.2 AA, test-driven"],
  ["Replies within", "One working day"],
] as const;

/**
 * The studio is one person, so the yellow room holds his portrait: the
 * founder in an arched frame on a pink mat, standing on the paper
 * floor and leaning towards the pointer, with all five services on
 * stickers under it. Beside it, the promise that matters and four
 * plain facts.
 */
export function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="tone-sun relative isolate scroll-mt-20 overflow-hidden">
      <Container className="grid items-end gap-x-[clamp(40px,6vw,96px)] gap-y-14 pt-[clamp(80px,10vw,152px)] lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="relative z-10 mx-auto w-full max-w-[380px] max-lg:order-last lg:-mb-[clamp(40px,6vw,96px)]">
          <Tilt max={5}>
            <figure className="m-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-s-pink">
                <Image
                  src="/anoop-jose.jpg"
                  alt={`${site.founder}, founder of Flutterly, at the studio in Reading`}
                  fill
                  sizes="(min-width: 1024px) 380px, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="tone-white flex flex-col gap-3 rounded-b-[20px] px-5 pb-5 pt-4">
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5">
                    <Image src="/flutterly-logo.png" alt="" width={28} height={28} />
                    <span className="s-display text-[19px]">Flutterly</span>
                  </span>
                  <span aria-hidden className="s-label text-[12.5px] text-s-muted">
                    Team of one
                  </span>
                </span>
                <span className="s-label block text-[13px] text-s-ink-soft">
                  {site.founder} · Founder · {site.address.addressLocality}
                </span>
                <span aria-hidden className="flex flex-wrap gap-1.5">
                  {services.map((s) => (
                    <span key={s.slug} className={`${serviceTone[s.slug]} s-label rounded-full px-2.5 py-1.5 text-[12px] leading-none`}>
                      {s.name}
                    </span>
                  ))}
                </span>
              </figcaption>
            </figure>
          </Tilt>
        </div>

        <Reveal className="flex min-w-0 flex-col gap-7 pb-[clamp(48px,6vw,96px)]">
          <Eyebrow>Studio</Eyebrow>
          <h2 id="studio-title" className="s-display text-[clamp(2.5rem,5.4vw,5rem)]">
            The person you brief is the person who <em>builds.</em>
          </h2>
          <p className="s-say max-w-[640px] text-[clamp(20px,1.9vw,26px)] text-s-ink">
            I&apos;m {site.founder.split(" ")[0]}. I design, code and look after every project myself, from the website
            and the app to the email, devices and search behind them. Nothing gets lost between a designer, a developer,
            an IT company and a marketing agency, because they are the same person.
          </p>
          <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-x-8 border-t-[1.5px] border-s-rule">
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 border-b-[1.5px] border-s-line-2 py-4">
                <dt className="s-label text-[13px] text-s-muted">&gt; {label}</dt>
                <dd className="m-0 text-[19px] font-semibold tracking-[-0.02em] text-s-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
      <Floor colour="paper" />
    </section>
  );
}
