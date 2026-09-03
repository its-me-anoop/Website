import { accessibilityChecks } from "./checks/accessibility";
import { contentChecks } from "./checks/content";
import type { AuditContext } from "./checks/context";
import { localChecks } from "./checks/local";
import { mobileChecks } from "./checks/mobile";
import { performanceChecks } from "./checks/performance";
import { securityChecks } from "./checks/security";
import { seoChecks } from "./checks/seo";
import { safeFetch, tryFetch } from "./fetch";
import { parsePage, rootDomain } from "./page";
import { buildCategories, gradeFor, overallScore, prioritise, verdictFor } from "./score";
import { AuditError, type AuditReport, type Check } from "./types";
import { normaliseUrl } from "./url";

const modules = [
  accessibilityChecks,
  performanceChecks,
  seoChecks,
  contentChecks,
  mobileChecks,
  securityChecks,
  localChecks,
];

/**
 * Runs the whole audit for one address. Throws `AuditError` for every
 * expected failure (bad address, unreachable site, not a web page) so
 * the API can map it to a status code and a plain-English message.
 */
export async function runAudit(input: string): Promise<AuditReport> {
  const url = normaliseUrl(input);

  let fetched;
  try {
    fetched = await safeFetch(url.toString());
  } catch (err) {
    /* A bare https guess that fails to connect may simply be an http-only
       site; try once more before giving up. */
    if (err instanceof AuditError && err.code === "unreachable" && url.protocol === "https:" && !/^https?:\/\//i.test(input.trim())) {
      const httpUrl = new URL(url.toString());
      httpUrl.protocol = "http:";
      fetched = await safeFetch(httpUrl.toString());
    } else {
      throw err;
    }
  }

  if (fetched.status >= 400) {
    throw new AuditError(
      "http_error",
      fetched.status === 403 || fetched.status === 429
        ? `The site refused an automated visit (status ${fetched.status}). Some firewalls block audit tools; the written audit can still review it.`
        : fetched.status === 404
          ? "That page does not exist (404). Check the address, or try the homepage."
          : fetched.status >= 500
            ? `The site's server returned an error (status ${fetched.status}). It may be down right now.`
            : `The site answered with status ${fetched.status}.`,
      fetched.status
    );
  }

  const contentType = (fetched.headers.get("content-type") ?? "").toLowerCase();
  const looksHtml = /text\/html|application\/xhtml/.test(contentType) || /^\s*<(!doctype|html)/i.test(fetched.body.slice(0, 500));
  if (!looksHtml) {
    throw new AuditError(
      "not_html",
      `That address returned ${contentType.split(";")[0] || "something that is not a web page"}. Enter the address of a web page.`
    );
  }

  const page = parsePage(fetched);
  const origin = page.url.origin;

  const [robots, sitemap, httpProbe, favicon] = await Promise.all([
    tryFetch(`${origin}/robots.txt`, { accept: "text/plain,*/*;q=0.8" }),
    tryFetch(`${origin}/sitemap.xml`, { accept: "application/xml,text/xml,*/*;q=0.8" }),
    page.url.protocol === "https:"
      ? tryFetch(`http://${page.url.host}/`, { follow: false, method: "HEAD", timeoutMs: 5000 })
      : Promise.resolve(null),
    page.links.some((l) => /(^|\s)(icon|shortcut icon|apple-touch-icon)(\s|$)/.test(l.rel))
      ? Promise.resolve(null)
      : tryFetch(`${origin}/favicon.ico`, { method: "HEAD", timeoutMs: 4000 }),
  ]);

  const ctx: AuditContext = { page, robots, sitemap, httpProbe, favicon };

  const checks: Check[] = [];
  for (const run of modules) {
    try {
      checks.push(...run(ctx));
    } catch (err) {
      /* One misbehaving check must never sink the whole report. */
      console.error("[audit] check module failed", err);
    }
  }

  const categories = buildCategories(checks);
  const score = overallScore(categories);
  const totals = { checks: 0, pass: 0, warn: 0, fail: 0, info: 0 };
  for (const c of checks) {
    totals.checks++;
    totals[c.status]++;
  }

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    page: {
      requestedUrl: url.toString(),
      finalUrl: fetched.finalUrl,
      host: page.url.host,
      status: fetched.status,
      redirects: fetched.redirects,
      title: page.title,
      description: page.metas.get("description") ?? null,
      lang: page.root.querySelector("html")?.getAttribute("lang") ?? null,
      ttfbMs: fetched.ttfbMs,
      totalMs: fetched.totalMs,
      htmlBytes: fetched.bytes,
      wordCount: page.words.length,
      imageCount: page.images.length,
      scriptCount: page.scripts.filter((s) => s.getAttribute("src")).length,
      stylesheetCount: page.stylesheets.length,
      externalDomains: page.externalDomains,
      platform: page.platform,
      https: page.url.protocol === "https:",
      clientRendered: page.clientRendered,
      crossSiteRedirect: rootDomain(url.hostname) !== rootDomain(page.url.hostname),
    },
    sector: page.sector,
    score,
    grade: gradeFor(score),
    verdict: verdictFor(score, page.sector),
    categories,
    priorities: prioritise(checks),
    totals,
  };
}
