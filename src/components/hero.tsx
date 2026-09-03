"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, Suspense } from "react";
import dynamic from "next/dynamic";

const PrismBackground = dynamic(
  () => import("./prism-background").then((m) => m.PrismBackground),
  { ssr: false, loading: () => null },
);

const NAME = "Hirak Banerjee";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const canvasOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} id="hero" className="relative h-[140vh] md:h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <NebulaBackdrop />

        <motion.div
          style={{ opacity: canvasOpacity }}
          className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        >
          <Suspense fallback={null}>
            <PrismBackground scrollProgress={scrollYProgress} />
          </Suspense>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className="relative z-10 flex h-full items-center justify-center px-6"
        >
          <div className="mx-auto max-w-6xl text-center">
            <h1
              aria-label={NAME}
              className="font-[family-name:var(--font-serif)] text-[clamp(56px,12vw,200px)] font-black leading-[1.0] tracking-[-0.02em] text-white"
              style={{
                textShadow:
                  "0 4px 20px rgba(0,0,0,0.5), 0 30px 60px rgba(99,102,241,0.25)",
              }}
            >
              {NAME.split(" ").map((word, wi) => (
                <span key={wi} className="block">
                  {word.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.3 + wi * 0.1 + i * 0.04,
                      }}
                      className="inline-block"
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="mt-8 font-[family-name:var(--font-mono)] text-[clamp(11px,1vw,14px)] uppercase tracking-[0.5em] text-white/55"
            >
              Engineer<span className="mx-3 text-white/25">·</span>Developer
              <span className="mx-3 text-white/25">·</span>Singer/Songwriter
            </motion.p>
          </div>
        </motion.div>

        <ScrollIndicator />
      </div>
    </section>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2.2 }}
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-white/40">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
      />
    </motion.div>
  );
}

function NebulaBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-1/4 left-1/2 h-[1100px] w-[1100px] -translate-x-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.5), rgba(56,33,160,0.2) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,113,227,0.5), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(120,38,255,0.5), transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
