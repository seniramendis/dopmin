import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import { WhatsAppGate } from "./components/whatsapp-gate";
import CookieBanner from "./components/cookie-banner";
import { SITE_URL, SITE_NAME } from "../lib/site-config";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

// Surge uses Instrument Sans for body and Inter for Headings
const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument',
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-inter',
});

const DEFAULT_TITLE = `${SITE_NAME} - Engineering Digital Luxury & Scale`;
const DEFAULT_DESCRIPTION =
  "DopMin fuses enterprise full-stack engineering with autonomous AI workflows — custom software, UI/UX design, AI automation, and cloud migration built to run leaner, faster, and smarter.";
const OG_IMAGE = "/assets/images/dopmin.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s - ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "custom software engineering",
    "AI automation agency",
    "full-stack web development",
    "UI UX design agency",
    "cloud migration services",
    "SEO for startups",
    "DopMin",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Engineering Digital Luxury & Scale`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Set default consent to DENIED before the GA script loads */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            });
          `}
        </Script>
      </head>
      <body className={`${instrumentSans.variable} ${inter.variable} font-sans antialiased bg-white text-[#747474]`}>
        {children}
        <WhatsAppGate />
        
        {/* Display the consent banner at the bottom of the page */}
        <CookieBanner />
        
        {/* Load Google Analytics with your specific property ID */}
        <GoogleAnalytics gaId="G-NTCSHXNZEM" /> 
      </body>
    </html>
  );
}