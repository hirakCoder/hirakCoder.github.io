"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { expertise, type Expertise } from "@/data/expertise";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="relative mx-auto max-w-6xl px-8 py-32">
      <header className="mb-16">
        <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-white/40">
          Expertise
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[clamp(40px,7vw,80px)] font-bold leading-[1.05] tracking-tight">
          What I work in.
        </h2>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((e, i) => (
          <ExpertiseCard key={e.title} item={e} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExpertiseCard({ item, index }: { item: Expertise; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 200, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-colors hover:bg-white/[0.06]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.18), transparent 50%)",
        }}
      />
      <div className="relative">
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/80"
          >
            <path d={item.icon} />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold tracking-tight">
          {item.title}
        </h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.pills.map((p) => (
            <li
              key={p}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/65"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
