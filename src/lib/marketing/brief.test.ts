import { describe, expect, it } from "vitest";
import { site } from "@/lib/site";
import { serviceSlugs } from "./services";
import {
  briefLines,
  briefText,
  bookHref,
  emptyBrief,
  isBriefStarted,
  mailtoHref,
  needOptions,
  nextStep,
  parseBrief,
  stageOptions,
  timingOptions,
  toggleNeed,
  type Brief,
} from "./brief";

const full: Brief = { needs: ["websites", "seo"], stage: "improve", timing: "soon" };

describe("brief options", () => {
  it("offers every service as a need, in the services order", () => {
    expect(needOptions.map((o) => o.value)).toEqual(serviceSlugs);
  });

  it("offers three stages and three timings", () => {
    expect(stageOptions.map((o) => o.value)).toEqual(["new", "improve", "care"]);
    expect(timingOptions.map((o) => o.value)).toEqual(["now", "soon", "exploring"]);
  });
});

describe("toggleNeed", () => {
  it("adds and removes a need, keeping the services order", () => {
    const a = toggleNeed(emptyBrief, "seo");
    const b = toggleNeed(a, "websites");
    expect(b.needs).toEqual(["websites", "seo"]);
    expect(toggleNeed(b, "seo").needs).toEqual(["websites"]);
  });

  it("does not mutate the brief it is given", () => {
    const before = { ...emptyBrief, needs: [] };
    toggleNeed(before, "apps");
    expect(before.needs).toEqual([]);
  });
});

describe("isBriefStarted", () => {
  it("is false until at least one need is picked", () => {
    expect(isBriefStarted(emptyBrief)).toBe(false);
    expect(isBriefStarted({ ...emptyBrief, stage: "new" })).toBe(false);
    expect(isBriefStarted({ needs: ["apps"] })).toBe(true);
  });
});

describe("briefLines", () => {
  it("writes the brief as plain-English sentences", () => {
    expect(briefLines(full)).toEqual([
      "I need help with a website and SEO.",
      "We have something already, but it isn't working as it should.",
      "We're planning for the next few months.",
    ]);
  });

  it("joins three or more needs with commas and a final 'and'", () => {
    expect(briefLines({ needs: ["apps", "it-support", "social-media"] })).toEqual([
      "I need help with an app, IT support and social media.",
    ]);
  });

  it("leaves out the parts not yet answered", () => {
    expect(briefLines({ needs: ["apps"], timing: "now" })).toEqual([
      "I need help with an app.",
      "We'd like to start as soon as possible.",
    ]);
    expect(briefLines(emptyBrief)).toEqual([]);
  });
});

describe("briefText", () => {
  it("joins the lines into one paragraph", () => {
    expect(briefText(full)).toBe(briefLines(full).join(" "));
  });
});

describe("nextStep", () => {
  it("suggests the free audit first when an existing site needs fixing", () => {
    expect(nextStep(full)).toBe("audit");
    expect(nextStep({ needs: ["seo"], stage: "care" })).toBe("call");
    expect(nextStep({ needs: ["apps"], stage: "improve" })).toBe("call");
  });

  it("suggests a call otherwise", () => {
    expect(nextStep({ needs: ["websites"], stage: "new" })).toBe("call");
    expect(nextStep(emptyBrief)).toBe("call");
  });
});

describe("bookHref and parseBrief", () => {
  it("links to the plain booking page when nothing is picked", () => {
    expect(bookHref(emptyBrief)).toBe("/book");
  });

  it("carries the brief to the booking page as short, readable parameters", () => {
    expect(bookHref(full)).toBe("/book?needs=websites%2Cseo&stage=improve&timing=soon");
  });

  it("round-trips through the booking page's query string", () => {
    const query = bookHref(full).split("?")[1];
    expect(parseBrief(new URLSearchParams(query))).toEqual(full);
  });

  it("ignores anything that is not a known option", () => {
    const parsed = parseBrief(new URLSearchParams("needs=websites,hack,seo,seo&stage=bogus&timing=now"));
    expect(parsed).toEqual({ needs: ["websites", "seo"], timing: "now" });
  });

  it("returns null when the query holds no needs", () => {
    expect(parseBrief(new URLSearchParams(""))).toBeNull();
    expect(parseBrief(new URLSearchParams("stage=new"))).toBeNull();
  });
});

describe("mailtoHref", () => {
  it("drafts an email to the studio with the brief as the body", () => {
    const href = mailtoHref(full);
    expect(href.startsWith(`mailto:${site.email}?`)).toBe(true);
    const params = new URLSearchParams(href.split("?")[1]);
    expect(params.get("subject")).toBe("My brief: website and SEO");
    expect(params.get("body")).toContain(briefText(full));
  });
});
