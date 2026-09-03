import { agree, checker, plural, trim, type CheckModule } from "./context";

const c = checker("mobile");

const UK_PHONE = /(?:(?:\+44\s?\(?0?\)?|0)(?:\d\s?){9,10})/g;

export const mobileChecks: CheckModule = ({ page }) => {
  const { metas, root, images, anchors, textRaw } = page;
  const checks = [];

  /* Viewport */
  const viewport = metas.get("viewport") ?? "";
  const responsive = /width\s*=\s*device-width/i.test(viewport);
  checks.push(
    c({
      id: "mobile-viewport",
      title: "Configured for mobile screens",
      impact: "high",
      status: responsive ? "pass" : viewport ? "warn" : "fail",
      detail: responsive
        ? `Viewport set to \u201c${trim(viewport, 60)}\u201d.`
        : viewport
          ? `The viewport tag (\u201c${trim(viewport, 60)}\u201d) does not use width=device-width, so phones render a shrunken desktop layout.`
          : "No viewport meta tag. Phones will show a tiny desktop layout that visitors have to pinch and pan around.",
      fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> and build the layout to adapt.',
    })
  );

  /* Fixed-width layout hints */
  /* Media elements carry intrinsic width attributes that CSS scales
     down, so only layout containers count here. */
  const fixedWidths = root
    .querySelectorAll("[style*=width], table[width], [width]")
    .filter((el) => !["img", "video", "source", "canvas", "svg", "picture", "iframe", "embed", "object"].includes(el.tagName.toLowerCase()))
    .filter((el) => {
      const style = el.getAttribute("style") ?? "";
      const attr = el.getAttribute("width") ?? "";
      const m = /(?:^|[^-])width\s*:\s*(\d+)px/i.exec(style);
      return (m && Number(m[1]) >= 700) || (/^\d+$/.test(attr) && Number(attr) >= 700);
    });
  checks.push(
    c({
      id: "mobile-fixed-width",
      title: "No fixed-width desktop layout",
      impact: "medium",
      status: fixedWidths.length === 0 ? "pass" : fixedWidths.length <= 2 ? "warn" : "fail",
      detail:
        fixedWidths.length === 0
          ? "No elements are pinned to a desktop-sized pixel width."
          : `${plural(fixedWidths.length, "element")} ${agree(fixedWidths.length, "is", "are")} fixed at 700px or wider, which forces horizontal scrolling on phones.`,
      fix: "Replace fixed pixel widths with max-width and percentages so content wraps to the screen.",
      evidence: fixedWidths.map((el) => trim(`<${el.tagName.toLowerCase()} ${el.getAttribute("width") ? `width="${el.getAttribute("width")}"` : `style="${el.getAttribute("style")}"`}>`, 80)),
    })
  );

  /* Legacy plugins */
  const plugins = root.querySelectorAll("object, embed, applet").filter((el) => /flash|shockwave|java|x-silverlight/i.test(el.getAttribute("type") ?? el.getAttribute("src") ?? el.getAttribute("data") ?? ""));
  checks.push(
    c({
      id: "mobile-plugins",
      title: "No Flash or plugin content",
      impact: "medium",
      status: plugins.length === 0 ? "pass" : "fail",
      detail: plugins.length === 0 ? "No Flash, Java or Silverlight content." : `${plural(plugins.length, "plugin embed")} found. Phones (and modern desktop browsers) cannot show them.`,
      fix: "Replace plugin content with HTML video, images or native embeds.",
    })
  );

  /* Tap-to-call */
  const phonesInText = [...new Set((textRaw.match(UK_PHONE) ?? []).map((p) => p.replace(/\s+/g, " ").trim()))].filter((p) => p.replace(/\D/g, "").length >= 10);
  const telLinks = anchors.filter((a) => a.href.toLowerCase().startsWith("tel:"));
  checks.push(
    c({
      id: "mobile-tel-links",
      title: "Phone numbers are tap-to-call",
      impact: "medium",
      status: phonesInText.length === 0 && telLinks.length === 0 ? "info" : telLinks.length > 0 ? "pass" : "fail",
      detail:
        phonesInText.length === 0 && telLinks.length === 0
          ? "No phone number was found on this page."
          : telLinks.length > 0
            ? `${plural(telLinks.length, "phone number")} can be tapped to call.`
            : `${plural(phonesInText.length, "phone number")} appear as plain text. On a phone, visitors have to memorise or copy them.`,
      fix: 'Wrap phone numbers in <a href="tel:+441189…">, so one tap dials the practice.',
      evidence: phonesInText,
    })
  );

  /* Responsive images */
  const srcsetCount = images.filter((img) => img.getAttribute("srcset") || img.getAttribute("sizes")).length;
  checks.push(
    c({
      id: "mobile-responsive-images",
      title: "Images adapt to screen size",
      impact: "low",
      status: images.length < 3 ? "info" : srcsetCount > 0 ? "pass" : "warn",
      detail:
        images.length < 3
          ? "Too few images to judge."
          : srcsetCount > 0
            ? `${srcsetCount} of ${images.length} images offer size variants via srcset.`
            : "No images offer smaller variants for phones, so mobile visitors download desktop-sized files.",
      fix: "Add srcset and sizes so a 400px-wide phone never downloads a 2000px image.",
    })
  );

  /* App-like polish */
  const touchIcon = page.links.some((l) => l.rel.includes("apple-touch-icon"));
  const themeColor = metas.has("theme-color");
  const manifest = page.links.some((l) => l.rel.includes("manifest"));
  const polish = [touchIcon, themeColor, manifest].filter(Boolean).length;
  checks.push(
    c({
      id: "mobile-polish",
      title: "Home-screen icon and theme colour",
      impact: "low",
      status: polish >= 2 ? "pass" : polish === 1 ? "warn" : "info",
      detail:
        polish >= 2
          ? "The site provides a home-screen icon and browser theme colour."
          : polish === 1
            ? `Only ${touchIcon ? "an apple-touch-icon" : themeColor ? "a theme-color" : "a web manifest"} is set.`
            : "No apple-touch-icon, theme-color or web manifest. Saving the site to a phone's home screen gives a blank icon.",
      fix: "Add an apple-touch-icon (180px), a theme-color meta tag and a small web manifest.",
    })
  );

  /* Interstitials and text size */
  const tinyText = root.querySelectorAll("[style*=font-size]").filter((el) => {
    const m = /font-size\s*:\s*(\d+(?:\.\d+)?)(px|pt)/i.exec(el.getAttribute("style") ?? "");
    if (!m) return false;
    const px = m[2] === "pt" ? Number(m[1]) * 1.333 : Number(m[1]);
    return px < 12 && el.textContent.trim().length > 20;
  });
  checks.push(
    c({
      id: "mobile-text-size",
      title: "Body text is readable without zooming",
      impact: "medium",
      status: tinyText.length === 0 ? "pass" : tinyText.length <= 2 ? "warn" : "fail",
      detail:
        tinyText.length === 0
          ? "No inline styles force text below 12px."
          : `${plural(tinyText.length, "block")} of text are styled below 12px, which is unreadable on a phone for many older visitors.`,
      fix: "Keep body text at 16px or larger and avoid inline font sizes.",
      evidence: tinyText.map((el) => trim(el.textContent, 60)),
    })
  );

  return checks;
};
