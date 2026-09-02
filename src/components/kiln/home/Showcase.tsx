"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { samples } from "../data";
import { BrowserFrame, BtnLink, CheckItem, Display, EASE, Eyebrow, Rise } from "../primitives";
import { cn } from "@/lib/utils";

/**
 * Five sectors, five finished sample sites. A proper tab interface:
 * the list on the left picks a sector, the frame on the right shows
 * the site. Roving tabindex, arrow keys, `aria-selected`.
 *
 * Layout: horizontal scroll chips below `md`, vertical list from `md`
 * up so tablet never clips the last tab.
 */
export function Showcase() {
  const [index, setIndex] = useState(0);
  const [vertical, setVertical] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const baseId = useId();
  const active = samples[index];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setVertical(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = samples.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <Rise className="max-w-[720px]">
          <Eyebrow className="text-k-muted">Sample sites, live and hosted</Eyebrow>
          <Display as="h2" size="lg" className="mt-5 text-k-ink">
            Five sectors. Five finished sites you can click through.
          </Display>
          <p className="mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-k-ink-soft sm:text-[17px]">
            Each one is a fictional organisation, built and hosted by Flutterly
            so a practice manager can judge the standard before a single call.
          </p>
        </Rise>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,240px)_1fr] md:gap-10 lg:mt-16 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
          {/* Tab list: chips that scroll on phone, column from tablet. */}
          <div className="relative min-w-0 md:static">
            <div
              role="tablist"
              aria-label="Sample sites by sector"
              aria-orientation={vertical ? "vertical" : "horizontal"}
              className="k-tabs-scroll -mx-5 flex gap-1 overflow-x-auto overscroll-x-contain px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0"
            >
              {samples.map((s, i) => {
                const selected = i === index;
                return (
                  <button
                    key={s.slug}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`${baseId}-tab-${s.slug}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setIndex(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={cn(
                      "group flex shrink-0 items-center justify-between gap-4 rounded-[10px] px-4 py-3 text-left transition-colors md:w-full md:rounded-none md:border-b md:border-k-line md:px-1 md:py-4",
                      selected
                        ? "bg-k-coal text-k-coal-ink md:bg-transparent md:text-k-ink"
                        : "text-k-ink-soft hover:text-k-ink"
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span
                        aria-hidden
                        className={cn(
                          "text-[11px] tabular-nums",
                          selected ? "text-k-fire-lite md:text-k-fire" : "text-k-muted"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "k-display whitespace-nowrap text-[18px] md:text-[22px] lg:text-[26px]",
                          selected ? "" : "md:text-k-ink-soft"
                        )}
                      >
                        {s.tab}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "hidden h-1.5 w-1.5 rounded-full bg-k-fire transition-opacity md:block",
                        selected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${active.slug}`}
            tabIndex={0}
            className="min-w-0 rounded-[18px] focus-visible:outline-offset-4"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active.slug}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <BrowserFrame
                  src={active.image}
                  alt={active.imageAlt}
                  url={`flutterly.uk${active.href}`}
                />
                <div className="mt-6 grid gap-6 sm:mt-7 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="text-[13px] text-k-muted">{active.sector}</p>
                    <h3 className="k-display mt-1 text-[clamp(1.4rem,4vw,2.1rem)] text-k-ink">
                      {active.name}
                    </h3>
                    <p className="mt-2 max-w-[520px] text-[15.5px] leading-[1.55] text-k-ink-soft sm:text-[16px]">
                      {active.strap}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {active.points.map((p) => (
                        <CheckItem key={p}>{p}</CheckItem>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-stretch">
                    <BtnLink href={active.href} tone="coal" arrow="up" className="w-full sm:w-auto">
                      Open the sample site
                    </BtnLink>
                    {active.sectorHref ? (
                      <BtnLink href={active.sectorHref} tone="outline" className="w-full sm:w-auto">
                        {active.tab} websites
                      </BtnLink>
                    ) : null}
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-k-line pt-6 text-[14px] text-k-ink-soft sm:mt-12 sm:gap-x-6">
          {samples.map((s) => (
            <li key={s.slug}>
              <a
                href={s.href}
                className="inline-flex items-center gap-1 underline decoration-k-line-2 underline-offset-4 transition-colors hover:text-k-ink hover:decoration-k-ink"
              >
                {s.name}
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
