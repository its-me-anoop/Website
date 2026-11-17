/** Render the studio and healthcare social cards using the website's local assets. */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const asset = (path, type) => `data:${type};base64,${readFileSync(new URL(path, root)).toString("base64")}`;
const archivo = asset("src/fonts/archivo-latin-var.woff2", "font/woff2");
const newsreader = asset("src/fonts/newsreader-italic-latin.woff2", "font/woff2");
const wing = asset("public/studio/tidal-wing.webp", "image/webp");

const cards = [
  { file: "og-flutterly.png", heading: "Digital by", italic: "nature.", subject: "Independent digital studio" },
  { file: "og-healthcare.png", heading: "Websites for", italic: "healthcare.", subject: "GP practices and care homes" },
];
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const card of cards) {
    await page.setContent(`<!doctype html><html lang="en"><style>
      @font-face { font-family:Archivo; src:url(${archivo}); font-weight:100 900 }
      @font-face { font-family:Newsreader; src:url(${newsreader}); font-style:italic }
      * { box-sizing:border-box }
      body { margin:0; height:630px; padding:48px 58px; display:flex; flex-direction:column; color:#f7f7f1;
        font:20px Archivo,sans-serif; background:linear-gradient(90deg,rgba(3,18,20,.68),transparent 70%),url(${wing}) center/cover }
      header {font-size:34px; font-weight:650; letter-spacing:-.065em}
      main {margin-top:auto}
      p,footer {font-size:15px; letter-spacing:.1em; text-transform:uppercase}
      h1 {font-weight:430; font-size:110px; line-height:.92; letter-spacing:-.075em; margin:22px 0 30px}
      em {display:block; font:italic 115px/1 Newsreader,serif; letter-spacing:-.065em}
      footer {border-top:1px solid #93a6a1; padding-top:16px}
    </style><header>Flutterly</header><main><p>${card.subject}</p><h1>${card.heading} <em>${card.italic}</em></h1></main><footer>Reading, UK · flutterly.co.uk</footer></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({path:fileURLToPath(new URL(`public/${card.file}`,root))});
  }
} finally {
  await browser.close();
}
