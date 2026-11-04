import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { sipli } from "./sipli";

const publicFile = (src: string) => path.join(process.cwd(), "public", src);

describe("Sipli content", () => {
  it("links to the live App Store listing", () => {
    expect(sipli.appStoreUrl).toBe("https://apps.apple.com/us/app/sipli-water-tracker/id6758851574");
  });

  it("follows the current App Store description's sections", () => {
    expect(sipli.sections.map((s) => s.id)).toEqual(["bottle", "duo", "logging", "keep-going", "siri"]);
  });

  it("keeps the free and Premium lists from the listing, with no invented prices", () => {
    expect(sipli.free.length).toBeGreaterThanOrEqual(3);
    expect(sipli.premium.length).toBeGreaterThanOrEqual(3);
    expect(JSON.stringify(sipli)).not.toMatch(/£\s?\d|\$\s?\d/);
  });

  it("states the privacy promises and the wellness disclaimer", () => {
    const privacy = sipli.privacy.join(" ");
    expect(privacy).toMatch(/no account/i);
    expect(privacy).toMatch(/on your device/i);
    expect(sipli.disclaimer).toMatch(/not medical advice/i);
  });
});

describe("Sipli images", () => {
  const all = [sipli.hero, ...sipli.sections.flatMap((s) => s.images), sipli.ipad];

  it("uses only App Store screenshots from the Sipli repo, each on disk", () => {
    all.forEach((img) => {
      expect(img.src.startsWith("/projects/sipli/store/")).toBe(true);
      expect(existsSync(publicFile(img.src))).toBe(true);
      expect(img.alt).toMatch(/^Sipli/);
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
    });
  });

  it("gives every section at least one screenshot", () => {
    sipli.sections.forEach((s) => expect(s.images.length).toBeGreaterThan(0));
  });

  it("uses the in-app brand mark", () => {
    expect(existsSync(publicFile(sipli.mark.src))).toBe(true);
  });
});
