import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { AuroraBackdrop } from "@/components/home/AuroraBackdrop";
import { IntroWipe } from "@/components/home/IntroWipe";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { GlassNav } from "@/components/home/GlassNav";
import { Hero } from "@/components/home/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { WorkStack } from "@/components/home/WorkStack";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { StackMarquees } from "@/components/home/StackMarquees";
import { OpenSource } from "@/components/home/OpenSource";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { HomeFooter } from "@/components/home/HomeFooter";

export const metadata: Metadata = {
  title: "Design-grade engineering",
  description:
    "Flutterly is a one-person product studio in Reading, UK. Web in Next.js and React, native iOS in SwiftUI, cross-platform in Flutter — designed, built, and shipped by Anoop Jose.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Flutterly — Design-grade engineering",
    description:
      "A one-person product studio in Reading, UK — web, native iOS, and cross-platform apps, designed, built, and shipped by Anoop Jose.",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Flutterly — Design-grade engineering. Product studio, Reading, UK.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutterly — Design-grade engineering",
    description:
      "A one-person product studio in Reading, UK — web, native iOS, and cross-platform apps by Anoop Jose.",
    images: [site.ogImage],
  },
};

/* The aurora homepage is a dark route on an otherwise light site. */
export const viewport: Viewport = {
  themeColor: "#05060A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function Home() {
  return (
    <div className="aurora-root relative min-h-screen bg-obsidian font-grotesk text-frost">
      <AuroraBackdrop />
      <IntroWipe />
      <ScrollProgress />
      <GlassNav />
      <main id="main" role="main" className="relative">
        <Hero />
        <MarqueeBand />
        <WorkStack />
        <Services />
        <Process />
        <StackMarquees />
        <OpenSource />
        <About />
        <Contact />
      </main>
      <HomeFooter />
    </div>
  );
}
