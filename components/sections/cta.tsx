"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "../magnetic";

export function CTA() {
  return (
    <section className="relative px-6 py-32 md:px-12 md:py-48">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="mb-8 text-xs uppercase tracking-[0.2em] text-white/50">
          [ 009 ] — entre
        </div>

        <h2
          className="mb-12 max-w-5xl text-balance font-medium leading-[0.85] tracking-[-0.05em]"
          style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
        >
          a noite
          <br />
          <span className="font-serif italic font-normal gradient-text">
            te espera.
          </span>
        </h2>

        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
          <Magnetic strength={0.4}>
            <Link
              href="/login"
              className="group flex items-center gap-4 rounded-full border border-white/20 bg-white/5 py-3 pl-6 pr-3 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
              data-cursor="hover"
            >
              <span className="text-base font-medium">criar conta grátis</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.3}>
            <Link
              href="/gerenciar"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
            >
              sou organizador →
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
