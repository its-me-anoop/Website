import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { Home as AuroraHome } from "@/components/aurora/home/Home";

export const metadata: Metadata = {
  title: "Websites for GP practices, care homes & ambitious products",
  description:
    "Flutterly designs and builds accessible, fast websites for GP practices, care homes and ambitious products — custom-coded in Reading, UK, never a template.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Flutterly — Websites for GP practices, care homes & ambitious products",
    description:
      "Accessible, fast, custom-coded websites for healthcare organisations and ambitious products — designed, built and supported by one accountable studio.",
    url: site.url,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Flutterly — websites for GP practices, care homes and ambitious products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutterly — Websites for GP practices, care homes & ambitious products",
    description:
      "Accessible, fast, custom-coded websites for healthcare organisations and ambitious products.",
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#060d11",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function Home() {
  return <AuroraHome />;
}
