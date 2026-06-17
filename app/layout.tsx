import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";

// Surge uses Instrument Sans for body and Inter for Headings
const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Dopmin | Engineering Digital Luxury",
  description: "Best-in-class design, marketing, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${instrumentSans.variable} ${inter.variable} font-sans antialiased bg-white text-[#747474]`}>
        {children}
      </body>
    </html>
  );
}