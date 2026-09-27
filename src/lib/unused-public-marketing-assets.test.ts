import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Nightly DevX 2026-09-27: these public binaries had zero path/basename
 * references in src/, content/, scripts/, docs/, or marketing/. Keep them
 * gone so unused marketing screenshots and brand variants do not creep back.
 *
 * Intentionally excludes assets already covered by open PRs:
 * - create-next-app SVGs (#65)
 * - unused Sipli iPad/iPhone binaries (#66)
 */
const REMOVED_UNUSED_PUBLIC_ASSETS = [
  "public/projects/artling/paywall-review.mp4",
  "public/abstract-greenmead.png",
  "public/abstract-jjpaper.png",
  "public/abstract-sandbourne.png",
  "public/hero-desk.jpg",
  "public/images/sipli-mascot.png",
  "public/projects/sipli/app-icon.png",
  "public/projects/sipli/dashboard.png",
  "public/projects/sipli/analytics.png",
  "public/projects/sipli/dashboard_dark.png",
  "public/logo-horizontal.png",
  "public/logo-icon.png",
  "public/logo-tagline.png",
  "public/flutterly-bottomtitle.png",
  "public/flutterly-title.png",
  "public/flutterly-title-caption.png",
] as const;

describe("unused public marketing assets", () => {
  it.each(REMOVED_UNUSED_PUBLIC_ASSETS)("%s is not in the repo", (relativePath) => {
    expect(existsSync(path.join(process.cwd(), relativePath))).toBe(false);
  });
});
