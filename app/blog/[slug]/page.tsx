import { client, safeSanityFetch, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogNav } from "../../components/blog-nav";
import { Footer } from "../../components/footer";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: any;
  publishedAt: string;
  author: string;
  body: any[];
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

  return (
    <main className="min-h-screen bg-white antialiased">
      <BlogNav />

      <div className="max-w-3xl mx-auto pt-36 pb-24 px-6 md:px-12 lg:px-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#747474] hover:text-[#F26A10] transition-colors mb-10 text-sm font-medium"
        >
          ← Back to Blog
        </Link>

        <div className="flex items-center gap-3 text-sm text-[#747474] mb-5">
          <span className="font-semibold text-[#0D0D0D]">{post.author || "Dopmin Team"}</span>
          <span>•</span>
          <span>{post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "Draft"}</span>
        </div>

        <h1
          className="text-3xl md:text-5xl font-bold text-[#0D0D0D] mb-6 tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-[#747474] mb-10 leading-relaxed">{post.excerpt}</p>
        )}

        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12">
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
                image: ({ value }: { value: any }) => (
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
      </div>

      <Footer />
    </main>
  );
}
