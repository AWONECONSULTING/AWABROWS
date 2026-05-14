import { FinalCta } from "@/components/FinalCta";
import { HorizontalShowcase } from "@/components/HorizontalShowcase";
import { LenisProvider } from "@/components/LenisProvider";
import { SummarySections } from "@/components/SummarySections";
import { TestimonialsVideoSection } from "@/components/testimonials/testimonials-video-section";
import { awabrowsFeatures } from "@/lib/awabrows";

export function AwabrowsLandingPage() {
  return (
    <LenisProvider>
      <main className="overflow-x-hidden bg-[#F7F4EF] text-[#2D2724]">
        <TestimonialsVideoSection />
        <SummarySections features={awabrowsFeatures} />
        <HorizontalShowcase features={awabrowsFeatures} />
        <FinalCta />
      </main>
    </LenisProvider>
  );
}
