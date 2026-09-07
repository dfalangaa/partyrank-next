"use client";

import { useEffect, useState } from "react";

type Status = "live" | "tonight" | "tomorrow" | "this-week" | "future" | "past";

/**
 * Compute the temporal status of a party relative to "now" — the badge then
 * decides how loud to be. "live" wins on the day-of-event between 22h and 6h
 * (typical party hours); "tonight" while it's the day-of but earlier; etc.
 */
function statusOf(dateISO: string): Status {
  const today = new Date();
  const event = new Date(`${dateISO}T22:00:00-03:00`);
  // strip time to compare days in SP timezone-ish
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfEvent = new Date(event.getFullYear(), event.getMonth(), event.getDate());
  const diffDays = Math.round(
    (startOfEvent.getTime() - startOfToday.getTime()) / 86_400_000,
  );

  if (diffDays === 0) {
    const hour = today.getHours();
    if (hour >= 22 || hour < 6) return "live";
    return "tonight";
  }
  if (diffDays === 1) return "tomorrow";
  if (diffDays > 1 && diffDays <= 7) return "this-week";
  if (diffDays > 7) return "future";
  return "past";
}

type LiveBadgeProps = {
  dateISO: string;
  /** Shows nothing if the event is more than 7 days away (default true). */
  hideFuture?: boolean;
  /** Compact variant — just the dot + tiny label, for tight card overlays. */
  compact?: boolean;
  className?: string;
};

export function LiveBadge({
  dateISO,
  hideFuture = true,
  compact,
  className,
}: LiveBadgeProps) {
  // Re-evaluate every minute so a tonight party flips to LIVE as it crosses 22h
  // without a full page reload.
  const [status, setStatus] = useState<Status>(() => statusOf(dateISO));
  useEffect(() => {
    setStatus(statusOf(dateISO));
    const t = setInterval(() => setStatus(statusOf(dateISO)), 60_000);
    return () => clearInterval(t);
  }, [dateISO]);

  if (status === "past") return null;
  if (status === "future" && hideFuture) return null;
  if (status === "this-week" && hideFuture) return null;

  const config: Record<
    Exclude<Status, "past">,
    { label: string; dot: string; ring: string; text: string; bg: string }
  > = {
    "live": {
      label: "ao vivo",
      dot: "bg-emerald-400",
      ring: "bg-emerald-400/40",
      text: "text-emerald-200",
      bg: "border-emerald-400/40 bg-emerald-500/15",
    },
    "tonight": {
      label: "hoje",
      dot: "bg-pink-400",
      ring: "bg-pink-400/40",
      text: "text-pink-200",
      bg: "border-pink-400/40 bg-pink-500/15",
    },
    "tomorrow": {
      label: "amanhã",
      dot: "bg-amber-300",
      ring: "bg-amber-300/40",
      text: "text-amber-200",
      bg: "border-amber-300/40 bg-amber-400/15",
    },
    "this-week": {
      label: "essa semana",
      dot: "bg-violet-300",
      ring: "bg-violet-300/40",
      text: "text-violet-200",
      bg: "border-violet-300/40 bg-violet-400/15",
    },
    "future": {
      label: "em breve",
      dot: "bg-white/60",
      ring: "bg-white/30",
      text: "text-white/70",
      bg: "border-white/20 bg-white/10",
    },
  };

  const c = config[status as keyof typeof config];
  if (!c) return null;

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${c.bg} ${c.text} ${className || ""}`}
        aria-label={c.label}
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          {status === "live" && (
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${c.ring}`} />
          )}
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${c.dot}`} />
        </span>
        {c.label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${c.bg} ${c.text} ${className || ""}`}
    >
      <span className="relative inline-flex h-2 w-2">
        {status === "live" && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${c.ring}`} />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${c.dot}`} />
      </span>
      {c.label}
    </span>
  );
}
