"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Star, Heart, X, SlidersHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { parties, categoryMeta, type Category } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useFavorites } from "@/lib/use-favorites";
import { FavoriteButton } from "@/components/festa/favorite-button";
import { ShareButton } from "@/components/festa/share-button";
import { LiveBadge } from "@/components/festa/live-badge";

const unis = Array.from(new Set(parties.map((p) => p.university)));
type CatFilter = "todas" | Category;
type PriceTier = "todos" | "barato" | "medio" | "premium";

const categoryFilters: { key: CatFilter; label: string }[] = [
  { key: "todas", label: "todas" },
  { key: "universitaria", label: "universitárias" },
  { key: "club", label: "clubs" },
  { key: "evento", label: "eventos" },
  { key: "rave", label: "raves" },
];

const priceFilters: { key: PriceTier; label: string }[] = [
  { key: "todos", label: "todos os preços" },
  { key: "barato", label: "até R$ 50" },
  { key: "medio", label: "R$ 50–100" },
  { key: "premium", label: "+R$ 100" },
];

function priceMatches(price: number, tier: PriceTier) {
  // mock data stores price in centavos × 100 (e.g. 8000 = R$ 80)
  const reais = price / 100;
  if (tier === "barato") return reais <= 50;
  if (tier === "medio") return reais > 50 && reais <= 100;
  if (tier === "premium") return reais > 100;
  return true;
}

