import { describe, expect, it } from "vitest";
import {
  gpAccessibilitySchema,
  gpAppointmentsSchema,
  gpHomeSchema,
  gpNewsSchema,
  gpPracticeInfoSchema,
  gpPracticeSchema,
  gpRegisterSchema,
  gpServicesSchema,
  gpTeamSchema,
} from "./gp";

const practice = {
  reviewed: "2026-07-01",
  name: "Willowbrook Surgery",
  strap: "NHS GP services for Willowbrook",
  phone: "0118 496 0123",
  address: "1 Meadow Lane, Willowbrook, Reading RG1 9ZZ",
  hoursSummary: "Open 8am to 6:30pm, Monday to Friday",
  access: ["Step-free access throughout the ground floor"],
  acceptingNewPatients: true,
  enhancedAccess:
    "Evening and Saturday appointments run at the Enhanced Access hub.",
  outOfHours: "When we are closed, call NHS 111.",
  icb: { name: "NHS Sample ICB", copy: "Contact the ICB about commissioning." },
  openingTimes: [
    { day: "Monday", hours: "8:00am – 6:30pm" },
    { day: "Tuesday", hours: "8:00am – 6:30pm" },
    { day: "Wednesday", hours: "8:00am – 6:30pm" },
    { day: "Thursday", hours: "8:00am – 6:30pm" },
    { day: "Friday", hours: "8:00am – 6:30pm" },
    { day: "Saturday", hours: "Closed — call NHS 111" },
    { day: "Sunday", hours: "Closed — call NHS 111" },
  ],
};

describe("gpPracticeSchema", () => {
  it("accepts a complete practice profile", () => {
    expect(gpPracticeSchema.parse(practice).name).toBe("Willowbrook Surgery");
  });

  it("rejects opening times that do not cover all seven days exactly once", () => {
    const short = { ...practice, openingTimes: practice.openingTimes.slice(0, 6) };
    expect(gpPracticeSchema.safeParse(short).success).toBe(false);

    const doubled = {
      ...practice,
      openingTimes: [
        ...practice.openingTimes.slice(0, 6),
        { day: "Monday", hours: "Closed" },
      ],
    };
    expect(gpPracticeSchema.safeParse(doubled).success).toBe(false);
  });

  it("rejects an invalid phone number", () => {
    expect(
      gpPracticeSchema.safeParse({ ...practice, phone: "not a number" }).success
    ).toBe(false);
  });

  it("requires the hours summary and at least one access note", () => {
    expect(
      gpPracticeSchema.safeParse({ ...practice, hoursSummary: undefined }).success
    ).toBe(false);
    expect(gpPracticeSchema.safeParse({ ...practice, access: [] }).success).toBe(false);
  });
});

const task = {
  title: "Book or cancel an appointment",
  copy: "Routine and urgent appointments, by phone or online.",
  href: "/demo/gp-practice/appointments",
};

describe("gpHomeSchema", () => {
  const home = {
    reviewed: "2026-07-01",
    alert: {
      title: "Travelling this summer?",
      copy: "Book travel vaccinations at least six weeks before you fly.",
      expires: "2026-09-01",
    },
    primaryTasks: [task, { ...task, title: "Order a repeat prescription" }],
    moreTasks: [task, task, task, task],
    wellbeing: [
      {
        title: "Health A to Z",
        copy: "Check symptoms and conditions",
        href: "https://www.nhs.uk/conditions/",
      },
    ],
  };

  it("accepts the home collection, with the alert optional", () => {
    expect(gpHomeSchema.parse(home).primaryTasks).toHaveLength(2);
    expect(gpHomeSchema.parse({ ...home, alert: null }).alert).toBeNull();
  });

  it("requires exactly two primary tasks", () => {
    expect(gpHomeSchema.safeParse({ ...home, primaryTasks: [task] }).success).toBe(false);
  });

  it("rejects an alert with a malformed expiry date", () => {
    const bad = { ...home, alert: { ...home.alert, expires: "September" } };
    expect(gpHomeSchema.safeParse(bad).success).toBe(false);
  });
});

describe("gpNewsSchema", () => {
  it("accepts dated items and rejects impossible dates", () => {
    const news = {
      reviewed: "2026-07-01",
      items: [{ date: "2026-07-18", title: "Title here", copy: "Copy here." }],
    };
    expect(gpNewsSchema.parse(news).items).toHaveLength(1);
    expect(
      gpNewsSchema.safeParse({
        ...news,
        items: [{ ...news.items[0], date: "2026-02-30" }],
      }).success
    ).toBe(false);
  });
});

