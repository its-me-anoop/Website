/**
 * Renders the two 1200×630 social cards.
 *
 *   node scripts/og-card.mjs   →  public/og-flutterly.png   (the studio)
 *                                 public/og-healthcare.png  (GP, care-home and Clear Path pages)
 *
 * Uses the self-hosted Archivo and the Sorted palette, so the cards match
 * the site without a running server. See `site.ogImage` and
 * `site.healthcareOgImage`.
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const asset = (p) => readFileSync(fileURLToPath(new URL(p, root))).toString("base64");
const out = (p) => fileURLToPath(new URL(p, root));
const logo = `data:image/png;base64,${asset("public/flutterly-logo.png")}`;

const tiles = [
  ["Website", "Secure and quick", "#2238e8"],
  ["App", "On the App Store", "#ff5c1f"],
  ["Email", "On every device", "#1fb57a"],
  ["Backups", "Ran last night", "#1fb57a"],
  ["Social", "Posted this week", "#ff93d1"],
  ["Search", "Indexed and readable", "#ffd23a"],
];

const base = `
@font-face { font-family: Archivo; src: url(data:font/woff2;base64,${asset("src/fonts/archivo-latin-var.woff2")}) format("woff2"); font-weight: 100 900; font-stretch: 62% 125%; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: Archivo; }
.card { position: relative; height: 100%; padding: 64px 72px 56px; display: flex; flex-direction: column; }
.brand { display: flex; align-items: center; gap: 14px; font: 800 34px Archivo; font-stretch: 116%; letter-spacing: -.035em; }
.brand img { width: 52px; height: 52px; }
h1 { margin-top: auto; font: 800 104px/0.94 Archivo; font-stretch: 116%; letter-spacing: -.04em; }
h1 em { display: inline-block; font-style: normal; padding: 0 .16em .06em; border-radius: .09em; transform: rotate(-1.4deg); }
.label { font: 650 24px Archivo; font-stretch: 74%; letter-spacing: .09em; text-transform: uppercase; }
.foot { margin-top: 30px; display: flex; justify-content: space-between; align-items: baseline; }
.stage { position: absolute; right: 60px; top: 70px; width: 420px; perspective: 1400px; }
.table { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; transform: rotateX(12deg) rotateY(-20deg); transform-style: preserve-3d; }
.tile { position: relative; height: 124px; padding: 16px 18px; background: #fff; color: #0b1026; border-radius: 9px; display: flex; flex-direction: column; justify-content: space-between; transform-style: preserve-3d; }
.tile::after { content: ""; position: absolute; left: 0; right: 0; top: 100%; height: 14px; background: var(--c); transform-origin: 50% 0; transform: rotateX(-90deg); }
.tile::before { content: ""; position: absolute; top: 0; bottom: 0; left: 100%; width: 14px; background: var(--c); filter: brightness(.7); transform-origin: 0 50%; transform: rotateY(90deg); }
.tile b { display: flex; justify-content: space-between; align-items: center; font: 800 24px Archivo; font-stretch: 108%; letter-spacing: -.02em; }
.tile b i { width: 30px; height: 30px; border-radius: 6px; background: var(--c); }
.tile span { display: flex; align-items: center; gap: 9px; font: 600 19px Archivo; }
.tile span i { width: 11px; height: 11px; border-radius: 50%; background: #1fb57a; }
`;

const studio = `<!doctype html><html><head><style>${base}
body { background: #2238e8; color: #fff; }
h1 em { background: #ff5c1f; color: #0b1026; }
.label { color: #e1e5ff; }
</style></head><body><div class="card">
  <div class="brand"><img src="${logo}" alt="">Flutterly</div>
  <div class="stage"><div class="table">${tiles
    .map(([title, status, colour]) => `<div class="tile" style="--c:${colour}"><b>${title}<i></i></b><span><i></i>${status}</span></div>`)
    .join("")}</div></div>
  <h1>Your<br>digital side,<br><em>sorted.</em></h1>
  <p class="foot label"><span>Websites · Apps · IT support · Social media · SEO</span><span>flutterly.co.uk</span></p>
</div></body></html>`;

const healthcare = `<!doctype html><html><head><style>${base}
body { background: #f4f3ee; color: #0b1026; }
.card { border-bottom: 22px solid #2238e8; }
h1 { font-size: 96px; max-width: 980px; }
h1 em { background: #2238e8; color: #fff; }
.label { color: #343a5a; }
.bars { position: absolute; right: 72px; top: 64px; display: flex; gap: 10px; }
.bars i { width: 44px; height: 44px; border-radius: 8px; }
</style></head><body><div class="card">
  <div class="brand"><img src="${logo}" alt="">Flutterly</div>
  <div class="bars">${["#2238e8", "#ff5c1f", "#1fb57a", "#ff93d1", "#ffd23a"].map((c) => `<i style="background:${c}"></i>`).join("")}</div>
  <h1>Healthcare websites, <em>beautifully built.</em></h1>
  <p class="foot label"><span>Accessible, fast websites for GP practices and care homes</span><span>flutterly.co.uk</span></p>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [html, file] of [
  [studio, "public/og-flutterly.png"],
  [healthcare, "public/og-healthcare.png"],
]) {
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out(file) });
  console.log(`Wrote ${out(file)}`);
}
await browser.close();
