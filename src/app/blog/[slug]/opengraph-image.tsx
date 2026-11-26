import { getPost, posts } from "@/content/posts";
import { OG_SIZE, renderOgCard } from "@/lib/og";

/** Share card for each blog post: category, title and excerpt. */
export const alt = "Blog post";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgCard({
    eyebrow: post ? `Blog · ${post.category}` : "Blog",
    title: post?.title ?? "Blog",
    subtitle: post?.excerpt,
  });
}
