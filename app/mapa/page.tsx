"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  ExternalLink,
  Search,
  Compass,
  Share2,
} from "lucide-react";
import { parties, categoryMeta, type Category, type Party } from "@/lib/mock-data";
import { ScrambleText } from "@/components/scramble-text";
import { sharePartyLink } from "@/components/festa/share-button";

type Zone = "centro" | "oeste" | "norte" | "sul" | "leste";
type ZoneOrAll = "todas" | Zone;

const ZONE_META: Record<
  Zone,
  { label: string; pos: { left: string; top: string }; angle: number }
> = {
  centro: { label: "centro", pos: { left: "50%", top: "50%" }, angle: 0 },
  oeste: { label: "oeste / pinheiros", pos: { left: "26%", top: "44%" }, angle: -180 },
  norte: { label: "norte", pos: { left: "52%", top: "20%" }, angle: -90 },
  sul: { label: "sul / interlagos", pos: { left: "54%", top: "78%" }, angle: 90 },
  leste: { label: "leste", pos: { left: "78%", top: "52%" }, angle: 0 },
};

// Map known SP neighborhoods/streets in the mock data to zones.
function zoneOf(party: Party): Zone {
  const addr = party.address.toLowerCase();
  const loc = party.location.toLowerCase();
  const text = `${addr} ${loc}`;
  if (/vila madalena|pinheiros|aspicuelta|artur de azev|francisco matarazzo|cardoso/.test(text)) return "oeste";
  if (/barra funda|olga|matarazzo,\s*694|cine joia|carlos gomes/.test(text)) return "centro";
  if (/interlagos|aclimação|jabaquara|santo amaro|americanópolis/.test(text)) return "sul";
  if (/villa country|belchior|villa mix|juscelino kubitschek|hípico|pedro álvares|paineiras|arnaldo/.test(text)) return "centro";
  if (/lapa|freguesia|santana|tucuruvi/.test(text)) return "norte";
  if (/tatuapé|mooca|brás|penha/.test(text)) return "leste";
  // default: centro
  return "centro";
}

function pinPositionFor(party: Party, index: number) {
  const z = ZONE_META[zoneOf(party)];
  // jitter around the zone anchor — deterministic by index so it doesn't shift
  // between renders. Up to ±10% offset.
  const ix = (index * 37) % 100;
  const iy = (index * 53) % 100;
  const dx = (ix / 100 - 0.5) * 0.18; // ±9%
  const dy = (iy / 100 - 0.5) * 0.16;
  return {
    left: `calc(${z.pos.left} + ${(dx * 100).toFixed(1)}%)`,
    top: `calc(${z.pos.top} + ${(dy * 100).toFixed(1)}%)`,
  };
}

function googleMapsHref(p: Party) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${p.location}, ${p.address}, São Paulo`,
  )}`;
}

