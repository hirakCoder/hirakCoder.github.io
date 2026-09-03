"use client";

import { motion } from "motion/react";
import { jobs, education, recognition } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-8 py-32">
      <header className="mb-16">
        <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-white/40">
          Experience
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[clamp(40px,7vw,80px)] font-bold leading-[1.05] tracking-tight">
          13 years building.
        </h2>
        <p className="mt-4 max-w-xl text-white/55">
          Across enterprise banking, insurance, and wealth management.
        </p>
      </header>

      <ol className="relative ml-3 border-l border-white/10 pl-8">
        {jobs.map((j, i) => (
          <motion.li
            key={j.date}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12 last:mb-0"
          >
            <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border border-indigo-400/40 bg-indigo-400/80 ring-4 ring-indigo-500/20" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-white/45">
                {j.date}
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl font-bold tracking-tight">
                {j.role}
              </h3>
              <p className="mt-1 text-[13px] text-white/55">{j.company}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/75">{j.description}</p>
              {j.awards && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {j.awards.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1 text-[11px] text-amber-100/80"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {[education, recognition].map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-white/45">
              {c.label}
            </div>
            <h4 className="mt-2 font-[family-name:var(--font-serif)] text-xl font-bold">{c.title}</h4>
            <p className="mt-2 text-[13px] text-white/55">{c.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
