import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

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
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      <Header />
      <Hero />
      <Services />
      <Process />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
