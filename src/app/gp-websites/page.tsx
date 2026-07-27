import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
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
  twitter: {
    card: "summary_large_image",
    title: `${gpSector.metaTitle} — ${site.studio}`,
    description: gpSector.metaDescription,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafcfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function GpWebsitesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "GP Practice Website Design",
            description: gpSector.metaDescription,
            path: "/gp-websites",
            serviceType: "Website design and development",
          }),
          faqJsonLd(gpSector.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "GP practice websites", path: "/gp-websites" },
          ]),
        ]}
      />
      <SectorPage sector={gpSector} />
    </>
  );
}
