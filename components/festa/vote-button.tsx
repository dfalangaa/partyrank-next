"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Check } from "lucide-react";
import { showToast } from "@/components/toast";

const STORAGE_KEY = "partyrank_votes";

function loadVotes(): Record<string, true> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveVotes(v: Record<string, true>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  window.dispatchEvent(
    new CustomEvent<Record<string, true>>("partyrank:votes", { detail: v }),
  );
}

export function VoteButton({
  partyId,
  initialVotes,
}: {
  partyId: string;
  initialVotes: number;
}) {
  const [voted, setVoted] = useState(false);
  const [count, setCount] = useState(initialVotes);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const v = loadVotes();
    if (v[partyId]) setVoted(true);
  }, [partyId]);

  const handleVote = () => {
    const v = loadVotes();
    if (voted) {
      // unvote
      delete v[partyId];
      saveVotes(v);
      setVoted(false);
      setCount((c) => c - 1);
      showToast("voto removido", "info");
    } else {
      v[partyId] = true;
      saveVotes(v);
      setVoted(true);
      setCount((c) => c + 1);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 800);
      showToast("voto registrado");
    }
  };

  return (
    <button
      onClick={handleVote}
      data-cursor="hover"
      className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
        voted
          ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40"
          : "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/50"
      }`}
    >
      <AnimatePresence mode="wait">
        {voted ? (
          <motion.span
            key="voted"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" /> votado · {count.toLocaleString("pt-BR")}
          </motion.span>
        ) : (
          <motion.span
            key="vote"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" /> votar · {count.toLocaleString("pt-BR")}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Confetti burst on vote */}
      {animate && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * 60,
                  y: Math.sin(angle) * 60,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{
                  background: ["#FF4D8D", "#7C5CFF", "#22D3EE", "#F59E0B"][i % 4],
                }}
              />
            );
          })}
        </span>
      )}
    </button>
  );
}
