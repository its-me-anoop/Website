import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { storeStatus, streetcrew } from "./streetcrew";

describe("StreetCrew content", () => {
  it("uses the shipped product name, never the old working name", () => {
    const text = JSON.stringify(streetcrew);
    expect(streetcrew.name).toBe("StreetCrew");
    expect(text).not.toMatch(/\bPace\b/);
  });

  it("matches the App Store listing's name, subtitle, tagline and pricing", () => {
    expect(streetcrew.storeName).toBe("StreetCrew: Walk & Run Tracker");
    expect(streetcrew.subtitle).toBe("Explore new streets & routes");
    expect(streetcrew.tagline).toBe("Every walk, somewhere new");
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

describe("StreetCrew images", () => {
  const publicFile = (src: string) => path.join(process.cwd(), "public", src);

  it("uses only the app's own App Store screenshots, each on disk with alt text", () => {
    expect(streetcrew.screenshots.map((s) => s.src)).toEqual([
      "/projects/streetcrew/record.jpg",
      "/projects/streetcrew/explore.jpg",
      "/projects/streetcrew/loop-planner.jpg",
    ]);
    streetcrew.screenshots.forEach((shot) => {
      expect(existsSync(publicFile(shot.src))).toBe(true);
      expect(shot.alt).toMatch(/^StreetCrew/);
      expect([shot.width, shot.height]).toEqual([1206, 2622]);
    });
  });

  it("pairs each screenshot with a feature group from the listing", () => {
    const titles = streetcrew.featureGroups.map((g) => g.title);
    streetcrew.screenshots.forEach((shot) => expect(titles).toContain(shot.group));
  });

  it("uses the App Store header artwork", () => {
    expect(existsSync(publicFile(streetcrew.header.src))).toBe(true);
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
