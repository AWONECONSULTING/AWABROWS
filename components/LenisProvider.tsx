"use client";

import { type ReactNode, useEffect } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isCancelled = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const startLenis = async () => {
      const { default: Lenis } = await import("lenis");

      if (isCancelled) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.92,
      });

      let frameId = 0;

      const raf = (time: number) => {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        lenis.destroy();
      };
    };

    const hasIdleCallback = Boolean(window.requestIdleCallback);
    const idleId = hasIdleCallback
      ? window.requestIdleCallback(() => {
          void startLenis();
        })
      : window.setTimeout(() => {
          void startLenis();
        }, 250);

    return () => {
      isCancelled = true;

      if (hasIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }

      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
