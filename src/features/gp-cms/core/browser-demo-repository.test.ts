import { beforeEach, describe, expect, it, vi } from "vitest";
import { demoWorkspaces } from "@/data/gp-cms/demo-workspaces";
import { browserDemoRepository, withAuditEvent } from "./browser-demo-repository";

describe("browser demo workspace repository", () => {
  beforeEach(() => window.localStorage.clear());

  it("persists each practice under an isolated browser key", () => {
    const [willowbrook, meadowView] = demoWorkspaces.map((workspace) =>
      structuredClone(workspace)
    );
    willowbrook.name = "Updated Willowbrook";
    meadowView.name = "Updated Meadow View";

    browserDemoRepository.save(willowbrook);
    browserDemoRepository.save(meadowView);

    expect(browserDemoRepository.load(demoWorkspaces[0]).name).toBe("Updated Willowbrook");
    expect(browserDemoRepository.load(demoWorkspaces[1]).name).toBe("Updated Meadow View");
  });

  it("rejects stored data for the wrong workspace", () => {
    const willowbrook = structuredClone(demoWorkspaces[0]);
    const meadowView = structuredClone(demoWorkspaces[1]);
    window.localStorage.setItem(
      `flutterly.gp-cms.demo.v1.${willowbrook.id}`,
      JSON.stringify(meadowView)
    );

    expect(browserDemoRepository.load(willowbrook).id).toBe(willowbrook.id);
  });

  it("adds a readable audit event when content is saved", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-02T12:00:00.000Z"));
    const workspace = structuredClone(demoWorkspaces[0]);
    const updated = withAuditEvent(workspace, {
      intent: "publish_content",
      action: "Published appointments",
      detail: "Updated the urgent-care wording.",
    }, { id: "demo-user", name: "Demo editor", email: "demo@example.invalid" });

    expect(updated.audit[0]).toMatchObject({
      actor: "Demo editor",
      action: "Published appointments",
      detail: "Updated the urgent-care wording.",
    });
    vi.useRealTimers();
  });
});
