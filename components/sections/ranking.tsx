"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Crown,
  Flame,
  Star,
  Ticket,
  TrendingDown,
  TrendingUp,
  Trophy,
  Minus,
  Users,
} from "lucide-react";
import {
  parties,
  categoryMeta,
  leagueMeta,
  type Category,
  type League,
} from "@/lib/mock-data";
import { leagueStandings, type LeagueStanding } from "@/lib/leagues";
import { ScrambleText } from "../scramble-text";
import { formatPrice } from "@/lib/utils";

type TopTab = "festas" | "ligas";
type Filter = "todas" | Category;

const filters: { key: Filter; label: string }[] = [
  { key: "todas", label: "todas" },
  { key: "universitaria", label: "universitárias" },
  { key: "club", label: "clubs" },
  { key: "evento", label: "eventos" },
  { key: "rave", label: "raves" },
];

const LEAGUES: League[] = ["universitaria", "clubs", "coletivos"];

function trendIcon(trend: LeagueStanding["trend"]) {
  if (trend === "up")
    return <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />;
  if (trend === "down")
    return <TrendingDown className="h-3.5 w-3.5 text-rose-400" />;
  return <Minus className="h-3.5 w-3.5 text-white/40" />;
}

function FestasView({ filter }: { filter: Filter }) {
  const sorted = useMemo(() => {
    const filtered =
      filter === "todas"
        ? parties
        : parties.filter((p) => p.category === filter);
    return [...filtered].sort((a, b) => b.votes - a.votes).slice(0, 10);
  }, [filter]);

  const top = sorted;
  const maxVotes = Math.max(...top.map((p) => p.votes), 1);

  if (top.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/55">
        nenhuma festa nessa categoria por enquanto.
      </div>
    );
  }

  return (
    <>
      {/* TOP 3 */}
      {top.length >= 3 && (
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {top.slice(0, 3).map((party, i) => {
            const tone = [
              "from-yellow-300 via-amber-400 to-orange-500",
              "from-slate-200 via-slate-300 to-slate-500",
              "from-orange-300 via-amber-600 to-orange-800",
            ][i];
            return (
              <motion.div
                key={party.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/festa/${party.slug}`}
                  data-cursor="hover"
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-white/25"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={party.image}
                      alt={party.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute left-5 top-5 flex items-center gap-2">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${tone} shadow-xl shadow-black/40`}
                      >
                        <span className="text-2xl font-bold text-white drop-shadow-lg">
                          {i + 1}
                        </span>
                      </div>
                      {i === 0 && (
                        <div className="flex items-center gap-1 rounded-full bg-orange-500/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                          <Flame className="h-3 w-3" />
                          bombando
                        </div>
                      )}
                    </div>

                    <div className="absolute right-5 top-5 flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-md">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{party.rating}</span>
                      </div>
                      <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-black backdrop-blur-md">
                        {formatPrice(party.price / 100)}
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/70">
                        <span
                          className={`rounded-full bg-gradient-to-r ${categoryMeta[party.category].color} px-2 py-0.5 font-bold text-white`}
                        >
                          {categoryMeta[party.category].label}
                        </span>
                        <span className="rounded-full border border-white/25 bg-black/40 px-2 py-0.5 backdrop-blur-md">
                          {party.university}
                        </span>
                        <span>·</span>
                        <span>
                          {new Date(party.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <h3 className="mb-3 text-balance text-2xl font-medium leading-tight tracking-[-0.02em] text-white md:text-3xl">
                        {party.name}
                      </h3>
                      <div className="mb-3">
                        <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/60">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-emerald-400" />
                            {party.votes.toLocaleString("pt-BR")} votos
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {party.attendees}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${tone}`}
                            style={{
                              width: `${(party.votes / maxVotes) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-md transition-all group-hover:border-white/30 group-hover:bg-white/15">
                        <span className="pl-3 text-xs font-medium text-white">
                          comprar ingresso
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
                          <Ticket className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* RANK 4-10 */}
      {top.length > 3 && (
        <div className="space-y-3">
          {top.slice(3).map((party, idx) => {
            const i = idx + 3;
            return (
              <motion.div
                key={party.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link
                  href={`/festa/${party.slug}`}
                  data-cursor="hover"
                  className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-3 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] md:gap-6 md:p-4"
                >
                  <div className="w-10 flex-shrink-0 text-center text-2xl font-medium tabular-nums text-white/40 md:w-14 md:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl md:h-20 md:w-28">
                    <Image
                      src={party.image}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/50">
                      <span
                        className={`rounded-full bg-gradient-to-r ${categoryMeta[party.category].color} px-1.5 py-0.5 font-bold text-white`}
                      >
                        {categoryMeta[party.category].label}
                      </span>
                      <span>{party.university}</span>
                      <span>·</span>
                      <span>
                        {new Date(party.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <h3 className="truncate text-base font-medium md:text-xl">
                      {party.name}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1 w-24 overflow-hidden rounded-full bg-white/10 md:w-32">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-pink-400"
                          style={{ width: `${(party.votes / maxVotes) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] tabular-nums text-white/50">
                        {party.votes.toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  <div className="hidden flex-shrink-0 flex-col items-end gap-1 text-right md:flex">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                      a partir de
                    </span>
                    <span className="text-base font-bold">
                      {formatPrice(party.price / 100)}
                    </span>
                  </div>
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-violet-400/40 group-hover:bg-violet-500/15 md:h-12 md:w-12">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-5 md:w-5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}

function LigasView() {
  return (
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
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${meta.color} opacity-20 blur-3xl transition-opacity group-hover:opacity-30`}
              />

              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${meta.color}`}
                  />
                  <span
                    className={`bg-gradient-to-r ${meta.color} bg-clip-text text-transparent`}
                  >
                    {meta.short}
                  </span>
                </div>

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
                        <span className="flex items-center gap-1.5 tabular-nums text-white/55">
                          {Math.round(row.points)}
                          {trendIcon(row.trend)}
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
  );
}

export function Ranking() {
  const [topTab, setTopTab] = useState<TopTab>("festas");
  const [filter, setFilter] = useState<Filter>("todas");

  return (
    <section id="ranking" className="relative px-6 py-32 md:px-12 md:py-48">
      {/* Section header */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
            [ 002 ] — <ScrambleText triggerOnHover>o ranking</ScrambleText>
          </div>
          <h2
            className="text-balance font-medium leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            top <span className="font-serif italic font-normal gradient-text">10</span>
            <br />
            da <span className="font-serif italic font-normal gradient-text">semana</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="mb-3 text-sm leading-relaxed text-white/60 md:text-base">
            atualizado em tempo real. quanto mais voto, mais pra cima.
            quem tá no topo vai bombar esse fim de semana.
          </p>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            ao vivo · 12.4k votando agora
          </div>
        </div>
      </div>

      {/* Top tabs: Festas / Ligas */}
      <div className="mb-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
        {(["festas", "ligas"] as TopTab[]).map((tab) => {
          const active = topTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setTopTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active
                  ? "bg-white text-black shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab === "festas" ? "festas" : "ligas"}
            </button>
          );
        })}
      </div>

      {/* Filtros (só na aba Festas) */}
      {topTab === "festas" && (
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                filter === f.key
                  ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Sub-header da aba Ligas */}
      {topTab === "ligas" && (
        <div className="mb-10 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
          Atléticas, clubs e coletivos disputam ponto a ponto o título do
          semestre. Cada festa boa pesa na pontuação institucional.
        </div>
      )}

      {/* Conteúdo da aba */}
      {topTab === "festas" ? <FestasView filter={filter} /> : <LigasView />}

      {/* Footer da seção */}
      <div className="mt-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="text-xs text-white/50">
          {topTab === "festas"
            ? "ranking atualizado a cada novo voto · próxima festa em "
            : "placar oficial · temporada 2026 · próxima atualização em "}
          <span className="text-white">3 dias</span>
        </div>
        <Link
          href={topTab === "festas" ? "/festas" : "/ligas"}
          data-cursor="hover"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm transition hover:border-white/30 hover:bg-white/10"
        >
          {topTab === "festas" ? "ver ranking completo" : "ver tabela completa"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
