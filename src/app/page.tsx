import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { studioViewport } from "@/lib/studio";
import { HomeScreen } from "@/components/bloom/redesign/HomeScreen";

export const metadata: Metadata = {
  title: "Digital delivery for organisations people rely on",
  description:
    "Flutterly Limited delivers accessible websites, web and mobile projects, business email setup and social media campaigns for GP practices, care homes and other organisations.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Flutterly: Digital delivery for organisations people rely on",
    description:
      "Websites, digital products, business technology and campaign support, delivered with direct accountability from Reading, UK.",
    url: site.url,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Flutterly Limited: digital delivery for organisations people rely on",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutterly: Digital delivery for organisations people rely on",
    description:
      "Websites, digital products, business technology and social campaign support for organisations.",
    images: [site.ogImage],
  },
};

export const viewport: Viewport = studioViewport;

export default function Home() {
  return <HomeScreen />;
}
