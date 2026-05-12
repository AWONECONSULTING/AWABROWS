export type Anime = {
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

export const animeList: Anime[] = [
  {
    slug: "boruto",
    title: "Boruto",
    punchline: "L'héritage n'est que le commencement.",
    tags: ["Ninja", "Héritage", "Sci-fi"],
    summary:
      "L'histoire suit Boruto Uzumaki, fils de Naruto, alors qu'il grandit dans un monde ninja plus paisible, façonné par la technologie et l'héritage. Il doit trouver sa propre voie face à des menaces qui remettent en question tout ce que la génération précédente lui a transmis.",
    image: "https://myanimelist.net/images/anime/1091/99847l.jpg",
    backgroundImage: "https://images6.alphacoders.com/817/thumb-1920-817360.png",
    accent: "#B58C78",
    glow: "rgba(181, 140, 120, 0.28)",
  },
  {
    slug: "my-hero-academia",
    title: "My Hero Academia",
    punchline: "Le pouvoir se mérite avant de s'hériter.",
    tags: ["Héros", "Académie", "Super-pouvoirs"],
    summary:
      "Dans un monde où la plupart des humains naissent avec des super-pouvoirs appelés Alters, Izuku Midoriya rêve de devenir un héros malgré son absence de pouvoir. Son parcours commence lorsqu'il hérite d'une force légendaire et intègre une école conçue pour former la prochaine génération de héros.",
    image: "https://myanimelist.net/images/anime/10/78745l.jpg",
    backgroundImage: "https://images8.alphacoders.com/817/thumb-1920-817884.png",
    accent: "#A97562",
    glow: "rgba(169, 117, 98, 0.26)",
  },
  {
    slug: "death-note",
    title: "Death Note",
    punchline: "La justice devient le crime parfait.",
    tags: ["Psychologique", "Mystère", "Surnaturel"],
    summary:
      "Light Yagami découvre un mystérieux carnet capable de tuer toute personne dont le nom y est inscrit. Alors qu'il tente de remodeler le monde selon sa propre vision de la justice, un brillant détective connu sous le nom de L engage un duel psychologique pour l'arrêter.",
    image: "https://myanimelist.net/images/anime/1079/138100l.jpg",
    backgroundImage: "https://images8.alphacoders.com/806/thumb-1920-806525.jpg",
    accent: "#7B6458",
    glow: "rgba(123, 100, 88, 0.3)",
  },
  {
    slug: "spy-x-family",
    title: "Spy x Family",
    punchline: "Chaque secret a besoin d'un foyer.",
    tags: ["Espionnage", "Comédie", "Famille"],
    summary:
      "Un espion d'élite doit fonder une fausse famille pour mener à bien une mission critique, sans savoir que sa nouvelle épouse est une tueuse à gages et que sa fille adoptive peut lire dans les pensées. Le résultat mélange espionnage, comédie, action et moments familiaux étonnamment tendres.",
    image: "https://myanimelist.net/images/anime/1441/122795l.jpg",
    backgroundImage: "https://images.alphacoders.com/133/thumb-1920-1336935.jpeg",
    accent: "#C9A18F",
    glow: "rgba(201, 161, 143, 0.3)",
  },
  {
    slug: "demon-slayer",
    title: "Demon Slayer",
    punchline: "La compassion aiguisée comme une lame.",
    tags: ["Dark fantasy", "Action", "Historique"],
    summary:
      "Tanjiro Kamado devient pourfendeur de démons après le massacre de sa famille et la transformation de sa soeur Nezuko en démon. Son voyage est porté par la compassion, la discipline et l'espoir de trouver un moyen de lui rendre son humanité.",
    image: "https://myanimelist.net/images/anime/1286/99889l.jpg",
    backgroundImage: "https://images2.alphacoders.com/106/thumb-1920-1065611.png",
    accent: "#8A786C",
    glow: "rgba(138, 120, 108, 0.28)",
  },
];
