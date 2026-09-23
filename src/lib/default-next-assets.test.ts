import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * create-next-app ships these under public/ and nothing in this repo
 * references them. Keep them gone so the scaffold does not creep back.
 */
const REMOVED_DEFAULT_SVGS = [
  "public/next.svg",
  "public/vercel.svg",
  "public/window.svg",
  "public/file.svg",
  "public/globe.svg",
] as const;

describe("create-next-app default public SVGs", () => {
  it.each(REMOVED_DEFAULT_SVGS)("%s is not in the repo", (relativePath) => {
    expect(existsSync(path.join(process.cwd(), relativePath))).toBe(false);
  });
});
