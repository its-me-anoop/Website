import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  parseAvailabilityRules,
  resolveAvailability,
  saveAvailability,
} from "./availability-store";

const mondayRules = {
  timeZone: "Europe/London",
  weeklyWindows: [{ day: 1, start: "10:00", end: "12:00" }],
  minNoticeHours: 18,
  horizonDays: 60,
  bufferMinutes: 15,
};

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "availability-store-"));
  vi.stubEnv("BOOKING_AVAILABILITY_FILE", path.join(dir, "availability.json"));
});

afterEach(async () => {
  vi.unstubAllEnvs();
  await rm(dir, { recursive: true, force: true });
});

describe("resolveAvailability", () => {
  it("defaults to closed with no file and no env", async () => {
    const { rules, source } = await resolveAvailability();
    expect(source).toBe("default");
    expect(rules.weeklyWindows).toEqual([]);
  });

  it("uses the env var when no file exists, and the file once saved", async () => {
    vi.stubEnv(
      "BOOKING_AVAILABILITY_JSON",
      JSON.stringify({ ...mondayRules, minNoticeHours: 24 })
    );
    expect(await resolveAvailability()).toMatchObject({
      source: "env",
      rules: { minNoticeHours: 24 },
    });

    await saveAvailability(parseAvailabilityRules(mondayRules)!);
    expect(await resolveAvailability()).toMatchObject({
      source: "file",
      rules: { minNoticeHours: 18 },
    });
  });

  it("ignores malformed env JSON", async () => {
    vi.stubEnv("BOOKING_AVAILABILITY_JSON", "{not json");
    expect((await resolveAvailability()).source).toBe("default");
  });
});

describe("parseAvailabilityRules", () => {
  it("normalises and sorts valid rules", () => {
    const parsed = parseAvailabilityRules({
      weeklyWindows: [
        { day: 3, start: "14:00", end: "17:00" },
        { day: 1, start: "09:00", end: "12:00" },
      ],
    });
    expect(parsed?.weeklyWindows[0]).toEqual({ day: 1, start: "09:00", end: "12:00" });
    // Unspecified numbers fall back to the defaults.
    expect(parsed?.horizonDays).toBe(60);
    expect(parsed?.timeZone).toBe("Europe/London");
  });

  it("rejects invalid shapes", () => {
    expect(parseAvailabilityRules(null)).toBeNull();
    expect(parseAvailabilityRules({ weeklyWindows: "all week" })).toBeNull();
    expect(
      parseAvailabilityRules({ weeklyWindows: [{ day: 0, start: "09:00", end: "10:00" }] })
    ).toBeNull();
    expect(
      parseAvailabilityRules({ weeklyWindows: [{ day: 1, start: "9am", end: "10:00" }] })
    ).toBeNull();
    expect(
      parseAvailabilityRules({ weeklyWindows: [{ day: 1, start: "11:00", end: "10:00" }] })
    ).toBeNull();
  });

  it("falls back to the host timezone for invalid zones", () => {
    const parsed = parseAvailabilityRules({ ...mondayRules, timeZone: "Mars/Olympus" });
    expect(parsed?.timeZone).toBe("Europe/London");
  });
});
