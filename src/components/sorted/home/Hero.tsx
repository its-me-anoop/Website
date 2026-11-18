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
import { Dot, Floor } from "../ui/Room";
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

/**
 * How far each letter of the emphasised word sits from its place before it
 * is sorted (em, em, degrees). No letter moves left of the word's first
 * place, so none lands on the vermilion dot beside it.
 */
const letterScatter = [
  [1.7, -0.06, -9],
  [0.5, 0.1, 7],
  [0.55, -0.08, -6],
  [-0.95, 0.09, 10],
  [0, -0.1, -8],
  [-1.25, 0.07, 6],
  [0, 0.12, 14],
] as const;

/**
 * The opening room: a cobalt wall and a paper floor. The tagline runs
 * across the wall, heavy, with its last word in the serif; under it,
 * the offer and, stuck to the wall, twelve stickers for the pieces of
 * a digital side. They arrive where they were found, askew, with their
 * problems showing, and line up with each one fixed; the last word of
 * the headline sorts its own letters at the same moment. A switch puts
 * the wall back to how things were found, and the stickers drift a
 * little away from a mouse. The floor carries three typewritten lines.
 *
 * The first paint is the sorted layout. The arrival is a CSS animation
 * (`data-intro`), so it plays without JavaScript, cannot delay the
 * headline, and ends in the layout the server sent. Reduced motion
 * shows the sorted wall and the switch changes it at once.
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
        el.style.setProperty("--px", `${((e.clientX / window.innerWidth - 0.5) * -16).toFixed(1)}px`);
        el.style.setProperty("--py", `${((e.clientY / window.innerHeight - 0.5) * -12).toFixed(1)}px`);
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
      className="tone-cobalt relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <Container className="relative flex flex-1 flex-col gap-y-8 pb-10 pt-24 sm:pt-28 lg:gap-y-4 lg:pb-10">
        <h1
          id="hero-title"
          aria-label={headline}
          className="s-display relative z-10 text-[clamp(2.7rem,13.4vw,5.6rem)] [--lh:0.9] lg:text-[clamp(4.6rem,7.9vw,7.4rem)]"
        >
          {heroCopy.lines.map((line) => (
            <span key={line}>
              <span className="block lg:inline">{line}</span>{" "}
            </span>
          ))}
          <span className="flex items-baseline gap-[0.12em]">
            <Dot className="translate-y-[-0.08em] text-[0.86em]" />
            <em>
              <span className="sort-word">
                {heroCopy.emphasis.split("").map((letter, i) => {
                  const [lx, ly, lr] = letterScatter[i % letterScatter.length];
                  return (
                    <span key={i} style={{ "--i": i, "--lx": lx, "--ly": ly, "--lr": `${lr}deg` } as CSSProperties}>
                      {letter}
                    </span>
                  );
                })}
              </span>
            </em>
          </span>
        </h1>

        <div className="grid flex-1 items-end gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)]">
          <div className="relative z-10 flex min-w-0 flex-col items-start gap-7 lg:justify-between lg:self-stretch lg:pb-3 lg:pt-6">
            <div className="flex flex-col items-start gap-7">
            <p className="s-say max-w-[560px] text-[clamp(20px,1.9vw,27px)] text-s-ink">{heroCopy.copy}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/book" className="s-key group/btn h-14 px-7 text-[17px]">
                Book a call
                <ArrowRight size={18} strokeWidth={2.6} aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              <Link href="#work" className="s-ul inline-flex min-h-11 items-center text-[17px] font-semibold text-s-ink">
                See the work
              </Link>
            </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span aria-hidden className="s-label text-[13.5px] text-s-muted">
                as found
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
              <span aria-hidden className="s-label text-[13.5px] text-s-ink">
                sorted
              </span>
            </div>
          </div>

          <div
            ref={stage}
            role="img"
            aria-label="Twelve parts of an organisation's digital side, from the website and email to backups, Wi-Fi and search, each one fixed and filed in its place."
            className="sort-stage relative z-0 mx-auto w-full max-w-[520px] lg:max-w-[560px] lg:justify-self-end"
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
                      className="sort-piece"
                      data-extra={piece.extra ? "" : undefined}
                      style={
                        {
                          ...place(piece),
                          "--n": n,
                          "--mx": s.mx,
                          "--my": s.my,
                          "--rz": `${s.rz}deg`,
                          "--chip": serviceColour[piece.service],
                          "--chip-ink": piece.service === "websites" ? "#ffffff" : "var(--s-navy)",
                        } as CSSProperties
                      }
                    >
                      <div className="sort-bob">
                        <div className="sort-face">
                          <div className="flex items-center justify-between gap-[1cqw]">
                            <span className="font-bold tracking-[-0.03em]">{piece.title}</span>
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
        </div>
      </Container>

      <Floor colour="paper">
        <Container className="flex items-center justify-between gap-6 py-5 text-[#3a3836] sm:py-7">
          <ul className="s-mono m-0 flex list-none flex-col gap-1.5 p-0 text-[12.5px] sm:text-[13.5px]">
            {heroCopy.strip.map((line, i) => (
              <li key={line} className={i === 1 ? "hidden sm:flex" : "flex"}>
                <span aria-hidden className="mr-3 text-s-flame-deep">
                  &gt;
                </span>
                {line}
              </li>
            ))}
          </ul>
          <a
            href="#services"
            aria-label="Scroll to services"
            className="s-key s-key-navy s-mono h-11 shrink-0 gap-3 px-5 text-[13.5px] font-normal"
          >
            scroll
            <span aria-hidden className="s-caret" />
          </a>
        </Container>
      </Floor>
    </section>
  );
}

/** A piece's slot: its column and row on the wide table and on the narrow one. */
function place(piece: Piece): CSSProperties {
  return { "--c": piece.c, "--r": piece.r, "--mc": piece.mc ?? 0, "--mr": piece.mr ?? 0 } as CSSProperties;
}
