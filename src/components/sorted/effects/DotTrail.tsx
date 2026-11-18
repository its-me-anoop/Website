"use client";

import { useEffect, useRef } from "react";
import { useMotionAllowed } from "./hooks";
import {
  anchorPoint,
  bounceHeight,
  bounces,
  easeIn,
  easeOut,
  flightTime,
  impact,
  mix,
  overshoot,
  pickAnchor,
  pickStep,
  restX,
  rideY,
  stretch,
  surfaceSpan,
  throwArc,
  type Candidate,
  type DotMode,
  type Surface,
} from "./dot-math";

/** Share of the window's height the eye rests on: the dot goes to the anchor nearest this line. */
const FOCUS = 0.5;
/** The dot's radius as a ball. */
const R = 7;

/** What is drawn: a rounded box (a circle, when it is a ball) at a place, squashed or stretched. */
type Shape = { x: number; y: number; w: number; h: number; radius: number; alpha: number; sx: number; sy: number; angle: number };

/** One stretch of a move: `at` gives the shape `t` seconds in (`k` is the share done). */
type Step = { time: number; at: (k: number, t: number) => Shape; enter?: () => void; thrown?: boolean };

const ball = (x: number, y: number, more: Partial<Shape> = {}): Shape => ({ x, y, w: R * 2, h: R * 2, radius: R, alpha: 1, sx: 1, sy: 1, angle: 0, ...more });

/** How the dot stands on an element: as it says, or perched on top. */
const modeOf = (el: HTMLElement): DotMode => {
  const mode = el.dataset.dot;
  return mode === "slot" || mode === "start" || mode === "into" ? mode : "top";
};

/** A CSS corner radius in pixels: a length, a share of the width, or "as round as it goes". */
function corner(value: string, width: number): number {
  const first = value.split(" ")[0];
  const n = parseFloat(first);
  if (!Number.isFinite(n)) return 9999;
  return first.endsWith("%") ? (n / 100) * width : n;
}

