import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Practice } from "@/components/sections/Practice";
import { OpenSource } from "@/components/sections/OpenSource";
import { Contact } from "@/components/sections/Contact";
import About from "@/components/About";
import { SpaceMeshBackground } from "@/components/visual/SpaceMeshBackground";

export const metadata: Metadata = {
  title: "A small studio building products people keep open.",
  description:
    "Flutterly Ltd is a UK design-and-engineering practice led by Anoop Jose. We ship web and mobile products that feel considered, fast, and alive — then keep shipping long after launch.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-[var(--ink)] isolate">
      <SpaceMeshBackground />
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Practice />
      <OpenSource />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
