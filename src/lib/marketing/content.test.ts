import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  careSector,
  footerColumns,
  gpSector,
  heroSigns,
  navLinks,
  projects,
  sampleSigns,
  samples,
} from "./content";

const root = path.resolve(__dirname, "../../..");
const appDir = path.join(root, "src/app");
const publicDir = path.join(root, "public");

/** True when an internal href is served by a page in the App Router. */
function isPage(href: string) {
  const pathname = href.split(/[?#]/)[0] || "/";
  return fs.existsSync(path.join(appDir, pathname, "page.tsx"));
}

function isAsset(src: string) {
  return fs.existsSync(path.join(publicDir, src));
}

describe("sample sites", () => {
  it("covers the five sectors once each", () => {
    expect(samples.map((s) => s.slug)).toEqual(["gp", "care", "dental", "pharmacy", "physio"]);
  });

  it.each(samples.map((s) => [s.name, s] as const))("%s has a real home page and screenshots", (_, sample) => {
    expect(isPage(sample.href)).toBe(true);
    expect(isAsset(sample.image)).toBe(true);
    expect(isAsset(sample.mobileImage)).toBe(true);
    if (sample.sectorHref) expect(isPage(sample.sectorHref)).toBe(true);
  });

  it.each(samples.map((s) => [s.name, s] as const))(
    "%s answers three distinct visitor questions on its own pages",
    (_, sample) => {
      expect(sample.routes).toHaveLength(3);
      const hrefs = sample.routes.map((r) => r.href);
      expect(new Set(hrefs).size).toBe(3);
      sample.routes.forEach((route) => {
        expect(route.href.startsWith(`${sample.href}/`)).toBe(true);
        expect(isPage(route.href)).toBe(true);
        expect(route.ask.trim().length).toBeGreaterThan(0);
        expect(route.label.trim().length).toBeGreaterThan(0);
      });
    }
  );

  it("names who each sample is for", () => {
    samples.forEach((sample) => {
      expect(sample.audience.length).toBeGreaterThan(0);
      expect(sample.audienceCopy.length).toBeGreaterThan(0);
    });
  });
});

describe("hero signs", () => {
  it("point one sign at a real page on each sample site", () => {
    expect(heroSigns).toHaveLength(samples.length);
    heroSigns.forEach((sign, i) => {
      const sample = samples[i];
      expect(sign.place).toBe(sample.name);
      expect(sign.href.startsWith(`${sample.href}/`)).toBe(true);
      expect(isPage(sign.href)).toBe(true);
    });
  });

  it("alternate direction, like arms on a fingerpost", () => {
    heroSigns.forEach((sign, i) => {
      expect(sign.point).toBe(i % 2 === 0 ? "right" : "left");
    });
  });
});

describe("sampleSigns", () => {
  it("turns a sample's routes into alternating arms named for that sample", () => {
    const signs = sampleSigns(samples[1]);
    expect(signs.map((s) => s.href)).toEqual(samples[1].routes.map((r) => r.href));
    expect(signs.map((s) => s.label)).toEqual(samples[1].routes.map((r) => r.label));
    expect(signs.every((s) => s.place === samples[1].name)).toBe(true);
    expect(signs.map((s) => s.point)).toEqual(["right", "left", "right"]);
  });
});

describe("links", () => {
  it("navigation only points at real pages", () => {
    navLinks.forEach((link) => expect(isPage(link.href), link.href).toBe(true));
  });

  it("footer internal links point at real pages", () => {
    footerColumns
      .flatMap((column): readonly { label: string; href: string }[] => column.links)
      .filter((link) => link.href.startsWith("/"))
      .forEach((link) => expect(isPage(link.href), link.href).toBe(true));
  });

  it("project tiles have artwork and internal case studies exist", () => {
    projects.forEach((project) => {
      expect(isAsset(project.image), project.image).toBe(true);
      if (project.internal) expect(isPage(project.href), project.href).toBe(true);
    });
  });

  it.each([gpSector, careSector].map((s) => [s.slug, s] as const))("%s sector demo links resolve", (_, sector) => {
    expect(isPage(sector.demo.href)).toBe(true);
    expect(isPage(sector.demo.innerPath)).toBe(true);
    [sector.demo.image, sector.demo.innerImage, sector.demo.mobileImage].forEach((src) =>
      expect(isAsset(src), src).toBe(true)
    );
  });
});
