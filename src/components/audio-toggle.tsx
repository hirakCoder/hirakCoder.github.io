"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function AudioToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio("/ambient-v2.mp3");
    a.loop = true;
    a.volume = 0.35;
    ref.current = a;
    return () => {
      a.pause();
      ref.current = null;
    };
  }, []);

  async function toggle() {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        /* autoplay blocked — user must interact again */
      }
    }
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute ambient audio" : "Play ambient audio"}
      data-cursor="hover"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-2xl transition-colors hover:bg-white/[0.08]"
    >
      <span className="flex items-end gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            animate={
              playing
                ? { height: ["6px", "14px", "6px"] }
                : { height: "6px" }
            }
            transition={
              playing
                ? { duration: 0.9 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }
                : { duration: 0.3 }
            }
            className="block w-[2px] rounded-full bg-white/80"
            style={{ height: 6 }}
          />
        ))}
      </span>
    </motion.button>
  );
}
