"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/use-favorites";
import { showToast } from "@/components/toast";

export function FavoriteButton({
  partyId,
  partyName,
  compact,
}: {
  partyId: string;
  partyName?: string;
  /** Icon-only variant used in cards / tight headers. */
  compact?: boolean;
}) {
  const { isFavorite, toggle } = useFavorites();
  const favorited = isFavorite(partyId);
  const [pulse, setPulse] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(partyId);
    if (added) {
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
      showToast(partyName ? `${partyName} salva nas favoritas` : "salvo nas favoritas");
    } else {
      showToast("removida das favoritas", "info");
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={favorited}
        aria-label={favorited ? "remover dos favoritos" : "adicionar aos favoritos"}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
          favorited
            ? "border-pink-400/40 bg-pink-500/15 text-pink-200"
            : "border-white/15 bg-black/30 text-white/80 hover:border-white/35 hover:bg-black/45"
        }`}
      >
        <Heart
          className={`h-4 w-4 transition ${pulse ? "scale-125" : ""} ${
            favorited ? "fill-pink-300 text-pink-300" : ""
          }`}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor="hover"
      aria-pressed={favorited}
      aria-label={favorited ? "remover dos favoritos" : "adicionar aos favoritos"}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${
        favorited
          ? "border-pink-400/40 bg-pink-500/15 text-pink-200"
          : "border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
      }`}
    >
      <Heart
        className={`h-4 w-4 transition ${pulse ? "scale-125" : ""} ${
          favorited ? "fill-pink-300 text-pink-300" : ""
        }`}
      />
      {favorited ? "favoritado" : "favoritar"}
    </button>
  );
}
