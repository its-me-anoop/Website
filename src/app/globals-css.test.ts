import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(path.join(__dirname, "globals.css"), "utf8");

/** The whole block that opens at `selector`. */
function block(selector: string): string {
  const start = css.indexOf(selector);
  expect(start, `${selector} not found in globals.css`).toBeGreaterThan(-1);
  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}" && --depth === 0) return css.slice(start, i + 1);
  }
  return css.slice(start);
}

describe("Sorted tones", () => {
  it.each(["chalk", "white", "sky", "cobalt", "navy", "flame", "sun", "jade", "pink"])(
    "tone-%s paints its own canvas and ink",
    (tone) => {
      expect(css).toMatch(new RegExp(`\\.tone-${tone}[,\\s{]`));
    }
  );

  it("a tone sets the background and the text colour together", () => {
    const rule = block(".tone-chalk,\n.tone-white,\n.tone-sky,\n.tone-cobalt");
    expect(rule).toMatch(/background-color: var\(--s-bg\)/);
    expect(rule).toMatch(/color: var\(--s-ink\)/);
  });
});

describe("the opening animation", () => {
  it("ends on the sorted layout, so the page is right without JavaScript", () => {
    /* `from` only: the animation always finishes on the element's own transform. */
    expect(block("@keyframes sort-in")).toMatch(/from\s*\{\s*transform: var\(--away\)/);
    expect(block("@keyframes sort-in")).not.toMatch(/\bto\s*\{/);
  });

  it("keeps the hero's key display in a layer so `hidden` utilities still win", () => {
    expect(css).toMatch(/@layer components\s*\{\s*\.s-key\s*\{\s*display: inline-flex;/);
  });
});

describe("motion that respects the visitor", () => {
  const reduced = css.slice(css.lastIndexOf(".s-words .s-w > span,\n  .s-rise"));

  it("stops every scene under reduced motion", () => {
    [".sort-piece", ".sort-bob", ".stack-slab", ".badge-hang", ".shot-turn", ".xray-stack"].forEach((selector) =>
      expect(reduced).toContain(selector)
    );
  });

  it("removes the route flaps under reduced motion", () => {
    expect(css).toMatch(/\.route-flaps \{ display: none; \}/);
  });

  it.each(["@keyframes s-word", "@keyframes s-rise", "@keyframes route-enter", "@keyframes sort-in", "@keyframes stack-settle"])(
    "%s never animates a filter",
    (name) => {
      expect(block(name)).not.toMatch(/filter/);
    }
  );
});

describe("dark theme", () => {
  const dark = block("@media (prefers-color-scheme: dark)");

  it("declares both schemes, so Safari's Adaptive Dark Mode leaves Sorted pages to their own dark theme", () => {
    expect(block("html:has(.s-root) {")).toMatch(/color-scheme: light dark/);
  });

  it("re-inks only the neutral tones and leaves the coloured bands as they are", () => {
    [".tone-chalk", ".tone-white", ".tone-sky"].forEach((tone) => expect(dark).toContain(`.s-root ${tone}`));
    [".tone-cobalt", ".tone-flame", ".tone-sun", ".tone-jade", ".tone-pink"].forEach((tone) =>
      expect(dark).not.toContain(tone)
    );
  });

  it("is scoped to .s-root, so the bar and footer around a light case-study page stay light", () => {
    expect(dark).not.toMatch(/\.s-chrome/);
    expect(dark).not.toMatch(/(^|\n)\s*\.tone-/);
  });

  it("gives rules and card sides a colour that shows on navy", () => {
    expect(dark).toMatch(/--s-rule: #8f99d6/);
    expect(css).toMatch(/--color-s-rule: var\(--s-rule\)/);
  });
});
