import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Audit",
  description:
    "Book a free audit with DopMin. Walk us through your current stack and we'll identify your highest-leverage automation opportunity — no pitch, no obligation.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
