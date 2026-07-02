"use client";

import React from "react";
import Image from "next/image";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-[#0D0D0D]">
              We solve your operations <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-[#0D0D0D]">
                With Custom Dashboards
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://res.cloudinary.com/dukv2otyn/image/upload/v1783028766/Screenshot_2026-07-03_025703_tf94e8.png"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
          unoptimized
        />
      </ContainerScroll>
    </div>
  );
}