/**
 * The travelling dot. One vermilion ball is carried down the page, from
 * one anchor to the next, and it moves like a ball.
 *
 * It rests on the top outline of an element, rounded corners and all.
 * When another anchor comes nearer the middle of the window it crouches,
 * rolls to the edge it is leaving by, over the curve of the corner, and
 * is thrown: an arc under gravity, stretched along its path. It lands a
 * little short, squashes, bounces lower each time, and rolls the rest
 * of the way to where it stands. While it is on an element it moves
 * with it, so scrolling never leaves it behind.
 *
 * Some anchors it does not stand on but becomes. In a `slot` it grows
 * to fill a placeholder (the dot beside "sorted.", the dot of the
 * footer's wordmark). Going `into` an element it takes that element's
 * shape and colour and then lets the element itself show through, so a
 * button, an arrow's disc or a sticker's status light seems to be made
 * of it; when it leaves it comes back out of the same shape.
 *
 * The element it arrives at is told (`data-dot-on` while the dot is
 * there, `data-dot-hit` for the moment of landing), so it can answer in
 * CSS.
 *
 * An anchor is any element with `data-dot`:
 * - `top` (or empty): stood on; `data-dot-x` says where along it
 *   ("0.25", "12px", "-20px" from the right).
 * - `slot`: a placeholder the dot fills.
 * - `into`: an element the dot becomes.
 * - `start`: just before a line of text.
 * - `steps`: a row or grid whose `data-dot-step` children it visits in
 *   turn.
 * The serif word of every section heading is an anchor too, as is that
 * of a page heading marked `data-dot-em`. `data-dot-pull` makes an
 * anchor count as nearer than it is, so what matters draws the dot from
 * further off; `data-dot-pin` holds it there whatever else is nearer.
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
    let shape: Shape | null = null;
    let steps: Step[] = [];
    let stepStart = 0;
    let frame = 0;
    let quietSince = 0;
    let hitTimer = 0;
    let surfaces = new WeakMap<HTMLElement, { rl: number; rr: number; bl: number; br: number }>();

    /* ── Reading the page ───────────────────────────────────── */

    /** The top of an element as a surface, where it is in the window now. */
    const surfaceOf = (el: HTMLElement): Surface => {
      const box = el.getBoundingClientRect();
      let radii = surfaces.get(el);
      if (!radii) {
        const style = getComputedStyle(el);
        radii = {
          rl: corner(style.borderTopLeftRadius, box.width),
          rr: corner(style.borderTopRightRadius, box.width),
          bl: corner(style.borderBottomLeftRadius, box.width),
          br: corner(style.borderBottomRightRadius, box.width),
        };
        surfaces.set(el, radii);
      }
      /* A word's box is taller than its letters: the ball stands a little way into it, on the letters. */
      const sink = el.tagName === "EM" ? box.height * 0.2 : 0;
      return { left: box.left, top: box.top + sink, width: box.width, height: box.height - sink, ...radii };
    };

    /** Where along an element the ball rests. */
    const restAt = (el: HTMLElement, s: Surface) => restX(s, anchorPoint("top", s, R, el.dataset.dotX).x);

    /** The dot at rest on an element: a ball on top, a circle in a slot, or the element's own shape, unseen. */
    const rest = (el: HTMLElement): Shape => {
      const mode = modeOf(el);
      const s = surfaceOf(el);
      if (mode === "top") {
        const x = restAt(el, s);
        return ball(x, rideY(s, x, R));
      }
      const point = anchorPoint(mode, s, R);
      if (mode === "start") return ball(point.x, point.y);
      if (mode === "slot") return ball(point.x, point.y, { w: point.r * 2, h: point.r * 2, radius: point.r });
      return { ...ball(point.x, point.y), w: s.width, h: s.height, radius: Math.min(s.rl, s.width / 2, s.height / 2), alpha: 0 };
    };

    const colourOf = (el: HTMLElement) => getComputedStyle(el).getPropertyValue("--s-dot").trim() || "";

    const arrive = (el: HTMLElement) => {
      el.setAttribute("data-dot-on", "");
      el.setAttribute("data-dot-hit", "");
      window.clearTimeout(hitTimer);
      hitTimer = window.setTimeout(() => el.removeAttribute("data-dot-hit"), 700);
    };

    const leave = (el: HTMLElement | null) => {
      el?.removeAttribute("data-dot-on");
      el?.removeAttribute("data-dot-hit");
    };

    /* ── Planning a move ────────────────────────────────────── */

    /**
     * The move from where the dot is to `to`. `settled` says the dot was
     * at rest on `from`, so it can take its time leaving; otherwise it
     * was already in the air and is simply thrown again from there.
     */
    const plan = (from: HTMLElement | null, to: HTMLElement, start: Shape, settled: boolean): Step[] => {
      const out: Step[] = [];
      const toMode = modeOf(to);
      let last = start;
      const keep = (s: Shape) => (last = s);

      const aim = rest(to);
      const direction = Math.sign(aim.x - start.x) || 1;

      if (from && settled) {
        const fromMode = modeOf(from);
        if (fromMode === "into") {
          /* Come back out of the element: its shape, drawn in to a ball at its middle. */
          out.push({
            time: 0.22,
            enter: () => {
              const fill = getComputedStyle(from).backgroundColor;
              if (fill && fill !== "rgba(0, 0, 0, 0)") dot.style.background = fill;
            },
            at: (k) => {
              const home = rest(from);
              const e = easeOut(k);
              return keep({ ...home, w: mix(home.w, R * 2, e), h: mix(home.h, R * 2, e), radius: mix(home.radius, R, e), alpha: Math.min(1, k * 5) });
            },
          });
        } else if (fromMode === "top") {
          /* Crouch, then roll to the edge it is leaving by, over the curve of the corner. */
          out.push({
            time: 0.1,
            at: (k) => {
              const home = rest(from);
              const c = Math.sin(k * Math.PI * 0.5) * 0.26;
              return keep({ ...home, sx: 1 + c * 0.7, sy: 1 - c, y: home.y + c * R });
            },
          });
          const s0 = surfaceOf(from);
          const span0 = surfaceSpan(s0, R);
          const x0 = restAt(from, s0);
          const edge0 = direction > 0 ? span0.to : span0.from;
          const run = Math.abs(edge0 - x0);
          const far = Math.abs(aim.x - x0);
          if (run > 10 && run < 190 && far > run + 40) {
            out.push({
              time: Math.max(0.14, Math.min(0.34, run / 520)),
              at: (k) => {
                const s = surfaceOf(from);
                const span = surfaceSpan(s, R);
                const x = mix(restAt(from, s), direction > 0 ? span.to : span.from, easeIn(k));
                return keep(ball(x, rideY(s, x, R)));
              },
            });
          }
        }
      }

      /* Where the throw comes down: on a surface a little short of where the ball will rest, else at the anchor itself. */
      const landing = () => {
        if (toMode !== "top") {
          const home = rest(to);
          return { x: home.x, y: home.y };
        }
        const s = surfaceOf(to);
        const span = surfaceSpan(s, R);
        const stand = restAt(to, s);
        const short = Math.min(38, Math.abs(stand - start.x) * 0.3);
        const x = Math.max(span.from + 2, Math.min(span.to - 2, stand - direction * short));
        return { x, y: rideY(s, x, R) };
      };

      let offset = { x: 0, y: 0 };
      let taken: Shape = start;
      let speed = 0;
      const first = landing();
      const time = flightTime(Math.hypot(first.x - start.x, first.y - start.y));

      out.push({
        time,
        thrown: true,
        enter: () => {
          const target = landing();
          taken = last;
          offset = { x: last.x - target.x, y: last.y - target.y };
          const colour = colourOf(to);
          if (colour) dot.style.background = colour;
        },
        at: (k, t) => {
          const target = landing();
          const p = throwArc({ x: target.x + offset.x, y: target.y + offset.y }, target, time)(t);
          speed = p.vy;
          const shed = easeOut(k / 0.3);
          const pull = stretch(p.vx, p.vy);
          return keep({
            x: p.x,
            y: p.y,
            w: mix(taken.w, R * 2, shed),
            h: mix(taken.h, R * 2, shed),
            radius: mix(taken.radius, R, shed),
            alpha: Math.max(taken.alpha, Math.min(1, k * 6)),
            ...pull,
          });
        },
      });

      if (toMode === "top") {
        /* Land, bounce lower each time, and roll the rest of the way to rest. */
        const list = bounces(time * 1300 + 300);
        const whole = list.reduce((sum, b) => sum + b.time, 0) + 0.24;
        let before = 0;
        const along = (elapsed: number) => {
          const s = surfaceOf(to);
          const x = mix(landing().x, restAt(to, s), easeOut(elapsed / whole));
          return { x, ground: rideY(s, x, R) };
        };
        const hops = [...list.map((b) => ({ ...b, air: true })), { speed: 0, time: 0.24, air: false }];
        hops.forEach((hop, i) => {
          const since = before;
          /* How hard it came down on to this hop: the throw for the first, the bounce before for the rest. */
          const down = i === 0 ? () => speed : () => list[i - 1].speed;
          out.push({
            time: hop.time,
            enter: i === 0 ? () => arrive(to) : undefined,
            at: (_k, t) => {
              const { x, ground } = along(since + t);
              const flat = impact(down()) * Math.max(0, 1 - t / 0.11);
              const up = hop.air ? bounceHeight(hop.speed, t) : 0;
              return keep(ball(x, ground - up + flat * R, { sx: 1 + flat * 0.8, sy: 1 - flat }));
            },
          });
          before += hop.time;
        });
      } else if (toMode === "into") {
        /* Become the element: its shape and colour, a little too large and back, then let it show through. */
        out.push({
          time: 0.3,
          enter: () => {
            arrive(to);
            const fill = getComputedStyle(to).backgroundColor;
            if (fill && fill !== "rgba(0, 0, 0, 0)") dot.style.background = fill;
          },
          at: (k) => {
            const home = rest(to);
            const e = overshoot(k);
            return keep({ ...home, w: mix(R * 2, home.w, e), h: mix(R * 2, home.h, e), radius: mix(R, home.radius, Math.min(1, e)), alpha: 1 });
          },
        });
        out.push({ time: 0.22, at: (k) => keep({ ...rest(to), alpha: 1 - easeOut(k) }) });
      } else {
        /* Fill the slot, or settle beside the line. */
        out.push({
          time: 0.34,
          enter: () => arrive(to),
          at: (k) => {
            const home = rest(to);
            const e = overshoot(k);
            return keep({ ...home, w: mix(R * 2, home.w, e), h: mix(R * 2, home.h, e), radius: mix(R, home.radius, e) });
          },
        });
      }
      return out;
    };

    /* ── Drawing ────────────────────────────────────────────── */

    let drawn = { w: 0, h: 0, radius: 0, alpha: -1 };
    const draw = (s: Shape) => {
      if (Math.abs(s.w - drawn.w) > 0.2 || Math.abs(s.h - drawn.h) > 0.2) {
        dot.style.width = `${s.w.toFixed(1)}px`;
        dot.style.height = `${s.h.toFixed(1)}px`;
      }
      if (Math.abs(s.radius - drawn.radius) > 0.2) dot.style.borderRadius = `${s.radius.toFixed(1)}px`;
      if (s.alpha !== drawn.alpha) dot.style.opacity = s.alpha.toFixed(2);
      drawn = { w: s.w, h: s.h, radius: s.radius, alpha: s.alpha };
      dot.style.transform = `translate3d(${(s.x - s.w / 2).toFixed(1)}px, ${(s.y - s.h / 2).toFixed(1)}px, 0) rotate(${s.angle.toFixed(1)}deg) scale(${s.sx.toFixed(3)}, ${s.sy.toFixed(3)})`;
    };

    /* ── Every frame ────────────────────────────────────────── */

    const tick = (now: number) => {
      const height = window.innerHeight;
      /* Over the last screen of the page the eye's line sinks to the foot of the window, so the dot can reach the last thing on it. */
      const left = root.scrollHeight - height - window.scrollY;
      const focus = height * (FOCUS + (1 - FOCUS) * Math.max(0, Math.min(1, 1 - left / height)));

      const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-dot], [data-dot-em] em, .s-root h2.s-display em"));
      const targets: HTMLElement[] = [];
      const candidates: Candidate[] = anchors.map((anchor, id) => {
        const box = anchor.getBoundingClientRect();
        const pinned = anchor.hasAttribute("data-dot-pin");
        const pull = parseFloat(anchor.dataset.dotPull ?? "") || 0;
        if (anchor.dataset.dot === "steps") {
          const list = Array.from(anchor.querySelectorAll<HTMLElement>("[data-dot-step]"));
          const step = pickStep(
            list.map((el) => {
              const b = el.getBoundingClientRect();
              return { top: b.top, across: box.width ? (b.left + b.width / 2 - box.left) / box.width : 0.5 };
            }),
            focus,
            height
          );
          targets.push(step ? list[step.index] : anchor);
          return { id, y: step ? step.y : 0, visible: Boolean(step), pinned, pull };
        }
        targets.push(anchor);
        /* What must be on screen is where the dot would be: an element's top edge, or the middle of one it fills. */
        const mode = modeOf(anchor);
        const y = mode === "slot" || mode === "into" ? box.top + box.height / 2 : box.top;
        return { id, y, visible: box.width > 0 && y > 8 && y < height, pinned, pull };
      });
      const picked = pickAnchor(candidates, focus, on ? targets.indexOf(on) : null);
      const next = picked === null ? on : targets[picked];

      if (next && next !== on) {
        if (shape) {
          const settled = steps.length === 0;
          const previous = on;
          if (!settled) leave(on);
          steps = plan(previous, next, shape, settled);
          if (settled && previous) {
            /* It is still on what it is leaving until the throw: let go of it then. */
            const throwStep = steps.find((step) => step.thrown);
            const enter = throwStep?.enter;
            if (throwStep) throwStep.enter = () => (leave(previous), enter?.());
          }
        } else {
          /* The first anchor is simply where the dot is: no arrival to play. */
          const colour = colourOf(next);
          if (colour) dot.style.background = colour;
          next.setAttribute("data-dot-on", "");
          steps = [];
        }
        on = next;
        stepStart = now;
        steps[0]?.enter?.();
      }

      if (on) {
        while (steps.length && now - stepStart >= steps[0].time * 1000) {
          stepStart += steps[0].time * 1000;
          steps.shift();
          steps[0]?.enter?.();
        }
        if (steps.length) {
          const t = Math.max(0, (now - stepStart) / 1000);
          shape = steps[0].at(Math.min(1, t / steps[0].time), t);
          quietSince = now;
        } else {
          shape = rest(on);
        }
        draw(shape);
      }

      /* Keep running while anything moves, and a little after, then rest until the next scroll. */
      frame = now - quietSince < 320 ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      quietSince = performance.now();
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const resized = () => {
      surfaces = new WeakMap();
      wake();
    };

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", resized);
    const sizes = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resized);
    sizes?.observe(document.body);
    wake();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hitTimer);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", resized);
      sizes?.disconnect();
      leave(on);
      root.classList.remove("dot-live");
    };
  }, [motion]);

  if (!motion) return null;
  return <span ref={ref} aria-hidden="true" data-dot-trail className="dot-trail" />;
}
