import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | Dopmin",
  description: "The terms and conditions for using Dopmin's website and services.",
};

const LAST_UPDATED = "July 4, 2026";

const SECTIONS = [
  {
    title: "1. Agreement to Terms",
    body: [
      "These Terms of Service (\"Terms\") govern your use of the Dopmin website and any services you engage us for. By accessing our website or engaging our services, you agree to be bound by these Terms.",
      "If you do not agree with any part of these Terms, please do not use our website or services.",
    ],
  },
  {
    title: "2. Our Services",
    body: [
      "Dopmin provides design, engineering, and AI workflow services to clients on a project or retainer basis. The specific scope, deliverables, timeline, and pricing for any engagement are defined in a separate written proposal or agreement signed by both parties, which takes precedence over these general Terms where the two conflict.",
    ],
  },
  {
    title: "3. Website Use",
    body: [
      "You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use of, this website by any third party.",
      "You may not attempt to gain unauthorized access to any part of the website, its servers, or any systems connected to it.",
    ],
  },
  {
    title: "4. Intellectual Property",
    body: [
      "All content on this website, including text, graphics, logos, and code, is the property of Dopmin or its licensors and is protected by applicable intellectual property laws unless otherwise stated.",
      "Ownership of deliverables produced for a client project is governed by the terms of the relevant project agreement, not by this general policy.",
    ],
  },
  {
    title: "5. Payments & Engagements",
    body: [
      "Fees, payment schedules, and milestones for any project are set out in the applicable proposal or contract. Late or missing payments may result in a pause of work until outstanding amounts are settled, as further described in that agreement.",
    ],
  },
  {
    title: "6. Confidentiality",
    body: [
      "We treat information shared with us about your business and project as confidential and will not disclose it to third parties except as needed to deliver the engaged services or as required by law.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Dopmin will not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services. Our total liability for any claim relating to a project is limited to the fees paid for that project.",
    ],
  },
  {
    title: "8. Third-Party Links",
    body: [
      "Our website may contain links to third-party sites. We are not responsible for the content, accuracy, or practices of any linked third-party website.",
    ],
  },
  {
    title: "9. Changes to These Terms",
    body: [
      "We may revise these Terms from time to time. The \"last updated\" date at the top of this page reflects the most recent revision. Continued use of the website after changes are posted constitutes acceptance of the updated Terms.",
    ],
  },
  {
    title: "10. Contact Us",
    body: [
      "If you have questions about these Terms, please reach out via the contact form on our homepage or through the social channels linked in our footer.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="bg-white min-h-screen antialiased">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-36 pb-16 px-6 border-b border-[#e4e4e4]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">Legal</p>
          <h1 className="text-[clamp(32px,5vw,56px)] font-semibold leading-[1.1] mb-4 text-[#0D0D0D]">
            Terms of Service
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
            <Link href="/privacy" className="text-[#F26A10] font-medium hover:text-[#D94030] transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
