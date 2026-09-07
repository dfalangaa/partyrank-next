import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PartyRank — A noite é sua",
    short_name: "PartyRank",
    description:
      "Ranking ao vivo das festas de São Paulo: universitárias, clubs, raves e eventos.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0B0B14",
    theme_color: "#0B0B14",
    lang: "pt-BR",
    categories: ["entertainment", "lifestyle", "social"],
    icons: [
      // Next serves /icon.svg as the favicon — link it here for PWA installers
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Ranking ao vivo",
        short_name: "Ranking",
        url: "/#ranking",
        description: "Top da semana",
      },
      {
        name: "Todas as festas",
        short_name: "Festas",
        url: "/festas",
        description: "Catálogo completo com filtros",
      },
      {
        name: "Minhas favoritas",
        short_name: "Favoritas",
        url: "/festas?fav=1",
        description: "Sua agenda salva",
      },
    ],
  };
}
