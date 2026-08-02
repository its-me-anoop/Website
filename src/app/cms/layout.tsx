import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "GP Websites CMS — Flutterly",
    template: "%s — Flutterly GP Websites CMS",
  },
  description:
    "A local demonstration of Flutterly Limited's custom GP website management platform.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#183c35",
  width: "device-width",
  initialScale: 1,
};

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
