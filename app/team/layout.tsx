import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the full-stack engineers, designers, and QA specialists behind DopMin — the team that ships clean code fast and builds systems that actually move your business forward.",
  alternates: { canonical: "/team" },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
