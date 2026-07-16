"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { processSteps, projects, services } from "./data";
import { EASE, Eyebrow, HandleChip, Pill, RevealWords, Rise } from "./primitives";

const miniFan = [projects[1], projects[0], projects[2]] as const;

function FanCard() {
  const service = services[0];
  const reduce = useReducedMotion();
  return (
    <article className="rounded-[28px] bg-at-surface p-7 shadow-[0_1px_0_var(--at-line)]">
      <div className="relative mx-auto mb-8 mt-2 flex h-[170px] items-end justify-center">
        <HandleChip
          handle="@anoop"
          tone="terracotta"
          className="animate-at-drift absolute -right-1 top-0 z-20"
        />
        {miniFan.map((project, i) => (
          <m.div
            key={project.name}
            className="relative -ml-10 h-[140px] w-[104px] shrink-0 overflow-hidden rounded-xl shadow-[0_18px_36px_-16px_rgba(34,33,31,0.45)] first:ml-0"
            style={{ backgroundColor: project.tint, zIndex: 5 - Math.abs(i - 1) }}
            initial={reduce ? false : { rotate: 0, y: 24, opacity: 0 }}
            whileInView={{ rotate: (i - 1) * 9, y: Math.abs(i - 1) * 8, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.08 }}
          >
            <Image src={project.image} alt="" fill sizes="104px" className="object-cover" />
          </m.div>
        ))}
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-at-muted">
        {service.number}
      </span>
      <h3 className="mt-2 text-[21px] font-medium tracking-tight text-at-ink">
        {service.title}
      </h3>
      <p className="mt-2.5 text-[14px] leading-relaxed text-at-ink-soft">{service.copy}</p>
      <Pill href={service.cta.href} tone="light" className="mt-5 text-[13px]">
        {service.cta.label}
      </Pill>
    </article>
  );
}

function VioletCard() {
  const service = services[1];
  return (
    <article className="rounded-[28px] bg-at-violet p-7 text-white">
      <div className="relative mb-7 overflow-hidden rounded-2xl bg-white/10">
        <div className="relative h-[190px]">
          <Image
            src="/abstract-greenmead.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 480px"
            className="object-cover opacity-90"
          />
        </div>
        <div className="absolute inset-x-5 bottom-4 space-y-2" aria-hidden>
          <div className="h-2.5 w-3/4 rounded-full bg-white/30 backdrop-blur" />
          <div className="h-2.5 w-1/2 rounded-full bg-white/45 backdrop-blur" />
        </div>
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/60">
        {service.number}
      </span>
      <h3 className="mt-2 text-[21px] font-medium tracking-tight">{service.title}</h3>
      <p className="mt-2.5 text-[14px] leading-relaxed text-white/75">{service.copy}</p>
      <a
        href={service.cta.href}
        className="liquid-dark mt-5 inline-flex rounded-full px-5 py-2.5 text-[13px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
      >
        {service.cta.label}
      </a>
    </article>
  );
}

function PhotoCard() {
  const service = services[2];
  return (
    <article className="overflow-hidden rounded-[28px] bg-at-surface shadow-[0_1px_0_var(--at-line)]">
      <div className="relative h-[210px] bg-at-sky">
        <Image
          src="/projects/sipli/iphone_and_ipad.png"
          alt="Sipli running on iPhone and iPad"
          fill
          sizes="(max-width: 1024px) 90vw, 480px"
          className="object-cover object-top"
        />
      </div>
      <div className="p-7">
        <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-at-muted">
          {service.number}
        </span>
        <h3 className="mt-2 text-[21px] font-medium tracking-tight text-at-ink">
          {service.title}
        </h3>
        <p className="mt-2.5 text-[14px] leading-relaxed text-at-ink-soft">{service.copy}</p>
        <Pill href={service.cta.href} tone="dark" className="mt-5 text-[13px]">
          {service.cta.label}
        </Pill>
      </div>
    </article>
  );
}

function ProcessCard() {
  return (
    <article
      id="process"
      className="scroll-mt-24 rounded-[28px] bg-at-dark p-7 text-at-dark-ink"
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-at-dark-ink/50">
        The process
      </span>
      <ol className="mt-5 space-y-5">
        {processSteps.map(([title, copy], i) => (
          <li key={title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[12px] font-medium tabular-nums">
              0{i + 1}
            </span>
            <div>
              <h3 className="text-[15.5px] font-medium tracking-tight">{title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-at-dark-ink/60">{copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function Stories() {
  return (
    <section id="services" className="mx-auto w-full max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8">
      <div className="text-center">
        <Eyebrow className="mb-5">
          Your product <span className="text-at-violet">telling</span>
        </Eyebrow>
        <RevealWords
          as="h2"
          className="mx-auto max-w-[640px] text-[clamp(2.2rem,5.4vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em]"
          segments={[
            { text: "Every product" },
            { text: "tells a story.", tone: "muted" },
          ]}
        />
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Rise className="grid gap-5">
          <FanCard />
          <PhotoCard />
        </Rise>
        <Rise delay={0.12} className="grid gap-5">
          <VioletCard />
          <ProcessCard />
        </Rise>
      </div>
    </section>
  );
}
