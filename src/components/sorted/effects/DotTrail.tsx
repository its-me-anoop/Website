"use client";

import { useEffect, useRef } from "react";
import { useMotionAllowed } from "./hooks";
import { anchorPoint, pickAnchor, pickStep, springStep, stretch, type Candidate, type DotMode, type Spring } from "./dot-math";

/** Share of the window's height the eye rests on: the dot goes to the anchor nearest this line. */
const FOCUS = 0.5;
/** The dot's radius when it is perched on something. */
const RADIUS = 7;

/** How the dot stands on an element: as it says, or perched on top. */
const modeOf = (el: HTMLElement): DotMode => (el.dataset.dot === "slot" || el.dataset.dot === "start" ? el.dataset.dot : "top");

/**
 * Where the dot stands on an element. A word's box is taller than its
 * letters, so on a serif word the dot stands a little way into the box,
 * on the letters themselves.
 */
function standOn(el: HTMLElement) {
  const box = el.getBoundingClientRect();
  const point = anchorPoint(modeOf(el), box, RADIUS, el.dataset.dotX);
  if (el.tagName === "EM") point.y += box.height * 0.2;
  return point;
}

/**
 * The travelling dot. One vermilion dot is carried down the page: it
 * stands on whichever anchor is nearest the middle of the window, moves
 * with that element as the page scrolls, and hops to the next one in an
 * arc when another comes nearer, stretching as it flies and squashing as
 * it lands. The element it lands on is told (`data-dot-on` while the dot
 * is there, `data-dot-hit` for the moment of landing), so it can react
 * in CSS.
 *
 * An anchor is any element with `data-dot`:
 * - `top` (or empty): the dot perches on the element; `data-dot-x`
 *   says where along it ("0.25", "12px", "-20px" from the right).
 * - `slot`: a placeholder the dot fills at the placeholder's own size
 *   (the dot beside "sorted.", the dot of the footer's wordmark).
 * - `start`: just before a line of text.
 * - `steps`: a row or grid whose `data-dot-step` children the dot
 *   visits in turn as it crosses the window.
 * The serif word of every section heading is an anchor too, as is
 * that of a page heading marked `data-dot-em`.
 * `data-dot-pin` holds the dot on an anchor whatever else is nearer
 * (the hero uses it for the sticker being fixed).
 *
 * The dot takes the colour of `--s-dot` where it lands, so it turns ink
 * on the vermilion wall. It is decoration: hidden from assistive
 * technology, never in the way of the pointer, and absent under reduced
 * motion, where the placeholders show their own dots instead.
 */
