"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import ThreeGlobe from "three-globe";
import { Color } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ ThreeGlobe });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      threeGlobe: any;
    }
  }
}

const RING_PROPAGATION_SPEED = 3;

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

function hexToRgb(hex: string) {
  const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const full = hex.replace(shorthand, (_m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
}

function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

function GlobeInstance({
  globeConfig,
  data,
}: {
  globeConfig: GlobeConfig;
  data: Position[];
}) {
  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    globeColor: "#062056",
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe
      .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude);

    const material = globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    material.color = new Color(defaultProps.globeColor);
    material.emissive = new Color(defaultProps.emissive);
    material.emissiveIntensity = defaultProps.emissiveIntensity;
    material.shininess = defaultProps.shininess;

    let points: { size: number; order: number; color: (t: number) => string; lat: number; lng: number }[] = [];
    data.forEach((arc) => {
      const rgb = hexToRgb(arc.color);
      const color = (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`;
      points.push({ size: defaultProps.pointSize, order: arc.order, color, lat: arc.startLat, lng: arc.startLng });
      points.push({ size: defaultProps.pointSize, order: arc.order, color, lat: arc.endLat, lng: arc.endLng });
    });

    globe
      .arcsData(data)
      .arcStartLat((d: any) => d.startLat)
      .arcStartLng((d: any) => d.startLng)
      .arcEndLat((d: any) => d.endLat)
      .arcEndLng((d: any) => d.endLng)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((d: any) => d.order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globe
      .pointsData(points)
      .pointColor((d: any) => d.color(0))
      .pointsMerge(true)
      .pointAltitude(0.001)
      .pointRadius(2);

    globe
      .ringsData([])
      .ringColor(() => (t: number) => `rgba(255,255,255,${1 - t})`)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);

    const interval = setInterval(() => {
      const active = genRandomNumbers(0, data.length, Math.max(1, Math.floor((data.length * 4) / 5)));
      globe.ringsData(
        data
          .filter((_d, i) => active.includes(i))
          .map((d) => ({ lat: d.startLat, lng: d.startLng }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [data, defaultProps]);

  useFrame(() => {
    if (globeRef.current && defaultProps.autoRotate !== false) {
      globeRef.current.rotation.y += (defaultProps.autoRotateSpeed ?? 0.5) * 0.001;
    }
  });

  // @ts-expect-error - threeGlobe is a custom JSX intrinsic from extend()
  return <threeGlobe ref={globeRef} />;
}

function Controls() {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;
    return () => controls.dispose();
  }, [camera, gl]);
  return null;
}

export function World({ globeConfig, data }: { globeConfig: GlobeConfig; data: Position[] }) {
  const dpr = useMemo(() => (typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1), []);

  // Zoom the camera further back on narrow screens so the globe doesn't
  // overflow its container — the globe's on-screen size is driven by
  // fov/distance, not by the canvas's CSS size, so this has to be explicit.
  const cameraZ = useMemo(() => {
    if (typeof window === "undefined") return 300;
    const w = window.innerWidth;
    if (w < 480) return 460;
    if (w < 768) return 400;
    return 300;
  }, []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ fov: 50, near: 180, far: 1800, position: [0, 0, cameraZ] }}
    >
      <ambientLight color={globeConfig.ambientLight ?? "#38bdf8"} intensity={1.1} />
      <directionalLight
        color={globeConfig.directionalLeftLight ?? "#ffffff"}
        position={[-400, 100, 400]}
        intensity={1.4}
      />
      <directionalLight
        color={globeConfig.directionalTopLight ?? "#ffffff"}
        position={[-200, 500, 200]}
        intensity={1.4}
      />
      <pointLight color={globeConfig.pointLight ?? "#ffffff"} position={[-200, 500, 200]} intensity={1.2} />
      <GlobeInstance globeConfig={globeConfig} data={data} />
      <Controls />
    </Canvas>
  );
}
