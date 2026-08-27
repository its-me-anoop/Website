import { describe, expect, it } from "vitest";
import { demoWorkspaces } from "@/data/gp-cms/demo-workspaces";
import { GP_CMS_CORE_VERSION, summariseWorkspace } from "./types";

describe("GP CMS workspace model", () => {
  it("keeps practices as independent workspace data on one core version", () => {
    const [willowbrook, meadowView] = demoWorkspaces;

    expect(willowbrook.id).not.toBe(meadowView.id);
    expect(willowbrook.slug).not.toBe(meadowView.slug);
    expect(willowbrook.coreVersion).toBe(GP_CMS_CORE_VERSION);
    expect(meadowView.coreVersion).toBe(GP_CMS_CORE_VERSION);
    expect(willowbrook.pages[0]).not.toBe(meadowView.pages[0]);
  });

  it("summarises publish states across structured content", () => {
    const summary = summariseWorkspace(demoWorkspaces[0]);

    expect(summary.publishedCount).toBeGreaterThan(0);
    expect(summary.draftCount).toBeGreaterThan(0);
    expect(summary.name).toBe("Willowbrook Surgery");
  });
});
