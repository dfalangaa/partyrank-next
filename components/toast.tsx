"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

type ToastKind = "success" | "info" | "error";
type ToastItem = { id: number; msg: string; kind: ToastKind };

const EVENT = "partyrank:toast";

/**
 * Fire-and-forget API — works from any component, server or client, without
 * a context provider. The `<Toaster />` listens on the window event bus.
 */
export function showToast(msg: string, kind: ToastKind = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<{ msg: string; kind: ToastKind }>(EVENT, {
      detail: { msg, kind },
    }),
  );
}

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    let nextId = 1;
    const onShow = (e: Event) => {
      const { msg, kind } = (e as CustomEvent<{ msg: string; kind: ToastKind }>).detail;
      const id = nextId++;
      setItems((prev) => [...prev, { id, msg, kind }]);
      // auto-dismiss
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 2600);
    };
    window.addEventListener(EVENT, onShow);
    return () => window.removeEventListener(EVENT, onShow);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {items.map((t) => {
          const Icon = t.kind === "error" ? X : t.kind === "info" ? Sparkles : Check;
          const tone =
            t.kind === "error"
              ? "border-red-400/40 bg-red-500/15 text-red-200"
              : t.kind === "info"
                ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                : "border-emerald-400/40 bg-emerald-500/15 text-emerald-200";
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={`pointer-events-auto inline-flex max-w-md items-center gap-2 rounded-full border px-4 py-2.5 text-sm shadow-2xl shadow-black/40 backdrop-blur-md ${tone}`}
              role="status"
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{t.msg}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
