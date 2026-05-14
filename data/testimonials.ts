export type Testimonial = {
  id: string;
  poster: string;
  videoUrl: string;
  firstName?: string;
  quote?: string;
};

const cloudflareStreamVideo = {
  poster:
    "https://videodelivery.net/44888e0064e7f43853700fd70cb817e4/thumbnails/thumbnail.jpg",
  videoUrl:
    "https://videodelivery.net/44888e0064e7f43853700fd70cb817e4/manifest/video.m3u8",
};

export const testimonials: Testimonial[] = [
  {
    id: "ines",
    poster: cloudflareStreamVideo.poster,
    videoUrl: cloudflareStreamVideo.videoUrl,
    firstName: "Ines",
    quote: "Le resultat est naturel, net, exactement ce que je voulais.",
  },
  {
    id: "sarah",
    poster: cloudflareStreamVideo.poster,
    videoUrl: cloudflareStreamVideo.videoUrl,
    firstName: "Sarah",
    quote: "J'ai enfin une ligne de sourcils qui structure mon visage.",
  },
  {
    id: "lina",
    poster: cloudflareStreamVideo.poster,
    videoUrl: cloudflareStreamVideo.videoUrl,
    firstName: "Lina",
    quote: "On m'a conseillee avec precision, sans jamais forcer.",
  },
  {
    id: "amira",
    poster: cloudflareStreamVideo.poster,
    videoUrl: cloudflareStreamVideo.videoUrl,
    firstName: "Amira",
    quote: "Le rendu cicatrise reste doux et tres elegant.",
  },
  {
    id: "nora",
    poster: cloudflareStreamVideo.poster,
    videoUrl: cloudflareStreamVideo.videoUrl,
    firstName: "Nora",
    quote: "Je gagne du temps chaque matin, sans maquillage lourd.",
  },
];
