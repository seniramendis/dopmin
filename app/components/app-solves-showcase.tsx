"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export function AppSolvesShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let mounted = true;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (!mounted || !sectionRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          imageWrapRef.current,
          { opacity: 0, x: 80, scale: 0.94 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          copyRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, sectionRef);
    })();

    return () => {
      mounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* ── COPY / UVP ── */}
        <div ref={copyRef} className="order-2 md:order-1">
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
        </div>

        {/* ── IMAGE ── */}
        <div ref={imageWrapRef} className="order-1 md:order-2 relative">
          <Image
            src="https://res.cloudinary.com/dukv2otyn/image/upload/v1783030945/tech_care_mockup_2_thi0v0-removebg-preview_cixai8.png"
            alt="DopMin app solving real operational problems"
            width={900}
            height={900}
            className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
