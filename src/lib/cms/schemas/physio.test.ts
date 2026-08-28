import { describe, expect, it } from "vitest";
import {
  physioAccessibilitySchema,
  physioClinicSchema,
  physioConditionsSchema,
  physioFirstAppointmentSchema,
  physioHomeSchema,
  physioPricingSchema,
  physioTeamSchema,
  physioTreatmentsSchema,
  physioTrustSchema,
} from "./physio";

const clinic = {
  reviewed: "2026-08-04",
  name: "Forbury Physiotherapy",
  strap: "Private physiotherapy by Forbury Gardens, Reading",
  phone: "0118 496 0678",
  email: "hello@forburyphysio.example",
  address: "5 Garden Court, Forbury, Reading RG1 9XP",
  access: ["Step-free entrance directly off Garden Court"],
  bookingCopy: "Call or email us to book — no GP referral needed.",
  nhsPositioningLine:
    "Appointments this week, no GP referral needed — alongside or instead of an NHS wait.",
  insurersCopy: "We work with major UK health insurers.",
  openingTimes: [
    { day: "Monday", hours: "8am – 7pm" },
    { day: "Tuesday", hours: "8am – 7pm" },
    { day: "Wednesday", hours: "8am – 7pm" },
    { day: "Thursday", hours: "8am – 7pm" },
    { day: "Friday", hours: "8am – 7pm" },
    { day: "Saturday", hours: "9am – 1pm" },
    { day: "Sunday", hours: "Closed" },
  ],
};

describe("physioClinicSchema", () => {
  it("accepts a complete clinic profile", () => {
    expect(physioClinicSchema.parse(clinic).name).toBe("Forbury Physiotherapy");
  });

  it("rejects opening times that do not cover all seven days exactly once", () => {
    const short = { ...clinic, openingTimes: clinic.openingTimes.slice(0, 6) };
    expect(physioClinicSchema.safeParse(short).success).toBe(false);
  });

  it("rejects an invalid phone number or email", () => {
    expect(physioClinicSchema.safeParse({ ...clinic, phone: "not a number" }).success).toBe(
      false
    );
    expect(physioClinicSchema.safeParse({ ...clinic, email: "not an email" }).success).toBe(
      false
    );
  });

  it("requires at least one access note", () => {
    expect(physioClinicSchema.safeParse({ ...clinic, access: [] }).success).toBe(false);
  });

  it('rejects "Chartered" in the clinic name or strap — a CSP brand rule that attaches only to individuals', () => {
    expect(
      physioClinicSchema.safeParse({
        ...clinic,
        name: "Forbury Chartered Physiotherapy",
      }).success
    ).toBe(false);
    expect(
      physioClinicSchema.safeParse({
        ...clinic,
        strap: "Reading's Chartered physiotherapy clinic",
      }).success
    ).toBe(false);
  });
});

describe("physioHomeSchema", () => {
  const home = {
    reviewed: "2026-08-04",
    hero: {
      title: "Get back to what you'd rather be doing",
      copy: "Hands-on assessment and treatment for back, joint and sports injuries.",
    },
    primaryTasks: [
      {
        title: "Book an appointment",
        copy: "Call or email — no GP referral needed.",
        href: "/demo/physio-clinic/first-appointment",
      },
      {
        title: "See our prices",
        copy: "Clear, published prices for every session.",
        href: "/demo/physio-clinic/pricing",
      },
      {
        title: "What to expect at your first visit",
        copy: "The four stages of a first appointment.",
        href: "/demo/physio-clinic/first-appointment",
      },
    ],
    conditionsTeaser: [
      { label: "Back and neck pain", slug: "back-and-neck-pain" },
      { label: "Shoulder problems", slug: "shoulder-problems" },
      { label: "Knee, hip and ankle problems" },
      { label: "Sports injuries", slug: "sports-injuries" },
    ],
  };

  it("accepts the home collection", () => {
    expect(physioHomeSchema.parse(home).primaryTasks).toHaveLength(3);
  });

  it("requires at least three primary tasks", () => {
    expect(
      physioHomeSchema.safeParse({ ...home, primaryTasks: home.primaryTasks.slice(0, 2) })
        .success
    ).toBe(false);
  });

  it("requires at least three condition teasers", () => {
    expect(
      physioHomeSchema.safeParse({ ...home, conditionsTeaser: [{ label: "Back pain" }] })
        .success
    ).toBe(false);
  });

  it("accepts a condition teaser without a slug — a compressed summary that isn't a single deep link", () => {
    expect(
      physioHomeSchema.parse(home).conditionsTeaser.find((t) => !t.slug)?.label
    ).toBe("Knee, hip and ankle problems");
  });

  it("rejects a condition teaser slug that isn't kebab-case", () => {
    expect(
      physioHomeSchema.safeParse({
        ...home,
        conditionsTeaser: [...home.conditionsTeaser, { label: "Bad", slug: "Not Kebab" }],
      }).success
    ).toBe(false);
  });
});

