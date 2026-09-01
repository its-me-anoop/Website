import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { studioViewport } from "@/lib/studio";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesScreen } from "@/components/bloom/redesign/ServicesScreen";

const description =
  "Digital delivery services for GP practices, care homes and other organisations: accessible websites, web and mobile products, business email, social media campaigns and ongoing support.";

export const metadata: Metadata = {
  title: "Digital delivery services",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Digital delivery services: ${site.studio}`,
    description,
    url: `${site.url}/services`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = studioViewport;

export default function Services() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Digital delivery services",
            description,
            path: "/services",
            serviceType: "Digital delivery and business technology services",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <ServicesScreen />
    </>
  );
}
