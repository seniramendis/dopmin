"use client";

import { useRef, useState } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import {
  WifiOff, Bot, CloudUpload, ShoppingBag,
  ArrowRight, ChevronRight, X, Check, Menu, ExternalLink,
} from "lucide-react";
import Image from "next/image";

// Logo colors: Yellow #F0E080 · Red #D94030 · Green #90E060 · Orange #F26A10 · Black #0D0D0D

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function useScrollInView(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

// NAV
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#">
          <Image src="/assets/images/dopmin.jpeg" alt="DopMin" width={108} height={36} className="h-9 w-auto object-contain" priority />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {["Expertise","Solutions","Work"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-stone-500 hover:text-stone-900 transition-colors font-medium">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold bg-[#F26A10] text-white px-4 py-2 rounded-lg hover:bg-[#d95e0e] transition-colors">
          Book an Audit <ChevronRight className="w-3.5 h-3.5" />
        </a>
        <button className="md:hidden text-stone-400" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
            className="md:hidden overflow-hidden bg-white border-t border-stone-100">
            <div className="px-6 py-5 flex flex-col gap-4">
              {["Expertise","Solutions","Work"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-stone-600 text-sm font-medium">{l}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="text-center text-sm font-semibold bg-[#F26A10] text-white px-4 py-2.5 rounded-lg">Book an Audit</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// HERO
function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, delay:0.1 }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D94030] bg-[#D94030]/8 border border-[#D94030]/15 px-3.5 py-1.5 rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D94030]" />
          Now accepting Q3 2025 partnerships · Sri Lanka & Remote
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.18, ease:[0.22,1,0.36,1] }}
          className="text-5xl md:text-[68px] font-extrabold text-[#0D0D0D] leading-[1.06] tracking-tight mb-6">
          We build systems<br />
          <span className="relative inline-block">
            that think for you.
            <span className="absolute left-0 -bottom-1 h-[4px] w-full bg-[#F26A10] rounded-full" />
          </span>
        </motion.h1>

        <motion.p initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.3, ease:[0.22,1,0.36,1] }}
          className="text-lg text-stone-400 max-w-xl mx-auto leading-relaxed mb-10 mt-6">
          DopMin fuses enterprise full-stack engineering with autonomous AI workflows —
          so your operations run leaner, faster, and smarter without adding headcount.
        </motion.p>

        <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.42 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#solutions" className="group inline-flex items-center gap-2 bg-[#F26A10] hover:bg-[#d95e0e] text-white font-semibold px-6 py-3 rounded-lg transition-all text-sm">
            Explore Our Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#expertise" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-400 px-6 py-3 rounded-lg transition-all text-sm font-medium">
            View Tech Stack <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.7, delay:0.65 }}
          className="mt-20 pt-10 border-t border-stone-100 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[{ num:"40+", label:"Deployments" }, { num:"99.9%", label:"Uptime SLA" }, { num:"3×", label:"Efficiency gain" }].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold text-[#0D0D0D]">{s.num}</div>
              <div className="text-xs text-stone-400 mt-0.5 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// TICKER
