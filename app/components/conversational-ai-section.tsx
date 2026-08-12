"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Mic, Headset, ArrowRight } from "lucide-react";
import Image from "next/image";

const BOT_AVATAR =
  "https://res.cloudinary.com/dukv2otyn/image/upload/v1786533950/logo_transparent_icon_akuon5.png";

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────
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

// ─── CONVERSATION SCRIPT ────────────────────────────────────────────────────
// A short, cycling script. The sequencer keeps a rolling window of the last
// few messages on screen at all times — nothing ever clears to a blank
// state, it just keeps flowing.
type Step =
  | { kind: "user"; text: string }
  | { kind: "voice"; text: string }
  | { kind: "transfer"; name: string; role: string };

const SCRIPT: Step[] = [
  { kind: "user", text: "Hey, can you help me set up automated order updates?" },
  { kind: "voice", text: "Of course — I can wire that up to your store in a few minutes." },
  { kind: "user", text: "Perfect. I also want a human to jump in for VIP customers." },
  { kind: "transfer", name: "Jane Doe", role: "Senior Support Specialist" },
];

const CHAT_WINDOW = 3; // how many messages stay on screen at once
const TYPING_DURATION = 650; // how long the typing indicator shows
const STEP_GAP = 1250; // pause after a message lands before the next starts typing

// ─── TYPING INDICATOR ───────────────────────────────────────────────────────
function TypingDots({ align }: { align: "start" | "end" }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-center gap-1.5 ${
        align === "start"
          ? "self-start bg-white border border-[#ececec] rounded-2xl rounded-bl-sm shadow-[0_6px_20px_-8px_rgba(13,13,13,0.15)]"
          : "self-end bg-[#F26A10]/10 rounded-2xl rounded-br-sm"
      } px-4 py-3`}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${align === "start" ? "bg-[#c3c3c3]" : "bg-[#F26A10]"}`}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

