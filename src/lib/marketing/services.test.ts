import { describe, expect, it } from "vitest";
import {
  getService,
  headingText,
  pillars,
  serviceHref,
  serviceSlugs,
  services,
  servicesInPillar,
} from "./services";

describe("services content model", () => {
  it("offers the five rebranded services in order", () => {
    expect(services.map((s) => s.name)).toEqual(["Websites", "Apps", "IT support", "Social media", "SEO"]);
    expect(serviceSlugs).toEqual(["websites", "apps", "it-support", "social-media", "seo"]);
  });

  it("groups the services under Build, Support and Grow", () => {
    expect(pillars.map((p) => p.name)).toEqual(["Build", "Support", "Grow"]);
    expect(servicesInPillar("Build").map((s) => s.slug)).toEqual(["websites", "apps"]);
    expect(servicesInPillar("Support").map((s) => s.slug)).toEqual(["it-support"]);
    expect(servicesInPillar("Grow").map((s) => s.slug)).toEqual(["social-media", "seo"]);
    const covered = pillars.flatMap((p) => servicesInPillar(p.name));
    expect(covered).toHaveLength(services.length);
  });

  it("resolves a route segment to its service and rejects unknown slugs", () => {
    expect(getService("seo")?.name).toBe("SEO");
    expect(getService("printing")).toBeUndefined();
    expect(serviceHref("it-support")).toBe("/services/it-support");
  });

  it("builds a plain heading without stray spaces before punctuation", () => {
    expect(headingText(getService("it-support")!)).toBe("The IT underneath, handled.");
    expect(headingText(getService("websites")!)).toBe("Websites that work for the people who use them.");
  });

  it.each(services.map((s) => [s.slug, s] as const))("%s has complete, search-ready copy", (_slug, service) => {
    expect(service.includes.length).toBeGreaterThanOrEqual(3);
    expect(service.goodFor.length).toBeGreaterThan(0);
    expect(service.faqs.length).toBeGreaterThan(0);
    expect(service.related.length).toBeGreaterThan(0);
    expect(service.metaDescription.length).toBeGreaterThan(50);
    expect(service.metaDescription.length).toBeLessThanOrEqual(160);
    expect(service.cursorLabel).toMatch(/^Talk /);
  });

  it("never invents prices or statistics in the copy", () => {
    const copy = JSON.stringify(services);
    expect(copy).not.toMatch(/£\s?\d/);
    expect(copy).not.toMatch(/\d+\s?%/);
  });

  it("only links related content to internal routes", () => {
    services.flatMap((s) => s.related).forEach((link) => expect(link.href.startsWith("/")).toBe(true));
  });
});
