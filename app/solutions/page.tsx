"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight, X, Check, Menu,
} from "lucide-react";
import { SocialIconRow } from "../components/social-links";
import { HeroScrollDemo } from "../components/hero-scroll-demo";

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

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-6">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-white/60"
      >
        <div className="px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="DopMin home" className="flex items-center group">
            <div className="relative h-12 w-48 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="https://res.cloudinary.com/dukv2otyn/image/upload/v1781826436/dopmin_new-removebg-preview_dxqaup.png"
                alt="DopMin"
                fill
                sizes="192px"
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link href="/expertise" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Expertise</Link>
            <Link href="/solutions" className="text-[14px] font-medium text-[#F26A10] hover:text-[#D94030] transition-colors">Solutions</Link>
            <Link href="/#work" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Work</Link>
            <Link href="/#contact" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Contact</Link>
            <Link href="/team" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Team</Link>
          </nav>

          <Link href="/#contact" className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-semibold bg-[#F26A10] text-white px-5 py-2 rounded-xl hover:bg-[#D94030] transition-colors outline-none shadow-sm">
            Book a Free Audit <ChevronRight className="w-4 h-4" />
          </Link>

          <button className="md:hidden text-stone-400 hover:text-stone-700 transition-colors p-1 rounded" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu" aria-expanded={open}>
            {open ? <X className="w-6 h-6 text-[#0D0D0D]" /> : <Menu className="w-6 h-6 text-[#0D0D0D]" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden border-t border-stone-100 rounded-b-2xl">
              <div className="px-6 py-5 flex flex-col gap-4">
                <Link href="/expertise" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Expertise</Link>
                <Link href="/solutions" onClick={() => setOpen(false)} className="text-[#F26A10] text-base font-semibold">Solutions</Link>
                <Link href="/#work" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Work</Link>
                <Link href="/#contact" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Contact</Link>
                <Link href="/team" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Team</Link>
                <Link href="/#contact" onClick={() => setOpen(false)} className="text-center text-sm font-semibold bg-[#F26A10] text-white px-4 py-3 rounded-xl hover:bg-[#D94030] transition-colors mt-2">Book a Free Audit</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}

// ─── COMPARE ROWS (Standard vs Intelligent) ───────────────────────────────────
const compareRows = [
  { label: "Responsiveness", before: "Manual triaging by staff",       after: "AI agent responds in < 2 sec" },
  { label: "Uptime model",   before: "Restart after failure",          after: "Self-healing, auto-recovery" },
  { label: "Reporting",      before: "Weekly CSV exports",             after: "Real-time dashboards & alerts" },
  { label: "Scalability",    before: "Provisioned for peak, idle 80%", after: "Auto-scales to demand" },
  { label: "Connectivity",   before: "Requires stable internet",       after: "Works offline, syncs on reconnect" },
];

// ─── SOLUTIONS PAGE ────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Nav />

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

      {/* ── COMPARE: STANDARD VS INTELLIGENT ── */}
      <section className="py-28 px-6 bg-[#fafafa] border-y border-[#e4e4e4]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-14 text-center"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              The DopMin Difference
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,64px)] font-semibold text-[#0D0D0D] leading-[1.1]">
              Standard vs. Intelligent
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#747474] mt-6 text-xl max-w-2xl mx-auto leading-relaxed">
              Most agencies ship software. We ship leverage &mdash; systems that compound in value after launch.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="rounded-2xl overflow-hidden border border-[#e4e4e4] bg-white shadow-sm"
          >
            <div className="overflow-x-auto">
              <div className="min-w-[560px]">
                <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#f5f5f5] border-b border-[#e4e4e4]">
                  <div className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold text-[#747474] uppercase tracking-wider">Dimension</div>
                  <div className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold text-[#747474] uppercase tracking-wider border-l border-[#e4e4e4]">
                    Standard App
                  </div>
                  <div className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold text-white uppercase tracking-wider border-l border-[#e91d27] bg-[#e91d27]">
                    DopMin Systems
                  </div>
                </div>

                {compareRows.map(({ label, before, after }, i) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className={`grid grid-cols-[1.2fr_1fr_1fr]${i < compareRows.length - 1 ? " border-b border-[#e4e4e4]" : ""}`}
                  >
                    <div className="px-4 md:px-6 py-4 md:py-5 text-sm md:text-base font-semibold text-[#0D0D0D]">{label}</div>
                    <div className="px-4 md:px-6 py-4 md:py-5 border-l border-[#e4e4e4] flex items-start gap-2 md:gap-3">
                      <X className="w-4 h-4 md:w-5 md:h-5 text-[#D94030] shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-[#747474]">{before}</span>
                    </div>
                    <div className="px-4 md:px-6 py-4 md:py-5 border-l border-[#e91d27]/10 bg-[#e91d27]/5 flex items-start gap-2 md:gap-3">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-[#90E060] shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm font-medium text-[#0D0D0D]">{after}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* ── FOOTER ── */}
      <footer className="relative bg-[#0a0a0a] overflow-hidden pt-20 pb-12 px-6 md:px-12 xl:px-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(242,106,16,0.10), rgba(255,215,0,0.05) 50%, transparent 80%)" }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="flex items-center mb-10">
            <div className="relative h-16 w-64 shrink-0">
              <Image
                src="https://res.cloudinary.com/dukv2otyn/image/upload/v1781827164/ChatGPT_Image_Jun_19__2026__05_28_15_AM-removebg-preview_yxwkjs.png"
                alt="DopMin"
                fill
                sizes="256px"
                className="object-contain object-left"
                unoptimized
              />
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-[#747474] flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p>© {new Date().getFullYear()} Dopmin. All Rights Reserved.</p>
            <SocialIconRow variant="dark" />
          </div>
        </div>
      </footer>
    </main>
  );
}
