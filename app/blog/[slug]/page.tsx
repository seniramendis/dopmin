import { safeSanityFetch, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogNav } from "../../components/blog-nav";
import { Footer } from "../../components/footer";

interface PortableTextBlock {
  _type: string;
  children?: { text?: string }[];
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: unknown;
  publishedAt: string;
  author: string;
  body: PortableTextBlock[];
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    author,
    body
  }`;

  return safeSanityFetch<Post | null>(query, { slug });
}

// Rough estimate from the Portable Text body — good enough for a "X min read" tag.
function estimateReadingTime(body: PortableTextBlock[] = []): number {
  const wordCount = body
    .filter((block) => block._type === "block")
    .flatMap((block) => block.children ?? [])
    .reduce((total, span) => total + (span.text?.split(/\s+/).filter(Boolean).length ?? 0), 0);

  return Math.max(1, Math.round(wordCount / 200));
}

export const revalidate = 60;

export async function generateStaticParams() {
  const query = `*[_type == "post"]{ "slug": slug.current }`;
  const posts = await safeSanityFetch<{ slug: string }[]>(query);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post?.title || "Blog Post",
    description: post?.excerpt || "Read the latest from Dopmin.",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  const readingTime = estimateReadingTime(post.body);

  return (
    <main className="min-h-screen bg-white antialiased">
      <BlogNav />

      {/* ── HEADER BAND ── */}
      <section className="relative pt-36 pb-4 px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,106,16,0.07) 0%, transparent 70%)" }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[#747474] hover:text-[#F26A10] transition-colors mb-10 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.12em] mb-3">Article</p>

          <h1 className="text-3xl md:text-5xl font-semibold text-[#0D0D0D] mb-6 tracking-tight leading-[1.1]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-[#747474] mb-8 leading-relaxed">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm text-[#747474] pb-10 border-b border-[#e4e4e4]">
            <span className="font-semibold text-[#0D0D0D]">{post.author || "Dopmin Team"}</span>
            <span>•</span>
            <span>{post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "Draft"}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto pb-24 px-6 md:px-12 lg:px-24">
        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden my-12">
            <Image
              src={urlFor(post.coverImage).width(1200).height(675).url()}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <article className="prose prose-lg max-w-none prose-headings:text-[#0D0D0D] prose-headings:font-bold prose-p:text-[#747474] prose-p:leading-relaxed prose-a:text-[#F26A10] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0D0D0D] prose-img:rounded-xl prose-blockquote:border-l-[#F26A10] prose-blockquote:text-[#747474]">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }: { value: { alt?: string; caption?: string } & Record<string, unknown> }) => (
                  <figure className="my-8">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <Image
                        src={urlFor(value).width(800).height(450).url()}
                        alt={value.alt || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 75vw"
                        className="object-cover"
                      />
                    </div>
                    {value.caption && (
                      <figcaption className="text-center text-sm text-[#747474] mt-3">{value.caption}</figcaption>
                    )}
                  </figure>
                ),
              },
            }}
          />
        </article>

        {/* ── END-OF-POST CTA ── */}
        <div className="mt-20 pt-16 border-t border-[#e4e4e4] text-center">
          <p className="text-xs font-bold text-[#F26A10] uppercase tracking-[0.18em] mb-4">Enjoyed This?</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0D0D] mb-6 max-w-lg mx-auto">
            Let&apos;s build something like this together.
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold bg-[#F26A10] text-white px-6 py-3 rounded-xl hover:bg-[#D94030] transition-colors shadow-sm"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
