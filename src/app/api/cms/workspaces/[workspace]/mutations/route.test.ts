import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CmsSession } from "@/features/gp-cms/auth/types";

const getCmsSession = vi.fn();

vi.mock("@/features/gp-cms/auth/session", () => ({ getCmsSession }));

const { POST } = await import("./route");

const editorSession: CmsSession = {
  id: "session-editor",
  actor: { id: "editor-1", name: "Avery Editor", email: "avery@example.invalid" },
  role: "editor",
  memberships: [{ workspaceId: "practice_willowbrook", role: "editor" }],
  expiresAt: "2099-01-01T00:00:00.000Z",
  mode: "demo",
};

function mutationRequest(intent: "save_content" | "publish_content") {
  return new Request("http://localhost:3000/api/cms/workspaces/willowbrook/mutations", {
    method: "POST",
    headers: { origin: "http://localhost:3000", "content-type": "application/json" },
    body: JSON.stringify({ mutation: { intent, action: "Test change", detail: "Test detail" } }),
  });
}

describe("workspace mutation route", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.GP_CMS_AUTH_MODE = "demo";
    process.env.GP_CMS_AUTH_SECRET = "a-local-test-secret-that-is-longer-than-thirty-two-characters";
  });

  it("rejects unauthenticated mutations", async () => {
    getCmsSession.mockResolvedValue(null);
    const response = await POST(mutationRequest("save_content"), {
      params: Promise.resolve({ workspace: "willowbrook" }),
    });

    expect(response.status).toBe(401);
  });

  it("prevents editors from publishing", async () => {
    getCmsSession.mockResolvedValue(editorSession);
    const response = await POST(mutationRequest("publish_content"), {
      params: Promise.resolve({ workspace: "willowbrook" }),
    });

    expect(response.status).toBe(403);
  });

  it("permits an editor to save a content draft in local demo mode", async () => {
    getCmsSession.mockResolvedValue(editorSession);
    const response = await POST(mutationRequest("save_content"), {
      params: Promise.resolve({ workspace: "willowbrook" }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      actor: { name: "Avery Editor" },
    });
  });
});
