import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { z } from "zod";
import { readCollection } from "./load";
import { loadGpContent } from "./gp";

const tempRoots: string[] = [];

function makeContentRoot(files: Record<string, unknown>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "cms-test-"));
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

const demo = z.object({ title: z.string().min(1) });

describe("readCollection", () => {
  it("parses a valid collection file", () => {
    const root = makeContentRoot({ "site/demo.json": { title: "Hello" } });
    expect(readCollection("site", "demo", demo, root)).toEqual({ title: "Hello" });
  });

  it("names the file and field when content is invalid", () => {
    const root = makeContentRoot({ "site/demo.json": { title: "" } });
    expect(() => readCollection("site", "demo", demo, root)).toThrowError(
      /site\/demo\.json[\s\S]*title/
    );
  });

  it("names the file when it is missing", () => {
    const root = makeContentRoot({});
    expect(() => readCollection("site", "missing", demo, root)).toThrowError(
      /site\/missing\.json/
    );
  });
});

/** Minimal but complete GP site used to test loader derivations. */
function gpFixture(overrides: Record<string, object> = {}): string {
  const base: Record<string, unknown> = {
    "gp-practice/practice.json": {
      reviewed: "2026-07-01",
      name: "Willowbrook Surgery",
      strap: "NHS GP services",
      phone: "0118 496 0123",
      address: "1 Meadow Lane, Reading RG1 9ZZ",
      hoursSummary: "Open 8am to 6:30pm, Monday to Friday",
      access: ["Step-free access throughout the ground floor"],
      acceptingNewPatients: true,
      enhancedAccess: "Evening and Saturday appointments run at the hub.",
      outOfHours: "When we are closed, call NHS 111.",
      icb: { name: "NHS Sample ICB", copy: "Contact the ICB." },
      openingTimes: [
        { day: "Monday", hours: "8-6" },
        { day: "Tuesday", hours: "8-6" },
        { day: "Wednesday", hours: "8-6" },
        { day: "Thursday", hours: "8-6" },
        { day: "Friday", hours: "8-6" },
        { day: "Saturday", hours: "Closed" },
        { day: "Sunday", hours: "Closed" },
      ],
    },
    "gp-practice/home.json": {
      reviewed: "2026-07-01",
      alert: { title: "Alert", copy: "Copy.", expires: "2026-09-01" },
      primaryTasks: [
        { title: "Book", copy: "Copy.", href: "/a" },
        { title: "Order", copy: "Copy.", href: "/b" },
      ],
      moreTasks: [
        { title: "One", copy: "Copy.", href: "/c" },
        { title: "Two", copy: "Copy.", href: "/d" },
      ],
      wellbeing: [{ title: "Health A to Z", copy: "Copy.", href: "https://nhs.uk" }],
    },
    "gp-practice/news.json": {
      reviewed: "2026-07-01",
      items: [
        { date: "2026-06-12", title: "Older", copy: "Copy." },
        { date: "2026-07-18", title: "Newer", copy: "Copy." },
      ],
    },
    "gp-practice/team.json": {
      reviewed: "2026-07-01",
      groups: [{ group: "Doctors", members: [{ name: "Dr A", role: "GP" }] }],
      gpEarningsCopy: "Earnings copy.",
    },
    "gp-practice/services.json": {
      reviewed: "2026-07-01",
      groups: [{ title: "Everyday care", items: ["Blood tests"] }],
      selfReferral: [{ title: "Pharmacy First", copy: "Copy." }],
    },
    "gp-practice/practice-info.json": {
      reviewed: "2026-07-01",
      cqc: { rating: "Good", copy: "Inspected March 2026." },
      fft: { headline: "94% would recommend us", copy: "From 212 responses." },
      policies: [{ id: "records", title: "Records", copy: "Copy." }],
    },
    "gp-practice/faqs.json": {
      reviewed: "2026-07-01",
      items: [{ q: "Question?", a: "Answer." }],
    },
    "gp-practice/appointments.json": {
      reviewed: "2026-07-01",
      routes: [
        { title: "Book online", copy: "Copy." },
        { title: "Call", copy: "Copy." },
      ],
      urgentToday: ["a worrying symptom"],
      emergencyNow: ["signs of a stroke"],
      homeVisits: "Call before 10:30am to ask for a home visit.",
      onlineHours: "The online form is open 8am to 6:30pm, Monday to Friday.",
      accessCommitment: "9 in 10 calls answered within 10 minutes.",
    },
    "gp-practice/prescriptions.json": {
      reviewed: "2026-07-01",
      steps: [
        { title: "Order", copy: "Copy." },
        { title: "Collect", copy: "Copy." },
      ],
    },
    "gp-practice/register.json": {
      reviewed: "2026-07-01",
      lede: "Join the surgery online.",
      catchment: { copy: "We cover Willowbrook.", checkNote: "RG1 is inside our area." },
      steps: [
        { title: "Check you live in our area", copy: "Copy." },
        { title: "Fill in the online form", copy: "Copy." },
      ],
      notes: [{ title: "No documents needed", copy: "Copy." }],
    },
    "gp-practice/accessibility.json": {
      reviewed: "2026-07-01",
      compliance: "Partially compliant with WCAG 2.2 AA.",
      features: ["Keyboard operable"],
      nonAccessible: ["The illustrative map has no zoom control"],
      testing: "Tested with axe-core in July 2026.",
      reporting: { copy: "Tell us.", email: "access@example.example" },
      enforcement: "Contact EASS if unhappy with our response.",
      thirdParty: "NHS links carry their own statements.",
      noOverlay: "No overlay widget is used.",
    },
  };
  return makeContentRoot({ ...base, ...overrides });
}

