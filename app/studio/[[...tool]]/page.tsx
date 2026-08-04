"use client";

/**
 * This route mounts the embedded Sanity Studio at /studio.
 * It reuses the single source of truth in sanity.config.ts at the project root
 * (same config used by `sanity dev` / `sanity deploy` if you ever run those directly).
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
