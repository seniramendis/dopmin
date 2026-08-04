"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import type { ExpertiseRoadmapItem } from "./expertise-roadmap";

function ExpertiseCardContent({ item }: { item: ExpertiseRoadmapItem }) {
  const Icon = item.icon;
  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: item.accentBg }}
      >
        <Icon className="h-7 w-7" style={{ color: item.accentColor }} />
      </div>

      <p className="mb-6 text-lg leading-relaxed text-[#0D0D0D] md:text-2xl">
        {item.tagline}
      </p>

      <p className="mb-8 text-base leading-relaxed text-[#747474] md:text-lg">
        {item.funFact}
      </p>

      <div className="flex flex-wrap gap-3">
        {item.skills.map((skill) => {
          const SkillIcon = skill.icon;
          return (
            <span
              key={skill.name}
              className="flex items-center gap-2 rounded-full border border-[#e4e4e4] bg-[#fafafa] px-4 py-2 text-sm font-medium text-[#0D0D0D]"
            >
              <SkillIcon className="h-4 w-4" style={{ color: item.accentColor }} />
              {skill.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function ExpertiseCarousel({ items }: { items: ExpertiseRoadmapItem[] }) {
  const cards = items.map((item, index) => (
    <Card
      key={item.name}
      index={index}
      card={{
        src: item.img,
        title: item.name,
        category: item.role,
        content: <ExpertiseCardContent item={item} />,
      }}
    />
  ));

  return (
    <div className="w-full">
      <Carousel items={cards} />
    </div>
  );
}
