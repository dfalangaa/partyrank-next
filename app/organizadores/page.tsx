import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Check,
  ClipboardList,
  Crown,
  Headphones,
  Hammer,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import { PlanCTA } from "./PlanCTA";
import { StickyCTA } from "@/components/sticky-cta";

export const metadata = {
  title: "Pra Organizadores — PartyRank",
  description:
    "Coloque sua festa no PartyRank. Página oficial, marketplace de fornecedores e direcionamento estratégico pra atléticas, clubs e coletivos.",
};

const tiers = [
  {
    key: "aberto",
    title: "Aberta",
    price: "indexada",
    priceDesc: "sem custo",
    description:
      "Festa indexada pelo PartyRank automaticamente. Aparece no ranking, recebe votos e nota.",
    color: "from-white/30 to-white/10",
    accent: "border-white/15 bg-white/[0.03]",
    features: [
      { ok: true, label: "Aparece no ranking público" },
      { ok: true, label: "Recebe votos e avaliação" },
      { ok: true, label: "Conta pro Placar das Ligas" },
      { ok: false, label: "Página editada pelo organizador" },
      { ok: false, label: "Vende ingresso pelo PartyRank" },
      { ok: false, label: "Selo de verificação" },
      { ok: false, label: "Marketplace PRO de fornecedores" },
      { ok: false, label: "Direcionamento estratégico" },
    ],
    cta: {
      label: "festa já indexada",
      href: "/festas",
      variant: "ghost" as const,
      intent: "browse" as const,
    },
  },
  {
    key: "verificado",
    title: "Verificada",
    price: "grátis",
    priceDesc: "reivindique a página",
    description:
      "Organizador reivindica e mantém a página oficial. Selo verificado azul. Ideal pra começar.",
    color: "from-cyan-400 to-blue-500",
    accent: "border-cyan-400/30 bg-cyan-500/[0.05]",
    features: [
      { ok: true, label: "Tudo da Aberta" },
      { ok: true, label: "Página editada pelo organizador" },
      { ok: true, label: "Selo de verificação azul" },
      { ok: true, label: "Analytics básico (visitas, votos)" },
      { ok: false, label: "Vende ingresso pelo PartyRank" },
      { ok: false, label: "Marketplace PRO de fornecedores" },
      { ok: false, label: "Direcionamento estratégico" },
    ],
    cta: {
      label: "reivindicar página",
      href: "/login?mode=cadastrar&intent=claim",
      variant: "outline" as const,
      intent: "claim" as const,
    },
  },
  {
    key: "solo",
    title: "Solo",
    price: "R$ 149",
    priceDesc: "por festa · pra organizador autônomo",
    description:
      "Pra quem organiza festa sozinho. Pequena, pontual, sem atlética nem produtora atrás. Vende ingresso e tem o essencial.",
    color: "from-rose-400 to-pink-500",
    accent: "border-rose-400/30 bg-rose-500/[0.06]",
    features: [
      { ok: true, label: "Tudo da Verificada" },
      { ok: true, label: "Vende ingresso pelo PartyRank (6% fee)" },
      { ok: true, label: "Selo Solo identificável" },
      { ok: true, label: "Templates prontos de página" },
      { ok: true, label: "Dashboard simplificado" },
      { ok: true, label: "Suporte por email" },
      { ok: false, label: "Marketplace PRO (só leitura, sem contratação)" },
      { ok: false, label: "Direcionamento estratégico / conta-gerente" },
    ],
    cta: {
      label: "começar como solo",
      href: "/login?mode=cadastrar&intent=solo",
      variant: "outline" as const,
      intent: "solo" as const,
    },
  },
  {
    key: "oficial",
    title: "Oficial",
    price: "R$ 500–2.000",
    priceDesc: "por festa · escala por tamanho",
    description:
      "Pacote completo. Vende ingresso, acessa o marketplace de fornecedores e recebe direcionamento.",
    color: "from-amber-300 via-amber-400 to-orange-500",
    accent: "border-amber-400/40 bg-amber-500/[0.08]",
    features: [
      { ok: true, label: "Tudo do Solo" },
      { ok: true, label: "Vende ingresso pelo PartyRank (5–8% fee)" },
      { ok: true, label: "Selo Oficial dourado" },
      { ok: true, label: "Marketplace PRO de fornecedores" },
      { ok: true, label: "Direcionamento estratégico (playbook + conta-gerente)" },
      { ok: true, label: "Dashboard PRO durante a festa" },
      { ok: true, label: "Recap pós-festa + dado pra próxima edição" },
    ],
    cta: {
      label: "quero colocar minha festa",
      href: "#contato",
      variant: "primary" as const,
      intent: "official" as const,
      featured: true,
    },
  },
];

