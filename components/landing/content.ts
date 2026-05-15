export const FORM_URL = "https://eu.jotform.com/build/250934185902358";

export type AwaWorld = {
  slug: string;
  title: string;
  punchline: string;
  tags: string[];
  summary: string;
  accent: string;
  glow: string;
  visual: string;
};

export const awaWorlds: AwaWorld[] = [
  {
    slug: "prestations",
    title: "Prestations",
    punchline: "Un regard naturel, féminin et durable.",
    tags: ["Beauté", "Bien-être", "Sur mesure"],
    summary:
      "Une expérience esthétique haut de gamme pensée pour valoriser votre regard avec douceur, précision et élégance. Chaque détail est adapté à votre morphologie pour obtenir un résultat naturel, harmonieux et durable.",
    accent: "#E0D6C5",
    glow: "rgba(224, 214, 197, 0.5)",
    visual: "visual-prestations",
  },
  {
    slug: "formations",
    title: "Formations",
    punchline: "Construire une expertise beauté premium.",
    tags: ["Intensif", "Certifiant", "Privé"],
    summary:
      "Des programmes conçus pour apprendre des techniques exclusives en brow et eye beauty, structurer une offre premium et progresser dans un cadre privé, exigeant et orienté résultats professionnels.",
    accent: "#C9B79F",
    glow: "rgba(201, 183, 159, 0.52)",
    visual: "visual-formations",
  },
  {
    slug: "techniques",
    title: "Techniques",
    punchline: "La précision au service du naturel.",
    tags: ["Semi-permanent", "Regard", "Signature"],
    summary:
      "AWABROWS réunit des gestes maîtrisés, des protocoles exclusifs et une lecture fine du visage pour créer des résultats subtils, élégants et parfaitement exploitables en prestation comme en formation.",
    accent: "#F7F4EF",
    glow: "rgba(247, 244, 239, 0.46)",
    visual: "visual-techniques",
  },
  {
    slug: "temoignages",
    title: "Témoignages",
    punchline: "Des parcours visibles, une confiance réelle.",
    tags: ["Avant/après", "Élèves", "Clientes"],
    summary:
      "Les transformations et retours d’expérience mettent en lumière la qualité de l’accompagnement, la finesse des résultats et la montée en confiance des clientes comme des futures professionnelles.",
    accent: "#BFA98F",
    glow: "rgba(191, 169, 143, 0.5)",
    visual: "visual-temoignages",
  },
  {
    slug: "accompagnement",
    title: "Accompagnement",
    punchline: "Un cadre privé, clair et rassurant.",
    tags: ["Diagnostic", "Suivi", "Résultat"],
    summary:
      "De la première prise de contact au résultat final, chaque étape est guidée avec attention: diagnostic, conseil, pratique, suivi et recommandations pour une expérience fluide, premium et sécurisante.",
    accent: "#DDD1BF",
    glow: "rgba(221, 209, 191, 0.52)",
    visual: "visual-accompagnement",
  },
];
