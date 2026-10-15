/**
 * Renders the default 1200×630 social card for the broad studio.
 *
 *   node scripts/og-card.mjs   →  public/og-studio.png
 *
 * Uses the self-hosted Aurora fonts and palette, so the card matches the
 * site without a running server. Healthcare pages keep their own card
 * (`public/og-aurora.png`); see `site.healthcareOgImage`.
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const asset = (p) => readFileSync(fileURLToPath(new URL(p, root))).toString("base64");
const font = (p) => `url(data:font/woff2;base64,${asset(p)}) format("woff2")`;
const OUT = fileURLToPath(new URL("public/og-studio.png", root));

const html = `<!doctype html><html><head><style>
@font-face { font-family: Bricolage; src: ${font("src/fonts/bricolage-grotesque-latin-var.woff2")}; font-weight: 200 800; }
@font-face { font-family: Instrument; src: ${font("src/fonts/instrument-serif-italic.woff2")}; font-style: italic; }
@font-face { font-family: Geist; src: ${font("src/fonts/geist-latin-var.woff2")}; font-weight: 100 900; }
@font-face { font-family: GeistMono; src: ${font("src/fonts/geist-mono-latin-var.woff2")}; font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; color: #f8f1e7; font-family: Geist;
  background:
    radial-gradient(38% 55% at 82% 30%, rgba(255,122,26,.42), transparent 70%),
    radial-gradient(30% 45% at 95% 85%, rgba(255,90,31,.32), transparent 70%),
    radial-gradient(45% 60% at 62% 105%, rgba(255,194,74,.16), transparent 70%),
    #0b0907; }
.card { position: relative; height: 100%; padding: 72px 72px 64px; display: flex; flex-direction: column; }
.brand { display: flex; align-items: center; gap: 16px; font: 640 30px Bricolage; letter-spacing: -.03em; }
.brand img { width: 44px; height: 44px; }
h1 { margin-top: auto; font: 680 112px/0.95 Bricolage; letter-spacing: -.045em; }
h1 em { font: italic 400 120px Instrument; letter-spacing: -.02em;
  background: linear-gradient(90deg, #ffc24a, #ff8a2a 55%, #ff5a1f); -webkit-background-clip: text; color: transparent; padding-right: 8px; }
.services { margin-top: 34px; font-size: 30px; color: #f8f1e7; letter-spacing: -.01em; }
.foot { margin-top: 26px; display: flex; justify-content: space-between; align-items: baseline; font-size: 22px; color: #cbbfae; }
.foot span:last-child { font: 400 20px GeistMono; letter-spacing: .18em; color: #ffc24a; }
.dot { position: absolute; border-radius: 50%; background: #ffb020; box-shadow: 0 0 10px 2px rgba(255,176,32,.6); }
</style></head><body><div class="card">
  ${[[1010,90,4],[930,210,3],[1120,300,5],[860,140,2],[1060,470,3],[780,60,2],[1150,180,2],[990,360,2]]
    .map(([x, y, s]) => `<i class="dot" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px"></i>`).join("")}
  <div class="brand"><img src="data:image/png;base64,${asset("public/flutterly-logo.png")}" alt="">Flutterly</div>
  <h1>Your digital side, <em>sorted.</em></h1>
  <p class="services">Websites · Apps · IT support · Social media · SEO</p>
  <p class="foot"><span>Reading, UK · Built and looked after by the person you brief</span><span>FLUTTERLY.CO.UK</span></p>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: OUT });
await browser.close();
console.log(`Wrote ${OUT}`);
