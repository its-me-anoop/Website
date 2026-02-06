"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Building2 } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, accessible, and beautifully crafted websites and web applications that turn visitors into customers.",
    icon: Globe,
    tech: ["React", "Next.js", "WordPress", "TypeScript"],
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform apps for iOS and Android. Stunning performance, seamless user experience.",
    icon: Smartphone,
    tech: ["Flutter", "SwiftUI", "React Native", "Kotlin"],
  },
  {
    title: "Enterprise Solutions",
    description:
      "Robust business infrastructure setup and management. Scale confidently with enterprise-grade tools.",
    icon: Building2,
    tech: ["Zoho", "Google Workspace", "Azure", "AWS"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0071e3] mb-3">
            Services
          </h2>
          <p className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Expertise that delivers results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group p-8 md:p-10 rounded-3xl bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                <service.icon className="w-6 h-6 text-[#1d1d1f]" />
              </div>

              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-[#86868b] leading-relaxed mb-6 text-[15px]">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white text-[#6e6e73]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
