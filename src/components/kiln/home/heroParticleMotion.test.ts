import { describe, expect, it } from "vitest";
import {
  assemblyProgress,
  butterflyBlend,
  butterflyFlight,
  clamp01,
  edgeDestination,
  journeyOpacity,
  offscreenStart,
  pointerRepulsion,
  refugeProgress,
  scrollDispersal,
  smoothstep,
} from "./heroParticleMotion";

describe("hero particle motion", () => {
  it("starts particles outside every viewport edge", () => {
    expect(offscreenStart(0, 0.25, 1200, 800)).toEqual({ x: -96, y: 200 });
    expect(offscreenStart(1, 0.25, 1200, 800)).toEqual({ x: 1296, y: 200 });
    expect(offscreenStart(2, 0.25, 1200, 800)).toEqual({ x: 300, y: -96 });
    expect(offscreenStart(3, 0.25, 1200, 800)).toEqual({ x: 300, y: 896 });
  });

  it("holds for each particle's delay and eases into the completed shape", () => {
    expect(assemblyProgress(0, 200)).toBe(0);
    expect(assemblyProgress(600, 200)).toBe(0);
    const progress = [1800, 3000, 4200, 5400].map((elapsed) => assemblyProgress(elapsed, 200));
    expect(progress[0]).toBeGreaterThan(0);
    expect(progress[0]).toBeLessThan(progress[1]);
    expect(progress[1]).toBeLessThan(progress[2]);
    expect(progress[2]).toBeLessThan(1);
    expect(progress[3]).toBe(1);
    expect(progress[1] - progress[0]).toBeGreaterThan(progress[2] - progress[1]);
    expect(assemblyProgress(5400, 600)).toBeLessThan(1);
    expect(assemblyProgress(10000, 200)).toBe(1);
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(2)).toBe(1);
    expect(smoothstep(-1)).toBe(0);
    expect(smoothstep(0.5)).toBe(0.5);
    expect(smoothstep(2)).toBe(1);
  });

  it("keeps destinations within mirrored mobile and desktop gutters", () => {
    for (const [width, maximumMargin] of [[390, 14], [1200, 21]]) {
      for (const side of [0, 1, 2, 3]) {
        const inner = edgeDestination(side, 1, 1, width, 800);
        const outer = edgeDestination(side, 0, 0, width, 800);
        const right = side % 2 === 1;
        expect(inner.x).toBe(right ? width - maximumMargin : maximumMargin);
        expect(outer.x).toBe(right ? width - 6 : 6);
        expect(outer.y).toBeCloseTo(96);
        expect(inner.y).toBeCloseTo(768);
      }
    }
  });

  it("maps scroll in both directions without retained progress", () => {
    const down = [0, 32, 332, 632, 900].map((offset) => scrollDispersal(offset, 800));
    const up = [900, 632, 332, 32, 0].map((offset) => scrollDispersal(offset, 800));
    expect(down).toEqual([0, 0, 0.5, 1, 1]);
    expect(up).toEqual([...down].reverse());
    expect(scrollDispersal(33, 0)).toBe(1);
  });

  it("changes into butterflies only across the actual hero boundary, then fades", () => {
    expect(butterflyBlend(250, 300)).toBe(0);
    expect(butterflyBlend(300, 300)).toBe(0);
    expect(butterflyBlend(330, 300)).toBe(0.5);
    expect(butterflyBlend(360, 300)).toBe(1);
    expect(butterflyBlend(250, 200)).toBeGreaterThan(0.9);
    expect(journeyOpacity(800, 800)).toBe(1);
    expect(journeyOpacity(-520, 800)).toBe(1);
    expect(journeyOpacity(-760, 800)).toBe(0.5);
    expect(journeyOpacity(-1000, 800)).toBe(0);
    expect(journeyOpacity(-2000, 800)).toBe(0);
    expect(journeyOpacity(0, 0)).toBe(1);
  });

  it("settles around the viewport middle and releases at either boundary", () => {
    expect(refugeProgress(784, 800)).toBe(0);
    expect(refugeProgress(656, 800)).toBeCloseTo(0.5);
    expect(refugeProgress(400, 800)).toBe(1);
    expect(refugeProgress(128, 800)).toBeCloseTo(0.5);
    expect(refugeProgress(32, 800)).toBe(0);
    expect(refugeProgress(-100, 800)).toBe(0);
    expect(refugeProgress(900, 800)).toBe(0);
    const centers = [900, 784, 656, 400, 128, 32, -100];
    const down = centers.map((center) => refugeProgress(center, 800));
    const up = [...centers].reverse().map((center) => refugeProgress(center, 800));
    expect(up).toEqual([...down].reverse());
    expect(Number.isFinite(refugeProgress(0, 0))).toBe(true);
  });

  it("repels outward with quadratic falloff and stops at its radius", () => {
    expect(pointerRepulsion(30, 40, 100, 80)).toEqual({ x: 12, y: 16 });
    expect(pointerRepulsion(-30, -40, 100, 80)).toEqual({ x: -12, y: -16 });
    expect(pointerRepulsion(60, 80, 100, 80)).toEqual({ x: 0, y: 0 });
    expect(pointerRepulsion(120, 160, 100, 80)).toEqual({ x: 0, y: 0 });
    expect(pointerRepulsion(0, 0, 100, 80)).toEqual({ x: 80, y: 0 });
    expect(pointerRepulsion(0, 0, 0, 80)).toEqual({ x: 0, y: 0 });
    const nearCenter = pointerRepulsion(1e-12, -1e-12, 100, 80);
    expect(Number.isFinite(nearCenter.x)).toBe(true);
    expect(Number.isFinite(nearCenter.y)).toBe(true);
    expect(nearCenter.x).toBeGreaterThan(0);
    expect(nearCenter.y).toBeLessThan(0);
  });

  it("launches a visible butterfly flight and returns exactly to rest", () => {
    for (const age of [-100, 0, 2800, 10000]) {
      expect(butterflyFlight(age, 0.7, 100, -30)).toEqual({ x: 0, y: 0, energy: 0 });
    }
    const flight = butterflyFlight(1400, 0.7, 100, -30);
    expect(flight.x).toBeGreaterThan(70);
    expect(flight.y).toBeLessThan(-60);
    expect(flight.energy).toBe(1);
    const landing = butterflyFlight(2799, 0.7, 100, -30);
    expect(Math.hypot(landing.x, landing.y)).toBeLessThan(1);
    expect(landing.energy).toBeLessThan(0.01);
  });

  it("keeps the flutter path finite across phases and follows its launch direction", () => {
    for (const phase of [0, Math.PI / 2, Math.PI, Math.PI * 2]) {
      for (const age of [1, 700, 1400, 2100, 2799]) {
        const flight = butterflyFlight(age, phase, -100, 0);
        expect(Number.isFinite(flight.x)).toBe(true);
        expect(Number.isFinite(flight.y)).toBe(true);
        expect(flight.x).toBeLessThan(0);
        expect(flight.energy).toBeGreaterThan(0);
        expect(flight.energy).toBeLessThanOrEqual(1);
      }
    }
    expect(butterflyFlight(700, 0, 0, 0)).not.toEqual(butterflyFlight(700, Math.PI, 0, 0));
  });
});
