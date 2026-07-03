"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight, X, Menu, Zap, Shield, BarChart3, TrendingUp, WifiOff, ArrowUpRight,
} from "lucide-react";
import { SocialIconRow } from "../components/social-links";
import { HeroScrollDemo } from "../components/hero-scroll-demo";
import { AppSolvesShowcase } from "../components/app-solves-showcase";

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
  visible: { transition: { staggerChildren: 0.08 } },
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
            <Link href="/solutions" className="text-[14px] font-medium text-[#F26A10] hover:text-[#D94030] transition-colors">Solutions</Link>
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
                <Link href="/expertise" onClick={() => setOpen(false)} className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors">Expertise</Link>
                <Link href="/solutions" onClick={() => setOpen(false)} className="text-[#F26A10] text-base font-semibold">Solutions</Link>
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

// ─── COMPARE STATS (Standard vs Intelligent) ──────────────────────────────────
const compareStats = [
  { label: "Responsiveness", dopmin: "< 2 sec response",     standard: "Manual triaging",       icon: Zap },
  { label: "Uptime model",   dopmin: "Self-healing",          standard: "Manual restart",        icon: Shield },
  { label: "Reporting",      dopmin: "Real-time dashboards",  standard: "Weekly CSV exports",    icon: BarChart3 },
  { label: "Scalability",    dopmin: "Auto-scales to demand", standard: "Provisioned for peak",  icon: TrendingUp },
  { label: "Connectivity",   dopmin: "Offline-first, auto-sync", standard: "Requires stable internet", icon: WifiOff },
];

