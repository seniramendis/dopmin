import Image from "next/image";
import Link from "next/link";
import { SocialIconRow } from "./social-links";

// ─── FOOTER ─────────────────────────────────────────────────────────────────
// Single shared footer used on every page so links, columns and styling stay
// consistent site-wide instead of drifting per-page.
export function Footer() {
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
            <p className="text-[#555] text-sm leading-relaxed">
              Engineering digital luxury for brands that refuse to be ordinary.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Capabilities</span>
            <Link href="/expertise" className="hover:text-white transition-colors">Design</Link>
            <Link href="/expertise" className="hover:text-white transition-colors">Engineering</Link>
            <Link href="/expertise" className="hover:text-white transition-colors">AI Workflows</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Company</span>
            <Link href="/team" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/work" className="hover:text-white transition-colors">Work</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-1">Legal</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-[#747474] flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>© {new Date().getFullYear()} Dopmin. All Rights Reserved.</p>
          <SocialIconRow variant="dark" />
        </div>
      </div>
    </footer>
  );
}
