"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Loader2, FileText, Sparkles, Newspaper, ArrowRight, CornerDownLeft } from "lucide-react";
import type { SearchResult } from "@/app/api/search/route";

const CATEGORY_ICON = {
  Pages: FileText,
  Expertise: Sparkles,
  Blog: Newspaper,
} as const;

interface GlobalSearchProps {
  className?: string;
}

// ─── GLOBAL SEARCH ──────────────────────────────────────────────────────────
// Site-wide command-palette style search. One instance lives in the header
// and is visible on both mobile and desktop; trigger it with the search icon
// or ⌘K / Ctrl+K from anywhere on the site.
export function GlobalSearch({ className }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const router = useRouter();

  // ⌘K / Ctrl+K opens from anywhere; Escape closes.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus input + lock scroll on open; reset state on close.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting local UI state on close, not syncing external data
    setQuery("");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResults([]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [open]);

  // Debounced fetch against /api/search, guarded against out-of-order responses.
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clearing stale results when the query is emptied
      setResults([]);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    setLoading(true);
    const currentId = ++requestIdRef.current;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        const data = await res.json();
        if (currentId === requestIdRef.current) {
          setResults(data.results ?? []);
          setActiveIndex(0);
        }
      } catch {
        if (currentId === requestIdRef.current) setResults([]);
      } finally {
        if (currentId === requestIdRef.current) setLoading(false);
      }
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[activeIndex];
      if (r) go(r.href);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className={
          className ??
          "flex items-center justify-center text-stone-400 hover:text-[#0D0D0D] transition-colors p-2 rounded-lg hover:bg-stone-50"
        }
      >
        <Search className="w-[18px] h-[18px]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Site search"
              className="w-full max-w-xl bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-stone-100 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 h-14 border-b border-stone-100 shrink-0">
                {loading ? (
                  <Loader2 className="w-[18px] h-[18px] text-stone-400 animate-spin shrink-0" />
                ) : (
                  <Search className="w-[18px] h-[18px] text-stone-400 shrink-0" />
                )}
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search pages, services, blog posts…"
                  className="flex-1 min-w-0 text-[15px] text-[#0D0D0D] placeholder:text-stone-400 outline-none bg-transparent"
                  aria-label="Search query"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="text-stone-400 hover:text-[#0D0D0D] transition-colors shrink-0"
                >
                  <X className="w-[18px] h-[18px]" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto py-2">
                {!query.trim() && (
                  <p className="px-5 py-10 text-center text-[13px] text-stone-400">
                    Start typing to search across the whole site
                  </p>
                )}

                {query.trim() && !loading && results.length === 0 && (
                  <p className="px-5 py-10 text-center text-[13px] text-stone-400">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}

                {results.length > 0 && (
                  <div className="flex flex-col">
                    {results.map((r, i) => {
                      const Icon = CATEGORY_ICON[r.category] ?? FileText;
                      const active = i === activeIndex;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => go(r.href)}
                          onMouseEnter={() => setActiveIndex(i)}
                          className={`flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                            active ? "bg-stone-50" : "bg-transparent"
                          }`}
                        >
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-stone-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-medium text-[#0D0D0D] truncate">{r.title}</p>
                            {r.description && (
                              <p className="text-[12px] text-stone-400 truncate">{r.description}</p>
                            )}
                          </div>
                          <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wide text-stone-300 shrink-0">
                            {r.category}
                          </span>
                          <ArrowRight
                            className={`w-3.5 h-3.5 shrink-0 transition-colors ${active ? "text-[#F26A10]" : "text-stone-300"}`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="px-5 py-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 shrink-0">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-[10px]">↑↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-[10px] inline-flex items-center">
                      <CornerDownLeft className="w-2.5 h-2.5" />
                    </kbd>{" "}
                    select
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-[10px]">esc</kbd> close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
