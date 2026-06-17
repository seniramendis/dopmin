"use client";

import { useRef, useState } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  WifiOff, Bot, CloudUpload, ShoppingBag,
  ArrowRight, ChevronRight, X, Check, Menu, ExternalLink,
  TrendingUp, Clock, Shield,
} from "lucide-react";
import Image from "next/image";

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

function useScrollInView(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#" aria-label="DopMin home" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5 bg-stone-100 transition-transform duration-700 group-hover:rotate-180">
            <Image
              src="/assets/images/dopmin.jpg"
              alt="Dopmin logo"
              fill
              sizes="40px"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#0D0D0D]">DOPMIN</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {["Expertise", "Solutions", "Work", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[15px] font-medium text-stone-500 hover:text-[#F26A10] transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 text-[15px] font-semibold bg-[#0D0D0D] text-white px-6 py-2.5 rounded-lg hover:bg-[#D94030] transition-colors outline-none shadow-md hover:-translate-y-0.5"
        >
          Book a Free Audit <ChevronRight className="w-4 h-4" />
        </a>

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
            className="md:hidden overflow-hidden bg-white border-t border-stone-100"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {["Expertise", "Solutions", "Work", "Contact"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors"
                >
                  {l}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-center text-sm font-semibold bg-[#0D0D0D] text-white px-4 py-3 rounded-lg hover:bg-[#D94030] transition-colors mt-2"
              >
                Book a Free Audit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 xl:px-24 max-w-[1920px] mx-auto flex flex-col justify-end min-h-[85vh]">
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-2/3 h-[70vh] -z-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(242,106,16,0.15), rgba(255,215,0,0.10) 50%, transparent 80%)",
        }}
      />

      <div className="max-w-[1150px] relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-[clamp(40px,8vw,96px)] font-semibold text-[#0D0D0D] leading-[1.05] tracking-tight mb-8"
        >
          Engineering digital{" "}
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D94030] via-[#F26A10] to-[#FFD700]">
            luxury &amp; scale.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-xl md:text-2xl text-[#747474] font-light max-w-2xl leading-relaxed mb-12"
        >
          DopMin fuses enterprise full-stack engineering with autonomous AI workflows &mdash; so
          your operations run leaner, faster, and smarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a
            href="#solutions"
            className="group inline-flex items-center gap-2 bg-[#F26A10] hover:bg-[#D94030] text-white font-semibold px-8 py-4 rounded-lg transition-all text-sm md:text-base shadow-sm outline-none"
          >
            Explore Our Solutions
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#expertise"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-400 px-8 py-4 rounded-lg transition-all text-sm md:text-base font-medium outline-none"
          >
            View Tech Stack <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── LOGO TICKER ──────────────────────────────────────────────────────────────
const BRANDS = [
  "Softlogic", "Brandix", "Dialog Axiata", "MAS Holdings",
  "PickMe", "Hemas", "Sampath Bank", "Cargills", "Virtusa",
];

function LogoTicker() {
  return (
    <section
      className="py-12 border-y border-[#e4e4e4] bg-[#fafafa] overflow-hidden"
      aria-label="Client brands"
    >
      <p className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-[0.18em] mb-7">
        Trusted by innovative brands across logistics, healthcare &amp; retail
      </p>
      <div
        aria-hidden
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* animate-marquee defined in globals.css */}
        <div className="animate-marquee">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={i}
              className="text-[#d4d4d4] hover:text-[#a2a2a2] transition-colors font-bold text-xl md:text-2xl tracking-wide select-none cursor-default shrink-0"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERTISE ────────────────────────────────────────────────────────────────
const services = [
  {
    icon: WifiOff,
    title: "Offline-First Web Apps",
    tags: ["PWA", "React", "Sync"],
    desc: "Progressive Web Apps that operate in low-connectivity environments. Users never see a failure screen.",
    color: "#F0E080",
  },
  {
    icon: Bot,
    title: "Agentic AI Automation",
    tags: ["LLM", "Agents", "OpenAI"],
    desc: "LLM-powered agents that handle intake, triage, and follow-up without a human in the loop.",
    color: "#D94030",
  },
  {
    icon: CloudUpload,
    title: "Legacy to Cloud Migration",
    tags: ["AWS", "GCP", "Docker"],
    desc: "Extract your monolith from on-premise hardware and redeploy as a resilient, auto-scaling cloud architecture.",
    color: "#90E060",
  },
  {
    icon: ShoppingBag,
    title: "Headless E-commerce",
    tags: ["Shopify", "Next.js", "Edge"],
    desc: "Decouple your storefront from the commerce engine — sub-second page loads and app-grade checkout.",
    color: "#F26A10",
  },
];

function Expertise() {
  const { ref, inView } = useScrollInView(0.1);
  return (
    <section id="expertise" className="py-24 md:py-32 px-6 md:px-12 xl:px-24 max-w-[1920px] mx-auto bg-white">
      <div className="mb-16 md:mb-24">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
            Core Expertise
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D]"
          >
            Expansive areas of expertise
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#747474]">
            Four disciplines. One integrated team. We architect solutions to capture opportunities across industries.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="group relative h-[480px] md:h-[560px] w-full bg-[#111111] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-[#222]"
            >
              {/* Colour glow */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0"
                style={{ background: `radial-gradient(circle at center, ${item.color}, transparent 70%)` }}
              />

              {/* Tags */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/20 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-10 transition-transform duration-500 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div
                  className="h-1 w-12 mb-6 transition-all duration-500 group-hover:w-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="mb-3 opacity-60">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 leading-tight" style={{ color: "#ffffff" }}>{item.title}</h3>
                <p className="text-white/70 transition-opacity duration-500 text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// ─── COMPARE ──────────────────────────────────────────────────────────────────
const compareRows = [
  { label: "Responsiveness", before: "Manual triaging by staff",       after: "AI agent responds in < 2 sec" },
  { label: "Uptime model",   before: "Restart after failure",          after: "Self-healing, auto-recovery" },
  { label: "Reporting",      before: "Weekly CSV exports",             after: "Real-time dashboards & alerts" },
  { label: "Scalability",    before: "Provisioned for peak, idle 80%", after: "Auto-scales to demand" },
  { label: "Connectivity",   before: "Requires stable internet",       after: "Works offline, syncs on reconnect" },
];

function Compare() {
  const { ref, inView } = useScrollInView(0.1);
  return (
    <section id="solutions" className="py-28 px-6 bg-[#fafafa] border-y border-[#e4e4e4]">
      <div className="max-w-[1920px] mx-auto md:px-12 xl:px-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-14 text-center"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              The DopMin Difference
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(32px,5vw,64px)] font-semibold text-[#0D0D0D] leading-[1.1]"
            >
              Standard vs. Intelligent
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#747474] mt-6 text-xl max-w-2xl mx-auto leading-relaxed">
              Most agencies ship software. We ship leverage &mdash; systems that compound in value after launch.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="rounded-2xl overflow-hidden border border-[#e4e4e4] bg-white shadow-sm"
          >
            {/* Header row */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#f5f5f5] border-b border-[#e4e4e4]">
              <div className="px-6 py-5 text-xs font-bold text-[#747474] uppercase tracking-wider">Dimension</div>
              <div className="px-6 py-5 text-xs font-bold text-[#747474] uppercase tracking-wider border-l border-[#e4e4e4]">
                Standard App
              </div>
              <div className="px-6 py-5 text-xs font-bold text-white uppercase tracking-wider border-l border-[#e91d27] bg-[#e91d27]">
                DopMin Systems
              </div>
            </div>

            {compareRows.map(({ label, before, after }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className={`grid grid-cols-[1.2fr_1fr_1fr]${i < compareRows.length - 1 ? " border-b border-[#e4e4e4]" : ""}`}
              >
                <div className="px-6 py-5 text-base font-semibold text-[#0D0D0D]">{label}</div>
                <div className="px-6 py-5 border-l border-[#e4e4e4] flex items-center gap-3">
                  <X className="w-5 h-5 text-[#D94030] shrink-0" />
                  <span className="text-sm text-[#747474]">{before}</span>
                </div>
                <div className="px-6 py-5 border-l border-[#e91d27]/10 bg-[#e91d27]/5 flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#90E060] shrink-0" />
                  <span className="text-sm font-medium text-[#0D0D0D]">{after}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── WORK / CASE STUDIES ──────────────────────────────────────────────────────
const caseStudies = [
  {
    tag: "Healthcare · PWA",
    title: "Hospital Ward Management System",
    outcome: "Reduced nurse response time by 60% in low-connectivity wards.",
    metrics: [
      { icon: TrendingUp, value: "60%",  label: "Faster response" },
      { icon: WifiOff,    value: "100%", label: "Offline capable" },
    ],
    accent: "#D94030",
  },
  {
    tag: "Logistics · AI Automation",
    title: "AI Dispatch & Routing Agent",
    outcome: "Automated 85% of manual dispatch decisions for a regional courier network.",
    metrics: [
      { icon: Bot,   value: "85%",   label: "Automation rate" },
      { icon: Clock, value: "4 hrs", label: "Daily hours saved" },
    ],
    accent: "#F26A10",
  },
  {
    tag: "Retail · Cloud Migration",
    title: "Omnichannel Commerce Platform",
    outcome: "Migrated 12-year-old monolith to cloud, cutting infrastructure cost by 40%.",
    metrics: [
      { icon: CloudUpload, value: "40%",   label: "Cost reduction" },
      { icon: Shield,      value: "99.9%", label: "Uptime achieved" },
    ],
    accent: "#90E060",
  },
];

function Work() {
  const { ref, inView } = useScrollInView(0.1);
  return (
    <section id="work" className="py-28 px-6 bg-white">
      <div className="max-w-[1920px] mx-auto md:px-12 xl:px-24">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
            Selected Work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,5vw,64px)] font-semibold text-[#0D0D0D] leading-[1.1] max-w-lg"
          >
            Results we&apos;ve
            <br />
            delivered.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {caseStudies.map(({ tag, title, outcome, metrics, accent }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl border border-[#e4e4e4] p-8 bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col"
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.1em] mb-6 px-3 py-1.5 rounded-full w-fit"
                style={{ color: accent, background: `${accent}14`, border: `1px solid ${accent}30` }}
              >
                {tag}
              </p>
              <h3 className="text-2xl font-semibold text-[#0D0D0D] mb-4 leading-snug">{title}</h3>
              <p className="text-base text-[#747474] leading-relaxed mb-8 flex-1">{outcome}</p>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#e4e4e4]">
                {metrics.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: accent }} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#0D0D0D] leading-none">{value}</div>
                      <div className="text-xs text-[#747474] font-medium mt-1">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const { ref, inView } = useScrollInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white border-t border-[#e4e4e4]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,5vw,64px)] font-semibold text-[#0D0D0D] leading-[1.1] mb-6"
          >
            Ready to stop manual work?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#747474] text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            Walk us through your current stack. We&apos;ll identify your highest-leverage automation
            opportunities &mdash; no pitch, no obligation.
          </motion.p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#90E060]/10 border border-[#90E060]/30 rounded-2xl py-12 px-8"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-[#90E060]/20 border border-[#90E060]/40">
                  <Check className="w-6 h-6 text-[#3a8000]" />
                </div>
                <h3 className="text-[#0D0D0D] font-bold text-2xl mb-2">You&apos;re on the list.</h3>
                <p className="text-[#747474] text-base">
                  We&apos;ll reach out within one business day to schedule your audit.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                variants={fadeUp}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-left"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    className="bg-[#fafafa] border border-[#e4e4e4] focus:border-[#F26A10]/50 text-[#0D0D0D] placeholder-[#a2a2a2] rounded-xl px-5 py-4 text-base outline-none transition-all"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Work email"
                    aria-label="Work email"
                    className="bg-[#fafafa] border border-[#e4e4e4] focus:border-[#F26A10]/50 text-[#0D0D0D] placeholder-[#a2a2a2] rounded-xl px-5 py-4 text-base outline-none transition-all"
                  />
                </div>
                <textarea
                  placeholder="Briefly describe your current challenge or stack..."
                  aria-label="Your message"
                  rows={4}
                  className="bg-[#fafafa] border border-[#e4e4e4] focus:border-[#F26A10]/50 text-[#0D0D0D] placeholder-[#a2a2a2] rounded-xl px-5 py-4 text-base outline-none transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 self-stretch sm:self-end inline-flex items-center justify-center gap-2 bg-[#F26A10] hover:bg-[#d95e0e] disabled:opacity-70 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base shadow-sm outline-none hover:-translate-y-0.5"
                >
                  {loading ? "Sending…" : (
                    <>Request Free Audit <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] overflow-hidden pt-32 pb-12 px-6 md:px-12 xl:px-24">
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(242,106,16,0.10), rgba(255,215,0,0.05) 50%, transparent 80%)",
        }}
      />

      {/* Watermark logo */}
      <div
        aria-hidden
        className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] opacity-[0.04] pointer-events-none rounded-full overflow-hidden grayscale blur-sm"
      >
        <Image src="/assets/images/dopmin.jpg" alt="" fill className="object-cover" unoptimized />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto">
        {/* Big CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24 border-b border-white/10 pb-20">
          <div className="max-w-2xl">
            <h4 className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6" style={{ color: "#ffffff" }}>
              Ready to architect the future?
            </h4>
            <p className="text-[#a2a2a2] text-xl">
              Let&apos;s discuss your next massive digital transformation.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-[#e91d27] hover:bg-[#D94030] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:-translate-y-1"
          >
            Get in touch
          </a>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-[#a2a2a2] text-base">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-8 h-8 shrink-0 rounded-full overflow-hidden bg-gray-700">
                <Image
                  src="/assets/images/dopmin.jpg"
                  alt="Dopmin"
                  fill
                  sizes="32px"
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">DOPMIN</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Capabilities</span>
            <a href="#expertise" className="hover:text-white transition-colors">Design</a>
            <a href="#expertise" className="hover:text-white transition-colors">Engineering</a>
            <a href="#expertise" className="hover:text-white transition-colors">AI Workflows</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Company</span>
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Legal</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="mt-16 text-[#747474] flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
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

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function DopMinPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Nav />
      <Hero />
      <LogoTicker />
      <Expertise />
      <Compare />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}