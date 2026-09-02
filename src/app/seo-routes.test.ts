import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import { site } from "@/lib/site";

/**
 * Guards the canonical host. The site is served from www.flutterly.co.uk;
 * flutterly.uk is a parked domain that was once advertised here by
 * mistake, so every crawl-facing URL must resolve to the canonical origin.
 */
describe("canonical host", () => {
  it("is the www .co.uk origin, over https, with no trailing slash", () => {
    expect(site.url).toBe("https://www.flutterly.co.uk");
    expect(site.domain).toBe(new URL(site.url).host);
  });

  it("robots.txt advertises the canonical host and sitemap", () => {
    const result = robots();
    expect(result.host).toBe(site.url);
    expect(result.sitemap).toBe(`${site.url}/sitemap.xml`);
  });

  it("sitemap lists only canonical-host URLs, once each", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.length).toBeGreaterThan(0);
    urls.forEach((url) => expect(url.startsWith(`${site.url}/`)).toBe(true));
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.some((url) => url.includes("flutterly.uk"))).toBe(false);
  });

  it("sitemap excludes noindex demo pages and redirect-only routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/demo/"))).toBe(false);
    expect(urls.some((url) => url.includes("/little-artist/"))).toBe(false);
  });

  it("sitemap has no trailing-slash duplicates beyond the root", () => {
    const urls = sitemap().map((entry) => entry.url);
    urls
      .filter((url) => url !== `${site.url}/`)
      .forEach((url) => expect(url.endsWith("/")).toBe(false));
  });
});
