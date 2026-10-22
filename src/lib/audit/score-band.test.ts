import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { gradeFor, scoreBand, statusLabel } from "./score";

describe("scoreBand", () => {
  it.each([
    [100, "good"],
    [75, "good"],
    [74, "fair"],
    [60, "fair"],
    [59, "poor"],
    [0, "poor"],
  ] as const)("puts %i in the %s band", (score, band) => {
    expect(scoreBand(score)).toBe(band);
  });

  it("lines up with the grade boundaries", () => {
    for (let score = 0; score <= 100; score++) {
      const grade = gradeFor(score);
      const expected = grade === "A" || grade === "B" ? "good" : grade === "C" ? "fair" : "poor";
      expect(scoreBand(score), `score ${score} (grade ${grade})`).toBe(expected);
    }
  });
});

describe("statusLabel", () => {
  it("names every status", () => {
    expect(statusLabel).toEqual({
      pass: "Passed",
      warn: "Needs improvement",
      fail: "Needs fixing",
      info: "For information",
    });
  });
});

describe("report components", () => {
  const files = [
    "src/components/aurora/audit/report/StatusMark.tsx",
    "src/components/aurora/audit/report/ScoreDial.tsx",
    "src/components/aurora/audit/print/print-parts.tsx",
  ];

  it.each(files)("%s colours by scoreBand rather than its own thresholds", (file) => {
    const source = readFileSync(path.resolve(process.cwd(), file), "utf8");
    expect(source).not.toMatch(/score\s*>=\s*\d/);
    expect(source).toContain("scoreBand(");
  });
});
