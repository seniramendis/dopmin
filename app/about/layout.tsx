import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Dopmin Technologies is a software studio building custom engineering, design, and AI automation for brands that refuse to be ordinary. Here's who we are and how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
