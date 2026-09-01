import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

const LIVE_HOST = "https://www.flutterly.co.uk";

const EXISTING_PATHS = [
  "/book",
  "/book/intro-call",
  "/book/consultation",
  "/book/project-scoping",
  "/",
  "/gp-websites",
  "/care-home-websites",
  "/services",
  "/business-email",
  "/social-media-marketing",
  "/packages",
  "/about",
  "/contact",
  "/free-audit",
  "/projects/sipli",
  "/projects/artling",
  "/privacy",
  "/accessibility",
  "/cookie-policy",
  "/projects/sipli/privacy-policy",
  "/projects/artling/privacy-policy",
  "/little-artist/privacy-policy",
];

describe("sitemap", () => {
  it("emits the existing live routes on the production host", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toEqual(EXISTING_PATHS.map((path) => `${LIVE_HOST}${path}`));
    expect(urls.every((url) => url.startsWith(LIVE_HOST))).toBe(true);
    expect(urls.some((url) => url.includes("flutterly.uk"))).toBe(false);
    expect(entries.every((entry) => entry.lastModified instanceof Date)).toBe(
      true,
    );
  });
});
