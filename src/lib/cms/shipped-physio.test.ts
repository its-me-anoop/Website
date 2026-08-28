import { describe, expect, it } from "vitest";
import { loadPhysioContent } from "./physio";

/**
 * The shipped Forbury Physiotherapy content must always validate — this
 * is the test that turns a bad content edit into a red build.
 */
describe("shipped physio-clinic content", () => {
  it("loads and validates end to end", () => {
    const content = loadPhysioContent();

    expect(content.clinic.name).toBe("Forbury Physiotherapy");
    expect(content.clinic.phoneHref).toBe("tel:+441184960678");
    expect(content.clinic.openingTimes).toHaveLength(7);
    expect(content.home.primaryTasks.length).toBeGreaterThanOrEqual(3);
    expect(content.home.conditionsTeaser.length).toBeGreaterThanOrEqual(3);
    expect(content.conditions.conditions.length).toBeGreaterThanOrEqual(8);
    expect(content.treatments.approaches.length).toBeGreaterThanOrEqual(4);
    expect(content.firstAppointment.beats).toHaveLength(4);
    expect(content.pricing.sessions.length).toBeGreaterThanOrEqual(2);
    expect(content.team.practitioners.length).toBeGreaterThanOrEqual(2);
    expect(content.trust.blocks.length).toBeGreaterThanOrEqual(5);
    expect(content.accessibility.reporting.email).toContain("@forburyphysio.example");
  });

  it("keeps HCPC numbers in the real sample format for every practitioner", () => {
    const content = loadPhysioContent();
    for (const practitioner of content.team.practitioners) {
      expect(practitioner.hcpcNumber).toMatch(/^PH\d{6}$/);
    }
  });

  it("never lets \"Chartered\" attach to the whole clinic — only individual practitioners carry it", () => {
    const content = loadPhysioContent();
    expect(content.clinic.name).not.toMatch(/chartered/i);
    expect(content.clinic.strap).not.toMatch(/chartered/i);
    expect(content.team.practitioners.some((p) => p.cspMember)).toBe(true);
  });

  it("marks every published price as a sample in the visible copy", () => {
    const content = loadPhysioContent();
    for (const session of content.pricing.sessions) {
      expect(session.price).toMatch(/sample/i);
    }
  });

  it("resolves every condition-teaser slug to a real anchor on the conditions page", () => {
    // loadPhysioContent() above already throws if a slug drifts out of
    // sync with conditions.json; this asserts the shipped content also
    // uses the deep-link slug wherever a single condition matches, so a
    // future edit that quietly drops a slug (rather than mismatching it)
    // is caught too.
    const content = loadPhysioContent();
    const validSlugs = new Set(content.conditions.conditions.map((c) => c.slug));
    const withSlug = content.home.conditionsTeaser.filter((t) => t.slug);

    expect(withSlug.length).toBe(content.home.conditionsTeaser.length - 1);
    for (const teaser of withSlug) {
      expect(validSlugs.has(teaser.slug!)).toBe(true);
    }
  });

  it("states the HCPC-not-CQC line plainly on the trust page", () => {
    const content = loadPhysioContent();
    const allCopy = content.trust.blocks.map((b) => `${b.title} ${b.copy}`).join(" ");
    expect(allCopy).toMatch(/HCPC/);
    expect(allCopy).toMatch(/not the Care Quality Commission|not.*CQC/i);
  });
});
