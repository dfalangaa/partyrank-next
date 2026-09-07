"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Kanban,
  DollarSign,
  Users,
  Briefcase,
  CalendarDays,
  Plus,
  Crown,
  TrendingUp,
  Pencil,
  Trash2,
  Check,
  Circle,
  CheckCircle2,
} from "lucide-react";
import { useManage } from "@/lib/use-manage";
import { Dialog, Field, inputClass } from "@/components/ui/dialog";
import type {
  Task,
  BudgetItem,
  TeamMember,
  Supplier,
  TimelineItem,
} from "@/lib/manage-storage";

type TabKey = "overview" | "kanban" | "budget" | "team" | "suppliers" | "timeline";

const tabs: { key: TabKey; label: string; icon: any }[] = [
  { key: "overview", label: "visão geral", icon: LayoutGrid },
  { key: "kanban", label: "kanban", icon: Kanban },
  { key: "budget", label: "orçamento", icon: DollarSign },
  { key: "team", label: "equipe", icon: Users },
  { key: "suppliers", label: "fornecedores", icon: Briefcase },
  { key: "timeline", label: "timeline", icon: CalendarDays },
];

export default function GerenciarPage() {
  const [tab, setTab] = useState<TabKey>("overview");
  const m = useManage();

  if (!m.state) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/60">
        carregando dashboard...
      </div>
    );
  }

  return (
    <div className="relative px-4 pb-20 pt-4 md:px-10 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 md:mb-8 md:flex-row md:items-end md:gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-gradient-to-r from-amber-500/15 to-orange-500/15 px-3 py-1 text-[11px] text-amber-300 md:mb-3 md:text-xs">
              <Crown className="h-3 w-3" /> PartyRank PRO
            </div>
            <h1
              className="text-balance font-medium leading-tight tracking-[-0.03em] md:leading-[1.05] md:tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.6rem, 5vw, 3.75rem)" }}
            >
              dashboard de{" "}
              <span className="font-serif italic font-normal gradient-text">
                gerenciamento
              </span>
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/55 md:text-base">
              tudo da sua festa em um lugar. dados salvos automaticamente no
              navegador.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 z-30 mb-8 -mx-6 border-y border-white/5 bg-background/80 px-6 py-3 backdrop-blur-xl md:top-20 md:-mx-10 md:px-10">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? "bg-violet-500/15 text-violet-200 ring-1 ring-violet-500/30"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "overview" && <OverviewPanel m={m} />}
            {tab === "kanban" && <KanbanPanel m={m} />}
            {tab === "budget" && <BudgetPanel m={m} />}
            {tab === "team" && <TeamPanel m={m} />}
            {tab === "suppliers" && <SuppliersPanel m={m} />}
            {tab === "timeline" && <TimelinePanel m={m} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// =================================================================
// OVERVIEW
// =================================================================
function OverviewPanel({ m }: { m: ReturnType<typeof useManage> }) {
  const [editOpen, setEditOpen] = useState(false);
  if (!m.state) return null;
  const party = m.state.parties[0];
  const tasksDone = m.state.tasks.filter((t) => t.status === "done").length;
  const totalTasks = m.state.tasks.length;
  const progress = totalTasks ? (tasksDone / totalTasks) * 100 : 0;
  const totalSpent = m.state.budget.reduce((s, b) => s + b.amount, 0);
  const totalBudget = m.state.budget.reduce((s, b) => s + b.budget, 0);
  const revenue = party.ticketsSold * party.ticketPrice;
  const upcoming = m.state.tasks
    .filter((t) => t.status !== "done")
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Party header card */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-pink-500/10 p-6 md:flex-row md:items-center md:p-8">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-white/50">
            festa atual
          </div>
          <h2 className="mt-1 text-3xl font-medium md:text-4xl">{party.name}</h2>
          <div className="mt-1 text-sm text-white/60">
            {new Date(party.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            · {party.location}
          </div>
        </div>
        <button
          onClick={() => setEditOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:border-white/30 hover:bg-white/10"
        >
          <Pencil className="h-3.5 w-3.5" /> editar festa
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi
          label="vendas"
          value={`R$ ${(revenue / 1000).toFixed(1)}k`}
          color="from-violet-500/20 to-violet-500/5"
        />
        <Kpi
          label="ingressos"
          value={`${party.ticketsSold}/${party.tickets}`}
          color="from-fuchsia-500/20 to-fuchsia-500/5"
        />
        <Kpi
          label="orçamento"
          value={`${Math.round((totalSpent / totalBudget) * 100)}%`}
          color="from-amber-500/20 to-amber-500/5"
        />
        <Kpi
          label="progresso"
          value={`${Math.round(progress)}%`}
          color="from-emerald-500/20 to-emerald-500/5"
        />
      </div>

      {/* Progress + upcoming */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">progresso da festa</h3>
            <span className="text-sm text-white/50">
              {tasksDone}/{totalTasks} tarefas
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "venue confirmado", done: true },
              { label: "DJs contratados", done: true },
              { label: "marketing ativo", done: false },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm"
              >
                {item.done ? (
                  <CheckCircle2 className="mb-2 h-4 w-4 text-emerald-400" />
                ) : (
                  <Circle className="mb-2 h-4 w-4 text-white/40" />
                )}
                <div
                  className={`font-medium ${
                    item.done ? "" : "text-white/60"
                  }`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h3 className="mb-4 text-lg font-medium">próximas tarefas</h3>
          {upcoming.length === 0 ? (
            <p className="text-sm text-white/50">nenhuma tarefa pendente.</p>
          ) : (
            <div className="space-y-2">
              {upcoming.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 rounded-xl border-l-4 bg-white/[0.03] px-3 py-2.5 text-sm ${
                    task.priority === "high"
                      ? "border-l-red-500"
                      : task.priority === "medium"
                      ? "border-l-amber-500"
                      : "border-l-emerald-500"
                  } border-y border-r border-white/5`}
                >
                  <Circle className="h-3 w-3 text-white/40" />
                  <span className="flex-1">{task.title}</span>
                  {task.due && (
                    <span className="text-xs text-white/40">
                      {new Date(task.due).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PartyEditModal m={m} open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}

function PartyEditModal({
  m,
  open,
  onClose,
}: {
  m: ReturnType<typeof useManage>;
  open: boolean;
  onClose: () => void;
}) {
  const party = m.state?.parties[0];
  const [form, setForm] = useState(party!);

  if (!open || !party) return null;

  return (
    <Dialog open={open} onClose={onClose} title="editar festa">
      <div className="space-y-4">
        <Field label="nome">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="data">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="local">
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="ingressos totais">
            <input
              type="number"
              value={form.tickets}
              onChange={(e) =>
                setForm({ ...form, tickets: +e.target.value || 0 })
              }
              className={inputClass}
            />
          </Field>
          <Field label="vendidos">
            <input
              type="number"
              value={form.ticketsSold}
              onChange={(e) =>
                setForm({ ...form, ticketsSold: +e.target.value || 0 })
              }
              className={inputClass}
            />
          </Field>
          <Field label="preço (R$)">
            <input
              type="number"
              value={form.ticketPrice}
              onChange={(e) =>
                setForm({ ...form, ticketPrice: +e.target.value || 0 })
              }
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            cancelar
          </button>
          <button
            onClick={() => {
              m.updateActiveParty(form);
              onClose();
            }}
            className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-2 text-sm font-medium"
          >
            salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function Kpi({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-br ${color} p-5`}
    >
      <div className="text-xs uppercase tracking-[0.15em] text-white/50">
        {label}
      </div>
      <div className="mt-1 text-3xl font-medium tabular-nums tracking-[-0.02em]">
        {value}
      </div>
      <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
        <TrendingUp className="h-3 w-3" /> em alta
      </div>
    </div>
  );
}

// =================================================================
// KANBAN
// =================================================================
function KanbanPanel({ m }: { m: ReturnType<typeof useManage> }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const columns: { key: Task["status"]; title: string; dot: string }[] = [
    { key: "todo", title: "a fazer", dot: "bg-slate-400" },
    { key: "doing", title: "fazendo", dot: "bg-amber-400" },
    { key: "review", title: "revisão", dot: "bg-violet-400" },
    { key: "done", title: "concluído", dot: "bg-emerald-400" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-medium">tarefas</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-medium shadow-lg shadow-violet-500/30"
        >
          <Plus className="h-4 w-4" /> nova tarefa
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => {
          const tasks = m.state!.tasks.filter((t) => t.status === col.key);
          return (
            <div
              key={col.key}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                <span className="font-medium">{col.title}</span>
                <span className="rounded-full bg-white/5 px-2 text-xs text-white/50">
                  {tasks.length}
                </span>
              </div>
              <div className="space-y-2">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setEditing(t);
                      setOpen(true);
                    }}
                    className={`group cursor-pointer rounded-2xl border-l-4 border-white/10 bg-white/[0.05] p-3 text-sm transition-all hover:border-white/25 hover:bg-white/[0.08] ${
                      t.priority === "high"
                        ? "border-l-red-500"
                        : t.priority === "medium"
                        ? "border-l-amber-500"
                        : "border-l-emerald-500"
                    } border-y border-r`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span>{t.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("excluir esta tarefa?"))
                            m.deleteTask(t.id);
                        }}
                        className="opacity-0 transition group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-white/50 hover:text-red-400" />
                      </button>
                    </div>
                    {t.due && (
                      <div className="mt-1 text-xs text-white/40">
                        {new Date(t.due).toLocaleDateString("pt-BR")}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    setEditing({ id: "", title: "", status: col.key, priority: "medium" });
                    setOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-1 rounded-2xl border border-dashed border-white/10 px-3 py-2 text-xs text-white/40 transition hover:border-white/30 hover:text-white"
                >
                  <Plus className="h-3 w-3" /> adicionar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal
        m={m}
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
      />
    </div>
  );
}

function TaskModal({
  m,
  open,
  onClose,
  editing,
}: {
  m: ReturnType<typeof useManage>;
  open: boolean;
  onClose: () => void;
  editing: Task | null;
}) {
  const [form, setForm] = useState<Task>(
    editing || { id: "", title: "", status: "todo", priority: "medium" }
  );

  // Reset form when editing changes
  useState(() => {
    if (editing) setForm(editing);
  });

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={editing?.id ? "editar tarefa" : "nova tarefa"}
    >
      <div className="space-y-4">
        <Field label="título">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
            placeholder="ex: contratar fotógrafo"
            autoFocus
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="status">
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as Task["status"] })
              }
              className={inputClass}
            >
              <option value="todo">a fazer</option>
              <option value="doing">fazendo</option>
              <option value="review">revisão</option>
              <option value="done">concluído</option>
            </select>
          </Field>
          <Field label="prioridade">
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value as Task["priority"],
                })
              }
              className={inputClass}
            >
              <option value="low">baixa</option>
              <option value="medium">média</option>
              <option value="high">alta</option>
            </select>
          </Field>
        </div>
        <Field label="data limite (opcional)">
          <input
            type="date"
            value={form.due || ""}
            onChange={(e) => setForm({ ...form, due: e.target.value })}
            className={inputClass}
          />
        </Field>

        <div className="mt-2 flex justify-end gap-2">
          {editing?.id && (
            <button
              onClick={() => {
                if (confirm("excluir tarefa?")) {
                  m.deleteTask(editing.id);
                  onClose();
                }
              }}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20"
            >
              excluir
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            cancelar
          </button>
          <button
            onClick={() => {
              if (!form.title.trim()) return;
              if (editing?.id) m.updateTask(editing.id, form);
              else m.addTask(form);
              onClose();
            }}
            className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-2 text-sm font-medium"
          >
            salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// =================================================================
// BUDGET
// =================================================================
function BudgetPanel({ m }: { m: ReturnType<typeof useManage> }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BudgetItem | null>(null);
  const totalSpent = m.state!.budget.reduce((s, b) => s + b.amount, 0);
  const totalBudget = m.state!.budget.reduce((s, b) => s + b.budget, 0);
  const pct = totalBudget ? (totalSpent / totalBudget) * 100 : 0;

  // Group by category
  const byCategory = useMemo(() => {
    const map = new Map<string, { spent: number; planned: number; items: BudgetItem[] }>();
    m.state!.budget.forEach((b) => {
      const cat = map.get(b.category) || { spent: 0, planned: 0, items: [] };
      cat.spent += b.amount;
      cat.planned += b.budget;
      cat.items.push(b);
      map.set(b.category, cat);
    });
    return map;
  }, [m.state!.budget]);

  const categoryColor = (cat: string) => {
    const colors = ["#7C5CFF", "#FF4D8D", "#22D3EE", "#F59E0B", "#10D390", "#FF7A3D", "#EF4444"];
    let h = 0;
    for (let i = 0; i < cat.length; i++) h = (h * 31 + cat.charCodeAt(i)) >>> 0;
    return colors[h % colors.length];
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-pink-500/5 p-8">
        <div className="mb-1 text-xs uppercase tracking-[0.15em] text-white/50">
          gasto total
        </div>
        <div className="mb-4 flex items-baseline gap-3">
          <span className="text-5xl font-medium tracking-[-0.04em]">
            R$ {totalSpent.toLocaleString("pt-BR")}
          </span>
          <span className="text-xl text-white/40">
            / R$ {totalBudget.toLocaleString("pt-BR")}
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(pct, 100)}%` }}
            transition={{ duration: 1 }}
            className={`h-full rounded-full ${
              pct > 100
                ? "bg-gradient-to-r from-red-500 to-orange-500"
                : "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
            }`}
          />
        </div>
        <div className="mt-2 text-xs text-white/50">
          {Math.round(pct)}% do orçamento usado
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">categorias</h3>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-medium shadow-lg shadow-violet-500/30"
        >
          <Plus className="h-4 w-4" /> nova despesa
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...byCategory.entries()].map(([cat, info]) => {
          const itemPct = (info.spent / info.planned) * 100;
          const color = categoryColor(cat);
          return (
            <div
              key={cat}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium capitalize">{cat}</span>
                <span className="text-xs text-white/50">
                  R$ {info.spent.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(itemPct, 100)}%`,
                    background: color,
                  }}
                />
              </div>
              <div className="mt-1.5 text-xs text-white/40">
                {Math.round(itemPct)}% de R$ {info.planned.toLocaleString("pt-BR")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Item list */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">despesas</h3>
          <span className="text-xs text-white/50">
            {m.state!.budget.length} {m.state!.budget.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="space-y-2">
          {m.state!.budget.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ background: categoryColor(b.category) }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{b.name}</span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                    {b.category}
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-white/50">
                  gasto R$ {b.amount.toLocaleString("pt-BR")} de R$ {b.budget.toLocaleString("pt-BR")}
                </div>
              </div>
              <button
                onClick={() => {
                  setEditing(b);
                  setOpen(true);
                }}
                className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`excluir "${b.name}"?`)) m.deleteBudgetItem(b.id);
                }}
                className="rounded-lg p-2 text-white/50 hover:bg-red-500/15 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {m.state!.budget.length === 0 && (
            <p className="text-center text-sm text-white/40">
              nenhuma despesa cadastrada.
            </p>
          )}
        </div>
      </div>

      <BudgetModal
        m={m}
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
      />
    </div>
  );
}

