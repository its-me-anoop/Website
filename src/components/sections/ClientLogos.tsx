"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const clients = [
  { name: "Sipli", image: "/projects/sipli/app-icon.png" },
  { name: "Greenmead", image: "/project-greenmead.png" },
  { name: "JJ Paper", image: "/project-jjpaper.png" },
  { name: "Sandbourne", image: "/project-sandbourne.png" },
];

export function ClientLogos() {
  return (
    <section className="py-16 md:py-20 px-6 bg-background">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-12"
        >
          Trusted By
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {clients.map((client) => (
            <div key={client.name} className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-background-secondary flex-shrink-0">
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="font-display text-lg font-medium text-foreground-secondary">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
