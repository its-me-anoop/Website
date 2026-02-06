"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understanding your goals, audience, and requirements through detailed consultation.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Crafting strategy, wireframes, and designs that align with your brand identity.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Building with cutting-edge technologies, following best practices for performance and security.",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "Thorough testing, seamless deployment, and ongoing support to keep things running.",
  },
];

export default function Process() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[980px] mx-auto px-6 lg:px-0">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100 mb-5">
            How we work.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-[600px] mx-auto">
            A proven process from first conversation to final launch.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative py-10 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              {/* Vertical separator on mobile, horizontal on desktop */}
              {index > 0 && (
                <>
                  <div
                    className="md:hidden w-16 h-px bg-[#333336] mx-auto mb-0 absolute top-0 left-1/2 -translate-x-1/2"
                    aria-hidden="true"
                  />
                  <div
                    className="hidden md:block absolute top-0 left-0 w-px h-full bg-[#333336]"
                    aria-hidden="true"
                  />
                </>
              )}

              <div className="text-center md:text-left">
                <span className="text-sm font-medium text-gray-600 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-2xl font-bold text-gray-100 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
