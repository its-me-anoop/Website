"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    description:
      "High-performance websites and web applications built with modern frameworks. We create fast, accessible, and SEO-friendly digital experiences that convert visitors into customers.",
    icon: Globe,
    tech: ["React", "Next.js", "WordPress", "TypeScript"],
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android. Beautiful, performant apps that your users will love, built with the latest frameworks.",
    icon: Smartphone,
    tech: ["Flutter", "SwiftUI", "React Native", "Kotlin"],
    gradient: "from-cyan-500 to-teal-500",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
  {
    title: "Enterprise Solutions",
    description:
      "Comprehensive setup and maintenance for business suites and infrastructure. We help your organisation scale with robust, secure enterprise-grade tools.",
    icon: Building2,
    tech: ["Zoho", "Google Workspace", "Azure", "AWS"],
    gradient: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 section-divider" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-widest text-blue-400 mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We deliver end-to-end solutions tailored to your business needs,
            using the latest technologies and best practices.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500"
            >
              {/* Top gradient line on hover */}
              <div
                className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                aria-hidden="true"
              />

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 ${service.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <service.icon className={`w-7 h-7 ${service.iconColor}`} />
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {service.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href="/#contact"
                className={`inline-flex items-center gap-1.5 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`}
              >
                Learn more
                <ArrowUpRight className={`w-4 h-4 ${service.iconColor}`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
