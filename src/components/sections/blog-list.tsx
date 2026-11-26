"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Post, PostCategory } from "@/content/types";
import { formatDate } from "@/lib/format";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/cn";

type BlogListProps = {
  posts: Post[];
  categories: readonly PostCategory[];
};

/** Category pills and the filtered list of posts. */
export function BlogList({ posts, categories }: BlogListProps) {
  const [category, setCategory] = useState<PostCategory | "All">("All");
  const visible = category === "All" ? posts : posts.filter((post) => post.category === category);

  return (
    <div>
      <div role="tablist" aria-label="Filter posts" className="flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active ? "bg-foreground text-background" : "border border-foreground/10 text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 divide-y divide-foreground/10 border-t border-foreground/10">
        {visible.map((post) => (
          <li key={post.slug} className="animate-fade-in">
            <Link href={`/blog/${post.slug}`} className="group grid gap-4 py-8 sm:grid-cols-[120px_1fr_auto] sm:gap-8">
              <div className="font-mono text-xs text-muted-foreground">
                <p className="font-medium uppercase tracking-[0.12em] text-signal-text">{post.category}</p>
                <time dateTime={post.date} className="mt-2 block">
                  {formatDate(post.date)}
                </time>
                <p className="mt-1">{post.readingTime}</p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] transition-colors group-hover:text-signal-text md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <span className="hidden size-11 place-items-center self-center rounded-full bg-muted transition-all duration-500 ease-snap group-hover:rotate-45 group-hover:bg-signal group-hover:text-signal-foreground sm:grid">
                <ArrowUpRight aria-hidden className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="py-12 text-muted-foreground">No posts in this category yet.</p>}
    </div>
  );
}
