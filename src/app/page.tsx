import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Practice } from "@/components/sections/Practice";
import { Stack } from "@/components/sections/Stack";
import { OpenSource } from "@/components/sections/OpenSource";
import { Contact } from "@/components/sections/Contact";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "App & Web Developer",
  description:
    "Anoop Jose is a UK-based developer and designer crafting fast, polished web and mobile apps with Next.js, React, SwiftUI and Flutter — founder of Flutterly.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anoop Jose — App & Web Developer",
    description:
      "I design and build web and mobile apps that feel considered, fast, and alive. Based in Reading, UK.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative isolate text-ink" role="main">
        <Hero />
        <FeaturedWork />
        <Services />
        <Practice />
        <Stack />
        <OpenSource />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
