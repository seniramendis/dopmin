"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { BlogPostGrid } from "./blog-post-grid";
import type { Post } from "../blog/page";

const ALL = "all";

export function BlogListing({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.category).filter((c): c is string => Boolean(c))));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = category === ALL || post.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;

      const haystack = `${post.title} ${post.excerpt ?? ""} ${post.author ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, category]);

  return (
    <div>
      {/* ── SEARCH + CATEGORY FILTER — joined pill, Surge.global style ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row max-w-[684px] mx-auto mb-16 gap-4 sm:gap-0"
      >
        <div className="relative flex-1 sm:max-w-[448px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search articles"
            className="w-full h-[46px] rounded-lg sm:rounded-r-none border border-[#e4e4e4] px-5 pr-11 text-[#747474] text-base outline-none focus:border-[#F26A10]/50 transition-colors"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3] pointer-events-none" />
        </div>

        <div className="relative flex-1 sm:max-w-[236px] sm:-ml-px">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="w-full h-[46px] rounded-lg sm:rounded-l-none border border-[#e4e4e4] pl-5 pr-10 text-[#171717] text-base outline-none focus:border-[#F26A10]/50 transition-colors appearance-none bg-white"
          >
            <option value={ALL}>All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171717] pointer-events-none" />
        </div>
      </motion.div>

      {/* ── RESULTS ── */}
      {posts.length > 0 && filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center py-24 px-6 border border-dashed border-stone-200 rounded-2xl"
        >
          <div className="w-14 h-14 rounded-full bg-[#F26A10]/10 flex items-center justify-center mb-6">
            <Search className="w-6 h-6 text-[#F26A10]" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#0D0D0D] mb-2">
            No articles match your search
          </h2>
          <p className="text-[#747474] max-w-md mb-6 leading-relaxed">
            Try a different search term or browse all categories instead.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory(ALL);
            }}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold bg-[#F26A10] text-white px-6 py-3 rounded-xl hover:bg-[#D94030] transition-colors shadow-sm"
          >
            Reset filters
          </button>
        </motion.div>
      ) : (
        <BlogPostGrid posts={filteredPosts} />
      )}
    </div>
  );
}
