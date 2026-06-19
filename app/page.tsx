"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  WifiOff, Bot, CloudUpload, ShoppingBag,
  ArrowRight, ChevronRight, X, Check, Menu, ExternalLink,
  TrendingUp, Clock, Shield, Code, Layout, Zap, Smartphone, Monitor
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIconRow } from "./components/social-links";

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
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-6">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-white/60"
      >
        <div className="px-6 h-16 flex items-center justify-between">

          {/* Logo */}
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

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link href="/expertise" className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors">
              Expertise
            </Link>
            {["Solutions", "Work", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors"
              >
                {l}
              </a>
            ))}
            <Link
              href="/team"
              className="text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors"
            >
              Team
            </Link>
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/book"
            className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-semibold bg-[#F26A10] text-white px-5 py-2 rounded-xl hover:bg-[#D94030] transition-colors outline-none shadow-sm"
          >
            Book a Free Audit <ChevronRight className="w-4 h-4" />
          </Link>

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
              className="md:hidden overflow-hidden border-t border-stone-100 rounded-b-2xl"
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                <Link
                  href="/expertise"
                  onClick={() => setOpen(false)}
                  className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors"
                >
                  Expertise
                </Link>
                {["Solutions", "Work", "Contact"].map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors"
                  >
                    {l}
                  </a>
                ))}
                <Link
                  href="/team"
                  onClick={() => setOpen(false)}
                  className="text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors"
                >
                  Team
                </Link>
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-semibold bg-[#F26A10] text-white px-4 py-3 rounded-xl hover:bg-[#D94030] transition-colors mt-2"
                >
                  Book a Free Audit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [textVisible, setTextVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  useEffect(() => {
    const video = isMobile ? mobileVideoRef.current : videoRef.current;
    if (!video) return;
    let fadeOutTimer: ReturnType<typeof setTimeout>;

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining < 1.5 && !textVisible) setTextVisible(true);
    };
    const handlePlay = () => {
      setTextVisible(true);
      clearTimeout(fadeOutTimer);
      fadeOutTimer = setTimeout(() => setTextVisible(false), 2000);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    if (!video.paused) handlePlay();

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      clearTimeout(fadeOutTimer);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0D0D0D] overflow-hidden flex flex-col justify-end"
    >
      {/* Full-bleed video — desktop only */}
      <motion.div
        aria-hidden
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 z-0 hidden md:block"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dukv2otyn/video/upload/v1781731256/dopmin-hero-bg_qeyvrd.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Full-bleed video — mobile only */}
      <motion.div
        aria-hidden
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 z-0 block md:hidden"
      >
        <video
          ref={mobileVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dukv2otyn/video/upload/v1781816336/dopmin-hero-bg-mobile_tugdgj.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Subtle vignette — just bottom + left edge, keeps video open */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
            "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      {/* Hero content — pinned to bottom like surge */}
      <div className="relative z-[2] px-6 md:px-12 xl:px-24 pb-16 md:pb-24 max-w-[1920px] mx-auto w-full">

        {/* Headline + description — fade on video loop */}
        <div
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0px)" : "translateY(12px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[clamp(48px,8vw,110px)] font-bold text-white leading-[1.0] tracking-tight mb-10 md:mb-12"
            style={{ textShadow: "0 4px 28px rgba(0,0,0,0.85), 0 2px 10px rgba(0,0,0,0.9)" }}
          >
            Engineering digital
            <br />
            luxury &amp; scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-lg md:text-xl text-white/75 font-light max-w-xl leading-relaxed mb-10"
          >
            DopMin fuses enterprise full-stack engineering with autonomous AI workflows — so your operations run leaner, faster, and smarter.
          </motion.p>
        </div>

      </div>
    </section>
  );
}

// ─── LOGO TICKER ──────────────────────────────────────────────────────────────
const TECH_STACK = [
  {
    name: "Java",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
        <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.929-1.58 13.164-1.58 13.164s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.193z"/>
        <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
        <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
        <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
      </svg>
    ),
  },
  {
    name: "PHP",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#6181B6" d="M64 33.039c-33.95 0-61.514 13.862-61.514 30.961S30.05 94.961 64 94.961 125.514 81.099 125.514 64 97.95 33.039 64 33.039zm-15.996 36.621l-2.548 11.829H35.967l7.37-34.276h18.227c8.474.17 12.545 4.917 10.679 12.876-1.988 8.449-8.313 9.571-24.239 9.571zm38.463 0l-2.548 11.829H74.43l7.37-34.276h18.227c8.474.17 12.545 4.917 10.679 12.876-1.988 8.449-8.314 9.571-24.239 9.571zM60.028 61.54l1.34-6.24H47.27l-1.34 6.24h14.098zm38.464 0l1.34-6.24H85.734l-1.34 6.24h14.098z"/>
      </svg>
    ),
  },
  {
    name: "React",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <g fill="#61DAFB">
          <circle cx="64" cy="64" r="11.4"/>
          <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13-1.2-21.8-9.6-26.4-8.5-4.7-19.7-.2-31.2 12.5-11.6-12.7-22.8-17.2-31.2-12.5-8.4 4.6-11.7 13.4-9.6 26.4.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.5-6.9 2.3C6.3 51.9 0 59.3 0 64c0 4.7 6.3 12.1 15.4 18.8 2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13 1.2 21.8 9.6 26.4 8.5 4.7 19.7.2 31.2-12.5 11.6 12.7 22.8 17.2 31.2 12.5 8.4-4.6 11.7-13.4 9.6-26.4-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.5 6.9-2.3 9.1-6.7 15.4-14.1 15.4-18.8 0-4.7-6.3-12.1-15.4-18.8zM92 29.2c3.7 2 5.1 7.4 3.5 15.9-.3 1.8-.8 3.6-1.3 5.5-5.1-1.1-10.8-2-16.8-2.7-3.5-4.8-7.1-9.1-10.7-12.8 8.6-9.3 17.2-13.4 25.3-8.9zm-57 39.7c1.7 2.9 3.5 5.8 5.4 8.4-3.5-.5-6.9-1.1-10.1-1.8 1.1-2.2 2.3-4.4 3.6-6.5l1.1-.1zm-5.2 11.2c3.8.9 8 1.7 12.5 2.3 1.5 2.8 3.1 5.6 4.8 8.2-2.2.4-4.5.7-6.8 1-5.4-3.5-9.3-7.8-10.5-11.5zm19.4-30.7c2.4.2 4.8.5 7.3.8-1.7 3-3.3 6.1-4.8 9.3-1.5-3.2-3-6.2-4.5-9.1l2-.8c0-.1 0-.2 0-.2zm-2.2 1.4c1.6 3 3.1 6.1 4.6 9.4-1.4 3.3-2.8 6.6-4.1 10l-1.5.1c-1.6-3.2-3.1-6.5-4.4-9.8 1.6-3.3 3.2-6.5 5.4-9.7zm7.4.8c2.9.4 5.7.9 8.4 1.5-1.1 3.5-2.3 7.1-3.6 10.6-.9-2.2-1.9-4.4-3-6.5s-2.3-4.1-3.6-6l1.8.4zm12.5 3c2.8.8 5.4 1.7 7.8 2.7-1.1 2.1-2.3 4.3-3.6 6.5-.5-1.1-1-2.2-1.5-3.2-1-2.1-2-4.1-2.7-6zm-4.2 17.2c-1.1 2.9-2.2 5.7-3.4 8.4-.8-1.7-1.6-3.5-2.4-5.3l5.8-3.1zm-8.4-1.9c-1.4 2.8-2.8 5.5-4.2 8.1-1.7-3.2-3.3-6.5-4.8-9.9 2.8 0 5.7.3 9 1.8zm-5.6-17.3c2.7-4.3 5.6-7.8 8.4-10.7 2.8 2.9 5.7 6.4 8.4 10.7-2.8.1-5.7.2-8.5.2-2.8 0-5.7 0-8.3-.2zm-1.8.2c-2.9.3-5.8.7-8.4 1.3.7-1.9 1.4-3.7 2.1-5.3 2.1.7 4.2 1.8 6.3 4zm-11 3.5c-1.3 3.4-2.4 6.9-3.4 10.5-2.2-.5-4.2-1.1-6.1-1.7 1.6-2.8 3.5-5.8 6.1-8.3 1.1-.3 2.2-.5 3.4-.5zm-10.8 4.8c-2.6 2.5-4.5 5.5-6.1 8.3-1.9-.7-3.7-1.5-5.4-2.3-2.5-1.6-4.5-3.6-6.3-5.9 1.8-2.3 3.7-4.4 6.3-5.9 1.7-.8 3.5-1.6 5.4-2.3 1.6 2.8 3.5 5.8 6.1 8.1zm.7-10.3c1.9-.7 3.9-1.2 6.1-1.7.9 3.6 2 7.1 3.4 10.5-1.2 0-2.3-.2-3.4-.5-2.6-2.5-4.5-5.5-6.1-8.3zm-8.6 22.1c1.9-.7 3.9-1.2 6.1-1.7-1.4 3.4-2.4 6.9-3.4 10.5-2.2-.5-4.2-1.1-6.1-1.7 1.1-2.6 2.2-4.9 3.4-7.1zm4.8-12.3c2.7.8 5.7 1.4 8.9 1.9.7 2.5 1.5 5 2.4 7.4-3.1-1.5-6-3.6-8.9-6.3-1-.9-1.9-2-2.4-3zm14.2 19.3c-1.6-3-3.1-6.1-4.6-9.4 1.4-3.3 2.8-6.6 4.1-10l1.5-.1c1.6 3.2 3.1 6.5 4.4 9.8-1.6 3.3-3.2 6.5-5.4 9.7zm.1 1.5c2.5 3.7 5.1 7 7.7 9.8-2.8.1-5.7.2-8.5.2-2.8 0-5.7 0-8.3-.2 2.5-2.8 5.1-6.1 9.1-9.8zm18.9-11.6c1.1 2.9 2.2 5.7 3.4 8.4-2.8 0-5.7-.3-9-1.8 2.3-.9 4-3.3 5.6-6.6zm5.6-14c-3.1 1.5-6 3.6-8.9 6.3-1 .9-1.9 2-2.4 3-.7-2.5-1.5-5-2.4-7.4 2.7-.8 5.7-1.4 8.9-1.9 1.6.9 3.2 0 4.8 0zm2.8-11c-2.5-2.7-5.1-5-7.7-6.8 2.8-.1 5.7-.2 8.5-.2 2.8 0 5.7 0 8.3.2-2.5 1.8-5.1 4.1-9.1 6.8zm3.9 14.8c1.7-3.2 3.3-6.5 4.8-9.9-1.6 3.2-3.1 6.5-4.8 9.9zm5.2-8.6c.5 2.5.9 5.2 1.1 7.9-2.6-2.3-5.3-4.3-8.1-6.1 2.4.6 4.8 1.3 7 2.2zm7.8 5.8c-1.6 3-3.5 5.8-6.1 8.3-1.1-.3-2.2-.5-3.4-.5 1.4-3.4 2.4-6.9 3.4-10.5 2.2.5 4.2 1.1 6.1 1.7zm-3.4-12.4c2.6 2.5 4.5 5.5 6.1 8.3-1.7.8-3.5 1.6-5.4 2.3-1.6-2.8-3.5-5.8-6.1-8.1-1.1-.1-2.2 0-3.4 0 2.8-1.3 5.7-2.1 8.8-2.5zM67.5 42.4c-2.8 2.9-5.7 6.4-8.4 10.7 2.8-.1 5.7-.2 8.5-.2 2.8 0 5.7 0 8.3.2-2.5-4.3-5.3-7.8-8.4-10.7z"/>
        </g>
      </svg>
    ),
  },
  {
    name: "Python",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <linearGradient id="py1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5A9FD4"/>
          <stop offset="1" stopColor="#306998"/>
        </linearGradient>
        <linearGradient id="py2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFD43B"/>
          <stop offset="1" stopColor="#FFE873"/>
        </linearGradient>
        <path fill="url(#py1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V69.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
        <path fill="url(#py2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
      </svg>
    ),
  },
  {
    name: "Node.js",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 42 42.061 42 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L20.581 90.73c-.328-.187-.721-.186-.721-.186v-52.137c0-.65.37-1.355.962-1.682l44.065-25.603c.584-.339 1.411-.339 1.991 0l44.066 25.603c.588.327.959 1.032.959 1.682v52.137c0 .647-.373 1.187-.959 1.515l-44.066 25.607c-.578.33-1.407.33-1.99 0l-11.317-6.531c-.517-.298-1.142-.489-1.714-.227-5.496 2.507-6.533 2.218-11.586-.131-.526-.249-1.297.003-1.62.512.297.487.79.813 1.389 1.155L64 127.689c1.39.81 3.027 1.234 4.603 1.234 1.571 0 3.207-.424 4.6-1.234l44.168-25.608c2.87-1.658 4.629-4.764 4.629-8.083V38.407c0-3.319-1.759-6.422-4.629-8.073zM77.329 91.602c-11.612 0-14.249-3.367-15.169-10.152-.092-.703-.698-1.219-1.405-1.219h-5.748c-.77 0-1.416.635-1.416 1.404 0 8.304 4.512 18.207 23.738 18.207 14.248 0 22.405-5.605 22.405-15.418 0-9.732-6.567-12.332-20.323-14.177-13.944-1.852-15.360-2.796-15.360-6.095 0-2.718 1.219-6.325 11.807-6.325 9.431 0 12.912 2.066 14.358 8.452.13.581.72 1.0 1.316 1.0h5.764c.396 0 .76-.168 1.021-.453.263-.288.371-.681.316-1.063-1.888-11.221-8.914-16.43-22.775-16.43-13.015 0-20.773 5.497-20.773 14.713 0 10.008 7.745 12.790 20.799 14.016 13.544 1.318 14.889 3.266 14.889 6.326 0 4.893-3.935 6.969-13.244 6.969z"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#007ACC" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.37-4.69-3.22-4.93a9.1 9.1 0 011.12-.7l4.49-2.6 3.5-2 .59.91a16.29 16.29 0 004.43 4.91c3.73 2.09 9.23 1.79 11.87-.6a5.44 5.44 0 00.74-6.61c-1-1.57-3.15-2.87-9.14-5.61-6.86-3.08-9.81-5-12.42-8.08a18.05 18.05 0 01-3.67-8 31 31 0 01.09-8.46c1.29-6.06 6-10.19 12.78-11.243a31.43 31.43 0 018.16.45zm-46.05-2.13h8.86v51.82H57.24V56.78h-15.9v-7h30.7v7z"/>
      </svg>
    ),
  },
  {
    name: "MySQL",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#00618A" d="M2 2v124h124V2H2zm62.428 109.2c-1.476.095-2.479-.061-3.32-.354l-1.312-5.3c.913.273 2.155.578 3.576.562 2.072.033 3.447-1.057 3.447-3.061V96.58H62.55v-6.374h11.694v13.162c0 5.5-3.1 7.832-9.816 7.832zm20.82-.178c-2.447.045-4.885-.499-6.023-.964l.949-5.776c1.178.562 3.162 1.174 5.176 1.144 2.139-.033 3.271-.906 3.271-2.299 0-1.345-.984-2.107-3.447-3.002-3.561-1.265-5.862-3.207-5.862-6.295 0-3.633 2.997-6.403 7.958-6.403 2.381 0 4.068.492 5.282 1.051l-1.022 5.607c-.811-.396-2.302-.977-4.31-.977-2.034 0-3.017.939-3.017 2.046 0 1.353 1.154 1.944 3.826 2.985 3.79 1.41 5.588 3.392 5.588 6.422.001 3.559-2.685 6.461-8.369 6.461zm36.344-.371h-6.688l-4.748-7.885-1.765 2.219v5.666h-6.025V78.469l6.025-.836v18.041l1.568-2.037 4.633-5.879h7.152l-6.865 8.021 6.713 12.853z"/>
        <path fill="#E48E00" d="M67.912 55.975c-.27 2.609-.695 5.063-1.221 7.399a27.685 27.685 0 01-2.027 5.581c-.86 1.689-1.848 3.067-2.983 4.146-1.136 1.084-2.457 1.626-3.96 1.626a7.05 7.05 0 01-2.521-.42c-.69-.274-1.286-.694-1.786-1.253-.498-.559-.916-1.257-1.247-2.086-.33-.832-.604-1.826-.823-2.984-.494-2.648-.707-5.76-.616-9.34.026-1.074.155-2.207.384-3.395.231-1.188.549-2.348.957-3.479.406-1.134.897-2.145 1.47-3.038.577-.891 1.252-1.578 2.022-2.064.771-.484 1.655-.727 2.649-.727 1.252 0 2.355.35 3.315 1.046.958.698 1.771 1.654 2.436 2.866.665 1.215 1.201 2.641 1.61 4.277.409 1.636.647 3.395.714 5.276l1.827.549z"/>
      </svg>
    ),
  },
  {
    name: "Docker",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#384d54" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.6 3.1-3.4 8.3-3 12.3-1.5.9-4.5 2-6.7 2H1.4l-.3 1.5c-.8 5.3-.6 13.6 4.3 20.5 3.6 5 8.9 7.5 15.9 7.5 14.3 0 24.9-6.4 30.1-18.3 3.5.1 7 0 9.9-1.5 2.7-1.4 4.9-3.6 6.3-6.5h1.5c1.2 0 3.7-.1 6.1-1.4.5 1.5 1.2 3 2.3 4.3l1.3 1.5 1.6-1.2c3.8-2.9 6-7.2 5.9-11.6.6.2 1.2.5 1.7.8 3.5 2 5.7 5.5 6.2 10.1l.2 1.8 1.7-.6c5.5-2 13-1.2 17.7 2.7 4.5 3.7 5.9 9.6 5.9 14.4H128c0-6.4-1.8-13.1-3.2-15.5zM69.4 37.3h-9.9v9.9h9.9v-9.9zm0-13.3h-9.9v9.9h9.9v-9.9zm13.2 13.3h-9.9v9.9h9.9v-9.9zM56.1 37.3H46.2v9.9h9.9v-9.9zM42.9 37.3H33v9.9h9.9v-9.9zM29.7 50.5H19.8v9.9h9.9v-9.9zm13.2 0H33v9.9h9.9v-9.9zm13.2 0H46.2v9.9h9.9v-9.9zm13.3 0h-9.9v9.9h9.9v-9.9zm13.2 0H73.7v9.9h9.9v-9.9zm0-13.2h-9.9v9.9h9.9v-9.9z"/>
      </svg>
    ),
  },
  {
    name: "AWS",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#F90" d="M40.258 55.765l-4.01 1.686-3.868-1.686V53.58l3.868-1.748 4.01 1.748v2.185zm-7.878 1.686l3.868 1.686v2.185l-3.868 1.748-4.01-1.748V59.137l4.01-1.686zm7.878 5.557l-4.01 1.686-3.868-1.686v-2.185l3.868-1.748 4.01 1.748v2.185zM32.38 64.694l3.868 1.686v2.185l-3.868 1.748-4.01-1.748v-2.185l4.01-1.686zm7.878 5.557l-4.01 1.686-3.868-1.686v-2.185l3.868-1.748 4.01 1.748v2.185z"/>
        <path fill="#F90" d="M79.085 87.84c-6.09 4.25-14.934 6.506-22.545 6.506-10.67 0-20.276-3.942-27.557-10.495-.572-.517-.062-1.222.627-.82 7.852 4.564 17.56 7.31 27.587 7.31 6.762 0 14.19-1.4 21.038-4.305.982-.427 1.79.656.85 1.804zm2.423-2.768c-.78-1.003-5.157-.474-7.12-.238-.598.073-.69-.449-.15-.826 3.487-2.45 9.208-1.743 9.875-.922.666.822-.174 6.549-3.44 9.28-.503.42-1.182.196-0.912-.365.734-1.836 2.53-5.927 1.747-6.93z"/>
        <path fill="#F90" d="M64.57 38.194c0-2.036 1.671-3.285 3.285-3.285h8.17c1.837 0 3.177 1.342 3.177 3.285v1.671h-3.177v-1.339c0-.666-.338-1.003-1.003-1.003h-6.27c-.666 0-1.003.337-1.003 1.003v3.679c0 .66.337 1.003 1.003 1.003h6.27c1.614 0 3.177 1.249 3.177 3.286v4.012c0 2.037-1.563 3.285-3.177 3.285H67.855c-1.838 0-3.286-1.25-3.286-3.285v-1.84h3.286v1.508c0 .661.337 1.004 1.003 1.004h6.27c.666 0 1.003-.343 1.003-1.004v-3.68c0-.66-.337-1.003-1.003-1.003h-6.27c-1.614 0-3.286-1.248-3.286-3.285v-3.012zm-14.79 0c0-2.036 1.563-3.285 3.285-3.285h9.17v2.95H53.398c-.666 0-1.003.337-1.003 1.003v11.38c0 .66.337 1.004 1.003 1.004h8.837v2.948h-9.17c-1.722 0-3.285-1.249-3.285-3.285V38.194zm-6.93 15.001h3.289V34.909h-3.289V53.195zm-15.54-18.286H36.06l5.23 14.573 5.065-14.573h4.512l-7.25 18.286h-4.845L31.31 34.91z"/>
      </svg>
    ),
  },
  {
    name: "Next.js",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#111" d="M64 0A64 64 0 1 0 64 128A64 64 0 1 0 64 0Z"/>
        <path fill="white" d="M106.317 112.014 49.167 38H38v51.986h8.957V49.63l52.203 67.533a64.431 64.431 0 0 0 7.157-5.149Z"/>
        <path fill="white" d="M88.932 38h-9v52h9V38Z"/>
      </svg>
    ),
  },
  {
    name: "Laravel",
    svg: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#FF2D20" d="M106.6 37.2c.1.3.1.6.1.9v25.8c0 1-.5 1.9-1.4 2.4l-21.6 12.5v24.8c0 1-.5 1.9-1.4 2.4l-45.1 26c-.2.1-.4.1-.6.2-.1 0-.2.1-.3.1-.4 0-.7-.1-1-.2L1.4 106c-.9-.5-1.4-1.4-1.4-2.4V26.3c0-.3 0-.6.1-.9.1-.2.2-.4.3-.6.1-.1.1-.2.2-.3l13.5-7.8c.9-.5 2-.5 2.8 0l13.5 7.8c.1.1.2.2.2.3.1.2.2.4.3-.6.1-.3.1-.6.1-.9v49l18.4-10.6V15c0-.3 0-.6.1-.9.1-.2.2-.4.3-.6.1-.1.1-.2.2-.3l13.5-7.8c.9-.5 2-.5 2.8 0L79.9 13c.1.1.2.2.2.3.1.2.2.4.3-.6zm-2.8 24.8V41.4L96.4 46l-7.5 4.4v16.2l14.9-8.6zM79.6 89.6V73.4l-43.4 25v16.2l43.4-25zM3 27.5v75.7l41.8 24.2V52.8L3 27.5zM16.5 19.7L2.9 27.9l13.6 7.8 13.6-7.8-13.6-8.2zm7 31.3V34.8L10 39.2v16.2l13.5-4.4zm42.7-38.3L52.7 4.9l-13.6 7.8 13.6 7.8 13.5-7.8zm7 31.3V27.8l-13.5 4.4v16.2l13.5-4.1zm-7.1 8.6l-13.5 7.8 13.5 7.8 13.6-7.8-13.6-7.8zm-6.9 18.1l-13.6-7.8v15.7l13.6 7.8v-15.7zm20.7 1.3l-13.5 7.8v15.7l13.5-7.8V71.3zM80 13l-13.6 7.8 13.6 7.8L93.5 20.8 80 13zm6.9 37.8L73.4 43v15.7l13.5 7.8V50.8zm27.2-1.3L100.5 42v15.7l13.6 7.8V49.5z"/>
      </svg>
    ),
  },
];

