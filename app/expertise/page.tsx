"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, ChevronLeft, X, Menu, Code2, 
  Layout, Zap, Smartphone, Server, Monitor 
} from "lucide-react";
import { SocialIconRow } from "../components/social-links";

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
            <Link href="/#solutions" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Solutions</Link>
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
                <Link href="/expertise" onClick={() => setOpen(false)} className="text-[#F26A10] text-base font-semibold">Expertise</Link>
                <Link href="/#solutions" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Solutions</Link>
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
    skills: ["Systems", "Architecture", "Microservices"],
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
    skills: ["Figma", "Wireframes", "Prototyping"],
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
    skills: ["LLM", "Agents", "Process Automation"],
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
    skills: ["Android", "Kotlin", "Java"],
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
    skills: ["React", "Node.js", "PostgreSQL"],
    funFact: "Taking concepts smoothly from local development to the cloud.",
  },
];

// ─── EXPERTISE PAGE ───────────────────────────────────────────────────────────
export default function ExpertisePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === EXPERTISE.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? EXPERTISE.length - 1 : prev - 1));
  };

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Transitions every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]); // Reset timer whenever slide changes manually

  const currentItem = EXPERTISE[currentIndex];
  const Icon = currentItem.icon;

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

      {/* ── INTERACTIVE SLIDESHOW SHOWCASE (BORDERLESS) ── */}
      <section className="pb-32 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="relative w-full flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 min-h-[500px]">
            
            {/* Left Side: Text Content */}
            <div className="w-full md:w-[45%] flex flex-col justify-center relative z-10">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col h-full"
                >
                  {/* Badge */}
                  <div className="mb-6">
                    <span 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{ color: currentItem.accentColor, backgroundColor: currentItem.accentBg }}
                    >
                      <Icon className="w-4 h-4" /> {currentItem.role}
                    </span>
                  </div>

                  {/* Main Title & Tagline */}
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] leading-tight mb-4 tracking-tight">
                      {currentItem.name}
                    </h2>
                    <p className="text-stone-500 text-lg leading-relaxed mb-8">
                      {currentItem.tagline}
                    </p>
                  </div>

                  {/* Skills Map */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentItem.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Fun Fact Divider */}
                  <div className="pt-6 border-t border-stone-100">
                    <p className="text-sm text-stone-400 italic">
                      "{currentItem.funFact}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4 mt-12">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-[#0D0D0D] transition-all"
                  aria-label="Previous Area"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-[#0D0D0D] transition-all"
                  aria-label="Next Area"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Progress Indicators */}
                <div className="flex gap-2 ml-4">
                  {EXPERTISE.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: currentIndex === i ? "32px" : "8px",
                        height: "8px",
                        backgroundColor: currentIndex === i ? currentItem.accentColor : "#e4e4e4",
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Image Showcase */}
            <div className="w-full md:w-[55%] relative h-[350px] sm:h-[450px] md:h-[550px] bg-stone-100 overflow-hidden rounded-3xl shadow-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={currentItem.img} 
                    alt={currentItem.name} 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {/* Subtle vignette over the image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent md:hidden" />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

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