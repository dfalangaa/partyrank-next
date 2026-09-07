"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "../magnetic";
import { ScrambleText } from "../scramble-text";

export function Hero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden md:min-h-screen">
      {/* Top bar — year, location, live indicator */}
      <div
        className="absolute inset-x-0 z-10 flex items-center justify-between px-6 md:px-12"
        style={{ top: "calc(4.5rem + var(--promo-h, 0px))" }}
      >
        <div
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 opacity-0"
          style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          ao vivo · são paulo
        </div>
        <div
          className="text-xs uppercase tracking-[0.2em] text-white/60 opacity-0"
          style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
        >
          <ScrambleText duration={1200}>abril / 2026</ScrambleText>
        </div>
      </div>

      {/* Massive headline — fills screen */}
      <div className="relative flex min-h-[78vh] flex-col justify-center pl-6 pr-6 md:min-h-screen md:pl-16 md:pr-12">
        <h1
          className="mb-8 font-medium leading-[0.88] tracking-[-0.05em] md:mb-12"
          aria-label="a noite é sua"
          style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
        >
          <span className="block overflow-hidden">
            <span
              className="inline-block"
              style={{
                animation: "heroLineIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s both",
                willChange: "transform",
              }}
            >
              a noite
            </span>
          </span>
          <span className="block overflow-hidden -mt-1 md:-mt-2 pl-[0.15em] -ml-[0.15em]">
            <span
              className="inline-block font-serif italic font-normal gradient-text"
              style={{
                animation: "heroLineIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.55s both",
                willChange: "transform",
                paddingBottom: "0.12em",
                paddingRight: "0.15em",
              }}
            >
              é sua
            </span>
          </span>
        </h1>

        {/* Bottom row — two columns */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div
            className="max-w-md opacity-0"
            style={{ animation: "fadeInUp 0.8s ease-out 1s both" }}
          >
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/50">
              [ 001 ] — manifesto
            </p>
            <p className="text-balance text-base leading-relaxed text-white/75 md:text-lg">
              ranking ao vivo das melhores festas de são paulo: universitárias,
              clubs, raves e eventos. a galera vota, a gente ranqueia. a festa
              certa nunca mais se perde.
            </p>
          </div>

          <div
            className="flex items-center gap-3 opacity-0"
            style={{ animation: "fadeInUp 0.8s ease-out 1.2s both" }}
          >
            <Magnetic strength={0.4}>
              <Link
                href="/festas"
                className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 md:h-20 md:w-20"
              >
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-6 md:w-6" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link
                href="/festas"
                className="group flex flex-col text-right"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  explorar
                </span>
                <span className="font-serif text-xl italic text-white md:text-2xl">
                  ranking da semana
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Side marker */}
        <div className="absolute left-6 bottom-6 hidden flex-col items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40 md:flex">
          <span className="[writing-mode:vertical-rl] rotate-180">
            scroll to explore
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
