import { describe, expect, it } from "vitest";
import { approach, cursorReadout, frameDue, magneticTarget, padCoord, shaderSize } from "./fx-math";

describe("fx maths", () => {
  it("pads coordinates to four digits and clamps negatives", () => {
    expect(padCoord(7)).toBe("0007");
    expect(padCoord(1234.6)).toBe("1235");
    expect(padCoord(-40)).toBe("0000");
    expect(padCoord(123456)).toBe("3456");
  });

  it("reads out page coordinates, or the hovered label", () => {
    expect(cursorReadout(12, 30, 1000, "")).toBe("X 0012   Y 1030");
    expect(cursorReadout(12, 30, 1000, "Book a call")).toBe("Book a call  ↗");
  });

  it("pulls magnetic buttons towards the pointer only when close and active", () => {
    const near = magneticTarget(20, 10, 160, 56, true);
    expect(near.x).toBeGreaterThan(0);
    expect(near.y).toBeGreaterThan(0);
    expect(magneticTarget(20, 10, 160, 56, false)).toEqual({ x: 0, y: 0 });
    const far = magneticTarget(500, 0, 160, 56, true);
    expect(far.x).toBe(0);
    expect(far.y).toBe(0);
  });

  it("eases towards a target", () => {
    expect(approach(0, 100, 0.2)).toBe(20);
    expect(approach(50, 50, 0.2)).toBe(50);
  });

  it("renders the shader at half resolution with a cap and a floor", () => {
    expect(shaderSize(1440, 900)).toEqual({ width: 720, height: 450 });
    expect(shaderSize(2560, 1280)).toEqual({ width: 760, height: 380 });
    expect(shaderSize(0, 0)).toEqual({ width: 2, height: 2 });
  });

  it("gates frames to about thirty a second", () => {
    expect(frameDue(100, 80)).toBe(false);
    expect(frameDue(120, 80)).toBe(true);
  });
});
