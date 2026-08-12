"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ExpertiseRoadmap } from "../components/expertise-roadmap";
import { EXPERTISE } from "./data";

// ─── EXPERTISE PAGE ───────────────────────────────────────────────────────────
export default function ExpertisePage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Header active="expertise" />

      {/* ── HERO BAND ── */}
      <section className="relative pt-36 pb-12 px-6 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
              Core Expertise
            </p>
            <h1 className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] mb-6 text-[#0D0D0D] max-w-3xl">
              Expansive areas of expertise
            </h1>
            <p className="text-[18px] md:text-xl text-[#747474] max-w-2xl leading-relaxed">
              Five disciplines. One integrated team. We architect solutions to capture opportunities across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ANIMATED EXPERTISE ROADMAP (GSAP) ── */}
      <ExpertiseRoadmap items={EXPERTISE} />

      {/* ── SDLC STRIP ── */}
      <section className="border-t border-[#e4e4e4] pt-24 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto text-center px-6 mb-16">
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold text-[#0D0D0D] leading-tight mb-4">
            How we engineer solutions.
          </h2>
          <p className="text-[#747474] text-lg leading-relaxed">
            We don’t just write code; we partner with you through the entire Software Development Life Cycle (SDLC) to ensure your product scales flawlessly.
          </p>
        </div>

        {[
          {
            label: "Phase 1: Discovery & Planning",
            title: "API Architecture & Requirements",
            body: "Before any code is written, we align on your business logic. We design secure REST/GraphQL API contracts, map out robust PostgreSQL/MySQL database schemas, and define cloud infrastructure requirements. This blueprint guarantees we build the right system from day one.",
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop", 
            imgSide: "right",
          },
          {
            label: "Phase 2: UI/UX Design",
            title: "Interactive Prototyping",
            body: "We translate complex workflows into minimalistic, professional interfaces. Starting with low-fidelity wireframes, we iterate to high-fidelity Figma prototypes. You test and feel the user experience perfectly before engineering begins.",
            img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&auto=format&fit=crop", 
            imgSide: "left",
          },
          {
            label: "Phase 3: Core Engineering",
            title: "Full-Stack Development",
            body: "Our developers execute the build using resilient stacks like React, Next.js, and Node.js. We integrate third-party APIs, establish complex agentic AI workflows, and write clean, maintainable code managed through Agile sprint cycles.",
            img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop", 
            imgSide: "right",
          },
          {
            label: "Phase 4: Assurance & Delivery",
            title: "QA, Security & Deployment",
            body: "We don't ship broken features. We implement strict CI/CD pipelines, automated QA testing, and security checks. Finally, we containerize your app with Docker and deploy to auto-scaling cloud servers like AWS or GCP for zero-downtime launches.",
            img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80&auto=format&fit=crop",
            imgSide: "left",
          },
        ].map(({ label, title, body, img, imgSide }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="border-b border-[#e4e4e4] last:border-b-0 grid md:grid-cols-2"
          >
            {/* Text panel */}
            <div
              className={`flex items-center px-6 md:px-16 py-16 md:py-24 bg-[#fafafa] ${
                imgSide === "left" ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="max-w-md">
                <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-5">
                  {label}
                </p>
                <h3 className="text-[clamp(28px,4vw,44px)] font-semibold text-[#0D0D0D] leading-[1.08] tracking-tight mb-6">
                  {title}
                </h3>
                <p className="text-[16px] text-[#747474] leading-relaxed">{body}</p>
              </div>
            </div>

            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className={`relative min-h-[320px] md:min-h-[440px] overflow-hidden ${
                imgSide === "left" ? "md:order-1" : "md:order-2"
              }`}
            >
              <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
          </motion.div>
        ))}
      </section>

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
            Ready to architect<br />your next system?
          </h2>
          <p className="text-[#747474] text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            Let’s discuss your technical requirements and map out the architecture together.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#F26A10] hover:bg-[#D94030] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            Request Free Audit <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}