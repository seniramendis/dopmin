"use client";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK } from "./social-links";

// ─── FLOATING WHATSAPP WIDGET ──────────────────────────────────────────────────
// Fixed to the right side of the viewport, visible on every page (mounted once
// from app/layout.tsx). z-[60] keeps it above the nav (z-50) and any modals.
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dopmin on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed right-5 bottom-5 md:right-8 md:bottom-8 z-[60] inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:scale-110"
    >
      <FaWhatsapp className="relative w-8 h-8 md:w-9 md:h-9" />
    </a>
  );
}
