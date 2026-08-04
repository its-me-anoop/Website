import { describe, expect, it } from "vitest";
import { loadCareContent } from "./care";
import { loadGpContent } from "./gp";

/**
 * The shipped demo content must always validate — this is the test that
 * turns a bad content edit into a red build.
 */
describe("shipped GP content", () => {
  it("loads and validates end to end", () => {
    const content = loadGpContent();

    expect(content.practice.name).toBe("Willowbrook Surgery");
    expect(content.practice.phoneHref).toBe("tel:+441184960123");
    expect(content.practice.openingTimes).toHaveLength(7);
    expect(content.home.primaryTasks).toHaveLength(2);
    expect(content.news.items.length).toBeGreaterThanOrEqual(3);
    expect(content.team.groups.length).toBeGreaterThanOrEqual(3);
    expect(content.services.selfReferral.length).toBeGreaterThanOrEqual(4);
    expect(content.practiceInfo.policies.length).toBeGreaterThanOrEqual(6);
    expect(content.faqs.items.length).toBeGreaterThanOrEqual(3);
    expect(content.appointments.routes.length).toBeGreaterThanOrEqual(3);
    expect(content.prescriptions.steps).toHaveLength(3);
  });

  it("ships no unresolved placeholders", () => {
    const content = loadGpContent();
    expect(JSON.stringify(content)).not.toMatch(/\{(phone|name|address)\}/);
  });
});

describe("shipped care-home content", () => {
  it("loads and validates end to end", () => {
    const content = loadCareContent();

    expect(content.home.name).toBe("Oakfield House");
    expect(content.home.phoneHref).toBe("tel:+441184960456");
    expect(content.care.careTypes).toHaveLength(3);
    expect(content.care.inspection.areas).toHaveLength(5);
    expect(content.life.moments.length).toBeGreaterThanOrEqual(3);
    expect(content.families.steps).toHaveLength(4);
    expect(content.families.faqs.length).toBeGreaterThanOrEqual(3);
    expect(content.careers.roles.length).toBeGreaterThanOrEqual(2);
  });
});
