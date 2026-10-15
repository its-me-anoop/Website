import { describe, expect, it, vi } from "vitest";
import type { Metadata } from "next";
import { site } from "@/lib/site";

vi.mock("next/navigation", () => ({ usePathname: () => "/", notFound: () => { throw new Error("notFound"); } }));

type Images = { url: string; alt?: string }[];
const og = (m: Metadata) => (m.openGraph?.images ?? []) as Images;
const tw = (m: Metadata) => (m.twitter?.images ?? []) as string[];

async function metadataFor(path: string): Promise<Metadata> {
  if (path.startsWith("/services/")) {
    const mod = await import("./services/[slug]/page");
    return mod.generateMetadata({ params: Promise.resolve({ slug: path.split("/")[2] }) });
  }
  const loaders: Record<string, () => Promise<{ metadata: Metadata }>> = {
    "/": () => import("./page"),
    "/services": () => import("./services/page"),
    "/free-audit": () => import("./free-audit/page"),
    "/packages": () => import("./packages/page"),
    "/book": () => import("./book/page"),
    "/accessibility": () => import("./accessibility/page"),
    "/gp-websites": () => import("./gp-websites/page"),
    "/care-home-websites": () => import("./care-home-websites/page"),
    "/leaving-msw": () => import("./leaving-msw/page"),
  };
  return (await loaders[path]()).metadata;
}

describe("social preview images", () => {
  it("the default card is not the healthcare-only card", () => {
    expect(site.ogImage).not.toBe(site.healthcareOgImage.url);
    expect(site.ogImage).not.toBe("/og-aurora.png");
  });

  it.each([
    "/",
    "/services",
    "/services/websites",
    "/services/apps",
    "/services/it-support",
    "/services/social-media",
    "/services/seo",
    "/free-audit",
    "/packages",
    "/book",
    "/accessibility",
  ])("%s uses the broad studio card with matching alt text", async (path) => {
    const m = await metadataFor(path);
    expect(og(m)[0].url).toBe(site.ogImage);
    expect(og(m)[0].alt).toBe(site.ogImageAlt);
    expect(tw(m)).toEqual([site.ogImage]);
  });

  it.each(["/gp-websites", "/care-home-websites", "/leaving-msw"])(
    "%s keeps the healthcare card deliberately",
    async (path) => {
      const m = await metadataFor(path);
      expect(og(m)[0]).toMatchObject(site.healthcareOgImage);
      expect(tw(m)).toEqual([site.healthcareOgImage.url]);
    }
  );
});
