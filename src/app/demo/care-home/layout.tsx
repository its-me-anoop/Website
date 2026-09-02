import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { CareShell } from "@/components/demos/care/CareShell";

export const metadata: Metadata = {
  title: {
    default: "Oakfield House — sample care home website",
    template: "%s — Oakfield House (sample)",
  },
  description:
    "A sample care home website by Flutterly, showing families-first design, CQC transparency and WCAG 2.2 AA accessibility. The home shown is fictional.",
  /* Demo pages are linked from the site but kept out of search results
     so a fictional care home never appears in local search. */
  robots: { index: false, follow: true },
  /* Own Open Graph URL and title so a shared demo link does not
     inherit the homepage card from the root layout. */
  openGraph: {
    title: `Oakfield House — sample care home website — ${site.studio}`,
    url: "/demo/care-home",
    type: "website",
    siteName: site.studio,
    locale: site.locale,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Oakfield House — sample care home website — ${site.studio}`,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function CareDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CareShell>{children}</CareShell>;
}
