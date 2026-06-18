"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X, Menu, Code2, Shield, Layers, Cpu } from "lucide-react";

// ─── NAV (no back button) ─────────────────────────────────────────────────────
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
          <Link href="/" aria-label="DopMin home" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5 bg-stone-100 transition-transform duration-700 group-hover:rotate-180">
              <Image src="/assets/images/dopmin.jpg" alt="Dopmin logo" fill sizes="32px" className="object-cover" priority unoptimized />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#0D0D0D]">DOPMIN</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {["Expertise", "Solutions", "Work", "Contact"].map((l) => (
              <Link key={l} href={`/#${l.toLowerCase()}`} className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">{l}</Link>
            ))}
            <Link href="/team" className="text-[14px] font-medium text-[#F26A10] hover:text-[#D94030] transition-colors">Team</Link>
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
                {["Expertise", "Solutions", "Work", "Contact"].map((l) => (
                  <Link key={l} href={`/#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">{l}</Link>
                ))}
                <Link href="/team" onClick={() => setOpen(false)} className="text-[#F26A10] text-base font-semibold">Team</Link>
                <Link href="/#contact" onClick={() => setOpen(false)} className="text-center text-sm font-semibold bg-[#F26A10] text-white px-4 py-3 rounded-xl hover:bg-[#D94030] transition-colors mt-2">Book a Free Audit</Link>
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
    tagline: "The architect who keeps the engine running and the team in sync.",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727668/1755882213261_zoaphc.png",
    accentColor: "#D4A017",
    accentBg: "rgba(212,160,23,0.80)",
    icon: Layers,
    skills: ["Spring Boot", "PostgreSQL", "Agile", "System Design", "REST APIs"],
    funFact: "Breaks sprints into pieces so small, bugs have nowhere left to hide.",
  },
  {
    name: "Devin Kulasekere",
    role: "Front End Developer",
    tagline: "Pixel-perfect interfaces that feel as good as they look.",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/255916317_ru7gyz.jpg",
    accentColor: "#C0392B",
    accentBg: "rgba(192,57,43,0.80)",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    funFact: "Will spend 3 hours perfecting a 2px animation — and it'll be worth it.",
  },
  {
    name: "Rashmika Kodithuwakku",
    role: "Backend Developer",
    tagline: "The engine under the hood — fast, reliable, and always scalable.",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727846/Screenshot_2026-06-18_015243_vmapsq.png",
    accentColor: "#27AE60",
    accentBg: "rgba(39,174,96,0.80)",
    icon: Cpu,
    skills: ["Node.js", "Python", "MySQL", "Docker", "AWS"],
    funFact: "Optimises queries until the database says thank you.",
  },
  {
    name: "Pamod Dhananjana",
    role: "QA Engineer",
    tagline: "Nothing ships until it's unbreakable. He makes sure of that.",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/1776604303706_hni2ai.jpg",
    accentColor: "#E67E22",
    accentBg: "rgba(230,126,34,0.80)",
    icon: Shield,
    skills: ["Selenium", "Cypress", "Jest", "Performance Testing", "CI/CD"],
    funFact: "Finds edge cases in his sleep. Literally dreams in test scenarios.",
  },
];

// ─── TEAM PAGE ────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="bg-[#ffffff] min-h-screen antialiased">
      <Nav />

      {/* ── HERO BAND ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.12) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-5"
          >
            The People Behind the Product
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[clamp(48px,8vw,100px)] font-bold text-white leading-[1.02] tracking-tight mb-6"
          >
            Small team.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D94030] via-[#F26A10] to-[#FFD700]">
              Outsized impact.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[17px] text-white/55 max-w-xl mx-auto leading-relaxed"
          >
            Four specialists. One shared obsession: shipping software that actually works in the real world.
          </motion.p>
        </div>
      </section>

      {/* ── TEAM CARDS ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Desktop: 4-col cinematic grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-5">
            {TEAM.map((member, i) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "3/4" }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Photo */}
                  <img src={member.img} alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />

                  {/* Default dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                  {/* Hover coloured gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${member.accentBg} 0%, rgba(0,0,0,0.5) 55%, transparent 100%)` }} />

                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[4px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-tr-sm"
                    style={{ backgroundColor: member.accentColor }} />

                  {/* Role chip — visible on hover */}
                  <div className="absolute top-5 left-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                      style={{ color: member.accentColor, backgroundColor: "rgba(0,0,0,0.5)", borderColor: `${member.accentColor}40` }}>
                      <Icon className="w-3 h-3" /> {member.role.split(" ")[0]}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {/* Skills — slide up on hover */}
                    <div className="mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded text-[10px] font-semibold text-white/90 bg-white/15 border border-white/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-white font-bold text-xl leading-snug drop-shadow mb-1">{member.name}</p>
                    <p className="text-white/60 text-[13px] font-medium leading-snug group-hover:text-white/80 transition-colors">{member.role}</p>

                    {/* Tagline — visible on hover */}
                    <p className="mt-2 text-[12px] text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 delay-75">
                      {member.tagline}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: vertical stacked cards with full detail */}
          <div className="md:hidden flex flex-col gap-6">
            {TEAM.map((member, i) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="rounded-2xl overflow-hidden border border-white/8"
                  style={{ borderTopColor: member.accentColor, borderTopWidth: 3 }}
                >
                  {/* Photo strip */}
                  <div className="relative h-56 w-full">
                    <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${member.accentBg} 0%, transparent 60%)` }} />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                        style={{ color: member.accentColor, backgroundColor: "rgba(0,0,0,0.55)", borderColor: `${member.accentColor}50` }}>
                        <Icon className="w-3 h-3" /> {member.role.split("&")[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="bg-[#161616] px-5 py-5">
                    <h3 className="text-white font-bold text-xl mb-0.5">{member.name}</h3>
                    <p className="text-sm mb-3" style={{ color: member.accentColor }}>{member.role}</p>
                    <p className="text-white/55 text-[13px] leading-relaxed mb-4">{member.tagline}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white/70 bg-white/8 border border-white/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 pt-4 border-t border-white/8 text-[12px] text-white/35 italic">
                      💡 {member.funFact}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CULTURE STRIP ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="py-20 px-6 border-t border-white/8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "⚡", title: "Ship fast, iterate faster", body: "We default to working code over perfect planning. Real feedback from real users beats any internal spec." },
              { emoji: "🔍", title: "Obsessed with the details", body: "Every pixel, every millisecond, every edge case. We don't ship anything we'd be embarrassed to show." },
              { emoji: "🤝", title: "Owned end-to-end", body: "No handoff culture here. Each engineer owns their work from architecture to production — and takes pride in it." },
            ].map(({ emoji, title, body }) => (
              <div key={title} className="rounded-2xl bg-white/[0.04] border border-white/8 p-7 hover:border-[#F26A10]/30 hover:bg-white/[0.06] transition-all duration-300">
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/45 text-[14px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── FOOTER CTA ── */}
      <section className="py-20 px-6 text-center border-t border-white/8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-4">Work With Us</p>
          <h2 className="text-[clamp(32px,5vw,60px)] font-bold text-white leading-tight mb-6">
            Want to build something<br />great together?
          </h2>
          <p className="text-white/45 text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            We're always open to interesting problems. Drop us a line.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#F26A10] hover:bg-[#D94030] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            Get in touch <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