const fornecedores = [
  {
    icon: Hammer,
    title: "Estrutura",
    desc: "Som, luz, palco, arena, climatização, gerador.",
  },
  {
    icon: ShieldCheck,
    title: "Operação",
    desc: "Segurança, brigada, ambulância, limpeza, banheiro químico.",
  },
  {
    icon: Truck,
    title: "Bar e comida",
    desc: "Bartender, food trucks, distribuidor de bebida, copo retornável.",
  },
  {
    icon: Headphones,
    title: "Talento e equipe",
    desc: "DJs, hosts, fotógrafo, vídeo-maker, recepção, modelo de marca.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "Social media, criação de arte, gestor de tráfego pago.",
  },
];

const direcionamento = [
  {
    n: "01",
    title: "Briefing",
    desc: "Você preenche: público esperado, orçamento, tema, data, formato. 5 minutos.",
  },
  {
    n: "02",
    title: "Playbook",
    desc: "Receba o playbook PartyRank com checklist, cronograma e benchmarks de festa similar.",
  },
  {
    n: "03",
    title: "Sugestão de fornecedores",
    desc: "O sistema cruza seu briefing com o marketplace e devolve uma equipe possível pré-montada.",
  },
  {
    n: "04",
    title: "Conta-gerente light",
    desc: "Reunião de kickoff + canal direto até a festa. Você não fica sozinho.",
  },
  {
    n: "05",
    title: "Pós-festa",
    desc: "Relatório com dado real (vendas, NPS, comparação com benchmark) + plano pra próxima edição.",
  },
];

const beneficios = [
  {
    icon: Crown,
    title: "Disputa o Placar das Ligas",
    desc: "Cada festa pontua pra sua marca. Líder de liga ganha selo permanente de campeão.",
  },
  {
    icon: Building2,
    title: "Concorre ao Prêmio Anual",
    desc: "Universidade do Ano, Club do Ano, Coletivo do Ano e mais 13 categorias.",
  },
  {
    icon: Users,
    title: "Distribuição pro público certo",
    desc: "Sua festa aparece pra galera que abre o PartyRank semanalmente em busca da próxima noite.",
  },
  {
    icon: Sparkles,
    title: "Identidade própria, não template",
    desc: "Sua página oficial respeita sua marca — cores, manifesto, histórico. Sem layout genérico.",
  },
];

