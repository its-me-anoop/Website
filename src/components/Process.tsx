"use client";

import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business goals, target audience, and project requirements through detailed consultation.",
    icon: MessageSquare,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "Strategy & Design",
    description:
      "Our team crafts a tailored strategy and creates wireframes and designs that align with your brand and user needs.",
    icon: Lightbulb,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    number: "03",
    title: "Development",
    description:
      "We build your solution using cutting-edge technologies, following best practices for performance, security, and scalability.",
    icon: Code2,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "After thorough testing, we deploy your project and provide ongoing support to ensure everything runs smoothly.",
    icon: Rocket,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-500 to-green-500",
  },
];

export default function Process() {
  return (
    <section className="py-28 relative">
      <div
        className="absolute top-0 left-0 right-0 section-divider"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-widest text-blue-400 mb-4"
          >
            Our Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How We Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A proven process that delivers results, from initial concept to
            final deployment and beyond.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 h-full">
                {/* Step number */}
                <span
                  className={`text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b ${step.gradient} opacity-20 absolute top-4 right-6`}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${step.bg}`}
                >
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
