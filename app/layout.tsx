import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DopMin — Enterprise AI & Full-Stack Engineering",
  description:
    "DopMin fuses enterprise full-stack engineering with autonomous AI workflows — so your operations run leaner, faster, and smarter. Based in Sri Lanka, serving globally.",
  keywords: ["AI automation", "full-stack engineering", "PWA", "cloud migration", "Sri Lanka", "LLM workflows"],
  openGraph: {
    title: "DopMin — Enterprise AI & Full-Stack Engineering",
    description:
      "We build systems that think for you. Offline-first PWAs, agentic AI, cloud migration, and headless commerce.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