// ─── VOICE WAVEFORM ─────────────────────────────────────────────────────────
function Waveform({ active }: { active: boolean }) {
  const bars = [6, 14, 9, 18, 11, 16, 7, 12, 5];
  return (
    <div className="flex items-center gap-[3px] h-5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-[#F26A10]"
          style={{ height: h }}
          animate={active ? { scaleY: [0.35, 1, 0.5, 0.9, 0.35] } : { scaleY: 0.5 }}
          transition={{
            duration: 1.1,
            repeat: active ? Infinity : 0,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── CHAT BUBBLES ───────────────────────────────────────────────────────────
const bubbleExit = {
  opacity: 0,
  y: -16,
  scale: 0.96,
  transition: { duration: 0.35, ease: "easeIn" as const },
};

function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={bubbleExit}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="self-end max-w-[82%] bg-gradient-to-br from-[#F26A10] to-[#D94030] text-white text-[13.5px] leading-relaxed font-medium rounded-2xl rounded-br-sm px-4 py-3 shadow-[0_10px_24px_-10px_rgba(242,106,16,0.55)]"
    >
      {text}
    </motion.div>
  );
}

function VoiceBubble({ text }: { text: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -24, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={bubbleExit}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="self-start max-w-[86%] flex flex-col gap-2 bg-white border border-[#ececec] rounded-2xl rounded-bl-sm px-4 py-3 shadow-[0_10px_28px_-12px_rgba(13,13,13,0.18)]"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#0D0D0D] flex items-center justify-center shrink-0">
          <Mic className="w-3.5 h-3.5 text-white" strokeWidth={2} />
        </div>
        <Waveform active />
        <span className="text-[10px] text-[#a2a2a2] font-medium tabular-nums shrink-0">0:14</span>
      </div>
      <p className="text-[13px] leading-relaxed text-[#3a3a3a]">{text}</p>
    </motion.div>
  );
}

function TransferCard({ name, role }: { name: string; role: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -24, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={bubbleExit}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="self-start w-[86%] bg-white border border-[#ececec] rounded-2xl overflow-hidden shadow-[0_12px_30px_-12px_rgba(13,13,13,0.2)]"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#fafafa] border-b border-[#ececec]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#F26A10]/10 flex items-center justify-center">
            <Headset className="w-3 h-3 text-[#F26A10]" strokeWidth={2.2} />
          </div>
          <span className="text-[12px] font-semibold text-[#0D0D0D]">Human Agent Transfer</span>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="relative shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F0E080] to-[#F26A10] flex items-center justify-center text-white text-[11px] font-bold">
            {name
              .split(" ")
              .map((p) => p[0])
              .join("")}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#90E060] border-2 border-white" />
        </div>
        <div>
          <p className="text-[12.5px] font-semibold text-[#0D0D0D] leading-tight">{name}</p>
          <p className="text-[11px] text-[#a2a2a2] leading-tight mt-0.5">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── BOT MASCOT ─────────────────────────────────────────────────────────────
// A large, static showcase of the brand's AI avatar, set on a generous
// white plate. No motion here — the mascot itself stays still and simply
// commands attention through scale, while the chat around it does the talking.
function BotMascot() {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] shrink-0">
      {/* just the logo, static, large */}
      <Image
        src={BOT_AVATAR}
        alt="DopMin AI assistant"
        width={460}
        height={460}
        className="object-contain w-full h-full drop-shadow-[0_24px_48px_rgba(13,13,13,0.16)]"
        unoptimized
        priority
      />

      {/* online status pill — the only thing that quietly pulses */}
      <div className="absolute bottom-[10%] right-[6%] flex items-center gap-1.5 bg-white border border-[#ececec] rounded-full pl-1.5 pr-3 py-1.5 shadow-[0_10px_24px_-10px_rgba(13,13,13,0.3)]">
        <span className="relative flex w-2.5 h-2.5">
          <span className="absolute inline-flex w-full h-full rounded-full bg-[#90E060] opacity-75 animate-ping" />
          <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#90E060]" />
        </span>
        <span className="text-[11px] font-semibold text-[#0D0D0D]">Live</span>
      </div>
    </div>
  );
}

// ─── CHAT MOCKUP CARD ───────────────────────────────────────────────────────
function ChatMockup() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.5 });
  const [messages, setMessages] = useState<{ id: number; step: Step }[]>([]);
  const [typing, setTyping] = useState<"user" | "bot" | null>(null);
  const indexRef = useRef(0);
  const idRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (!inView) {
      return;
    }

    if (prefersReduced) {
      setMessages(SCRIPT.map((step, i) => ({ id: i, step })));
      setTyping(null);
      return;
    }

    let cancelled = false;

    const showNext = () => {
      if (cancelled) return;
      const step = SCRIPT[indexRef.current % SCRIPT.length];
      indexRef.current += 1;
      const typeAs = step.kind === "user" ? "user" : "bot";

      setTyping(typeAs);
      timers.current.push(
        setTimeout(() => {
          if (cancelled) return;
          setTyping(null);
          setMessages((prev) => {
            const next = [...prev, { id: idRef.current++, step }];
            return next.length > CHAT_WINDOW ? next.slice(next.length - CHAT_WINDOW) : next;
          });
          timers.current.push(setTimeout(showNext, STEP_GAP));
        }, TYPING_DURATION)
      );
    };

    timers.current.push(setTimeout(showNext, 300));

    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto pt-[180px] sm:pt-[220px] lg:pt-0"
    >
      {/* large bot mascot — the visual anchor, tucked behind/beside the card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-[-130px] lg:translate-x-0 lg:top-[10px] z-0">
        <BotMascot />
      </div>

      {/* chat card */}
      <div className="relative z-10 bg-[#fdfdfd] border border-[#ececec] rounded-[28px] shadow-[0_30px_70px_-30px_rgba(13,13,13,0.25)] pt-6 pb-5 px-5 md:px-6 lg:ml-[140px]">
        <div className="flex items-center justify-between mb-5 pl-1">
          <div>
            <p className="text-[13px] font-bold text-[#0D0D0D] leading-none">AI Assistant</p>
            <p className="text-[11px] text-[#90E060] font-medium mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#90E060] inline-block" />
              Online now
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 h-[280px] justify-end overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {messages.map(({ id, step }) => (
              <div key={id} className="flex flex-col">
                {step.kind === "user" && <UserBubble text={step.text} />}
                {step.kind === "voice" && <VoiceBubble text={step.text} />}
                {step.kind === "transfer" && <TransferCard name={step.name} role={step.role} />}
              </div>
            ))}
            {typing && <TypingDots key="typing" align={typing === "user" ? "end" : "start"} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── FEATURE LIST ───────────────────────────────────────────────────────────
const FEATURES = [
  {
    title: "Understands intent, not just keywords",
    desc: "Context-aware conversations that pick up where the customer left off.",
  },
  {
    title: "Escalates when it matters",
    desc: "Seamless handoff to a human agent, with full context carried over.",
  },
  {
    title: "Speaks your customer's language",
    desc: "Text, voice notes, or WhatsApp — one brain across every channel.",
  },
];

// ─── SECTION ────────────────────────────────────────────────────────────────
export function ConversationalAISection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-white">
      {/* ambient background glow, matching site language */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full bg-[#F26A10]/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full bg-[#90E060]/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* ── left: copy ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3"
          >
            Conversational AI
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,5vw,60px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D]"
          >
            Conversations that
            <br />
            close, not just chat.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#747474] leading-relaxed mb-10">
            We build AI assistants that talk to your customers like a great teammate would &mdash;
            answering in real time, remembering context, and knowing exactly when to bring a human in.
          </motion.p>

          <motion.div variants={stagger} className="flex flex-col gap-6 mb-10">
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <p className="text-[15px] font-semibold text-[#0D0D0D] leading-snug">{f.title}</p>
                <p className="text-[14px] text-[#747474] leading-relaxed mt-1">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            variants={fadeUp}
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold bg-[#F26A10] text-white px-6 py-3.5 rounded-xl hover:bg-[#D94030] transition-colors shadow-sm"
          >
            Build your AI assistant <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* ── right: animated chat mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
}