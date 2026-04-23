"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const prompts = [
  "A new app needs its first version.",
  "A current product needs to feel more polished.",
  "An internal tool needs to become easier to use.",
];

export function Contact() {
  return (
    <section
      id="brief"
      aria-labelledby="brief-heading"
      className="apple-dark-glow px-5 py-20 text-center text-white sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-5xl"
        >
          <p className="text-xl font-semibold text-white/60">Start</p>
          <h2
            id="brief-heading"
            className="mt-3 text-5xl font-semibold leading-none sm:text-7xl md:text-8xl"
          >
            Make it feel effortless.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white/66 md:text-2xl md:leading-9">
            Send the idea, the problem, or the product you want to improve. The
            first reply will make the next step clear.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="mailto:anoop@flutterly.co.uk?subject=Brief%20for%20Flutterly"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-base font-medium text-black transition duration-200 hover:bg-white/88"
            >
              <Mail size={18} aria-hidden />
              Email the brief
            </Link>
            <Link
              href="tel:+447780580534"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white/12 px-6 text-base font-medium text-white transition duration-200 hover:bg-white/18"
            >
              <Phone size={18} aria-hidden />
              Call Anoop
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-[8px] bg-white/14 text-left sm:grid-cols-3"
        >
          {prompts.map((prompt) => (
            <div key={prompt} className="bg-white/8 p-6 backdrop-blur">
              <p className="text-lg font-semibold leading-7">{prompt}</p>
              <Link
                href="mailto:anoop@flutterly.co.uk?subject=Brief%20for%20Flutterly"
                className="group mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#66b8ff]"
              >
                Start here
                <ArrowRight
                  size={16}
                  className="transition duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          ))}
        </motion.div>

        <p className="mt-10 text-sm text-white/48">
          Reading, Berkshire, UK. Usual reply within one working day.
        </p>
      </div>
    </section>
  );
}
