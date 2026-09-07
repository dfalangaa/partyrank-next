import Link from "next/link";
import {
  Award,
  ArrowUpRight,
  Calendar,
  Crown,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";

export const metadata = {
  title: "Prêmio PartyRank — As melhores festas do ano",
  description:
    "O prêmio anual da noite paulistana. Categorias por liga, cobertura editorial e selo permanente para os campeões.",
};

const categoriasPorLiga = [
  {
    name: "Universidade do Ano",
    description:
      "Atlética/Liga campeã da Liga Universitária. Selo permanente na página + cobertura editorial.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Club do Ano",
    description: "Casa noturna campeã da Liga dos Clubs.",
    color: "from-pink-500 to-orange-500",
  },
  {
    name: "Coletivo do Ano",
    description: "Produtora/coletivo campeão da Liga dos Coletivos.",
    color: "from-emerald-400 to-teal-500",
  },
];

const categoriasGerais = [
  { name: "Festa do Ano", description: "Maior nota cruzando todas as ligas." },
  { name: "Melhor Line-up", description: "A festa que entregou o line-up mais forte." },
  { name: "Revelação do Ano", description: "Organizador novo com performance de elite." },
  { name: "Melhor Custo-Benefício", description: "Maior nota com ticket mais acessível." },
  { name: "Melhor Estrutura", description: "Som, palco e produção em outro nível." },
  { name: "Festa do Povo", description: "Pura votação popular — sem júri técnico." },
];

const categoriasFormato = [
  { name: "Melhor Calourada / Festa Universitária", color: "from-violet-500 to-fuchsia-500" },
  { name: "Melhor Rave / Open-air", color: "from-emerald-400 to-teal-500" },
  { name: "Melhor Rooftop / Pool", color: "from-pink-500 to-orange-500" },
  { name: "Melhor Festa Avulsa", color: "from-cyan-400 to-blue-500" },
];

const calendario = [
  { mes: "novembro", titulo: "indicações abertas", desc: "Júri técnico e usuários verificados começam a indicar candidatos." },
  { mes: "dezembro", titulo: "voto popular + julgamento", desc: "Voto popular (50%) + júri técnico (50%) decide os finalistas." },
  { mes: "janeiro", titulo: "cerimônia de premiação", desc: "Evento ao vivo com cobertura — ritual de início de ano letivo." },
];

export default function PremiosPage() {
  return (
    <div className="relative px-4 pb-32 pt-4 md:px-12 md:pb-48 md:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <header className="mb-10 md:mb-24">
          <div className="mb-2 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 md:mb-4 md:flex">
            <Award className="h-3.5 w-3.5" />
            <ScrambleText triggerOnHover>prêmio partyrank 2026</ScrambleText>
          </div>
          <h1
            className="text-balance font-medium leading-tight tracking-[-0.03em] md:leading-[0.9] md:tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.75rem, 9vw, 7.5rem)" }}
          >
            o oscar da{" "}
            <span className="font-serif italic font-normal gradient-text">
              noite SP
            </span>
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 md:mt-6 md:text-xl">
            Todo ano, o PartyRank consagra as melhores festas, organizadores e
            line-ups da cidade. Voto popular + júri técnico, selo permanente.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Crown className="mb-2 h-5 w-5 text-amber-300" />
              <div className="text-sm text-white/50">prêmio principal</div>
              <div className="text-xl font-medium">Festa do Ano</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Trophy className="mb-2 h-5 w-5 text-violet-300" />
              <div className="text-sm text-white/50">categorias</div>
              <div className="text-xl font-medium">+13 troféus</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Calendar className="mb-2 h-5 w-5 text-emerald-300" />
              <div className="text-sm text-white/50">próxima edição</div>
              <div className="text-xl font-medium">jan/2027</div>
            </div>
          </div>
        </header>

        {/* Por liga */}
        <section className="mb-24">
          <div className="mb-10">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              prêmios por liga
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
            >
              os campeões de cada{" "}
              <span className="font-serif italic gradient-text">liga</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
              Universidade × universidade, club × club, coletivo × coletivo.
              Cada liga tem seu próprio Brasileirão e sua própria Champions —
              esse é o título que fica na história.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {categoriasPorLiga.map((cat, i) => (
              <div
                key={cat.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-white/25"
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${cat.color} opacity-25 blur-3xl transition group-hover:opacity-40`}
                />
                <div className="relative">
                  <Trophy
                    className={`mb-4 h-7 w-7 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}
                    fill="currentColor"
                  />
                  <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em]">
                    {cat.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cruzando ligas */}
        <section className="mb-24">
          <div className="mb-10">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              prêmios gerais (cruzando ligas)
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3.75rem)" }}
            >
              as honrarias{" "}
              <span className="font-serif italic gradient-text">absolutas</span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {categoriasGerais.map((cat) => (
              <div
                key={cat.name}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                <Award className="mb-2 h-4 w-4 text-amber-300" />
                <h4 className="text-base font-medium">{cat.name}</h4>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Por formato */}
        <section className="mb-24">
          <div className="mb-10">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              por nicho de formato
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3.75rem)" }}
            >
              cada{" "}
              <span className="font-serif italic gradient-text">formato</span>{" "}
              tem seu rei
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {categoriasFormato.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div
                  className={`h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}
                >
                  <Trophy className="h-5 w-5 text-white drop-shadow" />
                </div>
                <div className="text-base font-medium">{cat.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Como vence */}
        <section className="mb-24 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <div className="mb-10">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              como funciona
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              voto popular{" "}
              <span className="font-serif italic gradient-text">+</span> júri
              técnico
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
              Dividimos o peso pra reduzir manipulação e legitimar o resultado.
              Júri = curadoria PartyRank + jornalistas + DJs reconhecidos +
              ex-vencedores.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Megaphone,
                tit: "voto popular (50%)",
                desc: "Toda conta verificada vota uma vez por categoria. Captcha + 1 voto por conta. Quando o check-in real chegar, só quem foi à festa vota nela.",
              },
              {
                icon: ShieldCheck,
                tit: "júri técnico (50%)",
                desc: "Comitê com PartyRank, jornalistas do meio, DJs reconhecidos e organizadores premiados em anos anteriores. Critérios públicos.",
              },
              {
                icon: Sparkles,
                tit: "selo permanente",
                desc: "Vencedor recebe troféu físico + grana do patrocinador + 1 ano de destaque + recap profissional + selo eterno na página.",
              },
            ].map(({ icon: Icon, tit, desc }) => (
              <div
                key={tit}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Icon className="mb-3 h-5 w-5 text-violet-300" />
                <h3 className="text-lg font-medium">{tit}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Calendário */}
        <section className="mb-24">
          <div className="mb-10">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              calendário 2026
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              três meses,{" "}
              <span className="font-serif italic gradient-text">
                um ritual
              </span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {calendario.map((c, i) => (
              <div
                key={c.titulo}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
              >
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">
                  fase {i + 1}
                </div>
                <div className="mb-1 text-3xl font-serif italic gradient-text leading-none">
                  {c.mes}
                </div>
                <h3 className="mt-3 text-lg font-medium">{c.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-orange-500/10 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">
                quer concorrer?
              </div>
              <h3
                className="font-medium leading-[0.95] tracking-[-0.03em]"
                style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
              >
                coloca sua festa no{" "}
                <span className="font-serif italic gradient-text">
                  PartyRank
                </span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                Atléticas, clubs e coletivos parceiros entram automaticamente na
                disputa. Indica também: quem manda hoje?
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/organizadores"
                data-cursor="hover"
                className="group inline-flex w-full items-center justify-between gap-2 rounded-full border border-white/20 bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 md:w-auto"
              >
                <span>quero participar</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/ligas"
                data-cursor="hover"
                className="group inline-flex w-full items-center justify-between gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm transition hover:border-white/30 hover:bg-white/10 md:w-auto"
              >
                <span>ver placar das ligas</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
