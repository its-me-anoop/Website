"use client";

import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Code2, Rocket } from "lucide-react";

const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: appleEase,
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: appleEase } },
};

export default function Process() {
  return (
    <section id="process" className="bg-white py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mx-auto max-w-[1020px] px-6"
      >
        <motion.div variants={cardVariants} className="mb-14 text-center md:mb-20">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
            Process
          </h2>
          <p className="mx-auto max-w-[760px] text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] md:text-4xl lg:text-[2.8rem]">
            From idea to launch.
          </p>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-[#86868b] md:text-lg">
            A clear, collaborative workflow built to reduce risk and deliver quality without unnecessary complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-[24px] border border-black/10 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.09)] md:p-8"
            >
              <span className="absolute right-6 top-6 text-5xl font-semibold tracking-tight text-[#0071e3]/[0.14]" aria-hidden="true">
                {step.number}
              </span>

              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0071e3]/10">
                <step.icon className="h-5 w-5 text-[#0071e3]" />
              </div>

              <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#1d1d1f]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#86868b]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
