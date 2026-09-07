"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { parties } from "@/lib/mock-data";
import { Button } from "../ui/button";

// Fake positions on a stylized SP map
const positions = [
  { left: "35%", top: "25%" },
  { left: "55%", top: "30%" },
  { left: "25%", top: "45%" },
  { left: "70%", top: "50%" },
  { left: "45%", top: "60%" },
  { left: "62%", top: "72%" },
  { left: "30%", top: "68%" },
  { left: "78%", top: "35%" },
  { left: "50%", top: "80%" },
  { left: "15%", top: "55%" },
];

export function MapPreview() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              <Navigation className="h-3 w-3" />
              mapa da noite
            </div>
            <h2 className="max-w-lg text-balance text-4xl font-medium leading-tight tracking-tighter md:text-5xl">
              toda <span className="gradient-text">SP</span> numa tela
            </h2>
          </div>
          <Link href="/mapa">
            <Button variant="outline">ver mapa completo →</Button>
          </Link>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-background to-cyan-950/30">
          {/* Grid lines simulating streets */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Wavy river line */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <path
              d="M 0 60 Q 15 40 30 50 T 55 70 T 85 45 T 100 55"
              stroke="rgba(34,211,238,0.2)"
              strokeWidth="3"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Pins */}
          {parties.slice(0, 10).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                type: "spring",
                stiffness: 200,
              }}
              style={positions[i]}
              className="group absolute -translate-x-1/2 -translate-y-full"
            >
              <Link href={`/festa/${p.slug}`} className="block">
                <div className="relative">
                  {/* Pulse */}
                  <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 h-8 w-8 animate-ping rounded-full bg-violet-500/20" />
                  {/* Pin */}
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg shadow-violet-500/30">
                    <MapPin className="h-4 w-4 text-white" fill="white" />
                  </div>
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-white/15 bg-background/95 px-3 py-1.5 text-xs opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-[10px] text-white/60">{p.university}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Overlay gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>

        <div className="mt-6 text-center text-sm text-white/50">
          10 festas abertas essa semana. clique num pin pra ver detalhes.
        </div>
      </div>
    </section>
  );
}
