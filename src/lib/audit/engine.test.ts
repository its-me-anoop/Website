import { describe, expect, it } from "vitest";
import { accessibilityChecks } from "./checks/accessibility";
import { contentChecks } from "./checks/content";
import type { AuditContext } from "./checks/context";
import { localChecks } from "./checks/local";
import { mobileChecks } from "./checks/mobile";
import { performanceChecks } from "./checks/performance";
import { securityChecks } from "./checks/security";
import { seoChecks } from "./checks/seo";
import type { FetchedPage } from "./fetch";
import { detectSector, parsePage, rootDomain } from "./page";
import { buildCategories, gradeFor, overallScore, prioritise, scoreChecks } from "./score";
import type { Check } from "./types";

/* ─── fixtures ─────────────────────────────────────────────── */

function fetched(body: string, overrides: Partial<FetchedPage> = {}, headers: Record<string, string> = {}): FetchedPage {
  return {
    requestedUrl: "https://www.willowbrook-surgery.nhs.uk/",
    finalUrl: "https://www.willowbrook-surgery.nhs.uk/",
    status: 200,
    headers: new Headers({ "content-type": "text/html; charset=utf-8", ...headers }),
    body,
    bytes: Buffer.byteLength(body),
    redirects: [],
    ttfbMs: 120,
    totalMs: 180,
    truncated: false,
    ...overrides,
  };
}

function context(page: FetchedPage, extra: Partial<AuditContext> = {}): AuditContext {
  return {
    page: parsePage(page),
    robots: null,
    sitemap: null,
    httpProbe: null,
    favicon: null,
    ...extra,
  };
}

function byId(checks: Check[], id: string): Check {
  const found = checks.find((c) => c.id === id);
  if (!found) throw new Error(`no check ${id} in ${checks.map((c) => c.id).join(", ")}`);
  return found;
}

const GOOD_GP = `<!doctype html>
<html lang="en-GB"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Willowbrook Surgery | GP practice in Reading, Berkshire</title>
<meta name="description" content="Book appointments, order repeat prescriptions and register with Willowbrook Surgery, an NHS GP practice in Reading. Open Monday to Friday 8am to 6.30pm.">
<link rel="canonical" href="https://www.willowbrook-surgery.nhs.uk/">
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#005eb8">
<meta property="og:title" content="Willowbrook Surgery"><meta property="og:description" content="GP practice in Reading"><meta property="og:image" content="https://www.willowbrook-surgery.nhs.uk/og.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MedicalClinic","name":"Willowbrook Surgery","telephone":"0118 496 0000","address":{"@type":"PostalAddress","streetAddress":"1 Willow Road","addressLocality":"Reading","postalCode":"RG1 1AA"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":"Monday","opens":"08:00","closes":"18:30"}],"geo":{"@type":"GeoCoordinates","latitude":51.45,"longitude":-0.97}}</script>
<script src="/app.js" defer></script>
<link rel="stylesheet" href="/site.css">
</head><body>
<a href="#main">Skip to main content</a>
<nav aria-label="Primary"><a href="/appointments">Book an appointment</a> <a href="/prescriptions">Repeat prescriptions</a> <a href="/register">Register as a new patient</a> <a href="/services">Services</a> <a href="/team">Our team</a> <a href="/contact">Contact us</a></nav>
<main id="main">
<h1>Willowbrook Surgery</h1>
<p>A friendly NHS GP surgery in Reading. Book an appointment online, order a repeat prescription through the NHS App, or register as a new patient. We are open Monday to Friday from 8am to 6.30pm.</p>
<h2>Need help now?</h2>
<p>If it is an emergency call 999. For urgent help when we are closed call NHS 111 or use <a href="https://111.nhs.uk">111 online</a>.</p>
<h2>Repeat prescriptions</h2>
<p>Order through the <a href="https://www.nhs.uk/nhs-app/">NHS App</a>. Allow two working days. Ask your pharmacy about collection.</p>
<h2>Our doctors</h2>
<img src="/team.jpg" alt="The Willowbrook practice team" width="800" height="600">
<img src="/hero.webp" alt="" width="1200" height="600" srcset="/hero-600.webp 600w, /hero.webp 1200w">
<h3>Practice nurse clinics</h3>
<p>Blood pressure checks and travel advice are run by our practice nurse team every weekday morning. Patients say the clinics are quick and kind.</p>
<form action="/search"><label for="q">Search the site</label><input id="q" name="q" type="search"></form>
<iframe title="Map showing Willowbrook Surgery" src="https://www.google.com/maps/embed?pb=1"></iframe>
</main>
<footer>
<p>Willowbrook Surgery, 1 Willow Road, Reading RG1 1AA. Phone <a href="tel:+441184960000">0118 496 0000</a>.</p>
<p><a href="/privacy">Privacy notice</a> <a href="/accessibility">Accessibility statement</a> <a href="/feedback">Feedback and complaints</a> <a href="/reviews">What our patients say</a></p>
<p>© ${new Date().getFullYear()} Willowbrook Surgery</p>
</footer>
</body></html>`;

