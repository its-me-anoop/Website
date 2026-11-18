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

describe("Rooms tones", () => {
  it.each(["chalk", "white", "sky", "cobalt", "navy", "flame", "sun", "jade", "pink", "ochre"])(
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

describe("the hero's scroll scene", () => {
  it("is sorted unless a script is playing it, so the page is right without JavaScript", () => {
    expect(block(".hero-scene {")).toMatch(/--q: 99;/);
  });

  it("works every sticker out from the one number the scroll sets", () => {
    const piece = block(".sort-piece,\n.sort-slot {");
    expect(piece).toMatch(/--t: clamp\(0, calc\(\(var\(--q\) - var\(--n\)/);
    expect(block(".sort-piece {")).toMatch(/var\(--u\)/);
  });

  it("holds the room still only on a wide, tall-enough window, and never under reduced motion", () => {
    const start = css.indexOf(
      "@media (min-width: 840px) and (min-height: 600px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)"
    );
    expect(start).toBeGreaterThan(-1);
    expect(css.slice(start, start + 400)).toMatch(/\.hero-scene\[data-pin\] \.hero-pin \{\s*position: sticky;/);
    expect(css.match(/position: sticky/g)).toHaveLength(1);
  });

  it("keeps the hero's key display in a layer so `hidden` utilities still win", () => {
    expect(css).toMatch(/@layer components\s*\{\s*\.s-key\s*\{\s*display: inline-flex;/);
  });
});

describe("the desktop layout", () => {
  it("is also given to a smaller screen held sideways, such as an iPhone Duo open in landscape", () => {
    expect(block("@custom-variant wide {")).toContain("@media (min-width: 64rem), (min-width: 840px) and (orientation: landscape)");
  });

  it("has an opposite that covers every other window and no window twice", () => {
    expect(block("@custom-variant max-wide {")).toContain("@media (max-width: 839.98px), (max-width: 63.99rem) and (orientation: portrait)");
  });
});

describe("the travelling dot", () => {
  it("leaves its resting places empty only where it is running", () => {
    expect(css).toMatch(/\.dot-live \[data-dot="slot"\] \{\s*visibility: hidden;/);
  });

  it("nudges what it lands on without replacing that element's own transform", () => {
    const hit = block("@keyframes dot-hit");
    expect(hit).toMatch(/translate:/);
    expect(hit).toMatch(/scale:/);
    expect(hit).not.toMatch(/transform/);
  });

  it("turns ink on the vermilion wall, where vermilion would not show", () => {
    expect(block(".tone-flame {")).toMatch(/--s-dot: var\(--s-navy\)/);
    expect(block(".s-dot {")).toMatch(/background: var\(--s-dot\)/);
  });

  it("never gets in the way of the pointer, and is not printed", () => {
    expect(block(".dot-trail {")).toMatch(/pointer-events: none/);
    expect(css).toMatch(/@media print \{\s*\.dot-trail \{\s*display: none;/);
  });
});

describe("motion that respects the visitor", () => {
  const reduced = css.slice(css.lastIndexOf(".s-words .s-w > span,\n  .s-rise"));

  it("stops every scene under reduced motion", () => {
    [".sort-bob", ".stack-slab", ".shot-turn", ".xray-stack", ".menu-card", ".s-caret"].forEach((selector) =>
      expect(reduced).toContain(selector)
    );
  });

  it("shows the hero sorted under reduced motion, whatever a script has set", () => {
    expect(reduced).toMatch(/\.hero-scene \{\s*--q: 99 !important;/);
  });

  it("removes the route flaps under reduced motion", () => {
    expect(css).toMatch(/\.route-flaps \{ display: none; \}/);
  });

  it.each(["@keyframes s-word", "@keyframes s-rise", "@keyframes route-enter", "@keyframes sort-bob", "@keyframes dot-hit", "@keyframes stack-settle"])(
    "%s never animates a filter",
    (name) => {
      expect(block(name)).not.toMatch(/filter/);
    }
  );
});

describe("dark theme", () => {
  const dark = block("@media (prefers-color-scheme: dark)");

  it("declares both schemes, so Safari's Adaptive Dark Mode leaves Rooms pages to their own dark theme", () => {
    expect(block("html:has(.s-root) {")).toMatch(/color-scheme: light dark/);
  });

  it("re-inks only the neutral tones and leaves the coloured bands as they are", () => {
    [".tone-chalk", ".tone-white", ".tone-sky"].forEach((tone) => expect(dark).toContain(`.s-root ${tone}`));
    [".tone-cobalt", ".tone-flame", ".tone-sun", ".tone-jade", ".tone-pink", ".tone-ochre"].forEach((tone) =>
      expect(dark).not.toContain(tone)
    );
  });

  it("is scoped to .s-root, so the bar and footer around a light case-study page stay light", () => {
    expect(dark).not.toMatch(/\.s-chrome/);
    expect(dark).not.toMatch(/(^|\n)\s*\.tone-/);
  });

  it("gives rules a colour that shows in the dark room", () => {
    expect(dark).toMatch(/--s-rule: #8d8a85/);
    expect(css).toMatch(/--color-s-rule: var\(--s-rule\)/);
  });
});

describe("the language is flat", () => {
  it("lets a utility recolour one pill: the colour defaults sit in the components layer", () => {
    expect(block("@layer components")).toMatch(/--key-face: var\(--s-action\)/);
    expect(block(".s-key {")).not.toMatch(/--key-face:/);
  });

  it("draws every control as a pill with no pressed side", () => {
    const key = block(".s-key {");
    expect(key).toMatch(/border-radius: var\(--key-radius, 999px\)/);
    expect(key).not.toMatch(/box-shadow/);
  });

  it("sets the emphasised word of a headline in the italic serif, in the tone's mark colour", () => {
    const em = block(".s-display em,\n.s-mark");
    expect(em).toMatch(/font-family: var\(--font-instrument\)/);
    expect(em).toMatch(/font-style: italic/);
    expect(em).toMatch(/color: var\(--s-mark\)/);
  });

  it("gives a room's floor a skirting board in the shade of its wall", () => {
    expect(block(".s-floor {")).toMatch(/border-top: .*color-mix\(in srgb, var\(--s-bg\)/);
  });

  it("keeps the sticker wall two-dimensional", () => {
    [".sort-stage {", ".sort-piece {", ".sort-table {"].forEach((selector) =>
      expect(block(selector)).not.toMatch(/perspective|preserve-3d|rotate[XY]/)
    );
  });
});
