"use client";

import { usePathname } from "next/navigation";
import WhatsAppButton from "./whatsapp-button";

// ─── WHATSAPP GATE ───────────────────────────────────────────────────────────
// The widget is mounted once in app/layout.tsx so it shows on every page by
// default. We don't want it floating over the Sanity Studio UI (it collides
// with Studio's own chrome) or over the blog, so it's suppressed on those
// routes here.
const HIDDEN_PREFIXES = ["/studio", "/blog"];

export function WhatsAppGate() {
  const pathname = usePathname();

  if (HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix))) {
    return null;
  }

  return <WhatsAppButton />;
}
