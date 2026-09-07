"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useEffect, useState } from "react";
import { parties, organizers } from "@/lib/mock-data";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startT = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - startT) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export function Stats() {
  const computed = useMemo(() => {
    const universities = new Set(
      parties
        .filter((p) => p.category === "universitaria")
        .map((p) => p.university),
    );
    const venues = new Set(parties.map((p) => p.location));
    const totalVotes = parties.reduce((a, p) => a + p.votes, 0);
    return {
      partiesCount: parties.length,
      venuesCount: venues.size,
      universitiesCount: universities.size,
      organizersCount: organizers.length,
      totalVotes,
    };
  }, []);

  const stats = [
    { label: "festas ranqueadas", value: computed.partiesCount, suffix: "" },
    { label: "casas e clubs", value: computed.venuesCount, suffix: "" },
    { label: "universidades", value: computed.universitiesCount, suffix: "" },
    {
      label: "votos da galera",
      value: Math.round(computed.totalVotes / 1000),
      suffix: "k",
    },
  ];

  return (
    <section className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mb-16 text-xs uppercase tracking-[0.2em] text-white/50">
        [ 005 ] — números
      </div>

      <div className="grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="p-8 md:p-12"
          >
            <div className="text-6xl font-medium tracking-[-0.04em] tabular-nums md:text-8xl">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/35">
        números em tempo real do catálogo · atualizados toda quinta
      </p>
    </section>
  );
}
