import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { careHomeSchema } from "./schemas/care";
import { loadCareContent } from "./care";

const tempRoots: string[] = [];

function makeContentRoot(files: Record<string, unknown>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "cms-care-test-"));
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

const home = {
  reviewed: "2026-07-01",
  name: "Oakfield House",
  strap: "Residential, dementia and respite care in Caversham",
  phone: "0118 496 0456",
  address: "42 Orchard Way, Caversham, Reading RG4 9ZZ",
  email: "enquiries@oakfieldhouse.example",
  manager: "Sarah Whitfield",
};

describe("careHomeSchema", () => {
  it("accepts the home profile and rejects a malformed email", () => {
    expect(careHomeSchema.parse(home).manager).toBe("Sarah Whitfield");
    expect(careHomeSchema.safeParse({ ...home, email: "reception desk" }).success).toBe(
      false
    );
  });
});

function careFixture(): string {
  return makeContentRoot({
    "care-home/home.json": home,
    "care-home/care.json": {
      reviewed: "2026-07-01",
      careTypes: [
        { title: "Residential care", copy: "Copy.", tone: "sage" },
        { title: "Dementia care", copy: "Copy.", tone: "terra" },
        { title: "Respite stays", copy: "Copy.", tone: "cream" },
      ],
      inspection: {
        rating: "Good",
        note: "Sample rating shown for demonstration.",
        areas: [{ area: "Safe", rating: "Good" }],
      },
    },
    "care-home/life.json": {
      reviewed: "2026-07-01",
      moments: [{ title: "Home-cooked, every day", copy: "Copy." }],
    },
    "care-home/families.json": {
      reviewed: "2026-07-01",
      steps: [
        { title: "1. Call or enquire", copy: "Copy." },
        { title: "2. Visit the home", copy: "Copy." },
      ],
      faqs: [{ q: "Question?", a: "Answer." }],
    },
    "care-home/careers.json": {
      reviewed: "2026-07-01",
      roles: [{ title: "Care Assistant", detail: "Full time", copy: "Copy." }],
    },
  });
}

describe("loadCareContent", () => {
  it("derives the tel: href and validates every collection", () => {
    const content = loadCareContent({ root: careFixture() });
    expect(content.home.phoneHref).toBe("tel:+441184960456");
    expect(content.care.careTypes).toHaveLength(3);
    expect(content.careers.roles[0].title).toBe("Care Assistant");
  });

  it("rejects an invalid care-type tone", () => {
    const root = careFixture();
    const careFile = path.join(root, "care-home/care.json");
    const data = JSON.parse(fs.readFileSync(careFile, "utf8"));
    data.careTypes[0].tone = "neon";
    fs.writeFileSync(careFile, JSON.stringify(data));
    expect(() => loadCareContent({ root })).toThrowError(/care\.json[\s\S]*tone/);
  });
});
