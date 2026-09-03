"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAME = "HIRAK BANERJEE";

export function Loader() {
  const [show, setShow] = useState(true);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("loader_seen")) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("loader_seen", "1");

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(NAME.slice(0, i));
      if (i >= NAME.length) window.clearInterval(id);
    }, 60);

    const close = window.setTimeout(() => setShow(false), 1800);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(close);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0c]"
        >
          <div className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.4em] text-white/90">
            {typed}
            <span className="inline-block w-[1ch] animate-pulse">▌</span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-48 origin-left bg-gradient-to-r from-indigo-400/0 via-indigo-300 to-indigo-400/0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
