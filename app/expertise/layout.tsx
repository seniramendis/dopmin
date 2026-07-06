import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Custom software engineering, UI/UX design, AI automation, mobile app development, full-stack web development, and cloud migration — the five disciplines DopMin builds around.",
  alternates: { canonical: "/expertise" },
};

export default function ExpertiseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
