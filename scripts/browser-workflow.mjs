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
  "/services",
  "/business-email",
  "/social-media-marketing",
  "/packages",
  "/free-audit",
  "/book",
  "/book/intro-call",
  "/book/consultation",
  "/book/project-scoping",
  "/accessibility",
  "/cookie-policy",
  "/demo/gp-practice",
  "/demo/gp-practice/appointments",
  "/demo/gp-practice/prescriptions",
  "/demo/gp-practice/services",
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

  const consent = page.getByRole("region", { name: /cookie preferences/i });
  if (!(await consent.isVisible().catch(() => false))) {
    note("home", "cookie preference notice is not visible on a first visit");
  } else {
    for (const label of ["Accept all", "Reject non-essential", "Manage preferences"]) {
      if (!(await consent.getByRole("button", { name: label }).isVisible().catch(() => false))) {
        note("home", `cookie control is missing: ${label}`);
      }
    }
    await consent.getByRole("button", { name: "Manage preferences" }).click();
    const essential = page.getByRole("checkbox", { name: /Essential/i });
    if (!(await essential.isChecked().catch(() => false)) || !(await essential.isDisabled().catch(() => false))) {
      note("home", "essential cookie category is not fixed on");
    }
    await page.getByRole("button", { name: "Reject non-essential" }).click();
    const storedConsent = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("flutterly.cookieConsent") || "{}")
    );
    if (storedConsent.analytics !== false || storedConsent.marketing !== false) {
      note("home", "reject non-essential did not persist both optional categories as false");
    }
    if (!(await page.getByRole("button", { name: "Cookie settings" }).isVisible().catch(() => false))) {
      note("home", "cookie settings cannot be reopened after a decision");
    }
    const cookies = await mobile.cookies(BASE);
    if (cookies.length) note("home", `expected no site cookies, found ${cookies.map((cookie) => cookie.name).join(", ")}`);
  }

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
    await menu.locator('a[href="/services"]').click();
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

// The booking journey. Availability defaults to CLOSED, so first verify the
// paused state, then open windows through the owner admin API (what
// /book/manage does), book the first open slot, and close availability
// again. Exercises the paused UX, the admin platform, the availability API
// and the booking store end to end. Needs BOOKING_ADMIN_TOKEN on the server.
const putAvailability = (token, weeklyWindows) =>
  fetch(BASE + "/api/booking/admin/availability", {
    method: "PUT",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      timeZone: "Europe/London",
      weeklyWindows,
      minNoticeHours: 18,
      horizonDays: 60,
      bufferMinutes: 15,
    }),
  }).then((response) => response.status);

const bookingJourney = await browser.newContext({ viewport: { width: 1280, height: 900 } });
{
  const page = await bookingJourney.newPage();
  await page.goto(BASE + "/book/consultation", { waitUntil: "networkidle" });
  const pausedShown = await page
    .getByRole("heading", { name: /booking is paused/i })
    .isVisible()
    .catch(() => false);
  if (!pausedShown) {
    note("booking journey", "scheduler did not show the paused state while no availability is configured");
  }

  const adminToken = process.env.BOOKING_ADMIN_TOKEN;
  if (!adminToken) {
    console.log("• Booking journey ran the paused check only: BOOKING_ADMIN_TOKEN is not set");
  } else {
  const opened = await putAvailability(
    adminToken,
    [1, 2, 3, 4, 5, 6, 7].map((day) => ({ day, start: "09:00", end: "17:00" }))
  );
  if (opened !== 200) note("booking journey", `admin availability PUT failed with status ${opened}`);

  await page.goto(BASE + "/book", { waitUntil: "networkidle" });
  await page
    .locator('article:has-text("Consultation")')
    .getByRole("link", { name: "Pick a time" })
    .click();
  await page.waitForURL(/\/book\/consultation/);

  // Day buttons carry aria-pressed; an enabled one means slots exist. The
  // current month can be legitimately empty near its end, so try the next.
  const openDay = page.locator("button[aria-pressed]:not([disabled])").first();
  try {
    await openDay.waitFor({ timeout: 15000 });
  } catch {
    await page.getByRole("button", { name: "Next month" }).click();
    await openDay.waitFor({ timeout: 15000 }).catch(() => {
      note("booking journey", "no bookable day appeared in two months of availability");
    });
  }
  if (await openDay.isVisible().catch(() => false)) {
    await openDay.click();
    const slot = page.locator('div[aria-busy="false"] button').first();
    await slot.waitFor({ timeout: 10000 });
    await slot.click();

    await page.getByLabel("Your name").fill("Browser Workflow");
    await page.getByLabel("Email address").fill("browser-workflow@example.com");
    await page.getByLabel("Anything worth knowing").fill("Automated CI journey booking.");
    await page.getByRole("button", { name: "Confirm booking" }).click();

    const confirmed = await page
      .getByRole("heading", { name: /booked in/i })
      .waitFor({ timeout: 15000 })
      .then(() => true)
      .catch(() => false);
    if (!confirmed) {
      note("booking journey", "submitting the booking form did not reach the confirmation");
    } else {
      const body = await page.textContent("body");
      if (!/FL-[2-9A-HJKMNP-Z]{8}/.test(body ?? "")) {
        note("booking journey", "the confirmation did not show a booking reference");
      }
      const icsHref = await page
        .getByRole("link", { name: /Add to calendar/ })
        .getAttribute("href")
        .catch(() => null);
      if (!icsHref?.startsWith("data:text/calendar")) {
        note("booking journey", "the confirmation did not offer an .ics calendar file");
      }
    }
  }

  // Close the diary again so the audit leaves availability as it found it.
  const closed = await putAvailability(adminToken, []);
  if (closed !== 200) note("booking journey", `closing availability failed with status ${closed}`);
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
