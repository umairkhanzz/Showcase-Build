import type { Metadata } from "next";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import { postCategories, posts } from "@/content/posts";
import { PageHeader } from "@/components/sections/page-header";
import { BlogList } from "@/components/sections/blog-list";
import { HireCard } from "@/components/sections/hire-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Marker } from "@/components/ui/marker";

export const metadata: Metadata = pageMetadata({ ...pageSeo.blog, path: "/blog" });

/** Newest first. */
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export default function BlogPage() {
  return (
    <>
      <PageHeader
        crumb="Blog"
        path="/blog"
        title={
          <>
            Notes from the <Marker>build</Marker>.
          </>
        }
        description="Developer notes, findings and code snippets from real builds. Mostly things I learned the hard way."
      />
      <Container as="section" className="grid gap-12 pb-24 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <BlogList posts={sortedPosts} categories={postCategories} />
        </Reveal>
        <Reveal delay={150} className="lg:sticky lg:top-28 lg:self-start">
          <HireCard />
        </Reveal>
      </Container>
    </>
  );
}
