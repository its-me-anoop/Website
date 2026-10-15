import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";
import { serviceHref, services } from "@/lib/marketing/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesIndexPage } from "@/components/aurora/pages/ServicesIndexPage";

const title = "Services: websites, apps, IT support, social media and SEO";
const description =
  "Five services from one studio in Reading: custom websites, iPhone and Android apps, IT support, social media and SEO, designed and looked after by Flutterly.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${title} — ${site.studio}`,
    description,
    url: `${site.url}/services`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.studio}`,
    description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0907",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Flutterly services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `${site.url}${serviceHref(s.slug)}`,
            })),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <ServicesIndexPage />
    </>
  );
}
