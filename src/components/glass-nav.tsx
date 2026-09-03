"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Film", href: "#film" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export function GlassNav() {
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 24));

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed right-6 top-6 z-50"
    >
      <ul
        className={`flex items-center gap-1 rounded-full border border-white/10 px-2 py-1.5 backdrop-blur-2xl transition-colors ${
          lifted ? "bg-white/[0.06]" : "bg-white/[0.03]"
        }`}
      >
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
