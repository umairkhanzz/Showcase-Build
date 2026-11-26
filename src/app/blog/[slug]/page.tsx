import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/posts";
import { formatDate } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { HireCard } from "@/components/sections/hire-card";
import { CtaSection } from "@/components/sections/cta-section";
import { DetailSkeleton } from "@/components/ui/detail-skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { postLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    type: "article",
    ownImage: true,
    article: { publishedTime: post.date, tags: post.tags },
  });
}

/**
 * `params` is URL data, so it's read inside <Suspense>: the page shell renders
 * instantly on navigation and the content streams in (prerendered for known slugs).
 */
export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Suspense fallback={<DetailSkeleton />}>
        <PostContent params={params} />
      </Suspense>
      <CtaSection />
    </>
  );
}

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Container className="grid gap-12 pt-28 md:pt-36 lg:grid-cols-[1fr_320px]">
      <Reveal as="article" className="max-w-3xl">
        <JsonLd data={postLd(post)} />
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.category }]} path={`/blog/${post.slug}`} />
        <header>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-signal-text">{post.category}</span> ·{" "}
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1] tracking-[-0.045em]">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>
        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
      <Reveal delay={150} className="lg:sticky lg:top-28 lg:self-start">
        <HireCard />
      </Reveal>
    </Container>
  );
}
