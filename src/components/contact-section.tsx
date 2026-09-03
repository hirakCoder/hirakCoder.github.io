"use client";

import { motion } from "motion/react";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/hirak-banerjee-906aa940/", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/hirakcoder", icon: "github" },
  { label: "X", href: "https://x.com/hirak8", icon: "x" },
  { label: "YouTube", href: "https://youtube.com/channel/UCMacTlcyy0TRgce7cnWdASw", icon: "youtube" },
  { label: "Email", href: "mailto:hirak.b@hotmail.com", icon: "email" },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-8 py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-[1100px] w-[1100px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.7), rgba(99,102,241,0.15) 50%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pb-[0.15em] font-[family-name:var(--font-serif)] text-[clamp(40px,8vw,140px)] font-bold italic leading-[1.15] tracking-tight text-white"
          style={{
            textShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          Let&apos;s build
          <br />
          something great.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <a
            href="mailto:hirak.b@hotmail.com"
            className="group relative inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-[15px] font-medium text-white backdrop-blur-2xl transition-all hover:bg-white/[0.1]"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04) inset, 0 30px 60px -20px rgba(99,102,241,0.4)",
            }}
          >
            <span>Start a conversation</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 50%, rgba(99,102,241,0.25) 100%)",
                mixBlendMode: "overlay",
              }}
            />
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="block text-white/55 transition-colors hover:text-white"
              >
                <SocialIcon name={s.icon} />
              </a>
            </li>
          ))}
        </motion.ul>

        <p className="mt-20 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-white/35">
          © 2026 · Built with Claude Code · Toronto, ON
        </p>
      </div>
    </section>
  );
}

function SocialIcon({ name }: { name: string }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "linkedin":
      return (
        <svg {...props}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "github":
      return (
        <svg {...props}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M4 4 L20 20 M20 4 L4 20" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...props}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      );
    case "email":
      return (
        <svg {...props}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    default:
      return null;
  }
}