describe("physioConditionsSchema", () => {
  const condition = {
    slug: "back-and-neck-pain",
    title: "Back and neck pain, including sciatica",
    plainSummary: "Persistent or flare-up pain in your back or neck.",
    whatWeAssess: "How you move and where movement is limited.",
    typicalApproach: "Hands-on treatment alongside a graded exercise programme.",
  };

  it("accepts at least eight ASA-safe-taxonomy conditions", () => {
    const conditions = { reviewed: "2026-08-04", conditions: Array(8).fill(condition) };
    expect(physioConditionsSchema.parse(conditions).conditions).toHaveLength(8);
  });

  it("rejects fewer than eight conditions — the standard MSK taxonomy", () => {
    const conditions = { reviewed: "2026-08-04", conditions: Array(3).fill(condition) };
    expect(physioConditionsSchema.safeParse(conditions).success).toBe(false);
  });

  it("requires a kebab-case slug", () => {
    const conditions = {
      reviewed: "2026-08-04",
      conditions: Array(8)
        .fill(condition)
        .map((c, i) => (i === 0 ? { ...c, slug: "Back And Neck" } : c)),
    };
    expect(physioConditionsSchema.safeParse(conditions).success).toBe(false);
  });

  it('rejects outcome-guarantee language ("cure", "guaranteed") — the ASA/CAP-safe rule', () => {
    const withCureClaim = {
      reviewed: "2026-08-04",
      conditions: Array(8)
        .fill(condition)
        .map((c, i) =>
          i === 0 ? { ...c, typicalApproach: "A programme that will cure your back pain." } : c
        ),
    };
    expect(physioConditionsSchema.safeParse(withCureClaim).success).toBe(false);

    const withGuarantee = {
      reviewed: "2026-08-04",
      conditions: Array(8)
        .fill(condition)
        .map((c, i) =>
          i === 0 ? { ...c, plainSummary: "We guarantee you'll be pain-free." } : c
        ),
    };
    expect(physioConditionsSchema.safeParse(withGuarantee).success).toBe(false);
  });
});

describe("physioTreatmentsSchema", () => {
  it("accepts at least four treatment approaches", () => {
    const treatments = {
      reviewed: "2026-08-04",
      approaches: [
        { title: "Manual therapy", copy: "Hands-on techniques.", whoItHelps: "Stiff joints." },
        { title: "Exercise rehab", copy: "Progressive exercise.", whoItHelps: "Everyone." },
        { title: "Acupuncture", copy: "Fine needles.", whoItHelps: "Muscle tension." },
        { title: "Sports massage", copy: "Soft-tissue work.", whoItHelps: "Athletes." },
      ],
    };
    expect(physioTreatmentsSchema.parse(treatments).approaches).toHaveLength(4);
  });

  it("rejects fewer than four approaches", () => {
    const treatments = {
      reviewed: "2026-08-04",
      approaches: [{ title: "Manual therapy", copy: "Hands-on.", whoItHelps: "Stiff joints." }],
    };
    expect(physioTreatmentsSchema.safeParse(treatments).success).toBe(false);
  });
});

describe("physioFirstAppointmentSchema", () => {
  const base = {
    reviewed: "2026-08-04",
    duration: "45–60 minutes",
    beats: [
      { title: "A conversation and your history", copy: "We'll talk through what's going on." },
      { title: "A physical assessment", copy: "We'll look at how you move." },
      { title: "Treatment usually starts the same visit", copy: "Most people leave treated." },
      { title: "A plain-English plan to take away", copy: "We'll explain what's going on." },
    ],
    whatToWear: [{ bodyArea: "Knee, hip or ankle", suggestion: "Shorts" }],
    whatToBring: ["A timeline of your symptoms"],
    selfPay: {
      steps: [
        { title: "Book directly", copy: "Call or book online." },
        { title: "Pay after your visit", copy: "We take card payment." },
      ],
    },
    insured: {
      steps: [
        { title: "Check your policy first", copy: "Call your insurer." },
        { title: "Give us your details", copy: "Bring your policy number." },
      ],
      preAuthCopy: "Most insurers ask for a pre-authorisation reference.",
      excessCopy: "Many policies carry an excess.",
      gpReferralCopy: "GP-referral rules vary by insurer.",
    },
  };

  it("accepts the full first-appointment collection with the self-pay/insured fork", () => {
    const parsed = physioFirstAppointmentSchema.parse(base);
    expect(parsed.beats).toHaveLength(4);
    expect(parsed.insured.steps).toHaveLength(2);
  });

  it("requires exactly four beats — the four-stage appointment structure", () => {
    expect(
      physioFirstAppointmentSchema.safeParse({ ...base, beats: base.beats.slice(0, 3) }).success
    ).toBe(false);
  });

  it("requires the insurance mechanics fields", () => {
    const { preAuthCopy, ...insuredWithoutPreAuth } = base.insured;
    void preAuthCopy;
    expect(
      physioFirstAppointmentSchema.safeParse({
        ...base,
        insured: insuredWithoutPreAuth,
      }).success
    ).toBe(false);
  });
});

