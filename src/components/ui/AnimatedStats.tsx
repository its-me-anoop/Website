"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function StatCounter({ value, suffix = "", label, duration = 2 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const end = value;
    const stepTime = (duration * 1000) / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, Math.max(stepTime, 16));

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div 
        className="font-sans text-5xl md:text-6xl font-black tracking-tight text-white"
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {count}
        <span className="text-[var(--accent)]">{suffix}</span>
      </motion.div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </div>
    </motion.div>
  );
}

interface AnimatedStatsProps {
  className?: string;
}

export function AnimatedStats({ className = "" }: AnimatedStatsProps) {
  const stats = [
    { value: 50, suffix: "+", label: "Projects shipped" },
    { value: 99, suffix: "%", label: "Client satisfaction" },
    { value: 5, suffix: "yr", label: "Experience" },
    { value: 24, suffix: "h", label: "Response time" },
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <StatCounter
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            duration={1.5}
          />
        </motion.div>
      ))}
    </div>
  );
}
