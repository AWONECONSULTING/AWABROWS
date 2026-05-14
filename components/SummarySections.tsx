"use client";

import { useEffect, useRef } from "react";
import { AwabrowsImage } from "@/components/AwabrowsImage";
import type { AwabrowsFeature } from "@/lib/awabrows";

type SummarySectionsProps = {
  features: AwabrowsFeature[];
};

export function SummarySections({ features }: SummarySectionsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let cleanupAnimations: (() => void) | undefined;
    let isCancelled = false;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
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
        gsap.utils
          .toArray<HTMLElement>(".summary-section")
          .forEach((section) => {
            gsap.fromTo(
              section.querySelector(".summary-image"),
              { autoAlpha: 0, y: 90, scale: 0.94, filter: "blur(18px)" },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 72%",
                  end: "top 28%",
                  scrub: 0.8,
                },
              },
            );

            gsap.fromTo(
              section.querySelector(".summary-copy"),
              { autoAlpha: 0, y: 64 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 66%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
      }, root);

      cleanupAnimations = () => ctx.revert();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void setupAnimations();
        }
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(root);

    return () => {
      isCancelled = true;
      observer.disconnect();
      cleanupAnimations?.();
    };
  }, []);

  return (
    <div ref={rootRef} className="bg-[#F7F4EF]">
      {features.map((item, index) => (
        <section
          key={item.slug}
          className="summary-section relative isolate flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-12"
        >
          <div
            className="absolute inset-0 opacity-100"
            style={{
              background: `linear-gradient(180deg, #F7F4EF, #E0D6C5 48%, #F7F4EF), linear-gradient(${index % 2 === 0 ? "110deg" : "250deg"}, ${item.glow}, transparent 54%)`,
            }}
          />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div
              className={`summary-image relative aspect-[3/4] min-h-[420px] overflow-hidden rounded-md border border-[#3F332D]/10 bg-white/40 shadow-[0_30px_95px_rgba(74,61,54,0.16)] backdrop-blur-sm ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
              style={{ boxShadow: `0 34px 110px ${item.glow}` }}
            >
              <AwabrowsImage
                feature={item}
                sizes="(min-width: 1024px) 42vw, 92vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(45,39,36,0.48))]" />
            </div>

            <div className="summary-copy">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[#7A6A5E]">
                Savoir-faire 0{index + 1}
              </p>
              <h2 className="text-5xl font-black uppercase leading-[0.9] text-[#2D2724] sm:text-7xl lg:text-8xl">
                {item.title}
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#3D332E]"
                    style={{
                      borderColor: item.accent,
                      backgroundColor: item.glow,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5C5049] sm:text-xl sm:leading-9">
                {item.summary}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
