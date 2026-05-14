"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { AwabrowsFeature } from "@/lib/awabrows";

type HorizontalShowcaseProps = {
  features: AwabrowsFeature[];
};

export function HorizontalShowcase({ features }: HorizontalShowcaseProps) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;

    if (!root || !track) {
      return;
    }

    let cleanupAnimations: (() => void) | undefined;
    let isCancelled = false;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isDesktop || reduceMotion) {
      return;
    }

    const setupAnimations = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isCancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const horizontalTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".horizontal-panel").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector(".panel-copy"),
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 70%",
                end: "left 35%",
                scrub: true,
              },
            },
          );
        });
      });

      cleanupAnimations = () => ctx.revert();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void setupAnimations();
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(root);

    return () => {
      isCancelled = true;
      observer.disconnect();
      cleanupAnimations?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[#F7F4EF] py-20 md:h-screen md:py-0"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-6 px-6 sm:px-10 md:h-screen md:w-max md:flex-row md:gap-0 md:px-0"
      >
        {features.map((item) => (
          <article
            key={item.slug}
            className="horizontal-panel relative min-h-[76vh] overflow-hidden rounded-md border border-[#3F332D]/10 bg-white/40 md:h-screen md:w-screen md:rounded-none md:border-0"
          >
            <Image
              src={item.backgroundImage}
              alt={`Ambiance AWABROWS ${item.title}`}
              fill
              quality={92}
              sizes="(min-width: 768px) 100vw, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,39,36,0.76),rgba(247,244,239,0.16),rgba(45,39,36,0.64))]" />
            <div
              className="absolute inset-0 opacity-60 mix-blend-soft-light"
              style={{
                background: `linear-gradient(115deg, transparent 18%, ${item.glow} 52%, transparent 78%)`,
              }}
            />
            <div className="panel-copy absolute bottom-8 left-6 right-6 max-w-3xl sm:bottom-12 sm:left-10 md:bottom-16 md:left-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-[#F7F4EF]/70">
                Experience AWABROWS
              </p>
              <h2 className="text-5xl font-black uppercase leading-none text-[#FFFDF9] sm:text-7xl lg:text-8xl">
                {item.title}
              </h2>
              <p className="mt-5 text-xl font-medium text-[#F7F4EF]/78 sm:text-2xl">
                {item.punchline}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
