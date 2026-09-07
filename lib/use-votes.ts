"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "partyrank_votes";
const EVENT = "partyrank:votes";

export type VotesMap = Record<string, true>;

function read(): VotesMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function useVotes() {
  const [votes, setVotes] = useState<VotesMap>({});

  useEffect(() => {
    setVotes(read());
    const onUpdate = (e: Event) =>
      setVotes((e as CustomEvent<VotesMap>).detail || {});
    const onStorage = () => setVotes(read());
    window.addEventListener(EVENT, onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const ids = Object.keys(votes);
  return {
    votes,
    ids,
    count: ids.length,
    has: (id: string) => !!votes[id],
  };
}
