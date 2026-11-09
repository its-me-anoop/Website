import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, getCaseStudy } from "./case-studies";
import { featuredWork, projects } from "./content";

const inPublic = (src: string) => existsSync(path.join(process.cwd(), "public", src));

describe("case studies", () => {
  it("each has a unique slug that a work tile and a project entry link to", () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => {
      const href = `/projects/${slug}`;
      expect(featuredWork.some((t) => t.href === href)).toBe(true);
      expect(projects.some((p) => p.href === href)).toBe(true);
      expect(getCaseStudy(slug)?.slug).toBe(slug);
    });
  });

  it("returns nothing for a project with its own page", () => {
    expect(getCaseStudy("sipli")).toBeUndefined();
  });

  it.each(caseStudies.map((c) => [c.name, c] as const))("%s only shows images that exist, each described", (_name, study) => {
    [study.mark, ...study.shots].forEach((image) => {
      expect(inPublic(image.src), image.src).toBe(true);
      expect(image.alt.length).toBeGreaterThan(10);
    });
    study.shots.forEach((shot) => expect(shot.caption).not.toBe(""));
  });

  it.each(caseStudies.map((c) => [c.name, c] as const))("%s states where it stands and keeps its description to 160 characters", (_name, study) => {
    expect(study.status.length).toBeGreaterThan(20);
    expect(study.metaDescription.length).toBeLessThanOrEqual(160);
    expect(study.features.length).toBeGreaterThanOrEqual(3);
  });

  it("says so plainly when a project has no screenshots", () => {
    caseStudies
      .filter((c) => c.shots.length === 0)
      .forEach((c) => expect(c.status).toMatch(/no(ne)? .*(screenshots|shown)|screenshots .* yet/i));
  });
});

describe("work tiles", () => {
  it("every tile image and project image exists", () => {
    featuredWork.forEach((t) => {
      if ("image" in t) expect(inPublic(t.image.src), t.image.src).toBe(true);
    });
    projects.forEach((p) => expect(inPublic(p.image), p.image).toBe(true));
  });
});
