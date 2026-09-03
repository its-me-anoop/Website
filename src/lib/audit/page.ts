import { parse, type HTMLElement } from "node-html-parser";
import type { FetchedPage } from "./fetch";
import type { Platform, Sector } from "./types";

/**
 * Everything the checks need, parsed once. `text` is the visible copy
 * (scripts, styles and hidden template noise removed), lower-cased for
 * keyword checks; `textRaw` keeps case for readability metrics.
 */
export type ParsedPage = {
  fetched: FetchedPage;
  url: URL;
  root: HTMLElement;
  head: HTMLElement | null;
  body: HTMLElement | null;
  title: string | null;
  metas: Map<string, string>;
  /** name/property → content, including og: and twitter: tags. */
  links: { rel: string; href: string; el: HTMLElement }[];
  anchors: { href: string; text: string; el: HTMLElement }[];
  images: HTMLElement[];
  scripts: HTMLElement[];
  stylesheets: HTMLElement[];
  headings: { level: number; text: string }[];
  text: string;
  textRaw: string;
  words: string[];
  jsonLd: Record<string, unknown>[];
  jsonLdErrors: number;
  externalDomains: string[];
  platform: Platform | null;
  sector: Sector;
  /** True when the HTML is an empty shell filled in by JavaScript. */
  clientRendered: boolean;
};

const SECTOR_TERMS: Record<Exclude<Sector, "other">, string[]> = {
  "gp-practice": [
    "gp surgery",
    "gp practice",
    "medical centre",
    "medical practice",
    "health centre",
    "nhs app",
    "repeat prescription",
    "our doctors",
    "practice nurse",
    "econsult",
    "online consultation",
    "register as a patient",
    "patient participation",
    "surgery",
  ],
  "care-home": [
    "care home",
    "nursing home",
    "residential care",
    "our residents",
    "dementia care",
    "respite care",
    "cqc",
    "care quality commission",
    "our home",
    "life at",
    "book a visit",
  ],
  "dental-practice": [
    "dental",
    "dentist",
    "orthodont",
    "hygienist",
    "teeth",
    "invisalign",
    "nhs band",
  ],
  pharmacy: [
    "pharmacy",
    "pharmacist",
    "pharmacy first",
    "dispens",
    "prescription collection",
    "flu jab",
    "medicines",
  ],
  "physio-clinic": [
    "physio",
    "physiotherap",
    "sports injur",
    "musculoskeletal",
    "rehabilitation",
    "chiropract",
    "osteopath",
  ],
};

export function detectSector(text: string, title: string | null): Sector {
  const haystack = `${title ?? ""} ${text}`.toLowerCase();
  const scores = Object.entries(SECTOR_TERMS).map(([sector, terms]) => {
    let score = 0;
    for (const term of terms) {
      const count = haystack.split(term).length - 1;
      if (count > 0) score += Math.min(count, 5) + 2;
      if ((title ?? "").toLowerCase().includes(term)) score += 6;
    }
    return { sector: sector as Sector, score };
  });
  scores.sort((a, b) => b.score - a.score);
  const [best, second] = scores;
  if (best.score < 8) return "other";
  if (second && best.score - second.score < 3) return "other";
  return best.sector;
}

