import type { ComparisonRow } from "@/content/types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

/** "Side by side" subscription vs project comparison. */
export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <section className="border-t border-foreground/10">
      <Container className="py-20 md:py-28">
        <SectionHeading
          title="Side by side."
          description="Both come with the same developer, the same quality and code you own. Here's how they differ."
        />
        <Reveal className="overflow-x-auto rounded-3xl border border-foreground/10">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-card">
              <tr>
                <th scope="col" className="px-6 py-5"><span className="sr-only">Topic</span></th>
                <th scope="col" className="px-6 py-5 font-display text-lg font-semibold">Subscription</th>
                <th scope="col" className="px-6 py-5 font-display text-lg font-semibold">Fixed project</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10">
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-6 py-5 text-sm font-medium text-muted-foreground">{row.label}</th>
                  <td className="px-6 py-5 text-sm">{row.subscription}</td>
                  <td className="px-6 py-5 text-sm">{row.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
