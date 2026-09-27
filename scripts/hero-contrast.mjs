/**
 * Worst-case contrast for text over the molten shader.
 *
 * The shader animates, so a screenshot only catches one moment. This
 * paints every shader canvas at its brightest possible colour (the
 * clamp at the end of the fragment shader, see aurora-gl.ts), so the
 * scrims, glass and grid above it are measured against the worst frame
 * there can be. For each piece of text it hides the glyphs, samples
 * the pixels actually painted behind them and checks WCAG AA
 * (4.5:1, or 3:1 for large text).
 *
 *   1. npm run build && PORT=3100 npm start
 *   2. BASE_URL=http://localhost:3100 npm run test:contrast
 */
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3100";

/* The shader's clamp, min(outc, 0.78), reached on a gold-white core. */
const SHADER_PEAK = "rgb(199, 199, 199)";

/** Where the shader sits behind text. */
const TARGETS = [
  { route: "/", selector: "#top" },
  { route: "/", selector: "#contact" },
  { route: "/gp-websites", selector: "#top" },
  { route: "/packages", selector: "#top" },
  { route: "/leaving-msw", selector: "#top" },
];

const VIEWPORTS = [
  ["mobile", { ...devices["iPhone 13"] }],
  ["desktop", { viewport: { width: 1440, height: 900 } }],
];

const linear = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]) => 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const failures = [];
const browser = await chromium.launch();

for (const [label, options] of VIEWPORTS) {
  const context = await browser.newContext({ ...options, reducedMotion: "reduce" });
  const page = await context.newPage();

  for (const { route, selector } of TARGETS) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    const exists = await page.locator(selector).count();
    if (!exists) continue;

    /* Measure each block in turn, scrolled to the top of the viewport. */
    const texts = await page.evaluate(
      ({ selector, peak }) => {
        document.documentElement.style.scrollBehavior = "auto";
        const root = document.querySelector(selector);
        root.scrollIntoView({ block: "start" });

        for (const canvas of root.querySelectorAll("canvas.mix-blend-screen")) {
          canvas.dataset.ready = "true";
          canvas.style.background = peak;
        }
        for (const canvas of root.querySelectorAll("canvas:not(.mix-blend-screen)")) canvas.style.display = "none";

        const out = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const seen = new Set();
        while (walker.nextNode()) {
          const node = walker.currentNode;
          const el = node.parentElement;
          if (!node.textContent.trim() || seen.has(el)) continue;
          if (el.closest("[aria-hidden=true], .sr-only, input, textarea")) continue;
          const style = getComputedStyle(el);
          if (style.visibility === "hidden" || style.display === "none") continue;
          seen.add(el);
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const rect of range.getClientRects()) {
            if (rect.width < 4 || rect.height < 4 || rect.bottom < 0 || rect.top > innerHeight) continue;
            /* Gradient text (the italic <em>): judge its darkest stop. */
            const gradient = style.backgroundClip === "text" || style.webkitBackgroundClip === "text";
            const size = parseFloat(style.fontSize);
            const bold = parseInt(style.fontWeight, 10) >= 700;
            out.push({
              text: node.textContent.trim().slice(0, 40),
              color: gradient ? "rgb(255, 90, 31)" : style.color,
              large: size >= 24 || (bold && size >= 18.66),
              rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
            });
          }
        }
        return out;
      },
      { selector, peak: SHADER_PEAK }
    );

    /* Hide the glyphs and photograph what is painted behind them. */
    await page.addStyleTag({
      content: `${selector} * { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; caret-color: transparent !important; } ${selector} em { background: none !important; }`,
    });
    await page.waitForTimeout(150);
    const shot = await page.screenshot();

    /* Decode in the page (no image library needed): for each text run,
       the brightest 2% of the background pixels behind its glyphs. */
    const backgrounds = await page.evaluate(
      async ({ png, rects }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + png;
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const scale = img.naturalWidth / innerWidth;
        const lin = (c) => {
          const s = c / 255;
          return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        };
        return rects.map((r) => {
          const x = Math.max(0, Math.floor(r.x * scale));
          const y = Math.max(0, Math.floor(r.y * scale));
          const w = Math.min(canvas.width - x, Math.ceil(r.w * scale));
          const h = Math.min(canvas.height - y, Math.ceil(r.h * scale));
          if (w < 1 || h < 1) return null;
          const { data } = ctx.getImageData(x, y, w, h);
          const lums = [];
          for (let i = 0; i < data.length; i += 8)
            lums.push(0.2126 * lin(data[i]) + 0.7152 * lin(data[i + 1]) + 0.0722 * lin(data[i + 2]));
          lums.sort((a, b) => a - b);
          return lums[Math.floor(lums.length * 0.98)];
        });
      },
      { png: shot.toString("base64"), rects: texts.map((t) => t.rect) }
    );

    texts.forEach((t, i) => {
      const bg = backgrounds[i];
      if (bg == null) return;
      const fg = t.color.match(/[\d.]+/g).slice(0, 3).map(Number);
      const got = ratio(luminance(fg), bg);
      const need = t.large ? 3 : 4.5;
      if (got < need)
        failures.push(`[${label} ${route} ${selector}] "${t.text}" ${got.toFixed(2)}:1 (needs ${need}:1)`);
    });
  }
  await context.close();
}

await browser.close();

if (failures.length) {
  console.error(`\n✖ ${failures.length} text run(s) below AA over the brightest shader frame:`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("✓ Hero text stays at WCAG AA over the brightest possible shader frame.");
