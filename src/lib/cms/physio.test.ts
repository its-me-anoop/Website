import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadPhysioContent } from "./physio";

const tempRoots: string[] = [];

function makeContentRoot(files: Record<string, unknown>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "cms-physio-test-"));
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

const clinic = {
  reviewed: "2026-08-04",
  name: "Forbury Physiotherapy",
  strap: "Private physiotherapy by Forbury Gardens, Reading",
  phone: "0118 496 0678",
  email: "hello@forburyphysio.example",
  address: "5 Garden Court, Forbury, Reading RG1 9XP",
  access: ["Step-free entrance directly off Garden Court"],
  bookingCopy: "Call or email us to book — no GP referral needed.",
  nhsPositioningLine: "Appointments this week, no GP referral needed.",
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

const condition = {
  slug: "back-and-neck-pain",
  title: "Back and neck pain, including sciatica",
  plainSummary: "Persistent or flare-up pain in your back or neck.",
  whatWeAssess: "How you move and where movement is limited.",
  typicalApproach: "Hands-on treatment alongside a graded exercise programme.",
};

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

function physioFixture(): string {
  return makeContentRoot({
    "physio-clinic/clinic.json": clinic,
    "physio-clinic/home.json": {
      reviewed: "2026-08-04",
      hero: { title: "Get back to what you'd rather be doing", copy: "Hands-on assessment." },
      primaryTasks: [
        { title: "Book an appointment", copy: "Call or email.", href: "/demo/physio-clinic/first-appointment" },
        { title: "See our prices", copy: "Clear prices.", href: "/demo/physio-clinic/pricing" },
        { title: "What to expect", copy: "Four stages.", href: "/demo/physio-clinic/first-appointment" },
      ],
      conditionsTeaser: [
        { label: "Back and neck pain", slug: "back-and-neck-pain" },
        { label: "Shoulder problems" },
        { label: "Sports injuries" },
      ],
    },
    "physio-clinic/conditions.json": {
      reviewed: "2026-08-04",
      conditions: Array(8).fill(condition),
    },
    "physio-clinic/treatments.json": {
      reviewed: "2026-08-04",
      approaches: [
        { title: "Manual therapy", copy: "Hands-on techniques.", whoItHelps: "Stiff joints." },
        { title: "Exercise rehab", copy: "Progressive exercise.", whoItHelps: "Everyone." },
        { title: "Acupuncture", copy: "Fine needles.", whoItHelps: "Muscle tension." },
        { title: "Sports massage", copy: "Soft-tissue work.", whoItHelps: "Athletes." },
      ],
    },
    "physio-clinic/first-appointment.json": {
      reviewed: "2026-08-04",
      duration: "45–60 minutes",
      beats: [
        { title: "A conversation and your history", copy: "We'll talk through it." },
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
    },
    "physio-clinic/pricing.json": {
      reviewed: "2026-08-04",
      sessions: [
        { type: "Initial assessment", duration: "60 minutes", price: "£55–£75", includes: "Full assessment." },
        { type: "Follow-up session", duration: "45 minutes", price: "£45–£60", includes: "Ongoing treatment." },
      ],
      courseLengthCopy: "Most acute problems settle in 2–4 sessions.",
      insuranceNotes: ["An excess may apply."],
      cancellation: {
        noticeHours: 24,
        policyCopy: "Please give us at least 24 hours' notice.",
        insurerNote: "Insurers do not pay for missed appointments.",
      },
    },
    "physio-clinic/team.json": {
      reviewed: "2026-08-04",
      practitioners: [practitioner, practitioner],
    },
    "physio-clinic/trust.json": {
      reviewed: "2026-08-04",
      blocks: Array(5).fill({
        title: "Protected title",
        copy: "Only HCPC-registered people may practise.",
      }),
      verifyRegisterCopy: "Check any clinician on the HCPC register.",
    },
    "physio-clinic/accessibility.json": {
      reviewed: "2026-08-04",
      compliance: "This website aims to meet WCAG 2.2 AA.",
      features: ["Every page works with a keyboard alone"],
      nonAccessible: ["There is no BSL interpreted video version of this site."],
      testing: "Tested with axe-core and manual keyboard checks.",
      reporting: { copy: "Tell us if something is hard to use.", email: "access@forburyphysio.example" },
      enforcement: "Contact EASS if you are not happy with our response.",
      thirdParty: "Links to the HCPC register are covered by their own statement.",
      noOverlay: "We do not use an accessibility overlay widget.",
    },
  });
}

describe("loadPhysioContent", () => {
  it("derives the tel: href and validates every collection", () => {
    const content = loadPhysioContent({ root: physioFixture() });
    expect(content.clinic.phoneHref).toBe("tel:+441184960678");
    expect(content.clinic.name).toBe("Forbury Physiotherapy");
    expect(content.conditions.conditions).toHaveLength(8);
    expect(content.team.practitioners).toHaveLength(2);
    expect(content.accessibility.reporting.email).toBe("access@forburyphysio.example");
  });

  it("rejects an invalid HCPC number with the offending file named in the error", () => {
    const root = physioFixture();
    const teamFile = path.join(root, "physio-clinic/team.json");
    const data = JSON.parse(fs.readFileSync(teamFile, "utf8"));
    data.practitioners[0].hcpcNumber = "not-a-number";
    fs.writeFileSync(teamFile, JSON.stringify(data));
    expect(() => loadPhysioContent({ root })).toThrowError(/team\.json[\s\S]*hcpcNumber/);
  });

  it("rejects a condition-teaser slug that doesn't match any real condition slug, naming both files", () => {
    const root = physioFixture();
    const homeFile = path.join(root, "physio-clinic/home.json");
    const data = JSON.parse(fs.readFileSync(homeFile, "utf8"));
    data.conditionsTeaser[0].slug = "no-such-condition";
    fs.writeFileSync(homeFile, JSON.stringify(data));
    expect(() => loadPhysioContent({ root })).toThrowError(
      /home\.json[\s\S]*no-such-condition[\s\S]*conditions\.json/
    );
  });

  it("flags collections reviewed more than a year ago as stale", () => {
    const root = physioFixture();
    const clinicFile = path.join(root, "physio-clinic/clinic.json");
    const data = JSON.parse(fs.readFileSync(clinicFile, "utf8"));
    data.reviewed = "2024-01-01";
    fs.writeFileSync(clinicFile, JSON.stringify(data));
    const content = loadPhysioContent({ root, today: "2026-08-04" });
    expect(content.stale).toContain("clinic");
  });
});
