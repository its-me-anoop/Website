"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
  { value: "5+", label: "Years Experience" },
];

const strengths = [
  "Expertise in modern frameworks like Next.js and Flutter",
  "Enterprise-grade security and scalability",
  "Dedicated support and ongoing maintenance",
  "User-centric design that drives results",
];

const sectionVariants = {
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

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } },
};

export default function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        className="mx-auto max-w-[1020px] px-6"
      >
        <motion.div variants={itemVariants} className="mb-14 text-center md:mb-20">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
            Why Flutterly
          </h2>
          <p className="mx-auto max-w-[760px] text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] md:text-4xl lg:text-[2.8rem]">
            We build digital products that create measurable business value.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16 grid grid-cols-2 gap-4 md:mb-24 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-black/10 bg-white p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] md:p-6"
            >
              <h3 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
                {stat.value}
              </h3>
              <p className="mt-1 text-xs text-[#86868b] md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-20 flex flex-col items-start gap-12 lg:mb-28 lg:flex-row lg:gap-16">
          <motion.div variants={itemVariants} className="flex-1">
            <p className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-[#1d1d1f] md:text-4xl">
              Strategic thinking, meticulous execution, and long-term support.
            </p>
            <p className="mb-8 text-base leading-relaxed text-[#86868b] md:text-lg">
              Our team works closely with you to understand your unique challenges
              and deliver solutions that scale with your business.
            </p>
            <ul className="space-y-3.5">
              {strengths.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: appleEase }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0071e3]/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
                  </div>
                  <span className="text-[15px] text-[#1d1d1f] md:text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full flex-1 rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_34px_rgba(0,0,0,0.05)] md:p-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#0071e3]">
              What You Can Expect
            </p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border border-black/10 p-5 text-center ${
                    index % 2 === 0 ? "bg-white" : "bg-[#0071e3]/[0.03]"
                  }`}
                >
                  <h4 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">
                    {stat.value}
                  </h4>
                  <p className="mt-1 text-xs text-[#86868b]">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="rounded-[34px] border border-black/10 bg-white p-7 shadow-[0_18px_50px_rgba(0,0,0,0.06)] md:p-12"
        >
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
            <div className="relative order-1 h-[300px] w-[240px] shrink-0 overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_14px_36px_rgba(0,0,0,0.08)] md:order-2 md:h-[380px] md:w-[300px]">
              <Image
                src="/anoop-jose.jpg"
                alt="Anoop Jose - Lead Developer and Founder of Flutterly Ltd"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 240px, 300px"
              />
            </div>

            <div className="order-2 flex-1 text-center md:order-1 md:text-left">
              <h3 className="mb-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
                Anoop Jose
              </h3>
              <p className="mb-6 text-lg font-medium text-[#0071e3]">
                Lead Developer &amp; Founder
              </p>

              <blockquote className="mb-8 text-lg leading-relaxed text-[#86868b] md:text-xl">
                &ldquo;I believe in crafting digital experiences that are not just
                functional, but truly memorable. Every line of code is written with
                performance, scalability, and the user in mind.&rdquo;
              </blockquote>

              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-colors duration-200 hover:border-[#0071e3]/30 hover:text-[#0071e3]"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/anoop-jose-0b308a296/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-colors duration-200 hover:border-[#0071e3]/30 hover:text-[#0071e3]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-colors duration-200 hover:border-[#0071e3]/30 hover:text-[#0071e3]"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
