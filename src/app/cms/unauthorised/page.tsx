import type { Metadata } from "next";
import { CmsUnauthorised } from "@/features/gp-cms/admin/CmsUnauthorised";

export const metadata: Metadata = { title: "Access unavailable", robots: { index: false, follow: false } };

export default async function CmsUnauthorisedPage({ searchParams }: { searchParams: Promise<{ workspace?: string }> }) {
  const { workspace } = await searchParams;
  return <CmsUnauthorised workspace={workspace} />;
}
