/**
 * Dynamic browser test workflow.
 *
 * Drives a headless Chromium over every route at mobile + desktop viewports and
 * reports anything not working as expected:
 *   - console errors, uncaught page errors
 *   - failed network requests / responses >= 400
 *   - broken images (loaded but 0 natural width)
 *   - horizontal overflow
 *   - in-page anchors whose target id is missing (incl. the #main skip link)
 *   - reduced-motion render (content must not be stuck hidden)
 *   - the 404 page
 * It also exercises the mobile nav menu and the homepage hero tabs.
 *
 * Usage:
 *   1. npm run build && PORT=3100 npm start   (or any running instance)
 *   2. BASE_URL=http://localhost:3100 npm run test:browser
 *
 * Requires the `playwright` dev dependency and a Chromium install
 * (`npx playwright install chromium`). Exits non-zero if any issue is found.
 */
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const ROUTES = [
  "/",
  "/projects/sipli",
  "/projects/artling",
  "/projects/sipli/privacy-policy",
  "/projects/artling/privacy-policy",
  "/little-artist/privacy-policy",
];

const problems = [];
const note = (route, msg) => problems.push(`[${route}] ${msg}`);

async function auditPage(context, route, label = route) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failed = [];
  const bad = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => pageErrors.push(e.message));
  page.on("requestfailed", (r) => failed.push(`${r.url()} :: ${r.failure()?.errorText}`));
  page.on("response", (res) => res.status() >= 400 && bad.push(`${res.status()} ${res.url()}`));

  try {
    const resp = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
    if (resp && resp.status() >= 400) note(label, `status ${resp.status()}`);
    await page.waitForTimeout(1000);

    const data = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
      const brokenHash = [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h && h.length > 1 && !ids.includes(decodeURIComponent(h.slice(1))));
      const broken = [...document.images]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src);
      return {
        brokenHash: [...new Set(brokenHash)],
        broken,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: document.querySelectorAll("h1").length,
        hasMain: ids.includes("main"),
      };
    });
    if (data.brokenHash.length) note(label, `broken anchor targets: ${data.brokenHash.join(", ")}`);
    if (data.broken.length) note(label, `broken images: ${data.broken.join(", ")}`);
    if (data.overflow > 1) note(label, `horizontal overflow ${data.overflow}px`);
    if (data.h1 !== 1) note(label, `expected 1 <h1>, found ${data.h1}`);
    if (!data.hasMain) note(label, `missing #main (skip-link target)`);
    if (consoleErrors.length) note(label, `console errors: ${consoleErrors.slice(0, 3).join(" | ")}`);
    if (pageErrors.length) note(label, `page errors: ${pageErrors.join(" | ")}`);
    if (failed.length) note(label, `failed requests: ${failed.slice(0, 3).join(" | ")}`);
    if (bad.length) note(label, `bad responses: ${bad.slice(0, 5).join(" | ")}`);
  } catch (e) {
    note(label, `FATAL ${e.message || e}`);
  }
  await page.close();
}

const browser = await chromium.launch();

for (const [label, opts] of [
  ["mobile", { ...devices["iPhone 13"] }],
  ["desktop", { viewport: { width: 1440, height: 900 } }],
]) {
  const ctx = await browser.newContext(opts);
  for (const r of ROUTES) await auditPage(ctx, r, `${label} ${r}`);
  await ctx.close();
}

// Interactions + 404 + reduced motion
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
{
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  // Wait out the once-per-session preloader curtain before interacting.
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: /open menu/i }).click();
  await page.waitForTimeout(700);
  if (!(await page.getByRole("navigation", { name: /mobile/i }).isVisible().catch(() => false)))
    note("home", "mobile nav menu did not open");
  await page.getByRole("button", { name: /close menu/i }).click();
  await page.waitForTimeout(700);

  // Services accordion: second row should expand on tap and collapse the first.
  {
    const rows = page.locator('#services button[aria-expanded]');
    const count = await rows.count();
    if (count < 4) note("home", `expected 4 service rows, found ${count}`);
    else {
      await rows.nth(1).scrollIntoViewIfNeeded();
      await rows.nth(1).click();
      await page.waitForTimeout(500);
      if ((await rows.nth(1).getAttribute("aria-expanded")) !== "true")
        note("home", "service row 2 did not expand");
      if ((await rows.nth(0).getAttribute("aria-expanded")) !== "false")
        note("home", "service row 1 did not collapse");
    }
  }
  await page.close();

  const p404 = await ctx.newPage();
  const r404 = await p404.goto(BASE + "/__definitely_missing__", { waitUntil: "networkidle" });
  if (r404.status() !== 404) note("404", `expected 404, got ${r404.status()}`);
  await p404.close();
}
await ctx.close();

const rm = await browser.newContext({ reducedMotion: "reduce", ...devices["iPhone 13"] });
for (const r of ["/", "/projects/sipli", "/projects/artling"]) {
  const page = await rm.newPage();
  await page.goto(BASE + r, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const ok = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    return h1 && getComputedStyle(h1).opacity === "1";
  });
  if (!ok) note(`reduced-motion ${r}`, "h1 not visible (stuck hidden)");
  await page.close();
}
await rm.close();

await browser.close();

if (problems.length) {
  console.error(`\n✖ ${problems.length} issue(s) found:\n` + problems.map((p) => "  - " + p).join("\n"));
  process.exit(1);
}
console.log("✓ Browser workflow passed — all routes, interactions, and a11y anchors clean.");
