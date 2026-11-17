/**
 * Dynamic browser test workflow.
 *
 * Drives headless Chromium over every route at mobile and desktop viewports and
 * reports console errors, failed requests, broken images, overflow, missing
 * anchor targets, heading problems, reduced-motion issues and 404 behaviour.
 * It also exercises the homepage (the sorting table and its switch, the
 * card index, work, the studio badge, the menu and the audit bar), the
 * sample-site tabs on
 * the websites service page, and checks that key mobile content stays
 * inside the viewport.
 *
 * Usage:
 *   1. npm run build && PORT=3100 npm start
 *   2. BASE_URL=http://localhost:3100 npm run test:browser
 */
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const ROUTES = [
  "/",
  "/services",
  "/services/websites",
  "/services/apps",
  "/services/it-support",
  "/services/social-media",
  "/services/seo",
  "/gp-websites",
  "/care-home-websites",
  "/packages",
  "/free-audit",
  "/leaving-msw",
  "/audit",
  "/accessibility",
  "/demo/gp-practice",
  "/demo/gp-practice/appointments",
  "/demo/gp-practice/prescriptions",
  "/demo/gp-practice/services",
  "/demo/gp-practice/register",
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
  "/demo/dental-practice",
  "/demo/dental-practice/fees",
  "/demo/dental-practice/treatments",
  "/demo/dental-practice/new-patients",
  "/demo/dental-practice/urgent",
  "/demo/dental-practice/about",
  "/demo/dental-practice/accessibility",
  "/demo/pharmacy",
  "/demo/pharmacy/pharmacy-first",
  "/demo/pharmacy/services",
  "/demo/pharmacy/prescriptions",
  "/demo/pharmacy/about",
  "/demo/pharmacy/contact",
  "/demo/pharmacy/accessibility",
  "/demo/physio-clinic",
  "/demo/physio-clinic/conditions",
  "/demo/physio-clinic/first-appointment",
  "/demo/physio-clinic/pricing",
  "/demo/physio-clinic/team",
  "/demo/physio-clinic/trust",
  "/demo/physio-clinic/accessibility",
  "/projects/sipli",
  "/projects/little-lifeline",
  "/projects/rotaowl",
  "/projects/streetcrew",
  "/projects/catholic-bible",
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
        /* Safari paints the page background into areas it reserves at
           the sides (landscape, and the iPhone Duo's side toolbar and
           corner camera) and tints its chrome with theme-color, so both
           must match the chalk bar across the top of a Sorted page. */
        sorted: Boolean(document.querySelector(".s-root")),
        pageBackground: getComputedStyle(document.documentElement).backgroundColor,
        themeColor: document.querySelector('meta[name="theme-color"]')?.getAttribute("content") ?? null,
        /* The root clips x-overflow, so a too-wide frame never shows in
           scrollWidth; measure the layout width of each frame instead. */
        wideFrames: [...document.querySelectorAll("figure")]
          .filter((figure) => figure.offsetWidth > window.innerWidth + 1)
          .map((figure) => `${figure.offsetWidth}px`),
        h1: document.querySelectorAll("h1").length,
        hasMain: ids.includes("main"),
      };
    });

    if (data.brokenHash.length)
      note(label, `broken anchor targets: ${data.brokenHash.join(", ")}`);
    if (data.broken.length) note(label, `broken images: ${data.broken.join(", ")}`);
    if (data.overflow > 1) note(label, `horizontal overflow ${data.overflow}px`);
    if (data.sorted) {
      if (data.pageBackground !== "rgb(244, 243, 238)")
        note(label, `page background is ${data.pageBackground}, expected chalk; Safari shows it in side safe areas`);
      if (data.themeColor !== "#f4f3ee") note(label, `theme-color is ${data.themeColor}, expected #f4f3ee`);
    }
    if (data.wideFrames.length)
      note(label, `frames wider than the viewport: ${data.wideFrames.join(", ")}`);
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

/*
 * iPhone Duo (foldable). Apple has not published Safari viewports; these
 * are the hardware resolutions at the usual 3x scale: the 5.4" outer
 * screen when folded, and the near-square 7.6" inner screen open in
 * portrait and landscape. Safari cannot see the fold, it only resizes.
 */
