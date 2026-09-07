"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Crown, Trophy } from "lucide-react";
import { ScrambleText } from "../scramble-text";
import { leagueMeta, type League } from "@/lib/mock-data";
import { leagueStandings } from "@/lib/leagues";

const LEAGUES: League[] = ["universitaria", "clubs", "coletivos"];

export function LeaguesPreview() {
  return (
    <section className="relative px-6 py-32 md:px-12 md:py-48">
      {/* Section header */}
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
            [ 003 ] —{" "}
            <ScrambleText triggerOnHover>disputa institucional</ScrambleText>
          </div>
          <h2
            className="text-balance font-medium leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            ranking{" "}
            <span className="font-serif italic font-normal gradient-text">
              oficial
            </span>
            <br />
            das ligas
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="mb-3 text-sm leading-relaxed text-white/60 md:text-base">
            Atléticas, clubs e coletivos disputam ponto a ponto o título do
            semestre. Cada festa boa pesa na pontuação institucional.
          </p>
          <Link
            href="/ligas"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] transition hover:border-white/30 hover:bg-white/10"
          >
            ver tabela completa
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {LEAGUES.map((league, i) => {
          const meta = leagueMeta[league];
          const standings = leagueStandings(league);
          const leader = standings[0];
          const second = standings[1];
          const third = standings[2];

          if (!leader) return null;

          return (
            <motion.div
              key={league}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link
                href={`/ligas#${league}`}
                data-cursor="hover"
                className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05]"
              >
                {/* glow gradiente */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${meta.color} opacity-20 blur-3xl transition-opacity group-hover:opacity-30`}
                />

                <div className="relative">
                  {/* tag liga */}
                  <div
                    className={`mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${meta.color}`}
                    />
                    <span
                      className={`bg-gradient-to-r ${meta.color} bg-clip-text text-transparent`}
                    >
                      {meta.short}
                    </span>
                  </div>

                  {/* líder em destaque */}
                  <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/50">
                    <Crown className="h-3 w-3 text-amber-300" />
                    líder atual
                  </div>
                  <div className="mb-2 text-2xl font-medium leading-tight tracking-[-0.02em] md:text-3xl">
                    {leader.organizer.name}
                  </div>
                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tabular-nums">
                      {Math.round(leader.points)}
                    </span>
                    <span className="text-xs uppercase tracking-[0.15em] text-white/45">
                      pontos
                    </span>
                    <span className="text-xs text-white/45">
                      · {leader.partyCount} festas
                    </span>
                  </div>

                  {/* 2 e 3 */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    {[second, third].map((row, idx) => {
                      if (!row) return null;
                      return (
                        <div
                          key={row.organizer.slug}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-4 text-xs tabular-nums text-white/40">
                              {idx + 2}
                            </span>
                            <span className="truncate text-white/70">
                              {row.organizer.name}
                            </span>
                          </div>
                          <span className="tabular-nums text-white/55">
                            {Math.round(row.points)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-white/50">
                      <Trophy className="h-3.5 w-3.5 text-amber-300" />
                      campeão semestral
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
