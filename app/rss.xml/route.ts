import { client, safeSanityFetch } from "@/lib/sanity";
import { SITE_URL } from "@/lib/site-config";

export async function GET() {
  const posts = await safeSanityFetch<Array<{ title: string; slug: { current: string }; excerpt?: string; publishedAt: string; author?: string }>>(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      excerpt,
      publishedAt,
      author
    }`
  );

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Dopmin Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Insights from the Dopmin team</description>
    ${posts
      .map((post) => `
    <item>
      <title>${post.title}</title>
      <link>${SITE_URL}/blog/${post.slug.current}</link>
      <description>${post.excerpt || ""}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${post.author || "Dopmin Team"}</author>
    </item>`)
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
