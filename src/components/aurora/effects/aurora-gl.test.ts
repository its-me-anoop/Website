import { describe, expect, it } from "vitest";
import { canvasSize, easePointer, FRAGMENT_SHADER, VERTEX_SHADER } from "./aurora-gl";

describe("canvasSize", () => {
  it("renders below device resolution to keep the shader cheap", () => {
    expect(canvasSize(1000, 600, 2, { scale: 0.5, maxPixels: 10_000_000 })).toEqual({ width: 1000, height: 600 });
  });

  it("caps the pixel budget on very large screens, keeping the aspect ratio", () => {
    const { width, height } = canvasSize(3840, 2160, 2, { scale: 1, maxPixels: 1_000_000 });
    expect(width * height).toBeLessThanOrEqual(1_000_000);
    expect(width / height).toBeCloseTo(3840 / 2160, 1);
  });

  it("never returns a zero-sized buffer", () => {
    expect(canvasSize(0, 0, 1)).toEqual({ width: 1, height: 1 });
  });
});

describe("easePointer", () => {
  it("moves a fraction of the way towards the target each frame", () => {
    expect(easePointer({ x: 0, y: 0 }, { x: 1, y: 1 }, 0.25)).toEqual({ x: 0.25, y: 0.25 });
  });
});

describe("shaders", () => {
  it("declare the uniforms the renderer binds", () => {
    expect(VERTEX_SHADER).toContain("attribute vec2 a_position");
    ["u_time", "u_resolution", "u_pointer"].forEach((u) => expect(FRAGMENT_SHADER).toMatch(new RegExp(`uniform \\w+ ${u};`)));
  });
});
