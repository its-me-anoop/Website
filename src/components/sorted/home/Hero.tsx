"use client";

import { useEffect, useRef, type CSSProperties } from "react";
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
import { activePiece, heroState, scrollQ } from "./hero-scroll";
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

/** How far each letter of the emphasised word sits out of line before it is sorted (em, em, degrees): askew, still readable. */
const letterScatter = [
  [0.02, -0.07, -9],
  [-0.03, 0.09, 7],
  [0.03, -0.06, -6],
  [-0.02, 0.1, 10],
  [0, -0.08, -8],
  [0.03, 0.07, 6],
  [0, 0.1, 14],
] as const;

/**
 * The opening room: a cobalt wall and a paper floor. The tagline runs
 * across the wall, heavy, with its last word in the serif; under it,
 * the offer and, stuck to the wall, twelve stickers for the pieces of
 * a digital side.
 *
 * The room is a scene the scroll plays. It opens as things were found:
 * the stickers askew with their problems showing, the letters of
 * "sorted." out of line. As the page scrolls, the dot leaves the
 * headline and lands on each sticker in turn; the sticker straightens
 * and its problem turns into the fix. When the last one is done the
 * letters settle and the dot goes back to its place. On a wide, tall
 * window the room holds still while this happens (`data-pin`); on a
 * small one it plays as the wall scrolls past.
 *
 * One number drives it, `--q` on the section (see hero-scroll.ts); CSS
 * works out every sticker from it. Without JavaScript, and under
 * reduced motion, `--q` is past the end: the wall is sorted and the
 * room does not hold.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);
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

  /* The scroll plays the scene. */
  useEffect(() => {
    const root = section.current;
    const wall = stage.current;
    if (!motion || !root || !wall) return;

    let shown: HTMLElement[] = [];
    let held: HTMLElement | null = null;
    let frame = 0;

    /* The stickers on this size of wall, numbered in the order the dot visits them. */
    const number = () => {
      shown = Array.from(wall.querySelectorAll<HTMLElement>(".sort-piece")).filter((piece) => piece.offsetParent !== null);
      const slots = wall.querySelectorAll<HTMLElement>(".sort-slot");
      Array.from(wall.querySelectorAll<HTMLElement>(".sort-piece")).forEach((piece, i) => {
        const n = String(shown.indexOf(piece));
        piece.style.setProperty("--n", n);
        slots[i]?.style.setProperty("--n", n);
      });
      root.style.setProperty("--count", String(shown.length));
    };

    const play = () => {
      frame = 0;
      const box = root.getBoundingClientRect();
      const pinned = getComputedStyle(root.firstElementChild!).position === "sticky";
      const wallBox = wall.getBoundingClientRect();
      /* Not held, the scene lasts until the wall has nearly crossed the window, and never past the hero's own end. */
      const whole = root.offsetHeight - window.innerHeight;
      const across = wallBox.top - box.top + wallBox.height - window.innerHeight * 0.3;
      const distance = pinned ? whole : Math.max(240, whole > 240 ? Math.min(across, whole) : across);
      const q = scrollQ(-box.top, distance, shown.length);
      root.style.setProperty("--q", q.toFixed(3));
      root.dataset.state = heroState(q, shown.length);

      const active = activePiece(q, shown.length);
      const next = active === null ? null : shown[active];
      if (next !== held) {
        if (held) ["data-dot", "data-dot-pin", "data-dot-x"].forEach((name) => held!.removeAttribute(name));
        if (next) {
          next.setAttribute("data-dot", "top");
          next.setAttribute("data-dot-pin", "");
          next.setAttribute("data-dot-x", "0.24");
        }
        held = next;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(play);
    };
    const onResize = () => {
      number();
      onScroll();
    };

    number();
    play();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (held) ["data-dot", "data-dot-pin", "data-dot-x"].forEach((name) => held!.removeAttribute(name));
    };
  }, [motion]);

  const headline = `${heroCopy.lines.join(" ")} ${heroCopy.emphasis}`;

  return (
    <section
      id="top"
      ref={section}
      aria-labelledby="hero-title"
      data-state="mess"
      data-pin=""
      className="hero-scene tone-cobalt relative isolate"
      style={{ "--q": 0, "--count": pieces.length } as CSSProperties}
    >
      <div className="hero-pin flex min-h-svh flex-col overflow-hidden">
        <Container className="relative flex min-h-0 flex-1 flex-col gap-y-8 pb-10 pt-24 wide:gap-y-4 wide:pb-6 short:wide:gap-y-2 short:wide:pb-3 short:wide:pt-[90px]">
          <h1
            id="hero-title"
            aria-label={headline}
            className="s-display relative z-10 text-[clamp(2.7rem,13.4vw,5.6rem)] [--lh:0.9] wide:text-[clamp(3.6rem,min(7.9vw,12.5svh),7.4rem)] short:wide:text-[clamp(2.6rem,min(7.2vw,9svh),4.2rem)]"
          >
            {heroCopy.lines.map((line) => (
              <span key={line}>
                <span className="block wide:inline">{line}</span>{" "}
              </span>
            ))}
            <span className="flex items-baseline gap-[0.12em]">
              <Dot slot className="translate-y-[-0.08em] text-[0.86em]" />
              <em>
                <span className="sort-word">
                  {heroCopy.emphasis.split("").map((letter, i) => {
                    const [lx, ly, lr] = letterScatter[i % letterScatter.length];
                    return (
                      <span key={i} style={{ "--lx": lx, "--ly": ly, "--lr": `${lr}deg` } as CSSProperties}>
                        {letter}
                      </span>
                    );
                  })}
                </span>
              </em>
            </span>
          </h1>

          <div className="grid min-h-0 flex-1 items-end gap-x-12 gap-y-10 wide:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] short:wide:gap-x-6 short:wide:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div className="relative z-10 flex min-w-0 flex-col items-start gap-7 wide:self-start wide:pt-6 short:wide:gap-5 short:wide:pt-2">
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

            <div
              ref={stage}
              role="img"
              aria-label="Twelve parts of an organisation's digital side, from the website and email to backups, Wi-Fi and search, each one fixed and filed in its place."
              className="sort-stage relative z-0 mx-auto w-full max-w-[520px] wide:max-w-[min(560px,56svh)] wide:justify-self-end short:wide:max-w-[max(432px,66svh)]"
            >
              <div className="sort-parallax">
                <div className="sort-table">
                  {pieces.map((piece, n) => (
                    <span
                      key={`slot-${piece.key}`}
                      className="sort-slot"
                      data-extra={piece.extra ? "" : undefined}
                      style={{ ...place(piece), "--n": n } as CSSProperties}
                    />
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

        <Floor colour="paper" className="hero-floor">
          <Container className="flex items-center justify-between gap-6 py-4 text-[#3a3836] sm:py-5 short:wide:py-2.5">
            <ul className="s-mono m-0 flex list-none flex-col gap-1 p-0 text-[12.5px] sm:text-[13.5px]">
              {heroCopy.strip.map((line, i) => (
                <li key={line} className={i === 1 ? "hidden sm:flex short:wide:hidden" : "flex"}>
                  <span aria-hidden className="mr-3 text-s-flame-deep">
                    &gt;
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <a
              href="#clients"
              aria-label="Scroll to clients"
              data-dot="top"
              className="s-key s-key-navy s-mono h-11 shrink-0 gap-3 px-5 text-[13.5px] font-normal"
            >
              scroll
              <span aria-hidden className="s-caret" />
            </a>
          </Container>
        </Floor>
      </div>
    </section>
  );
}

/** A piece's slot: its column and row on the wide table and on the narrow one. */
function place(piece: Piece): CSSProperties {
  return { "--c": piece.c, "--r": piece.r, "--mc": piece.mc ?? 0, "--mr": piece.mr ?? 0 } as CSSProperties;
}
