"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Contact() {
  return (
    <section
      id="contact"
      className="overflow-hidden border-t border-border bg-background px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-32"
    >
      <div className="max-w-[1200px] mx-auto text-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
        >
             <h2 className="mb-8 sm:mb-10 text-[15vw] sm:text-[12vw] md:text-[10vw] font-display font-bold text-foreground leading-[0.84] sm:leading-[0.8] tracking-tighter">
                LET&apos;S TALK
            </h2>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="flex flex-col items-stretch justify-center gap-4 sm:gap-6 md:flex-row md:items-center"
        >
            <Link
                href="mailto:anoop@flutterly.co.uk"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 rounded-full bg-foreground px-7 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold uppercase tracking-[0.18em] sm:tracking-wide text-background overflow-hidden"
            >
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">Email Us</span>
                 <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                 <ArrowRight className="relative z-10 group-hover:text-foreground transition-colors duration-300 group-hover:translate-x-1 transition-transform" />
            </Link>

             <Link
                href="tel:+447780580534"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 rounded-full border border-border px-7 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold uppercase tracking-[0.18em] sm:tracking-wide text-foreground overflow-hidden hover:border-accent"
            >
                 <span className="relative z-10 group-hover:text-background transition-colors duration-300">Call Us</span>
                 <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                 <Phone size={20} className="relative z-10 group-hover:text-background transition-colors duration-300" />
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
