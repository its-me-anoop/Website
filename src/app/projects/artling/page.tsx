import type { Metadata } from "next";
import { ArtlingLanding } from "@/components/projects/artling/ArtlingLanding";
import { site } from "@/lib/site";

const title = "Artling";
const description =
  "Artling is an iOS app for archiving children's artwork with family sharing, timelines, milestones, PDF exports, and AI-assisted captions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects/artling",
  },
  openGraph: {
    title: `${title} | Flutterly Ltd`,
    description,
    url: "/projects/artling",
    images: [
      {
        url: "/projects/artling/fox-painter.png",
        width: 806,
        height: 1129,
        alt: "Artling fox mascot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Flutterly Ltd`,
    description,
    images: ["/projects/artling/fox-painter.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Artling",
  operatingSystem: "iOS, iPadOS",
  applicationCategory: "LifestyleApplication",
  description,
  url: `${site.url}/projects/artling`,
  image: `${site.url}/projects/artling/fox-painter.png`,
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