describe("loadGpContent", () => {
  it("derives the tel: href from the practice phone", () => {
    const content = loadGpContent({ root: gpFixture(), today: "2026-08-04" });
    expect(content.practice.phoneHref).toBe("tel:+441184960123");
  });

  it("sorts news newest-first and derives display dates", () => {
    const content = loadGpContent({ root: gpFixture(), today: "2026-08-04" });
    expect(content.news.items.map((i) => i.title)).toEqual(["Newer", "Older"]);
    expect(content.news.items[0].display).toBe("18 July 2026");
  });

  it("lists collections whose content review is more than a year old", () => {
    const fresh = loadGpContent({ root: gpFixture(), today: "2026-08-04" });
    expect(fresh.stale).toEqual([]);

    const root = gpFixture({
      "gp-practice/news.json": {
        reviewed: "2024-01-01",
        items: [{ date: "2024-01-01", title: "Old", copy: "Copy." }],
      },
    });
    const content = loadGpContent({ root, today: "2026-08-04" });
    expect(content.stale).toEqual(["news"]);
  });

  it("substitutes {phone} placeholders so practice facts live in one file", () => {
    const root = gpFixture({
      "gp-practice/appointments.json": {
        reviewed: "2026-07-01",
        routes: [
          { title: "Call the surgery", copy: "Call {phone} from 8am." },
          { title: "Book online", copy: "Use the NHS App." },
        ],
        urgentToday: ["a worrying symptom"],
        emergencyNow: ["signs of a stroke"],
        homeVisits: "Call before 10:30am to ask for a home visit.",
        onlineHours: "The online form is open 8am to 6:30pm, Monday to Friday.",
        accessCommitment: "9 in 10 calls answered within 10 minutes.",
      },
    });
    const content = loadGpContent({ root, today: "2026-08-04" });
    expect(content.appointments.routes[0].copy).toBe("Call 0118 496 0123 from 8am.");
  });

  it("keeps a live alert and drops an expired one", () => {
    const live = loadGpContent({ root: gpFixture(), today: "2026-08-04" });
    expect(live.home.alert?.title).toBe("Alert");

    const expired = loadGpContent({ root: gpFixture(), today: "2026-09-02" });
    expect(expired.home.alert).toBeNull();
  });
});
