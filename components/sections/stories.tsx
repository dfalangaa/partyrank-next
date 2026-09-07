"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { parties } from "@/lib/mock-data";

export function Stories() {
  return (
    <section className="relative py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-white/50">
          <div className="h-px flex-1 bg-white/10" />
          <span>stories ao vivo</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {parties.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex-shrink-0"
            >
              <Link href={`/festa/${p.slug}`} className="group block">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-pink-500 opacity-80 blur-[2px] transition-opacity group-hover:opacity-100" />
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-background">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="mt-2 max-w-[80px] truncate text-center text-[10px] text-white/70">
                  {p.university}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
