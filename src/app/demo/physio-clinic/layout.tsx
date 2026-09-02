import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { PhysioShell } from "@/components/demos/physio/PhysioShell";

export const metadata: Metadata = {
  title: {
    default: "Forbury Physiotherapy — sample physiotherapy clinic website",
    template: "%s — Forbury Physiotherapy (sample)",
  },
  description:
    "A sample private physiotherapy clinic website by Flutterly, showing public pricing, a self-pay vs insured explainer and WCAG 2.2 AA accessibility. The clinic shown is fictional.",
  /* Demo pages are linked from the site but kept out of search results
     so a fictional clinic never appears in local search. */
  robots: { index: false, follow: true },
  /* Own Open Graph URL and title so a shared demo link does not
     inherit the homepage card from the root layout. */
  openGraph: {
    title: `Forbury Physiotherapy — sample physiotherapy clinic website — ${site.studio}`,
    url: "/demo/physio-clinic",
    type: "website",
    siteName: site.studio,
    locale: site.locale,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Forbury Physiotherapy — sample physiotherapy clinic website — ${site.studio}`,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#c2452f",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function PhysioDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PhysioShell>{children}</PhysioShell>;
}
