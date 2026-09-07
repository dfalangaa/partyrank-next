"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Crown, Ticket, Heart, Award, Calendar, Share2, Sparkles } from "lucide-react";
import { parties } from "@/lib/mock-data";
import { ScrambleText } from "@/components/scramble-text";
import { useFavorites } from "@/lib/use-favorites";
import { useVotes } from "@/lib/use-votes";
import { sharePartyLink } from "@/components/festa/share-button";
import { showToast } from "@/components/toast";

export default function PerfilPage() {
  const { favorites, count: favoritesCount, ids: favIds } = useFavorites();
  const { votes, count: votesCount, ids: voteIds } = useVotes();

  const favoritedParties = useMemo(
    () => parties.filter((p) => favorites[p.id]),
    [favorites],
  );
  const votedParties = useMemo(
    () => parties.filter((p) => votes[p.id]),
    [votes],
  );

  // unique festas engaged (favorited OR voted)
  const engagedCount = useMemo(() => {
    const unique = new Set<string>([...favIds, ...voteIds]);
    return unique.size;
  }, [favIds, voteIds]);

  // XP: 10 per vote, 5 per favorite — simple gamification placeholder
  const xp = votesCount * 10 + favoritesCount * 5;

  const upcoming = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return parties
      .filter((p) => p.date >= today && !favorites[p.id])
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);
  }, [favorites]);

  const shareAgenda = async () => {
    if (favoritedParties.length === 0) {
      showToast("favorite festas pra compartilhar sua agenda", "info");
      return;
    }
    const lines = favoritedParties.slice(0, 5).map((p) => {
      const d = new Date(p.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      });
      return `· ${p.name} — ${p.university} · ${d}`;
    });
    const text = `minha agenda no PartyRank:\n${lines.join("\n")}\n\nve qual rola na sua: `;
    await sharePartyLink({
      title: "minha agenda no PartyRank",
      text,
      path: "/festas",
    });
  };

  return (
    <div className="relative min-h-screen px-4 pb-20 pt-4 md:px-12 md:pt-40">
      {/* Desktop-only back link — mobile already has the tab bar */}
      <Link href="/" className="mb-8 hidden items-center gap-2 text-sm text-white/60 hover:text-white md:inline-flex">
        <ArrowLeft className="h-4 w-4" /> voltar
      </Link>

      {/* Hero perfil */}
      <div className="mb-8 flex flex-col items-start gap-4 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-6">
        <div>
          <div className="mb-3 hidden text-xs uppercase tracking-[0.2em] text-white/50 md:block">
            [ perfil ] — <ScrambleText triggerOnHover>meus dados</ScrambleText>
          </div>
          <div className="flex items-center gap-4 md:gap-5">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 ring-4 ring-white/10 md:h-24 md:w-24" />
            <div>
              <h1 className="text-3xl font-medium leading-none tracking-[-0.03em] md:text-7xl">
                davi <span className="font-serif italic font-normal gradient-text">f.</span>
              </h1>
              <div className="mt-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/60 md:mt-2 md:text-xs">
                <span>USP · engenharia</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-amber-300">
                  <Crown className="h-3 w-3" /> PRO
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={shareAgenda}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm transition hover:border-white/30 hover:bg-white/10"
        >
          <Share2 className="h-4 w-4" /> compartilhar minha agenda
        </button>
      </div>

      {/* Stats — 2×2 compact grid on mobile, 4-col with dividers on desktop */}
      <div className="mb-10 grid grid-cols-2 gap-2 md:mb-16 md:grid-cols-4 md:gap-0 md:divide-x md:divide-y-0 md:border-y md:border-white/10 md:divide-white/10">
        {[
          { icon: Ticket, label: "engajadas", longLabel: "festas engajadas", value: engagedCount.toString() },
          { icon: Award, label: "votos", longLabel: "votos dados", value: votesCount.toString() },
          { icon: Heart, label: "favoritas", longLabel: "favoritas", value: favoritesCount.toString() },
          { icon: Crown, label: "XP", longLabel: "XP", value: xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : xp.toString() },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:rounded-none md:border-0 md:bg-transparent md:p-10"
          >
            <s.icon className="mb-2 h-4 w-4 text-violet-400 md:mb-3 md:h-5 md:w-5" />
            <div className="text-3xl font-medium tracking-[-0.03em] tabular-nums md:text-6xl">
              {s.value}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/50 md:mt-2 md:text-xs">
              <span className="md:hidden">{s.label}</span>
              <span className="hidden md:inline">{s.longLabel}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Favoritas */}
      <section className="mb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-5xl">
            minhas <span className="font-serif italic font-normal gradient-text">favoritas</span>
          </h2>
          {favoritesCount > 0 && (
            <Link
              href="/festas?fav=1"
              className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
            >
              ver tudo →
            </Link>
          )}
        </div>

        {favoritesCount === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
            <Heart className="mx-auto mb-3 h-6 w-6 text-white/30" />
            <p className="mb-1 text-white/70">você ainda não favoritou nenhuma festa.</p>
            <p className="mb-5 text-sm text-white/45">
              salvas aqui ficam só pra você e dá pra compartilhar como agenda.
            </p>
            <Link
              href="/festas"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30"
            >
              <Sparkles className="h-4 w-4" /> explorar festas
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoritedParties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/festa/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/25"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                        {p.university}
                      </div>
                      <div className="text-lg font-medium leading-tight">{p.name}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-white/60">
                        <Calendar className="h-3 w-3" />
                        {new Date(p.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Histórico de votos */}
      <section className="mb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-5xl">
            festas que <span className="font-serif italic font-normal gradient-text">votei</span>
          </h2>
          <span className="text-sm text-white/45">{votesCount} no total</span>
        </div>

        {votesCount === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center text-white/55">
            seu voto define o ranking. ainda não votou em nada — comece por uma festa que rolou bem.
          </div>
        ) : (
          <div className="space-y-3">
            {votedParties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link
                  href={`/festa/${p.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/50">
                      {p.university}
                    </div>
                    <div className="truncate text-lg font-medium md:text-xl">{p.name}</div>
                  </div>
                  <div className="text-sm text-white/60">
                    {new Date(p.date).toLocaleDateString("pt-BR")}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Descobrir mais */}
      {upcoming.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-medium tracking-[-0.03em] md:text-5xl">
            próximas <span className="font-serif italic font-normal gradient-text">festas</span>
          </h2>
          <div className="space-y-3">
            {upcoming.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/festa/${p.slug}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]">
                  <div className="text-2xl font-medium text-white/30 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/50">{p.university}</div>
                    <div className="text-xl font-medium md:text-2xl">{p.name}</div>
                  </div>
                  <div className="text-sm text-white/60">{new Date(p.date).toLocaleDateString("pt-BR")}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
