import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { EditorialHome } from "@/components/home/EditorialHome";
import { EditorialResponsiveFixes } from "@/components/home/EditorialResponsiveFixes";
import { EditorialMotion } from "@/components/home/EditorialMotion";

export const metadata: Metadata = {
  title: "Independent product studio",
  description:
    "Flutterly is an independent product studio in Reading, UK, designing and building focused web and mobile products with Next.js, SwiftUI and Flutter.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Flutterly — Independent product studio",
    description:
      "Senior product thinking, interface design and engineering without agency hand-offs.",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Flutterly — independent product studio in Reading, UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutterly — Independent product studio",
    description:
      "Product direction, interface design and engineering by Anoop Jose.",
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function Home() {
  return (
    <>
      <EditorialResponsiveFixes />
      <EditorialMotion />
      <EditorialHome />
    </>
  );
}
