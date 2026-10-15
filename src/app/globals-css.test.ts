import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(path.join(__dirname, "globals.css"), "utf8");

describe("decorative wireframe labels", () => {
  it("give the heading spec label an empty alternative so it stays out of accessible names", () => {
    const rule = css.match(/\.fx-wt\[data-wf\]::before\s*\{([^}]*)\}/);
    expect(rule).not.toBeNull();
    const contents = [...rule![1].matchAll(/content:\s*([^;]+);/g)].map((m) => m[1].trim());
    /* The last declaration wins where alt text is supported. */
    expect(contents.at(-1)).toBe('attr(data-wf) / ""');
  });
});
