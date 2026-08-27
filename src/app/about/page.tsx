import type { Metadata, Viewport } from "next";
import { AboutScreen } from "@/components/bloom/redesign/AboutScreen";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const description =
  "Meet Anoop Jose, founder of Flutterly Limited in Reading, UK. The person you brief is the person accountable for planning, building and delivering the work.";

export const metadata: Metadata = {
  title: "About Flutterly Limited",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${site.legalName}`,
    description,
    url: `${site.url}/about`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${site.legalName}`,
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

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: `About ${site.legalName}`,
            description,
            url: `${site.url}/about`,
            mainEntity: { "@id": `${site.url}#organization` },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <AboutScreen />
    </>
  );
}
