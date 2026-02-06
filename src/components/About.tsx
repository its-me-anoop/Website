"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "100%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
  { value: "5+", label: "Years" },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="bg-surface">
        <div className="max-w-[980px] mx-auto px-6 lg:px-0 py-20 md:py-28">
          {/* Stats - minimal Apple style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 mb-24"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center ${
                  index > 0 ? "md:border-l md:border-[#333336]" : ""
                }`}
              >
                <p className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Why Flutterly */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100 mb-6">
              Why Flutterly.
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-[680px] mx-auto leading-relaxed mb-8">
              We don&apos;t just write code. We build digital assets that drive
              growth. Our team works closely with you to understand your
              challenges and deliver solutions that scale — with expertise in
              Next.js, Flutter, and enterprise platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-gray-400">
              {[
                "Latest technologies",
                "Enterprise-grade security",
                "Dedicated support",
                "User-centric design",
              ].map((item) => (
                <span key={item} className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Founder - clean Apple profile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              {/* Photo */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0">
                <div className="absolute inset-0 rounded-full bg-surface-elevated" />
                <Image
                  src="/anoop-jose.png"
                  alt="Anoop Jose - Lead Developer and Founder of Flutterly Ltd"
                  fill
                  className="object-contain relative z-10 rounded-full"
                />
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight mb-1">
                  Anoop Jose
                </h3>
                <p className="text-apple-blue font-medium mb-6">
                  Lead Developer &amp; Founder
                </p>
                <blockquote className="text-gray-400 text-lg leading-relaxed italic mb-6">
                  &ldquo;I believe in crafting digital experiences that are not
                  just functional, but truly memorable.&rdquo;
                </blockquote>

                <div className="flex items-center gap-6 justify-center md:justify-start">
                  <a
                    href="https://www.linkedin.com/in/anoop-jose-0b308a296/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-apple-blue hover:underline inline-flex items-center gap-0.5"
                  >
                    LinkedIn
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-apple-blue hover:underline inline-flex items-center gap-0.5"
                  >
                    GitHub
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
