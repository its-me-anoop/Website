"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { samples } from "@/lib/marketing/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { EASE, Reveal } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";
import { SampleScene } from "../ui/SampleScene";
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
 * Five hosted sample sites behind an accessible tablist. The panel
 * shows the chosen site as a turned slab with its phone, swung into
 * place in 3D each time the tab changes, and a row of five thumbnails
 * doubles as a picker.
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
    <section id="samples" className="tone-navy relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
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
          <div
            role="tablist"
            aria-label="Sample sites by sector"
            className="s-tabs-scroll -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-3 pt-1 sm:mx-0 sm:px-0 lg:flex-wrap lg:justify-end"
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
                  className={cn("s-key h-11 shrink-0 px-4 text-[15px] [--key-depth:4px]", !selected && "s-key-outline")}
                >
                  {s.tab}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="sample-panel"
          role="tabpanel"
          aria-labelledby={`sample-tab-${sample.slug}`}
          className="mt-12 grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-14"
        >
          {/* Keyed remount: the new sample's content is in the DOM at once
              (no exit wait, so stale links never linger) and swings in. */}
          <m.div
            key={`copy-${sample.slug}`}
            initial={motion ? { opacity: 0, y: 18 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="s-label text-[13px] text-s-accent">{sample.sector}</p>
            <h3 className="s-display mt-3 text-[clamp(2rem,3.4vw,2.7rem)]">{sample.name}</h3>
            <p className="mt-5 text-[19px] leading-[1.5] text-s-ink">{sample.strap}</p>
            <ul className="mt-7 space-y-3.5">
              {sample.points.map((p) => (
                <CheckItem key={p}>{p}</CheckItem>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={sample.href} arrow="up">
                Open the sample site
              </ButtonLink>
              {sample.sectorHref ? (
                <ButtonLink href={sample.sectorHref} tone="outline">
                  {sample.tab} websites
                </ButtonLink>
              ) : null}
            </div>
            <p className="mt-6 flex items-center gap-1.5 text-[14px] text-s-muted">
              <ArrowUpRight size={14} aria-hidden />A live, hosted sample. The organisation shown is fictional.
            </p>
          </m.div>

          <m.div
            key={`devices-${sample.slug}`}
            style={{ transformOrigin: "0% 50%" }}
            initial={motion ? { opacity: 0, rotateY: 55, transformPerspective: 1400 } : false}
            animate={{ opacity: 1, rotateY: 0, transformPerspective: 1400 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="relative min-w-0"
          >
            <Link href={sample.href} tabIndex={-1} aria-hidden="true" className="block rounded-[12px]">
              <SampleScene image={sample.image} mobileImage={sample.mobileImage} url={`${site.domain}${sample.href}`} />
            </Link>
          </m.div>
        </div>

        {/* Picker: every sample at a glance; the chosen one is marked. */}
        <Reveal turn={0} className="mt-16">
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
                      "group flex w-full flex-col gap-2.5 rounded-[12px] border-2 p-2 pb-3 text-left transition-[border-color,transform,box-shadow] duration-300",
                      selected
                        ? "-translate-y-1 border-s-flame shadow-[0_5px_0_0_var(--s-flame)]"
                        : "border-s-line-2 hover:-translate-y-1 hover:border-s-ink"
                    )}
                  >
                    <span className="relative block aspect-[1440/1000] w-full overflow-hidden rounded-[7px]">
                      <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 240px, 45vw" className="object-cover object-top" />
                    </span>
                    <span className="flex flex-col gap-1 px-1">
                      <span className="text-[15px] font-semibold leading-snug text-s-ink">{s.name}</span>
                      <span className="s-label text-[12px] text-s-muted">{s.tab}</span>
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
