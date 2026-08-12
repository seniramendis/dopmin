import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site-config";
import { safeSanityFetch } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/expertise", "/solutions", "/work", "/team", "/book", "/blog", "/privacy", "/terms"];

  const staticPages = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const posts = await safeSanityFetch<Array<{ slug: string; publishedAt: string }>>(`*[_type == "post"]{ "slug": slug.current, publishedAt }`);

  const blogPosts = posts.map((post: { slug: string; publishedAt: string }) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts];
}
