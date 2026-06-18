"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X, Menu, ArrowRight } from "lucide-react";
import Image from "next/image";

// ─── NAV ─────────────────────────────────────────────────────────────────────
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
          <a href="/" aria-label="DopMin home" className="flex items-center group">
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
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {["Expertise", "Solutions", "Work", "Contact"].map((l) => (
              <a key={l} href={`/#${l.toLowerCase()}`} className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">{l}</a>
            ))}
            <a href="/team" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Team</a>
          </nav>
          <a href="/book" className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-semibold bg-[#F26A10] text-white px-5 py-2 rounded-xl hover:bg-[#D94030] transition-colors outline-none shadow-sm">
            Book a Free Audit <ChevronRight className="w-4 h-4" />
          </a>
          <button className="md:hidden p-1 rounded" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6 text-[#0D0D0D]" /> : <Menu className="w-6 h-6 text-[#0D0D0D]" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden border-t border-stone-100 rounded-b-2xl">
              <div className="px-6 py-5 flex flex-col gap-4">
                {["Expertise", "Solutions", "Work", "Contact"].map((l) => (
                  <a key={l} href={`/#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">{l}</a>
                ))}
                <a href="/team" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Team</a>
                <a href="/book" onClick={() => setOpen(false)} className="text-center text-sm font-semibold bg-[#F26A10] text-white px-4 py-3 rounded-xl hover:bg-[#D94030] transition-colors mt-2">Book a Free Audit</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] overflow-hidden pt-20 pb-12 px-6 md:px-12 xl:px-24">
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(242,106,16,0.10), rgba(255,215,0,0.05) 50%, transparent 80%)" }} />
      <div className="relative z-10 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-[#a2a2a2] text-base mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 shrink-0 rounded-full overflow-hidden bg-gray-700">
                <Image src="/assets/images/dopmin.jpg" alt="Dopmin" fill sizes="32px" className="object-cover grayscale" unoptimized />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">DOPMIN</span>
            </div>
            <p className="text-[#555] text-sm leading-relaxed">Engineering digital luxury for brands that refuse to be ordinary.</p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Capabilities</span>
            <a href="/#expertise" className="hover:text-white transition-colors">Design</a>
            <a href="/#expertise" className="hover:text-white transition-colors">Engineering</a>
            <a href="/#expertise" className="hover:text-white transition-colors">AI Workflows</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Company</span>
            <a href="/" className="hover:text-white transition-colors">About Us</a>
            <a href="/#work" className="hover:text-white transition-colors">Work</a>
            <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Legal</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-[#747474] flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>© {new Date().getFullYear()} Dopmin. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── USP DATA ─────────────────────────────────────────────────────────────────
const usps = [
  { title: "We move fast.", desc: "No bloated processes. You get a supportive and agile team that ships production-ready work in weeks, not quarters." },
  { title: "ROI-obsessed.", desc: "Every pixel, every line of code is tied to a business outcome. We don't build pretty things that don't convert." },
  { title: "Full-stack ownership.", desc: "Design, engineering, AI — all under one roof. No handoff chaos, no finger-pointing. One team, full accountability." },
];

// ─── BOOK PAGE ────────────────────────────────────────────────────────────────
export default function BookPage() {
  return (
    <main className="min-h-screen bg-white text-[#0D0D0D] flex flex-col">
      <Nav />

      {/* ── TOP: Centered headline + description ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 pt-36 pb-14 bg-white border-b border-[#ebebeb]"
      >
        <p className="text-[#F26A10] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          Free Audit
        </p>
        <h1
          className="text-5xl md:text-6xl font-normal text-[#0D0D0D] leading-tight mb-4"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Book a Meeting
        </h1>
        <p className="text-[#747474] text-lg leading-relaxed max-w-xl mx-auto">
          One 30-minute call. We&apos;ll audit your digital presence, identify your biggest growth levers, and show you exactly where you&apos;re leaving money on the table.
        </p>
      </motion.div>

      {/* ── SPLIT: Left USP / Right iframe ── */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col justify-center px-8 md:px-16 xl:px-20 py-16 bg-[#fafafa] border-r border-[#ebebeb]"
        >
          <p className="text-[clamp(36px,4.5vw,64px)] font-normal text-[#0D0D0D] leading-[1.1] mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Let&apos;s build something <span className="text-[#F26A10]">exceptional.</span>
          </p>
          <p className="text-[#747474] text-base leading-relaxed max-w-md mb-10">
            Whether you&apos;re starting from scratch or scaling an existing product — we bring the strategy, design, and engineering to make it happen.
          </p>

          {/* USP list — clean, no cards, no icons */}
          <div className="flex flex-col gap-6 max-w-md">
            {usps.map(({ title, desc }) => (
              <div key={title} className="border-l-2 border-[#F26A10] pl-5">
                <p className="font-semibold text-[#0D0D0D] text-sm mb-1">{title}</p>
                <p className="text-[#747474] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <a href="/#contact" className="mt-10 inline-flex items-center gap-2 text-sm text-[#747474] hover:text-[#F26A10] transition-colors group">
            Prefer email instead? Reach us directly
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Right — Cal iframe */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-[50%] xl:w-[48%] bg-[#0D0D0D] flex items-stretch"
        >
          <iframe
            src="https://cal.com/dopmin-technologies?embed=true&theme=dark"
            width="100%"
            height="100%"
            style={{ border: "none", display: "block", minHeight: "700px" }}
            title="Book a meeting with Dopmin Technologies"
          />
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}