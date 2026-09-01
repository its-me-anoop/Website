import { describe, expect, it } from "vitest";
import { calBookingUrl, calEventSlug, calOrigin, calUsername } from "./cal";

describe("cal public booking links", () => {
  it("uses the live Cal.com username, not flutterly", () => {
    expect(calUsername).toBe("anoop-jose-jtij1j");
    expect(calOrigin).toBe("https://cal.com");
  });

  it("maps 15- and 30-minute calls to verified live event slugs", () => {
    expect(calEventSlug("intro-call")).toBe("short-discovery-meeting");
    expect(calEventSlug("consultation")).toBe("30-minutes-meeting");
    expect(calBookingUrl("intro-call")).toBe(
      "https://cal.com/anoop-jose-jtij1j/short-discovery-meeting",
    );
    expect(calBookingUrl("consultation")).toBe(
      "https://cal.com/anoop-jose-jtij1j/30-minutes-meeting",
    );
  });

  it("does not invent a project-scoping slug", () => {
    expect(calEventSlug("project-scoping")).toBeUndefined();
    expect(calBookingUrl("project-scoping")).toBeNull();
  });
});
