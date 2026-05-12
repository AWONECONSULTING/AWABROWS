import Image from "next/image";
import type { Anime } from "@/lib/anime";

type AnimeImageProps = {
  anime: Anime;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function AnimeImage({
  anime,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 35vw, 85vw",
}: AnimeImageProps) {
  return (
    <Image
      src={anime.image}
      alt={`Illustration anime ${anime.title}`}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
