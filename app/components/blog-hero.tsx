"use client";

import { motion } from "framer-motion";

export function BlogHero() {
  return (
    <section className="relative pt-36 pb-16 px-6 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
            Insights &amp; Updates
          </p>
          <h1 className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D] max-w-3xl">
            The Dopmin Blog
          </h1>
          <p className="text-[18px] md:text-xl text-[#747474] max-w-2xl leading-relaxed">
            Notes on engineering, design, and AI workflows from the team building them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
