/**
 * axe-core accessibility audit (WCAG 2.2 A/AA) over every route, at
 * mobile and desktop viewports.
 *
 * Usage:
 *   1. npm run build && PORT=3100 npm start
 *   2. BASE_URL=http://localhost:3100 npm run test:a11y
 */
import { createRequire } from "node:module";
import { chromium, devices } from "playwright";

const require = createRequire(import.meta.url);
const axeSource = require("fs").readFileSync(
  require.resolve("axe-core/axe.min.js"),
  "utf8"
);

const BASE = process.env.BASE_URL || "http://localhost:3100";
const ROUTES = [
  "/",
  "/gp-websites",
  "/care-home-websites",
  "/packages",
  "/about",
  "/contact",
  "/book",
  "/book/project-scoping",
  "/free-audit",
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
  "/projects/artling",
];

/** WCAG 2.x A/AA only — the legal floor; best-practice rules stay advisory. */
const RUN_OPTIONS = {
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
  },
};

const problems = [];
const browser = await chromium.launch();

for (const [label, options] of [
  ["mobile-320", { viewport: { width: 320, height: 740 } }],
  ["mobile", { ...devices["iPhone 13"] }],
  ["desktop", { viewport: { width: 1440, height: 900 } }],
]) {
  const context = await browser.newContext(options);
  for (const route of ROUTES) {
    const page = await context.newPage();
    try {
      const response = await page.goto(BASE + route, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      if (!response?.ok()) {
        throw new Error(`route returned ${response?.status() ?? "no response"}`);
      }
      if (new URL(page.url()).pathname !== route) {
        throw new Error(`route resolved to ${new URL(page.url()).pathname}`);
      }
      await page.addScriptTag({ content: axeSource });
      const results = await page.evaluate(
        (runOptions) => window.axe.run(document, runOptions),
        RUN_OPTIONS
      );
      for (const violation of results.violations) {
        const targets = violation.nodes
          .slice(0, 3)
          .map((node) => node.target.join(" "))
          .join(" | ");
        problems.push(
          `[${label} ${route}] ${violation.id} (${violation.impact}): ` +
            `${violation.help} — ${violation.nodes.length} node(s): ${targets}`
        );
      }
    } catch (error) {
      problems.push(`[${label} ${route}] FATAL ${error.message || error}`);
    }
    await page.close();
  }
  await context.close();
}

await browser.close();

if (problems.length) {
  console.error(
    `\n✖ ${problems.length} accessibility issue(s):\n` +
      problems.map((problem) => `  - ${problem}`).join("\n")
  );
  process.exit(1);
}

console.log(`✓ axe-core WCAG 2.2 A/AA audit passed on ${ROUTES.length} routes × 3 viewports.`);
