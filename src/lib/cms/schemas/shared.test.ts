import { describe, expect, it } from "vitest";
import { formatDate, imageSchema, isoDate, phoneToTel, ukPhone } from "./shared";

describe("ukPhone", () => {
  it("accepts UK numbers written with spaces", () => {
    expect(ukPhone.parse("0118 496 0123")).toBe("0118 496 0123");
    expect(ukPhone.parse("0118 496 0456")).toBe("0118 496 0456");
  });

  it("rejects non-phone strings", () => {
    for (const bad of ["", "call us", "12345", "+1 555 0100"]) {
      expect(ukPhone.safeParse(bad).success, bad).toBe(false);
    }
  });
});

describe("phoneToTel", () => {
  it("derives an international tel: href from a UK number", () => {
    expect(phoneToTel("0118 496 0123")).toBe("tel:+441184960123");
  });
});

describe("isoDate", () => {
  it("accepts real calendar dates", () => {
    expect(isoDate.parse("2026-07-18")).toBe("2026-07-18");
  });

  it("rejects malformed and impossible dates", () => {
    for (const bad of ["18 July 2026", "2026-13-01", "2026-02-30", "2026-7-8"]) {
      expect(isoDate.safeParse(bad).success, bad).toBe(false);
    }
  });
});

describe("formatDate", () => {
  it("renders an ISO date the way the demo displays dates", () => {
    expect(formatDate("2026-07-18")).toBe("18 July 2026");
    expect(formatDate("2026-06-02")).toBe("2 June 2026");
  });
});

describe("imageSchema", () => {
  it("accepts a rooted src with descriptive alt text", () => {
    const image = { src: "/demos/gp/gp-hero.jpg", alt: "The bright reception area at the surgery" };
    expect(imageSchema.parse(image)).toEqual(image);
  });

  it("rejects short alt text and unrooted paths", () => {
    expect(
      imageSchema.safeParse({ src: "/demos/gp/gp-hero.jpg", alt: "reception" }).success
    ).toBe(false);
    expect(
      imageSchema.safeParse({ src: "demos/gp/gp-hero.jpg", alt: "The bright reception area" }).success
    ).toBe(false);
  });
});