export function detectPlatform(html: string, metas: Map<string, string>, headers: Headers): Platform | null {
  const generator = metas.get("generator") ?? "";
  const lower = html.toLowerCase();
  const powered = headers.get("x-powered-by") ?? "";

  const version = (source: string, re: RegExp) => re.exec(source)?.[1];

  if (lower.includes("elementor")) {
    return { name: "WordPress with Elementor", kind: "page-builder", version: version(generator, /wordpress\s+([\d.]+)/i) };
  }
  if (lower.includes("wp-content/") || /wordpress/i.test(generator)) {
    const v = version(generator, /wordpress\s+([\d.]+)/i);
    const builder = lower.includes("divi") ? " with Divi" : lower.includes("wpbakery") || lower.includes("js_composer") ? " with WPBakery" : "";
    return { name: `WordPress${builder}`, kind: builder ? "page-builder" : "cms", version: v ? `WordPress ${v}` : undefined };
  }
  if (lower.includes("static.wixstatic.com") || lower.includes("wix.com")) return { name: "Wix", kind: "page-builder" };
  if (lower.includes("squarespace")) return { name: "Squarespace", kind: "page-builder" };
  if (lower.includes("weebly")) return { name: "Weebly", kind: "page-builder" };
  if (lower.includes("godaddy") && lower.includes("wsimg")) return { name: "GoDaddy Website Builder", kind: "page-builder" };
  if (lower.includes("cdn.shopify.com")) return { name: "Shopify", kind: "cms" };
  if (/joomla/i.test(generator) || lower.includes("/media/jui/")) return { name: "Joomla", kind: "cms", version: version(generator, /joomla!?\s*([\d.]+)/i) };
  if (/drupal/i.test(generator) || lower.includes("/sites/default/files")) return { name: "Drupal", kind: "cms", version: version(generator, /drupal\s*([\d.]+)/i) };
  if (lower.includes("footfall") || lower.includes("mysurgerywebsite")) return { name: "My Surgery Website", kind: "cms" };
  if (lower.includes("gpsurgery.net")) return { name: "GP Surgery Net", kind: "cms" };
  if (lower.includes("silicon-practice") || lower.includes("siliconpractice")) return { name: "Silicon Practice", kind: "cms" };
  if (lower.includes("__next") || lower.includes("/_next/")) return { name: "Next.js", kind: "framework" };
  if (lower.includes("__nuxt") || lower.includes("/_nuxt/")) return { name: "Nuxt", kind: "framework" };
  if (lower.includes("gatsby")) return { name: "Gatsby", kind: "framework" };
  if (/hugo/i.test(generator)) return { name: "Hugo", kind: "framework" };
  if (/jekyll/i.test(generator)) return { name: "Jekyll", kind: "framework" };
  if (/webflow/i.test(generator) || lower.includes("webflow.com")) return { name: "Webflow", kind: "page-builder" };
  if (/framer/i.test(generator) || lower.includes("framerusercontent")) return { name: "Framer", kind: "page-builder" };
  if (generator) return { name: generator.split(/\s+/)[0], kind: "unknown", version: generator };
  if (/asp\.net/i.test(powered)) return { name: "ASP.NET", kind: "framework", version: powered };
  if (/php/i.test(powered)) return { name: "PHP", kind: "unknown", version: powered };
  return null;
}

/**
 * Visible copy with a newline between block elements, so words from
 * adjacent list items and headings never run together and sentence
 * splitting has real boundaries to work with.
 */
function collectText(root: HTMLElement): string {
  const clone = parse(root.toString());
  clone.querySelectorAll("script, style, noscript, template, svg").forEach((n) => n.remove());
  return clone.structuredText
    .replace(/[ \t\u00a0]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

/**
 * Sentences from the body copy. Short fragments (menu items, labels)
 * are ignored so readability reflects the prose, not the navigation.
 */
export function sentencesOf(textRaw: string): string[] {
  return textRaw
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 4);
}

export function parsePage(fetched: FetchedPage): ParsedPage {
  const root = parse(fetched.body, {
    lowerCaseTagName: true,
    comment: false,
    blockTextElements: { script: true, style: true, noscript: true, pre: true },
  });
  const url = new URL(fetched.finalUrl);
  const head = root.querySelector("head");
  const body = root.querySelector("body");

  const title = root.querySelector("title")?.textContent.replace(/\s+/g, " ").trim() || null;

  const metas = new Map<string, string>();
  for (const meta of root.querySelectorAll("meta")) {
    const key = (meta.getAttribute("name") ?? meta.getAttribute("property") ?? meta.getAttribute("http-equiv"))?.toLowerCase();
    const content = meta.getAttribute("content");
    if (key && content !== undefined && !metas.has(key)) metas.set(key, content.trim());
  }

  const links = root.querySelectorAll("link").flatMap((el) => {
    const rel = (el.getAttribute("rel") ?? "").toLowerCase();
    const href = el.getAttribute("href") ?? "";
    return rel ? [{ rel, href, el }] : [];
  });

  const anchors = root.querySelectorAll("a").map((el) => ({
    href: (el.getAttribute("href") ?? "").trim(),
    text: (el.getAttribute("aria-label") ?? el.textContent).replace(/\s+/g, " ").trim(),
    el,
  }));

  const images = root.querySelectorAll("img");
  const scripts = root.querySelectorAll("script");
  const stylesheets = links.filter((l) => l.rel.split(/\s+/).includes("stylesheet")).map((l) => l.el);

  const headings = root
    .querySelectorAll("h1, h2, h3, h4, h5, h6")
    .map((h) => ({ level: Number(h.tagName[1]), text: h.textContent.replace(/\s+/g, " ").trim() }));

  const textRaw = body ? collectText(body) : collectText(root);
  const text = textRaw.replace(/\n/g, " ").toLowerCase();
  const words = textRaw.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w));

  const jsonLd: Record<string, unknown>[] = [];
  let jsonLdErrors = 0;
  for (const script of scripts) {
    if ((script.getAttribute("type") ?? "").toLowerCase() !== "application/ld+json") continue;
    try {
      const parsed = JSON.parse(script.textContent);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (item && typeof item === "object") {
          const graph = (item as { "@graph"?: unknown[] })["@graph"];
          if (Array.isArray(graph)) graph.forEach((g) => g && typeof g === "object" && jsonLd.push(g as Record<string, unknown>));
          else jsonLd.push(item as Record<string, unknown>);
        }
      }
    } catch {
      jsonLdErrors++;
    }
  }

  const externalDomains = new Set<string>();
  const resourceUrls = [
    ...scripts.map((s) => s.getAttribute("src")),
    ...links.map((l) => l.href),
    ...images.map((i) => i.getAttribute("src")),
    ...root.querySelectorAll("iframe").map((f) => f.getAttribute("src")),
  ];
  for (const src of resourceUrls) {
    if (!src) continue;
    try {
      const u = new URL(src, url);
      if (u.hostname && u.hostname !== url.hostname && !u.hostname.endsWith(`.${rootDomain(url.hostname)}`)) {
        externalDomains.add(u.hostname);
      }
    } catch {
      /* ignore unparsable URLs */
    }
  }

  const platform = detectPlatform(fetched.body, metas, fetched.headers);
  const sector = detectSector(text, title);
  const clientRendered =
    words.length < 40 &&
    scripts.some((s) => s.getAttribute("src")) &&
    (!!root.querySelector("#root, #app, #__next, #___gatsby, [data-reactroot], #__nuxt") ||
      /enable javascript/i.test(root.querySelector("noscript")?.textContent ?? ""));

  return {
    fetched,
    url,
    root,
    head,
    body,
    title,
    metas,
    links,
    anchors,
    images,
    scripts,
    stylesheets,
    headings,
    text,
    textRaw,
    words,
    jsonLd,
    jsonLdErrors,
    externalDomains: [...externalDomains].sort(),
    platform,
    sector,
    clientRendered,
  };
}

