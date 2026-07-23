import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
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
  twitter: {
    card: "summary_large_image",
    title: `${careSector.metaTitle} — ${site.studio}`,
    description: careSector.metaDescription,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafcfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function CareHomeWebsitesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Care Home Website Design",
            description: careSector.metaDescription,
            path: "/care-home-websites",
            serviceType: "Website design and development",
          }),
          faqJsonLd(careSector.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Care home websites", path: "/care-home-websites" },
          ]),
        ]}
      />
      <SectorPage sector={careSector} />
    </>
  );
}
