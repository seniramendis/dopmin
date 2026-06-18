"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X, Menu, ArrowLeft } from "lucide-react";

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
          {/* Logo */}
          <Link href="/" aria-label="DopMin home" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5 bg-stone-100 transition-transform duration-700 group-hover:rotate-180">
              <Image
                src="/assets/images/dopmin.jpg"
                alt="Dopmin logo"
                fill
                sizes="32px"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#0D0D0D]">DOPMIN</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {["Expertise", "Solutions", "Work", "Contact"].map((l) => (
              <Link
                key={l}
                href={`/#${l.toLowerCase()}`}
                className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors"
              >
                {l}
              </Link>
            ))}
            <Link
              href="/team"
              className="text-[14px] font-medium text-[#F26A10] hover:text-[#D94030] transition-colors"
            >
              Team
            </Link>
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/#contact"
            className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-semibold bg-[#F26A10] text-white px-5 py-2 rounded-xl hover:bg-[#D94030] transition-colors outline-none shadow-sm"
          >
            Book a Free Audit <ChevronRight className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-stone-400 hover:text-stone-700 transition-colors p-1 rounded"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open
              ? <X className="w-6 h-6 text-[#0D0D0D]" />
              : <Menu className="w-6 h-6 text-[#0D0D0D]" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-stone-100 rounded-b-2xl"
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                {["Expertise", "Solutions", "Work", "Contact"].map((l) => (
                  <Link
                    key={l}
                    href={`/#${l.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors"
                  >
                    {l}
                  </Link>
                ))}
                <Link
                  href="/team"
                  onClick={() => setOpen(false)}
                  className="text-[#F26A10] text-base font-semibold"
                >
                  Team
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-semibold bg-[#F26A10] text-white px-4 py-3 rounded-xl hover:bg-[#D94030] transition-colors mt-2"
                >
                  Book a Free Audit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}

// ─── TEAM DATA ────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Senira Mendis",
    role: "Scrum Master & Backend Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727668/1755882213261_zoaphc.png",
  },
  {
    name: "Devin Kulasekere",
    role: "Front End Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/255916317_ru7gyz.jpg",
  },
  {
    name: "Rashmika Kodithuwakku",
    role: "Backend Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727846/Screenshot_2026-06-18_015243_vmapsq.png",
  },
  {
    name: "Pamod Dhananjana",
    role: "QA Engineer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/1776604303706_hni2ai.jpg",
  },
];

// ─── TEAM PAGE ────────────────────────────────────────────────────────────────
export default function TeamPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Nav />

      {/* Page content */}
      <div className="pt-28 pb-0 px-6 max-w-6xl mx-auto">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-stone-400 hover:text-[#0D0D0D] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h1
            className="text-[clamp(52px,7.5vw,100px)] text-[#0D0D0D] leading-[1.05]"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Our full stack<br />tech experts
          </h1>
          <p className="mt-6 text-[17px] text-stone-500 max-w-xl mx-auto leading-relaxed">
            A tight-knit crew of builders trusted to ship fast, clean, and at scale.
          </p>
        </motion.div>

        {/* Cinematic cards row — flush to bottom of page like reference */}
        <div className="flex gap-3 overflow-x-auto pb-0 snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-4">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative group shrink-0 snap-center w-[72vw] sm:w-[55vw] md:w-auto rounded-t-2xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Photo */}
              <img
                src={member.img}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading={i === 0 ? "eager" : "lazy"}
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Name + role */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-bold text-xl leading-snug drop-shadow-sm">
                  {member.name}
                </p>
                <p className="text-white/65 text-[13px] font-medium mt-1 leading-snug">
                  {member.role}
                </p>
              </div>

              {/* Hover accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F26A10] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
