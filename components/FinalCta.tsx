"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FinalCta() {
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
      gsap.fromTo(
        ".final-copy",
        { autoAlpha: 0, y: 54, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F4EF] px-6 py-24 text-center"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F7F4EF,#E0D6C5_48%,#F7F4EF)]" />
      <div className="final-copy relative z-10 max-w-5xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[#7A6A5E]">
          Fin de l'archive
        </p>
        <h2 className="text-5xl font-black uppercase leading-[0.92] text-[#2D2724] sm:text-7xl lg:text-8xl">
          Choisis ton prochain monde.
        </h2>
        <button className="mt-10 rounded-full border border-[#3F332D]/12 bg-[#2D2724] px-7 py-4 text-sm font-black uppercase tracking-[0.24em] text-[#F7F4EF] shadow-[0_18px_55px_rgba(74,61,54,0.28)] transition duration-300 hover:scale-[1.03] hover:bg-[#3D332E] hover:shadow-[0_26px_75px_rgba(74,61,54,0.34)]">
          Entrer dans l'archive
        </button>
      </div>
    </section>
  );
}
