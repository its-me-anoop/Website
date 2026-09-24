"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { samples } from "@/lib/marketing/content";
import { EASE, Reveal, Tilt } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";
import {
  BrowserFrame,
  ButtonLink,
  CheckItem,
  Container,
  SectionIntro,
} from "../ui/primitives";

/** Roving-focus index for the tab keys the WAI-ARIA tabs pattern expects. */
export function nextTabIndex(
  key: string,
  current: number,
  count: number,
): number | null {
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
 * Five hosted sample sites behind an accessible tablist. The active
 * pill slides between tabs, the panel cross-fades with a blur, and
 * the browser frame tilts towards the pointer.
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
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-36">
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
        </div>

        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="Sample sites by sector"
            className="a-tabs-scroll -mx-5 flex gap-1 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 md:inline-flex md:rounded-full md:border md:border-a-line md:bg-white/[0.03] md:p-1.5"
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
                  className="relative shrink-0 rounded-full px-5 py-2.5 text-[14.5px] text-a-ink-soft transition-colors hover:text-a-ink aria-selected:text-a-void"
                >
                  {selected ? (
                    <m.span
                      layoutId="sample-tab-pill"
                      aria-hidden
                      className="absolute inset-0 -z-0 rounded-full bg-a-amber"
                      transition={
                        motion
                          ? { type: "spring", stiffness: 380, damping: 32 }
                          : { duration: 0 }
                      }
                    />
                  ) : null}
                  <span className="relative">{s.tab}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="sample-panel"
          role="tabpanel"
          aria-labelledby={`sample-tab-${sample.slug}`}
          className="mt-10 grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16"
        >
          <Tilt max={5}>
            <m.div
              key={sample.slug}
              initial={motion ? { clipPath: "inset(100% 0% 0% 0%)", y: 24 } : false}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            >
              <Link
                href={sample.href}
                tabIndex={-1}
                aria-hidden="true"
                className="block rounded-[22px]"
              >
                <BrowserFrame
                  src={sample.image}
                  alt=""
                  url={`${site.domain}${sample.href}`}
                  loading="eager"
                />
              </Link>
            </m.div>
          </Tilt>

          {/* Keyed remount: the new sample's content is in the DOM at once
              (no exit wait, so stale links never linger) and animates in. */}
          <m.div
            key={sample.slug}
            initial={
              motion ? { opacity: 0, x: 24, filter: "blur(6px)" } : false
            }
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="a-mono text-[12px] uppercase tracking-[0.16em] text-a-gold">
              {sample.sector}
            </p>
            <h3 className="a-display mt-4 text-[clamp(2rem,3.6vw,3rem)]">
              {sample.name}
            </h3>
            <p className="mt-4 text-[18px] leading-[1.55] text-a-ink-soft">
              {sample.strap}
            </p>
            <ul className="mt-8 space-y-3.5">
              {sample.points.map((p) => (
                <CheckItem key={p}>{p}</CheckItem>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={sample.href} arrow="up" magnetic>
                Open the sample site
              </ButtonLink>
              {sample.sectorHref ? (
                <ButtonLink href={sample.sectorHref} tone="glass">
                  {sample.tab} websites
                </ButtonLink>
              ) : null}
            </div>
            <p className="mt-5 flex items-center gap-1.5 text-[13px] text-a-muted">
              <ArrowUpRight size={13} aria-hidden />A live, hosted sample. The
              organisation shown is fictional.
            </p>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
