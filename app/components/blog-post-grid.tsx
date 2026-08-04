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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post) => (
        <motion.div key={post._id} variants={fadeUp}>
          <Link href={`/blog/${post.slug.current}`} className="group block h-full">
            <article className="h-full flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#F26A10]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {post.coverImage ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={urlFor(post.coverImage).width(600).height(375).url()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center">
                  <Newspaper className="w-8 h-8 text-stone-300" />
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-[#747474] mb-3">
                  <span className="font-medium text-[#0D0D0D]">{post.author || "Dopmin Team"}</span>
                  <span>•</span>
                  <span>{formatPostDate(post.publishedAt)}</span>
                </div>

                <h2 className="text-xl font-semibold text-[#0D0D0D] mb-2 group-hover:text-[#F26A10] transition-colors leading-snug">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-[#747474] text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#F26A10] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
