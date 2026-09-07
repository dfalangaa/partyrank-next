"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "../scramble-text";

const steps = [
  {
    num: "01",
    title: "descubra",
    italic: "as festas",
    desc: "veja o ranking ao vivo. filtros por faculdade, data, estilo e preço. tudo num lugar.",
  },
  {
    num: "02",
    title: "vote",
    italic: "na sua",
    desc: "o voto dos alunos define o rank. transparente, em tempo real, sem manipulação.",
  },
  {
    num: "03",
    title: "vá",
    italic: "pra festa",
    desc: "compre ingressos direto. entre na lista. sem fila, sem cambista, sem enrolação.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative px-6 py-32 md:px-12 md:py-48"
    >
      <div className="mb-20">
        <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
          [ 004 ] — <ScrambleText triggerOnHover>como funciona</ScrambleText>
        </div>
        <h2
          className="max-w-3xl text-balance font-medium leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
        >
          três passos.
          <br />
          <span className="font-serif italic font-normal gradient-text">sem enrolação</span>.
        </h2>
      </div>

      <div className="space-y-0 divide-y divide-white/10 border-y border-white/10">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="group grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-16"
          >
            {/* Number — huge */}
            <div className="col-span-2 text-6xl font-medium text-white/30 tabular-nums transition-colors group-hover:text-white md:text-8xl">
              {step.num}
            </div>

            {/* Title */}
            <div className="col-span-5">
              <h3 className="text-balance text-5xl font-medium leading-[0.95] tracking-[-0.03em] md:text-7xl">
                {step.title}{" "}
                <span className="font-serif italic font-normal gradient-text">
                  {step.italic}
                </span>
              </h3>
            </div>

            {/* Description */}
            <div className="col-span-5 md:pt-6">
              <p className="max-w-sm text-base leading-relaxed text-white/65 md:text-lg">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
