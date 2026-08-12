"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { WorldMap, projectWorldPoint, type WorldMapPoint } from "@/components/ui/world-map";

// Colombo, Sri Lanka — hub for every route
const COLOMBO: WorldMapPoint = {
  lat: 6.9271,
  lng: 79.8612,
  label: "Colombo",
  timeZone: "Asia/Colombo",
  isHub: true,
  labelPosition: "bottom",
};

const DESTINATIONS: WorldMapPoint[] = [
  { lat: 40.7128, lng: -74.006, label: "New York", timeZone: "America/New_York", labelPosition: "bottom" },
  { lat: 51.5072, lng: -0.1276, label: "London", timeZone: "Europe/London", labelPosition: "bottom" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", timeZone: "Asia/Singapore", labelPosition: "right" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai", timeZone: "Asia/Dubai", labelPosition: "top" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", timeZone: "Australia/Sydney", labelPosition: "bottom" },
  { lat: 52.52, lng: 13.405, label: "Berlin", timeZone: "Europe/Berlin", labelPosition: "bottom" },
  { lat: 37.7749, lng: -122.4194, label: "San Francisco", timeZone: "America/Los_Angeles", labelPosition: "bottom" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", timeZone: "Asia/Tokyo", labelPosition: "top" },
  { lat: -1.286389, lng: 36.817223, label: "Nairobi", timeZone: "Africa/Nairobi", labelPosition: "left" },
  { lat: 28.6139, lng: 77.209, label: "New Delhi", timeZone: "Asia/Kolkata", labelPosition: "top" },
];

export function WorldMapDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // On mobile the map is wider than its container (swipeable). Center the
  // initial scroll position on Colombo — the hub — instead of the map's
  // left edge, so it's visible without swiping first.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const centerOnColombo = () => {
      const { xPct } = projectWorldPoint(COLOMBO.lat, COLOMBO.lng);
      const target = xPct * el.scrollWidth - el.clientWidth / 2;
      const max = el.scrollWidth - el.clientWidth;
      el.scrollLeft = Math.min(Math.max(target, 0), max);
    };

    centerOnColombo();
    window.addEventListener("resize", centerOnColombo);
    return () => window.removeEventListener("resize", centerOnColombo);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-6 bg-white relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <p className="text-center text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-3">
            Global by Default
          </p>
          <h2
            className="w-full text-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#0D0D0D] leading-[1.05]"
            style={{ textAlign: "center" }}
          >
            Distance is not a dependency.
          </h2>
          <p className="text-center text-base sm:text-lg md:text-2xl font-medium text-[#747474] max-w-2xl mt-5 mx-auto leading-relaxed">
            We do remote work too — anywhere on the map. We ship, sync, and
            support clients across time zones as if we were down the hall.
          </p>
        </motion.div>

        <div className="mt-14 md:mt-20">
          <div className="md:hidden mb-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#a2a2a2]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" /></svg>
            Swipe to explore
          </div>
          <div
            ref={scrollRef}
            className="-mx-6 px-6 md:mx-0 md:px-6 overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="min-w-[720px] md:min-w-0">
              <WorldMap
                lineColor="#F26A10"
                dots={DESTINATIONS.map((destination) => ({
                  start: COLOMBO,
                  end: destination,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorldMapDemo;
