import { checker, plural, trim, type CheckModule } from "./context";

const c = checker("security");

export const securityChecks: CheckModule = ({ page, httpProbe }) => {
  const { fetched, url, root } = page;
  const h = fetched.headers;
  const checks = [];

  /* HTTPS */
  const https = url.protocol === "https:";
  checks.push(
    c({
      id: "sec-https",
      title: "Served over HTTPS",
      impact: "high",
      status: https ? "pass" : "fail",
      detail: https
        ? "The page is served over an encrypted connection."
        : "The page is served over plain http. Browsers label it \u201cNot secure\u201d, and anything visitors type can be read in transit.",
      fix: "Install a TLS certificate (free via Let\u2019s Encrypt or your host) and serve every page over https.",
    })
  );

  /* http → https redirect */
  const probeRedirect = httpProbe?.redirects[0];
  const probeToHttps = probeRedirect ? probeRedirect.startsWith("https://") : false;
  checks.push(
    c({
      id: "sec-http-redirect",
      title: "Insecure address redirects to HTTPS",
      impact: "medium",
      status: !https ? "fail" : httpProbe === null ? "info" : probeToHttps ? "pass" : "fail",
      detail: !https
        ? "The site itself is on http, so there is no secure version to redirect to."
        : httpProbe === null
          ? "The plain-http address could not be probed in time."
          : probeToHttps
            ? `http://${url.host} redirects to the secure site.`
            : httpProbe.status >= 300 && httpProbe.status < 400
              ? `http://${url.host} redirects, but to another insecure address (${trim(probeRedirect ?? "", 60)}).`
              : `http://${url.host} serves the site without redirecting to https (status ${httpProbe.status}). Anyone typing the address gets the insecure version.`,
      fix: "Redirect every http request to the matching https address with a 301.",
    })
  );

  /* HSTS */
  const hsts = h.get("strict-transport-security");
  checks.push(
    c({
      id: "sec-hsts",
      title: "HSTS enabled",
      impact: "medium",
      status: !https ? "fail" : hsts ? "pass" : "warn",
      detail: hsts
        ? `Strict-Transport-Security is set (${trim(hsts, 50)}), so browsers refuse to load the site insecurely.`
        : "No Strict-Transport-Security header. Returning visitors can still be downgraded to http by an attacker on the same Wi-Fi.",
      fix: "Send Strict-Transport-Security: max-age=31536000; includeSubDomains.",
    })
  );

  /* CSP */
  const csp = h.get("content-security-policy") ?? page.metas.get("content-security-policy");
  checks.push(
    c({
      id: "sec-csp",
      title: "Content Security Policy",
      impact: "medium",
      status: csp ? "pass" : "warn",
      detail: csp
        ? "A Content-Security-Policy limits which scripts and resources may run."
        : "No Content-Security-Policy. If any plugin or embed is compromised, injected scripts run with full access to the page.",
      fix: "Add a Content-Security-Policy header listing the domains scripts, styles and frames may load from.",
    })
  );

  /* Clickjacking */
  const xfo = h.get("x-frame-options");
  const frameAncestors = csp ? /frame-ancestors/i.test(csp) : false;
  checks.push(
    c({
      id: "sec-frames",
      title: "Protected against clickjacking",
      impact: "medium",
      status: xfo || frameAncestors ? "pass" : "warn",
      detail:
        xfo || frameAncestors
          ? `The site cannot be embedded in a hostile frame (${xfo ? `X-Frame-Options: ${xfo}` : "CSP frame-ancestors"}).`
          : "Nothing stops another site framing yours and tricking visitors into clicking on it.",
      fix: "Send X-Frame-Options: SAMEORIGIN or a CSP frame-ancestors directive.",
    })
  );

  /* Misc headers */
  const xcto = (h.get("x-content-type-options") ?? "").toLowerCase() === "nosniff";
  const referrer = !!h.get("referrer-policy");
  const permissions = !!h.get("permissions-policy");
  const hardening = [xcto, referrer, permissions].filter(Boolean).length;
  checks.push(
    c({
      id: "sec-hardening-headers",
      title: "Hardening headers",
      impact: "low",
      status: hardening === 3 ? "pass" : hardening >= 1 ? "warn" : "fail",
      detail:
        hardening === 3
          ? "X-Content-Type-Options, Referrer-Policy and Permissions-Policy are all set."
          : `Missing ${[!xcto && "X-Content-Type-Options", !referrer && "Referrer-Policy", !permissions && "Permissions-Policy"].filter(Boolean).join(", ")}.`,
      fix: "Send X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin and a Permissions-Policy. All three are one-line server settings.",
    })
  );

  /* Mixed content */
  const mixed = https
    ? [
        ...root.querySelectorAll("script[src], img[src], iframe[src], link[href], source[src], video[src], audio[src]"),
      ]
        .map((el) => el.getAttribute("src") ?? el.getAttribute("href") ?? "")
        .filter((src) => /^http:\/\//i.test(src))
    : [];
  checks.push(
    c({
      id: "sec-mixed-content",
      title: "No mixed content",
      impact: "high",
      status: !https ? "info" : mixed.length === 0 ? "pass" : "fail",
      detail: !https
        ? "Not applicable on an http site."
        : mixed.length === 0
          ? "Every script, image, stylesheet and frame loads over https."
          : `${plural(mixed.length, "resource")} load over plain http on an https page. Browsers block or warn about them, and the padlock is lost.`,
      fix: "Change the http:// resource addresses to https:// (or protocol-relative) and re-test.",
      evidence: mixed.map((m) => trim(m, 90)),
    })
  );

  /* Information disclosure */
  const server = h.get("server") ?? "";
  const powered = h.get("x-powered-by") ?? "";
  const generator = page.metas.get("generator") ?? "";
  const versioned = [server, powered, generator].filter((v) => /\d+\.\d+/.test(v));
  checks.push(
    c({
      id: "sec-disclosure",
      title: "Software versions kept private",
      impact: "medium",
      status: versioned.length === 0 ? "pass" : "warn",
      detail:
        versioned.length === 0
          ? "The server and CMS do not advertise version numbers."
          : `The site advertises exact software versions (${versioned.map((v) => trim(v, 40)).join("; ")}). Attackers search for sites running versions with known holes.`,
      fix: "Remove the generator meta tag and strip version numbers from the Server and X-Powered-By headers.",
    })
  );

  /* Outdated libraries */
  const oldLibs = page.scripts
    .map((s) => s.getAttribute("src") ?? "")
    .filter((src) => /jquery[-.]?(1\.\d|2\.\d)|jquery-migrate|bootstrap[-./]?3\.|angular(js)?[-./]1\./i.test(src));
  checks.push(
    c({
      id: "sec-old-libraries",
      title: "No known-outdated JavaScript libraries",
      impact: "medium",
      status: oldLibs.length === 0 ? "pass" : "warn",
      detail:
        oldLibs.length === 0
          ? "No obviously outdated libraries (old jQuery, Bootstrap 3, AngularJS) were referenced."
          : `${plural(oldLibs.length, "script")} reference end-of-life libraries with published vulnerabilities.`,
      fix: "Update or remove legacy libraries; most practice websites do not need jQuery at all.",
      evidence: oldLibs.map((s) => trim(s, 90)),
    })
  );

  /* Cookies */
  const setCookies = h.getSetCookie ? h.getSetCookie() : [];
  const insecureCookies = setCookies.filter((ck) => !/;\s*secure/i.test(ck) || !/;\s*httponly/i.test(ck));
  checks.push(
    c({
      id: "sec-cookies",
      title: "Cookies set securely",
      impact: "low",
      status: setCookies.length === 0 ? "info" : insecureCookies.length === 0 ? "pass" : "warn",
      detail:
        setCookies.length === 0
          ? "The page set no cookies on first visit, which is ideal for privacy and consent."
          : insecureCookies.length === 0
            ? `${plural(setCookies.length, "cookie")} set, all with Secure and HttpOnly.`
            : `${plural(insecureCookies.length, "cookie")} of ${setCookies.length} lack the Secure or HttpOnly flag.`,
      fix: "Set Secure, HttpOnly and SameSite on every cookie, and avoid setting cookies before consent.",
      evidence: insecureCookies.map((ck) => trim(ck.split("=")[0], 40)),
    })
  );

  return checks;
};
