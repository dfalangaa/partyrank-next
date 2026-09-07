"use client";

/**
 * LocalStorage-backed CRUD for the organizer dashboard.
 * One bucket per organizer (default user). Saves on every mutation.
 */

export type Task = {
  id: string;
  title: string;
  status: "todo" | "doing" | "review" | "done";
  priority: "low" | "medium" | "high";
  due?: string;
  notes?: string;
};

export type BudgetItem = {
  id: string;
  category: string;
  name: string;
  amount: number;   // spent (in cents? — using full reais for simplicity)
  budget: number;   // planned
  paid?: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
};

export type Supplier = {
  id: string;
  name: string;
  service: string;
  price: number;
  rating?: number;
  contact?: string;
  notes?: string;
};

export type TimelineItem = {
  id: string;
  date: string;
  text: string;
  done: boolean;
};

export type Party = {
  id: string;
  name: string;
  date: string;
  location: string;
  tickets: number;
  ticketsSold: number;
  ticketPrice: number;
};

export type ManageState = {
  parties: Party[];
  activePartyId: string | null;
  tasks: Task[];
  budget: BudgetItem[];
  team: TeamMember[];
  suppliers: Supplier[];
  timeline: TimelineItem[];
};

const KEY = "partyrank_manage_v1";

const DEFAULT_STATE: ManageState = {
  parties: [
    {
      id: "p1",
      name: "Noite Colorida",
      date: "2026-05-10",
      location: "Casa Natura Musical",
      tickets: 1200,
      ticketsSold: 842,
      ticketPrice: 80,
    },
  ],
  activePartyId: "p1",
  tasks: [
    { id: "t1", title: "definir conceito e tema", status: "done", priority: "high" },
    { id: "t2", title: "fechar venue", status: "done", priority: "high" },
    { id: "t3", title: "contratar DJs", status: "doing", priority: "high" },
    { id: "t4", title: "lista VIPs", status: "doing", priority: "medium" },
    { id: "t5", title: "design das artes", status: "review", priority: "medium" },
    { id: "t6", title: "contratar seguranças", status: "todo", priority: "high", due: "2026-04-30" },
    { id: "t7", title: "fechar decoração", status: "todo", priority: "low", due: "2026-05-02" },
    { id: "t8", title: "campanha de marketing", status: "todo", priority: "medium" },
  ],
  budget: [
    { id: "b1", category: "venue", name: "Casa Natura Musical", amount: 15000, budget: 18000 },
    { id: "b2", category: "som", name: "Sound system + DJs", amount: 8000, budget: 10000 },
    { id: "b3", category: "bar", name: "Open bar 4h", amount: 6500, budget: 8000 },
    { id: "b4", category: "decoração", name: "Decoração tema neon", amount: 3000, budget: 4500 },
    { id: "b5", category: "marketing", name: "Stories + ads", amount: 2500, budget: 3500 },
    { id: "b6", category: "segurança", name: "Equipe segurança", amount: 4000, budget: 4500 },
  ],
  team: [
    { id: "m1", name: "Davi Falanga", role: "organizador", email: "davi@partyrank.com" },
    { id: "m2", name: "Ana Costa", role: "financeiro", email: "ana@partyrank.com" },
    { id: "m3", name: "Rafael Lima", role: "marketing" },
    { id: "m4", name: "Julia Mendes", role: "operações" },
    { id: "m5", name: "Pedro Silva", role: "produção" },
  ],
  suppliers: [
    { id: "s1", name: "Audio Club", service: "venue", price: 15000, rating: 4.9 },
    { id: "s2", name: "DJ Marcus Santos", service: "line-up", price: 4500, rating: 4.8 },
    { id: "s3", name: "Bar do Léo", service: "open bar", price: 6500, rating: 4.7 },
    { id: "s4", name: "Neon Decor", service: "decoração", price: 3000, rating: 4.6 },
  ],
  timeline: [
    { id: "tl1", date: "2026-04-15", text: "definir conceito e tema", done: true },
    { id: "tl2", date: "2026-04-20", text: "fechar venue e data", done: true },
    { id: "tl3", date: "2026-04-25", text: "contratar DJs e line-up", done: true },
    { id: "tl4", date: "2026-05-05", text: "lançar vendas de ingresso", done: false },
    { id: "tl5", date: "2026-05-10", text: "dia do evento", done: false },
  ],
};

export function loadState(): ManageState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: ManageState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
