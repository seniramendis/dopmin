import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Dopmin",
  description: "How Dopmin collects, uses, and protects your information.",
};

const LAST_UPDATED = "July 4, 2026";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: [
      "Dopmin (\"we\", \"us\", or \"our\") provides design, engineering, and AI workflow services for our clients. This Privacy Policy explains what information we collect through our website, why we collect it, and how it is used and protected.",
      "By using our website or contacting us through it, you agree to the practices described in this policy.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "We collect information you provide directly, such as your name, email address, phone number, company name, and project details when you submit a contact form, book a call, or message us on WhatsApp.",
      "We also collect limited technical information automatically, including your browser type, device type, IP address, and general usage data (such as pages visited and time on site), which helps us understand how visitors use our website.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: [
      "We use the information we collect to respond to inquiries, prepare proposals, deliver our services, and communicate with you about your project.",
      "We may also use aggregated, non-identifying data to improve our website and understand which content and services are most useful to visitors. We do not sell your personal information to third parties.",
    ],
  },
  {
    title: "4. Sharing of Information",
    body: [
      "We do not share your personal information with third parties except where necessary to deliver our services (for example, scheduling tools or email providers we use to communicate with you), to comply with the law, or with your explicit consent.",
      "Any third-party service we use to process your data is expected to maintain appropriate security and confidentiality standards.",
    ],
  },
  {
    title: "5. Cookies & Tracking",
    body: [
      "Our website may use cookies or similar technologies to remember preferences and understand aggregate usage patterns. You can disable cookies through your browser settings; doing so may affect some site functionality.",
    ],
  },
  {
    title: "6. Data Retention",
    body: [
      "We retain personal information only for as long as necessary to fulfil the purposes described in this policy, including any legal, accounting, or reporting requirements.",
    ],
  },
  {
    title: "7. Your Rights",
    body: [
      "Depending on your location, you may have the right to access, correct, or request deletion of your personal information. To exercise any of these rights, contact us using the details below and we will respond as soon as reasonably possible.",
    ],
  },
  {
    title: "8. Security",
    body: [
      "We take reasonable technical and organizational measures to protect the information you share with us. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. The \"last updated\" date at the top of this page indicates when this policy was last revised.",
    ],
  },
  {
    title: "10. Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or how we handle your information, reach out to us via the contact form on our homepage or through the social channels linked in our footer.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Header />

      {/* ── HERO ── */}
      <section className="pt-36 pb-16 px-6 border-b border-[#e4e4e4]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">Legal</p>
          <h1 className="text-[clamp(32px,5vw,56px)] font-semibold leading-[1.1] mb-4 text-[#0D0D0D]">
            Privacy Policy
          </h1>
          <p className="text-[#747474] text-base">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {SECTIONS.map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-xl md:text-2xl font-semibold text-[#0D0D0D] mb-4">{title}</h2>
              <div className="flex flex-col gap-4">
                {body.map((p, i) => (
                  <p key={i} className="text-[#747474] text-[16px] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <p className="text-[#747474] text-[16px] leading-relaxed">
            See also our{" "}
            <Link href="/terms" className="text-[#F26A10] font-medium hover:text-[#D94030] transition-colors">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
