"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar as CalIcon, Clock } from "lucide-react";
import { parties } from "@/lib/mock-data";

export function Calendar() {
  // group by date
  const byDate = parties.reduce((acc, p) => {
    const d = p.date;
    if (!acc[d]) acc[d] = [];
    acc[d].push(p);
    return acc;
  }, {} as Record<string, typeof parties>);

  const dates = Object.keys(byDate).sort().slice(0, 5);

  return (
    <section id="calendario" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
            <CalIcon className="h-3 w-3" />
            agenda da semana
          </div>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-medium leading-tight tracking-tighter md:text-5xl">
            próximas <span className="gradient-text">5 datas</span> pra colar
          </h2>
        </div>

        <div className="space-y-3">
          {dates.map((date, idx) => {
            const d = new Date(date);
            const day = d.toLocaleDateString("pt-BR", { day: "2-digit" });
            const month = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
            const weekday = d.toLocaleDateString("pt-BR", { weekday: "long" });

            return (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:gap-6 md:p-6"
              >
                {/* Date block */}
                <div className="flex items-center gap-4 md:min-w-[160px]">
                  <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent">
                    <span className="text-2xl font-bold leading-none">{day}</span>
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      {month}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium capitalize text-white">
                      {weekday.replace("-feira", "")}
                    </div>
                    <div className="text-xs text-white/50">
                      {byDate[date].length} {byDate[date].length === 1 ? "festa" : "festas"}
                    </div>
                  </div>
                </div>

                {/* Parties */}
                <div className="flex flex-wrap gap-2 md:flex-1">
                  {byDate[date].map((p) => (
                    <Link
                      key={p.id}
                      href={`/festa/${p.slug}`}
                      className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs transition-all hover:border-white/25 hover:bg-white/10"
                    >
                      <span className="font-medium text-white">{p.name}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/50">{p.university}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
