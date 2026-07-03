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
    globeColor: "#0a2a6b",
    showAtmosphere: true,
    atmosphereColor: "#7db8ff",
    atmosphereAltitude: 0.22,
    emissive: "#0a2a6b",
    emissiveIntensity: 0.15,
    shininess: 0.7,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#93c5fd",
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
    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-6 bg-white relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative h-[32rem] sm:h-[36rem] md:h-[50rem]">
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
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-white z-30" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[70%] max-w-md h-10 rounded-full bg-black/10 blur-2xl z-0" />
        <div className="absolute w-full top-[9rem] sm:top-[10rem] md:top-[15rem] bottom-[-2rem] md:bottom-[-4rem] z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
