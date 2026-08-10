"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Inbox,
  Bot,
  GitBranch,
  Send,
  CheckCircle2,
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

// ─── WORKFLOW NODES ────────────────────────────────────────────────────────────
type WorkflowNode = {
  icon: typeof Inbox;
  title: string;
  desc: string;
  hero?: boolean;
};

const nodes: WorkflowNode[] = [
  { icon: Inbox, title: "Task comes in", desc: "Email, form, ticket, or a scheduled trigger" },
  { icon: Bot, title: "Agent reads & decides", desc: "Understands context and picks the next move", hero: true },
  { icon: GitBranch, title: "Routes automatically", desc: "Branches to the right process, no queue" },
  { icon: Send, title: "Executes the task", desc: "Updates systems, sends replies, takes action" },
  { icon: CheckCircle2, title: "Done — no human needed", desc: "Result delivered, edge cases flagged for you" },
];

// ─── AI WORKFLOW SECTION (GSAP-enhanced) ───────────────────────────────────────
export function AIWorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const heroGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // node cards rise + settle in as the track scrolls into view
      gsap.fromTo(
        nodeRefs.current,
        { opacity: 0, y: 28, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // the AI agent node breathes with a soft glow, always-on
      if (heroGlowRef.current) {
        gsap.to(heroGlowRef.current, {
          scale: 1.25,
          opacity: 0.35,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // small particles travel from node to node, looping, once the track is in view
      const validDots = dotRefs.current.filter(Boolean) as HTMLDivElement[];
      const total = nodeRefs.current.length;

      validDots.forEach((dot, dotIndex) => {
        const tl = gsap.timeline({
          repeat: -1,
          delay: dotIndex * 1.1,
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 85%",
          },
        });

        for (let i = 0; i < total - 1; i++) {
          const fromEl = nodeRefs.current[i];
          const toEl = nodeRefs.current[i + 1];
          if (!fromEl || !toEl) continue;

          const trackBox = trackRef.current?.getBoundingClientRect();
          const fromBox = fromEl.getBoundingClientRect();
          const toBox = toEl.getBoundingClientRect();
          if (!trackBox) continue;

          const isRow = window.matchMedia("(min-width: 768px)").matches;
          const fromPos = isRow
            ? fromBox.left + fromBox.width / 2 - trackBox.left
            : fromBox.top + fromBox.height / 2 - trackBox.top;
          const toPos = isRow
            ? toBox.left + toBox.width / 2 - trackBox.left
            : toBox.top + toBox.height / 2 - trackBox.top;

          tl.set(dot, isRow ? { x: fromPos, y: 0, opacity: 1 } : { y: fromPos, x: 0, opacity: 1 })
            .to(dot, {
              [isRow ? "x" : "y"]: toPos,
              duration: 0.75,
              ease: "power1.inOut",
            })
            .to(nodeRefs.current[i + 1], { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1 }, "<");
        }
        tl.to(dot, { opacity: 0, duration: 0.25 });
      });
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

        {/* ── workflow graph ── */}
        <div className="relative bg-[#fafafa] border border-[#e4e4e4] rounded-[28px] md:rounded-[36px] px-6 md:px-12 py-14 md:py-20">
          <div
            ref={trackRef}
            className="relative flex flex-col md:flex-row items-stretch md:items-start justify-between gap-10 md:gap-4"
          >
            {/* connecting line */}
            <div
              aria-hidden
              className="absolute md:top-8 md:left-8 md:right-8 left-8 top-8 bottom-8 md:bottom-auto w-px md:w-auto md:h-px bg-[#e4e4e4]"
            />

            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.title}
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className="relative z-10 flex md:flex-col items-start md:items-center gap-4 md:gap-5 md:w-[19%] text-left md:text-center"
                >
                  <div className="relative shrink-0">
                    {node.hero && (
                      <div
                        ref={heroGlowRef}
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-[#F26A10]/40 blur-lg"
                      />
                    )}
                    <div
                      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center border ${
                        node.hero
                          ? "bg-[#F26A10] border-[#F26A10] shadow-[0_16px_32px_-12px_rgba(242,106,16,0.55)]"
                          : "bg-white border-[#e4e4e4]"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${node.hero ? "text-white" : "text-[#0D0D0D]"}`}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>
                  <div className="pt-1 md:pt-0">
                    <p className="font-bold text-[#0D0D0D] text-[15px] md:text-base leading-snug">
                      {node.title}
                    </p>
                    <p className="text-[#a2a2a2] text-sm mt-1 max-w-[220px] md:max-w-[160px]">
                      {node.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* traveling particles */}
            {[0, 1].map((i) => (
              <div
                key={i}
                ref={(el) => { dotRefs.current[i] = el; }}
                aria-hidden
                className="absolute md:top-8 top-8 left-8 md:left-0 w-2.5 h-2.5 rounded-full bg-[#F26A10] opacity-0 shadow-[0_0_12px_2px_rgba(242,106,16,0.6)]"
                style={{ marginTop: "-5px", marginLeft: "-5px" }}
              />
            ))}
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