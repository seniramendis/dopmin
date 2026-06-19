"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X, Menu, Code2, Shield, Layers, Cpu, Monitor, Smartphone, Layout, Zap } from "lucide-react";
import { SocialIconRow } from "../components/social-links"; // Adjust path if needed

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
            <Link href="/expertise" className="text-[14px] font-medium text-[#F26A10] hover:text-[#D94030] transition-colors">Expertise</Link>
            {["Solutions", "Work", "Contact"].map((l) => (
              <Link key={l} href={`/#${l.toLowerCase()}`} className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">{l}</Link>
            ))}
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
                <Link href="/expertise" onClick={() => setOpen(false)} className="text-[#F26A10] text-base font-semibold">Expertise</Link>
                {["Solutions", "Work", "Contact"].map((l) => (
                  <Link key={l} href={`/#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">{l}</Link>
                ))}
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

// ─── EXPERTISE DATA (Using Team Card Template) ────────────────────────────────
const EXPERTISE_AREAS = [
  {
    name: "Custom Software",
    role: "Enterprise Systems",
    tagline: "High-leverage software systems built to scale.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop",
    accentColor: "#F26A10",
    accentBg: "rgba(242,106,16,0.80)",
    icon: Monitor,
    skills: ["Architecture", "Databases", "Microservices"],
  },
  {
    name: "UI/UX Design",
    role: "Digital Interfaces",
    tagline: "Structured, minimalistic, and intuitive experiences.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80&auto=format&fit=crop",
    accentColor: "#F0E080",
    accentBg: "rgba(240,224,128,0.80)",
    icon: Layout,
    skills: ["Figma", "Wireframing", "Prototyping"],
  },
  {
    name: "AI & Automation",
    role: "Agentic Workflows",
    tagline: "Purpose-built AI agents that optimize operations.",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop",
    accentColor: "#D94030",
    accentBg: "rgba(217,64,48,0.80)",
    icon: Zap,
    skills: ["LLMs", "OpenAI", "Autonomy"],
  },
  {
    name: "Mobile Apps",
    role: "Native & Cross-Platform",
    tagline: "Native performance and beautiful interfaces on the go.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&auto=format&fit=crop",
    accentColor: "#90E060",
    accentBg: "rgba(144,224,96,0.80)",
    icon: Smartphone,
    skills: ["Android", "Kotlin", "Java"],
  },
  {
    name: "Full-Stack Web",
    role: "Web Applications",
    tagline: "Custom, high-performance web applications built to last.",
    img: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80&auto=format&fit=crop",
    accentColor: "#007ACC",
    accentBg: "rgba(0,122,204,0.80)",
    icon: Code2,
    skills: ["React", "Node.js", "PostgreSQL"],
  },
];

// ─── SDLC PROCESS (Using Culture Strip Template) ──────────────────────────────
const SDLC_PHASES = [
  {
    label: "Phase 01 · Discovery",
    title: "Planning & API Architecture",
    body: "Before a single line of code is written, we analyze your business logic and technical requirements. We design robust database schemas, establish clear API contracts, and map out a scalable cloud architecture. This guarantees we build the right system the first time.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    imgSide: "right",
  },
  {
    label: "Phase 02 · Design",
    title: "UI/UX & Interactive Prototyping",
    body: "We translate complex workflows into clean, minimalistic interfaces. Starting with structured wireframes, we iterate into high-fidelity, interactive prototypes. You get to see and feel exactly how the application will work before engineering begins.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800",
    imgSide: "left",
  },
  {
    label: "Phase 03 · Engineering",
    title: "Core Development & Integration",
    body: "Our developers build secure, high-performance systems using modern stacks like React, Node.js, and Spring Boot. We integrate third-party services, develop robust RESTful APIs, and embed agentic AI workflows directly into your core operations.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    imgSide: "right",
  },
  {
    label: "Phase 04 · Assurance",
    title: "Rigorous QA & Security Testing",
    body: "Shipping broken features is not an option. We implement comprehensive testing pipelines—including unit, integration, and end-to-end testing. Our QA process uncovers edge cases and ensures your data is secure against vulnerabilities.",
    img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    imgSide: "left",
  },
  {
    label: "Phase 05 · Delivery",
    title: "Deployment & Auto-Scaling",
    body: "A seamless transition from staging to production. We containerize applications using Docker and deploy them onto resilient cloud infrastructures like AWS or GCP. We ensure your system auto-scales to handle traffic spikes with zero downtime.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    imgSide: "right",
  },
];

// ─── EXPERTISE PAGE ───────────────────────────────────────────────────────────
export default function ExpertisePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slideWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : el.clientWidth;
    const index = Math.round(el.scrollLeft / slideWidth);
    setCarouselIndex(Math.max(0, Math.min(index, EXPERTISE_AREAS.length - 1)));
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
            className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3"
          >
            Core Expertise
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D]"
          >
            Expansive areas of expertise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl text-[#747474] max-w-2xl mx-auto"
          >
            Five disciplines. One integrated team. We architect solutions to capture opportunities across industries.
          </motion.p>
        </div>
      </section>

      {/* ── EXPERTISE CARDS (Using Team template style) ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Desktop: 5-col cinematic grid */}
          <div className="hidden md:flex md:flex-wrap md:justify-center gap-5">
            {EXPERTISE_AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer w-[calc(20%-16px)] min-w-[200px]"
                  style={{ aspectRatio: "3/4" }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <img src={area.img} alt={area.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${area.accentBg} 0%, rgba(0,0,0,0.5) 55%, transparent 100%)` }} />

                  <div className="absolute top-0 left-0 right-0 h-[4px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-tr-sm"
                    style={{ backgroundColor: area.accentColor }} />

                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                      style={{ color: area.accentColor, backgroundColor: "rgba(0,0,0,0.5)", borderColor: `${area.accentColor}40` }}>
                      <Icon className="w-3 h-3" /> Area {i + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                      <div className="flex flex-wrap gap-1.5">
                        {area.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded text-[9px] font-semibold text-white/90 bg-white/15 border border-white/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-white font-bold text-lg leading-snug drop-shadow mb-1">{area.name}</p>
                    <p className="text-white/60 text-[12px] font-medium leading-snug group-hover:text-white/80 transition-colors">{area.role}</p>
                    <p className="mt-2 text-[11px] text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 delay-75">
                      {area.tagline}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden">
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-1 pb-2 -mx-1 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {EXPERTISE_AREAS.map((area, i) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="snap-center shrink-0 w-[85%] rounded-2xl overflow-hidden border border-[#e4e4e4]"
                  >
                    <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                      <img
                        src={area.img}
                        alt={area.name}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                          style={{ color: area.accentColor, backgroundColor: "rgba(0,0,0,0.55)", borderColor: `${area.accentColor}50` }}>
                          <Icon className="w-3 h-3" /> {area.name}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white px-5 py-5">
                      <h3 className="text-[#0D0D0D] font-bold text-xl mb-0.5">{area.name}</h3>
                      <p className="text-sm mb-3" style={{ color: area.accentColor }}>{area.role}</p>
                      <p className="text-[#747474] text-[13px] leading-relaxed mb-4">{area.tagline}</p>
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#555] bg-stone-100 border border-stone-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-center items-center gap-2 mt-5">
              {EXPERTISE_AREAS.map((area, i) => (
                <button
                  key={area.name}
                  aria-label={`Go to ${area.name}`}
                  onClick={() => scrollToSlide(i)}
                  className="p-1.5 -m-1.5"
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: carouselIndex === i ? 20 : 6,
                      height: 6,
                      backgroundColor: carouselIndex === i ? area.accentColor : "#d4d4d4",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SDLC PROCESS STRIP (Using Culture Strip template) ── */}
      <section className="border-t border-[#e4e4e4] mt-12">
        <div className="text-center pt-24 pb-8">
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#0D0D0D] leading-[1.08] tracking-tight">
            How we engineer solutions
          </h2>
          <p className="text-[17px] text-[#747474] mt-4 max-w-xl mx-auto">
            From the initial blueprint to post-launch scaling, our full Software Development Life Cycle (SDLC) guarantees results at every stage.
          </p>
        </div>

        {SDLC_PHASES.map(({ label, title, body, img, imgSide }, i) => (
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
            Ready to upgrade your<br />digital infrastructure?
          </h2>
          <p className="text-[#747474] text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            Let’s discuss your technical requirements and map out the architecture.
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