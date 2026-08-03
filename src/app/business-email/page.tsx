import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessEmailService } from "@/components/bloom/data";
import { ServiceDetailPage } from "@/components/bloom/services/ServiceDetailPage";

export const metadata: Metadata = {
  title: businessEmailService.metaTitle,
  description: businessEmailService.metaDescription,
  alternates: { canonical: "/business-email" },
  openGraph: {
    title: `${businessEmailService.metaTitle}: ${site.studio}`,
    description: businessEmailService.metaDescription,
    url: `${site.url}/business-email`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7faf8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function BusinessEmail() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Business email and collaboration setup",
            description: businessEmailService.metaDescription,
            path: "/business-email",
            serviceType: "Business email and collaboration configuration",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Business email", path: "/business-email" },
          ]),
        ]}
      />
      <ServiceDetailPage service={businessEmailService} />
    </>
  );
}
