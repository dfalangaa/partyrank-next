"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/mock-data";
import { ScrambleText } from "../scramble-text";

export function Testimonials() {
  return (
    <section className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
            [ 007 ] — <ScrambleText triggerOnHover>a galera fala</ScrambleText>
          </div>
          <h2
            className="text-balance font-medium leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
          >
            eles <span className="font-serif italic font-normal gradient-text">aprovam</span>.
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 transition-all hover:border-white/25 hover:bg-white/[0.05] md:p-14"
          >
            <div className="mb-8 font-serif text-4xl italic leading-tight text-white/90 md:text-5xl">
              &ldquo;{t.text}&rdquo;
            </div>

            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 flex-shrink-0 rounded-full bg-gradient-to-br ${t.avatar} ring-2 ring-white/10`} />
              <div>
                <div className="font-medium text-white">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/50">{t.university}</div>
              </div>
            </div>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
