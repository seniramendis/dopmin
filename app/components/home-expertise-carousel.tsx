"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import type { LucideIcon } from "lucide-react";

export interface HomeExpertiseItem {
  icon: LucideIcon;
  title: string;
  tags: string[];
  desc: string;
  color: string;
  img: string;
  imgAlt: string;
}

function HomeExpertiseCardContent({ item }: { item: HomeExpertiseItem }) {
  const Icon = item.icon;
  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${item.color}1A` }}
      >
        <Icon className="h-7 w-7" style={{ color: item.color }} />
      </div>

      <p className="mb-8 text-lg leading-relaxed text-[#0D0D0D] md:text-2xl">
        {item.desc}
      </p>

      <div className="flex flex-wrap gap-3">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#e4e4e4] bg-[#fafafa] px-4 py-2 text-sm font-medium text-[#0D0D0D]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomeExpertiseCarousel({ items }: { items: HomeExpertiseItem[] }) {
  const cards = items.map((item, index) => (
    <Card
      key={item.title}
      index={index}
      card={{
        src: item.img,
        title: item.title,
        category: item.tags[0] ?? "",
        content: <HomeExpertiseCardContent item={item} />,
      }}
    />
  ));

  return (
    <div className="w-full">
      <Carousel items={cards} />
    </div>
  );
}
