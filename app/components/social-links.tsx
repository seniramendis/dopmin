import type { SVGProps } from "react";

// ─── BRAND ICONS ──────────────────────────────────────────────────────────────
// lucide-react no longer ships brand/social glyphs, so these are hand-rolled,
// minimal, currentColor SVGs that stay crisp at any size.

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V9H3.56v11.45Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.4 21v-7.97h2.68l.4-3.1h-3.08V8.1c0-.9.25-1.51 1.54-1.51h1.64V3.84A22 22 0 0 0 14.96 3.7c-2.6 0-4.38 1.58-4.38 4.49v2.74H7.9v3.1h2.68V21h3.82Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5a9.1 9.1 0 0 1-1.68-2.1c-.18-.3-.02-.46.15-.65.17-.2.4-.5.6-.74.2-.25.13-.42 0-.65-.13-.22-.97-2.34-1.13-2.7-.16-.36-.32-.32-.45-.32-.13 0-.42-.02-.65-.02-.22 0-.58.07-.88.4-.3.32-1.15 1.12-1.15 2.74 0 1.62 1.18 3.18 1.35 3.4.17.22 2.26 3.44 5.5 4.7 3.24 1.25 3.24.83 3.82.78.58-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.02 2.5a9.5 9.5 0 0 0-8.2 14.32L2.5 21.5l4.83-1.27a9.5 9.5 0 1 0 4.69-17.73Zm0 1.7a7.8 7.8 0 1 1-4.06 14.47l-.3-.18-2.7.71.72-2.63-.2-.3a7.8 7.8 0 0 1 6.54-12.07Z" />
    </svg>
  );
}

// ─── SOCIAL LINKS DATA ─────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/dopminofficial/",
    Icon: LinkedInIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/dopmin.off/",
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/profile.php?id=61571858456914",
    Icon: FacebookIcon,
  },
] as const;

export const WHATSAPP_NUMBER = "94704952534"; // +94 70 495 2534
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Dopmin! I'd like to know more about your services."
)}`;

// ─── REUSABLE ICON ROW ─────────────────────────────────────────────────────────
export function SocialIconRow({
  variant = "dark",
  className = "",
}: {
  /** "dark" = circular outline for dark backgrounds (footer). "light" = for light backgrounds. */
  variant?: "dark" | "light";
  className?: string;
}) {
  const base =
    variant === "dark"
      ? "border-white/15 text-[#a2a2a2] hover:text-white hover:border-white/40 hover:bg-white/5"
      : "border-[#e4e4e4] text-[#747474] hover:text-[#0D0D0D] hover:border-[#0D0D0D]/30 hover:bg-[#fafafa]";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Dopmin on ${name}`}
          title={name}
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 hover:-translate-y-0.5 ${base}`}
        >
          <Icon className="w-[18px] h-[18px]" />
        </a>
      ))}
    </div>
  );
}
