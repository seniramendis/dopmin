"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, ChevronDown, X, Menu,
  Layout, Zap, Smartphone, Server, Monitor,
  Cpu, Building2, Boxes, PenTool, MousePointerClick,
  BrainCircuit, Bot, Workflow
} from "lucide-react";
import { SiFigma, SiAndroid, SiKotlin, SiReact, SiNodedotjs, SiPostgresql } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Footer } from "../components/footer";
import { ExpertiseRoadmap } from "../components/expertise-roadmap";

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

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
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <Link
                href="/expertise"
                className="flex items-center gap-1 text-[14px] font-medium text-[#F26A10] hover:text-[#D94030] transition-colors"
              >
                Expertise
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[560px]"
                  >
                    <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-stone-100 p-3">
                      <p className="px-3 pt-2 pb-3 text-[11px] font-bold text-stone-400 uppercase tracking-[0.12em]">
                        Our Services
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {EXPERTISE.map((service) => (
                          <Link
                            key={service.name}
                            href="/expertise"
                            onClick={() => setServicesOpen(false)}
                            className="group flex gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors"
                          >
                            <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                              <img
                                src={service.img}
                                alt={service.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: `linear-gradient(0deg, ${service.accentColor}55, transparent 60%)` }}
                              />
                            </div>
                            <div className="min-w-0 py-0.5">
                              <p className="text-[13px] font-semibold text-[#0D0D0D] mb-0.5 group-hover:text-[#F26A10] transition-colors">
                                {service.name}
                              </p>
                              <p className="text-[12px] text-[#8a8a8a] leading-snug line-clamp-2">
                                {service.tagline}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/solutions" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Solutions</Link>
            <Link href="/work" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Work</Link>
            <Link href="/blog" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Blog</Link>
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
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex items-center justify-between w-full text-[#F26A10] text-base font-semibold"
                    aria-expanded={mobileServicesOpen}
                  >
                    Expertise
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 flex flex-col gap-2">
                          {EXPERTISE.map((service) => (
                            <Link
                              key={service.name}
                              href="/expertise"
                              onClick={() => {
                                setOpen(false);
                                setMobileServicesOpen(false);
                              }}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors"
                            >
                              <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                                <img src={service.img} alt={service.name} className="absolute inset-0 w-full h-full object-cover" />
                              </div>
                              <span className="text-stone-600 text-sm font-medium">{service.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link href="/solutions" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Solutions</Link>
                <Link href="/work" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Work</Link>
                <Link href="/blog" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Blog</Link>
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

// ─── EXPERTISE DATA ───────────────────────────────────────────────────────────
const EXPERTISE = [
  {
    name: "Custom Software",
    role: "Engineering & Architecture",
    tagline: "High-leverage software systems built for enterprise scale.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#F26A10",
    accentBg: "rgba(242,106,16,0.1)",
    icon: Monitor,
    skills: [
      { name: "Systems", icon: Cpu },
      { name: "Architecture", icon: Building2 },
      { name: "Microservices", icon: Boxes },
    ],
    funFact: "We build systems that compound in value, not technical debt.",
  },
  {
    name: "UI/UX Design",
    role: "Digital Interfaces",
    tagline: "Structured wireframes prioritizing intuitive user experiences.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#F0E080",
    accentBg: "rgba(240,224,128,0.2)",
    icon: Layout,
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "Wireframes", icon: PenTool },
      { name: "Prototyping", icon: MousePointerClick },
    ],
    funFact: "Clarity is the ultimate luxury in digital design.",
  },
  {
    name: "AI & Automation",
    role: "Agentic Workflows",
    tagline: "Eliminate manual tasks with autonomous AI agents.",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#D94030",
    accentBg: "rgba(217,64,48,0.1)",
    icon: Zap,
    skills: [
      { name: "LLM", icon: BrainCircuit },
      { name: "Agents", icon: Bot },
      { name: "Process Automation", icon: Workflow },
    ],
    funFact: "Your operations run leaner, faster, and smarter.",
  },
  {
    name: "Mobile Apps",
    role: "Native Platform",
    tagline: "Expert development for seamless mobile experiences.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#90E060",
    accentBg: "rgba(144,224,96,0.15)",
    icon: Smartphone,
    skills: [
      { name: "Android", icon: SiAndroid },
      { name: "Kotlin", icon: SiKotlin },
      { name: "Java", icon: FaJava },
    ],
    funFact: "Native performance combined with beautiful interfaces.",
  },
  {
    name: "Full-Stack Web",
    role: "Scalable Platforms",
    tagline: "Custom web applications driven by modern frameworks.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#007ACC",
    accentBg: "rgba(0,122,204,0.1)",
    icon: Server,
    skills: [
      { name: "React", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
    funFact: "Taking concepts smoothly from local development to the cloud.",
  },
];

// ─── EXPERTISE PAGE ───────────────────────────────────────────────────────────
export default function ExpertisePage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Nav />

      {/* ── HERO BAND ── */}
      <section className="relative pt-36 pb-12 px-6 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              Core Expertise
            </p>
            <h1 className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D] max-w-3xl">
              Expansive areas of expertise
            </h1>
            <p className="text-[18px] md:text-xl text-[#747474] max-w-2xl leading-relaxed">
              Five disciplines. One integrated team. We architect solutions to capture opportunities across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ANIMATED EXPERTISE ROADMAP (GSAP) ── */}
      <ExpertiseRoadmap items={EXPERTISE} />

      {/* ── SDLC STRIP ── */}
      <section className="border-t border-[#e4e4e4] pt-24 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto text-center px-6 mb-16">
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold text-[#0D0D0D] leading-tight mb-4">
            How we engineer solutions.
          </h2>
          <p className="text-[#747474] text-lg leading-relaxed">
            We don’t just write code; we partner with you through the entire Software Development Life Cycle (SDLC) to ensure your product scales flawlessly.
          </p>
        </div>

        {[
          {
            label: "Phase 1: Discovery & Planning",
            title: "API Architecture & Requirements",
            body: "Before any code is written, we align on your business logic. We design secure REST/GraphQL API contracts, map out robust PostgreSQL/MySQL database schemas, and define cloud infrastructure requirements. This blueprint guarantees we build the right system from day one.",
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop", 
            imgSide: "right",
          },
          {
            label: "Phase 2: UI/UX Design",
            title: "Interactive Prototyping",
            body: "We translate complex workflows into minimalistic, professional interfaces. Starting with low-fidelity wireframes, we iterate to high-fidelity Figma prototypes. You test and feel the user experience perfectly before engineering begins.",
            img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&auto=format&fit=crop", 
            imgSide: "left",
          },
          {
            label: "Phase 3: Core Engineering",
            title: "Full-Stack Development",
            body: "Our developers execute the build using resilient stacks like React, Next.js, and Node.js. We integrate third-party APIs, establish complex agentic AI workflows, and write clean, maintainable code managed through Agile sprint cycles.",
            img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop", 
            imgSide: "right",
          },
          {
            label: "Phase 4: Assurance & Delivery",
            title: "QA, Security & Deployment",
            body: "We don't ship broken features. We implement strict CI/CD pipelines, automated QA testing, and security checks. Finally, we containerize your app with Docker and deploy to auto-scaling cloud servers like AWS or GCP for zero-downtime launches.",
            img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80&auto=format&fit=crop",
            imgSide: "left",
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
              className={`flex items-center px-6 md:px-16 py-16 md:py-24 bg-[#fafafa] ${
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
                <p className="text-[16px] text-[#747474] leading-relaxed">{body}</p>
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
              <div className="absolute inset-0 bg-black/5" />
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
            Ready to architect<br />your next system?
          </h2>
          <p className="text-[#747474] text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            Let’s discuss your technical requirements and map out the architecture together.
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