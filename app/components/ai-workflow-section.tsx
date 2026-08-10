"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  Zap,
  Bot,
  Signpost,
  Brain,
  Database,
  Wrench,
  Bell,
  CheckCircle2,
  Plus,
} from "lucide-react";

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

// ─── CANVAS COORDINATE SPACE ──────────────────────────────────────────────────
// All node + path coordinates live in a fixed 1140x480 space so the SVG
// connectors and the absolutely-positioned HTML nodes always line up,
// regardless of how much the canvas is scaled down responsively.
const VB_W = 1140;
const VB_H = 480;
const xPct = (x: number) => `${(x / VB_W) * 100}%`;
const yPct = (y: number) => `${(y / VB_H) * 100}%`;

type PathKey =
  | "triggerAgent"
  | "agentDecision"
  | "decisionTrue"
  | "decisionFalse"
  | "trueToPlus"
  | "falseToPlus"
  | "subLeft"
  | "subMid"
  | "subRight";

const PATHS: Record<PathKey, string> = {
  triggerAgent: "M117,225 L253,225",
  agentDecision: "M407,225 L553,225",
  decisionTrue: "M617,208 C 700,208 700,95 783,95",
  decisionFalse: "M617,242 C 700,242 700,355 783,355",
  trueToPlus: "M937,95 L1008,95",
  falseToPlus: "M937,355 L1008,355",
  subLeft: "M292,273 C 272,318 232,338 212,374",
  subMid: "M330,273 C 330,316 330,338 330,374",
  subRight: "M368,273 C 388,318 428,338 448,374",
};

const DOT_STYLE: Record<PathKey, { color: string; size: number; duration: number; delay: number }> = {
  triggerAgent: { color: "#F26A10", size: 5, duration: 1.1, delay: 0 },
  agentDecision: { color: "#F26A10", size: 5, duration: 1.1, delay: 0.55 },
  decisionTrue: { color: "#90E060", size: 5, duration: 1.3, delay: 0.2 },
  decisionFalse: { color: "#9a9aa6", size: 5, duration: 1.3, delay: 0.85 },
  trueToPlus: { color: "#90E060", size: 4, duration: 0.7, delay: 1.1 },
  falseToPlus: { color: "#9a9aa6", size: 4, duration: 0.7, delay: 1.7 },
  subLeft: { color: "#F26A10", size: 3.5, duration: 1.4, delay: 0.3 },
  subMid: { color: "#F26A10", size: 3.5, duration: 1.4, delay: 0.7 },
  subRight: { color: "#F26A10", size: 3.5, duration: 1.4, delay: 1.1 },
};

