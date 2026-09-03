"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";

export function WorkSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="relative">
      <SectionIntro />

      <div ref={scrollerRef} className="relative h-[360vh] md:h-[480vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0c]">
          {projects.map((p, i) => (
            <Slide
              key={p.slug}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
          <ProgressIndicator total={projects.length} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function SectionIntro() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-white/40 sm:text-[11px]"
      >
        Selected Work
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 pb-[0.1em] font-[family-name:var(--font-serif)] text-[clamp(40px,8vw,128px)] font-bold leading-[1.05] tracking-tight text-white"
        style={{
          textShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        Things I&apos;ve
        <br />
        shipped.
      </motion.h2>
    </div>
  );
}

function ProgressIndicator({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    setActive(idx);
  });

  const label = `${String(active + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const projectName = projects[active]?.name.toUpperCase() ?? "";

  return (
    <>
      <div className="pointer-events-none absolute right-6 top-6 z-20 flex flex-col items-end gap-2 sm:right-10 sm:top-10">
        <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] text-white/55">
          {label}
        </span>
        <motion.span
          key={projectName}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-white/35"
        >
          {projectName}
        </motion.span>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              width: i === active ? 24 : 6,
              opacity: i === active ? 1 : 0.35,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block h-[2px] rounded-full bg-white"
          />
        ))}
      </div>
    </>
  );
}

function Slide({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slot = 1 / total;
  const start = index * slot;
  const end = (index + 1) * slot;
  const fade = slot * 0.05;
  const visibilityPad = slot * 0.4;
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const offsets = [
    clamp(start - fade),
    clamp(start + fade),
    clamp(end - fade),
    clamp(end + fade),
  ];

  const opacity = useTransform(progress, offsets, [
    isFirst ? 1 : 0,
    1,
    1,
    isLast ? 1 : 0,
  ]);
  const videoScale = useTransform(progress, [clamp(start), clamp(end)], [1.06, 1.0]);
  const textY = useTransform(progress, [clamp(start), clamp(end)], [40, -40]);

  const [videoVisible, setVideoVisible] = useState(isFirst);
  useMotionValueEvent(progress, "change", (v) => {
    const near =
      v >= clamp(start - visibilityPad) && v <= clamp(end + visibilityPad);
    if (near !== videoVisible) setVideoVisible(near);
  });

  const indexLabel = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const align = index % 2 === 0 ? "items-start text-left" : "items-end text-right";
  const selfAlign = index % 2 === 0 ? "self-start" : "self-end";

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 h-full w-full"
    >
      {videoVisible && (
        <motion.video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ scale: videoScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/85 via-[#0a0a0c]/40 to-[#0a0a0c]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/95 via-transparent to-[#0a0a0c]/45" />
      </div>

      <motion.div
        style={{ y: textY }}
        className={`relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-8 lg:px-20 ${align}`}
      >
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-white/55 sm:text-[11px]">
          {indexLabel}
        </span>

        <h3
          className={`mt-5 break-words pb-[0.05em] font-[family-name:var(--font-serif)] text-[clamp(40px,8.5vw,128px)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white ${selfAlign} max-w-full`}
          style={{
            textShadow: "0 20px 40px rgba(0,0,0,0.6)",
            wordBreak: "break-word",
          }}
        >
          {project.name}
        </h3>

        <p className={`mt-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.25em] text-white/65 sm:text-[12px] ${selfAlign} max-w-full`}>
          {project.role}
        </p>

        <p className={`mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/85 sm:mt-8 sm:text-[clamp(15px,1.3vw,18px)] ${selfAlign}`}>
          {project.description}
        </p>

        <ul
          className={`mt-6 flex max-w-xl flex-wrap gap-2 sm:mt-8 ${selfAlign} ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white/85 backdrop-blur-md sm:text-[12px]"
            >
              {t}
            </li>
          ))}
        </ul>

        {project.link.href !== "#" ? (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className={`mt-10 inline-flex items-center gap-3 text-[14px] font-medium text-white/90 transition-colors hover:text-white ${selfAlign}`}
          >
            <span className="border-b border-white/40 pb-0.5">{project.link.label}</span>
            <span aria-hidden>↗</span>
          </a>
        ) : (
          <span
            className={`mt-10 text-[12px] uppercase tracking-[0.25em] text-white/45 sm:text-[13px] ${selfAlign}`}
          >
            {project.link.label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
