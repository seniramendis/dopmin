import { NextRequest, NextResponse } from "next/server";
import { safeSanityFetch } from "@/lib/sanity";
import { EXPERTISE } from "@/app/expertise/data";

// ─── SITE-WIDE SEARCH ──────────────────────────────────────────────────────
// Combines three sources into one ranked result list:
//   1. Static pages   – hardcoded routes below (edit this list when adding pages)
//   2. Expertise      – service data from app/expertise/data.ts (single source of truth)
//   3. Blog posts     – live query against Sanity
// Add a new source by pushing more scored results into `results` below.

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  href: string;
  category: "Pages" | "Expertise" | "Blog";
}

type ScoredResult = SearchResult & { score: number };

const STATIC_PAGES: Omit<SearchResult, "category">[] = [
  { id: "home", title: "Home", description: "DopMin — software, design & AI studio", href: "/" },
  { id: "solutions", title: "Solutions", description: "How we solve problems for our clients", href: "/solutions" },
  { id: "work", title: "Work", description: "Case studies and past projects", href: "/work" },
  { id: "blog", title: "Blog", description: "Insights, updates and stories from the team", href: "/blog" },
  { id: "team", title: "Team", description: "Meet the people behind DopMin", href: "/team" },
  { id: "expertise", title: "Expertise", description: "Everything we do, in one place", href: "/expertise" },
  { id: "book", title: "Book a Free Audit", description: "Schedule a free consultation", href: "/book" },
  { id: "contact", title: "Contact", description: "Get in touch with the team", href: "/#contact" },
  { id: "privacy", title: "Privacy Policy", href: "/privacy" },
  { id: "terms", title: "Terms of Service", href: "/terms" },
];

// Simple substring/prefix scorer — good enough for a small site index and
// keeps this dependency-free. Swap for fuzzy matching later if needed.
function scoreMatch(haystack: string | undefined, q: string): number {
  if (!haystack) return 0;
  const h = haystack.toLowerCase();
  if (h === q) return 100;
  if (h.startsWith(q)) return 80;
  if (h.includes(q)) return 50;
  // loose word-by-word match, e.g. "ai auto" -> "AI & Automation"
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((w) => h.includes(w))) return 35;
  return 0;
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("q") || "";
  const q = raw.trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results: ScoredResult[] = [];

  // 1. Static pages
  for (const page of STATIC_PAGES) {
    const score = Math.max(scoreMatch(page.title, q), scoreMatch(page.description, q) * 0.6);
    if (score > 0) results.push({ ...page, category: "Pages", score });
  }

  // 2. Expertise / services
  for (const service of EXPERTISE) {
    const score = Math.max(
      scoreMatch(service.name, q),
      scoreMatch(service.role, q) * 0.6,
      scoreMatch(service.tagline, q) * 0.7,
      scoreMatch(service.description, q) * 0.4,
      ...service.capabilities.map((c) => scoreMatch(c, q) * 0.4),
    );
    if (score > 0) {
      results.push({
        id: `expertise-${service.slug}`,
        title: service.name,
        description: service.tagline,
        href: `/expertise/${service.slug}`,
        category: "Expertise",
        score,
      });
    }
  }

  // 3. Blog posts — live Sanity query, gracefully no-ops if Sanity isn't configured
  try {
    const posts = await safeSanityFetch<
      Array<{ _id: string; title: string; slug: { current: string }; excerpt?: string; category?: string }>
    >(
      `*[_type == "post" && (title match $q || excerpt match $q || category match $q)] | order(publishedAt desc) [0...10] {
        _id, title, slug, excerpt, category
      }`,
      { q: `*${q}*` },
    );

    for (const post of posts || []) {
      if (!post?.slug?.current) continue;
      const score = Math.max(scoreMatch(post.title, q), scoreMatch(post.excerpt, q) * 0.6, scoreMatch(post.category, q) * 0.5) || 30;
      results.push({
        id: `blog-${post._id}`,
        title: post.title,
        description: post.excerpt,
        href: `/blog/${post.slug.current}`,
        category: "Blog",
        score,
      });
    }
  } catch {
    // Sanity errors shouldn't break search for pages/expertise
  }

  const sorted = results
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r): SearchResult => ({ id: r.id, title: r.title, description: r.description, href: r.href, category: r.category }));

  return NextResponse.json({ results: sorted });
}
