"use client";

import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Home,
  Heart,
  Leaf,
  Stethoscope,
  Shield,
  Activity,
} from "lucide-react";

const projects = [
  {
    title: "Greenmead Housing",
    description:
      "A specialised housing solution platform for a Community Interest Company. We built a fully accessible, responsive website that effectively communicates their mission of providing safe, empowering homes for individuals with learning disabilities.",
    icon: Home,
    tags: ["Web Development", "Accessibility", "CIC"],
    link: "https://www.greenmead.co.uk",
    gradient: "from-green-500 to-emerald-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    borderColor: "border-green-500/20",
  },
  {
    title: "Sandbourne Care",
    description:
      "A comprehensive digital presence for a residential and supported living service provider. The platform showcases their specialised care services for mental health and autism, featuring an accessible design and clear service pathways.",
    icon: Heart,
    tags: ["Web Design", "Healthcare", "Accessibility"],
    link: "https://sandbournecare.co.uk",
    gradient: "from-teal-500 to-cyan-500",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
    borderColor: "border-teal-500/20",
  },
  {
    title: "JJ Paper Essentials",
    description:
      "An eco-friendly e-commerce platform for sustainable paper products made from sugarcane waste. The site features a clean, nature-inspired design that highlights the environmental benefits and premium quality of the products.",
    icon: Leaf,
    tags: ["E-commerce", "Sustainability", "Product Design"],
    link: "https://www.jjpaperessential.com",
    gradient: "from-lime-500 to-green-500",
    iconBg: "bg-lime-500/10",
    iconColor: "text-lime-400",
    borderColor: "border-lime-500/20",
  },
  {
    title: "Nursely",
    description:
      "A comprehensive mobile application for nursing staff management and scheduling. Available on iOS and Android, it streamlines shift booking, compliance tracking, and communication for healthcare professionals.",
    icon: Stethoscope,
    tags: ["Mobile App", "iOS & Android", "Healthcare"],
    link: "https://nursely.app",
    gradient: "from-blue-500 to-indigo-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    title: "Montis Care",
    description:
      "A professional digital platform for a care service provider specialising in support for learning disabilities and mental health. The site provides clear information on services, compliance, and care philosophy.",
    icon: Shield,
    tags: ["Web Design", "Care Services", "Compliance"],
    link: "https://www.montiscare.co.uk",
    gradient: "from-rose-500 to-pink-500",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    borderColor: "border-rose-500/20",
  },
  {
    title: "Uniq Healthcare",
    description:
      "A digital presence for a home healthcare provider focused on compassion and dignity. The site highlights their expertise in caring for adults and individuals with learning disabilities, showcasing their CQC 'Good' rating.",
    icon: Activity,
    tags: ["Web Design", "Home Care", "CQC Registered"],
    link: "https://uniqhealthcare.co.uk",
    gradient: "from-purple-500 to-violet-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
  },
];

export default function ProjectsContent() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />

      <section className="pt-36 pb-28 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium uppercase tracking-widest text-blue-400 mb-4"
            >
              Our Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Our Work
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              A showcase of digital experiences we&apos;ve crafted for our
              clients across healthcare, e-commerce, and enterprise sectors.
            </motion.p>
          </div>

          <div className="space-y-24 lg:space-y-32">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="group relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                {/* Icon Side */}
                <div
                  className={`relative rounded-2xl overflow-hidden border ${project.borderColor} ${project.iconBg} aspect-[16/10] flex items-center justify-center ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 blur-3xl`}
                    aria-hidden="true"
                  />
                  <div
                    className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}
                  >
                    <project.icon className="w-14 h-14 md:w-16 md:h-16 text-white" />
                  </div>
                </div>

                {/* Content Side */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/[0.08] text-sm font-medium text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group/btn"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
