import type { Metadata } from "next";
import { demoWorkspaces } from "@/data/gp-cms/demo-workspaces";
import { getCmsAuthConfig } from "@/features/gp-cms/auth/config";
import { productionAuthAdapter } from "@/features/gp-cms/auth/production-adapter";
import { CmsSignIn } from "@/features/gp-cms/admin/CmsSignIn";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default async function CmsSignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next: requestedNext } = await searchParams;
  const next = requestedNext?.startsWith("/cms") ? requestedNext : "/cms";
  const config = getCmsAuthConfig();
  return <CmsSignIn mode={config.mode} issue={config.issue} next={next} workspaces={demoWorkspaces.map(({ slug, name }) => ({ slug, name }))} providerReady={Boolean(productionAuthAdapter)} />;
}
