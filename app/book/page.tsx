"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";


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
      <Header />

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