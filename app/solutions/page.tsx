"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { HeroScrollDemo } from "../components/hero-scroll-demo";
import { AppSolvesShowcase } from "../components/app-solves-showcase";
import { SEOGrowthSection } from "../components/seo-growth-section";
import { HowWeCompare } from "../components/how-we-compare";

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};


// ─── COMPARE STATS (Standard vs Intelligent) ──────────────────────────────────
// ─── SOLUTIONS PAGE ────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Header active="solutions" />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.07) 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              Solutions
            </p>
            <h1 className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D] max-w-3xl">
              Systems built around your operations, not the other way around.
            </h1>
            <p className="text-[18px] md:text-xl text-[#747474] max-w-2xl leading-relaxed">
              Every business has a different bottleneck. We architect the specific solution that removes yours &mdash;
              then engineer it to compound in value long after launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SCROLL SHOWCASE ── */}
      <HeroScrollDemo />

      {/* ── APP SOLVES / UVP ── */}
      <AppSolvesShowcase />

      {/* ── SEO & GROWTH ── */}
      <SEOGrowthSection />

      {/* ── COMPARE: HOW WE COMPARE ── */}
      <HowWeCompare />

      {/* ── FOOTER CTA ── */}
      <section className="py-20 px-6 text-center border-t border-[#e4e4e4] bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-4">Start Building</p>
          <h2 className="text-[clamp(32px,5vw,60px)] font-bold text-[#0D0D0D] leading-tight mb-6">
            Not sure which solution<br />fits your business?
          </h2>
          <p className="text-[#747474] text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            Walk us through your current stack. We&apos;ll identify your highest-leverage opportunity &mdash; no pitch, no obligation.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#F26A10] hover:bg-[#D94030] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            Request Free Audit <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