const duo = (width, height) => ({
  viewport: { width, height },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: devices["iPhone 13"].userAgent,
});
const DUO = {
  folded: duo(466, 678),
  open: duo(626, 890),
  openLandscape: duo(890, 626),
};

const browser = await chromium.launch();

for (const [label, options] of [
  ["mobile", { ...devices["iPhone 13"] }],
  ["desktop", { viewport: { width: 1440, height: 900 } }],
  ["duo-folded", DUO.folded],
  ["duo-open", DUO.open],
  ["duo-open-landscape", DUO.openLandscape],
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

  /* Five dividers in the card index, each opening its own page. */
  const rows = await page.locator('#services a[href^="/services/"]').count();
  if (rows !== 5) note("home", `expected 5 service dividers, found ${rows}`);

  /* Client logos are CSS masks, which fail silently, so fetch each one
     and check it has a visible size. */
  const logos = await page.locator("#clients [data-client-logo]").evaluateAll((els) =>
    els.map((el) => ({ src: el.dataset.clientLogo, w: el.getBoundingClientRect().width }))
  );
  if (logos.length !== 6) note("home", `expected 6 client logos, found ${logos.length}`);
  for (const logo of logos) {
    const res = await page.request.get(new URL(logo.src, page.url()).href);
    if (!res.ok()) note("home", `client logo ${logo.src} returned ${res.status()}`);
    if (logo.w < 24) note("home", `client logo ${logo.src} rendered ${logo.w}px wide`);
  }

  const projects = await page.locator("[data-project-card]").count();
  if (projects !== 10) note("home", `expected 10 project cards, found ${projects}`);

  /* The sorting table: the switch must flip it to "as found" and back,
     and every piece must be on screen once sorted. */
  const table = page.locator("#top");
  const toggle = table.getByRole("switch");
  await toggle.click();
  if ((await table.getAttribute("data-state")) !== "mess") note("home", "the switch did not scatter the sorting table");
  await toggle.click();
  await page.waitForTimeout(1600);
  if ((await table.getAttribute("data-state")) !== "sorted") note("home", "the switch did not sort the table again");
  const strays = await page.evaluate(() =>
    [...document.querySelectorAll("#top .sort-piece")]
      .filter((el) => getComputedStyle(el).display !== "none")
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.left < -2 || r.right > innerWidth + 2).length
  );
  if (strays) note("home", `${strays} sorted piece(s) sit outside the viewport`);

  /* The founder's portrait sits on a badge that tilts: it must still be
     painted, unclipped, once scrolled to. */
  /* The badge sways, so it never counts as "stable": scroll by hand. */
  await page.evaluate(() => document.querySelector("#studio figure").scrollIntoView({ block: "center" }));
  await page
    .waitForFunction(() => document.querySelector("#studio figure img[alt]:not([alt=''])")?.naturalWidth > 0, null, { timeout: 15000 })
    .catch(() => {});
  const portrait = await page.evaluate(() => {
    const img = document.querySelector("#studio figure img[alt]:not([alt=''])");
    const r = img?.getBoundingClientRect();
    return r ? { w: r.width, h: r.height, loaded: img.naturalWidth > 0 } : null;
  });
  if (!portrait || portrait.w < 200 || portrait.h < 200 || !portrait.loaded)
    note("home", `founder portrait is not painted at size (${JSON.stringify(portrait)})`);

  await page.getByRole("button", { name: /open menu/i }).click();
  const menu = page.getByRole("navigation", { name: /site menu/i });
  if (!(await menu.isVisible().catch(() => false))) {
    note("home", "site menu did not open");
  } else {
    await menu.locator('a[href="/#work"]').click();
    await page.waitForTimeout(400);
    if (await menu.isVisible().catch(() => false))
      note("home", "site menu did not close after selecting a link");
  }

  const contact = page.locator('a[href^="mailto:"]').first();
  if (!(await contact.isVisible().catch(() => false)))
    note("home", "contact email link is not visible");

  await page.close();

  /* Sample-site tabs on the websites service page: the WAI-ARIA tabs
     pattern. Arrow keys move the selection and focus together, and the
     panel follows. */
  const websites = await mobile.newPage();
  await websites.goto(BASE + "/services/websites", { waitUntil: "networkidle" });
  const tabs = websites.getByRole("tab");
  if ((await tabs.count()) !== 5) {
    note("websites", `expected 5 sample-site tabs, found ${await tabs.count()}`);
  } else {
    await tabs.first().focus();
    await websites.keyboard.press("ArrowRight");
    await websites.waitForTimeout(200);
    const second = tabs.nth(1);
    if ((await second.getAttribute("aria-selected")) !== "true")
      note("websites", "ArrowRight did not select the next sample-site tab");
    if (!(await second.evaluate((el) => el === document.activeElement)))
      note("websites", "ArrowRight did not move focus to the next sample-site tab");
    const panelHref = await websites.getByRole("tabpanel").getByRole("link", { name: /open the sample site/i }).getAttribute("href");
    if (panelHref !== "/demo/care-home") note("websites", `tab panel did not follow the selection (${panelHref})`);
  }
  await websites.close();

  /* The instant audit: the hero form must route to /audit and the report must
     settle into a result or a plain-English error, never a blank page. The
     target is the site's own origin so the run does not depend on the outside
     network being reachable from the test machine. */
  const audit = await mobile.newPage();
  await audit.goto(BASE + "/", { waitUntil: "networkidle" });
  const auditForm = audit.locator('form[action="/audit"]').first();
  if (!(await auditForm.isVisible().catch(() => false))) {
    note("audit", "homepage audit bar is missing");
  } else {
    await auditForm.getByRole("textbox").fill(new URL(BASE).host);
    await auditForm.getByRole("button").click();
    await audit.waitForURL(/\/audit\?url=/, { timeout: 10000 }).catch(() => note("audit", "submitting the audit bar did not reach /audit"));
    const settled = audit.locator('[data-audit-state="done"], [data-audit-state="error"]');
    await settled.first().waitFor({ timeout: 45000 }).catch(() => note("audit", "report never settled into a result or error"));
    const state = await settled.first().getAttribute("data-audit-state").catch(() => null);
    if (state === "done") {
      const dial = audit.getByRole("img", { name: /overall score/i });
      if (!(await dial.isVisible().catch(() => false))) note("audit", "report finished but the score dial is not visible");
      if ((await audit.locator("#next-steps").count()) !== 1) note("audit", "report is missing the next-steps section");
    } else if (state === "error") {
      if (!(await audit.locator('a[href^="mailto:"]').first().isVisible().catch(() => false)))
        note("audit", "error state has no route to the written audit");
    }
  }
  await audit.close();

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
for (const route of ["/", "/services", "/services/seo", "/gp-websites", "/packages", "/projects/sipli", "/projects/artling"]) {
  const page = await reducedMotion.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  const visible = await page.locator("h1").isVisible().catch(() => false);
  if (!visible) note(`reduced-motion ${route}`, "h1 is not visible");
  await page.close();
}
await reducedMotion.close();

/* Folding and unfolding mid-visit: the page must adapt to each screen
   without a reload. */
{
  const context = await browser.newContext(DUO.folded);
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const states = [
    ["unfolded", DUO.open.viewport],
    ["unfolded landscape", DUO.openLandscape.viewport],
    ["folded again", DUO.folded.viewport],
  ];
  for (const [state, size] of states) {
    await page.setViewportSize(size);
    await page.waitForTimeout(600);
    const r = await page.evaluate(() => {
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        wide: [...document.querySelectorAll("figure")].filter((f) => f.offsetWidth > innerWidth + 1).length,
        h1: (() => {
          const b = document.querySelector("h1")?.getBoundingClientRect();
          return b ? b.left >= -1 && b.right <= innerWidth + 1 && b.width > 0 : false;
        })(),
      };
    });
    if (r.overflow > 1) note(`duo ${state}`, `horizontal overflow ${r.overflow}px`);
    if (r.wide) note(`duo ${state}`, `${r.wide} frame(s) wider than the viewport`);
    if (!r.h1) note(`duo ${state}`, "hero headline is not fully on screen");
  }
  await context.close();
}

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
