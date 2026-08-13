'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Tell TypeScript that window.gtag is a valid function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check local storage to see if they've answered before
    const consent = localStorage.getItem('dopmin_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('dopmin_cookie_consent', 'granted');
    setShowBanner(false);
    
    // Tell Google Analytics it is now legally allowed to track
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem('dopmin_cookie_consent', 'denied');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-slate-300">
        <p>
          We use cookies to analyze our website traffic and optimize your experience. 
          By accepting our use of cookies, your data will be aggregated with all other user data. 
          <Link href="/privacy" className="underline ml-1 hover:text-white">Read our Privacy Policy</Link>.
        </p>
      </div>
      <div className="flex gap-4 shrink-0">
        <button 
          onClick={declineCookies}
          className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
        >
          Decline
        </button>
        <button 
          onClick={acceptCookies}
          className="px-4 py-2 text-sm bg-white text-slate-900 rounded-md hover:bg-slate-200 transition-colors font-medium"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}