function LogoTicker() {
  return (
    <section
      className="py-12 border-y border-[#e4e4e4] bg-[#fafafa] overflow-hidden"
      aria-label="Tech stack"
    >
      <p className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-[0.18em] mb-7">
        Built with modern tech stacks
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
        <div className="animate-marquee">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 shrink-0 group"
              title={tech.name}
            >
              <div className="opacity-30 group-hover:opacity-70 transition-opacity grayscale group-hover:grayscale-0">
                {tech.svg}
              </div>
              <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERTISE ────────────────────────────────────────────────────────────────
const expertiseItems = [
  {
    icon: Monitor,
    title: "Custom Software Engineering",
    tags: ["Systems", "Architecture", "Scale"],
    desc: "We build high-leverage software systems and applications tailored to your exact operational needs.",
    color: "#F26A10",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop",
    imgAlt: "Code on monitor — custom software engineering",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    tags: ["Figma", "Wireframes", "Prototyping"],
    desc: "Structured wireframes that prioritize clean, intuitive user experiences — because clarity is the ultimate luxury.",
    color: "#F0E080",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80&auto=format&fit=crop",
    imgAlt: "UI design wireframe on tablet",
  },
  {
    icon: Zap,
    title: "AI & Automation Solutions",
    tags: ["LLM", "Agents", "Automation"],
    desc: "Eliminate manual tasks, optimize operations, and scale your business efficiently with purpose-built AI agents.",
    color: "#D94030",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop",
    imgAlt: "AI neural network and automation visualization",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    tags: ["Android", "Kotlin", "Java"],
    desc: "Expert in high-quality development using Java and Kotlin — native performance, beautiful interfaces.",
    color: "#90E060",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&auto=format&fit=crop",
    imgAlt: "Mobile app development on smartphone",
  },
  {
    icon: Code,
    title: "Full-Stack Web Development",
    tags: ["React", "Node.js", "PostgreSQL"],
    desc: "Specializing in modern frameworks like React and robust backend systems — from concept to cloud.",
    color: "#007ACC",
    img: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80&auto=format&fit=crop",
    imgAlt: "Full-stack web development setup with code",
  },
  {
    icon: WifiOff,
    title: "Offline-First Web Apps",
    tags: ["PWA", "React", "Sync"],
    desc: "Progressive Web Apps that operate in low-connectivity environments. Users never see a failure screen.",
    color: "#F0E080",
    img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&q=80&auto=format&fit=crop",
    imgAlt: "Mobile app UI on phone screen",
  },
  {
    icon: Bot,
    title: "Agentic AI Automation",
    tags: ["LLM", "Agents", "OpenAI"],
    desc: "LLM-powered agents that handle intake, triage, and follow-up without a human in the loop.",
    color: "#D94030",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop",
    imgAlt: "AI neural network visualization",
  },
  {
    icon: CloudUpload,
    title: "Legacy to Cloud Migration",
    tags: ["AWS", "GCP", "Docker"],
    desc: "Extract your monolith from on-premise hardware and redeploy as a resilient, auto-scaling cloud architecture.",
    color: "#90E060",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80&auto=format&fit=crop",
    imgAlt: "Server racks in data center",
  },
  {
    icon: ShoppingBag,
    title: "Headless E-commerce",
    tags: ["Shopify", "Next.js", "Edge"],
    desc: "Decouple your storefront from the commerce engine — sub-second page loads and app-grade checkout.",
    color: "#F26A10",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80&auto=format&fit=crop",
    imgAlt: "E-commerce shopping on laptop",
  },
];

function Expertise() {
  const { ref, inView } = useScrollInView(0.1);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft = track.scrollLeft;
    const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
    const newIndex = Math.round(scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.min(newIndex, expertiseItems.length - 1));
  };

  return (
    <section id="expertise" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="px-6 md:px-12 xl:px-24 max-w-[1920px] mx-auto">
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
              Five disciplines. One integrated team. We architect solutions to capture opportunities across industries.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 pt-4"
          >
            {expertiseItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group relative shrink-0 snap-center w-[85vw] sm:w-[320px] md:w-[360px] h-[520px] bg-[#111111] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-[#222]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-15 group-hover:opacity-35 transition-opacity duration-700 z-0"
                    style={{ background: `radial-gradient(circle at center, ${item.color}, transparent 70%)` }}
                  />
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute inset-x-0 top-16 bottom-44 z-[1] overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.imgAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover opacity-35 group-hover:opacity-55 transition-opacity duration-700 scale-105 group-hover:scale-100"
                      unoptimized
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111111] to-transparent z-10" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-8 z-10 transition-transform duration-500 bg-gradient-to-t from-black via-black/85 to-transparent">
                    <div
                      className="h-1 w-12 mb-6 transition-all duration-500 group-hover:w-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="mb-3 opacity-70">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 leading-tight text-white">{item.title}</h3>
                    <p className="text-white/60 transition-opacity duration-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous service"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-[#0D0D0D] hover:border-[#0D0D0D] transition-all disabled:opacity-30 disabled:hover:border-stone-200 disabled:hover:text-stone-400"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="flex gap-2">
              {expertiseItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to item ${i + 1}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIndex ? "28px" : "8px",
                    height: "8px",
                    backgroundColor: i === activeIndex ? "#F26A10" : "#e4e4e4",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => scrollTo(Math.min(expertiseItems.length - 1, activeIndex + 1))}
              disabled={activeIndex === expertiseItems.length - 1}
              aria-label="Next service"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-[#0D0D0D] hover:border-[#0D0D0D] transition-all disabled:opacity-30 disabled:hover:border-stone-200 disabled:hover:text-stone-400"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </motion.div>
      </div>
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
            <div className="overflow-x-auto">
              <div className="min-w-[560px]">
                <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#f5f5f5] border-b border-[#e4e4e4]">
                  <div className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold text-[#747474] uppercase tracking-wider">Dimension</div>
                  <div className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold text-[#747474] uppercase tracking-wider border-l border-[#e4e4e4]">
                    Standard App
                  </div>
                  <div className="px-4 md:px-6 py-4 md:py-5 text-xs font-bold text-white uppercase tracking-wider border-l border-[#e91d27] bg-[#e91d27]">
                    DopMin Systems
                  </div>
                </div>

                {compareRows.map(({ label, before, after }, i) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className={`grid grid-cols-[1.2fr_1fr_1fr]${i < compareRows.length - 1 ? " border-b border-[#e4e4e4]" : ""}`}
                  >
                    <div className="px-4 md:px-6 py-4 md:py-5 text-sm md:text-base font-semibold text-[#0D0D0D]">{label}</div>
                    <div className="px-4 md:px-6 py-4 md:py-5 border-l border-[#e4e4e4] flex items-start gap-2 md:gap-3">
                      <X className="w-4 h-4 md:w-5 md:h-5 text-[#D94030] shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-[#747474]">{before}</span>
                    </div>
                    <div className="px-4 md:px-6 py-4 md:py-5 border-l border-[#e91d27]/10 bg-[#e91d27]/5 flex items-start gap-2 md:gap-3">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-[#90E060] shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm font-medium text-[#0D0D0D]">{after}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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

          <div className="mt-12 pt-10 border-t border-[#e4e4e4] flex flex-col items-center gap-4">
            <p className="text-[#a2a2a2] text-sm">Or find us here</p>
            <SocialIconRow variant="light" />
          </div>
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
          <Link
            href="/#contact"
            className="shrink-0 bg-[#e91d27] hover:bg-[#D94030] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:-translate-y-1"
          >
            Get in touch
          </Link>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-[#a2a2a2] text-base">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-6">
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
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Capabilities</span>
            <Link href="/expertise" className="hover:text-white transition-colors">Design</Link>
            <Link href="/expertise" className="hover:text-white transition-colors">Engineering</Link>
            <Link href="/expertise" className="hover:text-white transition-colors">AI Workflows</Link>
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
          <SocialIconRow variant="dark" />
        </div>
      </div>
    </footer>
  );
}

// ─── TEAM TEASER ──────────────────────────────────────────────────────────────
const TEAM_HOME = [
  {
    name: "Senira Mendis",
    role: "Scrum Master & Backend Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727668/1755882213261_zoaphc.png",
    accentColor: "#D4A017",
    accentBg: "rgba(212,160,23,0.75)",
  },
  {
    name: "Devin Kulasekere",
    role: "Front End Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/255916317_ru7gyz.jpg",
    accentColor: "#C0392B",
    accentBg: "rgba(192,57,43,0.75)",
  },
  {
    name: "Rashmika Kodithuwakku",
    role: "Backend Developer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727846/Screenshot_2026-06-18_015243_vmapsq.png",
    accentColor: "#27AE60",
    accentBg: "rgba(39,174,96,0.75)",
  },
  {
    name: "Pamod Dhananjana",
    role: "QA Engineer",
    img: "https://res.cloudinary.com/dukv2otyn/image/upload/v1781727666/1776604303706_hni2ai.jpg",
    accentColor: "#E67E22",
    accentBg: "rgba(230,126,34,0.75)",
  },
];

function TeamTeaser() {
  const { ref, inView } = useScrollInView();
  return (
    <section id="team" className="pt-24 pb-0 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Headline — exact match to reference */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <h2
              className="text-[clamp(44px,7vw,96px)] text-[#0D0D0D] leading-[1.05]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              Our full stack<br />tech experts
            </h2>
            <p className="mt-5 text-[17px] text-stone-500 max-w-xl mx-auto leading-relaxed">
              A tight-knit crew of builders who ship clean code, fast — and actually give a damn about what they build.
            </p>
          </motion.div>

          {/* Cinematic photo cards — flush at bottom like reference */}
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-4">
            {TEAM_HOME.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="relative group shrink-0 snap-center w-[72vw] sm:w-[50vw] md:w-auto rounded-t-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Default gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                {/* Hover coloured overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${member.accentBg} 0%, rgba(0,0,0,0.15) 50%, transparent 100%)` }}
                />

                {/* Name + role */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-xl leading-snug drop-shadow">
                    {member.name}
                  </p>
                  <p className="text-white/75 text-[13px] font-medium mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Hover accent bar — unique colour per member */}
                <div
                  className="absolute top-0 left-0 right-0 h-[4px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: member.accentColor }}
                />
              </motion.div>
            ))}
          </div>

          {/* See full team CTA */}
          <motion.div variants={fadeUp} className="text-center pt-10 pb-12">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#F26A10] hover:text-[#D94030] transition-colors"
            >
              Meet the full team <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
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
      <TeamTeaser />
      <Contact />
      <Footer />
    </main>
  );
}