const BAD_PAGE = `<html><head>
<title>Home</title>
<meta name="viewport" content="width=1024, user-scalable=no">
<meta name="generator" content="WordPress 5.2">
<script src="http://cdn.example.com/jquery-1.12.4.min.js"></script>
<script src="/a.js"></script><script src="/b.js"></script><script src="/c.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
</head><body>
<div class="elementor-section" style="width: 1200px">
<h3>Welcome</h3>
<h1>Our Care Home</h1><h1>Welcome</h1>
<img src="/1.jpg"><img src="/2.jpg"><img src="/3.jpg">
<a href="/more">click here</a> <a href="/x">read more</a> <a href="/y"></a>
<input type="text" name="email" placeholder="Email">
<iframe src="https://www.youtube.com/embed/x"></iframe>
<p style="font-size: 9px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua and this sentence goes on and on without any punctuation to speak of whatsoever because builders do that and it is bad for anxious readers who need short sentences.</p>
<p>Our care home welcomes residents. Respite care and dementia care available. Copyright 2019 Our Care Home.</p>
<a href="/brochure.pdf">Brochure</a><a href="/fees.pdf">Fees</a><a href="/menu.pdf">Menu</a><a href="/a.pdf">A</a><a href="/b.pdf">B</a>
<div id="dup"></div><div id="dup"></div><span tabindex="3">x</span>
</div>
</body></html>`;

/* ─── parsing ──────────────────────────────────────────────── */

describe("parsePage", () => {
  it("extracts title, metas, links, headings, text and JSON-LD", () => {
    const page = parsePage(fetched(GOOD_GP));
    expect(page.title).toMatch(/Willowbrook Surgery/);
    expect(page.metas.get("description")).toMatch(/Book appointments/);
    expect(page.metas.get("og:image")).toContain("og.png");
    expect(page.headings[0]).toEqual({ level: 1, text: "Willowbrook Surgery" });
    expect(page.jsonLd).toHaveLength(1);
    expect(page.words.length).toBeGreaterThan(80);
    expect(page.externalDomains).toContain("www.google.com");
    expect(page.clientRendered).toBe(false);
  });

  it("detects the sector from the page's own words", () => {
    expect(parsePage(fetched(GOOD_GP)).sector).toBe("gp-practice");
    expect(parsePage(fetched(BAD_PAGE)).sector).toBe("care-home");
    expect(detectSector("welcome to our shop selling shoes", "Shoes R Us")).toBe("other");
  });

  it("recognises page builders and disclosed versions", () => {
    const page = parsePage(fetched(BAD_PAGE));
    expect(page.platform?.name).toBe("WordPress with Elementor");
    expect(page.platform?.kind).toBe("page-builder");
    expect(page.platform?.version).toBe("5.2");
  });

  it("flags an empty JavaScript shell as client rendered", () => {
    const shell = `<!doctype html><html><head><title>App</title><script defer src="/main.js"></script></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>`;
    expect(parsePage(fetched(shell)).clientRendered).toBe(true);
  });

  it("reduces hosts to their registrable domain, including UK second levels", () => {
    expect(rootDomain("www.example.co.uk")).toBe("example.co.uk");
    expect(rootDomain("surgery.nhs.uk")).toBe("surgery.nhs.uk");
    expect(rootDomain("cdn.example.com")).toBe("example.com");
  });
});

