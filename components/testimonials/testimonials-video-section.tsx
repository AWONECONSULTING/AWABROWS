"use client";

import { useCallback, useState } from "react";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";
import { TestimonialVideoCard } from "@/components/testimonials/testimonial-video-card";
import { TestimonialVideoModal } from "@/components/testimonials/testimonial-video-modal";

const cardPlacements = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-2 md:row-start-1",
  "md:col-start-3 md:row-start-1",
  "md:col-start-1 md:row-start-2",
  "md:col-start-2 md:row-start-2",
];

export function TestimonialsVideoSection() {
  const [activeTestimonial, setActiveTestimonial] =
    useState<Testimonial | null>(null);

  const closeModal = useCallback(() => {
    setActiveTestimonial(null);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F7F4EF] px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F7F4EF,#E0D6C5_52%,#F7F4EF)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(74,61,54,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="pointer-events-none absolute inset-y-[-12%] left-0 z-[1] w-[42vw] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_18%,rgba(255,255,255,0.72)_50%,rgba(255,255,255,0.1)_82%,transparent_100%)] opacity-80 blur-sm animate-[sweep_7s_ease-in-out_infinite]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="testimonial-hero-copy">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[#7A6A5E]">
            Temoignages video
          </p>
          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] text-[#2D2724] sm:text-7xl lg:text-8xl">
            Des sourcils racontes en vrai.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5C5049] sm:text-xl sm:leading-9">
            Des posters legers au chargement, une seule video ouverte a la fois,
            et un player charge uniquement quand la cliente lance son
            temoignage.
          </p>
        </div>

        <div
          className="testimonial-card-scene relative grid grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-2 md:items-start md:gap-5 lg:gap-6"
          aria-label="Temoignages video AWABROWS"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialVideoCard
              className={cardPlacements[index]}
              key={testimonial.id}
              index={index}
              testimonial={testimonial}
              onPlay={setActiveTestimonial}
            />
          ))}
        </div>
      </div>

      {activeTestimonial ? (
        <TestimonialVideoModal
          testimonial={activeTestimonial}
          onClose={closeModal}
        />
      ) : null}
    </section>
  );
}