const BRANDS = ["Softlogic","Brandix","Dialog Axiata","MAS Holdings","PickMe","Hemas","Sampath Bank","Cargills","Virtusa"];
function LogoTicker() {
  return (
    <section className="py-12 border-y border-stone-100 bg-stone-50 overflow-hidden">
      <p className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-[0.18em] mb-7">
        Trusted by innovative brands across logistics, healthcare & retail
      </p>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
          {[...BRANDS,...BRANDS].map((b,i) => (
            <span key={i} className="text-stone-300 font-bold text-sm tracking-wide select-none">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// EXPERTISE
const services = [
  { icon: WifiOff, title:"Offline-First Web Apps", tag:"PWA Engineering", desc:"Progressive Web Apps that work in low-connectivity environments — hospitals, warehouse floors, remote logistics hubs. Your users never see a spinner.", color:"#F0E080", iconColor:"#8a7a00" },
  { icon: Bot,     title:"Agentic AI Automation",  tag:"LLM Workflows",   desc:"LLM-powered agents that handle intake, triage, scheduling, and follow-up without a human in the loop — from AI receptionists to autonomous processors.", color:"#D94030", iconColor:"#D94030" },
  { icon: CloudUpload, title:"Legacy to Cloud Migration", tag:"Infrastructure", desc:"Extract your monolith from on-premise hardware and redeploy as a resilient, auto-scaling cloud architecture on AWS or GCP — zero data loss.", color:"#90E060", iconColor:"#3a8000" },
  { icon: ShoppingBag, title:"Headless E-commerce",  tag:"Commerce Stack", desc:"Decouple your frontend from the commerce engine — sub-second page loads, edge-cached product pages, and native app–grade checkout.", color:"#F26A10", iconColor:"#F26A10" },
];

function Expertise() {
  const { ref, inView } = useScrollInView();
  return (
    <section id="expertise" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView?"visible":"hidden"} className="mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">Core Expertise</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-[#0D0D0D] tracking-tight max-w-md leading-tight">
            Four disciplines.<br />One integrated team.
          </motion.h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView?"visible":"hidden"} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(({ icon:Icon, title, tag, desc, color, iconColor }) => (
            <motion.div key={title} variants={fadeUp}
              className="rounded-2xl p-6 border border-stone-100 hover:shadow-md hover:border-stone-200 transition-all duration-300 cursor-default bg-white">
              <div className="mb-5 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor:`${color}22`, border:`1.5px solid ${color}55` }}>
                <Icon className="w-5 h-5" style={{ color:iconColor }} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400 mb-2">{tag}</p>
              <h3 className="text-sm font-bold text-[#0D0D0D] mb-3 leading-snug">{title}</h3>
              <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>
              <div className="mt-5 h-0.5 w-8 rounded-full" style={{ backgroundColor:color }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// COMPARE
const compareRows = [
  { label:"Responsiveness", before:"Manual triaging by staff",       after:"AI agent responds in < 2 sec" },
  { label:"Uptime model",   before:"Restart after failure",          after:"Self-healing, auto-recovery" },
  { label:"Reporting",      before:"Weekly CSV exports",             after:"Real-time dashboards + alerts" },
  { label:"Scalability",    before:"Provisioned for peak, idle 80%", after:"Auto-scales to demand" },
  { label:"Connectivity",   before:"Requires stable internet",       after:"Works offline, syncs on reconnect" },
];

function Compare() {
  const { ref, inView } = useScrollInView(0.1);
  return (
    <section id="solutions" className="py-28 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView?"visible":"hidden"} className="mb-14 text-center">
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">The DopMin Difference</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-[#0D0D0D] tracking-tight">Standard vs. Intelligent</motion.h2>
          <motion.p variants={fadeUp} className="text-stone-400 mt-4 text-base max-w-md mx-auto leading-relaxed">
            Most agencies ship software. We ship leverage — systems that compound in value after launch.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView?"visible":"hidden"}
          className="rounded-2xl overflow-hidden border border-stone-200 bg-white">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-stone-50 border-b border-stone-200">
            <div className="px-5 py-3.5 text-[10px] font-bold text-stone-400 uppercase tracking-[0.1em]">Dimension</div>
            <div className="px-5 py-3.5 text-[10px] font-bold text-stone-400 uppercase tracking-[0.1em] border-l border-stone-200">Standard App</div>
            <div className="px-5 py-3.5 text-[10px] font-bold text-[#F26A10] uppercase tracking-[0.1em] border-l border-[#F26A10]/20 bg-[#F26A10]/5">DopMin Systems</div>
          </div>
          {compareRows.map(({ label, before, after }, i) => (
            <motion.div key={label} variants={fadeUp}
              className={`grid grid-cols-[1.2fr_1fr_1fr] ${i < compareRows.length-1 ? "border-b border-stone-100" : ""}`}>
              <div className="px-5 py-4 text-sm font-semibold text-[#0D0D0D]">{label}</div>
              <div className="px-5 py-4 border-l border-stone-100 flex items-center gap-2">
                <X className="w-3.5 h-3.5 text-[#D94030] shrink-0" />
                <span className="text-sm text-stone-400">{before}</span>
              </div>
              <div className="px-5 py-4 border-l border-[#F26A10]/15 bg-[#F26A10]/[0.03] flex items-center gap-2">
                <Check className="w-3.5 h-3.5 shrink-0" style={{ color:"#3a8000" }} />
                <span className="text-sm text-stone-700">{after}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CONTACT
function Contact() {
  const { ref, inView } = useScrollInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  return (
    <section id="contact" className="py-32 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView?"visible":"hidden"}>
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-5">Free Architecture Audit</motion.p>
          <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-[#0D0D0D] tracking-tight leading-[1.06] mb-5">
            Ready to stop<br />
            <span className="relative inline-block">
              manual work?
              <span className="absolute left-0 -bottom-1 h-[4px] w-full bg-[#F26A10] rounded-full" />
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-400 text-base max-w-md mx-auto mb-12 leading-relaxed mt-5">
            Walk us through your current stack. We'll identify your three highest-leverage automation opportunities — no pitch, no obligation.
          </motion.p>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="thanks" initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
                className="bg-[#90E060]/10 border border-[#90E060]/30 rounded-2xl py-12 px-8">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-4"
                  style={{ backgroundColor:"#90E06020", border:"1.5px solid #90E06060" }}>
                  <Check className="w-5 h-5" style={{ color:"#3a8000" }} />
                </div>
                <h3 className="text-[#0D0D0D] font-bold text-lg mb-2">You're on the list.</h3>
                <p className="text-stone-400 text-sm">We'll reach out within one business day to schedule your audit.</p>
              </motion.div>
            ) : (
              <motion.form key="form" variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input required type="text" placeholder="Your name"
                  className="flex-1 bg-stone-50 border border-stone-200 focus:border-[#F26A10]/50 focus:ring-2 focus:ring-[#F26A10]/10 text-[#0D0D0D] placeholder-stone-400 rounded-lg px-4 py-3 text-sm outline-none transition-all" />
                <input required type="email" placeholder="Work email"
                  className="flex-1 bg-stone-50 border border-stone-200 focus:border-[#F26A10]/50 focus:ring-2 focus:ring-[#F26A10]/10 text-[#0D0D0D] placeholder-stone-400 rounded-lg px-4 py-3 text-sm outline-none transition-all" />
                <button type="submit"
                  className="whitespace-nowrap inline-flex items-center gap-2 bg-[#F26A10] hover:bg-[#d95e0e] text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm">
                  Request Free Audit <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          <motion.p variants={fadeUp} className="mt-5 text-xs text-stone-300">
            No spam. We don't share your data. Typically responded to within 24 hours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// FOOTER
function Footer() {
  return (
    <footer className="border-t border-stone-100 px-6 py-10 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Image src="/assets/images/dopmin.jpeg" alt="DopMin" width={90} height={30} className="h-7 w-auto object-contain" />
        <p className="text-xs text-stone-300 text-center">© {new Date().getFullYear()} DopMin. Enterprise-grade technology, Sri Lanka & Remote.</p>
        <div className="flex gap-5 text-xs text-stone-300">
          <a href="#" className="hover:text-stone-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-stone-500 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}

// PAGE
export default function DopMinPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }
      `}</style>
      <Nav />
      <Hero />
      <LogoTicker />
      <Expertise />
      <Compare />
      <Contact />
      <Footer />
    </main>
  );
}