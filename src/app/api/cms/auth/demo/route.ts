import { NextResponse } from "next/server";
import { getDemoWorkspace } from "@/data/gp-cms/demo-workspaces";
import { CMS_SESSION_COOKIE, getCmsAuthConfig } from "@/features/gp-cms/auth/config";
import { createDemoSession, issueSessionCookie, sessionCookieOptions } from "@/features/gp-cms/auth/session";
import type { CmsRole } from "@/features/gp-cms/auth/types";

const demoRoles: CmsRole[] = ["platform_admin", "practice_admin", "editor", "viewer"];

export async function POST(request: Request) {
  const config = getCmsAuthConfig();
  if (config.mode !== "demo" || !config.isConfigured) {
    return NextResponse.json(
      { error: "Local demo sign-in is not enabled." },
      { status: 403 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    workspace?: string;
    role?: CmsRole;
  } | null;
  const workspace = body?.workspace ? getDemoWorkspace(body.workspace) : undefined;
  if (!workspace || !body?.role || !demoRoles.includes(body.role)) {
    return NextResponse.json({ error: "Choose a valid demo workspace and role." }, { status: 400 });
  }

  const session = createDemoSession({ workspaceId: workspace.id, role: body.role });
  const response = NextResponse.json({ ok: true, next: "/cms" });
  response.cookies.set(
    CMS_SESSION_COOKIE,
    issueSessionCookie(session),
    sessionCookieOptions(session.expiresAt)
  );
  return response;
}
