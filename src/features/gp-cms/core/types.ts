export const GP_CMS_SCHEMA_VERSION = 1 as const;
export const GP_CMS_CORE_VERSION = "0.1.0" as const;

export type PublishStatus = "draft" | "published";
export type NoticeTone = "information" | "important" | "urgent";
export type WorkspaceRole = "owner" | "publisher" | "editor" | "viewer";

export type ContentSection = {
  id: string;
  heading: string;
  body: string;
};

export type PracticePage = {
  id: string;
  slug: string;
  title: string;
  navigationLabel: string;
  summary: string;
  status: PublishStatus;
  lastUpdated: string;
  sections: ContentSection[];
};

export type PracticeService = {
  id: string;
  title: string;
  summary: string;
  details: string;
  status: PublishStatus;
  action?: { label: string; href: string };
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  group: string;
  biography?: string;
  status: PublishStatus;
};

export type PracticeNotice = {
  id: string;
  title: string;
  message: string;
  tone: NoticeTone;
  status: PublishStatus;
  startsOn: string;
  endsOn?: string;
};

export type MediaItem = {
  id: string;
  name: string;
  src: string;
  alt: string;
  kind: "image" | "document";
  addedOn: string;
};

export type OpeningTime = {
  day: string;
  hours: string;
  note?: string;
};

export type WorkspaceMember = {
  id: string;
  name: string;
  email: string;
  role: WorkspaceRole;
  status: "active" | "invited";
};

export type AuditEvent = {
  id: string;
  occurredAt: string;
  actor: string;
  action: string;
  detail: string;
};

export type PracticeWorkspace = {
  schemaVersion: typeof GP_CMS_SCHEMA_VERSION;
  coreVersion: string;
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  updatedAt: string;
  presentation: "community" | "digital" | "neighbourhood";
  portfolio: {
    label: string;
    description: string;
    emphasis: string;
    image: string;
    imageAlt: string;
  };
  capabilities: {
    announcements: boolean;
    teamProfiles: boolean;
    serviceDirectory: boolean;
    mediaLibrary: boolean;
  };
  brand: {
    primary: string;
    primaryDark: string;
    accent: string;
    surface: string;
    logoText: string;
    heroImage: string;
    heroImageAlt: string;
  };
  homepage: {
    eyebrow: string;
    heading: string;
    introduction: string;
    primaryAction: { label: string; href: string };
    secondaryAction: { label: string; href: string };
  };
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    address: string;
    postcode: string;
    directions: string;
    accessibility: string;
  };
  openingTimes: OpeningTime[];
  pages: PracticePage[];
  services: PracticeService[];
  team: TeamMember[];
  notices: PracticeNotice[];
  media: MediaItem[];
  members: WorkspaceMember[];
  audit: AuditEvent[];
};

export type WorkspaceSummary = Pick<
  PracticeWorkspace,
  "id" | "slug" | "name" | "shortName" | "tagline" | "updatedAt" | "brand"
> & {
  draftCount: number;
  publishedCount: number;
};

export type WorkspaceSaveReason = {
  intent:
    | "save_content"
    | "publish_content"
    | "update_practice"
    | "update_media"
    | "update_team"
    | "update_notice"
    | "reset_demo";
  action: string;
  detail: string;
};

/**
 * Persistence boundary for the shared CMS core. Production adapters must scope
 * every operation to the authenticated workspace and enforce membership on the
 * server. The MVP supplies a browser-local demo adapter only.
 */
export interface WorkspaceRepository {
  load(seed: PracticeWorkspace): PracticeWorkspace;
  save(workspace: PracticeWorkspace): void;
  reset(workspaceId: string): void;
}

export function summariseWorkspace(workspace: PracticeWorkspace): WorkspaceSummary {
  const statuses = [
    ...workspace.pages.map((item) => item.status),
    ...workspace.services.map((item) => item.status),
    ...workspace.team.map((item) => item.status),
    ...workspace.notices.map((item) => item.status),
  ];

  return {
    id: workspace.id,
    slug: workspace.slug,
    name: workspace.name,
    shortName: workspace.shortName,
    tagline: workspace.tagline,
    updatedAt: workspace.updatedAt,
    brand: workspace.brand,
    draftCount: statuses.filter((status) => status === "draft").length,
    publishedCount: statuses.filter((status) => status === "published").length,
  };
}
