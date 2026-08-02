import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDemoWorkspace } from "@/data/gp-cms/demo-workspaces";
import { PracticeSite } from "@/features/gp-cms/public-site/PracticeSite";

type Params = Promise<{ workspace: string; page: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { workspace: slug, page: pageSlug } = await params;
  const workspace = getDemoWorkspace(slug);
  const page = workspace?.pages.find((item) => item.slug === pageSlug && item.status === "published");
  if (!workspace || !page) return {};
  return { title: `${page.title} — ${workspace.name} (fictional demo)`, robots: { index: false, follow: false } };
}

export default async function PracticeContentPage({ params }: { params: Params }) {
  const { workspace: slug, page: pageSlug } = await params;
  const workspace = getDemoWorkspace(slug);
  const page = workspace?.pages.find((item) => item.slug === pageSlug && item.status === "published");
  if (!workspace || !page) notFound();
  return <PracticeSite seed={workspace} pageSlug={pageSlug} />;
}
