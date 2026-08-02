export type CmsRole =
  | "platform_admin"
  | "practice_admin"
  | "editor"
  | "viewer";

export type CmsPermission =
  | "view_workspace"
  | "preview_draft"
  | "edit_content"
  | "publish_content"
  | "manage_practice"
  | "view_activity"
  | "manage_members"
  | "reset_demo";

export type CmsWorkspaceMembership = {
  workspaceId: string;
  role: Exclude<CmsRole, "platform_admin">;
};

export type CmsActor = {
  id: string;
  name: string;
  email: string;
};

export type CmsSession = {
  id: string;
  actor: CmsActor;
  role: CmsRole;
  memberships: CmsWorkspaceMembership[];
  expiresAt: string;
  mode: "demo" | "production";
};

export type WorkspaceAccess = {
  role: CmsRole;
  can: Record<CmsPermission, boolean>;
};

export type CmsMutationIntent =
  | "save_content"
  | "publish_content"
  | "update_practice"
  | "update_media"
  | "update_team"
  | "update_notice"
  | "reset_demo";

export type CmsMutationRequest = {
  intent: CmsMutationIntent;
  action: string;
  detail: string;
};
