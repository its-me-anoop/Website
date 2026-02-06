"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Building2 } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const services = [
  {
    title: "Web\nDevelopment",
    description:
      "High-performance websites and web applications built with React, Next.js, and modern frameworks.",
    icon: Globe,
    tech: ["React", "Next.js", "WordPress", "TypeScript"],
  },
  {
    title: "Mobile\nApps",
    description:
      "Native and cross-platform mobile apps for iOS and Android that your users will love.",
    icon: Smartphone,
    tech: ["Flutter", "SwiftUI", "React Native", "Kotlin"],
  },
  {
    title: "Enterprise\nSolutions",
    description:
      "Business suite setup, cloud infrastructure, and ongoing support to help your organisation scale.",
    icon: Building2,
    tech: ["Zoho", "Google Workspace", "Azure", "AWS"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      {/* Full-width dark surface background */}
      <div className="bg-surface">
        <div className="max-w-[980px] mx-auto px-6 lg:px-0 py-20 md:py-28">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100 mb-5">
              What we do best.
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-[600px] mx-auto">
              End-to-end solutions tailored to your business, built with the
              latest technologies.
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-surface-elevated rounded-3xl p-10 flex flex-col transition-transform duration-500 hover:scale-[1.02]"
              >
                <service.icon className="w-10 h-10 text-apple-blue mb-6" />

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-100 mb-4 whitespace-pre-line leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium text-gray-500 bg-[#2c2c2e] rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-0.5 text-apple-blue text-sm hover:underline"
                >
                  Learn more
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
