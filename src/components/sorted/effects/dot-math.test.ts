import { describe, expect, it } from "vitest";
import { anchorPoint, pickAnchor, pickStep, springStep, stretch, type Candidate } from "./dot-math";

const rect = { left: 100, top: 200, width: 300, height: 80 };

describe("anchorPoint", () => {
  it("perches on top of an element, at its middle unless told where", () => {
    expect(anchorPoint("top", rect, 7)).toEqual({ x: 250, y: 193, r: 7 });
    expect(anchorPoint("top", rect, 7, "0.25")).toEqual({ x: 175, y: 193, r: 7 });
    expect(anchorPoint("top", rect, 7, "12px")).toEqual({ x: 112, y: 193, r: 7 });
  });

  it("measures a distance from the right edge when it is negative", () => {
    expect(anchorPoint("top", rect, 7, "-20px").x).toBe(380);
  });

  it("fills a slot: its centre, at the slot's own size", () => {
    expect(anchorPoint("slot", { left: 10, top: 10, width: 40, height: 40 }, 7)).toEqual({ x: 30, y: 30, r: 20 });
  });

  it("stands at the start of a line, level with its middle", () => {
    expect(anchorPoint("start", rect, 7)).toEqual({ x: 87, y: 240, r: 7 });
  });
});

describe("pickAnchor", () => {
  const list = (ys: number[], extra: Partial<Candidate>[] = []): Candidate[] =>
    ys.map((y, id) => ({ id, y, visible: true, pinned: false, ...extra[id] }));

  it("takes the anchor nearest the line the eye rests on", () => {
    expect(pickAnchor(list([100, 430, 900]), 450, null)).toBe(1);
  });

  it("ignores anchors that are off screen", () => {
    expect(pickAnchor(list([100, 430], [{}, { visible: false }]), 450, null)).toBe(0);
  });

  it("stays where it is until another anchor is clearly nearer", () => {
    expect(pickAnchor(list([420, 470]), 450, 0)).toBe(0);
    expect(pickAnchor(list([330, 470]), 450, 0)).toBe(1);
  });

  it("goes to a pinned anchor whatever else is nearer", () => {
    expect(pickAnchor(list([450, 800], [{}, { pinned: true }]), 450, 0)).toBe(1);
  });

  it("has nowhere to go when nothing is on screen", () => {
    expect(pickAnchor(list([100], [{ visible: false }]), 450, 0)).toBeNull();
  });
});

describe("pickStep", () => {
  const row = (top: number) => [0.125, 0.375, 0.625, 0.875].map((across) => ({ top, across }));

  it("walks a row from left to right as the row rises past the eye's line", () => {
    expect(pickStep(row(560), 450, 900)?.index).toBe(0);
    expect(pickStep(row(470), 450, 900)?.index).toBe(1);
    expect(pickStep(row(420), 450, 900)?.index).toBe(2);
    expect(pickStep(row(330), 450, 900)?.index).toBe(3);
  });

  it("reads a grid like a page: the row at eye level, not the one above or below", () => {
    const grid = [...row(-200), ...row(430), ...row(1060)];
    expect(pickStep(grid, 450, 900)?.index).toBeGreaterThanOrEqual(4);
    expect(pickStep(grid, 450, 900)?.index).toBeLessThan(8);
  });

  it("passes over steps whose top is off screen, and has none when all are", () => {
    expect(pickStep([{ top: -40, across: 0.5 }, { top: 700, across: 0.5 }], 450, 900)?.index).toBe(1);
    expect(pickStep(row(-300), 450, 900)).toBeNull();
  });
});

describe("springStep", () => {
  it("settles on its target without flying off", () => {
    let s = { x: 300, v: 0 };
    for (let i = 0; i < 240; i++) s = springStep(s, 0, 1 / 60);
    expect(Math.abs(s.x)).toBeLessThan(0.5);
    expect(Math.abs(s.v)).toBeLessThan(1);
  });

  it("survives a long frame", () => {
    const s = springStep({ x: 300, v: 0 }, 0, 2);
    expect(Number.isFinite(s.x)).toBe(true);
    expect(Math.abs(s.x)).toBeLessThanOrEqual(300);
  });
});

describe("stretch", () => {
  it("is round at rest and longer than wide at speed, never past a limit", () => {
    expect(stretch(0, 0)).toEqual({ sx: 1, sy: 1, angle: 0 });
    const fast = stretch(0, 1800);
    expect(fast.sx).toBeGreaterThan(1);
    expect(fast.sx).toBeLessThanOrEqual(1.5);
    expect(fast.sx * fast.sy).toBeCloseTo(1, 5);
    expect(fast.angle).toBeCloseTo(90, 5);
  });
});