describe("gpTeamSchema", () => {
  it("accepts named members with roles", () => {
    const team = {
      reviewed: "2026-07-01",
      groups: [
        {
          group: "Doctors",
          members: [{ name: "Dr Sarah Patel", role: "GP Partner" }],
        },
      ],
      gpEarningsCopy: "Sample declaration copy for the demo.",
    };
    expect(gpTeamSchema.parse(team).groups[0].members[0].name).toBe("Dr Sarah Patel");
  });
});

describe("gpPracticeInfoSchema", () => {
  it("requires kebab-case ids so policies stay anchor-linkable", () => {
    const info = {
      reviewed: "2026-07-01",
      cqc: { rating: "Good", copy: "Inspected March 2026." },
      fft: { headline: "94% would recommend us", copy: "From 212 responses." },
      policies: [
        { id: "zero-tolerance", title: "Respect for our team", copy: "Policy copy." },
      ],
    };
    expect(gpPracticeInfoSchema.parse(info).policies).toHaveLength(1);
    expect(
      gpPracticeInfoSchema.safeParse({
        ...info,
        policies: [{ ...info.policies[0], id: "Zero Tolerance!" }],
      }).success
    ).toBe(false);
  });
});

describe("gpAppointmentsSchema", () => {
  const appointments = {
    reviewed: "2026-07-01",
    routes: [
      { title: "Book online", copy: "Use the NHS App." },
      { title: "Call the surgery", copy: "Call from 8am." },
    ],
    urgentToday: ["a baby or young child is unwell and you are worried"],
    emergencyNow: ["you have signs of a heart attack or stroke"],
    homeVisits: "If you are housebound, call before 10:30am to ask for a visit.",
    onlineHours: "The online form is open 8am to 6:30pm, Monday to Friday.",
    accessCommitment: "9 in 10 calls answered within 10 minutes.",
  };

  it("requires booking routes and both urgent-care lists", () => {
    expect(gpAppointmentsSchema.parse(appointments).routes).toHaveLength(2);
    expect(
      gpAppointmentsSchema.safeParse({ ...appointments, emergencyNow: [] }).success
    ).toBe(false);
  });

  it("requires home-visit criteria — a statutory leaflet item", () => {
    expect(
      gpAppointmentsSchema.safeParse({ ...appointments, homeVisits: undefined }).success
    ).toBe(false);
  });
});

describe("gpServicesSchema self-referral links", () => {
  it("accepts direct links so routes never dead-end at reception", () => {
    const services = {
      reviewed: "2026-07-01",
      groups: [{ title: "Everyday care", items: ["Blood tests"] }],
      selfReferral: [
        {
          title: "NHS Talking Therapies",
          copy: "Refer yourself directly.",
          href: "https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/",
          linkLabel: "Refer yourself on the NHS website",
        },
        { title: "Local service", copy: "No link for this one." },
      ],
    };
    const parsed = gpServicesSchema.parse(services);
    expect(parsed.selfReferral[0].href).toContain("nhs.uk");
    expect(parsed.selfReferral[1].href).toBeUndefined();
  });
});

describe("gpRegisterSchema", () => {
  it("requires the catchment description and registration steps", () => {
    const register = {
      reviewed: "2026-07-01",
      lede: "Join the surgery in about ten minutes, online.",
      catchment: {
        copy: "We cover Willowbrook and the surrounding villages.",
        checkNote: "Postcodes RG1 and RG2 are inside our area.",
      },
      steps: [
        { title: "Check you live in our area", copy: "Copy." },
        { title: "Fill in the online form", copy: "Copy." },
      ],
      notes: [{ title: "No documents needed", copy: "Copy." }],
    };
    expect(gpRegisterSchema.parse(register).steps).toHaveLength(2);
    expect(
      gpRegisterSchema.safeParse({ ...register, steps: [register.steps[0]] }).success
    ).toBe(false);
  });
});

describe("gpAccessibilitySchema", () => {
  it("requires the statutory statement sections", () => {
    const statement = {
      reviewed: "2026-07-01",
      compliance: "This website is partially compliant with WCAG 2.2 AA.",
      features: ["Every page works with a keyboard alone"],
      nonAccessible: ["The illustrative map has no zoom control"],
      testing: "Tested with axe-core and manual keyboard checks in July 2026.",
      reporting: {
        copy: "Tell us if any part of this site is hard to use.",
        email: "access@willowbrook.example",
      },
      enforcement:
        "If you are not happy with our response, contact EASS, who enforce the accessibility regulations.",
      thirdParty: "Links to NHS services are covered by their own statements.",
      noOverlay: "We do not use an accessibility overlay widget.",
    };
    expect(gpAccessibilitySchema.parse(statement).reporting.email).toContain("@");
    expect(
      gpAccessibilitySchema.safeParse({ ...statement, enforcement: undefined }).success
    ).toBe(false);
  });
});
