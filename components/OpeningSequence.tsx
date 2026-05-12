"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimeImage } from "@/components/AnimeImage";
import type { Anime } from "@/lib/anime";

type OpeningSequenceProps = {
  anime: Anime[];
};

export function OpeningSequence({ anime }: OpeningSequenceProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isDesktop || reduceMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>(".opening-title");
      const cards = gsap.utils.toArray<HTMLElement>(".opening-card");
      const sweeps = gsap.utils.toArray<HTMLElement>(".opening-sweep");

      // Timeline tied to one pinned section so titles, cards, blur removal,
      // and light sweeps stay synchronized like an anime opening.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
        },
      });

      titles.forEach((title, index) => {
        timeline
          .fromTo(
            title,
            { autoAlpha: 0, y: 48, filter: "blur(16px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 },
            index * 0.72,
          )
          .to(
            cards[index],
            {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
              rotate: index % 2 === 0 ? -2 : 2,
              duration: 0.5,
            },
            index * 0.72,
          )
          .fromTo(
            sweeps[index],
            { xPercent: -160 },
            { xPercent: 160, duration: 0.56 },
            index * 0.72 + 0.08,
          )
          .to(
            title,
            { autoAlpha: 0.22, y: -18, duration: 0.35 },
            index * 0.72 + 0.5,
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F7F4EF] px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F7F4EF,#E0D6C5_52%,#F7F4EF)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(74,61,54,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[#7A6A5E]">
            Séquence d'ouverture
          </p>
          <div className="space-y-3">
            {anime.map((item) => (
              <h2
                key={item.slug}
                className="opening-title text-4xl font-black uppercase leading-none text-[#2D2724] opacity-100 md:text-6xl lg:text-7xl"
              >
                {item.title}
              </h2>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {anime.map((item, index) => (
            <div
              key={item.slug}
              className="opening-card relative aspect-[3/4] overflow-hidden rounded-md border border-[#3F332D]/10 bg-white/40 opacity-100 shadow-[0_24px_70px_rgba(74,61,54,0.16)] backdrop-blur-sm md:scale-75 md:opacity-25 md:blur-[10px]"
              style={{ boxShadow: `0 28px 80px ${item.glow}` }}
            >
              <AnimeImage anime={item} sizes="(min-width: 768px) 20vw, 45vw" />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background: `linear-gradient(180deg, transparent, ${item.glow})`,
                }}
              />
              <div className="opening-sweep absolute inset-y-0 left-0 w-1/2 skew-x-[-18deg] bg-white/45 blur-xl" />
              <span className="absolute left-3 top-3 text-xs font-bold text-white drop-shadow">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
