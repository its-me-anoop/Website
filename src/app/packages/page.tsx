import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PackagesScreen } from "@/components/bloom/redesign/PackagesScreen";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const description =
  "Clear website delivery packages for GP practices, care homes and other organisations, with tailored scope and a fixed written quote.";

export const metadata: Metadata = {
  title: "Website packages and tailored quotes",
  description,
  alternates: { canonical: "/packages" },
  openGraph: {
    title: `Website packages and tailored quotes: ${site.studio}`,
    description,
    url: `${site.url}/packages`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Website packages and tailored quotes: ${site.studio}`,
    description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#FDF8F1",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Website delivery packages",
            description,
            path: "/packages",
            serviceType: "Website design, development and ongoing support",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Packages", path: "/packages" },
          ]),
        ]}
      />
      <PackagesScreen />
    </>
  );
}
