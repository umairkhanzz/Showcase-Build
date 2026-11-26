import Link from "next/link";
import type { Service } from "@/content/types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

/** "Every service at a glance" comparison table. Scrolls sideways on small screens. */
export function ServicesTable({ services }: { services: Service[] }) {
  return (
    <section className="border-t border-foreground/10">
      <Container className="py-20 md:py-28">
        <SectionHeading
          title="Every service at a glance"
          description="A clear scope and delivery time for every service. Tell me what you need and I'll confirm the details before any work starts."
        />
        <Reveal className="overflow-x-auto rounded-3xl border border-foreground/10">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-card text-muted-foreground">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Service</th>
                <th scope="col" className="px-6 py-4 font-medium">What you get</th>
                <th scope="col" className="px-6 py-4 font-medium">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10">
              {services.map((service) => (
                <tr key={service.slug} className="transition-colors hover:bg-foreground/[0.02]">
                  <th scope="row" className="px-6 py-5 font-medium">
                    <Link href={`/services/${service.slug}`} className="underline-offset-4 hover:underline">
                      {service.title}
                    </Link>
                  </th>
                  <td className="max-w-md px-6 py-5 text-muted-foreground">{service.description}</td>
                  <td className="whitespace-nowrap px-6 py-5 text-muted-foreground">{service.delivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