export default function OrganizadoresPage() {
  return (
    <div className="relative px-4 pb-32 pt-4 md:px-12 md:pb-48 md:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <header className="mb-10 md:mb-24">
          <div className="mb-2 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 md:mb-4 md:flex">
            <ClipboardList className="h-3.5 w-3.5" />
            <ScrambleText triggerOnHover>pra organizadores</ScrambleText>
          </div>
          <h1
            className="text-balance font-medium leading-tight tracking-[-0.03em] md:leading-[0.9] md:tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.75rem, 9vw, 7.5rem)" }}
          >
            mais que um{" "}
            <span className="font-serif italic font-normal gradient-text">
              ranking
            </span>
            <br className="hidden md:block" />
            <span className="md:inline"> um parceiro de festa</span>
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 md:mt-6 md:text-xl">
            Atléticas, clubs e coletivos Oficiais ganham marketplace de
            fornecedores curados, direcionamento estratégico do time PartyRank e
            a página que vende.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#contato"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              quero colocar minha festa
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#planos"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm transition hover:border-white/30 hover:bg-white/10"
            >
              ver planos
            </Link>
          </div>
        </header>

        {/* As 3 camadas */}
        <section id="planos" className="mb-24 scroll-mt-32">
          <div className="mb-12">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              as 3 camadas
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
            >
              do{" "}
              <span className="font-serif italic gradient-text">grátis</span>{" "}
              ao parceiro completo
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
              Toda festa de SP aparece no PartyRank. Reivindicar é grátis. Ser
              parceiro Oficial desbloqueia o pacote completo de venda + marketplace + direcionamento.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className={`relative flex flex-col overflow-hidden rounded-3xl border p-7 transition ${tier.accent} ${
                  tier.cta.featured
                    ? "shadow-2xl shadow-amber-500/10"
                    : ""
                }`}
              >
                {tier.cta.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-amber-500/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
                    recomendado
                  </div>
                )}
                <div
                  className={`mb-2 inline-block bg-gradient-to-r ${tier.color} bg-clip-text text-xs font-bold uppercase tracking-[0.2em] text-transparent`}
                >
                  {tier.title}
                </div>
                <div className="mb-1 text-4xl font-medium tracking-[-0.02em]">
                  {tier.price}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/50">
                  {tier.priceDesc}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  {tier.description}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/5 pt-6 text-sm">
                  {tier.features.map((f) => (
                    <li
                      key={f.label}
                      className={`flex items-start gap-3 ${f.ok ? "text-white/85" : "text-white/30"}`}
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${f.ok ? "text-emerald-400" : "text-white/15"}`}
                      />
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <PlanCTA
                    intent={tier.cta.intent}
                    href={tier.cta.href}
                    label={tier.cta.label}
                    variant={tier.cta.variant}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Marketplace */}
        <section className="mb-24">
          <div className="mb-12">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              marketplace pro
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
            >
              fornecedores{" "}
              <span className="font-serif italic gradient-text">curados</span>
              <br />
              num só lugar
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
              Som, luz, segurança, equipe humana, DJs — todos os fornecedores
              passam por curadoria PartyRank. Você compara, escolhe e contrata
              direto na plataforma. Sem perder semana mandando WhatsApp.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {fornecedores.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.05]"
              >
                <Icon className="mb-3 h-5 w-5 text-violet-300" />
                <h4 className="text-sm font-semibold">{title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Direcionamento */}
        <section className="mb-24 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <div className="mb-12">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              direcionamento estratégico
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              um time pra te{" "}
              <span className="font-serif italic gradient-text">
                empurrar
              </span>{" "}
              em cada etapa
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
              Diferente de Sympla, não somos só canal de venda. Atlética/club
              parceiro entra num fluxo guiado — porque festa boa não acontece
              sozinha.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {direcionamento.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="mb-3 font-serif italic gradient-text text-3xl leading-none">
                  {step.n}
                </div>
                <h4 className="text-sm font-semibold">{step.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefícios */}
        <section className="mb-24">
          <div className="mb-12">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
              o que vem junto
            </div>
            <h2
              className="text-balance font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              entrar pro PartyRank é entrar{" "}
              <span className="font-serif italic gradient-text">
                no jogo
              </span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {beneficios.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-medium">{title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA contato */}
        <section
          id="contato"
          className="scroll-mt-32 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-pink-500/10 to-orange-500/15 p-8 md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">
                vamos conversar
              </div>
              <h3
                className="font-medium leading-[0.95] tracking-[-0.03em]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                bota tua festa{" "}
                <span className="font-serif italic gradient-text">
                  no mapa
                </span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                Conta sua data, público esperado e tipo de festa. Em até 48h o
                time PartyRank devolve briefing, sugestão de fornecedores e
                proposta de listing — sem compromisso.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="mailto:hello@partyrank.com.br?subject=Quero%20colocar%20minha%20festa%20no%20PartyRank"
                data-cursor="hover"
                className="group inline-flex w-full items-center justify-between gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 md:w-auto"
              >
                <span>quero colocar minha festa</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/ligas"
                data-cursor="hover"
                className="group inline-flex w-full items-center justify-between gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm transition hover:border-white/30 hover:bg-white/10 md:w-auto"
              >
                <span>ver placar das ligas</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile-only sticky CTA — pushes the "claim atlética" intent always
          one tap away while the user scrolls the long sales page. */}
      <StickyCTA>
        <Link
          href="/login?mode=cadastrar&intent=claim"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 active:scale-[0.98]"
        >
          <Crown className="h-4 w-4" />
          colocar minha atlética no PartyRank
        </Link>
      </StickyCTA>
    </div>
  );
}
