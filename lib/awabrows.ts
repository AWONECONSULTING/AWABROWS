export type AwabrowsFeature = {
  slug: string;
  title: string;
  punchline: string;
  tags: string[];
  summary: string;
  image: string;
  backgroundImage: string;
  accent: string;
  glow: string;
};

export const awabrowsFeatures: AwabrowsFeature[] = [
  {
    slug: "diagnostic",
    title: "Diagnostic",
    punchline: "Une ligne pensee pour ton visage.",
    tags: ["Morphologie", "Conseil", "Precision"],
    summary:
      "Chaque rendez-vous commence par une analyse de la ligne naturelle, de la densite et de l'equilibre du visage. L'objectif est simple: proposer une forme coherente, elegante et facile a porter au quotidien.",
    image: "/images/awabrows/diagnostic.svg",
    backgroundImage: "/images/awabrows/studio-bg.svg",
    accent: "#B58C78",
    glow: "rgba(181, 140, 120, 0.28)",
  },
  {
    slug: "brow-design",
    title: "Brow Design",
    punchline: "Des sourcils nets, sans effet fige.",
    tags: ["Epilation", "Mapping", "Finition"],
    summary:
      "La ligne est structuree avec douceur pour garder du naturel tout en apportant plus de definition. Le travail se concentre sur la symetrie, la proprete du dessin et la tenue du resultat.",
    image: "/images/awabrows/brow-design.svg",
    backgroundImage: "/images/awabrows/studio-bg.svg",
    accent: "#A97562",
    glow: "rgba(169, 117, 98, 0.26)",
  },
  {
    slug: "brow-lift",
    title: "Brow Lift",
    punchline: "Plus de volume, plus de tenue.",
    tags: ["Volume", "Discipline", "Naturel"],
    summary:
      "Le brow lift discipline les poils et ouvre le regard sans alourdir le visage. C'est une solution ideale pour densifier visuellement la ligne et obtenir un rendu soigne pendant plusieurs semaines.",
    image: "/images/awabrows/brow-lift.svg",
    backgroundImage: "/images/awabrows/studio-bg.svg",
    accent: "#7B6458",
    glow: "rgba(123, 100, 88, 0.3)",
  },
  {
    slug: "shading",
    title: "Shading",
    punchline: "Un effet poudre doux et maitrise.",
    tags: ["Poudrage", "Intensite", "Tenue"],
    summary:
      "Le shading apporte une ombre progressive pour combler les zones clairsemees et renforcer la ligne. Le resultat reste modulable, de tres naturel a plus sophistique selon l'envie.",
    image: "/images/awabrows/shading.svg",
    backgroundImage: "/images/awabrows/studio-bg.svg",
    accent: "#C9A18F",
    glow: "rgba(201, 161, 143, 0.3)",
  },
  {
    slug: "retouche",
    title: "Retouche",
    punchline: "Le detail qui stabilise le resultat.",
    tags: ["Cicatrisation", "Equilibre", "Finition"],
    summary:
      "La retouche permet d'ajuster la couleur, l'intensite et les petites asymetries apres cicatrisation. Elle garantit un rendu propre, homogene et durable.",
    image: "/images/awabrows/retouche.svg",
    backgroundImage: "/images/awabrows/studio-bg.svg",
    accent: "#8A786C",
    glow: "rgba(138, 120, 108, 0.28)",
  },
];
