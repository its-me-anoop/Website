import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { Home as StudioHome } from "@/components/sorted/home/Home";

const title = "Websites, apps, IT support, social media and SEO in Reading";
const description =
  "Your digital side, sorted. Flutterly designs, builds and looks after websites, apps, IT, social media and SEO from Reading, Berkshire, all from the person you brief.";

export const metadata: Metadata = {
  /* The root layout's title template only applies to child segments, so
     the homepage sets its full title itself to keep the brand in it. */
  title: { absolute: `Flutterly — ${title}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `Flutterly — ${title}`,
    description,
    url: site.url,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [
      { url: site.ogImage, width: 1200, height: 630, alt: site.ogImageAlt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Flutterly — ${title}`,
    description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#10162f" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function Home() {
  return <StudioHome />;
}
