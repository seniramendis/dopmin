'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Tell TypeScript that window.gtag is a valid function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const STORAGE_KEY = 'dopmin_cookie_consent';
const CONSENT_VERSION = 1;

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent extends ConsentState {
  version: number;
  timestamp: string;
}

function pushConsentToGtag(consent: ConsentState) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied',
    });
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    // Check local storage to see if they've answered before, and whether
    // that answer was recorded under the current consent schema version.
    const raw = localStorage.getItem(STORAGE_KEY);
    let stored: StoredConsent | null = null;
    try {
      stored = raw ? JSON.parse(raw) : null;
    } catch {
      stored = null;
    }

    if (!stored || stored.version !== CONSENT_VERSION) {
      const timer = setTimeout(() => setShowBanner(true), 600);
      return () => clearTimeout(timer);
    }

    // Re-apply their saved choice on every page load, since Consent Mode
    // defaults to denied on each fresh script load.
    pushConsentToGtag(stored);
  }, []);

  const saveConsent = (consent: ConsentState) => {
    const payload: StoredConsent = {
      ...consent,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    pushConsentToGtag(consent);
    setShowBanner(false);
    setShowDetails(false);
  };

  const acceptAll = () => saveConsent({ analytics: true, marketing: true });
  const rejectAll = () => saveConsent({ analytics: false, marketing: false });
  const savePreferences = () => saveConsent({ analytics, marketing });

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="animate-slide-up-fade fixed inset-x-0 bottom-0 z-[70] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md"
    >
      <div className="border-t border-stone-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.06)] md:rounded-2xl md:border md:shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="mx-auto max-w-3xl px-5 py-4 md:mx-0 md:max-w-none">
          <p className="text-[13px] font-semibold text-[#0D0D0D]">
            Cookie preferences
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-stone-500">
            We use cookies to run this site, understand how visitors use it,
            and — if you allow it — for marketing. See our{' '}
            <Link
              href="/privacy"
              className="font-medium text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-[#F26A10] hover:decoration-[#F26A10]"
            >
              Privacy Policy
            </Link>{' '}
            for details.
          </p>

          {showDetails && (
            <div className="mt-3 space-y-2.5 rounded-xl border border-stone-200 bg-stone-50/60 p-3.5">
              {/* Necessary — always on, cannot be disabled */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12.5px] font-semibold text-[#0D0D0D]">
                    Necessary
                  </p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-stone-500">
                    Required for the site to function. Always active.
                  </p>
                </div>
                <span className="mt-0.5 shrink-0 rounded-full bg-stone-200 px-2.5 py-1 text-[11px] font-semibold text-stone-500">
                  On
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-3 border-t border-stone-200 pt-2.5">
                <div>
                  <p className="text-[12.5px] font-semibold text-[#0D0D0D]">
                    Analytics
                  </p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-stone-500">
                    Helps us understand traffic and usage to improve the site.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={analytics}
                  aria-label="Toggle analytics cookies"
                  onClick={() => setAnalytics((v) => !v)}
                  className={`mt-0.5 relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                    analytics ? 'bg-[#F26A10]' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      analytics ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-3 border-t border-stone-200 pt-2.5">
                <div>
                  <p className="text-[12.5px] font-semibold text-[#0D0D0D]">
                    Marketing
                  </p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-stone-500">
                    Used to measure ad performance and personalize outreach.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={marketing}
                  aria-label="Toggle marketing cookies"
                  onClick={() => setMarketing((v) => !v)}
                  className={`mt-0.5 relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                    marketing ? 'bg-[#F26A10]' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      marketing ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2 md:justify-end">
            <button
              onClick={() => setShowDetails((v) => !v)}
              className="mr-auto text-[12.5px] font-semibold text-stone-500 underline decoration-stone-300 underline-offset-2 hover:text-stone-800 md:order-first"
            >
              {showDetails ? 'Hide options' : 'Manage preferences'}
            </button>

            <button
              onClick={rejectAll}
              className="flex-1 rounded-xl border border-stone-200 px-4 py-2 text-[13px] font-semibold text-stone-600 transition-colors hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900 md:flex-none"
            >
              Reject all
            </button>

            {showDetails ? (
              <button
                onClick={savePreferences}
                className="flex-1 rounded-xl bg-[#F26A10] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#D94030] md:flex-none"
              >
                Save preferences
              </button>
            ) : (
              <button
                onClick={acceptAll}
                className="flex-1 rounded-xl bg-[#F26A10] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#D94030] md:flex-none"
              >
                Accept all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}