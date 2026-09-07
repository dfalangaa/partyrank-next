"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera } from "lucide-react";

/**
 * Deterministic gallery from Unsplash IDs that are known to load (and Unsplash
 * does not 404 on them like the original mock-data IDs do). Replaces silent
 * "festa passada" copy with actual visuals.
 */
const PHOTO_IDS = [
  "1492684223066-81342ee5ff30",
  "1459749411175-04bf5292ceea",
  "1574391884720-bbc3740c59d1",
  "1429962714451-bb934ecdc4ec",
  "1496843916299-590492c751f4",
  "1517457373958-b7bdd4587205",
];

function hashSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function pick(slug: string, n: number) {
  const h = hashSlug(slug);
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const id = PHOTO_IDS[(h + i * 13) % PHOTO_IDS.length];
    if (!out.includes(id)) out.push(id);
  }
  while (out.length < n) {
    const id = PHOTO_IDS[(out.length + h) % PHOTO_IDS.length];
    out.push(id);
  }
  return out.map(
    (id) => `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format`,
  );
}

export function PartyGallery({ slug }: { slug: string }) {
  const photos = pick(slug, 6);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-violet-400" />
          <h2 className="text-xl font-medium md:text-2xl">edição passada</h2>
        </div>
        <span className="text-xs text-white/40">{photos.length} fotos</span>
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIdx(i)}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 ${
              i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 33vw, 240px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="relative h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[openIdx]}
                alt=""
                fill
                sizes="80vw"
                className="rounded-3xl object-contain"
                priority
              />
              <button
                type="button"
                onClick={() => setOpenIdx(null)}
                className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur"
                aria-label="fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
