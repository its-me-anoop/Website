"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin, Mail } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const facts = [
  ["Based in", "Reading, UK"],
  ["Founded", "2024"],
  ["Led by", "Anoop Jose"],
  ["Focus", "One active build"],
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-background px-5 py-20 text-foreground sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xl font-semibold text-foreground-secondary">
            Studio
          </p>
          <h2
            id="about-heading"
            className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl md:text-7xl"
          >
            Small by design. Close to every detail.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-foreground-secondary">
            Flutterly is led by Anoop Jose, with a trusted network of
            collaborators added only when the product genuinely benefits from
            more hands.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="overflow-hidden rounded-[8px] bg-background-secondary"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/anoop-jose.jpg"
                alt="Portrait of Anoop Jose, founder of Flutterly"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <figcaption className="p-6">
              <p className="text-lg font-semibold">Anoop Jose</p>
              <p className="mt-1 text-foreground-secondary">
                Founder and lead engineer
              </p>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="rounded-[8px] bg-background-secondary p-7 sm:p-10"
          >
            <p className="text-3xl font-semibold leading-tight sm:text-5xl">
              The best products feel inevitable because someone cared about the
              invisible parts.
            </p>
            <div className="mt-8 grid gap-5 text-lg leading-8 text-foreground-secondary sm:grid-cols-2">
              <p>
                We keep strategy, interaction design, implementation, and launch
                work in the same conversation. That makes the product simpler to
                use and easier to own.
              </p>
              <p>
                We work with founders and teams replacing rough tools, building
                native mobile apps, or turning a sharp product idea into a
                release people can trust.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-border sm:grid-cols-4">
              {facts.map(([label, value]) => (
                <div key={label} className="bg-background p-4">
                  <dt className="text-sm text-foreground-tertiary">{label}</dt>
                  <dd className="mt-2 text-lg font-semibold">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="https://www.linkedin.com/in/anoop-jose-0b308a296/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition duration-200 hover:bg-black"
              >
                <Linkedin size={16} aria-hidden />
                LinkedIn
              </Link>
              <Link
                href="mailto:anoop@flutterly.co.uk"
                className="group inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-medium text-accent transition duration-200 hover:text-accent-hover"
              >
                Email Anoop
                <ArrowRight
                  size={16}
                  className="transition duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
                <Mail className="sr-only" size={1} aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
