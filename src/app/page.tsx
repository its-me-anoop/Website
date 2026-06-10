import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { Practice } from "@/components/sections/Practice";
import { Contact } from "@/components/sections/Contact";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "App & Web Developer",
  description:
    "Anoop Jose is a UK-based developer and designer crafting fast, beautiful web and mobile apps with Next.js, React, SwiftUI and Flutter — founder of Flutterly.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anoop Jose — App & Web Developer",
    description:
      "Developer & designer. Selected work, services, and process — based in Reading, UK.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main id="main" className="relative isolate text-ink" role="main">
        <Hero />
        <Stack />
        <FeaturedWork />
        <Services />
        <Practice />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
