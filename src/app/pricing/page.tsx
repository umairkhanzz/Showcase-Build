import type { Metadata } from "next";
import { pageSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import { comparison, plans, pricingFaqs, projectIncludes, tiers } from "@/content/pricing";
import { PageHeader } from "@/components/sections/page-header";
import { PricingTabs } from "@/components/sections/pricing-tabs";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { FaqList } from "@/components/sections/faq-list";
import { CtaSection } from "@/components/sections/cta-section";
import { Marker } from "@/components/ui/marker";
import { JsonLd } from "@/components/seo/json-ld";
import { tiersLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({ ...pageSeo.pricing, path: "/pricing" });

const projectPrice = plans.find((plan) => plan.id === "project")?.price ?? "";

export default function PricingPage() {
  return (
    <>
      <JsonLd data={tiersLd(tiers)} />
      <PageHeader
        crumb="Pricing"
        path="/pricing"
        title={
          <>
            Two ways to pay. <Marker>Zero</Marker> surprises.
          </>
        }
        description="A flat monthly subscription for ongoing work, or a fixed price for one defined build. Either way you know the number before anything starts."
      />
      <PricingTabs tiers={tiers} projectIncludes={projectIncludes} projectPrice={projectPrice} />
      <ComparisonTable rows={comparison} />
      <FaqList faqs={pricingFaqs} />
      <CtaSection
        title={
          <>
            Pick your <Marker>pace</Marker>.
          </>
        }
        description="Start a subscription today and have your first request in review this week, or send a brief for a fixed quote within one business day."
      />
    </>
  );
}
