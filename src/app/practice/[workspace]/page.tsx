import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { demoWorkspaces, getDemoWorkspace } from "@/data/gp-cms/demo-workspaces";
import { PracticeSite } from "@/features/gp-cms/public-site/PracticeSite";

type Params = Promise<{ workspace: string }>;

export function generateStaticParams() {
  return demoWorkspaces.map((workspace) => ({ workspace: workspace.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { workspace: slug } = await params;
  const workspace = getDemoWorkspace(slug);
  if (!workspace) return {};
  return {
    title: `${workspace.name} — fictional GP website demo`,
    description: workspace.tagline,
    robots: { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function PublicPracticePage({ params }: { params: Params }) {
  const { workspace: slug } = await params;
  const workspace = getDemoWorkspace(slug);
  if (!workspace) notFound();
  return (
    <Suspense
      fallback={
        <main id="main" className="min-h-screen bg-[#f7f9f8] px-4 py-16 text-[#263238]">
          <p className="mx-auto max-w-[1180px] text-base">Loading practice website…</p>
        </main>
      }
    >
      <PracticeSite seed={workspace} />
    </Suspense>
  );
}