/* ─── checks ───────────────────────────────────────────────── */

describe("checks on a well-built GP page", () => {
  const ctx = context(fetched(GOOD_GP, {}, { "content-encoding": "br", "strict-transport-security": "max-age=31536000", "content-security-policy": "default-src 'self'; frame-ancestors 'self'", "x-content-type-options": "nosniff", "referrer-policy": "strict-origin-when-cross-origin", "permissions-policy": "camera=()" }), {
    robots: fetched("User-agent: *\nAllow: /\nSitemap: https://www.willowbrook-surgery.nhs.uk/sitemap.xml", { finalUrl: "https://www.willowbrook-surgery.nhs.uk/robots.txt" }),
    sitemap: fetched("<urlset></urlset>", { finalUrl: "https://www.willowbrook-surgery.nhs.uk/sitemap.xml" }),
    httpProbe: fetched("", { status: 301, redirects: ["https://www.willowbrook-surgery.nhs.uk/"] }),
  });

  it("passes the accessibility basics", () => {
    const checks = accessibilityChecks(ctx);
    for (const id of ["a11y-lang", "a11y-img-alt", "a11y-h1", "a11y-form-labels", "a11y-empty-links", "a11y-zoom", "a11y-landmarks", "a11y-skip-link", "a11y-iframe-title", "a11y-statement"]) {
      expect(byId(checks, id).status, id).toBe("pass");
    }
  });

  it("passes the search, security and local checks", () => {
    const seo = seoChecks(ctx);
    for (const id of ["seo-title", "seo-description", "seo-indexable", "seo-canonical", "seo-robots-txt", "seo-sitemap", "seo-open-graph", "seo-structured-data", "seo-favicon", "seo-internal-links"]) {
      expect(byId(seo, id).status, id).toBe("pass");
    }
    const sec = securityChecks(ctx);
    for (const id of ["sec-https", "sec-http-redirect", "sec-hsts", "sec-csp", "sec-frames", "sec-hardening-headers", "sec-mixed-content", "sec-disclosure"]) {
      expect(byId(sec, id).status, id).toBe("pass");
    }
    const local = localChecks(ctx);
    for (const id of ["local-schema", "local-nap", "local-title-place", "local-map", "local-geo", "local-reviews"]) {
      expect(byId(local, id).status, id).toBe("pass");
    }
  });

  it("finds the GP tasks signposted as links", () => {
    const checks = contentChecks(ctx);
    for (const id of ["content-gp-practice-appointments", "content-gp-practice-prescriptions", "content-gp-practice-nhs-app", "content-gp-practice-urgent", "content-gp-practice-register", "content-contact", "content-address", "content-hours", "content-privacy", "content-freshness"]) {
      expect(byId(checks, id).status, id).toBe("pass");
    }
  });

  it("passes mobile and performance signals", () => {
    const mobile = mobileChecks(ctx);
    expect(byId(mobile, "mobile-viewport").status).toBe("pass");
    expect(byId(mobile, "mobile-tel-links").status).toBe("pass");
    expect(byId(mobile, "mobile-fixed-width").status).toBe("pass");
    const perf = performanceChecks(ctx);
    expect(byId(perf, "perf-ttfb").status).toBe("pass");
    expect(byId(perf, "perf-compression").status).toBe("pass");
    expect(byId(perf, "perf-blocking-scripts").status).toBe("pass");
    expect(byId(perf, "perf-img-dimensions").status).toBe("pass");
    expect(byId(perf, "perf-client-rendered").status).toBe("pass");
  });

  it("scores the page highly overall", () => {
    const all = [accessibilityChecks, performanceChecks, seoChecks, contentChecks, mobileChecks, securityChecks, localChecks].flatMap((run) => run(ctx));
    const score = overallScore(buildCategories(all));
    expect(score).toBeGreaterThanOrEqual(90);
    expect(gradeFor(score)).toBe("A");
  });
});

