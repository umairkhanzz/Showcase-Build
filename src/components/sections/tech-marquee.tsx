/** Infinite scrolling list of technologies. The list is duplicated so the loop is seamless. */
export function TechMarquee({ items }: { items: string[] }) {
  return (
    <section aria-label="Technologies I use" className="mask-fade-x overflow-hidden py-14">
      <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="rounded-full border border-foreground/10 px-5 py-2.5 text-sm text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
