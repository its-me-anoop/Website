import { describe, expect, it } from "vitest";
import { nextTabIndex } from "./tabs";

describe("nextTabIndex", () => {
  it("moves forward and wraps at the end", () => {
    expect(nextTabIndex("ArrowRight", 0, 5)).toBe(1);
    expect(nextTabIndex("ArrowDown", 4, 5)).toBe(0);
  });

  it("moves back and wraps at the start", () => {
    expect(nextTabIndex("ArrowLeft", 3, 5)).toBe(2);
    expect(nextTabIndex("ArrowUp", 0, 5)).toBe(4);
  });

  it("jumps to either end", () => {
    expect(nextTabIndex("Home", 3, 5)).toBe(0);
    expect(nextTabIndex("End", 1, 5)).toBe(4);
  });

  it("ignores other keys", () => {
    expect(nextTabIndex("Enter", 1, 5)).toBeNull();
    expect(nextTabIndex("a", 1, 5)).toBeNull();
  });
});
