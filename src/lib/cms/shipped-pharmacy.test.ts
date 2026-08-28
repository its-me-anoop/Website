import { describe, expect, it } from "vitest";
import { loadPharmacyContent } from "./pharmacy";

/**
 * The shipped pharmacy demo content must always validate — this is the
 * test that turns a bad content edit into a red build.
 */
describe("shipped pharmacy content", () => {
  it("loads and validates end to end", () => {
    const content = loadPharmacyContent();

    expect(content.pharmacy.name).toBe("Willowbrook Pharmacy");
    expect(content.pharmacy.phoneHref).toBe("tel:+441184960567");
    expect(content.pharmacy.openingTimes).toHaveLength(7);
    expect(content.pharmacy.superintendent.gphcNumber).toBeTruthy();
    expect(content.pharmacy.legal.gphcPremisesNumber).toBeTruthy();
    expect(content.home.primaryTasks).toHaveLength(2);
    expect(content.pharmacyFirst.conditions).toHaveLength(7);
    expect(content.services.services.length).toBeGreaterThanOrEqual(5);
    expect(
      content.services.services.some((service) => service.funding === "nhs-free")
    ).toBe(true);
    expect(
      content.services.services.some((service) => service.funding === "private-paid")
    ).toBe(true);
    expect(content.prescriptions.nhsAppSteps.length).toBeGreaterThanOrEqual(2);
    expect(content.team.members.length).toBeGreaterThanOrEqual(2);
    expect(content.feedback.howToRaise.length).toBeGreaterThanOrEqual(1);
    expect(content.accessibility.reporting.email).toContain("@");
  });

  it("never advertises a named prescription-only medicine as a service", () => {
    const content = loadPharmacyContent();
    const copy = JSON.stringify(content.services).toLowerCase();
    ["ozempic", "wegovy", "mounjaro", "orlistat"].forEach((brand) => {
      expect(copy).not.toContain(brand);
    });
  });
});
