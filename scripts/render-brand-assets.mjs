/**
 * Renders the Wayfinder brand assets from the real fonts and logo:
 *
 *   public/og-wayfinder.png   1200×630 social card
 *   src/app/icon.png          512×512 favicon (yellow plate, ink wings)
 *   src/app/apple-icon.png    180×180 home-screen icon (full-bleed plate)
 *   src/app/favicon.ico       16, 32 and 48px PNGs in one .ico
 *
 * Usage: node scripts/render-brand-assets.mjs
 *
 * Fonts and the logo are inlined as data URLs so the page renders from
 * setContent with no server (mask images do not load over file://).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataUrl = (path, type) => `data:${type};base64,${readFileSync(join(root, path)).toString("base64")}`;

const fontNext = dataUrl("src/fonts/atkinson-hyperlegible-next-latin-var.woff2", "font/woff2");
const fontMono = dataUrl("src/fonts/atkinson-hyperlegible-mono-latin-var.woff2", "font/woff2");
const logo = dataUrl("public/flutterly-logo.png", "image/png");

const INK = "#14171b";
const PAPER = "#f3f1ea";
const SIGN = "#ffd21a";

const base = `
  @font-face { font-family: AHN; src: url(${fontNext}) format("woff2"); font-weight: 200 800; }
  @font-face { font-family: AHM; src: url(${fontMono}) format("woff2"); font-weight: 200 800; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: transparent; }
  .wings { background: ${INK}; -webkit-mask: url(${logo}) center / 132% no-repeat; mask: url(${logo}) center / 132% no-repeat; }
`;

const arm = (label, place, point, tone = INK, text = PAPER, sub = "#b7bbc1") => {
  const shape =
    point === "right"
      ? "polygon(0 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 0 100%)"
      : "polygon(26px 0, 100% 0, 100% 100%, 26px 100%, 0 50%)";
  const side =
    point === "right"
      ? "margin-left: calc(45% - 6px); padding: 12px 44px 12px 20px;"
      : "margin-left: auto; margin-right: calc(55% - 6px); padding: 12px 20px 12px 44px; text-align: right;";
  return `<div style="position: relative; width: fit-content; ${side}">
    <div style="position: absolute; inset: 0; background: ${tone}; clip-path: ${shape};"></div>
    <div style="position: relative; font: 500 12px/1.3 AHM; letter-spacing: .08em; text-transform: uppercase; color: ${sub}; white-space: nowrap;">${place}</div>
    <div style="position: relative; font: 700 23px/1.15 AHN; letter-spacing: -.012em; color: ${text}; white-space: nowrap;">${label}</div>
  </div>`;
};

const og = `<!doctype html><html><head><style>${base}
  body { width: 1200px; height: 630px; background: ${PAPER}; color: ${INK}; font-family: AHN; position: relative; overflow: hidden; }
  .brand { position: absolute; left: 64px; top: 56px; display: flex; align-items: center; gap: 14px; }
  .plate { width: 52px; height: 52px; border-radius: 8px; background: ${SIGN}; display: grid; place-items: center; }
  .plate .wings { width: 38px; height: 38px; }
  .brand b { font-weight: 800; font-size: 34px; letter-spacing: -.03em; }
  h1 { position: absolute; left: 64px; top: 150px; width: 620px; font-weight: 800; font-size: 78px; line-height: .98; letter-spacing: -.035em; }
  mark { color: inherit; background: linear-gradient(transparent 60%, ${SIGN} 60%, ${SIGN} 90%, transparent 90%); -webkit-box-decoration-break: clone; }
  .post { position: absolute; right: 40px; top: 110px; width: 480px; height: 390px; }
  .pole { position: absolute; left: 45%; margin-left: -8px; top: 14px; bottom: 0; width: 16px; background: ${INK}; }
  .pole:before { content: ""; position: absolute; left: 50%; margin-left: -14px; top: -14px; width: 28px; height: 16px; border-radius: 14px 14px 2px 2px; background: ${INK}; }
  .arms { position: relative; padding-top: 36px; display: grid; gap: 16px; }
  .foot { position: absolute; left: 0; right: 0; bottom: 0; height: 74px; background: ${INK}; color: ${PAPER}; display: flex; align-items: center; justify-content: space-between; padding: 0 64px; font: 500 16px AHM; letter-spacing: .08em; text-transform: uppercase; }
  .foot span:last-child { color: ${SIGN}; }
</style></head><body>
  <div class="brand"><span class="plate"><span class="wings"></span></span><b>Flutterly</b></div>
  <h1>Websites that answer <mark>before the phone rings.</mark></h1>
  <div class="post"><div class="pole"></div><div class="arms">
    ${arm("Book an appointment", "Willowbrook Surgery", "right")}
    ${arm("Arrange a visit", "Oakfield House", "left", SIGN, INK, "#3f3700")}
    ${arm("See the fees", "Kennet Bridge Dental", "right")}
    ${arm("Pharmacy First", "Willowbrook Pharmacy", "left")}
  </div></div>
  <div class="foot"><span>GP practices · Care homes · Clinics · Reading, UK</span><span>flutterly.co.uk</span></div>
</body></html>`;

/** Yellow plate with ink wings. `radius` 0 gives a full-bleed tile. */
const icon = (size, radius, inset) => `<!doctype html><html><head><style>${base}
  body { width: ${size}px; height: ${size}px; }
  .tile { width: ${size}px; height: ${size}px; border-radius: ${radius}px; background: ${SIGN}; display: grid; place-items: center; }
  .wings { width: ${size - inset * 2}px; height: ${size - inset * 2}px; }
</style></head><body><div class="tile"><span class="wings"></span></div></body></html>`;

/** Packs PNG buffers into a .ico (PNG-compressed entries, Vista+). */
function toIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  let offset = 6 + entries.length * 16;
  const dir = entries.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });
  return Buffer.concat([header, ...dir, ...entries.map((e) => e.png)]);
}

const browser = await chromium.launch();
async function render(html, width, height, transparent = false) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ omitBackground: transparent, type: "png" });
  await page.close();
  return png;
}

writeFileSync(join(root, "public/og-wayfinder.png"), await render(og, 1200, 630));
writeFileSync(join(root, "src/app/icon.png"), await render(icon(512, 112, 70), 512, 512, true));
writeFileSync(join(root, "src/app/apple-icon.png"), await render(icon(180, 0, 26), 180, 180));
const ico = [];
for (const size of [16, 32, 48]) {
  ico.push({ size, png: await render(icon(size, Math.round(size * 0.2), Math.max(1, Math.round(size * 0.1))), size, size, true) });
}
writeFileSync(join(root, "src/app/favicon.ico"), toIco(ico));
await browser.close();
console.log("✓ Rendered og-wayfinder.png, icon.png, apple-icon.png and favicon.ico");
