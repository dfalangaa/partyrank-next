import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Star,
  TrendingUp,
  Clock,
} from "lucide-react";
import { parties } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { TicketCTA } from "@/components/festa/ticket-cta";
import { VoteButton } from "@/components/festa/vote-button";
import { FavoriteButton } from "@/components/festa/favorite-button";
import { ShareButton } from "@/components/festa/share-button";
import { PartyCountdown } from "@/components/festa/party-countdown";
import { PartyLineup } from "@/components/festa/party-lineup";
import { PartyGallery } from "@/components/festa/party-gallery";
import { InviteFriends } from "@/components/festa/invite-friends";
import { MobileBuyBar } from "@/components/festa/mobile-buy-bar";
import { LiveBadge } from "@/components/festa/live-badge";

export function generateStaticParams() {
  return parties.map((p) => ({ slug: p.slug }));
}

export default async function PartyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const party = parties.find((p) => p.slug === slug);
  if (!party) notFound();

  const related = parties
    .filter((p) => p.id !== party.id && p.university === party.university)
    .slice(0, 3);

  return (
    <div className="relative">
      {/* Hero image — properly contained, no bleed */}
      <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src={party.image}
          alt={party.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Gradient over image: dark at top (for navbar), dark at bottom (for content) */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />
      </div>

      <div className="relative -mt-32 px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/festas"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> voltar pro ranking
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* MAIN COLUMN */}
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <LiveBadge dateISO={party.date} hideFuture={false} />
                <Badge variant="primary">{party.university}</Badge>
                <Badge>{party.theme}</Badge>
                <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-sm text-white/85 backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{party.rating}</span>
                  <span className="text-white/50">·</span>
                  <span className="text-xs text-white/65">
                    {party.votes.toLocaleString("pt-BR")} votos
                  </span>
                </div>
              </div>

              <h1
                className="mb-5 text-balance font-medium leading-[0.92] tracking-[-0.04em]"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
              >
                {party.name}
              </h1>

              <p className="mb-8 max-w-xl text-balance text-base leading-relaxed text-white/65 md:text-lg">
                {party.description}
              </p>

              {/* Action row: vote + favorite + share */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <VoteButton partyId={party.id} initialVotes={party.votes} />
                <FavoriteButton partyId={party.id} partyName={party.name} />
                <ShareButton
                  title={party.name}
                  text={`${party.name} — ${party.university} · ${new Date(
                    party.date,
                  ).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}`}
                  path={`/festa/${party.slug}`}
                />
              </div>

              {/* Countdown */}
              <div className="mb-10">
                <PartyCountdown dateISO={party.date} />
              </div>

              {/* Info grid */}
              <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4">
                <Info
                  label="data"
                  value={new Date(party.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                  })}
                  icon={Calendar}
                />
                <Info label="horário" value="22h - 4h" icon={Clock} />
                <Info
                  label="público"
                  value={`${party.attendees}`}
                  icon={Users}
                />
                <Info
                  label="ranking"
                  value={`#${parties.findIndex((p) => p.id === party.id) + 1}`}
                  icon={TrendingUp}
                />
              </div>

              {/* About */}
              <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <h2 className="mb-3 text-xl font-medium md:text-2xl">
                  sobre a festa
                </h2>
                <p className="text-balance leading-relaxed text-white/70">
                  {party.description} O evento conta com estrutura premium,
                  line-up com DJs referências do cenário universitário paulistano
                  e um público selecionado de mais de {party.attendees}{" "}
                  estudantes. Organizado por <strong className="text-white">{party.organizer}</strong>.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {party.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>

              {/* Lineup */}
              <div className="mb-6">
                <PartyLineup party={party} />
              </div>

              {/* Gallery */}
              <div className="mb-10">
                <PartyGallery slug={party.slug} />
              </div>

              {/* Address */}
              <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <h2 className="mb-4 text-xl font-medium md:text-2xl">
                  onde é
                </h2>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-0.5 text-lg font-medium">
                      {party.location}
                    </div>
                    <div className="text-sm text-white/60">{party.address}</div>
                  </div>
                  <Link
                    href="/mapa"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:border-white/30 hover:bg-white/10"
                  >
                    <MapPin className="h-3.5 w-3.5" /> ver no mapa
                  </Link>
                </div>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div>
                  <h2 className="mb-5 text-xl font-medium md:text-2xl">
                    outras festas da {party.university}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/festa/${r.slug}`}
                        className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-0.5 hover:border-white/25"
                      >
                        <div className="relative aspect-[3/2]">
                          <Image
                            src={r.image}
                            alt={r.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-4">
                          <div className="text-sm font-medium">{r.name}</div>
                          <div className="text-xs text-white/50">
                            {new Date(r.date).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* TICKET SIDEBAR — desktop only; mobile gets the sticky bar below */}
            <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <TicketCTA party={party} />
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile: full TicketCTA modal lives here (no card visible) + sticky buy bar */}
      <div className="lg:hidden">
        <TicketCTA party={party} hideCard />
        <MobileBuyBar party={party} />
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <Icon className="mb-2 h-4 w-4 text-violet-400" />
      <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">
        {label}
      </div>
      <div className="mt-0.5 truncate text-sm font-medium md:text-base">
        {value}
      </div>
    </div>
  );
}
