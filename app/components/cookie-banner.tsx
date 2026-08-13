'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

// Tell TypeScript that window.gtag is a valid function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check local storage to see if they've answered before
    const consent = localStorage.getItem('dopmin_cookie_consent');
    if (consent) {
      setShowBanner(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('dopmin_cookie_consent', 'granted');
    setShowBanner(false);

    // Tell Google Analytics it is now legally allowed to track
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem('dopmin_cookie_consent', 'denied');
    setShowBanner(false);
  };

  if (!mounted || !showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="animate-slide-up-fade fixed bottom-5 left-5 right-5 z-[70] md:left-6 md:right-auto md:bottom-6 md:max-w-sm"
    >
      <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] backdrop-blur-md">
        {/* Accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-orange via-brand-gold to-brand-red" />

        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
              <Cookie className="h-5 w-5 text-brand-orange" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">
                We value your privacy
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                We use cookies to analyze traffic and improve your experience.
                By accepting, your data may be aggregated with other visitors&apos; data.{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-brand-orange hover:decoration-brand-orange"
                >
                  Read our Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={declineCookies}
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="rounded-lg bg-brand-orange px-4 py-2 text-[13px] font-semibold text-white shadow-sm shadow-brand-orange/30 transition-transform hover:scale-[1.03] hover:bg-brand-orange/90 active:scale-[0.98]"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
