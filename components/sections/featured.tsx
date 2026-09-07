"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { parties } from "@/lib/mock-data";
import { ScrambleText } from "../scramble-text";

export function Featured() {
  const featured = parties.slice(0, 6);

  return (
    <section id="festas" className="relative px-6 py-32 md:px-12 md:py-48">
      {/* Section header */}
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
            [ 003 ] — <ScrambleText triggerOnHover>selecionadas</ScrambleText>
          </div>
          <h2
            className="text-balance font-medium leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
          >
            em <span className="font-serif italic font-normal gradient-text">destaque</span>
          </h2>
        </div>
      </div>

      {/* Asymmetric grid */}
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        {featured.map((party, i) => {
          // Asymmetric positioning
          const layouts = [
            "md:col-span-6 md:row-span-2 aspect-[4/5]",    // big left
            "md:col-span-4 md:col-start-8 aspect-[4/3] md:mt-16", // medium right top
            "md:col-span-3 md:col-start-8 aspect-square",  // small right bottom
            "md:col-span-5 md:col-start-1 aspect-[4/5]",   // left
            "md:col-span-6 md:col-start-7 aspect-[3/2] md:-mt-16", // wide right
            "md:col-span-4 md:col-start-3 aspect-square md:-mt-8", // small center
          ];
          return (
            <motion.div
              key={party.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className={layouts[i]}
            >
              <Link
                href={`/festa/${party.slug}`}
                className="group relative block h-full w-full overflow-hidden rounded-3xl"
                data-cursor="hover"
              >
                <Image
                  src={party.image}
                  alt={party.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />

                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Hover accent */}
                <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/40 via-transparent to-pink-500/40" />
                </div>

                {/* Top chip */}
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/70">
                  <span className="rounded-full border border-white/25 bg-black/40 px-2.5 py-1 backdrop-blur-md">
                    {party.university}
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {new Date(party.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                    })}
                  </div>
                  <h3 className="text-balance text-2xl font-medium leading-tight tracking-[-0.02em] text-white transition-all duration-500 group-hover:font-serif group-hover:italic group-hover:font-normal md:text-4xl">
                    {party.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
