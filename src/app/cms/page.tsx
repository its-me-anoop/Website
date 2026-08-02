import { CmsDirectory } from "@/features/gp-cms/admin/CmsDirectory";
import { demoWorkspaces } from "@/data/gp-cms/demo-workspaces";
import { requireCmsDirectorySession } from "@/features/gp-cms/auth/guards";

export default async function CmsDirectoryPage() {
  const session = await requireCmsDirectorySession();
  const visibleWorkspaces =
    session.role === "platform_admin"
      ? demoWorkspaces
      : demoWorkspaces.filter((workspace) =>
          session.memberships.some((membership) => membership.workspaceId === workspace.id)
        );
  return <CmsDirectory workspaces={visibleWorkspaces} />;
}
