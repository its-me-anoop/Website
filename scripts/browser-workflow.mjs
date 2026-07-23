/**
 * Dynamic browser test workflow.
 *
 * Drives headless Chromium over every route at mobile and desktop viewports and
 * reports console errors, failed requests, broken images, overflow, missing
 * anchor targets, heading problems, reduced-motion issues and 404 behaviour.
 * It also exercises the redesigned homepage navigation, project grid and
 * contact route, and checks that key mobile content stays inside the viewport.
 *
 * Usage:
 *   1. npm run build && PORT=3100 npm start
 *   2. BASE_URL=http://localhost:3100 npm run test:browser
 */
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const ROUTES = [
  "/",
  "/gp-websites",
  "/care-home-websites",
  "/packages",
  "/free-audit",
  "/accessibility",
  "/demo/gp-practice",
  "/demo/gp-practice/appointments",
  "/demo/gp-practice/prescriptions",
  "/demo/gp-practice/services",
  "/demo/gp-practice/team",
  "/demo/gp-practice/practice-information",
  "/demo/gp-practice/contact",
  "/demo/gp-practice/accessibility",
  "/demo/care-home",
  "/demo/care-home/life",
  "/demo/care-home/families",
  "/demo/care-home/careers",
  "/demo/care-home/contact",
  "/demo/care-home/accessibility",
  "/projects/sipli",
  "/projects/artling",
  "/projects/sipli/privacy-policy",
  "/projects/artling/privacy-policy",
  "/little-artist/privacy-policy",
];

const problems = [];
const note = (route, message) => problems.push(`[${route}] ${message}`);

async function auditPage(context, route, label = route) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failed = [];
  const bad = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) =>
    failed.push(`${request.url()} :: ${request.failure()?.errorText}`)
  );
  page.on("response", (response) => {
    if (response.status() >= 400) bad.push(`${response.status()} ${response.url()}`);
  });

  try {
    const response = await page.goto(BASE + route, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    if (response && response.status() >= 400) note(label, `status ${response.status()}`);
    await page.waitForTimeout(700);

    const data = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
      const brokenHash = [...document.querySelectorAll('a[href^="#"]')]
        .map((anchor) => anchor.getAttribute("href"))
        .filter(
          (href) =>
            href && href.length > 1 && !ids.includes(decodeURIComponent(href.slice(1)))
        );
      const broken = [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src);

      return {
        brokenHash: [...new Set(brokenHash)],
        broken,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: document.querySelectorAll("h1").length,
        hasMain: ids.includes("main"),
      };
    });

    if (data.brokenHash.length)
      note(label, `broken anchor targets: ${data.brokenHash.join(", ")}`);
    if (data.broken.length) note(label, `broken images: ${data.broken.join(", ")}`);
    if (data.overflow > 1) note(label, `horizontal overflow ${data.overflow}px`);
    if (data.h1 !== 1) note(label, `expected 1 <h1>, found ${data.h1}`);
    if (!data.hasMain) note(label, "missing #main (skip-link target)");
    if (consoleErrors.length)
      note(label, `console errors: ${consoleErrors.slice(0, 3).join(" | ")}`);
    if (pageErrors.length) note(label, `page errors: ${pageErrors.join(" | ")}`);
    if (failed.length)
      note(label, `failed requests: ${failed.slice(0, 3).join(" | ")}`);
    if (bad.length) note(label, `bad responses: ${bad.slice(0, 5).join(" | ")}`);
  } catch (error) {
    note(label, `FATAL ${error.message || error}`);
  }

  await page.close();
}

const browser = await chromium.launch();

for (const [label, options] of [
  ["mobile", { ...devices["iPhone 13"] }],
  ["desktop", { viewport: { width: 1440, height: 900 } }],
]) {
  const context = await browser.newContext(options);
  for (const route of ROUTES) await auditPage(context, route, `${label} ${route}`);
  await context.close();
}

const mobile = await browser.newContext({ ...devices["iPhone 13"] });
{
  const page = await mobile.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const headlineVisible = await page.locator("h1").isVisible().catch(() => false);
  if (!headlineVisible) note("home", "hero headline is not visible");

  const clippedElements = await page.evaluate(() => {
    const tolerance = 1;
    const selectors = "header a, header button, #top h1, #top p, #top a";
    return [...document.querySelectorAll(selectors)]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.width > 0 &&
          (rect.left < -tolerance || rect.right > window.innerWidth + tolerance)
        );
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const label = element.textContent?.trim().replace(/\s+/g, " ").slice(0, 60);
        return `${element.tagName.toLowerCase()} "${label}" (${Math.round(
          rect.left
        )}..${Math.round(rect.right)} of ${window.innerWidth})`;
      });
  });
  if (clippedElements.length)
    note("home", `mobile elements outside viewport: ${clippedElements.join(" | ")}`);

  const projects = await page.locator("[data-project-card]").count();
  if (projects !== 6) note("home", `expected 6 project cards, found ${projects}`);

  await page.getByRole("button", { name: /open menu/i }).click();
  const menu = page.getByRole("navigation", { name: /mobile/i });
  if (!(await menu.isVisible().catch(() => false))) {
    note("home", "mobile navigation did not open");
  } else {
    await menu.locator('a[href="/#services"]').click();
    await page.waitForTimeout(250);
    if (await menu.isVisible().catch(() => false))
      note("home", "mobile navigation did not close after selecting a link");
  }

  const contact = page.locator('a[href^="mailto:"]').first();
  if (!(await contact.isVisible().catch(() => false)))
    note("home", "contact email link is not visible");

  await page.close();

  const missing = await mobile.newPage();
  const response = await missing.goto(BASE + "/__definitely_missing__", {
    waitUntil: "networkidle",
  });
  if (response.status() !== 404) note("404", `expected 404, got ${response.status()}`);
  await missing.close();
}
await mobile.close();

const reducedMotion = await browser.newContext({
  reducedMotion: "reduce",
  ...devices["iPhone 13"],
});
for (const route of ["/", "/gp-websites", "/packages", "/projects/sipli", "/projects/artling"]) {
  const page = await reducedMotion.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  const visible = await page.locator("h1").isVisible().catch(() => false);
  if (!visible) note(`reduced-motion ${route}`, "h1 is not visible");
  await page.close();
}
await reducedMotion.close();

await browser.close();

if (problems.length) {
  console.error(
    `\n✖ ${problems.length} issue(s) found:\n` +
      problems.map((problem) => `  - ${problem}`).join("\n")
  );
  process.exit(1);
}

console.log(
  "✓ Browser workflow passed — routes, interactions, viewport bounds and accessibility anchors are clean."
);
