import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Contact } from "@/components/sections/Contact";
import About from "@/components/About";

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
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Services />
      <About />
      <ClientLogos />
      <Contact />
      <Footer />
    </main>
  );
}
