import Image from "next/image";
import type { AwabrowsFeature } from "@/lib/awabrows";

type AwabrowsImageProps = {
  feature: AwabrowsFeature;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function AwabrowsImage({
  feature,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 35vw, 85vw",
}: AwabrowsImageProps) {
  return (
    <Image
      src={feature.image}
      alt={`Prestation AWABROWS ${feature.title}`}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
