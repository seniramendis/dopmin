"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#F26A10", "#D94030", "#3b82f6"];
  const sampleArcs = [
    { order: 1, startLat: 6.9271, startLng: 79.8612, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: colors[0] },
    { order: 1, startLat: 6.9271, startLng: 79.8612, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.4, color: colors[1] },
    { order: 2, startLat: 6.9271, startLng: 79.8612, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: colors[2] },
    { order: 2, startLat: 6.9271, startLng: 79.8612, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.2, color: colors[0] },
    { order: 3, startLat: 6.9271, startLng: 79.8612, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.5, color: colors[1] },
    { order: 3, startLat: 6.9271, startLng: 79.8612, endLat: 52.52, endLng: 13.405, arcAlt: 0.4, color: colors[2] },
    { order: 4, startLat: 6.9271, startLng: 79.8612, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.6, color: colors[0] },
    { order: 4, startLat: 6.9271, startLng: 79.8612, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: colors[1] },
    { order: 5, startLat: 6.9271, startLng: 79.8612, endLat: -1.286389, endLng: 36.817223, arcAlt: 0.3, color: colors[2] },
    { order: 5, startLat: 6.9271, startLng: 79.8612, endLat: 28.6139, endLng: 77.209, arcAlt: 0.2, color: colors[0] },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 bg-[#0a0a0a] relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative h-[32rem] md:h-[40rem]">
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
          <h2 className="text-center text-2xl md:text-4xl font-semibold text-white">
            We do remote work too — anywhere on the map.
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-400 max-w-xl mt-3 mx-auto leading-relaxed">
            Distance is not a dependency. We ship, sync, and support clients
            across time zones as if we were down the hall.
          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-[#0a0a0a] z-30" />
        <div className="absolute w-full -bottom-16 h-[28rem] md:h-full z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
