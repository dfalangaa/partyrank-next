"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { Magnetic } from "../magnetic";
import { ScrambleText } from "../scramble-text";

const plans = [
  {
    name: "free",
    label: "estudante",
    price: "0",
    period: "/sempre",
    desc: "pra quem só quer descobrir as melhores festas.",
    features: [
      "ranking ao vivo",
      "votar em festas",
      "ver agenda da semana",
      "comprar ingressos com taxa padrão",
    ],
    cta: "começar grátis",
    href: "/login",
    accent: "from-white/10 to-white/5",
    border: "border-white/15",
  },
  {
    name: "pro",
    label: "fiel da galera",
    price: "9,90",
    period: "/mês",
    desc: "pro universitário que não perde uma festa.",
    features: [
      "tudo do plano grátis",
      "+5% de cashback em ingressos",
      "acesso antecipado a festas (48h antes)",
      "sem taxa de serviço",
      "vagas garantidas em sold outs",
      "stickers de status no perfil",
    ],
    cta: "virar fiel",
    href: "/login?plan=pro",
    accent: "from-violet-500/30 via-fuchsia-500/20 to-pink-500/30",
    border: "border-violet-400/40",
    popular: true,
  },
  {
    name: "organizer",
    label: "organizador",
    price: "149",
    period: "/mês",
    desc: "pra atléticas e produtoras que rodam festa.",
    features: [
      "dashboard de gerenciamento PRO",
      "kanban + orçamento + equipe",
      "venda de ingressos no app (taxa 4%)",
      "destaque no ranking (3 dias/mês)",
      "lista de fornecedores premium",
      "analytics em tempo real",
    ],
    cta: "saber mais",
    href: "/organizadores",
    accent: "from-amber-500/20 via-orange-500/15 to-amber-500/20",
    border: "border-amber-400/30",
  },
];

export function Pricing() {
  return (
    <section id="planos" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mb-16 text-center">
        <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
          [ 008 ] — <ScrambleText triggerOnHover>planos</ScrambleText>
        </div>
        <h2
          className="mx-auto max-w-3xl text-balance font-medium leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          escolha sua{" "}
          <span className="font-serif italic font-normal gradient-text">vibe</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-white/55 md:text-base">
          comece grátis. desbloqueie cashback, acesso antecipado e dashboard PRO
          quando quiser. cancela quando quiser.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
          >
            {plan.popular && (
              <div className="absolute left-1/2 -top-3 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-500/40">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  mais popular
                </span>
              </div>
            )}

            <div
              className={`relative h-full overflow-hidden rounded-3xl border ${plan.border} bg-gradient-to-br ${plan.accent} p-8 backdrop-blur-md md:p-10`}
            >
              {/* glow on popular */}
              {plan.popular && (
                <div className="pointer-events-none absolute -inset-px rounded-3xl">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 via-transparent to-pink-500/20 blur-xl" />
                </div>
              )}

              <div className="relative">
                <div className="mb-2 flex items-center gap-2">
                  {plan.name === "pro" && <Crown className="h-4 w-4 text-amber-300" />}
                  {plan.name === "free" && <Zap className="h-4 w-4 text-white/60" />}
                  {plan.name === "organizer" && <Sparkles className="h-4 w-4 text-amber-300" />}
                  <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                    {plan.label}
                  </span>
                </div>

                <h3 className="mb-1 text-3xl font-medium tracking-[-0.02em] capitalize md:text-4xl">
                  {plan.name === "pro" ? (
                    <>
                      <span className="font-serif italic font-normal gradient-text">PRO</span>
                    </>
                  ) : (
                    plan.name
                  )}
                </h3>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-xs text-white/50">R$</span>
                  <span className="text-5xl font-medium tracking-[-0.04em] md:text-6xl">
                    {plan.price}
                  </span>
                  <span className="text-sm text-white/50">{plan.period}</span>
                </div>

                <p className="mb-8 text-sm leading-relaxed text-white/65">
                  {plan.desc}
                </p>

                <ul className="mb-10 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                          plan.popular
                            ? "bg-gradient-to-br from-violet-500 to-pink-500"
                            : "bg-white/15"
                        }`}
                      >
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Magnetic strength={0.2}>
                  <Link
                    href={plan.href}
                    data-cursor="hover"
                    className={`group flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/50"
                        : "border border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-white/40">
        sem cartão pra começar · cancela quando quiser · pagamento seguro via stripe
      </p>
    </section>
  );
}
