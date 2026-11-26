import type { Metadata } from "next";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import { customBuildGroups, orderingSteps, serviceFaqs, services } from "@/content/services";
import { allServices } from "@/content/service-pages";
import { PageHeader } from "@/components/sections/page-header";
import { ServiceExplorer } from "@/components/sections/service-explorer";
import { ServicesTable } from "@/components/sections/services-table";
import { OrderingSteps } from "@/components/sections/ordering-steps";
import { CustomBuilds } from "@/components/sections/custom-builds";
import { FaqList } from "@/components/sections/faq-list";
import { CtaSection } from "@/components/sections/cta-section";
import { Marker } from "@/components/ui/marker";
import { JsonLd } from "@/components/seo/json-ld";
import { servicesLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({ ...pageSeo.services, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesLd(services)} />
      <PageHeader
        crumb="Services"
        path="/services"
        kicker="Web development services"
        title={
          <>
            Small jobs. <Marker>Clear scope.</Marker> Done in days.
          </>
        }
        description="Pick a service, see exactly what's included and send a brief in two minutes. No hourly meter."
      />
      <ServiceExplorer services={allServices} />
      <ServicesTable services={allServices} />
      <OrderingSteps steps={orderingSteps} />
      <CustomBuilds groups={customBuildGroups} />
      <FaqList faqs={serviceFaqs} title="Questions about services" layout="split" />
      <CtaSection
        title="Not sure which you need?"
        description="Tell me the problem, not the solution. I'll suggest the shortest path to fixing it, and exactly what it involves."
      />
    </>
  );
}