export function DotTrail() {
  const ref = useRef<HTMLSpanElement>(null);
  const motion = useMotionAllowed();

  useEffect(() => {
    const dot = ref.current;
    if (!motion || !dot) return;

    const root = document.documentElement;
    root.classList.add("dot-live");

    let on: HTMLElement | null = null;
    let ox: Spring = { x: 0, v: 0 };
    let oy: Spring = { x: 0, v: 0 };
    let size: Spring = { x: RADIUS, v: 0 };
    let squash: Spring = { x: 0, v: 0 };
    let position = { x: 0, y: 0 };
    let landed = true;
    let shownSize = 0;
    let frame = 0;
    let last = 0;
    let quietSince = 0;
    let hitTimer = 0;

    /** The element the dot should stand on for an anchor, where that is in the window, and whether it can be stood on. */
    const resolve = (anchor: HTMLElement, height: number, focus: number) => {
      const box = anchor.getBoundingClientRect();
      if (anchor.dataset.dot === "steps") {
        const steps = Array.from(anchor.querySelectorAll<HTMLElement>("[data-dot-step]"));
        const step = pickStep(
          steps.map((el) => {
            const b = el.getBoundingClientRect();
            return { top: b.top, across: box.width ? (b.left + b.width / 2 - box.left) / box.width : 0.5 };
          }),
          focus,
          height
        );
        return step ? { target: steps[step.index], y: step.y, visible: true } : { target: anchor, y: 0, visible: false };
      }
      /* The dot stands on an element's top edge (or in a slot's middle), so that is what must be on screen. */
      const y = anchor.dataset.dot === "slot" ? box.top + box.height / 2 : box.top;
      return { target: anchor, y, visible: box.width > 0 && y > 8 && y < height };
    };

    const leave = () => {
      on?.removeAttribute("data-dot-on");
      on?.removeAttribute("data-dot-hit");
    };

    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 1 / 60;
      last = now;
      const height = window.innerHeight;

      /* Over the last screen of the page the eye's line sinks to the foot of the window, so the dot can reach the last thing on it. */
      const left = root.scrollHeight - height - window.scrollY;
      const focus = height * (FOCUS + (1 - FOCUS) * Math.max(0, Math.min(1, 1 - left / height)));
      const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-dot], [data-dot-em] em, .s-root h2.s-display em"));
      const targets: HTMLElement[] = [];
      const candidates: Candidate[] = anchors.map((anchor, id) => {
        const { target, y, visible } = resolve(anchor, height, focus);
        targets.push(target);
        return { id, y, visible, pinned: anchor.hasAttribute("data-dot-pin") };
      });
      const picked = pickAnchor(candidates, focus, on ? targets.indexOf(on) : null);
      const next = picked === null ? on : targets[picked];

      if (next && next !== on) {
        const there = standOn(next);
        if (on) {
          /* Start from where the dot is and hop: the further away, the higher the arc. */
          ox = { x: position.x - there.x, v: 0 };
          oy = { x: position.y - there.y, v: -Math.min(1500, 420 + Math.hypot(ox.x, position.y - there.y) * 1.5) };
          landed = false;
        } else {
          size = { x: there.r, v: 0 };
        }
        leave();
        on = next;
        const colour = getComputedStyle(next).getPropertyValue("--s-dot").trim();
        if (colour) dot.style.background = colour;
        dot.style.opacity = "1";
      }

      if (on) {
        const point = standOn(on);
        ox = springStep(ox, 0, dt);
        oy = springStep(oy, 0, dt);
        size = springStep(size, point.r, dt);
        squash = springStep(squash, 0, dt);
        position = { x: point.x + ox.x, y: point.y + oy.x };

        const away = Math.hypot(ox.x, oy.x);
        if (!landed && away < 5 && oy.v > -40) {
          landed = true;
          squash = { x: 0.32, v: 0 };
          on.setAttribute("data-dot-on", "");
          on.setAttribute("data-dot-hit", "");
          const hit = on;
          window.clearTimeout(hitTimer);
          hitTimer = window.setTimeout(() => hit.removeAttribute("data-dot-hit"), 650);
        }

        const r = Math.max(2, size.x);
        if (Math.abs(r - shownSize) > 0.2) {
          shownSize = r;
          dot.style.width = dot.style.height = `${(r * 2).toFixed(1)}px`;
        }
        const shape = landed ? { sx: 1 + squash.x, sy: 1 - squash.x, angle: 0 } : stretch(ox.v, oy.v);
        /* Squashed, the dot stays on what it stands on: it sinks by what it loses in height. */
        const sink = landed ? squash.x * r : 0;
        dot.style.transform = `translate3d(${(position.x - r).toFixed(1)}px, ${(position.y - r + sink).toFixed(1)}px, 0) rotate(${shape.angle.toFixed(1)}deg) scale(${shape.sx.toFixed(3)}, ${shape.sy.toFixed(3)})`;

        const moving = away > 0.3 || Math.abs(ox.v) + Math.abs(oy.v) > 4 || Math.abs(squash.x) > 0.004 || Math.abs(size.x - point.r) > 0.2;
        if (moving) quietSince = now;
      }

      /* Keep running while anything moves, and a little after, then rest until the next scroll. */
      frame = now - quietSince < 320 ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      quietSince = performance.now();
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    const sizes = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(wake);
    sizes?.observe(document.body);
    wake();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hitTimer);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      sizes?.disconnect();
      leave();
      root.classList.remove("dot-live");
    };
  }, [motion]);

  if (!motion) return null;
  return <span ref={ref} aria-hidden="true" data-dot-trail className="dot-trail" />;
}
