import type { Service } from "@/content/types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { Reveal } from "@/components/ui/reveal";
import { ServiceCard } from "./service-card";
import { Marker } from "@/components/ui/marker";

type ServicesGridProps = {
  services: Service[];
  /** Link to the full list (shown on the home page preview). */
  totalCount?: number;
};

export function ServicesGrid({ services, totalCount }: ServicesGridProps) {
  return (
    <section className="border-t border-foreground/10">
    <Container className="py-24 md:py-32">
      <SectionHeading
        title={
          <>
            Or just <Marker>buy the fix</Marker>.
          </>
        }
        description="Small, well-defined jobs with a clear scope, delivered in days."
        action={totalCount && <TextLink href="/services">All {totalCount} services</TextLink>}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={(index % 3) * 100} className="flex">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Container>
    </section>
  );
}
