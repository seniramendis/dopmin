import { safeSanityFetch } from "@/lib/sanity";
import { Header } from "../components/header";
import { BlogHero } from "../components/blog-hero";
import { BlogListing } from "../components/blog-listing";
import { Footer } from "../components/footer";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: unknown;
  publishedAt: string;
  author: string;
  category?: string;
}

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    author,
    category
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
      <Header active="blog" />
      <BlogHero />

      <div className="max-w-6xl mx-auto pb-24 px-6 md:px-12 lg:px-24">
        <BlogListing posts={posts} />
      </div>

      <Footer />
    </main>
  );
}
