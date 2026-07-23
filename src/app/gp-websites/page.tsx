import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { gpSector } from "@/components/bloom/data";
import { SectorPage } from "@/components/bloom/sectors/SectorPage";

export const metadata: Metadata = {
  title: gpSector.metaTitle,
  description: gpSector.metaDescription,
  alternates: { canonical: "/gp-websites" },
  openGraph: {
    title: `${gpSector.metaTitle} — ${site.studio}`,
    description: gpSector.metaDescription,
    url: `${site.url}/gp-websites`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafcfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function GpWebsitesPage() {
  return <SectorPage sector={gpSector} />;
}
