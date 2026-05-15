"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

type TestimonialVideoModalProps = {
  activeIndex: number;
  onClose: () => void;
  onActiveIndexChange: (index: number) => void;
  testimonials: Testimonial[];
};

export function TestimonialVideoModal({
  activeIndex,
  onClose,
  onActiveIndexChange,
  testimonials,
}: TestimonialVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const testimonial = testimonials[activeIndex] ?? null;

  const goToPrevious = useCallback(() => {
    onActiveIndexChange(
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1,
    );
  }, [activeIndex, onActiveIndexChange, testimonials.length]);

  const goToNext = useCallback(() => {
    onActiveIndexChange(
      activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1,
    );
  }, [activeIndex, onActiveIndexChange, testimonials.length]);

  useEffect(() => {
    if (!testimonial) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious, onClose, testimonial]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;

    if (!testimonial || !video) {
      return;
    }

    let isCancelled = false;
    let destroyHls: (() => void) | undefined;

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay can be blocked if the browser requires another gesture.
      });
    };

    const handleTimeUpdate = () => {
      if (!video.duration) {
        setProgress(0);
        return;
      }

      setProgress((video.currentTime / video.duration) * 100);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = testimonial.videoUrl;
      video.addEventListener("loadedmetadata", playVideo, { once: true });
    } else {
      void import("hls.js").then(({ default: Hls }) => {
        if (isCancelled || !Hls.isSupported()) {
          return;
        }

        const hls = new Hls({
          backBufferLength: 30,
          enableWorker: true,
        });

        hls.loadSource(testimonial.videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
        destroyHls = () => hls.destroy();
      });
    }

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      isCancelled = true;
      video.removeEventListener("loadedmetadata", playVideo);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      destroyHls?.();
      video.pause();
      video.removeAttribute("src");
      video.load();
      setIsPlaying(false);
      setProgress(0);
    };
  }, [testimonial]);

  if (!testimonial) {
    return null;
  }

  const title = testimonial.firstName
    ? `Temoignage video de ${testimonial.firstName}`
    : "Temoignage video";

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play().catch(() => {
        // The browser may still require a direct user gesture.
      });
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);

    if (video) {
      video.muted = nextMuted;
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) {
      return;
    }

    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(deltaX) < 56) {
      return;
    }

    if (deltaX > 0) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#171311] px-4 py-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-video-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-28 blur-3xl"
        style={{ backgroundImage: `url(${testimonial.poster})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,244,239,0.1),rgba(23,19,17,0.72)_42%,rgba(23,19,17,0.94)_100%)]" />

      <div className="relative z-10 flex h-full w-full max-w-[920px] items-center justify-center">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Lire le témoignage précédent"
          className="absolute left-3 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-4xl leading-none text-[#171311] shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white sm:flex"
        >
          <span className="-mt-1" aria-hidden="true">
            ‹
          </span>
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Lire le témoignage suivant"
          className="absolute right-3 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-4xl leading-none text-[#171311] shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white sm:flex"
        >
          <span className="-mt-1" aria-hidden="true">
            ›
          </span>
        </button>

        <div
          className="relative mx-auto aspect-[9/16] max-h-[calc(100svh-2.5rem)] w-full max-w-[430px] touch-pan-y overflow-hidden rounded-[1.55rem] border border-white/14 bg-black shadow-[0_24px_90px_rgba(0,0,0,0.26)]"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className="absolute left-4 right-4 top-3 z-30 grid grid-flow-col gap-1.5">
            {testimonials.map((item, index) => (
              <div
                key={item.id}
                className="h-0.5 overflow-hidden rounded-full bg-white/35"
              >
                <div
                  className="h-full rounded-full bg-white transition-[width] duration-150"
                  style={{
                    width:
                      index < activeIndex
                        ? "100%"
                        : index === activeIndex
                          ? `${progress}%`
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute left-5 top-9 z-30 flex items-center gap-3 text-white">
            <div className="h-12 w-12 rounded-full border border-white/24 bg-[radial-gradient(circle_at_30%_25%,#F7F4EF,#C9A184_58%,#7D5F4B)] shadow-[0_12px_35px_rgba(0,0,0,0.22)]" />
            <div>
              <p className="text-base font-black uppercase leading-none drop-shadow">
                AWABROWS
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                {testimonial.firstName}
              </p>
            </div>
          </div>

          <div className="absolute right-4 top-8 z-40 flex flex-col gap-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la vidéo"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-black/28 text-4xl leading-none text-white backdrop-blur-md transition hover:bg-black/40 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="-mt-1" aria-hidden="true">
                ×
              </span>
            </button>

            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-black/28 text-xl font-black text-white backdrop-blur-md transition hover:bg-black/40 focus-visible:ring-2 focus-visible:ring-white"
            >
              {isPlaying ? (
                <span aria-hidden="true">Ⅱ</span>
              ) : (
                <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-black/28 text-lg font-black text-white backdrop-blur-md transition hover:bg-black/40 focus-visible:ring-2 focus-visible:ring-white"
            >
              {isMuted ? "♪̸" : "♪"}
            </button>
          </div>

          <video
            ref={videoRef}
            key={testimonial.id}
            poster={testimonial.poster}
            autoPlay
            muted={isMuted}
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full bg-black object-cover"
          />

          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Mettre en pause" : "Lire la video"}
            className="absolute inset-0 z-10 cursor-pointer"
          >
            <span
              className={`absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/24 text-white backdrop-blur-md transition duration-300 ${
                isPlaying ? "scale-90 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <span
                className="ml-1 h-0 w-0 border-y-[11px] border-l-[17px] border-y-transparent border-l-white"
                aria-hidden="true"
              />
            </span>
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/72 via-black/22 to-transparent px-5 pb-5 pt-24 text-white">
            <p
              id="testimonial-video-title"
              className="text-xl font-black uppercase leading-none drop-shadow"
            >
              {title}
            </p>
            {testimonial.quote && (
              <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-white/82 drop-shadow">
                {testimonial.quote}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
