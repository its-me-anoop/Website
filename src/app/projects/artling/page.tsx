import type { Metadata } from "next";
import { ArtlingLanding } from "@/components/projects/artling/ArtlingLanding";
import { site } from "@/lib/site";

const title = "Little Artist";
const description =
  "Little Artist is an iPhone and iPad app for archiving children's artwork privately: scan or snap a piece, add on-device AI titles and voice memos, relive On This Day moments and milestones, and export PDF keepsake portfolios. Free to start.";

const appStoreUrl =
  "https://apps.apple.com/gb/app/little-artist/id6759450819";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects/artling",
  },
  openGraph: {
    title: `${title} — ${site.studio}`,
    description,
    url: "/projects/artling",
    type: "website",
    images: [
      {
        url: "/projects/artling/fox-painter.png",
        width: 806,
        height: 1129,
        alt: "Little Artist fox mascot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.studio}`,
    description,
    images: ["/projects/artling/fox-painter.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Little Artist",
  alternateName: "Artling",
  operatingSystem: "iOS 26.0 or later, iPadOS 26.0 or later",
  applicationCategory: "LifestyleApplication",
  softwareVersion: "1.0",
  description,
  url: `${site.url}/projects/artling`,
  downloadUrl: appStoreUrl,
  image: `${site.url}/projects/artling/fox-painter.png`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
  },
};

export default function ArtlingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtlingLanding />
    </>
  );
}
