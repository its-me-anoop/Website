import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { packagesFaq } from "@/components/kiln/data";
import { PackagesPage } from "@/components/kiln/packages/PackagesPage";

const description =
  "Website packages for GP practices and care homes. Essentials from £995 plus VAT with year-one hosting. Standard from £1,490 plus £49 a month. Partnership quoted after a short call.";

export const metadata: Metadata = {
  title: "Packages & pricing",
  description,
  alternates: { canonical: "/packages" },
  openGraph: {
    title: `Packages & pricing — ${site.studio}`,
    description,
    url: `${site.url}/packages`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Packages & pricing — ${site.studio}`,
    description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f0ea",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function Packages() {
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(packagesFaq),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Packages", path: "/packages" },
          ]),
        ]}
      />
      <PackagesPage />
    </>
  );
}
