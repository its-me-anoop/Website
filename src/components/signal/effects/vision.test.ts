import { describe, expect, it } from "vitest";
import { conditions, conditionById, lensPosition } from "./vision";

describe("conditions", () => {
  it("offer the unfiltered view first, then each simulated condition once", () => {
    expect(conditions[0].id).toBe("none");
    const ids = conditions.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(["blur", "cataract", "sunlight", "mono"]));
  });

  it("describe every simulated condition in plain words", () => {
    conditions.slice(1).forEach((c) => expect(c.description.length).toBeGreaterThan(20));
  });

  it("fall back to the unfiltered view for an unknown id", () => {
    expect(conditionById("nope").id).toBe("none");
  });
});

describe("lensPosition", () => {
  const box = { width: 1000, height: 600 };

  it("centres the lens on the pointer", () => {
    expect(lensPosition({ x: 500, y: 300 }, box, 200)).toEqual({ x: 400, y: 200 });
  });

  it("lets the lens overhang the edges by at most half its size", () => {
    expect(lensPosition({ x: -80, y: -80 }, box, 200)).toEqual({ x: -100, y: -100 });
    expect(lensPosition({ x: 5000, y: 5000 }, box, 200)).toEqual({ x: 900, y: 500 });
  });
});
