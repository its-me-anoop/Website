"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { services } from "@/lib/marketing/services";
import { Reveal, Tilt } from "../effects/Motion";
import { Container, Eyebrow } from "../ui/primitives";
import { serviceTone } from "../ui/tones";

const facts = [
  ["Based in", `${site.address.addressLocality}, ${site.address.addressRegion}`],
  ["Builds with", "Next.js, Flutter, SwiftUI"],
  ["Works to", "WCAG 2.2 AA, test-driven"],
  ["Replies within", "One working day"],
] as const;

/**
 * The studio is one person, so the section is his staff pass: the
 * founder's portrait on a badge that hangs from a lanyard, sways a
 * little and leans towards the pointer, with all five services marked
 * on the one card. Beside it, the promise that matters and four plain
 * facts.
 */
export function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="tone-chalk scroll-mt-20 overflow-hidden py-[clamp(72px,9vw,136px)]">
      <Container className="grid items-start gap-x-[clamp(40px,6vw,96px)] gap-y-14 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="relative mx-auto w-full max-w-[380px] pt-[84px]">
          {/* The lanyard: a strap from above the section down to the clip. */}
          <span aria-hidden className="absolute left-1/2 top-[-260px] h-[330px] w-8 -translate-x-1/2 bg-s-cobalt" />
          <div className="badge-hang relative">
            <span aria-hidden className="absolute left-1/2 top-[-22px] z-10 h-9 w-14 -translate-x-1/2 rounded-[6px] border-2 border-s-navy bg-s-chalk-2" />
            <Tilt max={7}>
              <figure className="m-0 overflow-hidden rounded-[18px] border-2 border-s-navy bg-white shadow-[0_10px_0_0_var(--s-navy)]">
                <div className="flex items-center justify-between gap-3 bg-s-navy px-5 pb-3.5 pt-6 text-white">
                  <span className="flex items-center gap-2.5">
                    <Image src="/flutterly-logo.png" alt="" width={28} height={28} />
                    <span className="s-display text-[19px]">Flutterly</span>
                  </span>
                  <span aria-hidden className="s-label text-[12px] text-s-sun">
                    Team of one
                  </span>
                </div>
                <div className="relative aspect-[4/5] bg-s-chalk-2">
                  <Image
                    src="/anoop-jose.jpg"
                    alt={`${site.founder}, founder of Flutterly, at the studio in Reading`}
                    fill
                    sizes="(min-width: 1024px) 380px, 92vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 pb-5 pt-4">
                  <span className="s-label block text-[12.5px] text-s-muted">
                    {site.founder} · Founder · {site.address.addressLocality}
                  </span>
                  <span aria-hidden className="mt-3 flex flex-wrap gap-1.5">
                    {services.map((s) => (
                      <span key={s.slug} className={`${serviceTone[s.slug]} s-label rounded-[5px] px-2 py-1.5 text-[11.5px] leading-none`}>
                        {s.name}
                      </span>
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Tilt>
          </div>
        </div>

        <Reveal turn={0} className="flex min-w-0 flex-col gap-7 lg:pt-16">
          <Eyebrow>Studio</Eyebrow>
          <h2 id="studio-title" className="s-display text-[clamp(2.3rem,4.8vw,4.4rem)]">
            The person you brief is the person who <em>builds.</em>
          </h2>
          <p className="max-w-[580px] text-[19px] leading-[1.55] text-s-ink-soft">
            I&apos;m {site.founder.split(" ")[0]}. I design, code and look after every project myself, from the website
            and the app to the email, devices and search behind them. Nothing gets lost between a designer, a developer,
            an IT company and a marketing agency, because they are the same person.
          </p>
          <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-x-8 border-t-2 border-s-navy">
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 border-b-[1.5px] border-s-line-2 py-4">
                <dt className="s-label text-[12.5px] text-s-muted">{label}</dt>
                <dd className="m-0 text-[18px] font-semibold text-s-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