describe("physioPricingSchema", () => {
  const pricing = {
    reviewed: "2026-08-04",
    sessions: [
      {
        type: "Initial assessment",
        duration: "60 minutes",
        price: "£55–£75",
        includes: "Full assessment and a home exercise plan.",
      },
      {
        type: "Follow-up session",
        duration: "45 minutes",
        price: "£45–£60",
        includes: "Ongoing treatment.",
      },
    ],
    courseLengthCopy: "Most acute problems settle in 2–4 sessions.",
    insuranceNotes: ["An excess may apply."],
    cancellation: {
      noticeHours: 24,
      policyCopy: "Please give us at least 24 hours' notice.",
      insurerNote: "Insurers do not pay for missed appointments.",
    },
  };

  it("accepts the pricing collection", () => {
    expect(physioPricingSchema.parse(pricing).sessions).toHaveLength(2);
  });

  it("requires at least two session types — initial and follow-up", () => {
    expect(
      physioPricingSchema.safeParse({ ...pricing, sessions: [pricing.sessions[0]] }).success
    ).toBe(false);
  });

  it("requires the cancellation notice hours to be a positive number", () => {
    expect(
      physioPricingSchema.safeParse({
        ...pricing,
        cancellation: { ...pricing.cancellation, noticeHours: -1 },
      }).success
    ).toBe(false);
  });
});

describe("physioTeamSchema", () => {
  const practitioner = {
    name: "Priya Anand",
    title: "Founder & Clinical Director",
    hcpcNumber: "PH184623",
    hcpcSampleNote: "Sample number for demonstration.",
    cspMember: true,
    qualifications: [
      { award: "BSc (Hons) Physiotherapy", institution: "University of Birmingham", year: 2011 },
    ],
    specialInterests: ["Sports injuries"],
    bio: "Priya founded the clinic in 2019.",
  };

  it("accepts practitioners with sample HCPC numbers in the real format", () => {
    const team = { reviewed: "2026-08-04", practitioners: [practitioner, practitioner] };
    expect(physioTeamSchema.parse(team).practitioners).toHaveLength(2);
  });

  it("rejects a malformed HCPC number", () => {
    const team = {
      reviewed: "2026-08-04",
      practitioners: [{ ...practitioner, hcpcNumber: "12345" }, practitioner],
    };
    expect(physioTeamSchema.safeParse(team).success).toBe(false);
  });

  it("requires cspMember to sit on the individual practitioner, not the clinic", () => {
    const team = {
      reviewed: "2026-08-04",
      practitioners: [{ ...practitioner, cspMember: undefined }, practitioner],
    };
    expect(physioTeamSchema.safeParse(team).success).toBe(false);
  });
});

describe("physioTrustSchema", () => {
  it("accepts at least five trust blocks", () => {
    const block = { title: "Protected title", copy: "Only HCPC-registered people may practise." };
    const trust = {
      reviewed: "2026-08-04",
      blocks: Array(5).fill(block),
      verifyRegisterCopy: "Check any clinician on the HCPC register.",
    };
    expect(physioTrustSchema.parse(trust).blocks).toHaveLength(5);
  });

  it("rejects fewer than five trust blocks", () => {
    const block = { title: "Protected title", copy: "Only HCPC-registered people may practise." };
    const trust = {
      reviewed: "2026-08-04",
      blocks: [block],
      verifyRegisterCopy: "Check any clinician on the HCPC register.",
    };
    expect(physioTrustSchema.safeParse(trust).success).toBe(false);
  });
});

describe("physioAccessibilitySchema", () => {
  it("requires the statutory statement sections", () => {
    const statement = {
      reviewed: "2026-08-04",
      compliance: "This website aims to meet WCAG 2.2 AA.",
      features: ["Every page works with a keyboard alone"],
      nonAccessible: ["There is no BSL interpreted video version of this site."],
      testing: "Tested with axe-core and manual keyboard checks.",
      reporting: {
        copy: "Tell us if any part of this site is hard to use.",
        email: "access@forburyphysio.example",
      },
      enforcement: "Contact EASS if you are not happy with our response.",
      thirdParty: "Links to the HCPC register are covered by their own statement.",
      noOverlay: "We do not use an accessibility overlay widget.",
    };
    expect(physioAccessibilitySchema.parse(statement).reporting.email).toContain("@");
    expect(
      physioAccessibilitySchema.safeParse({ ...statement, enforcement: undefined }).success
    ).toBe(false);
  });
});
