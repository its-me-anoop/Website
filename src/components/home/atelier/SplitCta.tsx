"use client";

import Image from "next/image";
import { ArrowUpRight, PenLine, Archive } from "lucide-react";
import { site } from "@/lib/site";
import { Rise } from "./primitives";

export function SplitCta() {
  return (
    <section
      id="about"
      className="mx-auto grid w-full max-w-[1240px] gap-5 px-5 pb-24 sm:px-8 lg:grid-cols-2"
    >
      {/* Meet the studio */}
      <Rise>
        <article className="relative min-h-[440px] overflow-hidden rounded-[32px] bg-at-pink">
          <Image
            src="/anoop-jose.jpg"
            alt="Anoop Jose, founder of Flutterly"
            fill
            sizes="(max-width: 1024px) 92vw, 600px"
            className="object-cover object-top opacity-80 mix-blend-luminosity"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#5a2333] via-[#5a2333]/85 via-60% to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <span className="mb-16 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
              <PenLine size={15} aria-hidden />
            </span>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
              Direct collaboration,
              <span className="block text-white/85">no relay race.</span>
            </h2>
            <p className="mt-3 max-w-[380px] text-[14px] leading-relaxed text-white/95">
              You speak to the person doing the work — {site.founder}, founder
              and product engineer. Decisions never disappear between
              departments.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="liquid-clear mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
            >
              Let&apos;s meet
            </a>
          </div>
        </article>
      </Rise>

      {/* Archive */}
      <Rise delay={0.12}>
        <article className="relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[32px] bg-at-panel">
          <div className="absolute -right-16 -top-16 h-[340px] w-[340px] overflow-hidden rounded-full opacity-90">
            <Image
              src="/abstract-sandbourne.png"
              alt=""
              fill
              sizes="340px"
              className="object-cover"
            />
          </div>
          <div className="relative p-8">
            <span className="mb-16 flex h-9 w-9 items-center justify-center rounded-full bg-at-ink/5 text-at-ink">
              <Archive size={15} aria-hidden />
            </span>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-at-ink">
              Archive
              <span className="block text-at-ink-soft">of shipped work.</span>
            </h2>
            <p className="mt-3 max-w-[380px] text-[14px] leading-relaxed text-at-ink-soft">
              A public trail of products, packages and experiments — code
              included. Twelve-plus products shipped since 2024.
            </p>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-dark mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
            >
              Browse GitHub <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </article>
      </Rise>
    </section>
  );
}
