import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { PackagesPage } from "@/components/bloom/packages/PackagesPage";

const description =
  "Website packages for GP practices, care homes and growing organisations — custom design and build, managed care plans and ongoing partnership, with fixed written quotes.";

export const metadata: Metadata = {
  title: "Packages",
  description,
  alternates: { canonical: "/packages" },
  openGraph: {
    title: `Packages — ${site.studio}`,
    description,
    url: `${site.url}/packages`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafcfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function Packages() {
  return <PackagesPage />;
}
