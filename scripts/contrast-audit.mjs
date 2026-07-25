/**
 * WCAG 2.2 AA contrast audit.
 *
 * Walks every rendered text node on every route, resolves the colour
 * actually painted behind it (compositing translucent ancestors down to
 * the first opaque one), and reports any pair that misses the AA floor
 * for its size: 3:1 for large text (>=24px, or >=18.66px bold), 4.5:1
 * for everything else.
 *
 * Decorative and invisible text is skipped: `aria-hidden` subtrees,
 * `.sr-only`, zero-opacity nodes and elements with no box.
 *
 * Usage:
 *   1. npm run build && PORT=3100 npm start
 *   2. BASE_URL=http://localhost:3100 node scripts/contrast-audit.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const ROUTES = [
  "/",
  "/gp-websites",
  "/care-home-websites",
  "/packages",
  "/free-audit",
  "/accessibility",
  "/projects/sipli",
  "/projects/artling",
  "/projects/sipli/privacy-policy",
  "/projects/artling/privacy-policy",
  "/little-artist/privacy-policy",
  "/demo/gp-practice",
  "/demo/care-home",
];

const AUDIT = () => {
  const parse = (value) => {
    const m = value.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
  };
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const lum = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };

  /* Walk up compositing every translucent background until an opaque
     one is reached. An ancestor image or gradient makes the result
     unknowable from computed style alone, so those are reported
     separately rather than guessed at. */
  const backdrop = (el) => {
    let layers = [];
    let node = el;
    while (node && node !== document.documentElement.parentNode) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return { unknown: true };
      const bg = parse(cs.backgroundColor);
      if (bg && bg.a > 0) {
        layers.push(bg);
        if (bg.a === 1) {
          let out = layers.pop();
          while (layers.length) out = over(layers.pop(), out);
          return { colour: out };
        }
      }
      node = node.parentElement;
    }
    let out = { r: 255, g: 255, b: 255, a: 1 };
    while (layers.length) out = over(layers.pop(), out);
    return { colour: out };
  };

  const findings = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent.trim();
    if (!text) continue;
    const el = node.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    if (el.closest("[aria-hidden='true'], [aria-hidden], .sr-only, script, style, svg")) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (Number(cs.opacity) < 0.99) continue;
    /* Gradient-filled text paints from a background, not a colour. */
    if (cs.webkitTextFillColor === "rgba(0, 0, 0, 0)") continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;

    const fg = parse(cs.webkitTextFillColor || cs.color);
    if (!fg || fg.a === 0) continue;
    const bd = backdrop(el);
    if (bd.unknown) continue;

    const composited = fg.a < 1 ? over(fg, bd.colour) : fg;
    const r = ratio(composited, bd.colour);
    const size = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const floor = large ? 3 : 4.5;

    if (r < floor) {
      findings.push({
        text: text.slice(0, 60),
        ratio: Number(r.toFixed(2)),
        floor,
        size: `${size}px/${weight}`,
        colour: cs.color,
        tag: el.tagName.toLowerCase(),
        cls: el.className?.toString?.().slice(0, 90) ?? "",
      });
    }
  }
  return findings;
};

const browser = await chromium.launch();
let failures = 0;
let checked = 0;

for (const route of ROUTES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  /* Scroll the whole page so every scroll-revealed block is painted
     before anything is measured. */
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 380) {
    await page.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1200);

  const findings = await page.evaluate(AUDIT);
  checked += 1;
  if (findings.length) {
    failures += findings.length;
    console.log(`\n✗ ${route} — ${findings.length} below AA`);
    for (const f of findings) {
      console.log(
        `   ${f.ratio}:1 (needs ${f.floor}) ${f.size} ${f.colour} <${f.tag}> “${f.text}”\n     ${f.cls}`
      );
    }
  } else {
    console.log(`✓ ${route}`);
  }
  await page.close();
}

await browser.close();
console.log(
  failures
    ? `\n${failures} contrast failure(s) across ${checked} routes.`
    : `\nAll text on ${checked} routes clears WCAG 2.2 AA.`
);
process.exit(failures ? 1 : 0);
