"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { parties } from "@/lib/mock-data";

export function PhotoStrip() {
  const photos = [...parties, ...parties];

  return (
    <section className="relative overflow-hidden py-10">
      <div className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-white/50">
        última noite em são paulo
      </div>

      <div className="relative flex">
        <div className="flex shrink-0 animate-marquee gap-4 pr-4">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="group relative h-64 w-80 flex-shrink-0 overflow-hidden rounded-2xl"
            >
              <Image
                src={p.image}
                alt=""
                fill
                sizes="320px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-xs text-white/70">{p.university}</div>
                <div className="font-medium text-white">{p.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
