import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

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
