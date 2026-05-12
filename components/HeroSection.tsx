"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimeImage } from "@/components/AnimeImage";
import type { Anime } from "@/lib/anime";

type HeroSectionProps = {
  anime: Anime[];
};

export function HeroSection({ anime }: HeroSectionProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-copy", {
        autoAlpha: 0,
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "35% top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-card", {
        yPercent: (index) => [-24, -42, -18, -36, -28][index] ?? -25,
        rotate: (index) => [-5, 4, -3, 5, -4][index] ?? 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen overflow-hidden bg-[#F7F4EF]"
    >
      <div className="hero-bg absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7F4EF_0%,#E0D6C5_46%,#FFFDF9_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(74,61,54,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(74,61,54,0.1)_1px,transparent_1px)] [background-size:78px_78px]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.46)_46%,transparent_58%)] animate-[sweep_9s_linear_infinite]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,244,239,0.04)_0%,rgba(247,244,239,0.34)_52%,rgba(45,39,36,0.22)_100%)]" />

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {anime.map((item, index) => (
          <div
            key={item.slug}
            className="hero-card absolute aspect-[3/4] w-[15vw] max-w-64 overflow-hidden rounded-md border border-[#3F332D]/10 bg-white/35 shadow-[0_28px_90px_rgba(74,61,54,0.16)] backdrop-blur-sm"
            style={{
              left: `${10 + index * 18}%`,
              top: `${index % 2 === 0 ? 17 : 48}%`,
              boxShadow: `0 28px 90px ${item.glow}`,
            }}
          >
            <AnimeImage anime={item} priority={index < 2} sizes="16vw" />
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{
                background: `linear-gradient(180deg, transparent, ${item.glow})`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="hero-copy relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-24 pt-32 sm:px-10 lg:px-12">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.48em] text-[#6E5F55]">
          Archive anime premium
        </p>
        <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.85] text-[#2D2724] sm:text-8xl lg:text-[10rem]">
          Archives Anime
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-[#5C5049] sm:text-2xl">
          Cinq mondes. Cinq histoires. Un scroll cinématographique.
        </p>
      </div>
    </section>
  );
}
