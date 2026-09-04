"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, samples } from "../data";
import { cn } from "@/lib/utils";
import { AuditBar, Display } from "../primitives";
import { RotatingWord } from "./RotatingWord";
import { HeroField } from "./HeroField";
import { useHeroReducedMotion } from "./useHeroReducedMotion";
import styles from "./Hero.module.css";

const panels = [
  { name: projects[1].name, src: projects[1].image, alt: `${projects[1].name} website`, href: projects[1].href, tint: projects[1].tint, width: 1920, height: 1200 },
  { name: samples[2].name, src: samples[2].image, alt: samples[2].imageAlt, href: samples[2].href, tint: "#e2ddd3", width: 1440, height: 1000 },
  { name: samples[1].name, src: samples[1].image, alt: samples[1].imageAlt, href: samples[1].href, tint: "#e8dfcf", width: 1440, height: 1000 },
  { name: samples[0].name, src: samples[0].image, alt: samples[0].imageAlt, href: samples[0].href, tint: "#d9e2ea", width: 1440, height: 1000 },
  { name: samples[3].name, src: samples[3].image, alt: samples[3].imageAlt, href: samples[3].href, tint: "#dde6df", width: 1440, height: 1000 },
  { name: samples[4].name, src: samples[4].image, alt: samples[4].imageAlt, href: samples[4].href, tint: "#e6dfd5", width: 1440, height: 1000 },
  { name: projects[0].name, src: projects[0].image, alt: `${projects[0].name} website`, href: projects[0].href, tint: projects[0].tint, width: 1920, height: 1200 },
] as const;

function archTransform(offset: number) {
  const o = Math.max(-3.2, Math.min(3.2, offset));
  const abs = Math.abs(o);
  return `rotateY(${o * -12}deg) translateZ(${-abs * 32}px) translateY(${abs * abs * 9}px) rotate(${o * 2.4}deg)`;
}

function PanelRow({ hidden, manual }: { hidden?: boolean; manual: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : "Finished websites by Flutterly"}
      className={styles.row}
    >
      {panels.map((panel, index) => {
        const external = panel.href.startsWith("http");
        const Anchor = external ? "a" : Link;
        return (
          <li className="shrink-0" key={panel.src}>
            <Anchor
              href={panel.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={panel.alt}
              tabIndex={hidden ? -1 : undefined}
              data-fan-card
              className={styles.card}
              style={{ transform: manual ? "none" : undefined }}
            >
              <span className={styles.surface} style={{ backgroundColor: panel.tint }}>
                <Image
                  src={panel.src}
                  alt=""
                  width={panel.width}
                  height={panel.height}
                  priority={!hidden && index < 4}
                  sizes="(max-width: 599px) 220px, (min-width: 1400px) 340px, 24vw"
                  className={styles.image}
                />
              </span>
              <span className={styles.caption} aria-hidden="true">
                {panel.name}<ArrowUpRight size={16} />
              </span>
            </Anchor>
          </li>
        );
      })}
    </ul>
  );
}

/** Read each untransformed li before writing any card transforms. */
function useLiveArch(rootRef: RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-fan-card]"));
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - last < 32) return;
      last = now;
      const mid = window.innerWidth / 2;
      const offsets = cards.map((card) => {
        const rect = (card.parentElement ?? card).getBoundingClientRect();
        return (rect.left + rect.width / 2 - mid) / Math.max(rect.width, 1);
      });
      cards.forEach((card, index) => {
        card.style.transform = archTransform(offsets[index]);
      });
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [enabled, rootRef]);
}

export function Hero({ canvasRef }: { canvasRef: RefObject<HTMLCanvasElement | null> }) {
  const reduce = useHeroReducedMotion();
  const [keyboard, setKeyboard] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { initial: true });
  const running = reduce === false && inView;
  const manual = !!reduce || keyboard;
  useLiveArch(trackRef, running && !manual);

  return (
    <section ref={heroRef} id="top" className={styles.hero} data-running={running}>
      <div ref={sceneRef} className={styles.scene}>
        <div className={styles.opening}>
        <Display as="h1" size="xl" className={styles.heading}>
          <span className={styles.line}><span className={styles.lineInner}>One studio.</span></span>{" "}
          <span className={styles.line}><span className={styles.lineInner}>Every page your</span></span>{" "}
          <span className={styles.line}><span className={styles.lineInner}><RotatingWord interval={3600} paused={!running} /> need.</span></span>
        </Display>
        <HeroField canvasRef={canvasRef} heroRef={heroRef} motionEnabled={reduce === false} reducedMotion={reduce} />
        </div>

        <div
          className={cn("k-fan", styles.gallery, !manual && "k-fan-mask")}
          onFocusCapture={(event) => {
            if (!(event.target instanceof HTMLElement) || !event.target.matches(":focus-visible")) return;
            setKeyboard(true);
            const target = event.target;
            requestAnimationFrame(() => target.scrollIntoView({ block: "nearest", inline: "center", behavior: "instant" }));
          }}
        >
          <div
            ref={trackRef}
            className={manual ? styles.manual : cn("k-fan-track flex w-max items-center animate-marquee [--marquee-duration:65s]", styles.track)}
          >
            <PanelRow manual={manual} />
            {!manual && <PanelRow hidden manual={false} />}
          </div>
        </div>
      </div>

      <div className={styles.intro}>
        <p className={styles.copy}>
          Flutterly designs and builds websites for GP practices and care
          homes. Custom-coded in Reading, Berkshire, accessible to WCAG 2.2
          AA, and looked after by the person who built them.
        </p>
        <div className={styles.audit}><AuditBar /></div>
      </div>
    </section>
  );
}
