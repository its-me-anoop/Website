import { describe, expect, it } from "vitest";
import { getWorkspaceAccess } from "./permissions";
import type { CmsSession } from "./types";

const baseSession: CmsSession = {
  id: "session-1",
  actor: { id: "user-1", name: "Avery Practice", email: "avery@example.invalid" },
  role: "editor",
  memberships: [{ workspaceId: "practice_willowbrook", role: "editor" }],
  expiresAt: "2099-01-01T00:00:00.000Z",
  mode: "demo",
};

describe("workspace permissions", () => {
  it("scopes an editor to their own workspace and blocks publishing", () => {
    const access = getWorkspaceAccess(baseSession, "practice_willowbrook");

    expect(access?.can.edit_content).toBe(true);
    expect(access?.can.publish_content).toBe(false);
    expect(getWorkspaceAccess(baseSession, "practice_meadow_view")).toBeNull();
  });

  it("gives a practice administrator full workspace controls but not demo reset", () => {
    const access = getWorkspaceAccess(
      { ...baseSession, role: "practice_admin", memberships: [{ workspaceId: "practice_willowbrook", role: "practice_admin" }] },
      "practice_willowbrook"
    );

    expect(access?.can.publish_content).toBe(true);
    expect(access?.can.manage_practice).toBe(true);
    expect(access?.can.reset_demo).toBe(false);
  });

  it("gives a platform administrator controlled access to every workspace", () => {
    const access = getWorkspaceAccess(
      { ...baseSession, role: "platform_admin", memberships: [] },
      "practice_kingsway"
    );

    expect(access?.can.manage_members).toBe(true);
    expect(access?.can.reset_demo).toBe(true);
  });
});
