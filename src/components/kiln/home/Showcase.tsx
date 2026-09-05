"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { samples, type Sample } from "../data";
import { BrowserFrame, BtnLink, CheckItem, Display, Eyebrow, Rise } from "../primitives";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import styles from "./Showcase.module.css";

const PIN_TOP = 96;
const STAGE_BOTTOM_SPACE = 24;

function scrollStep(trackTop: number, viewportHeight: number) {
  const progress = Math.max(0, PIN_TOP - trackTop);
  return Math.min(samples.length - 1, Math.floor(progress / Math.max(360, viewportHeight * 0.65)));
}

function SampleDetails({ sample, includeSectorLink = false }: { sample: Sample; includeSectorLink?: boolean }) {
  return (
    <>
      <p className="mt-2 max-w-[520px] text-[15.5px] leading-[1.55] text-k-ink-soft sm:text-[16px]">
        {sample.strap}
      </p>
      <ul className="mt-4 space-y-2">
        {sample.points.map((point) => <CheckItem key={point}>{point}</CheckItem>)}
      </ul>
      {includeSectorLink && sample.sectorHref ? (
        <BtnLink href={sample.sectorHref} tone="outline" className="mt-5">
          {sample.tab} websites
        </BtnLink>
      ) : null}
    </>
  );
}

/**
 * Five sectors, five finished sample sites. A proper tab interface:
 * the list on the left picks a sector, the frame on the right shows
 * the site. Roving tabindex, arrow keys, `aria-selected`.
 *
 * A compact preview and disclosure keep the same scroll sequence usable on
 * phones and short windows. Expanded content returns to document flow.
 */
