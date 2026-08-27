import { NextResponse } from "next/server";
import { getDemoWorkspace } from "@/data/gp-cms/demo-workspaces";
import { getCmsAuthConfig } from "@/features/gp-cms/auth/config";
import { getWorkspaceAccess } from "@/features/gp-cms/auth/permissions";
import { productionAuthAdapter } from "@/features/gp-cms/auth/production-adapter";
import { getCmsSession } from "@/features/gp-cms/auth/session";
import type { CmsMutationIntent, CmsMutationRequest, CmsPermission } from "@/features/gp-cms/auth/types";
import type { PracticeWorkspace } from "@/features/gp-cms/core/types";

const permissionForIntent: Record<CmsMutationIntent, CmsPermission> = {
  save_content: "edit_content",
  publish_content: "publish_content",
  update_practice: "manage_practice",
  update_media: "edit_content",
  update_team: "edit_content",
  update_notice: "edit_content",
  reset_demo: "reset_demo",
};

function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ workspace: string }> }
) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "This request must come from the CMS." }, { status: 403 });
  }
  const { workspace: slug } = await params;
  const seed = getDemoWorkspace(slug);
  if (!seed) return NextResponse.json({ error: "Workspace not found." }, { status: 404 });
  const session = await getCmsSession();
  if (!session) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const access = getWorkspaceAccess(session, seed.id);
  const body = (await request.json().catch(() => null)) as {
    mutation?: CmsMutationRequest;
    workspace?: PracticeWorkspace;
  } | null;
  const mutation = body?.mutation;
  const intent = mutation?.intent;
  if (!access || !mutation || !intent || !(intent in permissionForIntent)) {
    return NextResponse.json({ error: "You do not have permission for that change." }, { status: 403 });
  }
  if (!access.can[permissionForIntent[intent]]) {
    return NextResponse.json({ error: "Your role cannot make that change." }, { status: 403 });
  }

  const config = getCmsAuthConfig();
  if (session.mode === "production") {
    if (!productionAuthAdapter || !body.workspace) {
      return NextResponse.json(
        { error: "The production workspace repository is not configured." },
        { status: 503 }
      );
    }
    await productionAuthAdapter.applyWorkspaceMutation({
      session,
      workspaceSlug: slug,
      workspace: body.workspace,
      mutation,
    });
  } else if (config.mode !== "demo") {
    return NextResponse.json({ error: "Demo mutations are not enabled." }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    actor: session.actor,
    access,
    mode: session.mode,
  });
}
