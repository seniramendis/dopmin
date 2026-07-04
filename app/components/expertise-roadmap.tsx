"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LucideIcon } from "lucide-react";

export interface ExpertiseRoadmapItem {
  name: string;
  role: string;
  tagline: string;
  accentColor: string;
  accentBg: string;
  icon: LucideIcon;
  skills: string[];
  funFact: string;
}

export function ExpertiseRoadmap({ items }: { items: ExpertiseRoadmapItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Trunk line grows as the section scrolls into view ──
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              end: "bottom 85%",
              scrub: 0.6,
            },
          }
        );
      }

      // ── Each node: marker pop -> branch draw -> card slide -> chips stagger ──
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const marker = node.querySelector(".rm-marker");
        const ring = node.querySelector(".rm-ring");
        const branch = node.querySelector(".rm-branch");
        const card = node.querySelector(".rm-card");
        const chips = node.querySelectorAll(".rm-chip");
        const isLeft = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          marker,
          { scale: 0, opacity: 0, rotate: -90 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.55, ease: "back.out(2.6)" }
        )
          .fromTo(
            ring,
            { scale: 0.4, opacity: 0.7 },
            { scale: 2.1, opacity: 0, duration: 1, ease: "power2.out" },
            "<"
          )
          .fromTo(
            branch,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.45,
              ease: "power2.out",
              transformOrigin: isLeft ? "right center" : "left center",
            },
            "-=0.25"
          )
          .fromTo(
            card,
            { opacity: 0, x: isLeft ? -36 : 36, y: 14 },
            { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.2"
          )
          .fromTo(
            chips,
            { opacity: 0, y: 8, scale: 0.75 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.06, ease: "back.out(2.2)" },
            "-=0.3"
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Trunk track */}
        <div className="absolute top-0 bottom-0 left-7 md:left-1/2 w-[3px] md:-translate-x-1/2 bg-stone-100 rounded-full overflow-hidden">
          <div
            ref={lineRef}
            className="w-full h-full origin-top bg-gradient-to-b from-[#F26A10] via-[#D94030] to-[#F0E080]"
          />
        </div>

        <div className="relative flex flex-col gap-14 md:gap-20">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isLeft = i % 2 === 0;

            return (
              <div
                key={item.name}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="relative flex md:justify-center items-start"
              >
                {/* marker on the trunk */}
                <div className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-0 z-20 -translate-x-1/2 md:translate-x-[-50%]">
                  <div
                    className="rm-ring absolute inset-0 rounded-full"
                    style={{ backgroundColor: item.accentColor }}
                  />
                  <div
                    className="rm-marker relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                    style={{ backgroundColor: item.accentColor }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* branch connector — desktop only */}
                <div
                  className={`rm-branch hidden md:block absolute top-7 h-[2px] w-[calc(50%-3.5rem)] ${
                    isLeft ? "right-1/2 mr-7" : "left-1/2 ml-7"
                  }`}
                  style={{ backgroundColor: item.accentColor, opacity: 0.45 }}
                />

                {/* card */}
                <div
                  className={`rm-card w-full ml-24 md:ml-0 md:w-[44%] ${
                    isLeft ? "md:mr-auto md:pr-6" : "md:ml-auto md:pl-6"
                  } bg-white rounded-2xl border border-stone-100 shadow-[0_14px_40px_-18px_rgba(13,13,13,0.15)] p-6 md:p-7`}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-[0.14em] mb-2"
                    style={{ color: item.accentColor }}
                  >
                    {item.role}
                  </p>
                  <h3 className="text-2xl md:text-[26px] font-bold text-[#0D0D0D] mb-2 tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-stone-500 text-[15px] leading-relaxed mb-4">{item.tagline}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rm-chip px-3 py-1 rounded-lg text-xs font-semibold border"
                        style={{
                          color: item.accentColor,
                          borderColor: `${item.accentColor}40`,
                          backgroundColor: item.accentBg,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-stone-400 italic border-t border-stone-100 pt-3">
                    &ldquo;{item.funFact}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
