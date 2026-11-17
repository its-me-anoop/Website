"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  AtSign,
  DatabaseBackup,
  Globe,
  Heart,
  KeyRound,
  Mail,
  MapPin,
  Search,
  Smartphone,
  Star,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { heroCopy } from "@/lib/marketing/content";
import { useFinePointer, useMotionAllowed } from "../effects/hooks";
import { Container } from "../ui/primitives";
import { serviceColour } from "../ui/tones";
import { pieces, scatterOf, type Piece } from "./pieces";

const icons: Record<Piece["icon"], LucideIcon> = {
  globe: Globe,
  at: AtSign,
  access: Accessibility,
  phone: Smartphone,
  mail: Mail,
  backup: DatabaseBackup,
  key: KeyRound,
  wifi: Wifi,
  heart: Heart,
  star: Star,
  search: Search,
  pin: MapPin,
};

/** How far each letter of the emphasised word sits from its place before it is sorted (em, em, degrees, degrees). */
const letterScatter = [
  [3.05, -0.06, -9, 40],
  [0.62, 0.1, 7, -30],
  [0.6, -0.08, -6, 24],
  [-1.3, 0.09, 10, -44],
  [0, -0.1, -8, 36],
  [-3.2, 0.07, 6, -22],
  [0, 0.12, 14, 0],
] as const;

/**
 * The opening: the tagline on cobalt beside a table of twelve pieces
 * of a digital side. They arrive scattered, with their problems
 * showing, and drop into rows with each one fixed; the last word of
 * the headline sorts its own letters at the same moment. A switch
 * flips the table back to how things were found, and the table leans
 * towards a mouse.
 *
 * The first paint is the sorted layout. The arrival is a CSS animation
 * (`data-intro`), so it plays without JavaScript, cannot delay the
 * headline, and ends in the layout the server sent. Reduced motion
 * shows the sorted table and the switch changes it at once.
 */
export function Hero() {
  const [sorted, setSorted] = useState(true);
  const [intro, setIntro] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const motion = useMotionAllowed();
  const follow = fine && motion;

  useEffect(() => {
    if (!follow) return;
    const el = stage.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--px", `${((e.clientX / window.innerWidth - 0.5) * 12).toFixed(2)}deg`);
        el.style.setProperty("--py", `${((e.clientY / window.innerHeight - 0.5) * -9).toFixed(2)}deg`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };
  }, [follow]);

  const headline = `${heroCopy.lines.join(" ")} ${heroCopy.emphasis}`;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-state={sorted ? "sorted" : "mess"}
      data-intro={intro ? "" : undefined}
      className="tone-cobalt relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden"
    >
      <Container className="relative grid flex-1 items-center gap-x-8 gap-y-10 pb-10 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:pb-16">
        <div className="relative z-10 flex min-w-0 flex-col items-start gap-7">
          <h1
            id="hero-title"
            aria-label={headline}
            className="s-display text-[clamp(2.2rem,11.5vw,3.6rem)] [--lh:0.92] sm:text-[clamp(3.6rem,8.4vw,5rem)] lg:text-[clamp(3.6rem,5.7vw,5.9rem)]"
          >
            {heroCopy.lines.map((line) => (
              <span key={line}>
                <span className="block">{line}</span>{" "}
              </span>
            ))}
            <em className="mt-[0.08em]">
              <span className="sort-word">
                {heroCopy.emphasis.split("").map((letter, i) => {
                  const [lx, ly, lr, lrx] = letterScatter[i % letterScatter.length];
                  return (
                    <span
                      key={i}
                      style={
                        { "--i": i, "--lx": lx, "--ly": ly, "--lr": `${lr}deg`, "--lrx": `${lrx}deg` } as CSSProperties
                      }
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
            </em>
          </h1>

          <p className="max-w-[540px] text-[clamp(17px,1.35vw,19.5px)] leading-[1.55] text-s-ink-soft">{heroCopy.copy}</p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/book" className="s-key group/btn h-[54px] px-7 text-[17px]">
              Book a call
              <ArrowRight size={18} strokeWidth={2.6} aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            <Link href="#work" className="s-ul inline-flex min-h-11 items-center text-[17px] font-semibold text-s-ink">
              See the work
            </Link>
          </div>

          <div className="mt-1 flex items-center gap-3.5">
            <span aria-hidden className="s-label text-[13px] text-s-muted">
              As found
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={sorted}
              aria-label="Show everything sorted"
              onClick={() => {
                setIntro(false);
                setSorted((s) => !s);
              }}
              className="sort-switch"
            />
            <span aria-hidden className="s-label text-[13px] text-s-ink">
              Sorted
            </span>
          </div>
        </div>

        <div
          ref={stage}
          role="img"
          aria-label="Twelve parts of an organisation's digital side, from the website and email to backups, Wi-Fi and search, each one fixed and filed in its place."
          className="sort-stage relative z-0 mx-auto w-full max-w-[520px] lg:max-w-none"
        >
          <div className="sort-parallax">
            <div className="sort-table">
              {pieces.map((piece) => (
                <span key={`slot-${piece.key}`} className="sort-slot" data-extra={piece.extra ? "" : undefined} style={place(piece)} />
              ))}
              {pieces.map((piece, n) => {
                const Icon = icons[piece.icon];
                const s = scatterOf(n);
                return (
                  <div
                    key={piece.key}
                    className="slab sort-piece"
                    data-extra={piece.extra ? "" : undefined}
                    style={
                      {
                        ...place(piece),
                        "--n": n,
                        "--mx": s.mx,
                        "--my": s.my,
                        "--mz": s.mz,
                        "--rx": `${s.rx}deg`,
                        "--ry": `${s.ry}deg`,
                        "--rz": `${s.rz}deg`,
                        "--chip": serviceColour[piece.service],
                        "--chip-ink": piece.service === "websites" ? "#ffffff" : "var(--s-navy)",
                      } as CSSProperties
                    }
                  >
                    <div className="sort-bob">
                      <div className="sort-face">
                        <div className="flex items-center justify-between gap-[1cqw]">
                          <span className="font-extrabold tracking-[-0.02em] [font-stretch:108%]">{piece.title}</span>
                          <span className="sort-chip">
                            <Icon strokeWidth={2.3} />
                          </span>
                        </div>
                        <div className="sort-status">
                          <span className="sort-bad">
                            <i />
                            {piece.found}
                          </span>
                          <span className="sort-good">
                            <i />
                            {piece.sorted}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t-2 border-s-line">
        <Container className="s-label flex min-h-14 items-center justify-between gap-4 py-3 text-[12.5px] text-s-muted">
          <span>{heroCopy.strip[0]}</span>
          <span className="hidden lg:inline">{heroCopy.strip[1]}</span>
          <span className="hidden sm:inline">{heroCopy.strip[2]}</span>
        </Container>
      </div>
    </section>
  );
}

/** A piece's slot: its column and row on the wide table and on the narrow one. */
function place(piece: Piece): CSSProperties {
  return { "--c": piece.c, "--r": piece.r, "--mc": piece.mc ?? 0, "--mr": piece.mr ?? 0 } as CSSProperties;
}
