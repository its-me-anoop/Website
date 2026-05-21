import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility helper", () => {
  it("should merge tailwind classes properly", () => {
    const result = cn("px-2 py-2", "py-4", "bg-red-500");
    expect(result).toContain("px-2");
    expect(result).toContain("py-4");
    expect(result).not.toContain("py-2"); // should be overridden by twMerge
    expect(result).toContain("bg-red-500");
  });

  it("should handle falsy values", () => {
    const result = cn("px-2", null, undefined, false, "py-2");
    expect(result).toBe("px-2 py-2");
  });
});
