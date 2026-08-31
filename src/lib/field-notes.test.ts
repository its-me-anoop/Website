import { describe, expect, it } from "vitest";
import { FIELD_NOTES_PATHS, isFieldNotesPath } from "./field-notes";

describe("isFieldNotesPath", () => {
  it("matches the locked buyer-journey routes, with or without a trailing slash", () => {
    expect(FIELD_NOTES_PATHS).toEqual([
      "/",
      "/gp-websites",
      "/care-home-websites",
      "/packages",
      "/about",
      "/contact",
    ]);

    for (const path of FIELD_NOTES_PATHS) {
      expect(isFieldNotesPath(path)).toBe(true);
      if (path !== "/") expect(isFieldNotesPath(`${path}/`)).toBe(true);
    }
  });

  it("leaves Bloom, book, demo and unknown routes alone", () => {
    ["", null, undefined, "/services", "/book", "/free-audit", "/demo/gp-practice"].forEach(
      (path) => {
        expect(isFieldNotesPath(path)).toBe(false);
      },
    );
  });
});
