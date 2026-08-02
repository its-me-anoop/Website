import type { CmsPermission, CmsRole, CmsSession, WorkspaceAccess } from "./types";

const allPermissions: CmsPermission[] = [
  "view_workspace",
  "preview_draft",
  "edit_content",
  "publish_content",
  "manage_practice",
  "view_activity",
  "manage_members",
  "reset_demo",
];

const permissionsByRole: Record<CmsRole, CmsPermission[]> = {
  platform_admin: allPermissions,
  practice_admin: [
    "view_workspace",
    "preview_draft",
    "edit_content",
    "publish_content",
    "manage_practice",
    "view_activity",
    "manage_members",
  ],
  editor: ["view_workspace", "preview_draft", "edit_content", "view_activity"],
  viewer: ["view_workspace", "preview_draft", "view_activity"],
};

export function getWorkspaceAccess(
  session: CmsSession,
  workspaceId: string
): WorkspaceAccess | null {
  const role =
    session.role === "platform_admin"
      ? "platform_admin"
      : session.memberships.find((membership) => membership.workspaceId === workspaceId)
          ?.role;

  if (!role) return null;

  return {
    role,
    can: Object.fromEntries(
      allPermissions.map((permission) => [
        permission,
        permissionsByRole[role].includes(permission),
      ])
    ) as Record<CmsPermission, boolean>,
  };
}

export function canAccessAnyWorkspace(session: CmsSession) {
  return session.role === "platform_admin" || session.memberships.length > 0;
}

export function labelForRole(role: CmsRole) {
  switch (role) {
    case "platform_admin":
      return "Flutterly platform administrator";
    case "practice_admin":
      return "Practice administrator";
    case "editor":
      return "Editor";
    default:
      return "Viewer";
  }
}
