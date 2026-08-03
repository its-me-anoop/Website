import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { socialMediaService } from "@/components/bloom/data";
import { ServiceDetailPage } from "@/components/bloom/services/ServiceDetailPage";

export const metadata: Metadata = {
  title: socialMediaService.metaTitle,
  description: socialMediaService.metaDescription,
  alternates: { canonical: "/social-media-marketing" },
  openGraph: {
    title: `${socialMediaService.metaTitle}: ${site.studio}`,
    description: socialMediaService.metaDescription,
    url: `${site.url}/social-media-marketing`,
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

export default function SocialMediaMarketing() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Social media marketing and campaign support",
            description: socialMediaService.metaDescription,
            path: "/social-media-marketing",
            serviceType: "Social media campaign and content support",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Social media marketing", path: "/social-media-marketing" },
          ]),
        ]}
      />
      <ServiceDetailPage service={socialMediaService} />
    </>
  );
}
