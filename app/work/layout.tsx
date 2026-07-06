import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from DopMin — real outcomes across healthcare, logistics, and retail, from offline-first hospital systems to AI dispatch agents and cloud migrations.",
  alternates: { canonical: "/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
