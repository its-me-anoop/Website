import { describe, expect, it } from "vitest";
import { emberCount, spawnEmber, stepEmber, type Ember } from "./embers";

const bounds = { width: 1000, height: 600 };

/** Deterministic stand-in for Math.random. */
function sequence(...values: number[]) {
  let i = 0;
  return () => values[i++ % values.length];
}

describe("spawnEmber", () => {
  it("starts somewhere along the bottom edge, below the visible area", () => {
    const e = spawnEmber(sequence(0.5), bounds);
    expect(e.x).toBe(500);
    expect(e.y).toBeGreaterThan(bounds.height);
  });

  it("rises (negative vertical speed) with a positive size and life", () => {
    const e = spawnEmber(Math.random, bounds);
    expect(e.vy).toBeLessThan(0);
    expect(e.size).toBeGreaterThan(0);
    expect(e.life).toBeGreaterThan(0);
  });
});

describe("stepEmber", () => {
  const ember: Ember = { x: 100, y: 500, vx: 0, vy: -40, size: 2, life: 4, age: 0, phase: 0, heat: 1 };

  it("moves upwards over time and ages", () => {
    const next = stepEmber(ember, 0.5, bounds);
    expect(next).not.toBeNull();
    expect(next!.y).toBeLessThan(ember.y);
    expect(next!.age).toBeCloseTo(0.5);
  });

  it("dies when its life runs out or it leaves the top", () => {
    expect(stepEmber({ ...ember, age: 3.9 }, 0.2, bounds)).toBeNull();
    expect(stepEmber({ ...ember, y: -20 }, 0.1, bounds)).toBeNull();
  });
});

describe("emberCount", () => {
  it("scales with area and stays within a budget", () => {
    expect(emberCount(390, 844)).toBeLessThan(emberCount(1440, 900));
    expect(emberCount(5000, 3000)).toBeLessThanOrEqual(60);
    expect(emberCount(0, 0)).toBe(0);
  });
});
