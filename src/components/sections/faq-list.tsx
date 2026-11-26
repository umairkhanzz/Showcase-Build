import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { faqLd } from "@/lib/structured-data";

type FaqListProps = {
  faqs: Faq[];
  title?: string;
  /** "stacked": big heading above the list. "split": smaller heading on the left, list on the right. */
  layout?: "stacked" | "split";
};

/**
 * Accessible accordion using native <details>, so no client JS is needed.
 * Also publishes the questions as FAQ structured data.
 */
export function FaqList({ faqs, title = "Questions, answered.", layout = "stacked" }: FaqListProps) {
  const items = (
    <Reveal className="divide-y divide-foreground/10 border-y border-foreground/10">
      <JsonLd data={faqLd(faqs)} />
      {faqs.map((faq) => (
        <details key={faq.question} name="faq" className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-medium tracking-[-0.02em] md:text-2xl [&::-webkit-details-marker]:hidden">
            {faq.question}
            <Plus aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </Reveal>
  );

  if (layout === "split") {
    return (
      <Container as="section" className="border-t border-foreground/10 py-16 md:py-28">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-16">
          <Reveal as="h2" className="text-balance font-display text-[30px] font-semibold leading-none tracking-[-0.03em] md:text-[40px]">
            {title}
          </Reveal>
          {items}
        </div>
      </Container>
    );
  }

  return (
    <Container as="section" className="border-t border-foreground/10 py-24 md:py-32">
      <SectionHeading title={title} />
      {items}
    </Container>
  );
}
