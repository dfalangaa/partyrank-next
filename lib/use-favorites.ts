"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "partyrank_favorites";
const EVENT = "partyrank:favorites";

export type FavoritesMap = Record<string, true>;

function read(): FavoritesMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function write(value: FavoritesMap) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent<FavoritesMap>(EVENT, { detail: value }));
}

/**
 * Reactive favorites store. Reads from localStorage on mount, listens for
 * cross-component updates via a custom window event, and exposes simple
 * mutation helpers.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritesMap>({});

  useEffect(() => {
    setFavorites(read());
    const onUpdate = (e: Event) =>
      setFavorites((e as CustomEvent<FavoritesMap>).detail || {});
    const onStorage = () => setFavorites(read());
    window.addEventListener(EVENT, onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const isFavorite = useCallback(
    (id: string) => !!favorites[id],
    [favorites],
  );

  const toggle = useCallback((id: string) => {
    const current = read();
    let next: FavoritesMap;
    let added: boolean;
    if (current[id]) {
      next = { ...current };
      delete next[id];
      added = false;
    } else {
      next = { ...current, [id]: true };
      added = true;
    }
    write(next);
    return added;
  }, []);

  const ids = Object.keys(favorites);

  return { favorites, ids, count: ids.length, isFavorite, toggle };
}

/** Read-only variant for places that don't mutate (navbar badge, etc). */
export function useFavoritesCount() {
  const { count } = useFavorites();
  return count;
}
