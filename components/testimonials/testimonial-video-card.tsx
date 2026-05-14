import Image from "next/image";
import type { CSSProperties } from "react";
import type { Testimonial } from "@/data/testimonials";

type TestimonialVideoCardProps = {
  className?: string;
  index: number;
  testimonial: Testimonial;
  onPlay: (testimonial: Testimonial) => void;
};

const glows = [
  "rgba(181, 140, 120, 0.28)",
  "rgba(169, 117, 98, 0.26)",
  "rgba(123, 100, 88, 0.3)",
  "rgba(201, 161, 143, 0.3)",
  "rgba(138, 120, 108, 0.28)",
];

const cardLayouts = [
  {
    scale: "1",
    enterY: "58px",
  },
  {
    scale: "1",
    enterY: "64px",
  },
  {
    scale: "1",
    enterY: "58px",
  },
  {
    scale: "1",
    enterY: "72px",
  },
  {
    scale: "1",
    enterY: "72px",
  },
];

export function TestimonialVideoCard({
  className = "",
  index,
  testimonial,
  onPlay,
}: TestimonialVideoCardProps) {
  const glow = glows[index % glows.length];
  const layout = cardLayouts[index % cardLayouts.length];
  const label = testimonial.firstName
    ? `Lire le temoignage video de ${testimonial.firstName}`
    : "Lire le temoignage video";
  const cardStyle = {
    "--testimonial-delay": `${220 + index * 260}ms`,
    "--testimonial-sweep-delay": `${430 + index * 260}ms`,
    "--card-scale": layout.scale,
    "--card-enter-y": layout.enterY,
    boxShadow: `0 28px 80px ${glow}`,
  } as CSSProperties;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => onPlay(testimonial)}
      className={`testimonial-video-card testimonial-card-animate group !relative !left-auto !top-auto aspect-[3/4] !w-full overflow-hidden rounded-xl border border-[#3F332D]/10 bg-white/40 text-left shadow-[0_24px_70px_rgba(74,61,54,0.16)] outline-none backdrop-blur-sm transition-[box-shadow,filter] duration-300 hover:shadow-[0_34px_100px_rgba(74,61,54,0.24)] focus-visible:ring-2 focus-visible:ring-[#2D2724] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F4EF] ${className}`}
      style={cardStyle}
    >
      <Image
        src={testimonial.poster}
        alt={
          testimonial.firstName
            ? `Poster du temoignage de ${testimonial.firstName}`
            : "Poster de temoignage video"
        }
        fill
        priority={index === 0}
        loading={index === 0 ? undefined : "lazy"}
        sizes="(min-width: 1024px) 18vw, (min-width: 768px) 28vw, 44vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,39,36,0.04)_0%,rgba(45,39,36,0.18)_48%,rgba(45,39,36,0.76)_100%)]" />
      <div
        className="testimonial-video-sweep absolute inset-y-0 left-0 w-1/2 skew-x-[-18deg] bg-white/45 blur-xl"
        aria-hidden="true"
      />

      <span className="absolute left-3 top-3 text-xs font-bold text-white drop-shadow">
        0{index + 1}
      </span>

      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/24 shadow-[0_16px_46px_rgba(45,39,36,0.28)] backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white/34">
        <span
          className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white"
          aria-hidden="true"
        />
      </span>

      {(testimonial.firstName || testimonial.quote) && (
        <span className="absolute inset-x-4 bottom-4 block text-white">
          {testimonial.firstName && (
            <span className="block text-lg font-black uppercase leading-none">
              {testimonial.firstName}
            </span>
          )}
          {testimonial.quote && (
            <span className="mt-2 block text-sm font-medium leading-5 text-white/82">
              {testimonial.quote}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
