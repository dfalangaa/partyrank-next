import { Disc3, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Party } from "@/lib/mock-data";

/**
 * Deterministic mock line-up generator — uses the party slug as a seed so the
 * same party always shows the same artists between renders. When the real
 * backend lands, this gets replaced with a query to the festa's djs table.
 */
function pickLineup(party: Party): { name: string; role: string; isHeadliner: boolean }[] {
  const pool = [
    { name: "Vintage Culture", style: "house" },
    { name: "Cat Dealers", style: "house" },
    { name: "Alok", style: "festival" },
    { name: "Bhaskar", style: "techno" },
    { name: "Bruno Be", style: "house" },
    { name: "DJ Marky", style: "drum & bass" },
    { name: "Liu", style: "house" },
    { name: "Victor Lou", style: "festival" },
    { name: "Volkoder", style: "house" },
    { name: "Zerb", style: "afro house" },
    { name: "Andre Cheghouni", style: "techno" },
    { name: "Renato Ratier", style: "house" },
  ];
  // simple hash from slug
  let h = 0;
  for (let i = 0; i < party.slug.length; i++) h = (h * 31 + party.slug.charCodeAt(i)) >>> 0;
  const count = (h % 3) + 3; // 3-5 artists
  const picked: typeof pool = [];
  for (let i = 0; i < count; i++) {
    const idx = (h + i * 17) % pool.length;
    if (!picked.find((p) => p.name === pool[idx].name)) picked.push(pool[idx]);
  }
  return picked.map((p, i) => ({
    name: p.name,
    role: p.style,
    isHeadliner: i === 0,
  }));
}

export function PartyLineup({ party }: { party: Party }) {
  const lineup = pickLineup(party);
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <div className="mb-5 flex items-center gap-2">
        <Disc3 className="h-5 w-5 text-violet-400" />
        <h2 className="text-xl font-medium md:text-2xl">line-up</h2>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {lineup.map((dj) => (
          <div
            key={dj.name}
            className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${
              dj.isHeadliner
                ? "border-amber-400/30 bg-amber-500/[0.06]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 truncate text-base font-medium">
                {dj.isHeadliner && (
                  <Star className="h-3.5 w-3.5 flex-shrink-0 fill-amber-300 text-amber-300" />
                )}
                <span className="truncate">{dj.name}</span>
              </div>
              <div className="mt-0.5 text-xs text-white/55">{dj.role}</div>
            </div>
            {dj.isHeadliner && (
              <Badge variant="primary" className="flex-shrink-0">
                headliner
              </Badge>
            )}
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-white/40">
        line-up sujeito a alteração · ordem de apresentação revelada na semana do evento
      </p>
    </div>
  );
}
