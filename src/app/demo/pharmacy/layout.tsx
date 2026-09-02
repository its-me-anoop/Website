import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { PharmacyShell } from "@/components/demos/pharmacy/PharmacyShell";

export const metadata: Metadata = {
  title: {
    default: "Willowbrook Pharmacy — sample community pharmacy website",
    template: "%s — Willowbrook Pharmacy (sample)",
  },
  description:
    "A sample independent pharmacy website by Flutterly, showing NHS Pharmacy First, repeat prescriptions and honest NHS-free vs private-paid service badging, built to WCAG 2.2 AA. The pharmacy shown is fictional.",
  /* Demo pages are linked from the site but kept out of search results
     so a fictional pharmacy never appears in local search. */
  robots: { index: false, follow: true },
  /* Own Open Graph URL and title so a shared demo link does not
     inherit the homepage card from the root layout. */
  openGraph: {
    title: `Willowbrook Pharmacy — sample community pharmacy website — ${site.studio}`,
    url: "/demo/pharmacy",
    type: "website",
    siteName: site.studio,
    locale: site.locale,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Willowbrook Pharmacy — sample community pharmacy website — ${site.studio}`,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#046b3b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function PharmacyDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PharmacyShell>{children}</PharmacyShell>;
}
