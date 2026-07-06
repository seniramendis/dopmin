import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Systems built around your operations, not the other way around. DopMin architects the specific solution that removes your bottleneck — from SEO-first builds to AI-powered automation.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
