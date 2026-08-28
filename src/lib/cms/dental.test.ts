import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { earlierReviewedDate, loadDentalContent, summariseWeekdayHours } from "./dental";
import type { DentalPractice } from "./schemas/dental";

const tempRoots: string[] = [];

function makeContentRoot(files: Record<string, unknown>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "cms-dental-test-"));
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

const practice = {
  reviewed: "2026-08-04",
  name: "Kennet Bridge Dental",
  strap: "NHS and private dentistry by the Kennet",
  phone: "0118 496 0234",
  emergencyPhone: "0118 496 0234",
  address: "14 Bridge Row, Reading RG1 9YX",
  openingTimes: [
    { day: "Monday", hours: "8:30am – 5:30pm" },
    { day: "Tuesday", hours: "8:30am – 5:30pm" },
    { day: "Wednesday", hours: "8:30am – 5:30pm" },
    { day: "Thursday", hours: "8:30am – 5:30pm" },
    { day: "Friday", hours: "8:30am – 4:30pm" },
    { day: "Saturday", hours: "Closed — call NHS 111" },
    { day: "Sunday", hours: "Closed — call NHS 111" },
  ],
  access: ["Step-free access from Bridge Row"],
  nhsAndPrivate: "We offer both NHS and private dentistry under one roof.",
  acceptingNhsPatients: true,
  cqc: {
    status: "Good",
    ratingText: "Rated Good by the CQC",
    reportUrl: "https://www.cqc.org.uk/",
    sampleNote: "Sample rating shown for demonstration.",
  },
  outOfHoursCopy: "When we are closed, call NHS 111.",
};

function dentalFixture(): string {
  return makeContentRoot({
    "dental-practice/practice.json": practice,
    "dental-practice/fees-nhs.json": {
      reviewed: "2026-08-04",
      effectiveFrom: "2026-04-01",
      bands: [
        { band: "Band 1", price: "£27.90", covers: "Examination, diagnosis and advice." },
        { band: "Band 2", price: "£76.60", covers: "Band 1 plus fillings and extractions." },
        {
          band: "Band 3",
          price: "£332.10",
          covers: "Band 1 and 2 plus crowns, dentures and bridges.",
        },
      ],
      urgentPrice: "£27.90",
      rules: [
        { title: "One charge per course", copy: "You pay once per course of treatment." },
        { title: "Free repeat within 2 months", copy: "We redo failed work at no extra charge." },
      ],
      alwaysFreeItems: ["Denture repairs"],
      exemptionsSummary: "Some patients do not pay NHS dental charges.",
      exemptionsLink: "https://www.nhs.uk/nhs-services/dentists/dental-costs/",
      englandOnlyNote: "These charges apply in England only.",
    },
    "dental-practice/fees-private.json": {
      reviewed: "2026-08-04",
      items: [{ treatment: "Composite bonding", priceFrom: "£180", priceTo: "£350" }],
      guaranteeCopy: "We guarantee private fillings for 2 years.",
    },
    "dental-practice/treatments.json": {
      reviewed: "2026-08-04",
      treatments: [
        {
          slug: "clear-aligners",
          title: "Clear aligners",
          category: "private",
          summary: "Copy.",
          whatHappens: "Copy.",
          priceFrom: "£2,200",
          priceTo: "£3,800",
        },
      ],
    },
    "dental-practice/new-patients.json": {
      reviewed: "2026-08-04",
      journeySteps: [
        { title: "Register", copy: "Copy." },
        { title: "Your first visit", copy: "Copy." },
      ],
      whatToBring: ["Photo ID"],
      newPatientOffer: {
        title: "New patient examination",
        price: "£65",
        includes: ["Full examination"],
      },
      nervousPatients: {
        intro: "Copy.",
        accommodations: ["First slot of the day", "Agree a stop signal"],
        sedationCopy: "Copy.",
      },
    },
    "dental-practice/urgent.json": {
      reviewed: "2026-08-04",
      sameDayPolicy: "We hold same-day emergency slots.",
      whenWeAreClosed: "Call NHS 111.",
      urgentBandPrice: "£27.90",
      goToAeIf: ["Uncontrolled bleeding"],
    },
    "dental-practice/team.json": {
      reviewed: "2026-08-04",
      groups: [
        {
          group: "Dentists",
          members: [
            {
              name: "Dr Amara Nwosu",
              role: "Principal Dentist",
              qualifications: "BDS",
              countryOfQualification: "United Kingdom",
              gdcNumber: "GDC 123456",
              gdcSampleNote: "Sample number for demonstration.",
            },
          ],
        },
      ],
    },
    "dental-practice/complaints.json": {
      reviewed: "2026-08-04",
      intro: "Copy.",
      practiceStep: "Copy.",
      nhsRoute: { steps: ["Contact the practice"], escalation: "Copy." },
      privateRoute: { steps: ["Contact the practice"], escalation: "Copy." },
      gdcNote: "Copy.",
    },
    "dental-practice/accessibility.json": {
      reviewed: "2026-08-04",
      compliance: "Copy.",
      features: ["Every page works with a keyboard alone"],
      nonAccessible: ["The illustrative map has no zoom control"],
      testing: "Copy.",
      reporting: { copy: "Copy.", email: "access@kennetbridgedental.example" },
      enforcement: "Copy.",
      thirdParty: "Copy.",
      noOverlay: "Copy.",
    },
  });
}

