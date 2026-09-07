"use client";

const KEY = "partyrank_user";
const EVENT = "partyrank:auth-change";

export type User = {
  name: string;
  email: string;
  university?: string;
  course?: string;
  isPro?: boolean;
  isOrganizer?: boolean;
  joinedAt: string;
};

function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(u: User) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(u));
  emit();
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  emit();
}

export function isLoggedIn() {
  return !!getUser();
}

export function onAuthChange(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, cb);
  // storage event cobre o caso de outras abas
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
