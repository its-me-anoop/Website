/**
 * Pure particle maths for the hero embers: sparks that spawn below the
 * fold, drift up on a gentle sine wind, flicker and burn out. Kept free
 * of the DOM so it is testable; `Embers.tsx` only draws.
 */

export type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  /** Seconds the ember burns for. */
  life: number;
  age: number;
  /** Offset for its wind sway and flicker. */
  phase: number;
  /** 0..1, cooler to hotter: picks the colour. */
  heat: number;
};

type Bounds = { width: number; height: number };

export function spawnEmber(rand: () => number, { width, height }: Bounds): Ember {
  return {
    x: rand() * width,
    y: height + 10 + rand() * 40,
    vx: (rand() - 0.5) * 12,
    vy: -(22 + rand() * 48),
    size: 0.8 + rand() * 2.2,
    life: 5 + rand() * 7,
    age: 0,
    phase: rand() * Math.PI * 2,
    heat: rand(),
  };
}

/** Advance one ember by `dt` seconds; null once it has burned out or left. */
export function stepEmber(e: Ember, dt: number, { width }: Bounds): Ember | null {
  const age = e.age + dt;
  if (age >= e.life) return null;
  const sway = Math.sin(age * 1.3 + e.phase) * 14;
  const x = e.x + (e.vx + sway) * dt;
  const y = e.y + e.vy * dt;
  if (y < -10 || x < -40 || x > width + 40) return null;
  return { ...e, x, y, age };
}

/** Opacity over an ember's life: fade in, flicker, fade out. */
export function emberAlpha(e: Ember): number {
  const t = e.age / e.life;
  const envelope = Math.min(1, t * 6) * Math.min(1, (1 - t) * 3);
  const flicker = 0.75 + 0.25 * Math.sin(e.age * 9 + e.phase * 3);
  return Math.max(0, envelope * flicker);
}

/** How many embers a box of this size should hold (capped for cost). */
export function emberCount(width: number, height: number): number {
  return Math.min(60, Math.round((width * height) / 26000));
}
