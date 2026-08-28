import type { Metadata, Viewport } from "next";
import { ContactScreen } from "@/components/bloom/redesign/ContactScreen";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const description =
  "Contact Flutterly Limited in Reading, UK. Email Anoop Jose or book a 15, 30 or 60 minute call about your website or digital delivery project.";

export const metadata: Metadata = {
  title: "Contact Flutterly Limited",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${site.legalName}`,
    description,
    url: `${site.url}/contact`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${site.legalName}`,
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

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${site.legalName}`,
            description,
            url: `${site.url}/contact`,
            mainEntity: { "@id": `${site.url}#organization` },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <ContactScreen />
    </>
  );
}
