import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadPharmacyContent } from "./pharmacy";

const tempRoots: string[] = [];

function makeContentRoot(files: Record<string, unknown>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "cms-pharmacy-test-"));
  tempRoots.push(root);
  for (const [relative, data] of Object.entries(files)) {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
  return root;
}

afterEach(() => {
  while (tempRoots.length) fs.rmSync(tempRoots.pop()!, { recursive: true, force: true });
});

const openingTimes = [
  { day: "Monday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
  { day: "Tuesday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
  { day: "Wednesday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
  { day: "Thursday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
  { day: "Friday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
  { day: "Saturday", morning: "9am – 1pm", afternoon: "Closed" },
  { day: "Sunday", morning: "Closed", afternoon: "Closed" },
];

const pharmacy = {
  reviewed: "2026-07-01",
  name: "Willowbrook Pharmacy",
  strap: "Independent pharmacy for Willowbrook",
  phone: "0118 496 0567",
  email: "hello@willowbrookpharmacy.example",
  address: "3 Meadow Lane, Willowbrook, Reading RG1 9ZZ",
  neighbourhood: "Willowbrook",
  establishedCopy: "Family-run on Meadow Lane since 2004.",
  openingTimes,
  bankHolidayCopy: "Closed Sundays and bank holidays.",
  deliveryOffered: true,
  deliveryCopy: "Free local delivery for repeat prescriptions.",
  consultationRoomCopy: "Our private consultation room makes Pharmacy First possible.",
  legal: {
    entityName: "Willowbrook Pharmacy (Reading) Ltd",
    companyNumber: "09000123",
    gphcPremisesNumber: "9000001",
    sampleNote: "Sample registration details for this demonstration site.",
  },
  superintendent: {
    name: "Priya Chandrasekaran",
    gphcNumber: "2000001",
    sampleNote: "Sample GPhC registration number for this demonstration site.",
  },
};

function pharmacyFixture(overrides: { alertExpires?: string | null } = {}): string {
  const alert =
    overrides.alertExpires === null
      ? null
      : {
          title: "Flu and COVID vaccinations",
          copy: "Seasonal vaccinations usually run September to March.",
          expires: overrides.alertExpires ?? "2027-03-31",
        };

  return makeContentRoot({
    "pharmacy/pharmacy.json": pharmacy,
    "pharmacy/home.json": {
      reviewed: "2026-07-01",
      hero: { title: "What can we help with today?", copy: "Pop in for advice." },
      primaryTasks: [
        {
          title: "NHS Pharmacy First",
          copy: "Free NHS treatment for seven common conditions.",
          href: "/demo/pharmacy/pharmacy-first",
        },
        {
          title: "Order a repeat prescription",
          copy: "Nominate us in the NHS App.",
          href: "/demo/pharmacy/prescriptions",
        },
      ],
      alert,
    },
    "pharmacy/pharmacy-first.json": {
      reviewed: "2026-07-01",
      intro: "Free NHS treatment for seven common conditions.",
      conditions: [
        { condition: "Earache", plainName: "ear pain", ages: "1 to 17", note: "Note." },
        { condition: "Impetigo", plainName: "a skin infection", ages: "1 and over", note: "Note." },
        {
          condition: "Infected insect bites",
          plainName: "a bite that has become infected",
          ages: "1 and over",
          note: "Note.",
        },
        { condition: "Shingles", plainName: "a painful rash", ages: "18 and over", note: "Note." },
        { condition: "Sinusitis", plainName: "a sinus infection", ages: "12 and over", note: "Note." },
        { condition: "Sore throat", plainName: "a sore throat", ages: "5 and over", note: "Note." },
        {
          condition: "Uncomplicated UTI",
          plainName: "a urine infection",
          ages: "women 16 to 64",
          note: "Note.",
        },
      ],
      howItWorks: [
        { title: "Ask at the counter", copy: "Tell the team what's wrong." },
        { title: "A short consultation", copy: "A pharmacist assesses you in private." },
      ],
      referralRoutes: ["Walk in and ask at the counter"],
      freeOnNhsCopy: "This service is free on the NHS.",
      reviewedPathwaysNote: "Pathways reviewed October 2025.",
    },
    "pharmacy/services.json": {
      reviewed: "2026-07-01",
      services: [
        {
          slug: "new-medicine-service",
          title: "New Medicine Service",
          funding: "nhs-free",
          walkIn: false,
          usesConsultationRoom: true,
          seasonal: false,
          summary: "Support when you start a new long-term medicine.",
          details: "Details.",
        },
      ],
    },
    "pharmacy/prescriptions.json": {
      reviewed: "2026-07-01",
      nhsAppSteps: [
        { title: "Open the NHS App", copy: "Sign in with your NHS login." },
        { title: "Nominate us", copy: "Search for Willowbrook Pharmacy." },
      ],
      otherWaysToOrder: [{ title: "By phone", copy: "Call the pharmacy." }],
      readyTimescaleCopy: "Usually ready within two working days.",
      deliveryCopy: "Free local delivery is available.",
      emergencySupplyCopy: "We can supply a small amount in an emergency.",
    },
    "pharmacy/team.json": {
      reviewed: "2026-07-01",
      members: [
        {
          name: "Priya Chandrasekaran",
          role: "Superintendent Pharmacist",
          gphcNumber: "2000001",
          sampleNote: "Sample GPhC number for this demo.",
          bio: "Bio.",
        },
      ],
      responsiblePharmacistExplainer: "Explainer copy.",
    },
    "pharmacy/feedback.json": {
      reviewed: "2026-07-01",
      howToRaise: [{ title: "Speak to us", copy: "Ask any member of the team." }],
      nhsServiceComplaintsRoute: "Contact NHS England for NHS-service complaints.",
      medicineSafetyCopy: "Medicine-safety concerns go to the Yellow Card scheme.",
      responseCommitment: "We aim to respond within three working days.",
    },
    "pharmacy/accessibility.json": {
      reviewed: "2026-07-01",
      compliance: "This website aims to meet WCAG 2.2 AA.",
      features: ["Every page works with a keyboard alone"],
      nonAccessible: ["The illustrative map has no zoom control"],
      testing: "Tested with axe-core in July 2026.",
      reporting: { copy: "Tell us if something is hard to use.", email: "access@willowbrookpharmacy.example" },
      enforcement: "Contact EASS if you are not happy with our response.",
      thirdParty: "Links to NHS services are covered by their own statements.",
      noOverlay: "We do not use an accessibility overlay widget.",
    },
  });
}

describe("loadPharmacyContent", () => {
  it("derives the tel: href and validates every collection", () => {
    const content = loadPharmacyContent({ root: pharmacyFixture() });
    expect(content.pharmacy.phoneHref).toBe("tel:+441184960567");
    expect(content.pharmacyFirst.conditions).toHaveLength(7);
    expect(content.services.services).toHaveLength(1);
    expect(content.prescriptions.nhsAppSteps).toHaveLength(2);
    expect(content.team.members).toHaveLength(1);
    expect(content.feedback.howToRaise).toHaveLength(1);
    expect(content.accessibility.reporting.email).toContain("@");
  });

  it("drops an expired seasonal alert", () => {
    const content = loadPharmacyContent({
      root: pharmacyFixture({ alertExpires: "2020-01-01" }),
      today: "2026-08-04",
    });
    expect(content.home.alert).toBeNull();
  });

  it("keeps a live seasonal alert", () => {
    const content = loadPharmacyContent({
      root: pharmacyFixture({ alertExpires: "2027-03-31" }),
      today: "2026-08-04",
    });
    expect(content.home.alert?.title).toBe("Flu and COVID vaccinations");
  });

  it("flags collections whose reviewed date is more than a year stale", () => {
    const root = pharmacyFixture();
    const file = path.join(root, "pharmacy/services.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    data.reviewed = "2020-01-01";
    fs.writeFileSync(file, JSON.stringify(data));

    const content = loadPharmacyContent({ root, today: "2026-08-04" });
    expect(content.stale).toContain("services");
  });

  it("rejects an invalid funding value with a file-scoped error", () => {
    const root = pharmacyFixture();
    const file = path.join(root, "pharmacy/services.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    data.services[0].funding = "sometimes-free";
    fs.writeFileSync(file, JSON.stringify(data));

    expect(() => loadPharmacyContent({ root })).toThrowError(/services\.json[\s\S]*funding/);
  });
});
