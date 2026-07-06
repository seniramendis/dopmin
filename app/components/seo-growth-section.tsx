"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── ORGANIC GROWTH DATA (illustrative average client trajectory) ─────────────
const growthData = [
  { month: "Mo 1", traffic: 100 },
  { month: "Mo 2", traffic: 138 },
  { month: "Mo 3", traffic: 165 },
  { month: "Mo 4", traffic: 214 },
  { month: "Mo 5", traffic: 261 },
  { month: "Mo 6", traffic: 338 },
];

// ─── UVP ITEMS ──────────────────────────────────────────────────────────────
const uvpItems = [
  {
    title: "Technical SEO, done right",
    caption: "Clean semantic markup and fast Core Web Vitals so search engines actually understand you.",
  },
  {
    title: "Compounding organic growth",
    caption: "Every page is built to rank — traffic keeps climbing long after launch, not just during a campaign.",
  },
  {
    title: "Content built for intent",
    caption: "Keyword strategy tied to buyer intent, not vanity metrics — visitors who become customers.",
  },
  {
    title: "Fast, indexable, mobile-first",
    caption: "Sub-second loads and mobile-first architecture — the ranking factors Google actually weights.",
  },
];

// ─── ANIMATED COUNT-UP STAT ────────────────────────────────────────────────────
function AnimatedStat({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return <span ref={ref}>+{value}%</span>;
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-[#e4e4e4] rounded-lg px-3 py-2 shadow-lg">
      <p className="text-[#a2a2a2] text-[10px] font-semibold uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-[#0D0D0D] text-sm font-bold">{payload[0].value} <span className="text-[#a2a2a2] font-medium text-xs">index</span></p>
    </div>
  );
}

// ─── CUSTOM DOT — pulses on the final data point once the line finishes drawing ──
function makeRenderDot(revealed: boolean) {
  return function RenderDot(props: { cx?: number; cy?: number; index?: number }) {
    const { cx, cy, index } = props;
    if (cx == null || cy == null) return <g key={`dot-${index}`} />;
    const isLast = index === growthData.length - 1;

    if (!isLast) {
      return <circle key={`dot-${index}`} cx={cx} cy={cy} r={2.5} fill="#DC2626" fillOpacity={0.5} />;
    }

    return (
      <g key={`dot-${index}`}>
        {revealed && (
          <motion.circle
            cx={cx}
            cy={cy}
            r={4}
            fill="#DC2626"
            fillOpacity={0.3}
            animate={{ r: [4, 16, 4], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <circle cx={cx} cy={cy} r={5} fill="#DC2626" stroke="#fff" strokeWidth={2} />
      </g>
    );
  };
}

function GrowthChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, amount: 0.4 });
  const [revealed, setRevealed] = useState(false);

  return (
    <div ref={chartRef} className="relative w-full h-[240px] md:h-[280px]">
      {inView && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={growthData} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="seoFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DC2626" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(13,13,13,0.07)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#a2a2a2", fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(13,13,13,0.12)" }} />
            <Area
              type="monotone"
              dataKey="traffic"
              stroke="#DC2626"
              strokeWidth={3}
              fill="url(#seoFill)"
              isAnimationActive
              animationDuration={1800}
              animationEasing="ease-out"
              onAnimationEnd={() => setRevealed(true)}
              dot={makeRenderDot(revealed)}
              activeDot={{ r: 6, fill: "#DC2626", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export function SEOGrowthSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* ── HEADLINE ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mx-auto mb-16 md:mb-20 text-center flex flex-col items-center"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
            Search &amp; Visibility
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-[clamp(32px,5vw,60px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D]">
            Want to grow your business?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[18px] md:text-xl text-[#747474] leading-relaxed">
            Being built well isn&apos;t enough if nobody can find you. We bake SEO into the
            foundation of every site we ship, so the traffic you earn today keeps compounding
            long after launch.
          </motion.p>
        </motion.div>

        {/* ── CHART + UVP LIST ── */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 border-t border-[#e4e4e4] pt-14">
          {/* Chart column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#a2a2a2] text-[11px] font-bold uppercase tracking-[0.1em] mb-1.5">
              Organic Traffic Index
            </p>
            <p className="text-[#0D0D0D] text-3xl md:text-4xl font-bold mb-6">
              <AnimatedStat target={238} />
              <span className="text-[#3a8000] text-sm font-semibold ml-2 align-middle">avg. 6-month growth*</span>
            </p>

            <GrowthChart />

            <p className="text-[#a2a2a2] text-[11px] mt-4 leading-relaxed">
              *Illustrative trajectory based on average client organic search performance after SEO-first launch.
            </p>
          </motion.div>

          {/* UVP column — clean list, no icon boxes */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {uvpItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="py-6 border-b border-[#e4e4e4] first:pt-0 last:border-b-0 last:pb-0"
              >
                <span className="text-[11px] font-bold text-[#DC2626] tracking-wide">
                  0{i + 1}
                </span>
                <h3 className="text-[17px] font-semibold text-[#0D0D0D] mt-2 mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#747474] leading-relaxed">
                  {item.caption}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
