"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { samples, type Sample } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { SignArrow } from "../ui/Arrow";
import { ButtonLink } from "../ui/Button";
import { PhoneFrame, ScreenFrame } from "../ui/Frames";
import { Container, SectionHead } from "../ui/Type";
import { nextTabIndex } from "./tabs";

/**
 * The five sample sites as a building directory. A tab per sector; each
 * panel is an ink board listing the questions visitors arrive with and
 * the page on the sample site that answers each one, beside the site
 * itself. Rows flip down like split-flap plates when the sector changes.
 */
export function Directory() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const sample = samples[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const next = nextTabIndex(e.key, active, samples.length);
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="services" className="scroll-mt-20 border-b-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28">
      <Container>
        <SectionHead
          kicker="Sample sites"
          title={
            <>
              Every visitor arrives with <mark className="wf-mark">a question.</mark>
            </>
          }
          copy="Five sample sites, one for each kind of organisation Flutterly builds for. They are fictional, fully built and hosted. Pick a sector, then follow a question to the page that answers it."
        />

        <div
          role="tablist"
          aria-label="Sample sites by sector"
          className="wf-tabs-scroll -mx-4 mt-12 flex overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          <div className="flex shrink-0 overflow-hidden rounded-[8px] border-2 border-wf-ink bg-wf-card">
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
                    "flex shrink-0 items-center gap-2 px-4 py-3 text-[15.5px] font-bold transition-colors sm:px-5",
                    i > 0 && "border-l-2 border-wf-ink",
                    selected ? "bg-wf-sign" : "hover:bg-wf-paper-2"
                  )}
                >
                  <span className="wf-mono text-[12px] font-normal text-wf-ink-soft" aria-hidden="true">
                    0{i + 1}
                  </span>
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
          className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14"
        >
          <SamplePanel key={sample.slug} sample={sample} />
          <SampleScreens key={`${sample.slug}-screens`} sample={sample} />
        </div>
      </Container>
    </section>
  );
}

function SamplePanel({ sample }: { sample: Sample }) {
  return (
    <div className="min-w-0">
      <p className="wf-label text-wf-ink-soft">{sample.sector}</p>
      <h3 className="mt-3 text-[clamp(2rem,3.4vw,2.9rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
        {sample.name}
      </h3>
      <p className="mt-3 text-[18px] leading-[1.55] text-wf-ink-soft">{sample.strap}</p>

      <div className="wf-board wf-on-ink mt-8 overflow-hidden">
        <p className="wf-label flex items-center justify-between gap-4 border-b border-wf-on-ink-line px-5 py-3.5 text-wf-on-ink-soft sm:px-6">
          <span>Visitors ask</span>
          <span className="hidden sm:inline">The site sends them to</span>
        </p>
        <ul className="wf-rows">
          {sample.routes.map((route, i) => (
            <li
              key={route.href}
              className="wf-flip border-b border-wf-on-ink-line last:border-b-0"
              style={{ ["--i" as string]: i } as CSSProperties}
            >
              <Link
                href={route.href}
                className="group flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-wf-ink-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5"
              >
                <span className="text-[18px] leading-snug sm:text-[19px]">
                  &ldquo;{route.ask}&rdquo;
                </span>
                <span className="flex shrink-0 items-center gap-2 font-bold text-wf-sign">
                  <SignArrow size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                  {route.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.6]">
        <strong className="font-bold">For {sample.audience.toLowerCase()}:</strong>{" "}
        <span className="text-wf-ink-soft">{sample.audienceCopy}</span>
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={sample.href} arrow="up-right">
          Open the sample site
        </ButtonLink>
        {sample.sectorHref ? (
          <ButtonLink href={sample.sectorHref} tone="outline">
            {sample.tab} websites
          </ButtonLink>
        ) : null}
      </div>
      <p className="mt-4 text-[14.5px] text-wf-muted">A live, hosted sample. The organisation shown is fictional.</p>
    </div>
  );
}

function SampleScreens({ sample }: { sample: Sample }) {
  return (
    <div className="relative min-w-0 pb-20 sm:pb-16 lg:pt-10">
      <Link href={sample.href} tabIndex={-1} aria-hidden="true" className="block">
        <ScreenFrame
          src={sample.image}
          alt=""
          url={`${site.domain}${sample.href}`}
          loading="eager"
          sizes="(min-width: 1024px) 700px, 92vw"
        />
      </Link>
      <div className="absolute -bottom-2 right-3 sm:right-8 lg:-left-8 lg:right-auto">
        <PhoneFrame src={sample.mobileImage} width={150} className="sm:w-[180px]! lg:w-[190px]!" />
      </div>
    </div>
  );
}
