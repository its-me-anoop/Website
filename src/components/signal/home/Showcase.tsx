"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/lib/site";
import { samples } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "../effects/hooks";
import { LiveSite } from "../ui/LiveSite";
import { ButtonLink, CheckItem, Container, Screenshot, SectionIntro } from "../ui/primitives";

/** Roving-focus index for the keys the WAI-ARIA tabs pattern expects. */
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
 * Five hosted sample sites behind an accessible tablist. On wide
 * screens the panel holds the real site, working, scaled into a frame:
 * scroll it, click around it. On phones it shows a screenshot and a
 * link, because a scaled site is unreadable at that size.
 */
export function Showcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const wide = useMediaQuery("(min-width: 1024px)");
  const sample = samples[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const next = nextTabIndex(e.key, active, samples.length);
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="services" className="s-paper scroll-mt-16 py-24 sm:py-32">
      <Container>
        <SectionIntro
          onPaper
          label="Sample sites"
          title={
            <>
              Five working sites. <em>Try them</em> before you call.
            </>
          }
          copy="Fictional organisations, real builds. Each one is hosted and fully navigable, and built to the same standard as client work."
        />

        <div
          role="tablist"
          aria-label="Sample sites by sector"
          className="mt-12 flex gap-6 overflow-x-auto border-b border-s-line-paper"
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
                  "-mb-px shrink-0 border-b-[3px] py-4 text-[17px] font-semibold transition-colors",
                  selected
                    ? "border-s-on-paper text-s-on-paper"
                    : "border-transparent text-s-on-paper-2 hover:text-s-on-paper"
                )}
              >
                {s.tab}
              </button>
            );
          })}
        </div>

        <div
          id="sample-panel"
          role="tabpanel"
          aria-labelledby={`sample-tab-${sample.slug}`}
          className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14"
        >
          <div key={sample.slug}>
            {wide ? (
              <LiveSite
                href={sample.href}
                title={`${sample.name}, a working sample site`}
                poster={sample.image}
              />
            ) : (
              <div className="[&_figcaption]:text-s-on-paper-2 [&_div]:border-s-line-paper">
                <Screenshot src={sample.image} alt={sample.imageAlt} loading="eager" />
              </div>
            )}
            <p className="mt-3 text-[14.5px] text-s-on-paper-2">
              {site.domain}
              {sample.href}
              {wide ? " · live, scroll and click inside the frame" : null}
            </p>
          </div>

          <div>
            <p className="s-label text-s-on-paper-2">{sample.sector}</p>
            <h3 className="s-display mt-3 text-[clamp(2rem,3.4vw,2.8rem)]">{sample.name}</h3>
            <p className="mt-4 text-[19px] leading-[1.5]">{sample.strap}</p>
            <ul className="mt-8 space-y-3.5 border-t border-s-line-paper pt-8">
              {sample.points.map((p) => (
                <CheckItem key={p} onPaper>
                  {p}
                </CheckItem>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={sample.href} tone="ink" arrow="up">
                Open the sample site
              </ButtonLink>
              {sample.sectorHref ? (
                <ButtonLink href={sample.sectorHref} tone="outline-paper">
                  {sample.tab} websites
                </ButtonLink>
              ) : null}
            </div>
            <p className="mt-5 text-[14.5px] text-s-on-paper-2">The organisation shown is fictional.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
