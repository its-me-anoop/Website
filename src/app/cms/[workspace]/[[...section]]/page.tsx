import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsWorkspaceApp } from "@/features/gp-cms/admin/CmsWorkspaceApp";
import {
  cmsSections,
  type CmsSectionName,
} from "@/features/gp-cms/admin/sections";
import { demoWorkspaces, getDemoWorkspace } from "@/data/gp-cms/demo-workspaces";
import { requireWorkspacePermission } from "@/features/gp-cms/auth/guards";

type Params = Promise<{ workspace: string; section?: string[] }>;

export function generateStaticParams() {
  return demoWorkspaces.flatMap((workspace) =>
    cmsSections.map((section) => ({
      workspace: workspace.slug,
      section: section === "overview" ? [] : [section],
    }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { workspace: slug, section } = await params;
  const workspace = getDemoWorkspace(slug);
  if (!workspace) return {};
  const label = section?.[0]
    ? section[0].replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase())
    : "Workspace home";
  return { title: `${label} · ${workspace.shortName}` };
}

export default async function CmsWorkspacePage({ params }: { params: Params }) {
  const { workspace: slug, section } = await params;
  const workspace = getDemoWorkspace(slug);
  const requested = section?.[0] ?? "overview";
  if (!workspace || !cmsSections.includes(requested as CmsSectionName)) notFound();
  const { session, access } = await requireWorkspacePermission({
    workspaceId: workspace.id,
    workspaceSlug: workspace.slug,
    permission: "view_workspace",
    next: `/cms/${workspace.slug}${requested === "overview" ? "" : `/${requested}`}`,
  });

  return (
    <CmsWorkspaceApp
      seed={workspace}
      section={requested as CmsSectionName}
      actor={session.actor}
      access={access}
    />
  );
}
