import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDemoWorkspace } from "@/data/gp-cms/demo-workspaces";
import { requireWorkspacePermission } from "@/features/gp-cms/auth/guards";
import { PracticeSite } from "@/features/gp-cms/public-site/PracticeSite";

type Params = Promise<{ workspace: string; page: string }>;

export const metadata: Metadata = {
  title: "CMS preview",
  robots: { index: false, follow: false },
};

export default async function CmsPreviewPage({ params }: { params: Params }) {
  const { workspace: slug, page: pageSlug } = await params;
  const workspace = getDemoWorkspace(slug);
  if (!workspace || !workspace.pages.some((page) => page.slug === pageSlug)) notFound();
  await requireWorkspacePermission({
    workspaceId: workspace.id,
    workspaceSlug: workspace.slug,
    permission: "preview_draft",
    next: `/cms/${workspace.slug}/preview/${pageSlug}`,
  });
  return <PracticeSite seed={workspace} pageSlug={pageSlug} isCmsPreview />;
}
