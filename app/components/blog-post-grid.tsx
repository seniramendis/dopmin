"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { urlFor } from "@/lib/sanity";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: unknown;
  publishedAt: string;
  author: string;
  category?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const formatPostDate = (value?: string) => {
  if (!value) return "Draft";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? "Draft"
    : parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// Deterministic accent from author initials so avatars don't all look identical.
const AVATAR_PALETTE = ["#F26A10", "#D94030", "#0D0D0D", "#747474"];
function avatarColor(seed: string) {
  const code = seed.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
      style={{ backgroundColor: avatarColor(name || "Dopmin Team") }}
    >
      {initials || "DM"}
    </div>
  );
}

export function BlogPostGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center py-24 px-6 border border-dashed border-stone-200 rounded-2xl"
      >
        <div className="w-14 h-14 rounded-full bg-[#F26A10]/10 flex items-center justify-center mb-6">
          <Newspaper className="w-6 h-6 text-[#F26A10]" />
        </div>
        <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">
          Nothing published yet
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0D0D] mb-3">
          The first post is one click away
        </h2>
        <p className="text-[#747474] max-w-md mb-8 leading-relaxed">
          Publish your first entry in Sanity Studio and it&apos;ll show up here automatically.
        </p>
        <Link
          href="/studio"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold bg-[#F26A10] text-white px-6 py-3 rounded-xl hover:bg-[#D94030] transition-colors shadow-sm"
        >
          Open Sanity Studio <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
      className="max-w-[1392px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-14"
    >
      {posts.map((post) => (
        <motion.div key={post._id} variants={fadeUp} className="h-full">
          <Link href={`/blog/${post.slug.current}`} className="group block h-full">
            <article className="h-full flex flex-col bg-white border border-[#e4e4e4] rounded-2xl overflow-hidden hover:border-[#F26A10]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                {post.coverImage ? (
                  <Image
                    src={urlFor(post.coverImage).width(900).height(560).url()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-stone-300" />
                  </div>
                )}
                {post.category && (
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#F26A10] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-semibold text-[#0D0D0D] mb-2 group-hover:text-[#F26A10] transition-colors leading-snug">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-[#747474] text-sm leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-[#e4e4e4] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm text-[#747474]">
                    <Avatar name={post.author || "Dopmin Team"} />
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-[#0D0D0D] text-[13px]">{post.author || "Dopmin Team"}</span>
                      <span className="text-xs">{formatPostDate(post.publishedAt)}</span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#F26A10] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
