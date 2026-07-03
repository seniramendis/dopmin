"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function AppSolvesShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const phoneWrapRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: phoneWrapRef,
    offset: ["start 90%", "start 30%"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [42, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.65, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-8 items-center">
        {/* ── COPY / UVP ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1"
        >
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-4">
            Built to Solve, Not Just Ship
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-semibold leading-[1.15] text-[#0D0D0D] mb-6">
            We don&apos;t just build apps.
            <br />
            We solve the problem behind them.
          </h2>
          <p className="text-[#747474] text-lg leading-relaxed mb-8 max-w-md">
            Every screen, flow, and feature is engineered around a real operational
            bottleneck — not a template. That&apos;s the difference between software
            that looks good and a system that actually moves your business forward.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Rooted in your actual workflow, not a generic template",
              "Designed for the problem first, the interface second",
              "Built to compound in value long after launch",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F26A10] shrink-0" />
                <span className="text-[15px] text-[#0D0D0D]/80">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── PHONE MOCKUP — scroll-linked tilt, like the dashboard scroll section ── */}
        <div
          ref={phoneWrapRef}
          className="order-1 md:order-2 relative flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{
              rotateX,
              scale,
              y: translateY,
              opacity,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-[420px] md:max-w-none md:scale-110"
          >
            <Image
              src="https://res.cloudinary.com/dukv2otyn/image/upload/f_auto,q_100/v1783030945/tech_care_mockup_2_thi0v0-removebg-preview_cixai8.png"
              alt="DopMin app solving real operational problems"
              width={1400}
              height={1400}
              quality={100}
              className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
