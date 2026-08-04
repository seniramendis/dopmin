import { client, safeSanityFetch, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { BlogNav } from "../components/blog-nav";
import { Footer } from "../components/footer";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: any;
  publishedAt: string;
  author: string;
}

const formatPostDate = (value?: string) => {
  if (!value) return "Draft";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "Draft" : format(parsed, "MMM d, yyyy");
};

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    author
  }`;

  return safeSanityFetch<Post[]>(query);
}

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description: "Insights, updates, and stories from the Dopmin team.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white antialiased">
      <BlogNav />

      <div className="max-w-6xl mx-auto pt-36 pb-24 px-6 md:px-12 lg:px-24">
        <div className="mb-16">
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-[#0D0D0D] mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Blog
          </h1>
          <p className="text-[#747474] text-lg max-w-xl leading-relaxed">
            Insights, updates, and stories from the Dopmin team on engineering,
            design, and AI.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block">
                <article className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#F26A10]/40 hover:shadow-lg transition-all duration-300">
                  {post.coverImage ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={urlFor(post.coverImage).width(600).height(375).url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-stone-100 flex items-center justify-center">
                      <span className="text-stone-400 text-sm">No image</span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-[#747474] mb-3">
                      <span className="font-medium text-[#0D0D0D]">{post.author || "Dopmin Team"}</span>
                      <span>•</span>
                      <span>{formatPostDate(post.publishedAt)}</span>
                    </div>

                    <h2
                      className="text-xl font-semibold text-[#0D0D0D] mb-2 group-hover:text-[#F26A10] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-[#747474] text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#747474] text-xl">
              No posts yet. Publish your first post in Sanity Studio!
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
