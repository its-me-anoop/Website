"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { samples } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { EASE, Reveal } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";
import { IMacFrame, IPhoneFrame } from "../ui/DeviceFrame";
import { ButtonLink, CheckItem, Container, SectionIntro } from "../ui/primitives";

/** Roving-focus index for the tab keys the WAI-ARIA tabs pattern expects. */
export function nextTabIndex(key: string, current: number, count: number): number | null {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

/**
 * Five hosted sample sites on paper, behind an accessible tablist. The
 * panel shows the chosen site on an iMac with the same site on an
 * iPhone in front, and a row of five thumbnails doubles as a picker.
 */
export function Showcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const motion = useMotionAllowed();
  const sample = samples[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const next = nextTabIndex(e.key, active, samples.length);
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="services" className="a-paper relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Sample sites"
            title={
              <>
                Five live sites. <em>Click</em> any of them.
              </>
            }
            copy="Fictional organisations, real builds. Each one is hosted, fully navigable and built to the same standard as client work."
          />
          <Reveal>
            <div
              role="tablist"
              aria-label="Sample sites by sector"
              className="a-tabs-scroll -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:flex-wrap lg:justify-end"
            >
              {samples.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.slug}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    id={`sample-tab-${s.slug}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="sample-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKeyDown}
                    className={cn(
                      "h-11 shrink-0 rounded-full border px-[18px] text-[15px] transition-[background-color,color,border-color,transform] duration-300",
                      selected
                        ? "border-a-ink bg-a-ink text-a-paper"
                        : "border-a-line-2 text-a-ink hover:-translate-y-px hover:border-a-ink"
                    )}
                  >
                    {s.tab}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div
          id="sample-panel"
          role="tabpanel"
          aria-labelledby={`sample-tab-${sample.slug}`}
          className="mt-12 grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-14"
        >
          {/* Keyed remount: the new sample's content is in the DOM at once
              (no exit wait, so stale links never linger) and animates in. */}
          <m.div
            key={`copy-${sample.slug}`}
            initial={motion ? { opacity: 0, y: 18 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="a-mono text-[12px] uppercase tracking-[0.16em] text-a-muted">{sample.sector}</p>
            <h3 className="a-display mt-3 text-[clamp(2rem,3.4vw,2.6rem)]">{sample.name}</h3>
            <p className="mt-5 text-[19px] leading-[1.55] text-a-ink">{sample.strap}</p>
            <ul className="mt-7 space-y-3.5">
              {sample.points.map((p) => (
                <CheckItem key={p}>{p}</CheckItem>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={sample.href} arrow="up" magnetic>
                Open the sample site
              </ButtonLink>
              {sample.sectorHref ? (
                <ButtonLink href={sample.sectorHref} tone="outline">
                  {sample.tab} websites
                </ButtonLink>
              ) : null}
            </div>
            <p className="mt-5 flex items-center gap-1.5 text-[13px] text-a-muted">
              <ArrowUpRight size={13} aria-hidden />A live, hosted sample. The organisation shown is fictional.
            </p>
          </m.div>

          <m.div
            key={`devices-${sample.slug}`}
            initial={motion ? { opacity: 0, y: 24 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative min-w-0 sm:pb-12 sm:pl-12"
          >
            <Link href={sample.href} tabIndex={-1} aria-hidden="true" className="block rounded-[16px]">
              <IMacFrame src={sample.image} alt="" loading="eager" />
            </Link>
            {/* The same site on a phone, overlapping the iMac's foot. */}
            {/* Decorative on wide screens; phones have too little room beside the iMac. */}
            <IPhoneFrame src={sample.mobileImage} alt="" width={140} className="absolute bottom-0 left-0 hidden sm:block" />
          </m.div>
        </div>

        {/* Picker: every sample at a glance; the chosen one is ringed. */}
        <Reveal className="mt-14">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {samples.map((s, i) => {
              const selected = i === active;
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={`Show ${s.name}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      "a-card group flex w-full flex-col gap-2.5 rounded-[16px] p-2.5 pb-3.5 text-left",
                      selected && "border-a-ink shadow-[0_0_0_1px_var(--a-ink)]"
                    )}
                  >
                    <span className="relative block aspect-[1440/1000] w-full overflow-hidden rounded-[10px]">
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 240px, 45vw"
                        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="flex flex-col gap-1 px-1">
                      <span className="text-[14.5px] font-medium leading-snug text-a-ink">{s.name}</span>
                      <span className="a-mono text-[11px] uppercase tracking-[0.08em] text-a-muted">{s.tab}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
