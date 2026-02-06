import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />
      <Hero />
      <Services />
      <Process />
      <About />
      <Contact />
    </main>
  );
}
