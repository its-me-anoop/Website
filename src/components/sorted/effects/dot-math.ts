/*
 * The arithmetic behind the travelling dot (see DotTrail.tsx), kept
 * free of the DOM so it can be tested: where the dot stands on an
 * anchor, which anchor it should be on, and the spring that carries it.
 */

export type Box = { left: number; top: number; width: number; height: number };
export type Point = { x: number; y: number; r: number };

/** How the dot stands on an anchor. */
export type DotMode = "top" | "slot" | "start";

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
    case "slot": {
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
    const distance = Math.abs(c.y - focusY) - (c.id === current ? STICK : 0);
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
