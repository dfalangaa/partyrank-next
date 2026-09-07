"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  MapPin,
  TrendingUp,
  X,
  type LucideIcon,
} from "lucide-react";
import { PRMark } from "@/components/pr-mark";

const STORAGE_KEY = "partyrank_onboarded";

type Slide = {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    icon: TrendingUp,
    iconColor: "text-emerald-300",
    iconBg: "from-emerald-500/30 to-emerald-500/0",
    title: "ranking ao vivo",
    body: "as melhores festas da semana, votadas pela galera. atualiza em tempo real toda quinta.",
  },
  {
    icon: Heart,
    iconColor: "text-pink-300",
    iconBg: "from-pink-500/30 to-pink-500/0",
    title: "favorite e organize",
    body: "salve as festas que te interessam, monte sua agenda e compartilhe com a galera num clique.",
  },
  {
    icon: MapPin,
    iconColor: "text-violet-300",
    iconBg: "from-violet-500/30 to-violet-500/0",
    title: "encontre na cidade",
    body: "pin por região, abrir no Google Maps direto. nada de descobrir a porta da festa na hora.",
  },
];

export function Onboarding() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // mobile-only: show only when in a narrow viewport — desktop visitors are
    // usually marketing-page traffic and don't need the app tutorial.
    if (window.innerWidth >= 768) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
    setOpen(false);
  };

  const advance = () => {
    if (idx < SLIDES.length - 1) setIdx((i) => i + 1);
    else close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex flex-col bg-[#0B0B14] md:hidden"
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="bem-vindo ao PartyRank"
        >
          {/* skip in top-right */}
          <div className="flex items-center justify-between px-5 pt-3">
            <PRMark size={28} variant="tile" />
            <button
              type="button"
              onClick={close}
              className="rounded-full px-3 py-1.5 text-xs text-white/55 active:bg-white/5"
              aria-label="pular tutorial"
            >
              pular
            </button>
          </div>

          {/* slide content — animated swap */}
          <div className="relative flex flex-1 flex-col items-center justify-center px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm text-center"
              >
                {(() => {
                  const s = SLIDES[idx];
                  const Icon = s.icon;
                  return (
                    <>
                      <div
                        className={`mx-auto mb-10 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br ${s.iconBg}`}
                      >
                        <Icon className={`h-14 w-14 ${s.iconColor}`} strokeWidth={1.5} />
                      </div>
                      <h2 className="mb-3 text-3xl font-medium leading-tight tracking-[-0.03em]">
                        {s.title}
                      </h2>
                      <p className="text-balance text-base leading-relaxed text-white/65">
                        {s.body}
                      </p>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 pb-6">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`tela ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-white" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>

          {/* primary action */}
          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={advance}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 py-4 text-base font-medium shadow-lg shadow-violet-500/30 active:scale-[0.98]"
            >
              {idx < SLIDES.length - 1 ? (
                <>
                  próximo <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  começar
                  <X className="hidden" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