/**
 * Below this many visible words a page is treated as a shell unless it
 * still carries something a reader could act on. Real pages this short
 * are rare; bot challenges, "please wait" interstitials and empty
 * JavaScript containers are not.
 */
const MIN_READABLE_WORDS = 10;

const INTERSTITIAL = /please wait|just a moment|checking your browser|verify(ing)? (you are|that you)|enable javascript|javascript is (required|disabled)|redirecting|loading\b/i;

/**
 * True when the HTML carries nothing the audit could honestly score: no
 * visible words at all, or a handful of words that are an interstitial
 * or sit in a JavaScript shell with no links or headings to navigate by.
 * Callers fail closed on this rather than grade an empty page. A short
 * but real page (a heading, a phone number, a few links) is not a shell.
 */
export function isUnreadableShell(page: ParsedPage): boolean {
  const words = page.words.length;
  if (words === 0) return true;
  if (words >= MIN_READABLE_WORDS) return false;
  if (page.clientRendered || INTERSTITIAL.test(page.textRaw)) return true;
  const navigable = page.headings.length > 0 || page.anchors.some((a) => a.text);
  return !navigable;
}

/** "www.example.co.uk" → "example.co.uk" (good enough for same-site tests). */
export function rootDomain(host: string): string {
  const parts = host.split(".");
  if (parts.length <= 2) return host;
  const secondLevel = new Set(["co", "org", "gov", "ac", "nhs", "net", "com", "me", "ltd", "plc", "sch"]);
  if (parts.length >= 3 && secondLevel.has(parts[parts.length - 2])) {
    return parts.slice(-3).join(".");
  }
  return parts.slice(-2).join(".");
}

/** Resolve a link against the page; null for mailto:, tel:, javascript: and junk. */
export function resolveHref(page: ParsedPage, href: string): URL | null {
  if (!href || href.startsWith("#")) return null;
  if (/^(mailto|tel|sms|javascript|data):/i.test(href)) return null;
  try {
    return new URL(href, page.url);
  } catch {
    return null;
  }
}

export function isInternal(page: ParsedPage, target: URL): boolean {
  return rootDomain(target.hostname) === rootDomain(page.url.hostname);
}

/** All JSON-LD @type values on the page, flattened and lower-cased. */
export function jsonLdTypes(page: ParsedPage): string[] {
  const types: string[] = [];
  for (const node of page.jsonLd) {
    const t = node["@type"];
    if (typeof t === "string") types.push(t.toLowerCase());
    else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.push(x.toLowerCase()));
  }
  return types;
}
