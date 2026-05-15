"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { awaWorlds, type AwaWorld, FORM_URL } from "./content";

function visualStyle(world: AwaWorld): CSSProperties {
  return {
    "--accent": world.accent,
    "--glow": world.glow,
  } as CSSProperties;
}

function VisualBlock({
  world,
  className = "",
}: {
  world: AwaWorld;
  className?: string;
}) {
  return (
    <div
      className={`awa-visual ${world.visual} absolute inset-0 ${className}`}
      style={visualStyle(world)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(18,16,15,0.5))]" />
      <div className="absolute inset-x-6 top-8 h-px bg-white/25" />
      <div className="absolute bottom-8 left-6 right-6 h-24 rounded-full border border-white/15 blur-[0.2px]" />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero-section relative flex min-h-screen overflow-hidden bg-[#120f0d] text-[#f7f4ef]">
      <div className="hero-bg absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(224,214,197,0.28),transparent_32%),radial-gradient(circle_at_75%_12%,rgba(247,244,239,0.18),transparent_30%),linear-gradient(135deg,#120f0d,#2a221d_42%,#0b0908)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(247,244,239,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(247,244,239,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 animate-[sweep_7s_linear_infinite] bg-[linear-gradient(110deg,transparent_0%,rgba(247,244,239,0.1)_46%,transparent_58%)]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,15,13,0.4)_58%,rgba(18,15,13,0.94)_100%)]" />

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {awaWorlds.map((world, index) => {
          const positions = [
            "left-[10%] top-[17%]",
            "left-[28%] top-[48%]",
            "left-[46%] top-[17%]",
            "left-[64%] top-[48%]",
            "left-[82%] top-[17%]",
          ];

          return (
            <div
              key={world.slug}
              className={`hero-card absolute aspect-[3/4] w-[15vw] max-w-64 overflow-hidden rounded-md border border-white/12 bg-white/5 shadow-2xl ${positions[index]}`}
              style={{
                boxShadow: `0 0 70px ${world.glow}`,
                ...visualStyle(world),
              }}
            >
              <VisualBlock world={world} />
              <div
                className="absolute inset-0 mix-blend-screen"
                style={{
                  background: `linear-gradient(180deg, transparent, ${world.glow})`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="hero-copy relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-24 pt-32 sm:px-10 lg:px-12">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.48em] text-[#f7f4ef]/54">
          Expérience beauté premium
        </p>
        <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.85] text-[#f7f4ef] sm:text-8xl lg:text-[10rem]">
          AWABROWS
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-[#f7f4ef]/70 sm:text-2xl">
          Cinq univers. Une expertise. Un scroll cinématographique.
        </p>
      </div>
    </section>
  );
}

function OpeningSequence() {
  return (
    <section className="opening-section relative isolate flex min-h-screen items-center overflow-hidden bg-[#15110f] px-6 py-24 text-[#f7f4ef] sm:px-10 lg:px-12">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#120f0d,#201914_48%,#120f0d)]" />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_50%_50%,rgba(247,244,239,0.18),transparent_1px)] [background-size:22px_22px]" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[#f7f4ef]/45">
            Séquence d&apos;ouverture
          </p>
          <div className="space-y-3">
            {awaWorlds.map((world) => (
              <h2
                key={world.slug}
                className="opening-title text-4xl font-black uppercase leading-none text-[#f7f4ef]/90 opacity-100 md:text-6xl lg:text-7xl"
              >
                {world.title}
              </h2>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {awaWorlds.map((world, index) => (
            <div
              key={world.slug}
              className="opening-card relative aspect-[3/4] overflow-hidden rounded-md border border-white/12 bg-white/5 opacity-100 shadow-2xl md:scale-75 md:opacity-25 md:blur-[10px]"
              style={{
                boxShadow: `0 0 54px ${world.glow}`,
                ...visualStyle(world),
              }}
            >
              <VisualBlock world={world} />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background: `linear-gradient(180deg, transparent, ${world.glow})`,
                }}
              />
              <div className="opening-sweep absolute inset-y-0 left-0 w-1/2 skew-x-[-18deg] bg-white/30 blur-xl" />
              <span className="absolute left-3 top-3 text-xs font-bold text-white/80">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SummarySections() {
  return (
    <section className="bg-[#f7f4ef] px-6 py-24 text-[#17120f] sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-6">
        {awaWorlds.map((world, index) => (
          <article
            id={world.slug}
            key={world.slug}
            className="summary-card grid min-h-[72vh] overflow-hidden rounded-md border border-[#17120f]/10 bg-[#efe6da] shadow-[0_30px_90px_rgba(52,42,32,0.12)] md:grid-cols-[0.82fr_1fr]"
          >
            <div
              className="relative min-h-[420px] overflow-hidden"
              style={visualStyle(world)}
            >
              <VisualBlock world={world} className="scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,15,0.18),rgba(18,16,15,0.02))]" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-[#7d7164]">
                Dossier AWABROWS 0{index + 1}
              </p>
              <h2 className="text-5xl font-black uppercase leading-none text-[#17120f] sm:text-7xl">
                {world.title}
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {world.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#17120f]/12 bg-[#f7f4ef]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#5a5047]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#4d453e]">
                {world.summary}
              </p>
              <a
                href={FORM_URL}
                className="mt-9 inline-flex w-fit rounded-full bg-[#17120f] px-6 py-3 text-xs font-black uppercase tracking-[0.24em] text-[#f7f4ef] shadow-[0_0_35px_rgba(23,18,15,0.18)] transition duration-300 hover:scale-[1.03] hover:bg-[#40352e]"
              >
                S&apos;inscrire
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HorizontalArchive() {
  return (
    <section className="horizontal-section bg-[#120f0d] text-[#f7f4ef] md:h-[500vh]">
      <div className="horizontal-sticky md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="horizontal-track flex flex-col gap-6 px-6 py-20 sm:px-10 md:h-screen md:w-[500vw] md:flex-row md:gap-0 md:p-0">
          {awaWorlds.map((world) => (
            <article
              key={world.slug}
              className="horizontal-panel relative min-h-[76vh] overflow-hidden rounded-md border border-white/12 bg-white/5 md:h-screen md:w-screen md:rounded-none md:border-0"
              style={visualStyle(world)}
            >
              <VisualBlock world={world} className="scale-110" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,13,0.88),rgba(18,15,13,0.28),rgba(18,15,13,0.82))]" />
              <div
                className="absolute inset-0 opacity-55 mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at 72% 30%, ${world.glow}, transparent 36%)`,
                }}
              />
              <div className="panel-copy absolute bottom-8 left-6 right-6 max-w-3xl sm:bottom-12 sm:left-10 md:bottom-16 md:left-16">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-[#f7f4ef]/52">
                  Monde AWABROWS
                </p>
                <h2 className="text-5xl font-black uppercase leading-none text-[#f7f4ef] sm:text-7xl lg:text-8xl">
                  {world.title}
                </h2>
                <p className="mt-5 text-xl font-medium text-[#f7f4ef]/72 sm:text-2xl">
                  {world.punchline}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080706] px-6 py-24 text-center text-[#f7f4ef]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,214,197,0.2),transparent_28%),linear-gradient(180deg,#120f0d,#080706)]" />
      <div className="final-copy relative z-10 max-w-5xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[#f7f4ef]/42">
          Fin de l&apos;expérience
        </p>
        <h2 className="text-5xl font-black uppercase leading-[0.92] text-[#f7f4ef] sm:text-7xl lg:text-8xl">
          Révèle ton prochain niveau beauté.
        </h2>
        <a
          href={FORM_URL}
          className="mt-10 inline-flex rounded-full border border-white/18 bg-[#f7f4ef] px-7 py-4 text-sm font-black uppercase tracking-[0.24em] text-[#17120f] shadow-[0_0_48px_rgba(247,244,239,0.28)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_78px_rgba(247,244,239,0.45)]"
        >
          Remplir le formulaire
        </a>
      </div>
    </section>
  );
}

export function AwaLandingPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-copy", {
        y: 70,
        autoAlpha: 0,
        duration: 1.15,
        ease: "power3.out",
      });

      gsap.from(".hero-card", {
        y: 120,
        rotate: 6,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.25,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.to(".hero-bg", {
        scale: 1.12,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-card", {
        yPercent: (index) => (index % 2 === 0 ? -22 : 18),
        rotate: (index) => (index % 2 === 0 ? -5 : 5),
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".opening-title", {
        x: -70,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".opening-section",
          start: "top 72%",
        },
      });

      gsap.to(".opening-card", {
        scale: 1,
        autoAlpha: 1,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".opening-section",
          start: "top 58%",
        },
      });

      gsap.fromTo(
        ".opening-sweep",
        { xPercent: -160 },
        {
          xPercent: 260,
          stagger: 0.08,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".opening-section",
            start: "top 52%",
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".summary-card").forEach((card) => {
        gsap.from(card, {
          y: 90,
          scale: 0.96,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".panel-copy").forEach((copy) => {
        gsap.from(copy, {
          y: 60,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: copy,
            start: "top 84%",
          },
        });
      });

      const horizontal = document.querySelector<HTMLElement>(".horizontal-track");
      if (horizontal && window.innerWidth >= 768) {
        const distance = () => horizontal.scrollWidth - window.innerWidth;

        gsap.to(horizontal, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-section",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            pin: ".horizontal-sticky",
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.from(".final-copy", {
        y: 70,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".final-copy",
          start: "top 75%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-[#120f0d]">
      <main className="overflow-x-hidden bg-[#120f0d] text-[#f7f4ef]">
        <HeroSection />
        <OpeningSequence />
        <SummarySections />
        <HorizontalArchive />
        <FinalCta />
      </main>
    </div>
  );
}
