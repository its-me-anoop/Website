import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, defaultOgImage } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { packagesFaq } from "@/lib/marketing/content";
import { PackagesPage } from "@/components/aurora/pages/PackagesPage";

const description =
  "Website packages from Flutterly. Essentials and Standard are £1,000 to build, then £49 a month, plus VAT, with hosting included. Partnership quoted after a short call.";

export const metadata: Metadata = {
  title: "Website packages and pricing",
  description,
  alternates: { canonical: "/packages" },
  openGraph: {
    title: `Website packages and pricing — ${site.studio}`,
    description,
    url: `${site.url}/packages`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Website packages and pricing — ${site.studio}`,
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
