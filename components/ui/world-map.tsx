"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

const map = new DottedMap({ height: 100, grid: "diagonal" });

const svgMap = map.getSVG({
  radius: 0.22,
  color: "#00000040",
  shape: "circle",
  backgroundColor: "white",
});

export interface WorldMapPoint {
  lat: number;
  lng: number;
  label?: string;
  /** IANA time zone, e.g. "Asia/Colombo" — shows a live local time under the label */
  timeZone?: string;
  /** Which side of the dot the label sits on. Defaults to "top". */
  labelPosition?: "top" | "bottom" | "left" | "right";
  /** Marks this point as the hub — styled bigger, with the pulsing halo. */
  isHub?: boolean;
}

export interface WorldMapDot {
  start: WorldMapPoint;
  end: WorldMapPoint;
}

interface WorldMapProps {
  dots?: WorldMapDot[];
  lineColor?: string;
  showLabels?: boolean;
}

function useLiveTime(timeZone?: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (!timeZone) return;
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-US", {
            timeZone,
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(new Date())
        );
      } catch {
        setTime(null);
      }
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

function PointLabel({
  point,
  xPct,
  yPct,
}: {
  point: WorldMapPoint;
  xPct: number;
  yPct: number;
}) {
  const time = useLiveTime(point.timeZone);
  if (!point.label) return null;

  const position = point.labelPosition ?? "top";
  const offsetClass =
    position === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-1.5"
      : position === "bottom"
        ? "top-full left-1/2 -translate-x-1/2 mt-1.5"
        : position === "left"
          ? "right-full top-1/2 -translate-y-1/2 mr-1.5"
          : "left-full top-1/2 -translate-y-1/2 ml-1.5";

  return (
    <div
      className="absolute z-10"
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
    >
      <div
        className={`absolute whitespace-nowrap ${offsetClass} ${
          point.isHub
            ? "rounded-full bg-[#0D0D0D] px-2.5 py-1 shadow-sm"
            : "rounded-full bg-white/95 px-2 py-0.5 shadow-sm ring-1 ring-black/5"
        }`}
      >
        <span
          className={`font-semibold ${
            point.isHub ? "text-[11px] text-white" : "text-[10px] text-[#0D0D0D]"
          }`}
        >
          {point.label}
        </span>
        {time && (
          <span
            className={`ml-1.5 font-medium tabular-nums ${
              point.isHub ? "text-[10px] text-white/70" : "text-[9px] text-[#747474]"
            }`}
          >
            {time}
          </span>
        )}
      </div>
    </div>
  );
}

export function WorldMap({
  dots = [],
  lineColor = "#F26A10",
  showLabels = true,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { width: mapWidth, height: mapHeight } = map.image;

  const projectPoint = (lat: number, lng: number) => {
    const pin = map.getPin({ lat, lng });
    return { x: pin.x, y: pin.y };
  };

  // Bows the curve up and away from the straight line between the two
  // points, scaled to the distance between them. Using the pair's own
  // midpoint (rather than whichever point is higher on the map) keeps this
  // correct for destinations both north AND south of the hub — anchoring
  // to "whichever point is higher" made southbound routes loop back on
  // themselves.
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const dist = Math.hypot(end.x - start.x, end.y - start.y);
    const bow = midY - dist * 0.22;
    return `M ${start.x} ${start.y} Q ${midX} ${bow} ${end.x} ${end.y}`;
  };

  // Collect every unique point across all routes so labels render once each.
  const uniquePoints = new Map<string, WorldMapPoint>();
  for (const dot of dots) {
    for (const point of [dot.start, dot.end]) {
      const key = `${point.lat.toFixed(2)},${point.lng.toFixed(2)}`;
      const existing = uniquePoints.get(key);
      if (!existing || (!existing.label && point.label)) {
        uniquePoints.set(key, point);
      }
    }
  }

  return (
    <div className="w-full aspect-[2/1] bg-white rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height={mapHeight}
        width={mapWidth}
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="w-full h-full absolute inset-0 pointer-events-none select-none overflow-visible"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const pathD = createCurvedPath(startPoint, endPoint);
          const travelDuration = 2.5 + (i % 4) * 0.6;
          const travelDelay = i * 0.35;
          return (
            <g key={`path-${i}`}>
              <motion.path
                id={`route-path-${i}`}
                d={pathD}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth={mapWidth * 0.00125}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
              />
              {/* Traveling light: keeps the route feeling alive after the
                  initial draw-in, looping from hub to destination forever. */}
              <circle r={mapWidth * 0.0035} fill={lineColor}>
                <animateMotion
                  dur={`${travelDuration}s`}
                  begin={`${1 + travelDelay}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={`#route-path-${i}`} xlinkHref={`#route-path-${i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.08;0.92;1"
                  dur={`${travelDuration}s`}
                  begin={`${1 + travelDelay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="80%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {Array.from(uniquePoints.values()).map((point, i) => {
          const { x, y } = projectPoint(point.lat, point.lng);
          const r = point.isHub ? mapWidth * 0.004 : mapWidth * 0.0025;
          return (
            <g key={`point-${i}`}>
              <circle cx={x} cy={y} r={r} fill={lineColor} />
              <circle cx={x} cy={y} r={r} fill={lineColor} opacity="0.5">
                <animate attributeName="r" from={r} to={r * 4} dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>

      {showLabels && (
        <div className="absolute inset-0">
          {Array.from(uniquePoints.values()).map((point, i) => {
            const { x, y } = projectPoint(point.lat, point.lng);
            return (
              <PointLabel
                key={`label-${i}`}
                point={point}
                xPct={(x / mapWidth) * 100}
                yPct={(y / mapHeight) * 100}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default WorldMap;
