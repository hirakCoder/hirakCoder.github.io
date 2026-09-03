"use client";

import { motion } from "motion/react";

const lines = [
  "Where engineering",
  "meets creativity.",
];

const body =
  "I'm Hirak — a Senior QA Engineer and iOS developer based in Toronto. " +
  "13+ years shipping enterprise software at scale. iOS apps in 175 countries. " +
  "When I'm not testing, I'm writing songs, producing tracks, or composing. " +
  "I ship things that matter.";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-8 py-40">
      <h2 className="font-[family-name:var(--font-serif)] text-[clamp(40px,7vw,96px)] font-bold leading-[1.05] tracking-tight">
        {lines.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="block"
            style={{
              backgroundImage:
                i === 1
                  ? "linear-gradient(90deg, #f5f5f7, #a5b4fc 70%)"
                  : undefined,
              WebkitBackgroundClip: i === 1 ? "text" : undefined,
              WebkitTextFillColor: i === 1 ? "transparent" : undefined,
            }}
          >
            {line}
          </motion.span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="mt-12 max-w-2xl text-[clamp(16px,1.4vw,20px)] font-light leading-relaxed text-white/70"
      >
        {body}
      </motion.p>
    </section>
  );
}
