import { describe, expect, it } from "vitest";
import {
  dentalAccessibilitySchema,
  dentalComplaintsSchema,
  dentalFeesNhsSchema,
  dentalFeesPrivateSchema,
  dentalNewPatientsSchema,
  dentalPracticeSchema,
  dentalTeamSchema,
  dentalTreatmentsSchema,
  dentalUrgentSchema,
  gbpAmount,
} from "./dental";

describe("gbpAmount", () => {
  it("accepts pence-precise and thousand-grouped amounts", () => {
    expect(gbpAmount.safeParse("£27.90").success).toBe(true);
    expect(gbpAmount.safeParse("£332.10").success).toBe(true);
    expect(gbpAmount.safeParse("£2,500").success).toBe(true);
  });

  it("rejects free-text pricing like 'call for a quote'", () => {
    expect(gbpAmount.safeParse("call for a quote").success).toBe(false);
    expect(gbpAmount.safeParse("POA").success).toBe(false);
    expect(gbpAmount.safeParse("27.90").success).toBe(false);
  });
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

describe("dentalPracticeSchema", () => {
  it("accepts a complete practice profile", () => {
    expect(dentalPracticeSchema.parse(practice).name).toBe("Kennet Bridge Dental");
  });

  it("rejects opening times that do not cover all seven days exactly once", () => {
    const short = { ...practice, openingTimes: practice.openingTimes.slice(0, 6) };
    expect(dentalPracticeSchema.safeParse(short).success).toBe(false);
  });

  it("rejects an invalid phone number", () => {
    expect(
      dentalPracticeSchema.safeParse({ ...practice, phone: "07700 900123" }).success
    ).toBe(false);
  });

  it("requires a CQC report URL rather than free text", () => {
    expect(
      dentalPracticeSchema.safeParse({
        ...practice,
        cqc: { ...practice.cqc, reportUrl: "see reception" },
      }).success
    ).toBe(false);
  });
});

describe("dentalFeesNhsSchema", () => {
  const fees = {
    reviewed: "2026-08-04",
    effectiveFrom: "2026-04-01",
    bands: [
      { band: "Band 1", price: "£27.90", covers: "Examination, diagnosis and advice." },
      { band: "Band 2", price: "£76.60", covers: "Band 1 plus fillings and extractions." },
      { band: "Band 3", price: "£332.10", covers: "Band 1 and 2 plus crowns, dentures and bridges." },
    ],
    urgentPrice: "£27.90",
    rules: [
      { title: "One charge per course of treatment", copy: "You pay once even if you need several visits to finish a course." },
      { title: "Free repeat within 2 months", copy: "If the same treatment fails within 2 months, we redo it at no extra charge." },
    ],
    alwaysFreeItems: ["Denture repairs", "Referrals for domiciliary or specialist NHS care"],
    exemptionsSummary: "Some patients do not pay NHS dental charges, including under-18s and those on qualifying benefits.",
    exemptionsLink: "https://www.nhs.uk/nhs-services/dentists/dental-costs/",
    englandOnlyNote: "These charges apply in England only.",
  };

  it("accepts the NHS fee schedule with the April uprating rules", () => {
    expect(dentalFeesNhsSchema.parse(fees).bands).toHaveLength(3);
  });

  it("rejects a band price that is not a GBP amount", () => {
    const bad = { ...fees, bands: [{ ...fees.bands[0], price: "twenty-seven ninety" }, fees.bands[1], fees.bands[2]] };
    expect(dentalFeesNhsSchema.safeParse(bad).success).toBe(false);
  });

  it("requires at least the one-charge-per-course and free-repeat rules", () => {
    expect(dentalFeesNhsSchema.safeParse({ ...fees, rules: [fees.rules[0]] }).success).toBe(
      false
    );
  });
});

describe("dentalFeesPrivateSchema", () => {
  it("requires from–to ranges rather than a single figure, per GDC Standard 2.4", () => {
    const feesPrivate = {
      reviewed: "2026-08-04",
      items: [
        { treatment: "Composite bonding", priceFrom: "£180", priceTo: "£350" },
      ],
      guaranteeCopy: "We guarantee private fillings for 2 years.",
    };
    expect(dentalFeesPrivateSchema.parse(feesPrivate).items[0].priceTo).toBe("£350");
    expect(
      dentalFeesPrivateSchema.safeParse({
        ...feesPrivate,
        items: [{ treatment: "Composite bonding", priceFrom: "£180" }],
      }).success
    ).toBe(false);
  });
});

describe("dentalTreatmentsSchema", () => {
  it("requires in-line pricing on every treatment — never 'call for a quote'", () => {
    const treatments = {
      reviewed: "2026-08-04",
      treatments: [
        {
          slug: "clear-aligners",
          title: "Clear aligners",
          category: "private",
          summary: "Gradually straighten teeth with a series of clear, removable aligners.",
          whatHappens: "A scan, a treatment plan, then a new aligner roughly every two weeks.",
          priceFrom: "£2,200",
          priceTo: "£3,800",
        },
      ],
    };
    expect(dentalTreatmentsSchema.parse(treatments).treatments[0].category).toBe("private");
    expect(
      dentalTreatmentsSchema.safeParse({
        ...treatments,
        treatments: [{ ...treatments.treatments[0], priceFrom: "call for a quote" }],
      }).success
    ).toBe(false);
  });

  it("rejects an unknown treatment category", () => {
    const treatments = {
      reviewed: "2026-08-04",
      treatments: [
        {
          slug: "whitening",
          title: "Whitening",
          category: "cosmetic",
          summary: "Copy.",
          whatHappens: "Copy.",
          priceFrom: "£300",
          priceTo: "£450",
        },
      ],
    };
    expect(dentalTreatmentsSchema.safeParse(treatments).success).toBe(false);
  });
});

describe("dentalNewPatientsSchema", () => {
  it("requires at least two concrete nervous-patient accommodations", () => {
    const newPatients = {
      reviewed: "2026-08-04",
      journeySteps: [
        { title: "Register", copy: "Call or fill in the online form." },
        { title: "Your first visit", copy: "A full check-up and a chat about your dental history." },
      ],
      whatToBring: ["Photo ID", "A list of any medicines you take"],
      newPatientOffer: {
        title: "New patient examination",
        price: "£65",
        includes: ["Full examination", "X-rays if needed", "A written treatment plan"],
      },
      nervousPatients: {
        intro: "If you're nervous about the dentist, tell us.",
        accommodations: ["First appointment slot of the day", "Agree a stop signal before we start"],
        sedationCopy: "We can talk you through sedation options if you need them.",
      },
    };
    expect(dentalNewPatientsSchema.parse(newPatients).nervousPatients.accommodations).toHaveLength(2);
    expect(
      dentalNewPatientsSchema.safeParse({
        ...newPatients,
        nervousPatients: { ...newPatients.nervousPatients, accommodations: ["Quiet room"] },
      }).success
    ).toBe(false);
  });
});

describe("dentalUrgentSchema", () => {
  it("requires the A&E self-triage list", () => {
    const urgent = {
      reviewed: "2026-08-04",
      sameDayPolicy: "We hold same-day emergency slots every morning.",
      whenWeAreClosed: "Call NHS 111 for urgent dental care out of hours.",
      urgentBandPrice: "£27.90",
      goToAeIf: ["Uncontrolled bleeding from the mouth", "Swelling affecting your breathing or swallowing"],
    };
    expect(dentalUrgentSchema.parse(urgent).goToAeIf).toHaveLength(2);
    expect(dentalUrgentSchema.safeParse({ ...urgent, goToAeIf: [] }).success).toBe(false);
  });
});

describe("dentalTeamSchema", () => {
  it("requires a register-style GDC number formatted like the real thing", () => {
    const team = {
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
    };
    expect(dentalTeamSchema.parse(team).groups[0].members[0].gdcNumber).toBe("GDC 123456");
    expect(
      dentalTeamSchema.safeParse({
        ...team,
        groups: [{ ...team.groups[0], members: [{ ...team.groups[0].members[0], gdcNumber: "123456" }] }],
      }).success
    ).toBe(false);
  });
});

describe("dentalComplaintsSchema", () => {
  it("requires the dual-track NHS and private complaints routes", () => {
    const complaints = {
      reviewed: "2026-08-04",
      intro: "We hope you never need to complain, but if you do, here is how.",
      practiceStep: "Talk to us first — we respond within 10 working days.",
      nhsRoute: {
        steps: ["Contact the practice manager", "If unresolved, contact our ICB"],
        escalation: "Still unhappy? The Parliamentary and Health Service Ombudsman can review NHS complaints.",
      },
      privateRoute: {
        steps: ["Contact the practice manager", "If unresolved, contact the Dental Complaints Service"],
        escalation: "The Dental Complaints Service is free and must be contacted within 12 months.",
      },
      gdcNote: "The GDC investigates serious fitness-to-practise concerns, not routine complaints.",
    };
    expect(dentalComplaintsSchema.parse(complaints).nhsRoute.steps).toHaveLength(2);
    expect(
      dentalComplaintsSchema.safeParse({ ...complaints, privateRoute: undefined }).success
    ).toBe(false);
  });
});

describe("dentalAccessibilitySchema", () => {
  it("requires the statutory statement sections", () => {
    const statement = {
      reviewed: "2026-08-04",
      compliance: "This website aims to meet WCAG 2.2 AA.",
      features: ["Every page works with a keyboard alone"],
      nonAccessible: ["The illustrative map has no zoom control"],
      testing: "Tested with axe-core and manual keyboard checks in August 2026.",
      reporting: {
        copy: "Tell us if any part of this site is hard to use.",
        email: "access@kennetbridgedental.example",
      },
      enforcement: "If you are not happy with our response, contact EASS.",
      thirdParty: "Links to NHS services are covered by their own statements.",
      noOverlay: "We do not use an accessibility overlay widget.",
    };
    expect(dentalAccessibilitySchema.parse(statement).reporting.email).toContain("@");
    expect(
      dentalAccessibilitySchema.safeParse({ ...statement, enforcement: undefined }).success
    ).toBe(false);
  });
});
