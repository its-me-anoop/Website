import { describe, expect, it } from "vitest";
import { storeStatus, streetcrew } from "./streetcrew";

describe("StreetCrew content", () => {
  it("uses the shipped product name, never the old working name", () => {
    const text = JSON.stringify(streetcrew);
    expect(streetcrew.name).toBe("StreetCrew");
    expect(text).not.toMatch(/\bPace\b/);
  });

  it("matches the App Store listing's subtitle and pricing", () => {
    expect(streetcrew.subtitle).toBe("Every walk, somewhere new");
    expect(streetcrew.price).toMatch(/free/i);
    expect(streetcrew.price).toMatch(/no in-app purchases/i);
  });

  it("covers the five listing groups, each with at least two features", () => {
    expect(streetcrew.featureGroups.map((g) => g.title)).toEqual([
      "Record",
      "Explore",
      "Plan",
      "Remember",
      "Share, if you want to",
    ]);
    streetcrew.featureGroups.forEach((g) => expect(g.points.length).toBeGreaterThanOrEqual(2));
  });

  it("states the privacy promises the app makes", () => {
    const privacy = streetcrew.privacyPoints.join(" ");
    expect(privacy).toMatch(/no account/i);
    expect(privacy).toMatch(/stay on your device/i);
    expect(privacy).toMatch(/no ads/i);
  });

  it("links to secure privacy, support and terms pages", () => {
    [streetcrew.links.privacy, streetcrew.links.support, streetcrew.links.terms].forEach((url) =>
      expect(url).toMatch(/^https:\/\//)
    );
  });
});

describe("storeStatus", () => {
  it("is 'coming soon' until there is an App Store link", () => {
    expect(storeStatus(null)).toEqual({ kind: "coming-soon" });
  });

  it("is 'available' with an apps.apple.com link", () => {
    const url = "https://apps.apple.com/gb/app/streetcrew/id123";
    expect(storeStatus(url)).toEqual({ kind: "available", url });
  });

  it("rejects links that are not the App Store", () => {
    expect(() => storeStatus("https://example.com/app")).toThrow(/apps\.apple\.com/);
  });
});