function FestasPageInner() {
  const [query, setQuery] = useState("");
  const [uni, setUni] = useState<string | null>(null);
  const [category, setCategory] = useState<CatFilter>("todas");
  const [priceTier, setPriceTier] = useState<PriceTier>("todos");
  const searchParams = useSearchParams();
  const favIntent = searchParams?.get("fav") === "1";
  const [onlyFavorites, setOnlyFavorites] = useState(favIntent);
  // sync URL changes after mount (navbar deep-link)
  useEffect(() => {
    if (favIntent) setOnlyFavorites(true);
  }, [favIntent]);
  const { favorites, count: favoritesCount } = useFavorites();
  const [sort, setSort] = useState<"popular" | "date" | "price">("popular");
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // count of active advanced filters (everything except category + query, which
  // sit always-visible at the top of the mobile shell) to show a badge on the
  // "filtrar" button
  const advancedActiveCount =
    (uni ? 1 : 0) +
    (priceTier !== "todos" ? 1 : 0) +
    (onlyFavorites ? 1 : 0) +
    (sort !== "popular" ? 1 : 0);

  const hasActiveFilters =
    category !== "todas" ||
    !!uni ||
    priceTier !== "todos" ||
    onlyFavorites ||
    !!query;

  const clearFilters = () => {
    setQuery("");
    setUni(null);
    setCategory("todas");
    setPriceTier("todos");
    setOnlyFavorites(false);
  };

  const filtered = useMemo(() => {
    let list = [...parties];
    if (category !== "todas") list = list.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.university.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    if (uni) list = list.filter((p) => p.university === uni);
    if (priceTier !== "todos") list = list.filter((p) => priceMatches(p.price, priceTier));
    if (onlyFavorites) list = list.filter((p) => favorites[p.id]);
    if (sort === "popular") list.sort((a, b) => b.votes - a.votes);
    if (sort === "date") list.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "price") list.sort((a, b) => a.price - b.price);
    return list;
  }, [query, uni, sort, category, priceTier, onlyFavorites, favorites]);

  return (
    <div className="relative px-4 pb-20 pt-4 md:px-10 md:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* Title — small in mobile, hero in desktop */}
        <div className="mb-5 md:mb-10">
          <h1
            className="mb-1 text-balance font-medium leading-tight tracking-[-0.03em] md:mb-3 md:tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.75rem, 7vw, 5rem)" }}
          >
            todas as <span className="font-serif italic font-normal gradient-text">festas</span>
          </h1>
          <p className="text-sm text-white/55 md:text-base">
            ranking completo de são paulo: universitárias, clubs, raves e eventos.
          </p>
        </div>

        {/* ============ MOBILE FILTER STACK ============ */}
        <div className="md:hidden">
          {/* Search */}
          <div className="relative mb-3 group">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45 transition-colors group-focus-within:text-violet-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="buscar festa, faculdade, club..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-3 pl-11 pr-10 text-sm placeholder:text-white/40 transition-all duration-200 focus:border-violet-400/50 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-violet-500/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="limpar busca"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 active:bg-white/20"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Category chips — horizontal scroll, no wrap */}
          <div className="-mx-4 mb-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              {categoryFilters.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
                    category === c.key
                      ? "border-violet-400/50 bg-violet-500/20 text-violet-100 shadow-md shadow-violet-500/20"
                      : "border-white/10 bg-white/[0.04] text-white/65 active:bg-white/10"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result count + filter button */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-xs text-white/55">
              {filtered.length}{" "}
              {filtered.length === 1 ? "festa" : "festas"}
            </span>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/65 active:bg-white/10"
                >
                  <X className="h-3 w-3" /> limpar
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilterSheetOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-white/85 active:bg-white/10"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                filtrar
                {advancedActiveCount > 0 && (
                  <span className="rounded-full bg-violet-500 px-1.5 text-[10px] font-bold leading-none text-white">
                    {advancedActiveCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ============ DESKTOP FILTERS (original flat layout) ============ */}
        <div className="mb-8 hidden space-y-4 md:block">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  category === c.key
                    ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="buscar festa, faculdade, club ou local..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {priceFilters.map((p) => (
              <Pill key={p.key} active={priceTier === p.key} onClick={() => setPriceTier(p.key)}>
                {p.label}
              </Pill>
            ))}
            <span className="mx-1 h-4 w-px bg-white/10" aria-hidden />
            <button
              type="button"
              onClick={() => setOnlyFavorites((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                onlyFavorites
                  ? "border-pink-400/40 bg-pink-500/15 text-pink-200"
                  : favoritesCount > 0
                    ? "border-white/15 bg-white/[0.04] text-white/75 hover:border-white/30 hover:text-white"
                    : "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/30"
              }`}
              disabled={favoritesCount === 0}
            >
              <Heart className={`h-3 w-3 ${onlyFavorites ? "fill-pink-300" : ""}`} />
              minhas favoritas
              {favoritesCount > 0 && (
                <span className="rounded-full bg-white/10 px-1.5 text-[10px] tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <Pill active={uni === null} onClick={() => setUni(null)}>
                todos os locais
              </Pill>
              {unis.slice(0, 8).map((u) => (
                <Pill key={u} active={uni === u} onClick={() => setUni(u)}>
                  {u}
                </Pill>
              ))}
            </div>
            <div className="flex gap-2">
              {[
                { key: "popular", label: "mais votadas" },
                { key: "date", label: "por data" },
                { key: "price", label: "menor preço" },
              ].map((s) => (
                <Pill key={s.key} active={sort === s.key} onClick={() => setSort(s.key as any)}>
                  {s.label}
                </Pill>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop only — mobile shows its own count next to "filtrar" */}
        <div className="mb-4 hidden items-center justify-between text-sm text-white/50 md:flex">
          <span>
            {filtered.length}{" "}
            {filtered.length === 1 ? "festa encontrada" : "festas encontradas"}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:border-white/25 hover:text-white"
            >
              <X className="h-3 w-3" /> limpar filtros
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <p className="text-white/60">
              {onlyFavorites && favoritesCount === 0
                ? "você ainda não favoritou nenhuma festa."
                : "nenhum resultado pra esses filtros."}
            </p>
            {hasActiveFilters && !(onlyFavorites && favoritesCount === 0) && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/30 hover:shadow-xl"
              >
                <X className="h-3 w-3" /> limpar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(i * 0.04, 0.4),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/festa/${p.slug}`}
                  data-cursor="hover"
                  className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-violet-500/10 active:scale-[0.98] active:transition-transform active:duration-100"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <LiveBadge dateISO={p.date} compact />
                        <span className={`rounded-full bg-gradient-to-r ${categoryMeta[p.category].color} px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg`}>
                          {categoryMeta[p.category].label}
                        </span>
                        <Badge variant="primary">{p.university}</Badge>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs backdrop-blur-md">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {p.rating}
                      </div>
                    </div>
                    {/* quick actions on hover (mobile: always visible) */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                      <FavoriteButton partyId={p.id} partyName={p.name} compact />
                      <ShareButton
                        title={p.name}
                        text={`${p.name} — ${p.university}`}
                        path={`/festa/${p.slug}`}
                        compact
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="mb-2 text-xl font-medium tracking-tight text-white">
                        {p.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(p.date).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{p.location}</span>
                          </div>
                        </div>
                        <div className="text-right font-semibold text-white">
                          {formatPrice(p.price / 100)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ============ MOBILE FILTERS BOTTOM SHEET ============ */}
      <Dialog open={filterSheetOpen} onClose={() => setFilterSheetOpen(false)} title="filtros">
        <div className="space-y-5">
          {/* Preço */}
          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
              preço
            </div>
            <div className="flex flex-wrap gap-2">
              {priceFilters.map((p) => (
                <Pill key={p.key} active={priceTier === p.key} onClick={() => setPriceTier(p.key)}>
                  {p.label}
                </Pill>
              ))}
            </div>
          </div>

          {/* Locais / faculdades */}
          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
              local
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill active={uni === null} onClick={() => setUni(null)}>
                todos
              </Pill>
              {unis.map((u) => (
                <Pill key={u} active={uni === u} onClick={() => setUni(u)}>
                  {u}
                </Pill>
              ))}
            </div>
          </div>

          {/* Ordenar */}
          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
              ordenar por
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "popular", label: "mais votadas" },
                { key: "date", label: "por data" },
                { key: "price", label: "menor preço" },
              ].map((s) => (
                <Pill
                  key={s.key}
                  active={sort === s.key}
                  onClick={() => setSort(s.key as any)}
                >
                  {s.label}
                </Pill>
              ))}
            </div>
          </div>

          {/* Favoritas */}
          {favoritesCount > 0 && (
            <div>
              <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
                meus salvos
              </div>
              <button
                type="button"
                onClick={() => setOnlyFavorites((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  onlyFavorites
                    ? "border-pink-400/40 bg-pink-500/15 text-pink-200"
                    : "border-white/15 bg-white/5 text-white/80"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${onlyFavorites ? "fill-pink-300" : ""}`} />
                só as favoritas ({favoritesCount})
              </button>
            </div>
          )}

          {/* Footer actions */}
          <div className="flex gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => {
                clearFilters();
                setFilterSheetOpen(false);
              }}
              className="flex-1 rounded-full border border-white/15 bg-white/5 py-3 text-sm font-medium text-white/80"
            >
              limpar tudo
            </button>
            <button
              type="button"
              onClick={() => setFilterSheetOpen(false)}
              className="flex-[2] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 py-3 text-sm font-medium shadow-lg shadow-violet-500/30"
            >
              mostrar {filtered.length} festas
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function FestasPage() {
  return (
    <Suspense fallback={null}>
      <FestasPageInner />
    </Suspense>
  );
}
