import { describe, expect, it } from "vitest";
import {
  pharmacyAccessibilitySchema,
  pharmacyFeedbackSchema,
  pharmacyFirstSchema,
  pharmacyHomeSchema,
  pharmacyPrescriptionsSchema,
  pharmacySchema,
  pharmacyServicesSchema,
  pharmacyTeamSchema,
} from "./pharmacy";

const pharmacy = {
  reviewed: "2026-08-04",
  name: "Willowbrook Pharmacy",
  strap: "Independent pharmacy for Willowbrook, two doors from the surgery",
  phone: "0118 496 0567",
  email: "hello@willowbrookpharmacy.example",
  address: "3 Meadow Lane, Willowbrook, Reading RG1 9ZZ",
  neighbourhood: "Willowbrook",
  establishedCopy: "Family-run on Meadow Lane since 2004.",
  openingTimes: [
    { day: "Monday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
    { day: "Tuesday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
    { day: "Wednesday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
    { day: "Thursday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
    { day: "Friday", morning: "9am – 1pm", afternoon: "2pm – 6pm" },
    { day: "Saturday", morning: "9am – 1pm", afternoon: "Closed" },
    { day: "Sunday", morning: "Closed", afternoon: "Closed" },
  ],
  bankHolidayCopy: "Closed Sundays and bank holidays — check NHS 111 for the local rota.",
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

describe("pharmacySchema", () => {
  it("accepts a complete pharmacy profile", () => {
    expect(pharmacySchema.parse(pharmacy).name).toBe("Willowbrook Pharmacy");
  });

  it("rejects opening times that do not cover all seven days exactly once", () => {
    const short = { ...pharmacy, openingTimes: pharmacy.openingTimes.slice(0, 6) };
    expect(pharmacySchema.safeParse(short).success).toBe(false);

    const doubled = {
      ...pharmacy,
      openingTimes: [
        ...pharmacy.openingTimes.slice(0, 6),
        { day: "Monday", morning: "Closed", afternoon: "Closed" },
      ],
    };
    expect(pharmacySchema.safeParse(doubled).success).toBe(false);
  });

  it("rejects an invalid phone number", () => {
    expect(pharmacySchema.safeParse({ ...pharmacy, phone: "not a number" }).success).toBe(
      false
    );
  });

  it("rejects a malformed email address", () => {
    expect(
      pharmacySchema.safeParse({ ...pharmacy, email: "not an email" }).success
    ).toBe(false);
  });

  it("requires the superintendent's GPhC number and sample note", () => {
    expect(
      pharmacySchema.safeParse({
        ...pharmacy,
        superintendent: { name: "Priya Chandrasekaran" },
      }).success
    ).toBe(false);
  });

  it("requires the legal entity block that feeds the footer regulatory line", () => {
    expect(pharmacySchema.safeParse({ ...pharmacy, legal: undefined }).success).toBe(
      false
    );
  });
});

const task = {
  title: "NHS Pharmacy First",
  copy: "Free NHS treatment for seven common conditions, no GP appointment needed.",
  href: "/demo/pharmacy/pharmacy-first",
};

describe("pharmacyHomeSchema", () => {
  const home = {
    reviewed: "2026-08-04",
    hero: {
      title: "What can we help with today?",
      copy: "Pop in for Pharmacy First treatment, drop off a repeat, or ask for advice.",
    },
    primaryTasks: [task, { ...task, title: "Order a repeat prescription" }],
    alert: {
      title: "Flu and COVID vaccinations",
      copy: "Seasonal vaccinations usually run September to March.",
      expires: "2027-03-31",
    },
  };

  it("accepts the home collection, with the alert nullable", () => {
    expect(pharmacyHomeSchema.parse(home).primaryTasks).toHaveLength(2);
    expect(pharmacyHomeSchema.parse({ ...home, alert: null }).alert).toBeNull();
  });

  it("requires exactly two primary tasks — Pharmacy First and repeats lead", () => {
    expect(pharmacyHomeSchema.safeParse({ ...home, primaryTasks: [task] }).success).toBe(
      false
    );
  });

  it("rejects an alert with a malformed expiry date", () => {
    const bad = { ...home, alert: { ...home.alert, expires: "March" } };
    expect(pharmacyHomeSchema.safeParse(bad).success).toBe(false);
  });
});

const sevenConditions = [
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
];

describe("pharmacyFirstSchema", () => {
  const pharmacyFirst = {
    reviewed: "2026-08-04",
    intro: "Free NHS treatment for seven common conditions, no GP appointment needed.",
    conditions: sevenConditions,
    howItWorks: [
      { title: "Ask at the counter", copy: "Tell the team what's wrong." },
      { title: "A short consultation", copy: "A pharmacist assesses you in private." },
    ],
    referralRoutes: ["Walk in and ask at the counter", "Referral from NHS 111"],
    freeOnNhsCopy: "This service is free on the NHS — there is nothing to pay.",
    reviewedPathwaysNote: "Pathways reviewed October 2025.",
  };

  it("accepts the full seven-condition pathway", () => {
    expect(pharmacyFirstSchema.parse(pharmacyFirst).conditions).toHaveLength(7);
  });

  it("requires exactly seven conditions — the NHS Pharmacy First service scope", () => {
    expect(
      pharmacyFirstSchema.safeParse({
        ...pharmacyFirst,
        conditions: sevenConditions.slice(0, 6),
      }).success
    ).toBe(false);
  });
});

describe("pharmacyServicesSchema", () => {
  const services = {
    reviewed: "2026-08-04",
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
      {
        slug: "travel-health",
        title: "Travel health advice",
        funding: "private-paid",
        walkIn: true,
        usesConsultationRoom: false,
        seasonal: false,
        summary: "Advice and vaccinations for your trip.",
        details: "Details.",
      },
    ],
  };

  it("accepts NHS-free and private-paid services", () => {
    expect(pharmacyServicesSchema.parse(services).services).toHaveLength(2);
  });

  it("rejects a funding value outside the NHS-free / private-paid enum", () => {
    const bad = {
      ...services,
      services: [{ ...services.services[0], funding: "sometimes-free" }],
    };
    expect(pharmacyServicesSchema.safeParse(bad).success).toBe(false);
  });

  it("requires a kebab-case slug for stable anchors", () => {
    const bad = {
      ...services,
      services: [{ ...services.services[0], slug: "New Medicine Service" }],
    };
    expect(pharmacyServicesSchema.safeParse(bad).success).toBe(false);
  });
});

describe("pharmacyPrescriptionsSchema", () => {
  const prescriptions = {
    reviewed: "2026-08-04",
    nhsAppSteps: [
      { title: "Open the NHS App", copy: "Sign in with your NHS login." },
      { title: "Nominate us", copy: "Search for Willowbrook Pharmacy." },
    ],
    otherWaysToOrder: [{ title: "By phone", copy: "Call the pharmacy." }],
    readyTimescaleCopy: "Usually ready within two working days.",
    deliveryCopy: "Free local delivery is available.",
    emergencySupplyCopy: "We can supply a small amount in an emergency.",
  };

  it("requires at least two NHS App steps", () => {
    expect(pharmacyPrescriptionsSchema.parse(prescriptions).nhsAppSteps).toHaveLength(2);
    expect(
      pharmacyPrescriptionsSchema.safeParse({
        ...prescriptions,
        nhsAppSteps: [prescriptions.nhsAppSteps[0]],
      }).success
    ).toBe(false);
  });
});

describe("pharmacyTeamSchema", () => {
  it("accepts named members and makes GPhC numbers optional for non-registrants", () => {
    const team = {
      reviewed: "2026-08-04",
      members: [
        {
          name: "Priya Chandrasekaran",
          role: "Superintendent Pharmacist",
          gphcNumber: "2000001",
          sampleNote: "Sample GPhC number for this demo.",
          bio: "Bio.",
        },
        { name: "Dev Anand", role: "Pharmacy Assistant", bio: "Bio." },
      ],
      responsiblePharmacistExplainer: "Explainer copy.",
    };
    expect(pharmacyTeamSchema.parse(team).members).toHaveLength(2);
    expect(pharmacyTeamSchema.parse(team).members[1].gphcNumber).toBeUndefined();
  });
});

describe("pharmacyFeedbackSchema", () => {
  it("requires at least one way to raise a concern", () => {
    const feedback = {
      reviewed: "2026-08-04",
      howToRaise: [{ title: "Speak to us", copy: "Ask any member of the team." }],
      nhsServiceComplaintsRoute: "Contact NHS England for NHS-service complaints.",
      medicineSafetyCopy: "Medicine-safety concerns go to the Yellow Card scheme.",
      responseCommitment: "We aim to respond within three working days.",
    };
    expect(pharmacyFeedbackSchema.parse(feedback).howToRaise).toHaveLength(1);
    expect(
      pharmacyFeedbackSchema.safeParse({ ...feedback, howToRaise: [] }).success
    ).toBe(false);
  });
});

describe("pharmacyAccessibilitySchema", () => {
  it("requires the statutory statement sections", () => {
    const statement = {
      reviewed: "2026-08-04",
      compliance: "This website aims to meet WCAG 2.2 AA.",
      features: ["Every page works with a keyboard alone"],
      nonAccessible: ["The illustrative map has no zoom control"],
      testing: "Tested with axe-core and manual checks in August 2026.",
      reporting: {
        copy: "Tell us if any part of this site is hard to use.",
        email: "access@willowbrookpharmacy.example",
      },
      enforcement: "Contact EASS if you are not happy with our response.",
      thirdParty: "Links to NHS services are covered by their own statements.",
      noOverlay: "We do not use an accessibility overlay widget.",
    };
    expect(pharmacyAccessibilitySchema.parse(statement).reporting.email).toContain("@");
    expect(
      pharmacyAccessibilitySchema.safeParse({ ...statement, enforcement: undefined })
        .success
    ).toBe(false);
  });
});
