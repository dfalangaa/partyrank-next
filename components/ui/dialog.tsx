"use client";

import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Dialog({
  open,
  onClose,
  title,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const widthClass =
    size === "sm" ? "max-w-md" : size === "lg" ? "max-w-2xl" : "max-w-lg";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />
          {/*
            Two responsive treatments share the same logical Dialog:
              - **Mobile (< md)**: bottom sheet that slides up from the bottom,
                full-width, rounded only at the top — the iOS pattern.
              - **Desktop (≥ md)**: centered modal, original behaviour.
            Tailwind responsive variants pick one or the other; only the
            animated translate values differ at the framer level (a single
            spring from y: 100% on mobile reads as "sheet up").
          */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-[101] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div
              className="max-h-[88vh] overflow-y-auto rounded-t-3xl border-t border-white/15 bg-[#160a2e] p-6 shadow-2xl shadow-violet-500/10"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
            >
              {/* drag handle (visual only) */}
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/15" />
              <div className="mb-5 flex items-start justify-between gap-4">
                <h3 className="text-xl font-medium tracking-[-0.02em]">{title}</h3>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70"
                  aria-label="fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed left-1/2 top-1/2 z-[101] hidden w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 md:block ${widthClass}`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="rounded-3xl border border-white/15 bg-[#160a2e] p-7 shadow-2xl shadow-violet-500/10 md:p-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <h3 className="text-2xl font-medium tracking-[-0.02em]">{title}</h3>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                  aria-label="fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ====== Form helpers ======
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.15em] text-white/55">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm placeholder:text-white/35 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20";
