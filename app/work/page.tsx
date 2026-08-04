"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X, Menu } from "lucide-react";
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
            <Link href="/expertise" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Expertise</Link>
            <Link href="/solutions" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">Solutions</Link>
            <Link href="/work" className="text-[14px] font-medium text-[#F26A10] hover:text-[#D94030] transition-colors">Work</Link>
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
                <Link href="/expertise" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Expertise</Link>
                <Link href="/solutions" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Solutions</Link>
                <Link href="/work" onClick={() => setOpen(false)} className="text-[#F26A10] text-base font-semibold">Work</Link>
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

// ─── ENGAGEMENT PROCESS DATA ───────────────────────────────────────────────────
const PROCESS = [
  {
    step: "01",
    title: "You reach out",
    duration: "Day 0",
    body: "Tell us about your project through the contact form, WhatsApp, or by booking a free audit call. Share your goals, rough timeline, and budget range — no pitch deck required.",
    points: ["Contact form or email", "WhatsApp for quick questions", "Free 30-minute audit call"],
    img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Reviewing a project brief on a phone screen",
  },
  {
    step: "02",
    title: "Discovery call",
    duration: "Within 1 business day",
    body: "We hop on a call to understand your business, users, and constraints. We ask sharp questions and identify the highest-leverage place to start.",
    points: ["Requirements & goals walkthrough", "Technical feasibility check", "Rough timeline & budget alignment"],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Team discussing project requirements at a desk",
  },
  {
    step: "03",
    title: "Proposal & roadmap",
    duration: "2–4 days later",
    body: "You receive a clear, written proposal: scope of work, milestones, pricing, and an estimated delivery date. Once approved, we schedule a kickoff and lock the start date.",
    points: ["Fixed scope & milestones", "Transparent pricing, no surprises", "Signed agreement & kickoff date"],
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Wireframe and roadmap sketches on paper",
  },
  {
    step: "04",
    title: "Build in sprints",
    duration: "Your project's active period",
    body: "We work in short, one-to-two week sprints. Design, engineering, and QA run in parallel. You get a live staging link from week one, so you're watching the product take shape.",
    points: ["Weekly demo & progress update", "Staging environment from sprint 1", "Direct access to the team building it"],
    img: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Developer building the product on a laptop",
  },
  {
    step: "05",
    title: "QA & deployment",
    duration: "Final sprint",
    body: "Before launch we run automated tests, security checks, and a full QA pass. We containerize and deploy to auto-scaling cloud infrastructure, then monitor closely for the first 48 hours.",
    points: ["Automated + manual QA pass", "CI/CD pipeline, staged rollout", "Post-launch monitoring window"],
    img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Deployment and security checks on a screen",
  },
  {
    step: "06",
    title: "Ongoing partnership",
    duration: "After launch, continuously",
    body: "Launch is the start, not the finish line. We stay engaged through a dedicated support channel, scheduled check-ins, and proactive monitoring as your product grows.",
    points: ["Dedicated support channel", "Monthly performance check-ins", "Priority bug-fix & maintenance"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Monitoring dashboard for an ongoing product",
  },
];

// ─── COMMUNICATION CHANNELS ─────────────────────────────────────────────────────
const CHANNELS = [
  { title: "Dedicated chat channel", body: "A shared thread with the actual engineers on your build — not a generic support inbox." },
  { title: "Weekly progress updates", body: "A short written update every week: what shipped, what's next, and anything that needs your input." },
  { title: "Live staging link", body: "Click into the real, working build at any point during development. See progress, not just promises." },
  { title: "Monthly check-in calls", body: "After launch, a recurring call to review performance and plan the next iteration." },
];

// ─── SELECTED WORK (case studies) ──────────────────────────────────────────────
const caseStudies = [
  {
    tag: "Healthcare · PWA",
    title: "Hospital Ward Management System",
    outcome: "Reduced nurse response time by 60% in low-connectivity wards.",
    metrics: [
      { value: "60%", label: "Faster response" },
      { value: "100%", label: "Offline capable" },
    ],
  },
  {
    tag: "Logistics · AI Automation",
    title: "AI Dispatch & Routing Agent",
    outcome: "Automated 85% of manual dispatch decisions for a regional courier network.",
    metrics: [
      { value: "85%", label: "Automation rate" },
      { value: "4 hrs", label: "Daily hours saved" },
    ],
  },
  {
    tag: "Retail · Cloud Migration",
    title: "Omnichannel Commerce Platform",
    outcome: "Migrated 12-year-old monolith to cloud, cutting infrastructure cost by 40%.",
    metrics: [
      { value: "40%", label: "Cost reduction" },
      { value: "99.9%", label: "Uptime achieved" },
    ],
  },
];

// ─── WORK PAGE ──────────────────────────────────────────────────────────────────
export default function WorkPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              How We Work
            </p>
            <h1 className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D] max-w-3xl">
              From first message to<br />long-term partnership.
            </h1>
            <p className="text-[18px] md:text-xl text-[#747474] max-w-2xl leading-relaxed">
              A transparent, six-step process — how you reach us, how we scope and build your
              project, and how we stay in your corner long after launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="pb-8">
        {PROCESS.map(({ step, title, duration, body, points, img, imgAlt }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="border-t border-[#e4e4e4] grid md:grid-cols-2"
          >
            {/* Text panel */}
            <div
              className={`flex items-center px-6 md:px-16 py-16 md:py-24 ${
                i % 2 === 1 ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="max-w-md">
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-sm font-bold text-[#a2a2a2] tracking-[0.1em]">{step}</span>
                  <span className="text-xs font-medium text-[#a2a2a2]">{duration}</span>
                </div>
                <h2 className="text-[clamp(26px,3.5vw,38px)] font-semibold text-[#0D0D0D] leading-[1.15] tracking-tight mb-5">
                  {title}
                </h2>
                <p className="text-[16px] text-[#747474] leading-relaxed mb-6">{body}</p>
                <ul className="flex flex-col gap-2.5 border-t border-[#e4e4e4] pt-6">
                  {points.map((p) => (
                    <li key={p} className="text-sm text-[#0D0D0D]/80">{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className={`relative min-h-[280px] md:min-h-[440px] overflow-hidden ${
                i % 2 === 1 ? "md:order-1" : "md:order-2"
              }`}
            >
              <img src={img} alt={imgAlt} className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* ── HOW WE STAY IN TOUCH ── */}
      <section className="py-24 md:py-28 px-6 bg-[#fafafa] border-t border-[#e4e4e4]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              Staying In Sync
            </p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold text-[#0D0D0D] leading-[1.1] mb-4">
              How we keep interacting with you.
            </h2>
            <p className="text-[#747474] text-lg leading-relaxed">
              No black-box development. You always know what&apos;s shipped, what&apos;s next,
              and who to talk to.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e4e4e4] border border-[#e4e4e4]"
          >
            {CHANNELS.map(({ title, body }) => (
              <motion.div key={title} variants={fadeUp} className="p-7 bg-[#fafafa]">
                <h3 className="text-base font-semibold text-[#0D0D0D] mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-[#747474] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section className="py-28 px-6 bg-white border-t border-[#e4e4e4]">
        <div className="max-w-[1920px] mx-auto md:px-12 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              Selected Work
            </p>
            <h2 className="text-[clamp(32px,5vw,64px)] font-semibold text-[#0D0D0D] leading-[1.1] max-w-lg">
              Results we&apos;ve delivered.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {caseStudies.map(({ tag, title, outcome, metrics }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="rounded-2xl border border-[#e4e4e4] p-8 bg-white hover:border-gray-300 transition-colors duration-300 flex flex-col"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a2a2a2] mb-6">
                  {tag}
                </p>
                <h3 className="text-2xl font-semibold text-[#0D0D0D] mb-4 leading-snug">{title}</h3>
                <p className="text-base text-[#747474] leading-relaxed mb-8 flex-1">{outcome}</p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#e4e4e4]">
                  {metrics.map(({ value, label }) => (
                    <div key={label}>
                      <div className="text-xl font-bold text-[#0D0D0D] leading-none">{value}</div>
                      <div className="text-xs text-[#747474] font-medium mt-1.5">{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-20 px-6 text-center border-t border-[#e4e4e4] bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-4">Let&apos;s Start</p>
          <h2 className="text-[clamp(32px,5vw,60px)] font-bold text-[#0D0D0D] leading-tight mb-6">
            Ready to begin<br />step one?
          </h2>
          <p className="text-[#747474] text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            Reach out today and hear back from our team within one business day.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#F26A10] hover:bg-[#D94030] text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-300"
          >
            Get In Touch <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