function BudgetModal({
  m,
  open,
  onClose,
  editing,
}: {
  m: ReturnType<typeof useManage>;
  open: boolean;
  onClose: () => void;
  editing: BudgetItem | null;
}) {
  const [form, setForm] = useState<BudgetItem>(
    editing || { id: "", category: "venue", name: "", amount: 0, budget: 0 }
  );
  useState(() => {
    if (editing) setForm(editing);
  });

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={editing?.id ? "editar despesa" : "nova despesa"}
    >
      <div className="space-y-4">
        <Field label="nome / descrição">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="ex: locação do som"
            className={inputClass}
            autoFocus
          />
        </Field>
        <Field label="categoria">
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="ex: venue, som, bar, marketing..."
            className={inputClass}
            list="categories"
          />
          <datalist id="categories">
            {Array.from(new Set(m.state!.budget.map((b) => b.category))).map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="valor planejado (R$)">
            <input
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: +e.target.value || 0 })}
              className={inputClass}
            />
          </Field>
          <Field label="já gasto (R$)">
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: +e.target.value || 0 })}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mt-2 flex justify-end gap-2">
          {editing?.id && (
            <button
              onClick={() => {
                if (confirm("excluir despesa?")) {
                  m.deleteBudgetItem(editing.id);
                  onClose();
                }
              }}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20"
            >
              excluir
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            cancelar
          </button>
          <button
            onClick={() => {
              if (!form.name.trim() || !form.category.trim()) return;
              if (editing?.id) m.updateBudgetItem(editing.id, form);
              else m.addBudgetItem(form);
              onClose();
            }}
            className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-2 text-sm font-medium"
          >
            salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// =================================================================
// TEAM
// =================================================================
function TeamPanel({ m }: { m: ReturnType<typeof useManage> }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);

  const colors = [
    "from-violet-500 to-fuchsia-500",
    "from-pink-500 to-orange-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-red-500",
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-medium">equipe</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-medium shadow-lg shadow-violet-500/30"
        >
          <Plus className="h-4 w-4" /> novo membro
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {m.state!.team.map((member, i) => (
          <div
            key={member.id}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-white/25"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`remover ${member.name} da equipe?`))
                  m.deleteMember(member.id);
              }}
              className="absolute right-3 top-3 rounded-lg p-1.5 text-white/40 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/15 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <div
              className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${
                colors[i % colors.length]
              } text-2xl font-bold text-white shadow-lg`}
            >
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div className="font-medium">{member.name}</div>
            <div className="text-xs text-white/50">{member.role}</div>
            {member.email && (
              <div className="mt-2 truncate text-[10px] text-white/40">{member.email}</div>
            )}
            <button
              onClick={() => {
                setEditing(member);
                setOpen(true);
              }}
              className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs hover:border-white/25 hover:bg-white/10"
            >
              <Pencil className="h-3 w-3" /> editar
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-sm text-white/50 transition hover:border-white/30 hover:text-white"
        >
          <Plus className="h-5 w-5" /> adicionar membro
        </button>
      </div>

      <MemberModal
        m={m}
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
      />
    </div>
  );
}

function MemberModal({
  m,
  open,
  onClose,
  editing,
}: {
  m: ReturnType<typeof useManage>;
  open: boolean;
  onClose: () => void;
  editing: TeamMember | null;
}) {
  const [form, setForm] = useState<TeamMember>(
    editing || { id: "", name: "", role: "" }
  );
  useState(() => {
    if (editing) setForm(editing);
  });

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={editing?.id ? "editar membro" : "novo membro"}
    >
      <div className="space-y-4">
        <Field label="nome">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="ex: Maria Silva"
            className={inputClass}
            autoFocus
          />
        </Field>
        <Field label="cargo / função">
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="ex: marketing, financeiro..."
            className={inputClass}
            list="roles"
          />
          <datalist id="roles">
            {["organizador", "financeiro", "marketing", "operações", "produção", "design"].map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="email (opcional)">
            <input
              type="email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="telefone (opcional)">
            <input
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mt-2 flex justify-end gap-2">
          {editing?.id && (
            <button
              onClick={() => {
                if (confirm("remover membro?")) {
                  m.deleteMember(editing.id);
                  onClose();
                }
              }}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20"
            >
              remover
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            cancelar
          </button>
          <button
            onClick={() => {
              if (!form.name.trim() || !form.role.trim()) return;
              if (editing?.id) m.updateMember(editing.id, form);
              else m.addMember(form);
              onClose();
            }}
            className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-2 text-sm font-medium"
          >
            salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// =================================================================
// SUPPLIERS
// =================================================================
function SuppliersPanel({ m }: { m: ReturnType<typeof useManage> }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-medium">fornecedores</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-medium shadow-lg shadow-violet-500/30"
        >
          <Plus className="h-4 w-4" /> novo fornecedor
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {m.state!.suppliers.map((s) => (
          <div
            key={s.id}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-3 flex items-start justify-between">
              <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-violet-300">
                {s.service}
              </span>
              <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => {
                    setEditing(s);
                    setOpen(true);
                  }}
                  className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`remover ${s.name}?`)) m.deleteSupplier(s.id);
                  }}
                  className="rounded-lg p-1.5 text-white/50 hover:bg-red-500/15 hover:text-red-400"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="text-lg font-medium">{s.name}</div>
            <div className="mt-1 flex items-center gap-2 text-sm text-white/65">
              {s.rating && <span>★ {s.rating}</span>}
              <span>·</span>
              <span>R$ {s.price.toLocaleString("pt-BR")}</span>
            </div>
            {s.contact && (
              <div className="mt-2 truncate text-xs text-white/45">{s.contact}</div>
            )}
            {s.notes && (
              <div className="mt-2 line-clamp-2 text-xs text-white/55">
                {s.notes}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="flex min-h-[150px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-sm text-white/50 transition hover:border-white/30 hover:text-white"
        >
          <Plus className="h-5 w-5" /> adicionar fornecedor
        </button>
      </div>

      <SupplierModal
        m={m}
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
      />
    </div>
  );
}

function SupplierModal({
  m,
  open,
  onClose,
  editing,
}: {
  m: ReturnType<typeof useManage>;
  open: boolean;
  onClose: () => void;
  editing: Supplier | null;
}) {
  const [form, setForm] = useState<Supplier>(
    editing || { id: "", name: "", service: "", price: 0 }
  );
  useState(() => {
    if (editing) setForm(editing);
  });

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={editing?.id ? "editar fornecedor" : "novo fornecedor"}
    >
      <div className="space-y-4">
        <Field label="nome">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="ex: DJ Marcus Santos"
            className={inputClass}
            autoFocus
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="serviço">
            <input
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              placeholder="ex: line-up, venue..."
              className={inputClass}
            />
          </Field>
          <Field label="preço (R$)">
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: +e.target.value || 0 })}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="avaliação (1-5)">
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating || ""}
              onChange={(e) =>
                setForm({ ...form, rating: +e.target.value || undefined })
              }
              className={inputClass}
            />
          </Field>
          <Field label="contato (whatsapp/email)">
            <input
              value={form.contact || ""}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="observações">
          <textarea
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </Field>

        <div className="mt-2 flex justify-end gap-2">
          {editing?.id && (
            <button
              onClick={() => {
                if (confirm("remover fornecedor?")) {
                  m.deleteSupplier(editing.id);
                  onClose();
                }
              }}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20"
            >
              remover
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            cancelar
          </button>
          <button
            onClick={() => {
              if (!form.name.trim() || !form.service.trim()) return;
              if (editing?.id) m.updateSupplier(editing.id, form);
              else m.addSupplier(form);
              onClose();
            }}
            className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-2 text-sm font-medium"
          >
            salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// =================================================================
// TIMELINE
// =================================================================
function TimelinePanel({ m }: { m: ReturnType<typeof useManage> }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TimelineItem | null>(null);
  const sorted = [...m.state!.timeline].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-medium">timeline</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-medium shadow-lg shadow-violet-500/30"
        >
          <Plus className="h-4 w-4" /> novo marco
        </button>
      </div>

      <div className="relative pl-8">
        <div className="absolute bottom-0 left-2.5 top-0 w-px bg-white/10" />
        {sorted.map((it) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative mb-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/25"
          >
            <div
              className={`absolute -left-[1.7rem] top-4 h-4 w-4 rounded-full border-2 border-background ${
                it.done ? "bg-emerald-500" : "bg-violet-500"
              }`}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-xs text-white/50">
                  {new Date(it.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div
                  className={`font-medium ${
                    it.done ? "text-white/50 line-through" : "text-white"
                  }`}
                >
                  {it.text}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    m.updateTimelineItem(it.id, { done: !it.done })
                  }
                  className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
                  title={it.done ? "marcar como pendente" : "marcar como concluído"}
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setEditing(it);
                    setOpen(true);
                  }}
                  className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm("excluir marco?")) m.deleteTimelineItem(it.id);
                  }}
                  className="rounded-lg p-2 text-white/50 hover:bg-red-500/15 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {sorted.length === 0 && (
          <p className="text-sm text-white/40">nenhum marco cadastrado.</p>
        )}
      </div>

      <TimelineModal
        m={m}
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
      />
    </div>
  );
}

function TimelineModal({
  m,
  open,
  onClose,
  editing,
}: {
  m: ReturnType<typeof useManage>;
  open: boolean;
  onClose: () => void;
  editing: TimelineItem | null;
}) {
  const [form, setForm] = useState<TimelineItem>(
    editing || { id: "", date: new Date().toISOString().slice(0, 10), text: "", done: false }
  );
  useState(() => {
    if (editing) setForm(editing);
  });

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={editing?.id ? "editar marco" : "novo marco"}
    >
      <div className="space-y-4">
        <Field label="data">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="descrição">
          <input
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="ex: lançar vendas de ingresso"
            className={inputClass}
            autoFocus
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={form.done}
            onChange={(e) => setForm({ ...form, done: e.target.checked })}
            className="h-4 w-4 rounded border-white/20 bg-white/5"
          />
          marcado como concluído
        </label>

        <div className="mt-2 flex justify-end gap-2">
          {editing?.id && (
            <button
              onClick={() => {
                if (confirm("excluir marco?")) {
                  m.deleteTimelineItem(editing.id);
                  onClose();
                }
              }}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20"
            >
              excluir
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            cancelar
          </button>
          <button
            onClick={() => {
              if (!form.text.trim()) return;
              if (editing?.id) m.updateTimelineItem(editing.id, form);
              else m.addTimelineItem(form);
              onClose();
            }}
            className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-2 text-sm font-medium"
          >
            salvar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