export function Showcase() {
  const [index, setIndex] = useState(0);
  const [wideLayout, setWideLayout] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [releasedOffset, setReleasedOffset] = useState(0);
  const [preloadPreviews, setPreloadPreviews] = useState(false);
  const [sequence, setSequence] = useState({ pinned: false, height: 0, distance: 0 });
  const sequenceRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastScrollStep = useRef<number | null>(null);
  const pointerSummary = useRef<HTMLElement | null>(null);
  const scrollViewport = useRef({ width: 0, height: 0 });
  const reduce = useReducedMotion();
  const baseId = useId();
  const active = samples[index];

  useEffect(() => {
    const layoutQuery = window.matchMedia("(min-width: 1024px) and (min-height: 760px)");
    const sync = () => setWideLayout(layoutQuery.matches);
    sync();
    layoutQuery.addEventListener("change", sync);
    return () => layoutQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = sequenceRef.current;
    if (!track) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPreloadPreviews(true);
        observer.disconnect();
      }
    }, { rootMargin: "800px 0px" });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!preloadPreviews) return;
    // Decode ahead of selection, including the hidden layers, so a first
    // visit to a sample does not spend its crossfade loading a screenshot.
    panelRef.current?.querySelectorAll("img").forEach((image) => {
      void image.decode?.().catch(() => {});
    });
  }, [preloadPreviews]);

  useEffect(() => {
    const track = sequenceRef.current;
    const stage = stageRef.current;
    const panel = panelRef.current;
    if (!track || !stage || !panel) return;
    let frame = 0;
    let pinned = false;
    let stepDistance = 0;

    const currentStep = () => {
      return scrollStep(track.getBoundingClientRect().top, scrollViewport.current.height);
    };
    const followScroll = () => {
      frame = 0;
      // Keep a focused sample actionable until focus leaves the panel.
      const focus = document.activeElement;
      const protectsKeyboardFocus = panel.contains(focus) && focus !== pointerSummary.current;
      if (!pinned || protectsKeyboardFocus) return;
      const step = currentStep();
      // A chosen tab stays selected until the reader crosses another scroll
      // step. Clicking a tab never moves the document or captures scrolling.
      if (step !== lastScrollStep.current) {
        lastScrollStep.current = step;
        setIndex(step);
      }
    };
    const scheduleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(followScroll);
    };
    const resumeAfterFocus = (event: FocusEvent) => {
      if (event.relatedTarget instanceof Node && panel.contains(event.relatedTarget)) return;
      if (event.relatedTarget instanceof Node && stage.contains(event.relatedTarget)) {
        // Moving back to a sector tab is another deliberate selection.
        lastScrollStep.current = currentStep();
        return;
      }
      scheduleScroll();
    };
    const measure = () => {
      // Phone browser chrome changes innerHeight mid-swipe. Keep the same
      // scroll intervals until the width/layout changes (e.g. rotation).
      if (wideLayout || scrollViewport.current.width !== window.innerWidth) {
        scrollViewport.current = { width: window.innerWidth, height: window.innerHeight };
      }
      const viewportHeight = scrollViewport.current.height;
      const height = stage.getBoundingClientRect().height;
      pinned = (wideLayout || !expanded) && height > 0 && height <= viewportHeight - PIN_TOP - STAGE_BOTTOM_SPACE;
      stepDistance = Math.max(360, viewportHeight * 0.65);
      setSequence((previous) => {
        const distance = stepDistance * samples.length;
        return previous.pinned === pinned && previous.height === height && previous.distance === distance
          ? previous : { pinned, height, distance };
      });
      scheduleScroll();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    panel.addEventListener("focusout", resumeAfterFocus);
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      panel.removeEventListener("focusout", resumeAfterFocus);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", measure);
    };
  }, [wideLayout, expanded]);

  useEffect(() => {
    if (wideLayout) return;
    const tab = tabRefs.current[index];
    const list = tab?.parentElement;
    if (!tab || !list) return;
    const tabBox = tab.getBoundingClientRect();
    const listBox = list.getBoundingClientRect();
    const offset = tabBox.left < listBox.left ? tabBox.left - listBox.left
      : tabBox.right > listBox.right ? tabBox.right - listBox.right : 0;
    if (offset) list.scrollTo({ left: list.scrollLeft + offset, behavior: reduce ? "instant" : "smooth" });
  }, [index, wideLayout, reduce]);

  function selectSample(next: number) {
    lastScrollStep.current = scrollStep(sequenceRef.current?.getBoundingClientRect().top ?? PIN_TOP, scrollViewport.current.height);
    setExpanded(false);
    setIndex(next);
  }

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = samples.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    selectSample(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className={styles.heading}>
          <Rise className="max-w-[720px]">
            <Eyebrow className="text-k-muted">Sample sites, live and hosted</Eyebrow>
            <Display as="h2" size="lg" className="mt-5 text-k-ink">
              Five sectors. Five finished sites you can click through.
            </Display>
            <p className="mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-k-ink-soft sm:text-[17px]">
              Each one is a fictional organisation, built and hosted by Flutterly
              so a practice manager can judge the standard before a single call.
            </p>
            <p className={styles.scrollHint} aria-hidden={!sequence.pinned}>
              Scroll through the five sectors, or choose one below.
            </p>
          </Rise>
          <div aria-hidden="true" data-particle-refuge="showcase" className={styles.refuge} />
        </div>

        <div
          ref={sequenceRef}
          data-showcase-sequence=""
          data-layout={wideLayout ? "wide" : "compact"}
          data-expanded={!wideLayout && expanded}
          data-pinned={sequence.pinned}
          className={styles.sequence}
          style={{
            "--sequence-height": `${sequence.height + sequence.distance}px`,
            paddingTop: !wideLayout && expanded ? `${releasedOffset}px` : undefined,
          } as CSSProperties}
        >
          <div ref={stageRef} className={styles.stage}>
            {/* Tab list: chips that scroll on phone, column from tablet. */}
            <div className={cn("relative min-w-0 md:static", styles.tabs)}>
              <div
                role="tablist"
                aria-label="Sample sites by sector"
                aria-orientation={wideLayout ? "vertical" : "horizontal"}
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
                      onClick={() => selectSample(i)}
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
              ref={panelRef}
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-tab-${active.slug}`}
              tabIndex={0}
              className={cn("min-w-0 rounded-[18px] focus-visible:outline-offset-4", styles.panel)}
            >
              {/* Overlapping grid layers reserve the tallest sample's space.
                  Nothing mounts or changes document height during a fade. */}
              {samples.map((sample, sampleIndex) => (
                <div
                  key={sample.slug}
                  data-active={sampleIndex === index}
                  aria-hidden={sampleIndex !== index}
                  inert={sampleIndex !== index}
                  className={styles.panelContent}
                >
                  <div className={styles.preview}>
                    <BrowserFrame
                      src={sample.image}
                      alt={sample.imageAlt}
                      url={`${site.domain}${sample.href}`}
                      loading={preloadPreviews || sampleIndex === index ? "eager" : "lazy"}
                      unoptimized
                    />
                  </div>
                  <div className={styles.details}>
                    <p className="text-[13px] text-k-muted">{sample.sector}</p>
                    <h3 className="k-display mt-1 text-[clamp(1.4rem,4vw,2.1rem)] text-k-ink">
                      {sample.name}
                    </h3>
                    {wideLayout ? <SampleDetails sample={sample} /> : (
                      <details
                        className={styles.disclosure}
                        open={sampleIndex === index && expanded}
                        onToggle={(event) => {
                          if (sampleIndex !== index) return;
                          const open = event.currentTarget.open;
                          if (open && !expanded) {
                            const progress = Math.max(0, PIN_TOP - (sequenceRef.current?.getBoundingClientRect().top ?? PIN_TOP));
                            setReleasedOffset(Math.min(sequence.distance, progress));
                          }
                          setExpanded(open);
                        }}
                      >
                        <summary
                          onPointerDown={(event) => { pointerSummary.current = event.currentTarget; }}
                          onKeyDown={() => { pointerSummary.current = null; }}
                          onBlur={() => { pointerSummary.current = null; }}
                        >
                          About this sample
                        </summary>
                        <SampleDetails sample={sample} includeSectorLink />
                      </details>
                    )}
                  </div>
                  <div className={cn("flex flex-col gap-2 sm:items-stretch", styles.actions)}>
                    <BtnLink href={sample.href} tone="coal" arrow="up" className="w-full sm:w-auto">
                      Open the sample site
                    </BtnLink>
                    {wideLayout && sample.sectorHref ? (
                      <BtnLink href={sample.sectorHref} tone="outline" className="w-full sm:w-auto">
                        {sample.tab} websites
                      </BtnLink>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
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
