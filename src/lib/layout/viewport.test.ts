import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { heroArtSizes, viewportQueries } from "./viewport";

const css = readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");

/** The media query a Tailwind `@custom-variant name (@media …);` declares. */
function variantQuery(name: string) {
  const match = css.match(new RegExp(`@custom-variant ${name} \\(@media ([^;]+)\\);`));
  return match?.[1].trim();
}

/** Every rule body inside `@media <query> { … }` blocks. */
function mediaBlocks(query: string) {
  const blocks: string[] = [];
  let from = 0;
  for (;;) {
    const start = css.indexOf(`@media ${query}`, from);
    if (start === -1) return blocks;
    let depth = 0;
    for (let i = css.indexOf("{", start); i < css.length; i++) {
      if (css[i] === "{") depth++;
      if (css[i] === "}" && --depth === 0) {
        blocks.push(css.slice(start, i + 1));
        from = i;
        break;
      }
    }
  }
}

/** Tailwind variant names are kebab-case: wideLandscape → wide-landscape. */
const variantName = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const minWidth = (query: string) => Number(query.match(/min-width:\s*(\d+)px/)?.[1] ?? 0);

describe("viewport queries", () => {
  it.each(Object.keys(viewportQueries) as (keyof typeof viewportQueries)[])(
    "the %s Tailwind variant in globals.css uses the same query as the code",
    (name) => {
      expect(variantQuery(variantName(name))).toBe(viewportQueries[name]);
    }
  );

  it("keeps the roomy layout off phones and the folded Duo (narrower than 600px)", () => {
    expect(minWidth(viewportQueries.roomy)).toBeGreaterThanOrEqual(600);
    expect(viewportQueries.roomy).toMatch(/min-aspect-ratio/);
  });

  it("only asks for three packages across on landscape screens with room for them", () => {
    expect(viewportQueries.wideLandscape).toMatch(/orientation:\s*landscape/);
    expect(minWidth(viewportQueries.wideLandscape)).toBeGreaterThanOrEqual(860);
  });

  it("treats the fold as an enhancement: only viewport-segment features, which unsupported browsers ignore", () => {
    expect(viewportQueries.spanning).toMatch(/^\(horizontal-viewport-segments: 2\)$/);
  });

  it("asks for a smaller butterfly when the hero sits in two columns", () => {
    expect(heroArtSizes).toContain(`${viewportQueries.roomy} 45vw`);
    expect(heroArtSizes.endsWith("90vw")).toBe(true);
  });
});

describe("fold-only styling", () => {
  it("draws the hinge seam only when the page spans two screen segments", () => {
    const seam = css.match(/\.hero-seam\s*\{([^}]*)\}/);
    expect(seam?.[1]).toMatch(/display:\s*none/);
    const spanning = mediaBlocks(viewportQueries.spanning).join("\n");
    expect(spanning).toMatch(/\.hero-seam/);
    expect(spanning).toMatch(/env\(viewport-segment-right 0 0, [^)]+\)/);
  });

  it("gives every env(viewport-segment-*) a fallback value", () => {
    const uses = [...css.matchAll(/env\((viewport-segment-[^)]*)\)/g)].map((m) => m[1]);
    expect(uses.length).toBeGreaterThan(0);
    uses.forEach((use) => expect(use, use).toMatch(/,/));
  });
});

describe("unfolding touch", () => {
  const unfurl = () => {
    const start = css.indexOf("@keyframes fx-unfurl");
    expect(start).toBeGreaterThan(-1);
    return css.slice(start, css.indexOf("}\n}", start) + 3);
  };

  it("opens the butterfly's wings with a flat 2D transform only (no 3D or filters on touch)", () => {
    const frames = unfurl();
    expect(frames).toMatch(/scaleX/);
    expect(frames).not.toMatch(/filter|rotateY|perspective|3d/);
  });

  it("plays only on touch screens in the roomy layout, so it fires when a foldable opens", () => {
    const blocks = mediaBlocks(`${viewportQueries.touch} and ${viewportQueries.roomy}`).join("\n");
    expect(blocks).toMatch(/\.fx-unfurl\s*\{[^}]*animation:\s*fx-unfurl/);
    expect(css.replace(blocks, "")).not.toMatch(/animation:\s*fx-unfurl/);
  });
});

describe("tap targets", () => {
  it("grow to 44px only for coarse pointers, leaving mouse layouts untouched", () => {
    const rule = css.match(/@utility tap-target \{([\s\S]*?)\n\}/);
    expect(rule).not.toBeNull();
    expect(rule![1]).toMatch(new RegExp(`@media ${viewportQueries.touch.replace(/[()]/g, "\\$&")}`));
    expect(rule![1]).toMatch(/min-height:\s*44px/);
    expect(rule![1]).toMatch(/min-width:\s*44px/);
    expect(rule![1]).not.toMatch(/display:/);
  });
});
