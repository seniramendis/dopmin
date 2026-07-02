"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X, Menu, Code2, Shield, Layers, Cpu } from "lucide-react";
import { SocialIconRow } from "../components/social-links";

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
            <Link href="/expertise" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">
              Expertise
            </Link>
            <Link href="/solutions" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Solutions</Link>
            {["Work", "Contact"].map((l) => (
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
                <Link href="/expertise" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">
                  Expertise
                </Link>
                <Link href="/solutions" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Solutions</Link>
                {["Work", "Contact"].map((l) => (
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

// ─── TEAM SDLC PLAYBOOK DATA ──────────────────────────────────────────────────
const TEAM_SDLC = [
  {
    phase: "Phase 1: Discovery & Architecture",
    member: "Senira Mendis",
    role: "Scrum Master & Backend Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727668/1755882213261_zoaphc.png",
    imgSide: "right",
    accent: "#D4A017",
    imgPosition: "object-center", // Added to perfectly frame your face
    description: "Before a single line of code is written, Senira works directly with clients to translate business goals into actionable Agile sprints. Using strict System Design principles, he architects robust REST APIs and maps out scalable PostgreSQL schemas. He ensures the project roadmap is clear, expectations are set, and the foundational architecture can handle enterprise-level scale."
  },
  {
    phase: "Phase 2: UI/UX & Client-Side Engineering",
    member: "Devin Kulasekere",
    role: "Front End Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/255916317_ru7gyz.jpg",
    imgSide: "left",
    accent: "#C0392B",
    description: "Devin bridges the gap between vision and reality. He begins by transforming the blueprint into intuitive UI/UX prototypes inside Figma for the client to review. Once approved, he brings those designs to life using React, Next.js, and Tailwind CSS. His obsession with pixel-perfect execution ensures that the final product feels flawless and responsive on every device."
  },
  {
    phase: "Phase 3: Core Infrastructure & Cloud",
    member: "Rashmika Kodithuwakku",
    role: "Backend Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727846/Screenshot_2026-06-18_015243_vmapsq.png",
    imgSide: "right",
    accent: "#27AE60",
    description: "When it's time to build the heavy-lifting engine, Rashmika steps in. Utilizing Node.js, Python, and MySQL, he develops the complex backend logic that powers the application. To guarantee seamless delivery, he containerizes the services with Docker and orchestrates the deployment on AWS, ensuring the client's system remains highly available and auto-scales with demand."
  },
  {
    phase: "Phase 4: Assurance & Delivery",
    member: "Pamod Dhananjana",
    role: "QA Engineer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/1776604303706_hni2ai.jpg",
    imgSide: "left",
    accent: "#E67E22",
    description: "Pamod acts as the final gatekeeper, guaranteeing that we never ship broken features. He builds rigorous automated testing pipelines using Selenium, Cypress, and Jest, integrating them directly into our CI/CD workflows. By catching edge cases and performance bottlenecks before they hit production, he protects the client's brand reputation and ensures a perfect launch."
  },
];

// ─── STAT BAR ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "4", label: "Core Team Members" },
  { value: "3+", label: "Years Building Together" },
  { value: "12+", label: "Projects Shipped" },
  { value: "100%", label: "Remote-First" },
];

// ─── TEAM PAGE ────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slideWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : el.clientWidth;
    const index = Math.round(el.scrollLeft / slideWidth);
    setCarouselIndex(Math.max(0, Math.min(index, TEAM.length - 1)));
  };

  const scrollToSlide = (i: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const slide = el.children[i] as HTMLElement | undefined;
    if (slide) {
      el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-white min-h-screen antialiased">
      <Nav />

      {/* ── HERO BAND ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.07) 0%, transparent 70%)" }} />

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
            className="text-[clamp(48px,8vw,100px)] font-semibold text-[#0D0D0D] leading-[1.02] tracking-tight mb-6"
          >
            Crafted by experts.<br />
            Built to last.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[17px] text-[#747474] max-w-xl mx-auto leading-relaxed"
          >
            Four specialists. One shared obsession: shipping software that actually works in the real world.
          </motion.p>
        </div>
      </section>

      {/* ── TEAM CARDS ── */}
      <section className="py-20 px-6 bg-white">
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
          <div className="md:hidden">
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-1 pb-2 -mx-1 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {TEAM.map((member, i) => {
                const Icon = member.icon;
                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="snap-center shrink-0 w-[85%] rounded-2xl overflow-hidden border border-[#e4e4e4]"
                  >
                    {/* Photo strip */}
                    <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                      <img
                        src={member.img}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                          style={{ color: member.accentColor, backgroundColor: "rgba(0,0,0,0.55)", borderColor: `${member.accentColor}50` }}>
                          <Icon className="w-3 h-3" /> {member.role.split("&")[0].trim()}
                        </span>
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="bg-white px-5 py-5">
                      <h3 className="text-[#0D0D0D] font-bold text-xl mb-0.5">{member.name}</h3>
                      <p className="text-sm mb-3" style={{ color: member.accentColor }}>{member.role}</p>
                      <p className="text-[#747474] text-[13px] leading-relaxed mb-4">{member.tagline}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#555] bg-stone-100 border border-stone-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 pt-4 border-t border-stone-100 text-[12px] text-stone-400 italic">
                        {member.funFact}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-2 mt-5">
              {TEAM.map((member, i) => (
                <button
                  key={member.name}
                  aria-label={`Go to ${member.name}`}
                  onClick={() => scrollToSlide(i)}
                  className="p-1.5 -m-1.5"
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: carouselIndex === i ? 20 : 6,
                      height: 6,
                      backgroundColor: carouselIndex === i ? member.accentColor : "#d4d4d4",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CULTURE STRIP ── */}
      <section className="border-t border-[#e4e4e4]">
        {[
          {
            label: "Our Philosophy",
            title: "Ship fast, iterate faster",
            body: "We default to working code over perfect planning. Real feedback from real users beats any internal spec. Velocity isn't recklessness — it's how we learn what actually matters.",
            img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781817213/IMG-20250708-WA0035_rhbbo7.jpg",
            imgSide: "right",
          },
          {
            label: "Our Standard",
            title: "Obsessed with the details",
            body: "Every pixel, every millisecond, every edge case. We don't ship anything we'd be embarrassed to show. The difference between good and great lives in the details nobody notices until they're missing.",
            img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781817256/BRAINPATH_UI_DESIGN_2_h9uter.jpg",
            imgSide: "left",
          },
          {
            label: "Our Culture",
            title: "Owned end-to-end",
            body: "No handoff culture here. Each engineer owns their work from architecture to production — and takes genuine pride in it. Accountability isn't assigned; it's built in.",
            img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781817483/Screenshot_2026-06-19_024639_ubg5au.png",
            imgSide: "right",
          },
        ].map(({ label, title, body, img, imgSide }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="border-b border-[#e4e4e4] last:border-b-0 grid md:grid-cols-2"
          >
            {/* Text panel */}
            <div
              className={`flex items-center px-6 md:px-16 py-16 md:py-24 bg-white ${
                imgSide === "left" ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="max-w-md">
                <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-5">
                  {label}
                </p>
                <h3 className="text-[clamp(28px,4vw,44px)] font-semibold text-[#0D0D0D] leading-[1.08] tracking-tight mb-6">
                  {title}
                </h3>
                <p className="text-[17px] text-[#747474] leading-relaxed">{body}</p>
              </div>
            </div>

            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className={`relative min-h-[320px] md:min-h-[440px] overflow-hidden ${
                imgSide === "left" ? "md:order-1" : "md:order-2"
              }`}
            >
              <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* ── TEAM SDLC PLAYBOOK ── */}
      <section className="border-t border-[#e4e4e4] bg-[#fafafa]">
        <div className="text-center pt-24 pb-8 px-6">
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#0D0D0D] leading-[1.08] tracking-tight">
            How we drive your success
          </h2>
          <p className="text-[17px] text-[#747474] mt-4 max-w-xl mx-auto">
            Our team operates like a finely tuned machine. Here is how each member steps into the Software Development Life Cycle to turn your vision into a reality.
          </p>
        </div>

        {TEAM_SDLC.map(({ phase, member, role, description, img, imgSide, accent, imgPosition }, i) => (
          <motion.div
            key={member}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="border-b border-[#e4e4e4] last:border-b-0 grid md:grid-cols-2"
          >
            {/* Text panel */}
            <div
              className={`flex items-center px-6 md:px-16 py-16 md:py-24 bg-[#fafafa] ${
                imgSide === "left" ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="max-w-md">
                <p className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: accent }}>
                  {phase}
                </p>
                <h3 className="text-[clamp(28px,4vw,44px)] font-semibold text-[#0D0D0D] leading-[1.08] tracking-tight mb-2">
                  {member}
                </h3>
                <p className="text-sm font-medium text-stone-500 mb-6 uppercase tracking-wider">
                  {role}
                </p>
                <p className="text-[17px] text-[#747474] leading-relaxed">{description}</p>
              </div>
            </div>

            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className={`relative min-h-[320px] md:min-h-[440px] overflow-hidden ${
                imgSide === "left" ? "md:order-1" : "md:order-2"
              }`}
            >
              <img 
                src={img} 
                alt={member} 
                className={`absolute inset-0 w-full h-full object-cover ${imgPosition || 'object-top'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        ))}
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
            Want to build something<br />great together?
          </h2>
          <p className="text-[#747474] text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
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