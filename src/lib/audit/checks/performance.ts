import { checker, plural, trim, type CheckModule } from "./context";

const c = checker("performance");

const KB = 1024;

function kb(bytes: number) {
  return bytes >= 1024 * KB ? `${(bytes / KB / KB).toFixed(1)} MB` : `${Math.round(bytes / KB)} KB`;
}

export const performanceChecks: CheckModule = ({ page }) => {
  const { fetched, root, scripts, stylesheets, images } = page;
  const checks = [];

  /* Client-side rendering */
  checks.push(
    c({
      id: "perf-client-rendered",
      title: "Content arrives in the HTML",
      impact: "high",
      status: page.clientRendered ? "fail" : "pass",
      detail: page.clientRendered
        ? "The HTML is an empty shell; every word and image is drawn by JavaScript after it downloads. On a slow phone the page stays blank for seconds, and some crawlers index nothing."
        : "The page's content is present in the HTML itself, so it shows immediately and every crawler can read it.",
      fix: "Render pages on the server or at build time (static HTML), and use JavaScript only to enhance them.",
    })
  );

  /* Server response */
  const ttfb = fetched.ttfbMs;
  checks.push(
    c({
      id: "perf-ttfb",
      title: "Server responds quickly",
      impact: "high",
      status: ttfb <= 600 ? "pass" : ttfb <= 1500 ? "warn" : "fail",
      detail:
        ttfb <= 600
          ? `The server sent its first byte in ${ttfb} ms.`
          : `The server took ${ttfb} ms to start responding. Everything else waits on this, and it is the part visitors on slow connections feel first.`,
      fix: "Serve pages statically or from a cache at the edge instead of building each one on request. Slow hosting and heavy CMS plugins are the usual culprits.",
    })
  );

  const total = fetched.totalMs;
  checks.push(
    c({
      id: "perf-html-time",
      title: "HTML arrives fast",
      impact: "medium",
      status: total <= 1200 ? "pass" : total <= 3000 ? "warn" : "fail",
      detail:
        total <= 1200
          ? `The full HTML document arrived in ${total} ms${fetched.redirects.length ? ` including ${plural(fetched.redirects.length, "redirect")}` : ""}.`
          : `The HTML document took ${total} ms to arrive${fetched.redirects.length ? `, including ${plural(fetched.redirects.length, "redirect")}` : ""}. Nothing can render before this.`,
      fix: "Reduce redirect hops, enable compression and keep the document itself small.",
      evidence: fetched.redirects.map((r) => trim(r, 90)),
    })
  );

  /* Document weight */
  const bytes = fetched.bytes;
  checks.push(
    c({
      id: "perf-html-size",
      title: "HTML document is lean",
      impact: "medium",
      status: fetched.truncated ? "fail" : bytes <= 150 * KB ? "pass" : bytes <= 400 * KB ? "warn" : "fail",
      detail: fetched.truncated
        ? `The HTML is over ${kb(bytes)} and was cut off. Documents this heavy are almost always page-builder output.`
        : bytes <= 150 * KB
          ? `The HTML weighs ${kb(bytes)}.`
          : `The HTML alone weighs ${kb(bytes)}, before any images, scripts or styles. Inline styles and builder markup are the usual reason.`,
      fix: "Strip inline CSS and builder wrappers; a well-built page's HTML is usually under 100 KB.",
    })
  );

  const encoding = (fetched.headers.get("content-encoding") ?? "").toLowerCase();
  const compressed = /br|gzip|zstd|deflate/.test(encoding);
  checks.push(
    c({
      id: "perf-compression",
      title: "Text is compressed in transit",
      impact: "medium",
      status: compressed ? "pass" : "fail",
      detail: compressed
        ? `The server compresses responses (${encoding}), typically shrinking text by 70–80%.`
        : "The HTML was sent uncompressed. Enabling gzip or Brotli is a one-line server change that shrinks every text file by 70–80%.",
      fix: "Turn on Brotli or gzip compression at the server or CDN.",
    })
  );

  /* Render-blocking */
  const headScripts = (page.head?.querySelectorAll("script") ?? []).filter(
    (s) =>
      s.getAttribute("src") &&
      !s.hasAttribute("async") &&
      !s.hasAttribute("defer") &&
      (s.getAttribute("type") ?? "").toLowerCase() !== "module"
  );
  checks.push(
    c({
      id: "perf-blocking-scripts",
      title: "No render-blocking scripts in the head",
      impact: "high",
      status: headScripts.length === 0 ? "pass" : headScripts.length <= 2 ? "warn" : "fail",
      detail:
        headScripts.length === 0
          ? "No synchronous external scripts sit in the <head>, so the browser can start painting straight away."
          : `${plural(headScripts.length, "external script")} in the <head> ${headScripts.length === 1 ? "loads" : "load"} synchronously. The browser shows a blank page until ${headScripts.length === 1 ? "it has" : "each has"} downloaded and run.`,
      fix: "Add defer (or async for analytics) to every external script, or move them to the end of the body.",
      evidence: headScripts.map((s) => trim(s.getAttribute("src") ?? "", 90)),
    })
  );

  const externalScripts = scripts.filter((s) => s.getAttribute("src"));
  checks.push(
    c({
      id: "perf-script-count",
      title: "Modest number of scripts",
      impact: "medium",
      status: externalScripts.length <= 8 ? "pass" : externalScripts.length <= 20 ? "warn" : "fail",
      detail:
        externalScripts.length <= 8
          ? `The page loads ${plural(externalScripts.length, "external script")}.`
          : `The page loads ${externalScripts.length} external scripts. Each is a separate request and a block of JavaScript to run on a patient's phone.`,
      fix: "Audit plugins and embeds; combine what is needed and remove what is not. Most practice websites need fewer than ten scripts.",
    })
  );

  checks.push(
    c({
      id: "perf-stylesheet-count",
      title: "Stylesheets kept to a few files",
      impact: "low",
      status: stylesheets.length <= 4 ? "pass" : stylesheets.length <= 8 ? "warn" : "fail",
      detail:
        stylesheets.length <= 4
          ? `${plural(stylesheets.length, "stylesheet")} linked.`
          : `${stylesheets.length} separate stylesheets are linked; each one blocks rendering until it arrives.`,
      fix: "Bundle CSS into one or two files and inline the critical part for the first screen.",
    })
  );

  /* Third parties */
  const domains = page.externalDomains;
  checks.push(
    c({
      id: "perf-third-parties",
      title: "Few third-party domains",
      impact: "medium",
      status: domains.length <= 5 ? "pass" : domains.length <= 12 ? "warn" : "fail",
      detail:
        domains.length <= 5
          ? `Resources come from ${plural(domains.length, "external domain")}.`
          : `Resources are pulled from ${domains.length} external domains. Every new domain costs a DNS lookup and connection before anything loads, and each is a privacy consideration.`,
      fix: "Self-host fonts and scripts where possible and remove embeds that are not earning their place.",
      evidence: domains,
    })
  );

  /* Images */
  const contentImages = images.filter((img) => img.getAttribute("src"));
  const unsized = contentImages.filter((img) => !(img.getAttribute("width") && img.getAttribute("height")) && !/aspect-ratio|height\s*:/i.test(img.getAttribute("style") ?? ""));
  checks.push(
    c({
      id: "perf-img-dimensions",
      title: "Images reserve their space",
      impact: "medium",
      status: contentImages.length === 0 ? "info" : unsized.length === 0 ? "pass" : unsized.length <= 3 ? "warn" : "fail",
      detail:
        contentImages.length === 0
          ? "No images in the HTML to check."
          : unsized.length === 0
            ? `All ${plural(contentImages.length, "image")} declare width and height, so the layout does not jump while they load.`
            : `${plural(unsized.length, "image")} of ${contentImages.length} have no width and height. The page shifts as they load, which is what makes people tap the wrong thing.`,
      fix: "Add width and height attributes (or CSS aspect-ratio) to every <img>. This is the main fix for Cumulative Layout Shift.",
      evidence: unsized.map((img) => trim(img.getAttribute("src") ?? "", 90)),
    })
  );

  const lazy = contentImages.filter((img) => (img.getAttribute("loading") ?? "").toLowerCase() === "lazy").length;
  checks.push(
    c({
      id: "perf-img-lazy",
      title: "Off-screen images load lazily",
      impact: "low",
      status: contentImages.length < 6 ? "info" : lazy > 0 ? "pass" : "warn",
      detail:
        contentImages.length < 6
          ? `Only ${plural(contentImages.length, "image")} on the page, so lazy loading matters little here.`
          : lazy > 0
            ? `${lazy} of ${contentImages.length} images use loading="lazy".`
            : `${contentImages.length} images all load immediately, including ones far below the fold.`,
      fix: 'Add loading="lazy" to images below the first screen, and keep the hero image eager.',
    })
  );

  const modern = contentImages.filter((img) => /\.(webp|avif)(\?|$)/i.test(img.getAttribute("src") ?? "") || img.getAttribute("srcset")).length;
  const pictures = root.querySelectorAll("picture").length;
  checks.push(
    c({
      id: "perf-img-modern",
      title: "Images use modern, responsive formats",
      impact: "low",
      status: contentImages.length < 3 ? "info" : modern + pictures > 0 ? "pass" : "warn",
      detail:
        contentImages.length < 3
          ? "Too few images to judge image optimisation."
          : modern + pictures > 0
            ? "Images use srcset, <picture> or WebP/AVIF, so phones are not sent desktop-sized files."
            : `None of the ${contentImages.length} images use srcset, <picture> or a modern format. Phones on 4G download the same large files as a desktop on fibre.`,
      fix: "Serve WebP or AVIF with srcset sizes so each device downloads only what it can display.",
    })
  );

  /* Fonts */
  const fontHosts = page.links.filter((l) => /fonts\.googleapis|fonts\.gstatic|use\.typekit|fonts\.net|fast\.fonts/.test(l.href));
  const preconnects = page.links.filter((l) => l.rel.includes("preconnect") || l.rel.includes("preload")).length;
  checks.push(
    c({
      id: "perf-fonts",
      title: "Web fonts do not stall the text",
      impact: "low",
      status: fontHosts.length === 0 ? "pass" : preconnects > 0 ? "pass" : "warn",
      detail:
        fontHosts.length === 0
          ? "No third-party font service was detected; fonts are self-hosted or system fonts are used."
          : preconnects > 0
            ? "A third-party font service is used, with preconnect hints to soften the cost."
            : "Fonts load from a third-party service without preconnect or preload hints, so text can appear late or flash.",
      fix: "Self-host fonts as woff2 with font-display: swap, or at least preconnect to the font host.",
    })
  );

  /* Caching */
  const cacheControl = fetched.headers.get("cache-control") ?? "";
  checks.push(
    c({
      id: "perf-cdn",
      title: "Served through a cache or CDN",
      impact: "low",
      status: /hit|miss|cf-cache|x-vercel|x-cache|age/i.test([...fetched.headers.keys()].join(" ")) || /s-maxage|max-age=[1-9]/.test(cacheControl) ? "pass" : "info",
      detail:
        /hit|miss|cf-cache|x-vercel|x-cache|age/i.test([...fetched.headers.keys()].join(" ")) || /s-maxage|max-age=[1-9]/.test(cacheControl)
          ? "Response headers show a CDN or cache in front of the site."
          : "No signs of a CDN or edge cache. Every visitor is served by the origin server wherever they are.",
      fix: "Put the site behind a CDN so repeat and distant visitors are served from a nearby edge.",
    })
  );

  return checks;
};
