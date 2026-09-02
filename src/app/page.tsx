import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { KilnHome } from "@/components/kiln/home/KilnHome";

const title = "Websites for GP practices and care homes";
const description =
  "Flutterly designs and builds accessible, fast websites for GP practices and care homes. Custom-coded in Reading, Berkshire, never a template, and looked after by the person who built them.";

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
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Flutterly: websites for GP practices and care homes",
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
