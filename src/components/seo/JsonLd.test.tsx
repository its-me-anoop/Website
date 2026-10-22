import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { JsonLd, serializeJsonLd } from "./JsonLd";

const hostile = {
  "@type": "FAQPage",
  name: 'Answer</script><script>alert("x")</script><!-- and <b>tags</b>',
};

describe("serializeJsonLd", () => {
  it("never emits a raw '<', so no value can close the script element", () => {
    const out = serializeJsonLd(hostile);
    expect(out).not.toContain("<");
    expect(out).toContain("\\u003c/script>");
  });

  it("parses back to exactly the original data", () => {
    expect(JSON.parse(serializeJsonLd(hostile))).toEqual(hostile);
  });
});

describe("<JsonLd>", () => {
  it("server-renders hostile text that stays inside its ld+json script", () => {
    // Parse the server HTML the way a browser would, not via innerHTML.
    const html = renderToStaticMarkup(<JsonLd data={[hostile, { "@type": "WebSite" }]} />);
    const doc = new DOMParser().parseFromString(`<!doctype html><body>${html}</body>`, "text/html");
    const scripts = doc.querySelectorAll("script");
    expect(scripts).toHaveLength(2);
    expect([...scripts].every((s) => s.type === "application/ld+json")).toBe(true);
    expect(doc.querySelectorAll("b")).toHaveLength(0);
    expect(JSON.parse(scripts[0].textContent ?? "")).toEqual(hostile);
  });
});

describe("JSON-LD call sites", () => {
  it("serialise through JsonLd, never with a bare JSON.stringify", () => {
    const root = process.cwd();
    const files = execFileSync("git", ["ls-files", "-z", "src"], { cwd: root, encoding: "utf8" })
      .split("\0")
      .filter((f) => /\.(tsx?|jsx?)$/.test(f));
    const offenders = files.filter((f) =>
      /__html:\s*JSON\.stringify\(/.test(readFileSync(path.join(root, f), "utf8"))
    );
    expect(offenders).toEqual([]);
  });
});
