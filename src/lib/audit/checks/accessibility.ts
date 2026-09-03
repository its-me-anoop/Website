import type { HTMLElement } from "node-html-parser";
import { agree, checker, plural, trim, unless, type CheckModule } from "./context";

const c = checker("accessibility");

const GENERIC_LINK_TEXT = new Set([
  "click here",
  "here",
  "read more",
  "more",
  "learn more",
  "link",
  "this",
  "details",
  "more info",
  "more information",
  "continue",
  "go",
]);

function isHiddenFromAt(el: HTMLElement): boolean {
  return (
    el.getAttribute("aria-hidden") === "true" ||
    el.getAttribute("role") === "presentation" ||
    el.getAttribute("role") === "none"
  );
}

export const accessibilityChecks: CheckModule = ({ page }) => {
  const { root, images, anchors, headings } = page;
  const checks = [];

  /* Language */
  const lang = root.querySelector("html")?.getAttribute("lang")?.trim() ?? "";
  checks.push(
    c({
      id: "a11y-lang",
      title: "Page declares its language",
      impact: "high",
      status: lang ? "pass" : "fail",
      detail: lang
        ? `The page declares lang="${lang}", so screen readers pronounce it correctly.`
        : "The <html> element has no lang attribute. Screen readers may read English content with the wrong voice.",
      fix: 'Add lang="en-GB" to the <html> element. WCAG 3.1.1, level A.',
    })
  );

  /* Image alt text */
  const contentImages = images.filter((img) => !isHiddenFromAt(img));
  const missingAlt = contentImages.filter((img) => !img.hasAttribute("alt"));
  const emptyAltCount = contentImages.filter((img) => img.getAttribute("alt") === "").length;
  checks.push(
    c({
      id: "a11y-img-alt",
      title: "Images have alternative text",
      impact: "high",
      status: contentImages.length === 0 ? "info" : missingAlt.length === 0 ? "pass" : missingAlt.length <= 2 ? "warn" : "fail",
      detail:
        contentImages.length === 0
          ? "No images were found in the HTML, so there is nothing to check here."
          : missingAlt.length === 0
            ? `${contentImages.length === 1 ? "The one image carries" : `All ${contentImages.length} images carry`} an alt attribute${emptyAltCount ? ` (${emptyAltCount} marked decorative)` : ""}.`
            : `${plural(missingAlt.length, "image")} of ${contentImages.length} have no alt attribute at all, so screen readers announce the file name or nothing.`,
      fix: unless(contentImages.length === 0, 'Give every meaningful image a short description in alt="…", and mark purely decorative images with alt="". WCAG 1.1.1, level A.'),
      evidence: missingAlt.map((img) => trim(img.getAttribute("src") ?? "(no src)", 90)),
    })
  );

  /* Headings */
  const h1s = headings.filter((h) => h.level === 1);
  checks.push(
    c({
      id: "a11y-h1",
      title: "One clear main heading",
      impact: "medium",
      status: h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn",
      detail:
        h1s.length === 1
          ? `The page has one <h1>: "${trim(h1s[0].text, 70)}".`
          : h1s.length === 0
            ? "The page has no <h1>. Screen-reader users and search engines rely on it to know what the page is about."
            : `The page has ${h1s.length} <h1> headings, which blurs the page's main topic.`,
      fix: "Use exactly one <h1> that names the page, then <h2> and <h3> for sections in order.",
      evidence: h1s.map((h) => trim(h.text, 70)),
    })
  );

  let skipped = 0;
  let last = 0;
  for (const h of headings) {
    if (last && h.level > last + 1) skipped++;
    last = h.level;
  }
  const emptyHeadings = headings.filter((h) => !h.text).length;
  const startsBelowH1 = headings.length > 0 && headings[0].level !== 1;
  const orderProblems = [
    startsBelowH1 ? `the first heading is an <h${headings[0].level}> rather than the <h1>` : "",
    skipped ? `${plural(skipped, "heading")} skip a level (for example h2 straight to h4)` : "",
    emptyHeadings ? `${plural(emptyHeadings, "heading is", "headings are")} empty` : "",
  ].filter(Boolean);
  checks.push(
    c({
      id: "a11y-heading-order",
      title: "Headings follow a logical order",
      impact: "low",
      status: headings.length === 0 ? "info" : orderProblems.length === 0 ? "pass" : "warn",
      detail:
        headings.length === 0
          ? "No headings were found, so the page has no navigable structure."
          : orderProblems.length === 0
            ? `${plural(headings.length, "heading")} step down one level at a time.`
            : `${orderProblems.join("; ")}.`.replace(/^./, (ch) => ch.toUpperCase()),
      fix: unless(headings.length === 0, "Headings are the table of contents for screen-reader users: start with the <h1>, keep them in order and never leave one empty."),
    })
  );

  /* Form controls */
  const inputs = root
    .querySelectorAll("input, select, textarea")
    .filter((el) => !["hidden", "submit", "button", "reset", "image"].includes((el.getAttribute("type") ?? "").toLowerCase()))
    .filter((el) => !isHiddenFromAt(el));
  const labelledIds = new Set(root.querySelectorAll("label[for]").map((l) => l.getAttribute("for")));
  const unlabelled = inputs.filter((el) => {
    const id = el.getAttribute("id");
    if (id && labelledIds.has(id)) return false;
    if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.getAttribute("title")) return false;
    let parent = el.parentNode as HTMLElement | null;
    while (parent) {
      if (parent.tagName === "LABEL") return false;
      parent = parent.parentNode as HTMLElement | null;
    }
    return true;
  });
  checks.push(
    c({
      id: "a11y-form-labels",
      title: "Form fields have labels",
      impact: "high",
      status: inputs.length === 0 ? "info" : unlabelled.length === 0 ? "pass" : "fail",
      detail:
        inputs.length === 0
          ? "No form fields were found on this page."
          : unlabelled.length === 0
            ? inputs.length === 1
              ? "The one form field has a label."
              : `All ${inputs.length} form fields have a label.`
            : `${plural(unlabelled.length, "form field")} of ${inputs.length} have no label, so assistive technology cannot say what to type.`,
      fix: unless(inputs.length === 0, "Pair every field with a visible <label for>, or an aria-label where a visible label is impossible. Placeholder text is not a label. WCAG 1.3.1 and 3.3.2."),
      evidence: unlabelled.map((el) => trim(`<${el.tagName.toLowerCase()} name="${el.getAttribute("name") ?? ""}" type="${el.getAttribute("type") ?? "text"}">`)),
    })
  );

  /* Links */
  const visibleAnchors = anchors.filter((a) => !isHiddenFromAt(a.el));
  const emptyLinks = visibleAnchors.filter((a) => {
    if (a.text) return false;
    const img = a.el.querySelector("img");
    if (img && img.getAttribute("alt")) return false;
    if (a.el.getAttribute("title")) return false;
    return true;
  });
  checks.push(
    c({
      id: "a11y-empty-links",
      title: "Every link has a name",
      impact: "high",
      status: emptyLinks.length === 0 ? "pass" : emptyLinks.length <= 2 ? "warn" : "fail",
      detail:
        emptyLinks.length === 0
          ? visibleAnchors.length === 1
            ? "The one link has text or a label."
            : `All ${visibleAnchors.length} links have text or a label.`
          : `${plural(emptyLinks.length, "link")} ${agree(emptyLinks.length, "has", "have")} no text, alt or label. Screen readers announce ${agree(emptyLinks.length, "it", "them")} as just "link".`,
      fix: "Give icon and image links an aria-label or alt text that says where they go. WCAG 2.4.4 and 4.1.2.",
      evidence: emptyLinks.map((a) => trim(a.href || "(no href)", 90)),
    })
  );

  const generic = visibleAnchors.filter((a) => GENERIC_LINK_TEXT.has(a.text.toLowerCase().replace(/[.!»›>→]+$/g, "").trim()));
  checks.push(
    c({
      id: "a11y-generic-links",
      title: "Link text says where it goes",
      impact: "low",
      status: generic.length === 0 ? "pass" : generic.length <= 3 ? "warn" : "fail",
      detail:
        generic.length === 0
          ? "No links rely on vague text such as \u201cclick here\u201d or \u201cread more\u201d."
          : `${plural(generic.length, "link")} ${agree(generic.length, "uses", "use")} vague text such as \u201c${generic[0].text}\u201d. Out of context (as screen-reader users hear ${agree(generic.length, "it", "them")}) ${agree(generic.length, "it means", "they mean")} nothing.`,
      fix: "Rewrite links to name the destination: \u201cBook an appointment\u201d rather than \u201cclick here\u201d.",
      evidence: generic.map((a) => `\u201c${a.text}\u201d → ${trim(a.href, 60)}`),
    })
  );

  /* Zoom */
  const viewport = (page.metas.get("viewport") ?? "").toLowerCase();
  const zoomBlocked =
    /user-scalable\s*=\s*(no|0)/.test(viewport) ||
    (/maximum-scale\s*=\s*([\d.]+)/.exec(viewport)?.[1] !== undefined && Number(/maximum-scale\s*=\s*([\d.]+)/.exec(viewport)?.[1]) < 2);
  checks.push(
    c({
      id: "a11y-zoom",
      title: "Visitors can zoom the page",
      impact: "high",
      status: zoomBlocked ? "fail" : "pass",
      detail: zoomBlocked
        ? `The viewport tag (${trim(viewport, 60)}) stops people zooming. Older visitors and anyone with low vision cannot enlarge the text.`
        : "The page does not block pinch-to-zoom.",
      fix: 'Remove user-scalable=no and any maximum-scale below 5 from the viewport meta tag. Use content="width=device-width, initial-scale=1". WCAG 1.4.4.',
    })
  );

  /* Landmarks and skip link */
  const hasMain = !!root.querySelector("main, [role=main]");
  const hasNav = !!root.querySelector("nav, [role=navigation]");
  checks.push(
    c({
      id: "a11y-landmarks",
      title: "Page uses landmark regions",
      impact: "medium",
      status: hasMain && hasNav ? "pass" : hasMain || hasNav ? "warn" : "fail",
      detail:
        hasMain && hasNav
          ? "The page marks up its main content and navigation, so screen-reader users can jump straight to either."
          : `The page ${hasMain ? "has a <main> region but no <nav>" : hasNav ? "has a <nav> region but no <main>" : "has neither a <main> nor a <nav> landmark"}. Screen-reader users must arrow through everything to find the content.`,
      fix: "Wrap the content in <main> and menus in <nav>. Landmarks are free structure that assistive technology uses heavily.",
    })
  );

  const skipLink = anchors.slice(0, 6).find((a) => a.href.startsWith("#") && /skip/i.test(a.text));
  checks.push(
    c({
      id: "a11y-skip-link",
      title: "Skip-to-content link",
      impact: "low",
      status: skipLink ? "pass" : "warn",
      detail: skipLink
        ? `A \u201c${trim(skipLink.text, 40)}\u201d link lets keyboard users bypass the menu.`
        : "No skip link was found near the top of the page, so keyboard users tab through the whole menu on every page.",
      fix: 'Add a visually hidden "Skip to main content" link as the first focusable element, pointing at the <main> element\u2019s id. WCAG 2.4.1.',
    })
  );

  /* Iframes */
  const iframes = root.querySelectorAll("iframe").filter((f) => !isHiddenFromAt(f));
  const untitled = iframes.filter((f) => !f.getAttribute("title") && !f.getAttribute("aria-label"));
  checks.push(
    c({
      id: "a11y-iframe-title",
      title: "Embedded frames are titled",
      impact: "medium",
      status: iframes.length === 0 ? "info" : untitled.length === 0 ? "pass" : "warn",
      detail:
        iframes.length === 0
          ? "No embedded frames (maps, videos, booking widgets) were found."
          : untitled.length === 0
            ? iframes.length === 1
              ? "The one embedded frame has a title."
              : `All ${plural(iframes.length, "embedded frame")} have a title.`
            : `${plural(untitled.length, "embedded frame")} (maps, videos or widgets) ${agree(untitled.length, "has", "have")} no title, so screen readers cannot say what ${agree(untitled.length, "it contains", "they contain")}.`,
      fix: unless(iframes.length === 0, 'Add title="Map showing the practice location" (or similar) to each <iframe>. WCAG 4.1.2.'),
      evidence: untitled.map((f) => trim(f.getAttribute("src") ?? "(inline frame)", 90)),
    })
  );

  /* Tab order and duplicate ids */
  const positiveTabindex = root.querySelectorAll("[tabindex]").filter((el) => Number(el.getAttribute("tabindex")) > 0);
  const ids = root.querySelectorAll("[id]").map((el) => el.getAttribute("id") ?? "");
  const dupes = [...new Set(ids.filter((id, i) => id && ids.indexOf(id) !== i))];
  const structureIssues = positiveTabindex.length + dupes.length;
  checks.push(
    c({
      id: "a11y-structure",
      title: "Clean tab order and unique ids",
      impact: "low",
      status: structureIssues === 0 ? "pass" : "warn",
      detail:
        structureIssues === 0
          ? "No positive tabindex values and no duplicate ids: the keyboard order follows the page order."
          : `${positiveTabindex.length ? `${plural(positiveTabindex.length, "element")} force a custom tab order` : ""}${positiveTabindex.length && dupes.length ? "; " : ""}${dupes.length ? `${plural(dupes.length, "id is", "ids are")} used more than once` : ""}. Both confuse assistive technology.`,
      fix: "Remove positive tabindex values and make every id unique so labels and ARIA references resolve correctly.",
      evidence: dupes.map((d) => `id="${trim(d, 40)}"`),
    })
  );

  /* Accessibility statement */
  const statement = anchors.find((a) => /accessib/i.test(a.text) || /accessibility/i.test(a.href));
  checks.push(
    c({
      id: "a11y-statement",
      title: "Accessibility statement published",
      impact: "medium",
      status: statement ? "pass" : "fail",
      detail: statement
        ? `An accessibility page is linked (\u201c${trim(statement.text || statement.href, 50)}\u201d).`
        : "No link to an accessibility statement was found. Public-sector and NHS-facing websites are expected to publish one.",
      fix: "Publish an accessibility statement in the required format and link it from the footer of every page (Public Sector Bodies Accessibility Regulations 2018).",
    })
  );

  return checks;
};