export default function MapaPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [category, setCategory] = useState<"todas" | Category>("todas");
  const [zone, setZone] = useState<ZoneOrAll>("todas");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = parties.slice();
    if (category !== "todas") list = list.filter((p) => p.category === category);
    if (zone !== "todas") list = list.filter((p) => zoneOf(p) === zone);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.university.toLowerCase().includes(q),
      );
    }
    return list;
  }, [category, zone, query]);

  const selected = filtered.find((p) => p.id === selectedId) || filtered[0] || null;

  const handleShareLocation = async (p: Party) => {
    await sharePartyLink({
      title: p.name,
      text: `${p.name} — ${p.location}, ${p.address}`,
      path: googleMapsHref(p),
    });
  };

  return (
    <div className="relative min-h-screen px-4 pb-20 pt-4 md:px-12 md:pt-40">
      <Link
        href="/"
        className="mb-8 hidden items-center gap-2 text-sm text-white/60 hover:text-white md:inline-flex"
      >
        <ArrowLeft className="h-4 w-4" /> voltar
      </Link>

      <div className="mb-5 md:mb-10">
        <div className="mb-2 hidden text-xs uppercase tracking-[0.2em] text-white/50 md:mb-4 md:block">
          [ mapa ] — <ScrambleText triggerOnHover>são paulo</ScrambleText>
        </div>
        <h1
          className="mb-1 text-balance font-medium leading-tight tracking-[-0.03em] md:mb-0 md:leading-[0.9] md:tracking-[-0.04em]"
          style={{ fontSize: "clamp(1.75rem, 7vw, 5.5rem)" }}
        >
          toda a cidade{" "}
          <span className="font-serif italic font-normal gradient-text">
            numa tela
          </span>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/55 md:mt-4 md:text-base">
          pin por região, busca por bairro e abrir no Google Maps direto.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(["todas", "universitaria", "club", "evento", "rave"] as const).map(
            (c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  category === c
                    ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                    : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white"
                }`}
              >
                {c === "todas"
                  ? "todas categorias"
                  : c === "universitaria"
                    ? "universitárias"
                    : c === "club"
                      ? "clubs"
                      : c === "evento"
                        ? "eventos"
                        : "raves"}
              </button>
            ),
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {(["todas", "centro", "oeste", "norte", "sul", "leste"] as const).map(
            (z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                  zone === z
                    ? "border-pink-400/40 bg-pink-500/15 text-pink-200"
                    : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white"
                }`}
              >
                {z === "todas" ? "toda SP" : z}
              </button>
            ),
          )}
        </div>

        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="bairro, club, faculdade..."
            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-xs placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Map area */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-background to-cyan-950/30">
          {/* grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* zone labels */}
          {Object.entries(ZONE_META).map(([key, z]) => (
            <span
              key={key}
              style={{ left: z.pos.left, top: z.pos.top }}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-[10px] uppercase tracking-[0.22em] text-white/15"
            >
              {z.label}
            </span>
          ))}

          {/* "SP" center watermark */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[180px] italic text-white/[0.03] leading-none">
            sp
          </span>

          {filtered.slice(0, 24).map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              style={pinPositionFor(p, i)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4,
                delay: Math.min(i * 0.03, 0.6),
                type: "spring",
                stiffness: 200,
              }}
              className="group absolute -translate-x-1/2 -translate-y-full"
              title={`${p.name} · ${p.location}`}
            >
              <div className="relative">
                <span
                  className={`absolute left-1/2 top-full h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full ${
                    selected?.id === p.id
                      ? "bg-pink-500/40"
                      : "bg-violet-500/20"
                  }`}
                />
                <div
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all ${
                    selected?.id === p.id
                      ? "scale-125 bg-gradient-to-br from-pink-500 to-orange-500 shadow-pink-500/50"
                      : "bg-gradient-to-br from-violet-500 to-pink-500 shadow-violet-500/30 group-hover:scale-110"
                  }`}
                >
                  <MapPin className="h-4 w-4 text-white" fill="white" />
                </div>
              </div>
            </motion.button>
          ))}

          {/* count overlay */}
          <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70 backdrop-blur">
            {filtered.length} pin{filtered.length === 1 ? "" : "s"} no mapa
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-3">
          {/* Selected card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            {selected ? (
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
                  <span
                    className={`inline-block rounded-full bg-gradient-to-r ${categoryMeta[selected.category].color} px-2 py-0.5 text-[9px] font-bold text-white`}
                  >
                    {categoryMeta[selected.category].label}
                  </span>
                  <span>{selected.university}</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl italic font-normal leading-tight">
                  {selected.name}
                </h2>
                <p className="mt-3 text-sm text-white/65">
                  {selected.location} · {selected.address}
                </p>

                <div className="mt-5 space-y-1.5 text-sm">
                  <Row
                    k="data"
                    v={new Date(selected.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                    })}
                  />
                  <Row k="público" v={selected.attendees.toString()} />
                  <Row k="região" v={ZONE_META[zoneOf(selected)].label} />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <a
                    href={googleMapsHref(selected)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-2.5 text-xs font-medium text-emerald-200 transition hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    <Compass className="h-3.5 w-3.5" /> rota
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleShareLocation(selected)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-medium text-white/80 transition hover:border-white/30 hover:bg-white/10"
                  >
                    <Share2 className="h-3.5 w-3.5" /> local
                  </button>
                </div>

                <Link
                  href={`/festa/${selected.slug}`}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-5 py-2.5 text-sm font-medium shadow-lg shadow-violet-500/30"
                >
                  ver detalhes →
                </Link>
              </div>
            ) : (
              <div className="text-white/50">
                <h3 className="mb-2 font-serif text-3xl italic text-white">
                  nenhum pin
                </h3>
                <p className="text-sm">
                  ajuste os filtros pra encontrar festas na região.
                </p>
              </div>
            )}
          </div>

          {/* List of remaining filtered parties */}
          {filtered.length > 1 && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 px-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                outras nessa busca
              </div>
              <div className="max-h-80 space-y-1 overflow-y-auto pr-1">
                {filtered
                  .filter((p) => p.id !== selected?.id)
                  .slice(0, 12)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-transparent px-3 py-2 text-left transition hover:border-white/10 hover:bg-white/[0.04]"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {p.name}
                        </div>
                        <div className="truncate text-xs text-white/45">
                          {p.location}
                        </div>
                      </div>
                      <span className="flex-shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/55">
                        {ZONE_META[zoneOf(p)].label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{k}</span>
      <span className="font-medium text-white">{v}</span>
    </div>
  );
}
