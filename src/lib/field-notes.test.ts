import { describe, expect, it } from "vitest";
import { FIELD_NOTES_PATHS, isFieldNotesPath } from "./field-notes";

describe("isFieldNotesPath", () => {
  it("matches Studio buyer-journey and policy routes", () => {
    expect(FIELD_NOTES_PATHS).toEqual([
      "/",
      "/gp-websites",
      "/care-home-websites",
      "/packages",
      "/about",
      "/contact",
      "/services",
      "/book",
      "/accessibility",
      "/cookie-policy",
      "/privacy",
    ]);

    for (const path of FIELD_NOTES_PATHS) {
      expect(isFieldNotesPath(path)).toBe(true);
      if (path !== "/") expect(isFieldNotesPath(`${path}/`)).toBe(true);
    }
  });

  it("treats Cal deep links as Studio chrome", () => {
    expect(isFieldNotesPath("/book/intro-call")).toBe(true);
    expect(isFieldNotesPath("/book/consultation")).toBe(true);
    expect(isFieldNotesPath("/book/project-scoping")).toBe(true);
  });

  it("leaves Bloom manage, demos and unknown routes alone", () => {
    ["", null, undefined, "/free-audit", "/book/manage", "/demo/gp-practice"].forEach(
      (path) => {
        expect(isFieldNotesPath(path)).toBe(false);
      },
    );
  });
});