describe("checks on a poorly built page", () => {
  const ctx = context(
    fetched(BAD_PAGE, { finalUrl: "http://old-care-home.co.uk/", requestedUrl: "http://old-care-home.co.uk/", ttfbMs: 2400, totalMs: 3600 }, { server: "Apache/2.4.29", "x-powered-by": "PHP/7.2.0" })
  );

  it("fails the accessibility basics with evidence", () => {
    const checks = accessibilityChecks(ctx);
    expect(byId(checks, "a11y-lang").status).toBe("fail");
    const alt = byId(checks, "a11y-img-alt");
    expect(alt.status).toBe("fail");
    expect(alt.evidence).toEqual(["/1.jpg", "/2.jpg", "/3.jpg"]);
    expect(byId(checks, "a11y-h1").status).toBe("warn");
    expect(byId(checks, "a11y-heading-order").status).toBe("warn");
    expect(byId(checks, "a11y-form-labels").status).toBe("fail");
    expect(byId(checks, "a11y-empty-links").status).toBe("warn");
    expect(byId(checks, "a11y-generic-links").status).toBe("warn");
    expect(byId(checks, "a11y-zoom").status).toBe("fail");
    expect(byId(checks, "a11y-landmarks").status).toBe("fail");
    expect(byId(checks, "a11y-iframe-title").status).toBe("warn");
    expect(byId(checks, "a11y-structure").status).toBe("warn");
    expect(byId(checks, "a11y-statement").status).toBe("fail");
    for (const c of checks) if (c.status !== "pass" && c.status !== "info") expect(c.fix, c.id).toBeTruthy();
  });

  it("fails speed, mobile and security signals", () => {
    const perf = performanceChecks(ctx);
    expect(byId(perf, "perf-ttfb").status).toBe("fail");
    expect(byId(perf, "perf-compression").status).toBe("fail");
    expect(byId(perf, "perf-blocking-scripts").status).toBe("fail");
    expect(byId(perf, "perf-img-dimensions").status).toBe("warn");
    expect(byId(perf, "perf-fonts").status).toBe("warn");

    const mobile = mobileChecks(ctx);
    expect(byId(mobile, "mobile-viewport").status).toBe("warn");
    expect(byId(mobile, "mobile-fixed-width").status).toBe("warn");
    expect(byId(mobile, "mobile-text-size").status).toBe("warn");

    const sec = securityChecks(ctx);
    expect(byId(sec, "sec-https").status).toBe("fail");
    expect(byId(sec, "sec-disclosure").status).toBe("warn");
    expect(byId(sec, "sec-old-libraries").status).toBe("warn");
    expect(byId(sec, "sec-mixed-content").status).toBe("info");
  });

  it("fails search and content signals", () => {
    const seo = seoChecks(ctx);
    expect(byId(seo, "seo-title").status).toBe("warn");
    expect(byId(seo, "seo-description").status).toBe("fail");
    expect(byId(seo, "seo-canonical").status).toBe("warn");
    expect(byId(seo, "seo-open-graph").status).toBe("fail");
    expect(byId(seo, "seo-structured-data").status).toBe("warn");

    const content = contentChecks(ctx);
    expect(byId(content, "content-placeholder").status).toBe("fail");
    expect(byId(content, "content-pdfs").status).toBe("warn");
    expect(byId(content, "content-freshness").status).toBe("warn");
    expect(byId(content, "content-contact").status).toBe("fail");
    expect(byId(content, "content-care-home-cqc").status).toBe("fail");
    expect(byId(content, "content-care-home-careers").status).toBe("fail");
    /* The fixture links a "Menu", which counts as daily-life signposting. */
    expect(byId(content, "content-care-home-life").status).toBe("pass");
  });

  it("scores the page low and puts high-impact failures first", () => {
    const all = [accessibilityChecks, performanceChecks, seoChecks, contentChecks, mobileChecks, securityChecks, localChecks].flatMap((run) => run(ctx));
    const categories = buildCategories(all);
    const score = overallScore(categories);
    expect(score).toBeLessThan(50);
    expect(["D", "E"]).toContain(gradeFor(score));

    const priorities = prioritise(all);
    expect(priorities[0].status).toBe("fail");
    expect(priorities[0].impact).toBe("high");
    const firstWarn = priorities.findIndex((c) => c.status === "warn");
    const lastFail = priorities.map((c) => c.status).lastIndexOf("fail");
    expect(firstWarn === -1 || firstWarn > lastFail).toBe(true);
  });
});

