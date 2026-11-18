/*
 * The arithmetic behind the travelling dot (see DotTrail.tsx), kept
 * free of the DOM so it can be tested: where the dot stands on an
 * anchor, which anchor it should be on, and the spring that carries it.
 */

export type Box = { left: number; top: number; width: number; height: number };
export type Point = { x: number; y: number; r: number };

/** How the dot stands on an anchor. */
export type DotMode = "top" | "slot" | "start" | "into";

/**
 * Where along an element's width: a share of it ("0.25"), or a distance
 * in pixels from its left edge ("12px"), or from its right ("-20px").
 */
function along(box: Box, at: string | undefined): number {
  if (!at) return box.left + box.width / 2;
  if (at.endsWith("px")) {
    const px = parseFloat(at);
    return at.trim().startsWith("-") ? box.left + box.width + px : box.left + px;
  }
  return box.left + box.width * parseFloat(at);
}

/**
 * The dot's centre and radius on an anchor.
 * `top` perches on the element; `slot` fills a placeholder the size of
 * the dot it replaces; `start` stands just before a line of text.
 */
export function anchorPoint(mode: DotMode, box: Box, r: number, at?: string): Point {
  switch (mode) {
    case "slot":
    case "into": {
      const size = Math.min(box.width, box.height) / 2;
      return { x: box.left + box.width / 2, y: box.top + box.height / 2, r: size };
    }
    case "start":
      return { x: box.left - r - 6, y: box.top + box.height / 2, r };
    default:
      return { x: along(box, at), y: box.top - r, r };
  }
}

export type Candidate = {
  id: number;
  /** The anchor's vertical centre in the window. */
  y: number;
  visible: boolean;
  /** A scene is holding the dot here (the hero's sticker being fixed). */
  pinned: boolean;
  /** How much nearer than it is this anchor counts as being: what matters draws the dot from further off. */
  pull?: number;
};

/** How much nearer another anchor must be before the dot leaves the one it is on. */
const STICK = 56;

/** The anchor the dot should be on: a pinned one, else the one nearest `focusY`, with a preference for staying put. */
export function pickAnchor(candidates: readonly Candidate[], focusY: number, current: number | null): number | null {
  let best: Candidate | null = null;
  let bestDistance = Infinity;
  for (const c of candidates) {
    if (!c.visible) continue;
    if (c.pinned) return c.id;
    const distance = Math.abs(c.y - focusY) - (c.id === current ? STICK : 0) - (c.pull ?? 0);
    if (distance < bestDistance) {
      best = c;
      bestDistance = distance;
    }
  }
  return best ? best.id : null;
}

export type Step = {
  /** The step's top edge in the window: where the dot would stand. */
  top: number;
  /** Its horizontal centre, as a share of the row it is in (0 left, 1 right). */
  across: number;
};

/** How far, in pixels of scroll, the dot takes to walk a row of steps from its left end to its right. */
const WALK = 240;

/**
 * Which step of a row or grid the dot is on: the one whose top is
 * nearest the eye's line, with steps further right counted as a little
 * lower, so a row is walked from left to right as it rises past the
 * line and a grid is read like a page. Steps whose top is off screen
 * are passed over. Returns the step and how far from the line it
 * counts as being, or null when none can be stood on.
 */
export function pickStep(steps: readonly Step[], focusY: number, height: number): { index: number; y: number } | null {
  let best: { index: number; y: number } | null = null;
  steps.forEach((step, index) => {
    if (step.top < 8 || step.top > height) return;
    const y = step.top + (step.across - 0.5) * WALK;
    if (!best || Math.abs(y - focusY) < Math.abs(best.y - focusY)) best = { index, y };
  });
  return best;
}

export type Spring = { x: number; v: number };

const STIFFNESS = 210;
const DAMPING = 21;

/** One step of a damped spring towards `target`, in sub-steps so a long frame cannot overshoot into nonsense. */
export function springStep(state: Spring, target: number, dt: number): Spring {
  let { x, v } = state;
  let left = Math.min(dt, 0.25);
  while (left > 0) {
    const h = Math.min(left, 1 / 120);
    v += (-STIFFNESS * (x - target) - DAMPING * v) * h;
    x += v * h;
    left -= h;
  }
  return { x, v };
}

/** The dot's shape at a velocity: longer along its path, thinner across it, the same area. */
export function stretch(vx: number, vy: number): { sx: number; sy: number; angle: number } {
  const speed = Math.hypot(vx, vy);
  if (speed < 1) return { sx: 1, sy: 1, angle: 0 };
  const sx = Math.min(1.5, 1 + speed / 2600);
  return { sx, sy: 1 / sx, angle: (Math.atan2(vy, vx) * 180) / Math.PI };
}

/* ─────────────────────────────────────────────────────────────
   The dot as a ball. It stands on the top outline of an element,
   rounded corners and all; it leaves in a thrown arc under gravity,
   lands, bounces lower each time and rolls to rest.
   ───────────────────────────────────────────────────────────── */

/** The top of an element as a surface: its box and its corner radii (top left and right; bottom, where it has them). */
export type Surface = Box & { rl: number; rr: number; bl?: number; br?: number };

