import { describe, expect, it } from "vitest";
import { calBookingUrl, calEventSlug, calOrigin, calUsername } from "./cal";

describe("cal public booking links", () => {
  it("uses the live Cal.com username, not flutterly", () => {
    expect(calUsername).toBe("anoop-jose-jtij1j");
    expect(calOrigin).toBe("https://cal.com");
  });

  it("maps all three Flutterly call types to Olivia’s live event slugs", () => {
    expect(calEventSlug("intro-call")).toBe("intro");
    expect(calEventSlug("consultation")).toBe("consultation");
    expect(calEventSlug("project-scoping")).toBe("project-scoping");
    expect(calBookingUrl("intro-call")).toBe(
      "https://cal.com/anoop-jose-jtij1j/intro",
    );
    expect(calBookingUrl("consultation")).toBe(
      "https://cal.com/anoop-jose-jtij1j/consultation",
    );
    expect(calBookingUrl("project-scoping")).toBe(
      "https://cal.com/anoop-jose-jtij1j/project-scoping",
    );
  });

  it("does not use the retired discovery / domain-transfer slugs", () => {
    expect(calEventSlug("intro-call")).not.toBe("short-discovery-meeting");
    expect(calEventSlug("consultation")).not.toBe("30-minutes-meeting");
  });
});
