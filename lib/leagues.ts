import { League, Organizer, Party, organizers, parties } from "./mock-data";

export type LeagueStanding = {
  organizer: Organizer;
  points: number;
  partyCount: number;
  averageRating: number;
  topRating: number;
  trend: "up" | "down" | "flat";
};

export function getOrganizer(slug: string): Organizer | undefined {
  return organizers.find((o) => o.slug === slug);
}

export function partiesByOrganizer(slug: string): Party[] {
  return parties.filter((p) => p.organizerSlug === slug);
}

export function organizersByLeague(league: League): Organizer[] {
  return organizers.filter((o) => o.league === league);
}

export function leagueStandings(league: League): LeagueStanding[] {
  const orgs = organizersByLeague(league);

  const standings: LeagueStanding[] = orgs.map((organizer) => {
    const orgParties = partiesByOrganizer(organizer.slug);
    const points = orgParties.reduce((acc, p) => acc + p.rating * 10, 0);
    const partyCount = orgParties.length;
    const averageRating =
      partyCount > 0
        ? orgParties.reduce((acc, p) => acc + p.rating, 0) / partyCount
        : 0;
    const topRating = partyCount > 0 ? Math.max(...orgParties.map((p) => p.rating)) : 0;

    // mock trend até termos histórico real
    const seed = organizer.slug.charCodeAt(0) + organizer.slug.charCodeAt(organizer.slug.length - 1);
    const trend: LeagueStanding["trend"] =
      seed % 3 === 0 ? "up" : seed % 3 === 1 ? "down" : "flat";

    return { organizer, points, partyCount, averageRating, topRating, trend };
  });

  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.averageRating !== a.averageRating) return b.averageRating - a.averageRating;
    return b.partyCount - a.partyCount;
  });
}

export function leagueLeader(league: League): LeagueStanding | undefined {
  return leagueStandings(league)[0];
}

export function allLeaguesLeaders() {
  return {
    universitaria: leagueLeader("universitaria"),
    clubs: leagueLeader("clubs"),
    coletivos: leagueLeader("coletivos"),
  };
}
