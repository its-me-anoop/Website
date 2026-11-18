import { describe, expect, it } from "vitest";
import { LETTERS, activePiece, heroState, scrollQ } from "./hero-scroll";

describe("scrollQ", () => {
  it("starts as found and ends with everything in place a little before the scene is over", () => {
    expect(scrollQ(0, 1000, 12)).toBe(0);
    expect(scrollQ(1000, 1000, 12)).toBe(12 + LETTERS);
    expect(scrollQ(950, 1000, 12)).toBe(12 + LETTERS);
    expect(scrollQ(-40, 1000, 12)).toBe(0);
  });

  it("moves one sticker at a time, in step with the scroll", () => {
    const half = scrollQ(460, 1000, 12);
    expect(half).toBeGreaterThan(6);
    expect(half).toBeLessThan(7.5);
    expect(scrollQ(300, 1000, 8)).toBeLessThan(scrollQ(600, 1000, 8));
  });

  it("is finished when there is no distance to scroll", () => {
    expect(scrollQ(0, 0, 12)).toBe(12 + LETTERS);
  });
});

describe("activePiece", () => {
  it("is the sticker the dot is fixing, and nothing before the first or after the last", () => {
    expect(activePiece(0, 12)).toBeNull();
    expect(activePiece(0.2, 12)).toBe(0);
    expect(activePiece(5.9, 12)).toBe(5);
    expect(activePiece(11.99, 12)).toBe(11);
    expect(activePiece(12, 12)).toBeNull();
  });
});

describe("heroState", () => {
  it("names the wall as found, being sorted and sorted", () => {
    expect(heroState(0, 12)).toBe("mess");
    expect(heroState(4, 12)).toBe("sorting");
    expect(heroState(12.4, 12)).toBe("sorting");
    expect(heroState(12 + LETTERS, 12)).toBe("sorted");
  });
});
