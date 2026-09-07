"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type Parts = { d: number; h: number; m: number; s: number };

function diff(target: Date): Parts {
  const ms = Math.max(0, target.getTime() - Date.now());
  const totalSec = Math.floor(ms / 1000);
  return {
    d: Math.floor(totalSec / 86400),
    h: Math.floor((totalSec % 86400) / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

export function PartyCountdown({ dateISO }: { dateISO: string }) {
  // Treat date as 22h local SP time (typical festa start) for a sensible countdown.
  const target = new Date(`${dateISO}T22:00:00-03:00`);
  const isPast = target.getTime() <= Date.now();
  const [t, setT] = useState<Parts>(() => diff(target));

  useEffect(() => {
    if (isPast) return;
    const i = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(i);
  }, [target, isPast]);

  if (isPast) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/45">
          <Clock className="h-3.5 w-3.5" /> evento encerrado
        </div>
        <p className="mt-1 text-sm text-white/65">
          já rolou. votação ainda aberta — diz se foi bom.
        </p>
      </div>
    );
  }

  const slots: { label: string; value: number }[] = [
    { label: "dias", value: t.d },
    { label: "horas", value: t.h },
    { label: "min", value: t.m },
    { label: "seg", value: t.s },
  ];

  return (
    <div className="rounded-2xl border border-violet-400/25 bg-violet-500/[0.06] p-5">
      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-violet-200">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-300 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
        </span>
        contagem regressiva
      </div>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] py-2 text-center"
          >
            <div className="text-2xl font-medium tabular-nums tracking-tight md:text-3xl">
              {String(s.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
