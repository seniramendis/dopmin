"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Zap, Shield, BarChart3, TrendingUp, WifiOff } from "lucide-react";

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

// ─── COMPARE STATS (Standard vs Intelligent) ──────────────────────────────────
const compareStats = [
  { label: "Responsiveness", dopmin: "< 2 sec response",     standard: "Manual triaging",       icon: Zap },
  { label: "Uptime model",   dopmin: "Self-healing",          standard: "Manual restart",        icon: Shield },
  { label: "Reporting",      dopmin: "Real-time dashboards",  standard: "Weekly CSV exports",    icon: BarChart3 },
  { label: "Scalability",    dopmin: "Auto-scales to demand", standard: "Provisioned for peak",  icon: TrendingUp },
  { label: "Connectivity",   dopmin: "Offline-first, auto-sync", standard: "Requires stable internet", icon: WifiOff },
];

// ─── HOW WE COMPARE (GSAP-enhanced) ────────────────────────────────────────────
export function HowWeCompare() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
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
    <section ref={sectionRef} className="relative py-24 md:py-28 px-6 overflow-hidden bg-white">
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
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3 text-center">
            The DopMin Difference
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-[clamp(32px,6vw,72px)] font-bold text-[#0D0D0D] leading-[1.05] whitespace-nowrap text-center mx-auto">
            Standard vs. Intelligent
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#747474] mt-5 text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-center">
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
                <span className="font-bold text-white text-2xl md:text-3xl">DopMin Systems</span>
              </div>

              <div className="relative flex flex-col divide-y divide-white/15">
                {compareStats.map(({ label, dopmin }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="compare-row-dopmin flex items-start gap-3.5 py-4 first:pt-0 last:pb-0 rounded-lg -mx-2 px-2"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-white text-lg md:text-xl leading-snug">{dopmin}</p>
                      <p className="text-white/65 text-sm md:text-base mt-0.5">{label}</p>
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
                <span className="font-bold text-[#0D0D0D] text-2xl md:text-3xl">Standard App</span>
              </div>

              <div className="relative flex flex-col divide-y divide-[#eeeeee]">
                {compareStats.map(({ label, standard }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 + 0.08 }}
                    className="flex items-start gap-3.5 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-[#0D0D0D] text-lg md:text-xl leading-snug">{standard}</p>
                      <p className="text-[#a2a2a2] text-sm md:text-base mt-0.5">{label}</p>
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