/** Pixels per second squared. Chosen by eye: a hop of a hand's width takes about a third of a second. */
export const GRAVITY = 2600;

/** How far round a corner the ball can be before it would simply fall: the share of a right angle. */
const HOLD = 0.62;

/**
 * The top radii as they are drawn. A browser scales all four corners
 * down together until neighbours fit along every side, so a pill's ends
 * are half its height and a full arch's are half its width.
 */
function radii(s: Surface): { rl: number; rr: number } {
  const bl = s.bl ?? 0;
  const br = s.br ?? 0;
  const fit = (side: number, a: number, b: number) => (a + b > 0 ? side / (a + b) : 1);
  const f = Math.min(1, fit(s.width, s.rl, s.rr), fit(s.width, bl, br), fit(s.height, s.rl, bl), fit(s.height, s.rr, br));
  return { rl: s.rl * f, rr: s.rr * f };
}

/** The furthest left and right a ball of radius `r` can be while still on top of the surface. */
export function surfaceSpan(s: Surface, r: number): { from: number; to: number } {
  const { rl, rr } = radii(s);
  const reach = Math.sin((HOLD * Math.PI) / 2);
  return { from: s.left + rl - (rl + r) * reach, to: s.left + s.width - rr + (rr + r) * reach };
}

/** The part of the surface that is level, where a ball can come to rest. A full arch has only its crown. */
export function surfaceFlat(s: Surface): { from: number; to: number } {
  const { rl, rr } = radii(s);
  const from = s.left + rl;
  const to = s.left + s.width - rr;
  return from <= to ? { from, to } : { from: (from + to) / 2, to: (from + to) / 2 };
}

/**
 * The height of the centre of a ball of radius `r` standing on the
 * surface at `x`. Over a rounded corner the centre follows a circle
 * round the corner's own centre, so the ball rolls over the curve
 * rather than cutting across it.
 */
export function rideY(s: Surface, x: number, r: number): number {
  const { rl, rr } = radii(s);
  const span = surfaceSpan(s, r);
  const at = Math.max(span.from, Math.min(span.to, x));
  const leftCentre = s.left + rl;
  const rightCentre = s.left + s.width - rr;
  if (at < leftCentre) return s.top + rl - Math.sqrt(Math.max(0, (rl + r) ** 2 - (leftCentre - at) ** 2));
  if (at > rightCentre) return s.top + rr - Math.sqrt(Math.max(0, (rr + r) ** 2 - (at - rightCentre) ** 2));
  return s.top - r;
}

/** Where on the surface the ball rests: where it was asked to stand, kept to the level part. */
export function restX(s: Surface, wanted: number): number {
  const flat = surfaceFlat(s);
  return Math.max(flat.from, Math.min(flat.to, wanted));
}

/** How long a throw over `distance` pixels lasts: longer for further, within limits. */
export function flightTime(distance: number): number {
  return Math.max(0.3, Math.min(0.72, 0.26 + distance / 1500));
}

/**
 * A thrown arc from one point to another in `time` seconds under
 * gravity. Returns where the ball is at `t` and how fast it is moving.
 */
export function throwArc(from: { x: number; y: number }, to: { x: number; y: number }, time: number) {
  const vx = (to.x - from.x) / time;
  const vy0 = (to.y - from.y - 0.5 * GRAVITY * time * time) / time;
  return (t: number) => ({
    x: from.x + vx * t,
    y: from.y + vy0 * t + 0.5 * GRAVITY * t * t,
    vx,
    vy: vy0 + GRAVITY * t,
  });
}

/** How much of its speed the ball keeps each time it lands. */
const BOUNCE = 0.44;
/** Below this speed a bounce is not worth showing: the ball has settled. */
const SETTLED = 150;

/**
 * The bounces after a landing at `speed` pixels a second: each one's
 * launch speed and how long it is in the air. They get lower and
 * shorter, and there are never more than three.
 */
export function bounces(speed: number): { speed: number; time: number }[] {
  const out: { speed: number; time: number }[] = [];
  let v = Math.min(Math.abs(speed), 1500) * BOUNCE;
  while (v > SETTLED && out.length < 3) {
    out.push({ speed: v, time: (2 * v) / GRAVITY });
    v *= BOUNCE;
  }
  return out;
}

/** How far off the ground the ball is `t` seconds into a bounce launched at `speed`. */
export function bounceHeight(speed: number, t: number): number {
  return Math.max(0, speed * t - 0.5 * GRAVITY * t * t);
}

/** How flat the ball is squashed when it lands at `speed`: none at rest, a third at most. */
export function impact(speed: number): number {
  return Math.min(0.34, Math.abs(speed) / 3200);
}

/** Linear blend. */
export const mix = (a: number, b: number, k: number) => a + (b - a) * k;

/** Quick away, long settle. */
export const easeOut = (k: number) => 1 - (1 - Math.max(0, Math.min(1, k))) ** 3;

/** Slow away, quick finish: something gathering speed. */
export const easeIn = (k: number) => Math.max(0, Math.min(1, k)) ** 2;

/** Past the mark and back: something soft arriving. */
export const overshoot = (k: number) => {
  const c = Math.max(0, Math.min(1, k)) - 1;
  return 1 + 2.2 * c ** 3 + 1.2 * c ** 2;
};
