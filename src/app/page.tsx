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
import { ShaderBackground } from "@/components/visual/ShaderBackground";

export const metadata: Metadata = {
  title: "App & Web Development Studio",
  description:
    "Flutterly is a UK product studio designing and engineering fast, polished web and mobile apps. Next.js, React, SwiftUI and Flutter — built with care, shipped to last.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Flutterly — App & Web Development Studio",
    description:
      "We design and engineer web and mobile apps that feel considered, fast, and alive. Based in Reading, UK.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <ShaderBackground />
      <Navbar />
      <main id="main" className="relative isolate text-ink" role="main">
        <Hero />
        <Services />
        <FeaturedWork />
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
