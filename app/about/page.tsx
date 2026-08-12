"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

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
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── VALUES ─────────────────────────────────────────────────────────────────
const VALUES = [
  {
    index: "01",
    title: "Outcomes over output",
    body: "We measure success by what our work moves for your business, not by lines of code shipped or hours billed.",
    accent: "#F26A10",
  },
  {
    index: "02",
    title: "Ownership, end-to-end",
    body: "Every engagement is owned by people who care about the result, from the first architecture decision to the last deploy.",
    accent: "#27AE60",
  },
  {
    index: "03",
    title: "Ship fast, iterate faster",
    body: "Working software beats a perfect plan. We get real things in front of real users, then refine from there.",
    accent: "#D94030",
  },
  {
    index: "04",
    title: "Partners, not vendors",
    body: "We embed in how you work, ask hard questions early, and tell you the truth even when it's not what you want to hear.",
    accent: "#007ACC",
  },
];

// ─── STATS ──────────────────────────────────────────────────────────────────
const STATS = [
  { value: "3+", label: "Years Building" },
  { value: "12+", label: "Projects Shipped" },
  { value: "4", label: "Core Disciplines" },
  { value: "100%", label: "Remote-First" },
];

// ─── FOUNDERS ───────────────────────────────────────────────────────────────
// Images and roles are shared with the /team page — Senira leads as Founder,
// the rest of the founding team hold Co-Founder titles alongside their roles.
const FOUNDERS = [
  {
    name: "Senira Mendis",
    title: "Founder",
    role: "Scrum Master & Backend Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727668/1755882213261_zoaphc.png",
    accentColor: "#D4A017",
  },
  {
    name: "Devin Kulasekere",
    title: "Co-Founder",
    role: "Front End Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/255916317_ru7gyz.jpg",
    accentColor: "#C0392B",
  },
  {
    name: "Rashmika Kodithuwakku",
    title: "Co-Founder",
    role: "Backend Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727846/Screenshot_2026-06-18_015243_vmapsq.png",
    accentColor: "#27AE60",
  },
  {
    name: "Pamod Dhananjana",
    title: "Co-Founder",
    role: "QA Engineer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/1776604303706_hni2ai.jpg",
    accentColor: "#E67E22",
  },
];

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Header active="about" ctaHref="/book" />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.07) 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
            <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              About Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D] max-w-3xl"
            >
              We&apos;re Dopmin Technologies — engineers, designers, and builders working as one team.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[18px] md:text-xl text-[#747474] max-w-2xl leading-relaxed">
              Dopmin Technologies (operating as &ldquo;Dopmin&rdquo;) exists because most software takes too long,
              costs too much, and still doesn&apos;t fit how the business actually runs. We build the alternative:
              custom software, design, and AI automation engineered around your operations, not the other way around.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="border-t border-[#e4e4e4]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2"
        >
          <div className="flex items-center px-6 md:px-16 py-16 md:py-24 bg-white">
            <div className="max-w-md">
              <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-5">Our Story</p>
              <h3 className="text-[clamp(28px,4vw,44px)] font-semibold text-[#0D0D0D] leading-[1.08] tracking-tight mb-6">
                Started small, built to scale
              </h3>
              <p className="text-[17px] text-[#747474] leading-relaxed mb-4">
                Dopmin started as a small team of engineers and designers who kept seeing the same problem: great
                businesses stuck with software that fought them instead of helping them grow.
              </p>
              <p className="text-[17px] text-[#747474] leading-relaxed">
                Today we work across custom software, UI/UX, AI automation, mobile, and full-stack web — but the
                original goal hasn&apos;t changed. Build systems that compound in value, not technical debt.
              </p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[320px] md:min-h-[440px] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop"
              alt="The Dopmin team working"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="py-24 px-6 bg-white border-t border-[#e4e4e4]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-px bg-[#e4e4e4] border border-[#e4e4e4] rounded-2xl overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-12"
          >
            <span className="block w-8 h-[3px] rounded-full mb-6" style={{ backgroundColor: "#F26A10" }} />
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-4">Vision</p>
            <h3 className="text-[clamp(22px,3vw,30px)] font-semibold text-[#0D0D0D] leading-tight mb-4">
              To be the studio ambitious brands trust with their hardest problems.
            </h3>
            <p className="text-[15px] text-[#747474] leading-relaxed">
              We want Dopmin to be the first call when a business hits a wall that off-the-shelf software
              can&apos;t solve — known for turning complex, high-stakes ideas into software that actually ships
              and actually works.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 md:p-12"
          >
            <span className="block w-8 h-[3px] rounded-full mb-6" style={{ backgroundColor: "#27AE60" }} />
            <p className="text-xs font-bold text-[#27AE60] uppercase tracking-[0.18em] mb-4">Mission</p>
            <h3 className="text-[clamp(22px,3vw,30px)] font-semibold text-[#0D0D0D] leading-tight mb-4">
              Engineer software that compounds in value, not technical debt.
            </h3>
            <p className="text-[15px] text-[#747474] leading-relaxed">
              We deliver custom software, design, and AI automation that removes a real bottleneck — shipped
              fast, built to last, and owned end-to-end by a team that treats your business like their own.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 px-6 bg-[#fafafa] border-t border-[#e4e4e4]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-4">What Drives Us</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#0D0D0D] leading-[1.08] tracking-tight">
              How we work, on every project
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {VALUES.map(({ index, title, body, accent }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#e4e4e4] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <p className="text-[13px] font-bold mb-4 tabular-nums" style={{ color: accent }}>
                  {index}
                </p>
                <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-2">{title}</h3>
                <p className="text-[14px] text-[#747474] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="py-24 px-6 bg-white border-t border-[#e4e4e4]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-4">Founded By</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#0D0D0D] leading-[1.08] tracking-tight">
              The team that started it all
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {FOUNDERS.map((founder) => (
              <motion.div key={founder.name} variants={fadeUp}>
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={founder.img}
                    alt={founder.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>

                <div className="pt-4">
                  <p className="text-[15px] font-semibold text-[#0D0D0D] leading-snug">{founder.name}</p>
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.1em] mt-1"
                    style={{ color: founder.title === "Founder" ? "#F26A10" : founder.accentColor }}
                  >
                    {founder.title}
                  </p>
                  <p className="text-[12.5px] text-[#8a8a8a] mt-1">{founder.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 bg-white border-t border-[#e4e4e4]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {STATS.map(({ value, label }) => (
            <motion.div key={label} variants={fadeUp}>
              <p className="text-[clamp(28px,4vw,44px)] font-bold text-[#0D0D0D] mb-1">{value}</p>
              <p className="text-[13px] text-[#747474] uppercase tracking-wide">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── MEET THE TEAM CTA ── */}
      <section className="py-20 px-6 border-t border-[#e4e4e4] bg-[#fafafa]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-white rounded-2xl border border-[#e4e4e4] px-8 py-10 md:px-12"
        >
          <div>
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-3">The People</p>
            <h3 className="text-[clamp(22px,3vw,32px)] font-semibold text-[#0D0D0D] leading-tight mb-2">
              Want to know who&apos;s behind the work?
            </h3>
            <p className="text-[15px] text-[#747474] max-w-md">
              Meet the engineers, designers, and QA specialists who ship every Dopmin project.
            </p>
          </div>
          <Link
            href="/team"
            className="shrink-0 inline-flex items-center gap-2 bg-[#0D0D0D] hover:bg-[#F26A10] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Meet the team <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-20 px-6 text-center border-t border-[#e4e4e4] bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-4">Work With Us</p>
          <h2 className="text-[clamp(32px,5vw,60px)] font-bold text-[#0D0D0D] leading-tight mb-6">
            Let&apos;s build something<br />that actually works.
          </h2>
          <p className="text-[#747474] text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            Tell us where you&apos;re stuck. We&apos;ll tell you exactly how Dopmin would approach it.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F26A10] hover:bg-[#D94030] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            Book a Free Audit <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
