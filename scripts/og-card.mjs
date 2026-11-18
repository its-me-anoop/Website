/**
 * Renders the two 1200×630 social cards.
 *
 *   node scripts/og-card.mjs   →  public/og-flutterly.png   (the studio)
 *                                 public/og-healthcare.png  (GP, care-home and Clear Path pages)
 *
 * Uses the self-hosted faces and the Rooms palette (a wall, a floor, a
 * headline with its last words in the serif), so the cards match the
 * site without a running server. See `site.ogImage` and
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
  ["Website", "Secure and quick", "#0b41c2"],
  ["App", "On the App Store", "#fc4109"],
  ["Email", "On every device", "#69b488"],
  ["Backups", "Ran last night", "#69b488"],
  ["Social", "Posted this week", "#ffabc8"],
  ["Search", "Indexed and readable", "#f8d867"],
];

const font = (family, file, extra = "") =>
  `@font-face { font-family: ${family}; src: url(data:font/woff2;base64,${asset(`src/fonts/${file}`)}) format("woff2"); ${extra} }`;

const base = `
${font("Brico", "bricolage-grotesque-latin-var.woff2", "font-weight: 200 800;")}
${font("Serif", "instrument-serif-latin-400-italic.woff2", "font-style: italic;")}
${font("Mono", "cutive-mono-latin-400.woff2")}
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: Brico; }
.card { position: relative; height: 100%; padding: 56px 72px 0; display: flex; flex-direction: column; }
.brand { align-self: flex-start; display: flex; align-items: center; gap: 12px; padding: 8px 22px 8px 10px; border-radius: 999px; background: #f4efe8; color: #201e1f; font: 800 32px Brico; letter-spacing: -.05em; }
.brand img { width: 48px; height: 48px; }
.dot { display: inline-block; width: .3em; height: .3em; border-radius: 50%; background: #fc4109; }
h1 { margin-top: auto; font: 800 112px/0.9 Brico; letter-spacing: -.052em; }
h1 em { font: italic 400 1.07em/0.9 Serif; letter-spacing: -.022em; }
.floor { margin: 34px -72px 0; padding: 22px 72px 26px; background: #f4efe8; color: #3a3836; border-top: 10px solid var(--skirt); display: flex; justify-content: space-between; font: 400 22px Mono; word-spacing: -.28em; }
.floor b { font-weight: 400; color: #c93205; margin-right: 12px; }
.stage { position: absolute; right: 64px; top: 56px; width: 440px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.tile { height: 112px; padding: 16px 18px; background: #fffdf8; color: #201e1f; border-radius: 18px 22px 18px 20px; display: flex; flex-direction: column; justify-content: space-between; }
.tile:nth-child(odd) { transform: rotate(-1.2deg); }
.tile:nth-child(even) { transform: rotate(1deg); }
.tile b { display: flex; justify-content: space-between; align-items: center; font: 700 24px Brico; letter-spacing: -.03em; }
.tile b i { width: 30px; height: 30px; border-radius: 50%; background: var(--c); }
.tile span { display: flex; align-items: center; gap: 9px; font: 400 17px Mono; word-spacing: -.28em; }
.tile span i { width: 10px; height: 10px; border-radius: 50%; background: #2f8f55; }
`;

const studio = `<!doctype html><html><head><style>${base}
body { background: #0b41c2; color: #f4efe8; --skirt: #0937a3; }
h1 em { color: #ffabc8; }
</style></head><body><div class="card">
  <div class="brand"><img src="${logo}" alt="">Flutterly<i class="dot"></i></div>
  <div class="stage">${tiles
    .map(([title, status, colour]) => `<div class="tile" style="--c:${colour}"><b>${title}<i></i></b><span><i></i>${status}</span></div>`)
    .join("")}</div>
  <h1>Your<br>digital side,<br><i class="dot" style="font-size:.86em;margin-right:.12em"></i><em>sorted.</em></h1>
  <p class="floor"><span><b>&gt;</b>Websites · Apps · IT support · Social media · SEO</span><span>flutterly.co.uk</span></p>
</div></body></html>`;

const healthcare = `<!doctype html><html><head><style>${base}
body { background: #ffabc8; color: #201e1f; --skirt: #d98fa9; }
.card::before { content: ""; position: absolute; right: -110px; top: -230px; width: 500px; height: 500px; border-radius: 50%; background: #0b41c2; }
.brand { position: relative; border: 2px solid #201e1f; }
h1 { position: relative; font-size: 98px; max-width: 1010px; }
.floor { background: #1c3d24; color: #f4efe8; }
.floor b { color: #ffabc8; }
</style></head><body><div class="card">
  <div class="brand"><img src="${logo}" alt="">Flutterly<i class="dot"></i></div>
  <h1>Healthcare websites, <em>beautifully built.</em></h1>
  <p class="floor"><span><b>&gt;</b>Accessible, fast websites for GP practices and care homes</span><span>flutterly.co.uk</span></p>
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
