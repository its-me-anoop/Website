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
const baseHostname = new URL(BASE).hostname;
if (!["localhost", "127.0.0.1", "::1", "[::1]"].includes(baseHostname)) {
  throw new Error(
    `Browser workflow is restricted to loopback hosts; received ${baseHostname}.`,
  );
}
const ROUTES = [
  "/",
  "/gp-websites",
  "/care-home-websites",
  "/services",
  "/business-email",
  "/social-media-marketing",
  "/packages",
  "/about",
  "/contact",
  "/free-audit",
  "/book",
  "/accessibility",
  "/cookie-policy",
  "/privacy",
  "/demo/gp-practice",
  "/demo/gp-practice/appointments",
  "/demo/gp-practice/prescriptions",
  "/demo/gp-practice/services",
  "/demo/gp-practice/register",
  "/demo/gp-practice/team",
  "/demo/gp-practice/practice-information",
  "/demo/gp-practice/contact",
  "/demo/gp-practice/accessibility",
  "/cms",
  "/cms/willowbrook",
  "/cms/willowbrook/pages",
  "/cms/meadow-view/notices",
  "/practice/willowbrook",
  "/practice/meadow-view",
  "/practice/kingsway",
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
  page.on("requestfailed", (request) => {
    const reason = request.failure()?.errorText;
    // Aborted requests are routine (e.g. RSC prefetches cancelled when the
    // page closes), not user-visible failures.
    if (reason === "net::ERR_ABORTED") return;
    failed.push(`${request.url()} :: ${reason}`);
  });
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

  // Studio routes intentionally suppress the floating cookie chip. Exercise
  // consent controls on a Bloom page that still shows the banner.
  {
    const bloom = await mobile.newPage();
    await bloom.goto(BASE + "/free-audit", { waitUntil: "networkidle" });
    const consent = bloom.getByRole("region", { name: /cookie preferences/i });
    if (!(await consent.isVisible().catch(() => false))) {
      note("free-audit", "cookie preference notice is not visible on a first visit");
    } else {
      for (const label of ["Accept all", "Reject non-essential", "Manage preferences"]) {
        if (!(await consent.getByRole("button", { name: label }).isVisible().catch(() => false))) {
          note("free-audit", `cookie control is missing: ${label}`);
        }
      }
      await consent.getByRole("button", { name: "Manage preferences" }).click();
      const essential = bloom.getByRole("checkbox", { name: /Essential/i });
      if (!(await essential.isChecked().catch(() => false)) || !(await essential.isDisabled().catch(() => false))) {
        note("free-audit", "essential cookie category is not fixed on");
      }
      await bloom.getByRole("button", { name: "Reject non-essential" }).click();
      const storedConsent = await bloom.evaluate(() =>
        JSON.parse(localStorage.getItem("flutterly.cookieConsent") || "{}")
      );
      if (storedConsent.analytics !== false || storedConsent.marketing !== false) {
        note("free-audit", "reject non-essential did not persist both optional categories as false");
      }
      if (!(await bloom.getByRole("button", { name: "Cookie settings" }).isVisible().catch(() => false))) {
        note("free-audit", "cookie settings cannot be reopened after a decision");
      }
      const cookies = await mobile.cookies(BASE);
      if (cookies.length) note("free-audit", `expected no site cookies, found ${cookies.map((cookie) => cookie.name).join(", ")}`);
    }
    await bloom.close();
  }

  const clippedElements = await page.evaluate(() => {
    const tolerance = 1;
    const selectors =
      "header a, header button, main h1, main h2, main p, main a, main button, [data-project-card]";
    return [...document.querySelectorAll(selectors)]
      .filter((element) => !element.closest("[data-marquee]"))
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

  const homeGrain = await page.locator("[data-hero-grain]").count();
  if (homeGrain !== 1) note("home", `expected a Home hero grain layer, found ${homeGrain}`);

  const contact = page.locator('a[href^="mailto:"]').first();
  if (!(await contact.isVisible().catch(() => false)))
    note("home", "contact email link is not visible");

  await page.getByRole("button", { name: /open menu/i }).click();
  const menu = page.getByRole("navigation", { name: /mobile/i });
  if (!(await menu.isVisible().catch(() => false))) {
    note("home", "mobile navigation did not open");
  } else {
    await menu.locator('a[href="/"]').click();
    await menu.waitFor({ state: "hidden" }).catch(() =>
      note("home", "mobile navigation did not close after selecting a same-route link")
    );
  }

  await page.getByRole("button", { name: /open menu/i }).click();
  await page.keyboard.press("Escape");
  await menu.waitFor({ state: "hidden" }).catch(() =>
    note("home", "mobile navigation did not close with Escape")
  );

  await page.getByRole("button", { name: /open menu/i }).click();
  await menu.locator('a[href="/gp-websites"]').click();
  await page.waitForURL(`${BASE}/gp-websites`);
  if (await page.locator("[data-hero-grain]").count()) {
    note("gp-websites", "hero grain leaked onto a non-Home Field Notes route");
  }

  await page.close();

  for (const route of ["/packages", "/about", "/contact", "/book", "/services", "/care-home-websites"]) {
    const extra = await mobile.newPage();
    await extra.goto(BASE + route, { waitUntil: "networkidle" });
    if (await extra.locator("[data-hero-grain]").count()) {
      note(route, "hero grain leaked onto a non-Home route");
    }
    await extra.close();
  }

  const missing = await mobile.newPage();
  const response = await missing.goto(BASE + "/__definitely_missing__", {
    waitUntil: "networkidle",
  });
  if (response.status() !== 404) note("404", `expected 404, got ${response.status()}`);
  await missing.close();
}
await mobile.close();

// The primary non-technical content path: authenticate, choose a page, save a
// draft, open the protected preview, publish it, and verify the public renderer.
// Demo sign-in is deliberately unavailable against production builds (and
// whenever GP_CMS_AUTH_MODE/GP_CMS_AUTH_SECRET are unset), so the journey runs
// only when the demo form is present; otherwise the secure default is verified.
const cmsJourney = await browser.newContext({ viewport: { width: 1280, height: 900 } });
{
  const page = await cmsJourney.newPage();
  await page.goto(BASE + "/cms/willowbrook/pages", { waitUntil: "networkidle" });
  if (!(await page.getByRole("heading", { name: "Sign in to the CMS" }).isVisible().catch(() => false))) {
    note("cms auth", "an unauthenticated CMS route did not redirect to sign-in");
  }
  const demoAvailable = await page
    .getByLabel("Demo practice")
    .isVisible()
    .catch(() => false);
  if (!demoAvailable) {
    if (
      !(await page
        .getByText(/Organisation sign-in is not configured/i)
        .isVisible()
        .catch(() => false))
    ) {
      note("cms auth", "neither demo sign-in nor the unconfigured explanation rendered");
    }
    console.log(
      "• CMS journey skipped: demo sign-in unavailable here (secure default verified)"
    );
    await page.close();
  } else {
  await page.getByLabel("Demo practice").selectOption("willowbrook");
  await page.getByLabel("Try a role").selectOption("practice_admin");
  await page.getByRole("button", { name: "Start local demo session" }).click();
  await page.waitForURL(/\/cms\/willowbrook\/pages/);
  await page.getByRole("button", { name: /Appointments/ }).click();
  await page.getByLabel("Page title").fill("Appointments at Willowbrook");
  await page.getByRole("button", { name: "Save as draft" }).click();

  const draft = await page.evaluate(() => {
    const raw = localStorage.getItem("flutterly.gp-cms.demo.v1.practice_willowbrook");
    const workspace = raw ? JSON.parse(raw) : null;
    return workspace?.pages?.find((item) => item.slug === "appointments");
  });
  if (draft?.title !== "Appointments at Willowbrook" || draft?.status !== "draft") {
    note("cms journey", "saving the guided page draft did not persist the edited title and draft state");
  }

  const draftPreviewPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Preview", exact: true }).click();
  const draftPreview = await draftPreviewPromise;
  await draftPreview.waitForLoadState("networkidle");
  if (!(await draftPreview.getByRole("heading", { name: "Appointments at Willowbrook" }).isVisible().catch(() => false))) {
    note("cms journey", "draft preview did not render the edited page title");
  }
  if (!(await draftPreview.getByText(/only visible to authorised workspace users/i).isVisible().catch(() => false))) {
    note("cms journey", "draft preview did not explain that the page is private");
  }
  await draftPreview.close();

  await page.getByRole("button", { name: "Publish page" }).click();
  const published = await page.evaluate(() => {
    const raw = localStorage.getItem("flutterly.gp-cms.demo.v1.practice_willowbrook");
    const workspace = raw ? JSON.parse(raw) : null;
    return workspace?.pages?.find((item) => item.slug === "appointments");
  });
  if (published?.status !== "published") {
    note("cms journey", "publishing the edited page did not persist the published state");
  }

  const publicPage = await cmsJourney.newPage();
  await publicPage.goto(BASE + "/practice/willowbrook/appointments", {
    waitUntil: "networkidle",
  });
  if (!(await publicPage.getByRole("heading", { name: "Appointments at Willowbrook" }).isVisible().catch(() => false))) {
    note("cms journey", "published content was not visible in the shared public renderer");
  }
  if (await publicPage.getByText(/only visible to authorised workspace users/i).isVisible().catch(() => false)) {
    note("cms journey", "published page still appeared as a protected CMS preview");
  }
  await publicPage.close();
  await page.close();
  }
}
await cmsJourney.close();

// Exercise the paused, selection and confirmation states without touching the
// configured availability, booking store or notification webhook. Real API and
// persistence behaviour is covered separately by the route and server tests.
const bookingJourney = await browser.newContext({ viewport: { width: 1280, height: 900 } });
{
  // Public /book now opens Olivia's live Cal.com events. Verify card hrefs and
  // deep-link redirects without loading the full Cal.com app in CI.
  const expected = [
    ["Intro call", "https://cal.com/anoop-jose-jtij1j/intro"],
    ["Consultation", "https://cal.com/anoop-jose-jtij1j/consultation"],
    ["Project scoping", "https://cal.com/anoop-jose-jtij1j/project-scoping"],
  ];

  const page = await bookingJourney.newPage();
  await page.goto(BASE + "/book", { waitUntil: "networkidle" });

  for (const [label, url] of expected) {
    const href = await page
      .locator(`article:has-text("${label}")`)
      .getByRole("link", { name: "Pick a time" })
      .getAttribute("href")
      .catch(() => null);
    if (href !== url) {
      note("booking journey", `${label} Pick a time href was ${href ?? "missing"}, expected ${url}`);
    }
  }

  for (const [label, url] of [
    ["/book/intro-call", "https://cal.com/anoop-jose-jtij1j/intro"],
    ["/book/consultation", "https://cal.com/anoop-jose-jtij1j/consultation"],
    ["/book/project-scoping", "https://cal.com/anoop-jose-jtij1j/project-scoping"],
  ]) {
    const response = await bookingJourney.request.get(BASE + label, {
      maxRedirects: 0,
    });
    const location = response.headers()["location"] ?? "";
    const status = response.status();
    if (![301, 302, 303, 307, 308].includes(status) || location !== url) {
      note(
        "booking journey",
        `${label} redirect was ${status} -> ${location || "(none)"}, expected ${url}`,
      );
    }
  }

  await page.close();
}
await bookingJourney.close();

const publicDraft = await browser.newContext({ viewport: { width: 390, height: 844 } });
{
  const page = await publicDraft.newPage();
  const response = await page.goto(BASE + "/practice/willowbrook/unpublished-draft", { waitUntil: "networkidle" });
  if (response?.status() !== 404) note("public draft", "a draft page was reachable from the public site");
  await page.close();
}
await publicDraft.close();

const reducedMotion = await browser.newContext({
  reducedMotion: "reduce",
  ...devices["iPhone 13"],
});
for (const route of [
  "/",
  "/gp-websites",
  "/care-home-websites",
  "/packages",
  "/about",
  "/contact",
]) {
  const page = await reducedMotion.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  const visible = await page.locator("h1").isVisible().catch(() => false);
  if (!visible) note(`reduced-motion ${route}`, "h1 is not visible");
  await page.getByRole("button", { name: /open menu/i }).click();
  const activeMotion = await page.evaluate(() => {
    const hasDuration = (value) =>
      value
        .split(",")
        .map((duration) => duration.trim())
        .some((duration) => {
          const milliseconds = duration.endsWith("ms")
            ? Number.parseFloat(duration)
            : Number.parseFloat(duration) * 1000;
          return milliseconds > 1;
        });

    return [...document.querySelectorAll("[data-flutterly-redesign] *")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return hasDuration(style.animationDuration) || hasDuration(style.transitionDuration);
      })
      .slice(0, 5)
      .map((element) => {
        const style = getComputedStyle(element);
        return `${element.tagName.toLowerCase()} animation=${style.animationDuration} transition=${style.transitionDuration}`;
      });
  });
  if (activeMotion.length) {
    note(
      `reduced-motion ${route}`,
      `active animation or transition remains: ${activeMotion.join(" | ")}`,
    );
  }
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
