import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Web & Mobile Development",
  description:
    "Flutterly Ltd delivers modern web and mobile software development services using Next.js, React, Flutter, and scalable architecture.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Services />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}
