"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  Map,
  User,
  Bell,
  Heart,
} from "lucide-react";
import { PRMark } from "@/components/pr-mark";
import { useFavorites } from "@/lib/use-favorites";

type Tab = {
  href: string;
  label: string;
  icon: typeof Home;
  /** Match this route prefix as "active" so deep routes (e.g. /festa/[slug]) light the tab. */
  match?: (path: string) => boolean;
};

const TABS: Tab[] = [
  { href: "/", label: "início", icon: Home, match: (p) => p === "/" },
  {
    href: "/festas",
    label: "festas",
    icon: Search,
    match: (p) => p.startsWith("/festas") || p.startsWith("/festa/"),
  },
  { href: "/mapa", label: "mapa", icon: Map, match: (p) => p.startsWith("/mapa") },
  {
    href: "/perfil",
    label: "perfil",
    icon: User,
    match: (p) => p.startsWith("/perfil") || p.startsWith("/gerenciar"),
  },
];

export function MobileTopBar() {
  const { count } = useFavorites();
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-background/85 backdrop-blur-xl md:hidden"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="flex h-14 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity active:opacity-60"
          aria-label="PartyRank"
        >
          <PRMark size={30} variant="tile" />
          <span className="text-base font-semibold leading-none tracking-[-0.04em]">
            party
            <span className="font-serif font-normal italic gradient-text">rank</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          {count > 0 && (
            <Link
              href="/festas?fav=1"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-pink-400/25 bg-pink-500/10 text-pink-200 transition-all active:scale-95 active:bg-pink-500/20"
              aria-label={`${count} favoritas`}
            >
              <Heart className="h-4 w-4 fill-pink-300" />
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 700, damping: 22 }}
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 px-1 text-[9px] font-bold tabular-nums text-white shadow-lg shadow-pink-500/40"
              >
                {count > 9 ? "9+" : count}
              </motion.span>
            </Link>
          )}
          <button
            type="button"
            aria-label="notificações"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-all active:scale-95 active:bg-white/10"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function MobileTabBar() {
  const path = usePathname() || "/";
  const [scrolledDown, setScrolledDown] = useState(false);

  // hide bar briefly when typing into search inputs so the keyboard has room
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") {
        setScrolledDown(true);
      }
    };
    const onBlur = () => setScrolledDown(false);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
    };
  }, []);

  return (
    <nav
      aria-label="navegação principal"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-background/95 backdrop-blur-2xl transition-transform duration-200 md:hidden ${
        scrolledDown ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-4">
        {TABS.map((t) => {
          const active = t.match ? t.match(path) : path === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="group relative flex flex-col items-center justify-center gap-1 py-2.5"
            >
              <span className="relative flex h-9 w-12 items-center justify-center">
                {/* Active pill — animates between tabs via layoutId */}
                {active && (
                  <motion.span
                    layoutId="tabbar-active-pill"
                    transition={{ type: "spring", stiffness: 480, damping: 36 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-white/5 ring-1 ring-white/10"
                  />
                )}
                <t.icon
                  className={`relative h-5 w-5 transition-colors ${
                    active ? "text-white" : "text-white/50 group-active:text-white/80"
                  }`}
                  strokeWidth={active ? 2.4 : 1.9}
                />
              </span>
              <span
                className={`text-[10px] font-medium tracking-tight transition-colors ${
                  active ? "text-white" : "text-white/45"
                }`}
              >
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/** Pads the body so the bottom tab bar never covers content. */
export function MobileSafeArea() {
  return (
    <div
      aria-hidden
      className="h-[88px] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    />
  );
}
