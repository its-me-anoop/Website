import { describe, expect, it } from "vitest";
import {
  GRAVITY,
  anchorPoint,
  bounceHeight,
  bounces,
  flightTime,
  impact,
  overshoot,
  pickAnchor,
  pickStep,
  restX,
  rideY,
  springStep,
  stretch,
  surfaceFlat,
  surfaceSpan,
  throwArc,
  type Candidate,
  type Surface,
} from "./dot-math";

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

  it("goes into an element at its middle, as large as a circle inside it can be", () => {
    expect(anchorPoint("into", { left: 0, top: 0, width: 160, height: 56 }, 7)).toEqual({ x: 80, y: 28, r: 28 });
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

  it("is drawn to what matters from further off", () => {
    expect(pickAnchor(list([440, 700]), 450, null)).toBe(0);
    expect(pickAnchor(list([440, 700], [{}, { pull: 300 }]), 450, null)).toBe(1);
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

describe("a surface with rounded corners", () => {
  const card: Surface = { left: 100, top: 200, width: 300, height: 180, rl: 24, rr: 24 };
  const pill: Surface = { left: 0, top: 100, width: 200, height: 56, rl: 999, rr: 999, bl: 999, br: 999 };
  const arch: Surface = { left: 0, top: 0, width: 200, height: 400, rl: 100, rr: 100 };

  it("carries the ball level along its flat top", () => {
    expect(rideY(card, 250, 7)).toBe(193);
    expect(rideY(card, 124, 7)).toBe(193);
  });

  it("lets the ball down round a corner, further the further round it is", () => {
    const a = rideY(card, 118, 7);
    const b = rideY(card, 108, 7);
    expect(a).toBeGreaterThan(193);
    expect(b).toBeGreaterThan(a);
    /* On the curve the ball's centre is always its own radius plus the corner's from the corner's centre. */
    expect(Math.hypot(124 - 108, 224 - b)).toBeCloseTo(24 + 7, 5);
  });

  it("is the same on both sides", () => {
    expect(rideY(card, 100 + 300 - 8, 7)).toBeCloseTo(rideY(card, 108, 7), 5);
  });

  it("never draws a corner rounder than the box allows: a pill's ends are half its height", () => {
    expect(surfaceFlat(pill)).toEqual({ from: 28, to: 172 });
    expect(rideY(pill, 100, 7)).toBe(93);
  });

  it("gives a full arch one level place, its crown, and a curve the ball follows either side", () => {
    expect(surfaceFlat(arch)).toEqual({ from: 100, to: 100 });
    expect(rideY(arch, 100, 7)).toBe(-7);
    expect(rideY(arch, 60, 7)).toBeGreaterThan(-7);
    expect(restX(arch, 20)).toBe(100);
  });

  it("stops the ball before it would fall off: it cannot be taken past the shoulder", () => {
    const span = surfaceSpan(card, 7);
    expect(span.from).toBeLessThan(card.left + 24);
    expect(span.from).toBeGreaterThan(card.left - 7);
    expect(rideY(card, -500, 7)).toBe(rideY(card, span.from, 7));
  });

  it("rests the ball where it was asked to stand, kept off the corners", () => {
    expect(restX(card, 250)).toBe(250);
    expect(restX(card, 102)).toBe(124);
    expect(restX(card, 399)).toBe(376);
  });
});

describe("a throw", () => {
  it("lands exactly where it was aimed, when it was meant to", () => {
    const at = throwArc({ x: 100, y: 500 }, { x: 420, y: 380 }, 0.5);
    expect(at(0)).toMatchObject({ x: 100, y: 500 });
    expect(at(0.5).x).toBeCloseTo(420, 5);
    expect(at(0.5).y).toBeCloseTo(380, 5);
  });

  it("rises before it falls, and is coming down when it lands", () => {
    const at = throwArc({ x: 0, y: 400 }, { x: 300, y: 400 }, 0.5);
    expect(at(0.25).y).toBeLessThan(400);
    expect(at(0).vy).toBeLessThan(0);
    expect(at(0.5).vy).toBeCloseTo(-at(0).vy, 5);
    expect(at(0.5).vy).toBeCloseTo((GRAVITY * 0.5) / 2, 5);
  });

  it("takes longer the further it goes, within limits", () => {
    expect(flightTime(0)).toBe(0.3);
    expect(flightTime(400)).toBeGreaterThan(flightTime(100));
    expect(flightTime(5000)).toBe(0.72);
  });
});

describe("bouncing and settling", () => {
  it("bounces lower and shorter each time, then stops", () => {
    const list = bounces(900);
    expect(list.length).toBeGreaterThanOrEqual(2);
    expect(list.length).toBeLessThanOrEqual(3);
    list.forEach((b, i) => {
      if (i) {
        expect(b.speed).toBeLessThan(list[i - 1].speed);
        expect(b.time).toBeLessThan(list[i - 1].time);
      }
    });
    expect(list[0].speed).toBeLessThan(900);
  });

  it("does not bounce at all after a gentle landing", () => {
    expect(bounces(200)).toEqual([]);
  });

  it("leaves the ground and comes back to it in exactly the time of the bounce", () => {
    const [first] = bounces(900);
    expect(bounceHeight(first.speed, 0)).toBe(0);
    expect(bounceHeight(first.speed, first.time / 2)).toBeGreaterThan(8);
    expect(bounceHeight(first.speed, first.time)).toBeCloseTo(0, 5);
  });

  it("squashes harder the faster it lands, never more than a third", () => {
    expect(impact(0)).toBe(0);
    expect(impact(600)).toBeLessThan(impact(900));
    expect(impact(99999)).toBe(0.34);
  });
});

describe("overshoot", () => {
  it("starts at nothing, goes past the mark and comes back to it", () => {
    expect(overshoot(0)).toBeCloseTo(0, 5);
    expect(overshoot(1)).toBe(1);
    expect(Math.max(...[0.5, 0.6, 0.7, 0.8, 0.9].map(overshoot))).toBeGreaterThan(1);
  });
});
