"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronDown, X, Menu } from "lucide-react";
import { GlobalSearch } from "./global-search";

// ─── SERVICES (mega-menu) ──────────────────────────────────────────────────────
// Slugs must match the `slug` field in app/expertise/data.ts — that file is
// the source of truth for the full service pages; this list just needs
// enough to render the dropdown without pulling in that page's icon imports.
const SERVICES = [
  {
    slug: "custom-software",
    name: "Custom Software",
    tagline: "High-leverage software systems built for enterprise scale.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#F26A10",
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    tagline: "Structured wireframes prioritizing intuitive user experiences.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#F0E080",
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    tagline: "Eliminate manual tasks with autonomous AI agents.",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#D94030",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    tagline: "Expert development for seamless mobile experiences.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#90E060",
  },
  {
    slug: "full-stack-web",
    name: "Full-Stack Web",
    tagline: "Custom web applications driven by modern frameworks.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#007ACC",
  },
];

const LINKS = [
  { label: "Solutions", href: "/solutions", key: "solutions" },
  { label: "Work", href: "/work", key: "work" },
  { label: "Blog", href: "/blog", key: "blog" },
  { label: "Contact", href: "/#contact", key: "contact" },
  { label: "Team", href: "/team", key: "team" },
] as const;

type ActiveKey = "expertise" | "solutions" | "work" | "blog" | "team" | "contact";

interface HeaderProps {
  /** Which nav item should render in the active/brand-orange state. */
  active?: ActiveKey;
  /** Where the "Book a Free Audit" button points. Defaults to the booking page. */
  ctaHref?: string;
}

// ─── HEADER ─────────────────────────────────────────────────────────────────────
// Single source of truth for the site nav. Used on every page so any future
// change (new link, copy tweak, styling) only needs to happen here.
export function Header({ active, ctaHref = "/book" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const linkClass = (key: string) =>
    key === active
      ? "text-[14px] font-medium text-[#F26A10] hover:text-[#D94030] transition-colors"
      : "text-[14px] font-medium text-stone-500 hover:text-[#0D0D0D] transition-colors";

  const mobileLinkClass = (key: string) =>
    key === active
      ? "text-[#F26A10] text-base font-semibold"
      : "text-stone-600 text-base font-medium hover:text-[#0D0D0D] transition-colors";

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-6">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-white/60"
      >
        <div className="px-6 h-16 flex items-center justify-between">
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
            <div className="relative" onMouseEnter={openServices} onMouseLeave={scheduleCloseServices}>
              <Link href="/expertise" className={`flex items-center gap-1 ${linkClass("expertise")}`}>
                Expertise
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[560px]"
                  >
                    <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-stone-100 p-3">
                      <p className="px-3 pt-2 pb-3 text-[11px] font-bold text-stone-400 uppercase tracking-[0.12em]">
                        Our Services
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/expertise/${service.slug}`}
                            onClick={() => setServicesOpen(false)}
                            className="group flex gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors"
                          >
                            <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                              <img
                                src={service.img}
                                alt={service.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: `linear-gradient(0deg, ${service.accentColor}55, transparent 60%)` }}
                              />
                            </div>
                            <div className="min-w-0 py-0.5">
                              <p className="text-[13px] font-semibold text-[#0D0D0D] mb-0.5 group-hover:text-[#F26A10] transition-colors">
                                {service.name}
                              </p>
                              <p className="text-[12px] text-[#8a8a8a] leading-snug line-clamp-2">
                                {service.tagline}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {LINKS.map((link) => (
              <Link key={link.key} href={link.href} className={linkClass(link.key)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-3">
            {/* Site-wide search — visible on mobile and desktop */}
            <GlobalSearch />

            {/* Desktop CTA */}
            <Link
              href={ctaHref}
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
              {open ? <X className="w-6 h-6 text-[#0D0D0D]" /> : <Menu className="w-6 h-6 text-[#0D0D0D]" />}
            </button>
          </div>
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
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className={`flex items-center justify-between w-full ${
                      active === "expertise" ? "text-[#F26A10] text-base font-semibold" : "text-[#0D0D0D] text-base font-semibold"
                    }`}
                    aria-expanded={mobileServicesOpen}
                  >
                    Expertise
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 flex flex-col gap-2">
                          {SERVICES.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/expertise/${service.slug}`}
                              onClick={() => {
                                setOpen(false);
                                setMobileServicesOpen(false);
                              }}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors"
                            >
                              <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                                <img src={service.img} alt={service.name} className="absolute inset-0 w-full h-full object-cover" />
                              </div>
                              <span className="text-stone-600 text-sm font-medium">{service.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {LINKS.map((link) => (
                  <Link key={link.key} href={link.href} onClick={() => setOpen(false)} className={mobileLinkClass(link.key)}>
                    {link.label}
                  </Link>
                ))}

                <Link
                  href={ctaHref}
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
