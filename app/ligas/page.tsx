import Link from "next/link";
import {
  ArrowUpRight,
  Crown,
  TrendingDown,
  TrendingUp,
  Trophy,
  Minus,
} from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import { leagueMeta, type League } from "@/lib/mock-data";
import { leagueStandings, type LeagueStanding } from "@/lib/leagues";

export const metadata = {
  title: "Placar das Ligas — PartyRank",
  description:
    "O Brasileirão da noite paulistana. Atléticas, clubs e coletivos disputando ponto a ponto o título do semestre.",
};

const LEAGUES: League[] = ["universitaria", "clubs", "coletivos"];

function trendIcon(trend: LeagueStanding["trend"]) {
  if (trend === "up")
    return <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />;
  if (trend === "down")
    return <TrendingDown className="h-3.5 w-3.5 text-rose-400" />;
  return <Minus className="h-3.5 w-3.5 text-white/40" />;
}

function StandingsTable({ league }: { league: League }) {
  const standings = leagueStandings(league);
  const meta = leagueMeta[league];
  const leader = standings[0];
  const leaderPoints = leader?.points ?? 1;

  return (
    <section className="mb-24">
      {/* Cabeçalho da liga */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
            <span
              className={`h-2 w-2 rounded-full bg-gradient-to-r ${meta.color}`}
            />
            <span>{meta.short}</span>
          </div>
          <h2
            className="font-medium leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {meta.label}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
            {meta.description}
          </p>
        </div>

        {leader && (
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <Crown className="h-5 w-5 text-amber-300" />
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/50">
                líder
              </div>
              <div className="text-base font-medium">
                {leader.organizer.name}
              </div>
              <div className="text-xs tabular-nums text-white/60">
                {Math.round(leader.points)} pts
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
        {/* header */}
        <div className="hidden items-center gap-4 border-b border-white/5 bg-white/[0.02] px-6 py-3 text-[10px] uppercase tracking-[0.18em] text-white/40 md:flex">
          <div className="w-10 text-center">#</div>
          <div className="flex-1">organizador</div>
          <div className="w-24 text-right">festas</div>
          <div className="w-24 text-right">média</div>
          <div className="w-28 text-right">pontos</div>
          <div className="w-10" />
        </div>

        {standings.map((row, idx) => {
          const pct = (row.points / leaderPoints) * 100;
          const position = idx + 1;
          const isPodium = position <= 3;
          const podiumTone = [
            "from-yellow-300 via-amber-400 to-orange-500",
            "from-slate-200 via-slate-300 to-slate-500",
            "from-orange-300 via-amber-600 to-orange-800",
          ][position - 1];

          return (
            <Link
              key={row.organizer.slug}
              href={`/organizadores`}
              data-cursor="hover"
              className="group relative flex items-center gap-4 border-b border-white/5 px-4 py-4 transition hover:bg-white/[0.04] md:px-6"
            >
              {/* posição */}
              <div className="w-10 flex-shrink-0 text-center">
                {isPodium ? (
                  <div
                    className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${podiumTone} text-sm font-bold text-white shadow-lg shadow-black/30`}
                  >
                    {position}
                  </div>
                ) : (
                  <span className="text-lg font-medium tabular-nums text-white/40">
                    {String(position).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* organizador */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-base font-medium md:text-lg">
                    {row.organizer.name}
                  </span>
                  {position === 1 && (
                    <Trophy className="h-4 w-4 flex-shrink-0 text-amber-300" />
                  )}
                </div>
                <div className="mt-1 hidden text-xs text-white/45 md:block">
                  {row.organizer.description}
                </div>
                {/* progress bar mobile */}
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5 md:hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${meta.color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* dados desktop */}
              <div className="hidden w-24 text-right text-sm tabular-nums text-white/70 md:block">
                {row.partyCount}
              </div>
              <div className="hidden w-24 text-right text-sm tabular-nums text-white/70 md:block">
                {row.averageRating.toFixed(2)}
              </div>
              <div className="hidden w-28 md:block">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-base font-semibold tabular-nums">
                    {Math.round(row.points)}
                  </span>
                  {trendIcon(row.trend)}
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${meta.color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* dados mobile */}
              <div className="flex flex-col items-end gap-0.5 md:hidden">
                <div className="flex items-center gap-1.5 text-base font-semibold tabular-nums">
                  {Math.round(row.points)}
                  {trendIcon(row.trend)}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                  {row.partyCount} festas · {row.averageRating.toFixed(2)}
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function LigasPage() {
  return (
    <div className="relative px-4 pb-32 pt-4 md:px-12 md:pb-48 md:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* Hero da página */}
        <header className="mb-8 md:mb-20">
          <div className="mb-2 hidden text-xs uppercase tracking-[0.2em] text-white/50 md:mb-4 md:block">
            [ placar oficial ] —{" "}
            <ScrambleText triggerOnHover>temporada 2026</ScrambleText>
          </div>
          <h1
            className="text-balance font-medium leading-tight tracking-[-0.03em] md:leading-[0.9] md:tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.75rem, 9vw, 7rem)" }}
          >
            placar das{" "}
            <span className="font-serif italic font-normal gradient-text">
              ligas
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:mt-6 md:text-lg">
            Cada festa pontua para sua atlética, club ou coletivo. Os pontos
            acumulam ao longo do semestre. No fim do ciclo, sai o campeão
            institucional de cada liga.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {LEAGUES.map((league) => {
              const meta = leagueMeta[league];
              const leader = leagueStandings(league)[0];
              return (
                <a
                  key={league}
                  href={`#${league}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-white/25"
                >
                  <div
                    className={`mb-2 inline-block bg-gradient-to-r ${meta.color} bg-clip-text text-xs font-bold uppercase tracking-[0.18em] text-transparent`}
                  >
                    {meta.short}
                  </div>
                  <div className="text-lg font-medium leading-tight">
                    {leader?.organizer.name ?? "—"}
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-white/50">líder atual</span>
                    <span className="text-sm font-semibold tabular-nums text-white/80">
                      {Math.round(leader?.points ?? 0)} pts
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </header>

        {/* Tabelas */}
        {LEAGUES.map((league) => (
          <div key={league} id={league} className="scroll-mt-32">
            <StandingsTable league={league} />
          </div>
        ))}

        {/* Como funciona + CTA */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
                como pontua
              </div>
              <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] md:text-3xl">
                cada festa vira{" "}
                <span className="font-serif italic gradient-text">pontos</span>{" "}
                pra liga
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-white/70 md:text-base">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                  <span>
                    Nota da festa <strong className="text-white">×10</strong> =
                    pontos somados ao organizador (festa 4.7 → 47 pontos).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                  <span>
                    Empate? Vence quem tem{" "}
                    <strong className="text-white">maior média</strong> — qualidade
                    pesa mais que volume.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                  <span>
                    Festa <strong className="text-white">Oficial</strong> não tem
                    multiplicador. Neutralidade do ranking é sagrada.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                  <span>
                    No fim do semestre, líder de cada liga ganha selo permanente
                    de campeão.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
                  pra organizador
                </div>
                <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] md:text-3xl">
                  quer ver{" "}
                  <span className="font-serif italic gradient-text">
                    sua marca
                  </span>{" "}
                  na ponta?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
                  Atléticas, clubs e coletivos parceiros entram na disputa, ganham
                  página oficial e desbloqueiam o marketplace PRO de fornecedores.
                </p>
              </div>

              <Link
                href="/organizadores"
                data-cursor="hover"
                className="group inline-flex items-center justify-between gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium transition hover:border-white/30 hover:bg-white/20"
              >
                <span>quero colocar minha festa</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