describe("summariseWeekdayHours", () => {
  it("collapses identical Monday–Friday hours into a single range", () => {
    const openingTimes: DentalPractice["openingTimes"] = [
      { day: "Monday", hours: "8:30am – 5:30pm" },
      { day: "Tuesday", hours: "8:30am – 5:30pm" },
      { day: "Wednesday", hours: "8:30am – 5:30pm" },
      { day: "Thursday", hours: "8:30am – 5:30pm" },
      { day: "Friday", hours: "8:30am – 5:30pm" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" },
    ];
    expect(summariseWeekdayHours(openingTimes)).toEqual([
      { label: "Monday to Friday", hours: "8:30am – 5:30pm" },
    ]);
  });

  it("splits out a weekday whose hours differ from the rest, e.g. an earlier Friday close", () => {
    expect(summariseWeekdayHours(practice.openingTimes as DentalPractice["openingTimes"])).toEqual([
      { label: "Monday to Thursday", hours: "8:30am – 5:30pm" },
      { label: "Friday", hours: "8:30am – 4:30pm" },
    ]);
  });

  it("never folds Saturday or Sunday into the weekday summary", () => {
    const segments = summariseWeekdayHours(practice.openingTimes as DentalPractice["openingTimes"]);
    expect(segments.map((segment) => segment.label).join(" ")).not.toMatch(/Saturday|Sunday/);
  });
});

describe("earlierReviewedDate", () => {
  it("returns the earlier of two ISO review dates, regardless of argument order", () => {
    expect(earlierReviewedDate("2026-08-04", "2025-01-01")).toBe("2025-01-01");
    expect(earlierReviewedDate("2025-01-01", "2026-08-04")).toBe("2025-01-01");
  });

  it("returns that date when both are equal", () => {
    expect(earlierReviewedDate("2026-08-04", "2026-08-04")).toBe("2026-08-04");
  });
});

describe("loadDentalContent", () => {
  it("derives the tel: href and validates every collection", () => {
    const content = loadDentalContent({ root: dentalFixture() });
    expect(content.practice.phoneHref).toBe("tel:+441184960234");
    expect(content.feesNhs.bands).toHaveLength(3);
    expect(content.feesPrivate.items[0].treatment).toBe("Composite bonding");
    expect(content.treatments.treatments[0].slug).toBe("clear-aligners");
    expect(content.newPatients.nervousPatients.accommodations).toHaveLength(2);
    expect(content.urgent.goToAeIf).toHaveLength(1);
    expect(content.team.groups[0].members[0].gdcNumber).toBe("GDC 123456");
    expect(content.complaints.nhsRoute.steps).toHaveLength(1);
    expect(content.accessibility.reporting.email).toContain("@");
  });

  it("formats the NHS fee effective-from date for display", () => {
    const content = loadDentalContent({ root: dentalFixture() });
    expect(content.feesNhs.effectiveFromDisplay).toBe("1 April 2026");
  });

  it("derives a weekday opening-hours summary that reflects Friday's shorter hours", () => {
    const content = loadDentalContent({ root: dentalFixture() });
    expect(content.practice.weekdayHours).toEqual([
      { label: "Monday to Thursday", hours: "8:30am – 5:30pm" },
      { label: "Friday", hours: "8:30am – 4:30pm" },
    ]);
  });

  it("rejects an invalid treatment category", () => {
    const root = dentalFixture();
    const file = path.join(root, "dental-practice/treatments.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    data.treatments[0].category = "cosmetic";
    fs.writeFileSync(file, JSON.stringify(data));
    expect(() => loadDentalContent({ root })).toThrowError(/treatments\.json[\s\S]*category/);
  });

  it("flags a collection as stale a year after its reviewed date", () => {
    const root = dentalFixture();
    const content = loadDentalContent({ root, today: "2027-09-01" });
    expect(content.stale).toContain("practice");
  });
});
