import { FinalCta } from "@/components/FinalCta";
import { HeroSection } from "@/components/HeroSection";
import { HorizontalArchive } from "@/components/HorizontalArchive";
import { LenisProvider } from "@/components/LenisProvider";
import { OpeningSequence } from "@/components/OpeningSequence";
import { SummarySections } from "@/components/SummarySections";
import { animeList } from "@/lib/anime";

export function AnimeLandingPage() {
  return (
    <LenisProvider>
      <main className="overflow-x-hidden bg-[#F7F4EF] text-[#2D2724]">
        <HeroSection anime={animeList} />
        <OpeningSequence anime={animeList} />
        <SummarySections anime={animeList} />
        <HorizontalArchive anime={animeList} />
        <FinalCta />
      </main>
    </LenisProvider>
  );
}
