"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.82,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}
