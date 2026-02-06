"use client";

import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your goals, audience, and requirements through detailed consultation.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Strategy & Design",
    description:
      "We craft a tailored strategy with wireframes and designs aligned to your brand.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Development",
    description:
      "We build with cutting-edge technology, following best practices for performance and security.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "After thorough testing, we deploy and provide ongoing support to keep things running smoothly.",
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <section id="process" className="section-dark py-24 md:py-32">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0071e3] mb-3">
            Process
          </h2>
          <p className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[#f5f5f7] leading-tight">
            From idea to launch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-3xl overflow-hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#1d1d1f] p-8 md:p-10 relative group"
            >
              <span className="text-5xl font-bold text-white/[0.06] absolute top-6 right-6" aria-hidden="true">
                {step.number}
              </span>

              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-6">
                <step.icon className="w-5 h-5 text-[#0071e3]" />
              </div>

              <h3 className="text-lg font-bold text-[#f5f5f7] mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