describe("client-rendered pages", () => {
  it("carries the failure on one check and marks the rest informational", () => {
    const shell = `<!doctype html><html lang="en"><head><title>Care home</title><meta name="viewport" content="width=device-width"><script defer src="/main.js"></script></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>`;
    const ctx = context(fetched(shell));
    const content = contentChecks(ctx);
    expect(byId(content, "content-word-count").status).toBe("fail");
    expect(byId(content, "content-word-count").impact).toBe("high");
    expect(byId(content, "content-contact").status).toBe("info");
    expect(byId(performanceChecks(ctx), "perf-client-rendered").status).toBe("fail");
  });
});

describe("cross-site redirects", () => {
  it("flags a destination on another domain", () => {
    const ctx = context(fetched(GOOD_GP, { requestedUrl: "https://old-domain.example/", finalUrl: "https://www.willowbrook-surgery.nhs.uk/", redirects: ["https://www.willowbrook-surgery.nhs.uk/"] }));
    const check = byId(seoChecks(ctx), "seo-cross-site-redirect");
    expect(check.status).toBe("fail");
    expect(check.detail).toMatch(/old-domain\.example/);
  });
});

/* ─── scoring ──────────────────────────────────────────────── */

describe("scoring", () => {
  const mk = (status: Check["status"], impact: Check["impact"]): Check => ({
    id: `${status}-${impact}-${Math.random()}`,
    category: "seo",
    title: "t",
    status,
    impact,
    detail: "d",
  });

  it("weights by impact, halves warnings and ignores info", () => {
    expect(scoreChecks([mk("pass", "high"), mk("fail", "low")])).toBe(75);
    expect(scoreChecks([mk("warn", "medium")])).toBe(50);
    expect(scoreChecks([mk("info", "high")])).toBeNull();
    expect(scoreChecks([mk("pass", "low"), mk("info", "high")])).toBe(100);
  });

  it("maps scores to grades at the documented thresholds", () => {
    expect(gradeFor(90)).toBe("A");
    expect(gradeFor(89)).toBe("B");
    expect(gradeFor(75)).toBe("B");
    expect(gradeFor(60)).toBe("C");
    expect(gradeFor(45)).toBe("D");
    expect(gradeFor(44)).toBe("E");
  });

  it("leaves unscorable categories out of the overall figure", () => {
    const categories = buildCategories([mk("pass", "high")]);
    const seo = categories.find((c) => c.id === "seo");
    expect(seo?.score).toBe(100);
    expect(categories.filter((c) => c.id !== "seo").every((c) => c.score === null)).toBe(true);
    expect(overallScore(categories)).toBe(100);
  });
});
