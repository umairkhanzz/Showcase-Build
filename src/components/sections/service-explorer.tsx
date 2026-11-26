"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Service } from "@/content/types";
import { serviceCategories, serviceIntents } from "@/content/services";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { ServiceCard } from "./service-card";

type Category = (typeof serviceCategories)[number] | "All";

/** Matches a service against a free-text query (title, description, category, platforms). */
function matches(service: Service, query: string) {
  if (!query) return true;
  const haystack = [service.title, service.description, service.category, service.slug, ...service.worksWith]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

/** Search box, "I want to…" shortcuts and category pills over the service grid. */
export function ServiceExplorer({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const visible = useMemo(
    () => services.filter((s) => (category === "All" || s.category === category) && matches(s, query)),
    [services, category, query],
  );

  const countFor = (c: Category) => (c === "All" ? services.length : services.filter((s) => s.category === c).length);
  const categories: Category[] = ["All", ...serviceCategories.filter((c) => countFor(c) > 0)];

  return (
    <Container as="section" className="pb-24">
      <label className="relative block">
        <span className="sr-only">Search services</span>
        <Search aria-hidden className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search, e.g. stripe, chatbot, slow site"
          className="h-14 w-full rounded-2xl border border-foreground/10 bg-card pl-14 pr-12 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
          >
            <X aria-hidden className="size-4" />
          </button>
        )}
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">I want to</span>
        {serviceIntents.map((intent) => (
          <button
            key={intent.label}
            type="button"
            onClick={() => {
              setQuery(intent.query);
              setCategory("All");
            }}
            className="rounded-full border border-foreground/10 px-3 py-1.5 transition-colors hover:border-foreground/30 hover:bg-muted"
          >
            {intent.label}
          </button>
        ))}
      </div>

      <div role="tablist" aria-label="Filter by category" className="mt-10 flex flex-wrap gap-2 border-t border-foreground/10 pt-6">
        {categories.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active ? "bg-foreground text-background" : "border border-foreground/10 text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
              <span className={cn("text-xs", active ? "opacity-60" : "opacity-50")}>{countFor(c)}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
        {visible.length} {visible.length === 1 ? "service" : "services"}
      </p>

      {visible.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => (
            <div key={service.slug} className="flex animate-fade-in">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-dashed border-foreground/15 p-12 text-center">
          <p className="font-display text-2xl font-semibold tracking-[-0.02em]">Nothing matches that yet.</p>
          <p className="mt-2 text-muted-foreground">Describe what you need and I&apos;ll get back to you within a day.</p>
        </div>
      )}
    </Container>
  );
}
