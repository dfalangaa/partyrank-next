"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { PRMark } from "@/components/pr-mark";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "partyrank_install_dismissed_at";
const DISMISS_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function wasDismissedRecently() {
  if (typeof window === "undefined") return false;
  const v = localStorage.getItem(DISMISS_KEY);
  if (!v) return false;
  const t = Number(v);
  if (!Number.isFinite(t)) return false;
  return Date.now() - t < DISMISS_TTL_MS;
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // already installed (standalone mode)
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone;
    if (standalone) return;
    if (wasDismissedRecently()) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      // show after a small delay so it doesn't interrupt the first paint
      setTimeout(() => setVisible(true), 1500);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "dismissed") {
        localStorage.setItem(DISMISS_KEY, Date.now().toString());
      }
    } finally {
      setVisible(false);
      setDeferred(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-sm md:left-auto md:right-6 md:mx-0"
        >
          <div className="flex items-center gap-3 rounded-3xl border border-white/15 bg-background/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <PRMark size={42} variant="tile" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">instala como app</div>
              <div className="text-xs text-white/55">
                vira ícone no celular · push de festa boa
              </div>
            </div>
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-violet-500/30"
            >
              <Download className="h-3 w-3" /> instalar
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="dispensar"
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/45 hover:bg-white/5 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
