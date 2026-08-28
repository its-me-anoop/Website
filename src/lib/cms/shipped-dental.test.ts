import { describe, expect, it } from "vitest";
import { loadDentalContent } from "./dental";

/**
 * The shipped Kennet Bridge Dental content must always validate — this
 * is the test that turns a bad content edit into a red build.
 */
describe("shipped dental-practice content", () => {
  it("loads and validates end to end", () => {
    const content = loadDentalContent();

    expect(content.practice.name).toBe("Kennet Bridge Dental");
    expect(content.practice.phoneHref).toBe("tel:+441184960234");
    expect(content.practice.openingTimes).toHaveLength(7);
    expect(content.feesNhs.bands).toHaveLength(3);
    expect(content.feesNhs.effectiveFromDisplay).toBe("1 April 2026");
    expect(content.feesPrivate.items.length).toBeGreaterThanOrEqual(4);
    expect(content.treatments.treatments.length).toBeGreaterThanOrEqual(6);
    expect(content.newPatients.nervousPatients.accommodations.length).toBeGreaterThanOrEqual(2);
    expect(content.urgent.goToAeIf.length).toBeGreaterThanOrEqual(3);
    expect(content.team.groups.length).toBeGreaterThanOrEqual(2);
    expect(content.complaints.nhsRoute.steps.length).toBeGreaterThanOrEqual(1);
    expect(content.complaints.privateRoute.steps.length).toBeGreaterThanOrEqual(1);
    expect(content.accessibility.reporting.email).toContain("@");
  });

  it("gives every treatment an in-line price, never a call-for-a-quote placeholder", () => {
    const content = loadDentalContent();
    for (const treatment of content.treatments.treatments) {
      expect(treatment.priceFrom).toMatch(/^£/);
      expect(treatment.priceTo).toMatch(/^£/);
    }
  });

  it("gives every clinician a sample-marked GDC number", () => {
    const content = loadDentalContent();
    for (const group of content.team.groups) {
      for (const member of group.members) {
        expect(member.gdcNumber).toMatch(/^GDC \d{6}$/);
        expect(member.gdcSampleNote.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps Friday's shorter closing time out of the Monday-to-Thursday summary shown in the footer and hero", () => {
    const content = loadDentalContent();
    const friday = content.practice.openingTimes.find((entry) => entry.day === "Friday")!.hours;
    const mondayToThursday = content.practice.openingTimes.find(
      (entry) => entry.day === "Monday"
    )!.hours;

    // The bug this guards against: practice.json states a Friday close
    // an hour earlier than Monday–Thursday, so the two must never be
    // summarised as a single "Monday to Friday" range.
    expect(friday).not.toBe(mondayToThursday);
    expect(content.practice.weekdayHours).toEqual([
      { label: "Monday to Thursday", hours: mondayToThursday },
      { label: "Friday", hours: friday },
    ]);
  });
});
