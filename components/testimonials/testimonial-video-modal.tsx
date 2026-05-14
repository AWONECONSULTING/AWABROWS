"use client";

import { useEffect, useRef } from "react";
import type { Testimonial } from "@/data/testimonials";

type TestimonialVideoModalProps = {
  testimonial: Testimonial | null;
  onClose: () => void;
};

export function TestimonialVideoModal({
  testimonial,
  onClose,
}: TestimonialVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!testimonial) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, testimonial]);

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

    return () => {
      isCancelled = true;
      video.removeEventListener("loadedmetadata", playVideo);
      destroyHls?.();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [testimonial]);

  if (!testimonial) {
    return null;
  }

  const title = testimonial.firstName
    ? `Temoignage video de ${testimonial.firstName}`
    : "Temoignage video";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171311]/82 px-4 py-8 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-video-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-[420px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la video"
          className="absolute -right-2 -top-12 flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/12 text-2xl leading-none text-white shadow-[0_14px_40px_rgba(0,0,0,0.24)] outline-none backdrop-blur-md transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="overflow-hidden rounded-md border border-white/14 bg-black shadow-[0_34px_120px_rgba(0,0,0,0.42)]">
          <video
            ref={videoRef}
            key={testimonial.id}
            poster={testimonial.poster}
            controls
            autoPlay
            playsInline
            preload="none"
            className="aspect-[9/16] w-full bg-black object-cover"
          />
        </div>

        <div className="mt-4 text-center text-white">
          <h2
            id="testimonial-video-title"
            className="text-xl font-black uppercase leading-none"
          >
            {title}
          </h2>
          {testimonial.quote && (
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/76">
              {testimonial.quote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
