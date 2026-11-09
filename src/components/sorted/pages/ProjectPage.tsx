"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies, type CaseStudy, type Shot } from "@/lib/marketing/case-studies";
import { cn } from "@/lib/utils";
import { Reveal } from "../effects/Motion";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { BrowserFrame } from "../ui/Frames";
import { ButtonLink, Container, Eyebrow, SectionIntro } from "../ui/primitives";
import { serviceTone } from "../ui/tones";

/** How wide each kind of capture sits in the gallery, and the bezel it wears. */
const frameClass: Record<Shot["frame"], string> = {
  browser: "w-full",
  phone: "w-[200px] rounded-[26px] border-[7px] border-[#2a3260]",
  "duo-outer": "w-[230px] rounded-[22px] border-[7px] border-[#2a3260]",
  "duo-inner": "w-[330px] rounded-[20px] border-[7px] border-[#2a3260]",
};

function Capture({ shot }: { shot: Shot }) {
  if (shot.frame === "browser") {
    return <BrowserFrame src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 1024px) 900px, 92vw" />;
  }
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes="340px"
      className={cn("block h-auto max-w-full bg-white", frameClass[shot.frame])}
    />
  );
}

/**
 * A short case study in the Sorted language, rendered from one
 * `CaseStudy`: the hero in the colour of the service it belongs to with
 * the project's mark on a slab, where it stands today, what it does,
 * and whatever real captures exist. A project with none shows none.
 */
export function ProjectPage({ study }: { study: CaseStudy }) {
  const { lead, emphasis, trail } = study.heading;
  const wideMark = study.mark.width > study.mark.height;
  const others = caseStudies.filter((c) => c.slug !== study.slug);
  const [first, ...rest] = study.shots;

  return (
    <Shell>
      <PageHero
        eyebrow={study.eyebrow}
        tone={serviceTone[study.service]}
        title={
          <>
            {lead} <em>{emphasis}</em>
            {trail ? ` ${trail}` : null}
          </>
        }
        copy={<p>{study.intro}</p>}
        art={
          <div className="shot" style={{ "--turn-y": "-13deg" } as CSSProperties}>
            <div className={cn("shot-turn mx-auto", wideMark ? "w-full" : "w-[62%]")}>
              <div className="slab shot-slab" style={{ "--edge": "#0b1026", "--edge-2": "#000" } as CSSProperties}>
                {wideMark ? (
                  <BrowserFrame src={study.mark.src} alt={study.mark.alt} width={study.mark.width} height={study.mark.height} priority />
                ) : (
                  <Image
                    src={study.mark.src}
                    alt={study.mark.alt}
                    width={study.mark.width}
                    height={study.mark.height}
                    priority
                    unoptimized={study.mark.src.endsWith(".svg")}
                    className="block h-auto w-full"
                  />
                )}
              </div>
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/book" size="lg" arrow="right">
            Book a call
          </ButtonLink>
          <ButtonLink href="/#work" tone="plain" size="lg">
            All work
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="status-title" className="tone-white py-[clamp(64px,8vw,112px)]">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal turn={0}>
            <Eyebrow>Where it stands</Eyebrow>
            <h2 id="status-title" className="s-display mt-5 text-[clamp(1.6rem,2.6vw,2.2rem)] [--lh:1.08]">
              {study.status}
            </h2>
          </Reveal>
          <Reveal turn={0} delay={0.08}>
            <dl className="grid gap-x-8 border-t-2 border-s-rule sm:grid-cols-2">
              {study.facts.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 border-b-[1.5px] border-s-line-2 py-4">
                  <dt className="s-label text-[12.5px] text-s-muted">{label}</dt>
                  <dd className="m-0 text-[17.5px] font-semibold text-s-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="does-title" className="tone-chalk s-dots border-y-2 border-s-rule py-[clamp(64px,8vw,112px)]">
        <Container>
          <Eyebrow>{study.name}</Eyebrow>
          <h2 id="does-title" className="s-display mt-5 text-[clamp(2.2rem,4.6vw,4rem)]">
            What it <em>does.</em>
          </h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {study.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} turn={60} delay={(i % 3) * 0.08} className="h-full">
                <article className="tone-white flex h-full flex-col rounded-[14px] border-2 border-s-rule p-6 shadow-[0_6px_0_0_var(--s-rule)]">
                  <span aria-hidden className="s-display s-num text-[38px] text-s-accent">
                    0{i + 1}
                  </span>
                  <h3 className="s-display mt-5 text-[23px] [--lh:1.05]">{feature.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-s-ink-soft">{feature.copy}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {first ? (
        <section aria-labelledby="shots-title" className="tone-navy overflow-hidden py-[clamp(64px,8vw,112px)]">
          <Container>
            <SectionIntro eyebrow="Screens" title={study.shotsTitle ?? "On screen."} copy={study.shotsNote} headingId="shots-title" />
            <figure className="shot m-0 mt-14" style={{ "--turn-y": "-9deg" } as CSSProperties}>
              <div className="shot-turn mx-auto max-w-[940px]">
                <div className="slab shot-slab" style={{ "--edge": "#d6d5ca", "--edge-2": "#9b9a8e" } as CSSProperties}>
                  <Capture shot={first} />
                </div>
              </div>
              <figcaption className="s-label mt-8 text-center text-[13px] text-s-muted">{first.caption}</figcaption>
            </figure>
            <ul className="mt-16 flex flex-wrap items-end justify-center gap-x-10 gap-y-12">
              {rest.map((shot, i) => (
                <Reveal as="li" key={shot.src} turn={40} delay={i * 0.08}>
                  <figure className="m-0 flex flex-col items-center gap-4">
                    <Capture shot={shot} />
                    <figcaption className="s-label text-[13px] text-s-muted">{shot.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <nav aria-label="More work" className="border-t-2 border-s-rule">
        <ul className="m-0 grid list-none p-0 sm:grid-cols-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link href={`/projects/${c.slug}`} className={`${serviceTone[c.service]} group flex min-h-[140px] flex-col justify-between gap-6 px-6 py-6 sm:px-8`}>
                <span className="s-label text-[12.5px] text-s-ink-soft">{c.eyebrow}</span>
                <span className="s-display flex items-center justify-between gap-3 text-[clamp(1.6rem,2.4vw,2.1rem)]">
                  {c.name}
                  <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" size={26} strokeWidth={2.4} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <CtaBand
        id="contact"
        title={
          <>
            Got an app that needs <em>building?</em>
          </>
        }
        copy="A short call is the quickest way to a written plan and a price, before any work starts."
        audit="link"
      />
    </Shell>
  );
}
