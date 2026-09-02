"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { projects, samples } from "../data";
import { cn } from "@/lib/utils";
import { AuditBar, Display, Rise } from "../primitives";
import { RotatingWord } from "./RotatingWord";

/* Finished sites in display order. width/height match each asset so
   panels keep their real landscape ratio. */
const panels = [
  { src: projects[1].image, alt: `${projects[1].name} website`, href: projects[1].href, tint: projects[1].tint, width: 1920, height: 1200 },
  { src: samples[2].image, alt: samples[2].imageAlt, href: samples[2].href, tint: "#e2ddd3", width: 1440, height: 1000 },
  { src: samples[1].image, alt: samples[1].imageAlt, href: samples[1].href, tint: "#e8dfcf", width: 1440, height: 1000 },
  { src: samples[0].image, alt: samples[0].imageAlt, href: samples[0].href, tint: "#d9e2ea", width: 1440, height: 1000 },
  { src: samples[3].image, alt: samples[3].imageAlt, href: samples[3].href, tint: "#dde6df", width: 1440, height: 1000 },
  { src: samples[4].image, alt: samples[4].imageAlt, href: samples[4].href, tint: "#e6dfd5", width: 1440, height: 1000 },
  { src: projects[0].image, alt: `${projects[0].name} website`, href: projects[0].href, tint: projects[0].tint, width: 1920, height: 1200 },
] as const;

/** Fan / arch transform from a signed offset in “card widths” from centre.
 *  Outer cards yaw away and sink, forming the classic smile arch. */
function archTransform(offset: number) {
  /* Clamp the signed offset so cards beyond the fade hold a steady pose
     instead of yawing towards edge-on, which perspective would otherwise
     project back into view as a sliver. */
  const o = Math.max(-3.2, Math.min(3.2, offset));
  const abs = Math.abs(o);
  return [
    `rotateY(${o * -14}deg)`,
    `translateZ(${-abs * 36}px)`,
    `translateY(${abs * abs * 8}px)`,
    `rotate(${o * 2}deg)`,
  ].join(" ");
}

function PanelCard({
  panel,
  priority,
  /** Fixed offset used only for the static reduced-motion fan. */
  staticOffset,
}: {
  panel: (typeof panels)[number];
  priority?: boolean;
  staticOffset?: number;
}) {
  const external = panel.href.startsWith("http");
  const Anchor = external ? "a" : Link;
  return (
    <li className="shrink-0">
      <Anchor
        href={panel.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={panel.alt}
        data-fan-card
        className="group block rounded-[12px] focus-visible:outline-offset-4 will-change-transform"
        style={
          staticOffset !== undefined
            ? {
                transform: archTransform(staticOffset),
                zIndex: 10 - Math.abs(staticOffset),
              }
            : undefined
        }
      >
        <span
          className="block overflow-hidden rounded-[12px] shadow-[0_30px_60px_-30px_rgba(23,20,15,0.55)] ring-1 ring-k-line"
          style={{ backgroundColor: panel.tint }}
        >
          <Image
            src={panel.src}
            alt=""
            width={panel.width}
            height={panel.height}
            priority={priority}
            sizes="(min-width: 1400px) 280px, (max-width: 479px) 42vw, 22vw"
            className="h-auto w-[clamp(148px,28vw,280px)] transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:w-[clamp(180px,22vw,280px)]"
          />
        </span>
      </Anchor>
    </li>
  );
}

function PanelRow({
  hidden,
  priorityFirst,
  staticFan,
}: {
  hidden?: boolean;
  priorityFirst?: boolean;
  /** When true, each card gets a fixed arch offset from the row centre. */
  staticFan?: boolean;
}) {
  const centre = Math.floor(panels.length / 2);
  return (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : "Finished websites by Flutterly"}
      className="flex shrink-0 items-end gap-[clamp(8px,1.2vw,16px)] pr-[clamp(8px,1.2vw,16px)]"
    >
      {panels.map((panel, i) => (
        <PanelCard
          key={`${hidden ? "b" : "a"}-${panel.src}`}
          panel={panel}
          priority={priorityFirst && Math.abs(i - centre) <= 1}
          staticOffset={staticFan ? i - centre : undefined}
        />
      ))}
    </ul>
  );
}

/**
 * Keep every sliding card arched relative to the viewport centre so the
 * marquee never flattens the fan. Only `transform` is written; the
 * horizontal motion stays on the CSS marquee.
 */
function useLiveArch(rootRef: RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    const tick = () => {
      const mid = window.innerWidth / 2;
      const cards = root.querySelectorAll<HTMLElement>("[data-fan-card]");
      for (const card of cards) {
        /* Measure the untransformed <li>, not the card itself: the card's
           own 3D transform would shift its projected centre and feed back
           into the next frame, which reads as jitter at the edges. Every
           card is updated every frame (even off-screen ones) so a card that
           loops from the left exit to the right entry already wears the
           correct arch pose before it becomes visible — no pop on entry. */
        const rect = (card.parentElement ?? card).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const width = Math.max(rect.width, 1);
        const offset = (cx - mid) / width;
        card.style.transform = archTransform(offset);
        card.style.zIndex = String(Math.round(40 - Math.abs(offset) * 8));
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, rootRef]);
}

/**
 * Hero strip: the original fanned arch, driven by each card’s distance
 * from the viewport centre, while the track itself loops continuously.
 * Hover / focus pauses the slide; reduced motion shows a static fan.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  useLiveArch(trackRef, !reduce);

  return (
    <section id="top" className="relative overflow-x-clip pt-28 sm:pt-36 lg:pt-40">
      <div className="mx-auto w-full max-w-[1280px] px-5 text-center sm:px-8">
        <Rise>
          {/* Explicit lines from `sm` so the cycling word (always on the
              last line) can change width without changing the line count. */}
          <Display as="h1" size="xl" className="mx-auto max-w-[16ch] text-k-ink sm:max-w-none">
            <span className="sm:block">One studio.</span>{" "}
            <span className="sm:block">Every page your</span>{" "}
            <span className="sm:block">
              <RotatingWord /> need.
            </span>
          </Display>
        </Rise>
      </div>

      {/* Horizontal clip only. The edge-fade mask lives on this padded box,
          not the track, so cards that sink or tilt into the padding are
          still painted rather than cropped by the mask's own bounds. */}
      <div
        className={cn(
          "k-fan relative mt-8 overflow-x-clip pt-[clamp(2rem,4vw,3.5rem)] pb-[clamp(5.5rem,11vw,8.5rem)] sm:mt-12 lg:mt-14",
          !reduce && "k-fan-mask"
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            reduce
              ? "flex justify-center overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "k-fan-track flex w-max items-center animate-marquee [--marquee-duration:55s]"
          )}
        >
          <PanelRow priorityFirst staticFan={!!reduce} />
          {reduce ? null : <PanelRow hidden />}
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-[1280px] flex-col items-center px-5 pb-16 text-center sm:mt-14 sm:px-8 sm:pb-24 lg:mt-16">
        <Rise delay={0.35}>
          <p className="mx-auto max-w-[600px] text-[16px] leading-[1.6] text-k-ink-soft sm:text-[17.5px]">
            Flutterly designs and builds websites for GP practices and care
            homes. Custom-coded in Reading, Berkshire, accessible to WCAG 2.2
            AA, and looked after by the person who built them.
          </p>
        </Rise>
        <Rise delay={0.45} className="mt-8 flex w-full justify-center sm:mt-9">
          <AuditBar />
        </Rise>
      </div>
    </section>
  );
}
