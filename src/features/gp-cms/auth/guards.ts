import { redirect } from "next/navigation";
import { getWorkspaceAccess, canAccessAnyWorkspace } from "./permissions";
import { getCmsSession } from "./session";
import type { CmsPermission, CmsSession, WorkspaceAccess } from "./types";

export async function requireCmsDirectorySession(next = "/cms"): Promise<CmsSession> {
  const session = await getCmsSession();
  if (!session) redirect(`/cms/sign-in?next=${encodeURIComponent(next)}`);
  if (!canAccessAnyWorkspace(session)) redirect("/cms/unauthorised?reason=workspace");
  return session;
}

export async function requireWorkspacePermission(input: {
  workspaceId: string;
  workspaceSlug: string;
  permission: CmsPermission;
  next: string;
}): Promise<{ session: CmsSession; access: WorkspaceAccess }> {
  const session = await getCmsSession();
  if (!session) redirect(`/cms/sign-in?next=${encodeURIComponent(input.next)}`);
  const access = getWorkspaceAccess(session, input.workspaceId);
  if (!access || !access.can[input.permission]) {
    redirect(`/cms/unauthorised?workspace=${encodeURIComponent(input.workspaceSlug)}`);
  }
  return { session, access };
}
