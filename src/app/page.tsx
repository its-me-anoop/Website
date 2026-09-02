import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { KilnHome } from "@/components/kiln/home/KilnHome";

const title = "Websites for GP practices, care homes and clinics";
const description =
  "Flutterly designs and builds accessible, fast websites for GP practices, care homes, dental practices, pharmacies and clinics. Custom-coded in Reading, UK, never a template, and looked after by the person who built them.";

export const metadata: Metadata = {
  title,
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
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Flutterly: websites for GP practices, care homes and clinics",
      },
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
  themeColor: "#f3f0ea",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function Home() {
  return <KilnHome />;
}
