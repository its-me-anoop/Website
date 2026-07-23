import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { careSector } from "@/components/bloom/data";
import { SectorPage } from "@/components/bloom/sectors/SectorPage";

export const metadata: Metadata = {
  title: careSector.metaTitle,
  description: careSector.metaDescription,
  alternates: { canonical: "/care-home-websites" },
  openGraph: {
    title: `${careSector.metaTitle} — ${site.studio}`,
    description: careSector.metaDescription,
    url: `${site.url}/care-home-websites`,
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

export default function CareHomeWebsitesPage() {
  return <SectorPage sector={careSector} />;
}
