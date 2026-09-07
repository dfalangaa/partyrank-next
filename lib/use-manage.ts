"use client";

import { useEffect, useState, useCallback } from "react";
import {
  loadState,
  saveState,
  uid,
  type ManageState,
  type Task,
  type BudgetItem,
  type TeamMember,
  type Supplier,
  type TimelineItem,
  type Party,
} from "./manage-storage";

export function useManage() {
  const [state, setState] = useState<ManageState | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    setState(loadState());
  }, []);

  // Persist on every change
  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  const update = useCallback(
    (mutator: (s: ManageState) => ManageState) => {
      setState((prev) => (prev ? mutator(prev) : prev));
    },
    []
  );

  // ===== TASKS =====
  const addTask = (t: Omit<Task, "id">) =>
    update((s) => ({ ...s, tasks: [...s.tasks, { ...t, id: uid() }] }));
  const updateTask = (id: string, patch: Partial<Task>) =>
    update((s) => ({
      ...s,
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  const deleteTask = (id: string) =>
    update((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== id) }));

  // ===== BUDGET =====
  const addBudgetItem = (b: Omit<BudgetItem, "id">) =>
    update((s) => ({ ...s, budget: [...s.budget, { ...b, id: uid() }] }));
  const updateBudgetItem = (id: string, patch: Partial<BudgetItem>) =>
    update((s) => ({
      ...s,
      budget: s.budget.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  const deleteBudgetItem = (id: string) =>
    update((s) => ({ ...s, budget: s.budget.filter((b) => b.id !== id) }));

  // ===== TEAM =====
  const addMember = (m: Omit<TeamMember, "id">) =>
    update((s) => ({ ...s, team: [...s.team, { ...m, id: uid() }] }));
  const updateMember = (id: string, patch: Partial<TeamMember>) =>
    update((s) => ({
      ...s,
      team: s.team.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));
  const deleteMember = (id: string) =>
    update((s) => ({ ...s, team: s.team.filter((m) => m.id !== id) }));

  // ===== SUPPLIERS =====
  const addSupplier = (sp: Omit<Supplier, "id">) =>
    update((s) => ({ ...s, suppliers: [...s.suppliers, { ...sp, id: uid() }] }));
  const updateSupplier = (id: string, patch: Partial<Supplier>) =>
    update((s) => ({
      ...s,
      suppliers: s.suppliers.map((sp) => (sp.id === id ? { ...sp, ...patch } : sp)),
    }));
  const deleteSupplier = (id: string) =>
    update((s) => ({ ...s, suppliers: s.suppliers.filter((sp) => sp.id !== id) }));

  // ===== TIMELINE =====
  const addTimelineItem = (t: Omit<TimelineItem, "id">) =>
    update((s) => ({ ...s, timeline: [...s.timeline, { ...t, id: uid() }] }));
  const updateTimelineItem = (id: string, patch: Partial<TimelineItem>) =>
    update((s) => ({
      ...s,
      timeline: s.timeline.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  const deleteTimelineItem = (id: string) =>
    update((s) => ({ ...s, timeline: s.timeline.filter((t) => t.id !== id) }));

  // ===== PARTIES =====
  const updateActiveParty = (patch: Partial<Party>) =>
    update((s) => ({
      ...s,
      parties: s.parties.map((p) =>
        p.id === s.activePartyId ? { ...p, ...patch } : p
      ),
    }));

  return {
    state,
    update,
    addTask,
    updateTask,
    deleteTask,
    addBudgetItem,
    updateBudgetItem,
    deleteBudgetItem,
    addMember,
    updateMember,
    deleteMember,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    updateActiveParty,
  };
}