// ─── HOW WE COMPARE (GSAP-enhanced) ────────────────────────────────────────────
function HowWeCompare() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const glow1Ref = useRef<HTMLDivElement | null>(null);
  const glow2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // background blobs drift at different speeds while the section scrolls
      gsap.to(blob1Ref.current, {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(blob2Ref.current, {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // DopMin badge — a slow breathing glow to signal "live / active"
      gsap.to(badgeRef.current, {
        scale: 1.18,
        opacity: 0.35,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // stat rows on the winning card get a soft staggered glow sweep once in view
      gsap.fromTo(
        ".compare-row-dopmin",
        { backgroundColor: "rgba(255,255,255,0)" },
        {
          backgroundColor: "rgba(255,255,255,0.06)",
          duration: 0.4,
          stagger: 0.08,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
          scrollTrigger: { trigger: card1Ref.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    // 3D tilt + cursor spotlight on the two comparison cards
    const cleanups: Array<() => void> = [];
    [
      { card: card1Ref.current, glow: glow1Ref.current },
      { card: card2Ref.current, glow: glow2Ref.current },
    ].forEach(({ card, glow }) => {
      if (!card) return;

      const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power3.out" });
      const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power3.out" });
      const scale = gsap.quickTo(card, "scale", { duration: 0.5, ease: "power3.out" });
      const glowX = glow ? gsap.quickSetter(glow, "left", "%") : null;
      const glowY = glow ? gsap.quickSetter(glow, "top", "%") : null;

      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rotateY((px - 0.5) * 10);
        rotateX(-(py - 0.5) * 10);
        glowX?.(px * 100);
        glowY?.(py * 100);
      };
      const handleEnter = () => {
        scale(1.015);
        if (glow) gsap.to(glow, { opacity: 1, duration: 0.3 });
      };
      const handleLeave = () => {
        rotateX(0);
        rotateY(0);
        scale(1);
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-28 px-6 overflow-hidden bg-[#fff6ef]">
      {/* decorative blobs — parallax on scroll */}
      <div
        ref={blob1Ref}
        aria-hidden
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#F26A10]/15 blur-3xl pointer-events-none"
      />
      <div
        ref={blob2Ref}
        aria-hidden
        className="absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full bg-[#F26A10]/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ── white "sheet" ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative bg-white rounded-[28px] md:rounded-[36px] shadow-[0_30px_80px_-30px_rgba(13,13,13,0.18)] pt-12 md:pt-16 px-6 md:px-14 pb-40 md:pb-48"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
            The DopMin Difference
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,56px)] font-bold text-[#0D0D0D] leading-[1.05] max-w-lg">
            How we compare.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#747474] mt-5 text-lg md:text-xl max-w-xl leading-relaxed">
            With DopMin, you get an intelligent system from day one &mdash; not a static app that stops improving at launch.
          </motion.p>
        </motion.div>

        {/* ── cards, overflowing the bottom edge of the sheet ── */}
        <div className="relative -mt-32 md:-mt-40 px-2 md:px-10 z-20" style={{ perspective: 1200 }}>
          <div className="flex gap-5 overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 snap-x snap-mandatory pb-2 scrollbar-hide">
            {/* ── DOPMIN (filled, highlighted) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              ref={card1Ref}
              className="relative shrink-0 snap-center w-[82vw] sm:w-[340px] md:w-auto rounded-3xl bg-[#F26A10] p-7 md:p-8 shadow-[0_24px_50px_-18px_rgba(242,106,16,0.55)] overflow-hidden will-change-transform"
            >
              {/* cursor-follow spotlight */}
              <div
                ref={glow1Ref}
                aria-hidden
                className="pointer-events-none absolute w-64 h-64 rounded-full opacity-0 -translate-x-1/2 -translate-y-1/2"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)" }}
              />

              {/* recommended ribbon */}
              <div className="absolute top-0 right-0 flex items-center gap-1.5 pl-3.5 pr-4 py-2 rounded-bl-2xl bg-[#0D0D0D] text-white text-[10px] font-bold uppercase tracking-[0.1em]">
                <ArrowUpRight className="w-3 h-3" /> Recommended
              </div>

              <div className="relative flex items-center gap-3 mb-9 mt-1">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white shrink-0">
                  <span ref={badgeRef} className="absolute inset-0 rounded-full bg-white" aria-hidden />
                  <span className="relative font-bold text-[#F26A10] text-sm">D</span>
                </div>
                <span className="font-bold text-white text-lg">DopMin Systems</span>
              </div>

              <div className="relative flex flex-col divide-y divide-white/15">
                {compareStats.map(({ label, dopmin, icon: Icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="compare-row-dopmin flex items-start gap-3.5 py-4 first:pt-0 last:pb-0 rounded-lg -mx-2 px-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-base md:text-lg leading-snug">{dopmin}</p>
                      <p className="text-white/65 text-xs md:text-sm mt-0.5">{label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── STANDARD (muted, flat) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              ref={card2Ref}
              className="relative shrink-0 snap-center w-[82vw] sm:w-[340px] md:w-auto rounded-3xl bg-white border border-[#e4e4e4] p-7 md:p-8 shadow-[0_16px_40px_-20px_rgba(13,13,13,0.15)] overflow-hidden will-change-transform"
            >
              {/* cursor-follow spotlight */}
              <div
                ref={glow2Ref}
                aria-hidden
                className="pointer-events-none absolute w-64 h-64 rounded-full opacity-0 -translate-x-1/2 -translate-y-1/2"
                style={{ background: "radial-gradient(circle, rgba(242,106,16,0.08), transparent 70%)" }}
              />

              <div className="relative flex items-center gap-3 mb-9 mt-1">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#fafafa] border border-[#e4e4e4] shrink-0">
                  <span className="font-bold text-[#a2a2a2] text-sm">S</span>
                </div>
                <span className="font-bold text-[#0D0D0D] text-lg">Standard App</span>
              </div>

              <div className="relative flex flex-col divide-y divide-[#eeeeee]">
                {compareStats.map(({ label, standard, icon: Icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 + 0.08 }}
                    className="flex items-start gap-3.5 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#fafafa] border border-[#eeeeee] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#b5b5b5]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#0D0D0D] text-base md:text-lg leading-snug">{standard}</p>
                      <p className="text-[#a2a2a2] text-xs md:text-sm mt-0.5">{label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── closing stat strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 md:mt-14 grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "5x", label: "Faster to ship" },
              { value: "99.9%", label: "Uptime target" },
              { value: "24/7", label: "Self-healing ops" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-[#0D0D0D]">{value}</p>
                <p className="text-[#a2a2a2] text-xs md:text-sm mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTIONS PAGE ────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.07) 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              Solutions
            </p>
            <h1 className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D] max-w-3xl">
              Systems built around your operations, not the other way around.
            </h1>
            <p className="text-[18px] md:text-xl text-[#747474] max-w-2xl leading-relaxed">
              Every business has a different bottleneck. We architect the specific solution that removes yours &mdash;
              then engineer it to compound in value long after launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SCROLL SHOWCASE ── */}
      <HeroScrollDemo />

      {/* ── APP SOLVES / UVP ── */}
      <AppSolvesShowcase />

      {/* ── COMPARE: HOW WE COMPARE ── */}
      <HowWeCompare />

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
            Not sure which solution<br />fits your business?
          </h2>
          <p className="text-[#747474] text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            Walk us through your current stack. We&apos;ll identify your highest-leverage opportunity &mdash; no pitch, no obligation.
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