// ─── AI WORKFLOW SECTION (GSAP node-graph mockup) ─────────────────────────────
export function AIWorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const heroGlowRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const refs = useRef<{
    paths: Partial<Record<PathKey, SVGPathElement | null>>;
    dots: Partial<Record<PathKey, SVGCircleElement | null>>;
  }>({ paths: {}, dots: {} });

  const setNodeRef = (i: number) => (el: HTMLDivElement | null) => {
    nodeRefs.current[i] = el;
  };
  const setPathRef = (key: PathKey) => (el: SVGPathElement | null) => {
    refs.current.paths[key] = el;
  };
  const setDotRef = (key: PathKey) => (el: SVGCircleElement | null) => {
    refs.current.dots[key] = el;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const ctx = gsap.context(() => {
      const pathEntries = Object.entries(refs.current.paths) as [PathKey, SVGPathElement | null][];

      // lines start invisible/undrawn until the canvas scrolls into view
      pathEntries.forEach(([, path]) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      Object.values(refs.current.dots).forEach((dot) => dot && gsap.set(dot, { opacity: 0 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // nodes rise + settle in
      tl.fromTo(
        nodeRefs.current,
        { opacity: 0, y: 22, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.08 },
        0
      );

      // connector lines draw themselves in
      pathEntries.forEach(([, path], i) => {
        if (!path) return;
        tl.to(path, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.15 + i * 0.07);
      });

      // once drawn, small particles loop endlessly along each connector
      tl.call(() => {
        pathEntries.forEach(([key, path]) => {
          const dot = refs.current.dots[key];
          if (!path || !dot) return;
          const style = DOT_STYLE[key];
          gsap.set(dot, { opacity: 1 });
          gsap.to(dot, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            duration: style.duration,
            delay: style.delay,
            repeat: -1,
            ease: "power1.inOut",
          });
        });
      }, [], 0.9);

      // the AI Agent node breathes with a soft glow, always-on
      if (heroGlowRef.current) {
        gsap.to(heroGlowRef.current, {
          scale: 1.2,
          opacity: 0.45,
          duration: 1.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden bg-white"
    >
      {/* ambient background glows, matching site language */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#F26A10]/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full bg-[#90E060]/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1200px] mx-auto">
        {/* ── heading ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mx-auto mb-16 md:mb-20 text-center"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
            AI Agents
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D]"
          >
            Agents that do the work,
            <br />
            so your team doesn&apos;t have to.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#747474] leading-relaxed">
            We design AI agents that plug into your existing workflow &mdash; reading requests,
            making decisions, and taking action around the clock. No new tab to babysit.
          </motion.p>
        </motion.div>

        {/* ── workflow canvas mockup ── */}
        <div className="relative rounded-[28px] md:rounded-[36px] border border-[#e4e4e4] bg-[#0a0a12] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
          {/* dot-grid canvas background, like an automation editor */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden
            className="absolute -top-24 -left-16 w-[300px] h-[300px] rounded-full bg-[#F26A10]/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -right-10 w-[280px] h-[280px] rounded-full bg-[#90E060]/10 blur-3xl"
          />

          <div className="relative overflow-x-auto px-4 py-10 md:px-10 md:py-16">
            <div
              ref={trackRef}
              className="relative mx-auto min-w-[720px] max-w-[1140px]"
              style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
            >
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="absolute inset-0 w-full h-full"
                fill="none"
              >
                {(Object.keys(PATHS) as PathKey[]).map((key) => {
                  const dashed = key.startsWith("sub");
                  return (
                    <path
                      key={key}
                      ref={setPathRef(key)}
                      d={PATHS[key]}
                      stroke={dashed ? "#3a3a48" : "#3a3a48"}
                      strokeWidth={dashed ? 1.5 : 2}
                      strokeDasharray={dashed ? "4 5" : undefined}
                    />
                  );
                })}
                {(Object.keys(PATHS) as PathKey[]).map((key) => (
                  <circle
                    key={key}
                    ref={setDotRef(key)}
                    r={DOT_STYLE[key].size}
                    fill={DOT_STYLE[key].color}
                    style={{ filter: `drop-shadow(0 0 6px ${DOT_STYLE[key].color}99)` }}
                  />
                ))}
              </svg>

              {/* trigger node */}
              <div
                ref={setNodeRef(0)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: xPct(85), top: yPct(225) }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#15151f] border border-[#2c2c38] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#e8b23a]" strokeWidth={1.8} />
                </div>
                <p className="mt-3 text-[13px] font-semibold text-white text-center whitespace-nowrap">
                  New request
                </p>
                <p className="text-[11px] text-[#75758a] text-center whitespace-nowrap">
                  Form, email, or ticket
                </p>
              </div>

              {/* AI Agent node (hero) */}
              <div
                ref={setNodeRef(1)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: xPct(330), top: yPct(225) }}
              >
                <div className="relative w-[150px] h-[96px] rounded-2xl">
                  <div
                    ref={heroGlowRef}
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-[#F26A10]/50 blur-lg"
                  />
                  <div className="relative w-full h-full rounded-2xl bg-[#161119] border border-[#F26A10]/60 shadow-[0_16px_36px_-14px_rgba(242,106,16,0.6)] flex flex-col items-center justify-center gap-1.5 px-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F26A10] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" strokeWidth={1.8} />
                    </div>
                    <p className="text-[14px] font-bold text-white leading-none">AI Agent</p>
                    <p className="text-[11px] text-[#a2a2b4] leading-none">Decides &amp; acts</p>
                  </div>
                </div>
                {/* mini connector captions, sitting just under the box like in an editor */}
                <div className="absolute top-full mt-1.5 left-0 right-0 flex justify-between px-2 text-[10px] text-[#5c5c6e] font-medium">
                  <span>Model</span>
                  <span>Memory</span>
                  <span>Tool</span>
                </div>
              </div>

              {/* sub nodes: knowledge / memory / tools */}
              <div
                ref={setNodeRef(2)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: xPct(210), top: yPct(400) }}
              >
                <div className="w-14 h-14 rounded-full bg-[#15151f] border border-[#2c2c38] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#7aa2ff]" strokeWidth={1.8} />
                </div>
                <p className="mt-2 text-[11px] font-semibold text-[#c7c7d6] text-center whitespace-nowrap">
                  Knowledge base
                </p>
              </div>
              <div
                ref={setNodeRef(3)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: xPct(330), top: yPct(400) }}
              >
                <div className="w-14 h-14 rounded-full bg-[#15151f] border border-[#2c2c38] flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#5ec9c0]" strokeWidth={1.8} />
                </div>
                <p className="mt-2 text-[11px] font-semibold text-[#c7c7d6] text-center whitespace-nowrap">
                  Memory
                </p>
              </div>
              <div
                ref={setNodeRef(4)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: xPct(450), top: yPct(400) }}
              >
                <div className="w-14 h-14 rounded-full bg-[#15151f] border border-[#2c2c38] flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-[#90E060]" strokeWidth={1.8} />
                </div>
                <p className="mt-2 text-[11px] font-semibold text-[#c7c7d6] text-center whitespace-nowrap">
                  Tools
                </p>
              </div>

              {/* decision node */}
              <div
                ref={setNodeRef(5)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: xPct(585), top: yPct(225) }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#15151f] border border-[#2c2c38] flex items-center justify-center">
                  <Signpost className="w-6 h-6 text-[#e0e0ea]" strokeWidth={1.8} />
                </div>
                <p className="mt-3 text-[13px] font-semibold text-white text-center whitespace-nowrap">
                  Needs approval?
                </p>
              </div>
              {/* true / false pills, placed along the branch curves */}
              <span
                className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-[#90E060] bg-[#90E060]/10 border border-[#90E060]/30 rounded-full px-2 py-0.5"
                style={{ left: xPct(700), top: yPct(150) }}
              >
                true
              </span>
              <span
                className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-[#a5a5b6] bg-white/5 border border-[#3a3a48] rounded-full px-2 py-0.5"
                style={{ left: xPct(700), top: yPct(300) }}
              >
                false
              </span>

              {/* outcome: notify team */}
              <div
                ref={setNodeRef(6)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: xPct(860), top: yPct(95) }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#15151f] border border-[#2c2c38] flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[#90E060]" strokeWidth={1.8} />
                </div>
                <p className="mt-3 text-[13px] font-semibold text-white text-center whitespace-nowrap">
                  Notify team
                </p>
                <p className="text-[11px] text-[#75758a] text-center whitespace-nowrap">
                  message: manager
                </p>
              </div>
              <div
                ref={setNodeRef(7)}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-lg border border-dashed border-[#3a3a48] flex items-center justify-center"
                style={{ left: xPct(1030), top: yPct(95) }}
              >
                <Plus className="w-4 h-4 text-[#5c5c6e]" strokeWidth={2} />
              </div>

              {/* outcome: update record */}
              <div
                ref={setNodeRef(8)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: xPct(860), top: yPct(355) }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#15151f] border border-[#2c2c38] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#a5a5b6]" strokeWidth={1.8} />
                </div>
                <p className="mt-3 text-[13px] font-semibold text-white text-center whitespace-nowrap">
                  Update record
                </p>
                <p className="text-[11px] text-[#75758a] text-center whitespace-nowrap">
                  close: automatically
                </p>
              </div>
              <div
                ref={setNodeRef(9)}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-lg border border-dashed border-[#3a3a48] flex items-center justify-center"
                style={{ left: xPct(1030), top: yPct(355) }}
              >
                <Plus className="w-4 h-4 text-[#5c5c6e]" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* ── closing stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 md:mt-14 grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto text-center"
        >
          {[
            { value: "24/7", label: "Always working" },
            { value: "0", label: "Manual handoffs" },
            { value: "Minutes", label: "To resolve, not days" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#0D0D0D]">{value}</p>
              <p className="text-[#a2a2a2] text-xs md:text-sm mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}