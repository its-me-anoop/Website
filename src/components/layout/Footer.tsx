"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Technical Footer with Apple Pro conventions and subtle animations.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const links = [
    { href: "#work", label: "Work" },
    { href: "#practice", label: "Practice" },
    { href: "#oss", label: "Open Source" },
    { href: "#studio", label: "Studio" },
  ];

  return (
    <footer 
      ref={ref}
      className="bg-black text-zinc-500 font-sans text-[11px] overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-7">
        {/* Sleek top rule */}
        <motion.div 
          className="border-t border-white/[0.04] pt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-semibold text-zinc-400 font-sans tracking-tight text-[12px]">
              Flutterly Ltd
            </span>
            <span className="text-zinc-600 font-mono uppercase tracking-[0.16em] text-[9px]">
              © 2026 · All Rights Reserved
            </span>
          </motion.div>

          {/* Secondary specs navigation */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono uppercase tracking-[0.2em] text-[9.5px]">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="transition-all duration-300 hover:text-[var(--accent)] hover:translate-y-[-1px]"
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={linkVariants}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.div 
            className="text-zinc-600 font-mono uppercase tracking-[0.2em] text-[9.5px] md:text-right"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Signed, the studio —{" "}
            <span className="text-zinc-400 font-sans tracking-tight font-semibold normal-case transition-colors duration-300 hover:text-white cursor-default">
              Anoop Jose
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
