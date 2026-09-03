import { isInternal, resolveHref, rootDomain } from "../page";
import { checker, plural, trim, type CheckModule } from "./context";

const c = checker("seo");

export const seoChecks: CheckModule = ({ page, robots, sitemap, favicon }) => {
  const { title, metas, links, anchors, url } = page;
  const checks = [];

  /* Title */
  const titleLen = title?.length ?? 0;
  checks.push(
    c({
      id: "seo-title",
      title: "Page has a descriptive title",
      impact: "high",
      status: !title ? "fail" : titleLen < 15 || titleLen > 65 ? "warn" : "pass",
      detail: !title
        ? "The page has no <title>. Search results and browser tabs will show the bare address."
        : titleLen < 15
          ? `The title \u201c${title}\u201d is only ${titleLen} characters: too short to say who you are and where.`
          : titleLen > 65
            ? `The title is ${titleLen} characters and will be cut off in search results: \u201c${trim(title, 70)}\u201d.`
            : `\u201c${title}\u201d (${titleLen} characters).`,
      fix: "Write a 30–60 character title that names the organisation and its town, e.g. \u201cWillowbrook Surgery | GP practice in Reading\u201d.",
    })
  );

  /* Description */
  const description = metas.get("description") ?? null;
  const descLen = description?.length ?? 0;
  checks.push(
    c({
      id: "seo-description",
      title: "Meta description present",
      impact: "high",
      status: !description ? "fail" : descLen < 50 || descLen > 165 ? "warn" : "pass",
      detail: !description
        ? "No meta description. Google will improvise a snippet from whatever text it finds first, often the cookie banner."
        : descLen < 50
          ? `The description is only ${descLen} characters: \u201c${description}\u201d.`
          : descLen > 165
            ? `The description is ${descLen} characters and will be truncated in results.`
            : `${descLen} characters: \u201c${trim(description, 100)}\u201d.`,
      fix: "Write a 70–160 character description that says what you do, where, and what a visitor can do on the site.",
    })
  );

  /* Indexability */
  const robotsMeta = (metas.get("robots") ?? "").toLowerCase();
  const xRobots = (page.fetched.headers.get("x-robots-tag") ?? "").toLowerCase();
  const noindex = /noindex/.test(robotsMeta) || /noindex/.test(xRobots);
  checks.push(
    c({
      id: "seo-indexable",
      title: "Page allows search engines to index it",
      impact: "high",
      status: noindex ? "fail" : "pass",
      detail: noindex
        ? `The page carries a noindex instruction (${robotsMeta || xRobots}). It is invisible to Google, however good the content.`
        : "No noindex instruction was found.",
      fix: "Remove the noindex directive from the robots meta tag or X-Robots-Tag header on live pages.",
    })
  );

  /* Canonical */
  const canonical = links.find((l) => l.rel.split(/\s+/).includes("canonical"))?.href ?? null;
  let canonicalStatus: "pass" | "warn" | "fail" = "warn";
  let canonicalDetail = "No canonical link. If the site answers on several addresses (www and non-www, http and https, with and without a trailing slash) Google may split ranking between them.";
  if (canonical) {
    try {
      const canon = new URL(canonical, url);
      if (canon.protocol === "http:" && url.protocol === "https:") {
        canonicalStatus = "fail";
        canonicalDetail = `The canonical points at the insecure http version (${trim(canon.toString(), 70)}), telling Google the wrong address is the real one.`;
      } else if (!isInternal(page, canon)) {
        canonicalStatus = "fail";
        canonicalDetail = `The canonical points at a different site (${canon.host}), which hands your ranking to it.`;
      } else {
        canonicalStatus = "pass";
        canonicalDetail = `Canonical set to ${trim(canon.toString(), 80)}.`;
      }
    } catch {
      canonicalStatus = "fail";
      canonicalDetail = `The canonical href is not a valid address: \u201c${trim(canonical, 60)}\u201d.`;
    }
  }
  checks.push(
    c({
      id: "seo-canonical",
      title: "Canonical address declared",
      impact: "medium",
      status: canonicalStatus,
      detail: canonicalDetail,
      fix: 'Add <link rel="canonical" href="https://www.yoursite.co.uk/page"> with the one address you want indexed.',
    })
  );

  /* Redirect hygiene */
  const hops = page.fetched.redirects.length;
  const requestedHost = new URL(page.fetched.requestedUrl).hostname;
  if (rootDomain(requestedHost) !== rootDomain(url.hostname)) {
    checks.push(
      c({
        id: "seo-cross-site-redirect",
        title: "Address stays on its own domain",
        impact: "high",
        status: "fail",
        detail: `${requestedHost} redirects to a different website (${url.host}). Everything below describes that destination, not the address you entered.`,
        fix: "If this is unintentional (an expired domain, a login wall, a parked page), fix the redirect so the address lands on your own site.",
      })
    );
  }
  checks.push(
    c({
      id: "seo-redirects",
      title: "Address resolves without a redirect chain",
      impact: "low",
      status: hops <= 1 ? "pass" : hops <= 2 ? "warn" : "fail",
      detail:
        hops === 0
          ? "The address answered directly."
          : hops === 1
            ? `One redirect to ${trim(page.fetched.finalUrl, 70)}: normal for http→https or www.`
            : `${hops} redirects before the page appeared. Each hop slows visitors and dilutes ranking signals.`,
      fix: "Redirect straight to the final https address in one hop.",
      evidence: page.fetched.redirects.map((r) => trim(r, 90)),
    })
  );

  /* robots.txt and sitemap */
  const robotsOk = robots && robots.status >= 200 && robots.status < 300 && /user-agent/i.test(robots.body);
  const blocksAll = robotsOk && /user-agent:\s*\*[\s\S]*?disallow:\s*\/\s*$/im.test(robots.body) && !/allow:\s*\/\S/i.test(robots.body);
  checks.push(
    c({
      id: "seo-robots-txt",
      title: "robots.txt in place",
      impact: "medium",
      status: !robots ? "info" : blocksAll ? "fail" : robotsOk ? "pass" : "warn",
      detail: !robots
        ? "robots.txt could not be fetched in time."
        : blocksAll
          ? "robots.txt blocks every crawler from the whole site. Nothing will be indexed."
          : robotsOk
            ? `robots.txt is present${/sitemap:/i.test(robots.body) ? " and points to a sitemap" : ""}.`
            : `robots.txt returned ${robots.status}${robots.status < 300 ? " but does not look like a robots file" : ""}.`,
      fix: "Publish a robots.txt that allows crawling and lists the sitemap address.",
    })
  );

  const sitemapOk = sitemap && sitemap.status >= 200 && sitemap.status < 300 && /<urlset|<sitemapindex/i.test(sitemap.body);
  checks.push(
    c({
      id: "seo-sitemap",
      title: "XML sitemap available",
      impact: "medium",
      status: sitemapOk ? "pass" : sitemap === null ? "info" : "fail",
      detail: sitemapOk
        ? "An XML sitemap is published, helping search engines find every page."
        : sitemap === null
          ? "The sitemap could not be fetched in time."
          : `No XML sitemap at /sitemap.xml (returned ${sitemap.status}).`,
      fix: "Generate a sitemap.xml automatically from the site's pages and reference it in robots.txt.",
    })
  );

  /* Social previews */
  const og = ["og:title", "og:description", "og:image"].filter((k) => metas.get(k));
  checks.push(
    c({
      id: "seo-open-graph",
      title: "Shares well on social media and messaging",
      impact: "medium",
      status: og.length === 3 ? "pass" : og.length > 0 ? "warn" : "fail",
      detail:
        og.length === 3
          ? "Open Graph title, description and image are set, so links shared on WhatsApp, Facebook and LinkedIn show a proper preview."
          : og.length > 0
            ? `Only ${og.join(", ")} set. Shared links will show an incomplete preview.`
            : "No Open Graph tags. When someone shares the site on WhatsApp or Facebook it appears as a bare link with no image.",
      fix: "Add og:title, og:description and a 1200×630 og:image to every page.",
    })
  );

  checks.push(
    c({
      id: "seo-twitter-card",
      title: "Twitter/X card configured",
      impact: "low",
      status: metas.get("twitter:card") ? "pass" : og.length === 3 ? "info" : "warn",
      detail: metas.get("twitter:card")
        ? `twitter:card is set to ${metas.get("twitter:card")}.`
        : og.length === 3
          ? "No twitter:card tag, though X will usually fall back to the Open Graph tags."
          : "No twitter:card tag.",
      fix: 'Add <meta name="twitter:card" content="summary_large_image">.',
    })
  );

  /* Structured data */
  checks.push(
    c({
      id: "seo-structured-data",
      title: "Structured data present and valid",
      impact: "medium",
      status: page.jsonLdErrors > 0 ? "fail" : page.jsonLd.length > 0 ? "pass" : "warn",
      detail:
        page.jsonLdErrors > 0
          ? `${plural(page.jsonLdErrors, "JSON-LD block")} could not be parsed, so Google ignores the structured data.`
          : page.jsonLd.length > 0
            ? `${plural(page.jsonLd.length, "JSON-LD item")} found (${[...new Set(page.jsonLd.map((n) => String(n["@type"] ?? "untyped")))].slice(0, 4).join(", ")}).`
            : "No JSON-LD structured data. Search engines have to guess your organisation type, address and opening hours.",
      fix: "Add JSON-LD describing the organisation (type, name, address, phone, opening hours) and validate it with Google's Rich Results Test.",
    })
  );

  /* Favicon */
  const iconLink = links.find((l) => /(^|\s)(icon|shortcut icon|apple-touch-icon)(\s|$)/.test(l.rel));
  const faviconOk = iconLink || (favicon && favicon.status >= 200 && favicon.status < 300);
  checks.push(
    c({
      id: "seo-favicon",
      title: "Favicon present",
      impact: "low",
      status: faviconOk ? "pass" : "warn",
      detail: faviconOk ? "A site icon is available for tabs, bookmarks and search results." : "No site icon was declared or found at /favicon.ico. Search results and browser tabs show a blank placeholder.",
      fix: "Add a favicon (SVG or 32px PNG) and an apple-touch-icon.",
    })
  );

  /* Internal linking */
  const internalLinks = new Set(
    anchors
      .map((a) => resolveHref(page, a.href))
      .filter((u): u is URL => !!u && isInternal(page, u))
      .map((u) => u.pathname)
  );
  checks.push(
    c({
      id: "seo-internal-links",
      title: "Pages are linked together",
      impact: "low",
      status: internalLinks.size >= 5 ? "pass" : internalLinks.size >= 2 ? "warn" : "fail",
      detail:
        internalLinks.size >= 5
          ? `${internalLinks.size} distinct internal pages are linked from here.`
          : `Only ${plural(internalLinks.size, "internal page")} linked. Crawlers and visitors need paths into the rest of the site.`,
      fix: "Link the key pages (services, contact, about) from the navigation and footer on every page.",
    })
  );

  return checks;
};
