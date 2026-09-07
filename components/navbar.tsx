"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogOut, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { getUser, logout, onAuthChange, type User } from "@/lib/auth";
import { PRMark } from "./pr-mark";
import { PRWordmark } from "./pr-wordmark";
import { useFavorites } from "@/lib/use-favorites";

const links = [
  { href: "/festas", label: "festas" },
  { href: "/#ranking", label: "ranking" },
  { href: "/premios", label: "prêmios" },
  { href: "/mapa", label: "mapa" },
  { href: "/organizadores", label: "pra organizadores" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { count: favoritesCount } = useFavorites();

  useEffect(() => {
    setUserState(getUser());
    const unsubscribe = onAuthChange(() => setUserState(getUser()));

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      setScrolled(y > 20);

      // hide quando rolando pra baixo (passou de 120px e desceu pelo menos 6px)
      if (y > 120 && delta > 6) {
        setHidden(true);
      }
      // show quando rolando pra cima ou perto do topo
      else if (delta < -4 || y < 80) {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // se mobile menu abrir, força a navbar a aparecer
  useEffect(() => {
    if (open || menuOpen) setHidden(false);
  }, [open, menuOpen]);

  const handleLogout = () => {
    logout();
    setUserState(null);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      style={{
        top: "var(--promo-h, 0px)",
        transform: hidden ? "translateY(-110%)" : "translateY(0)",
      }}
      className={cn(
        "fixed left-0 right-0 z-50 transition-[transform,background-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <PRMark size={40} variant="outline" className="transition-opacity group-hover:opacity-90" />
          <PRWordmark size="inline" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {favoritesCount > 0 && (
            <Link
              href="/festas?fav=1"
              className="group flex items-center gap-1.5 rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-1.5 text-xs text-pink-200 transition hover:border-pink-400/60 hover:bg-pink-500/20"
              title={`${favoritesCount} festa${favoritesCount === 1 ? "" : "s"} favorita${favoritesCount === 1 ? "" : "s"}`}
            >
              <Heart className="h-3.5 w-3.5 fill-pink-300" />
              <span className="tabular-nums font-medium">{favoritesCount}</span>
            </Link>
          )}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3 text-sm transition hover:border-white/25 hover:bg-white/10"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[10ch] truncate">{user.name.split(" ")[0]}</span>
                {user.isPro && (
                  <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300">
                    PRO
                  </span>
                )}
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-52 overflow-hidden rounded-2xl border border-white/10 bg-background/95 p-1 shadow-xl backdrop-blur-xl"
                  >
                    <Link
                      href="/perfil"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                    >
                      meu perfil
                    </Link>
                    {(user.isPro || user.isOrganizer) ? (
                      <Link
                        href="/gerenciar"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                      >
                        dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/#planos"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                      >
                        <span>virar PRO</span>
                        <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300">
                          upgrade
                        </span>
                      </Link>
                    )}
                    <div className="my-1 h-px bg-white/10" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/80 hover:bg-white/5"
                    >
                      <LogOut className="h-3.5 w-3.5" /> sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link href="/login?mode=entrar">
                <Button variant="ghost" size="sm">
                  entrar
                </Button>
              </Link>
              <Link href="/login?mode=cadastrar">
                <Button variant="primary" size="sm">
                  cadastrar
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2 text-sm text-white/80"
                  >
                    <LogOut className="h-3.5 w-3.5" /> sair ({user.name.split(" ")[0]})
                  </button>
                ) : (
                  <>
                    <Link href="/login?mode=entrar" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        entrar
                      </Button>
                    </Link>
                    <Link href="/login?mode=cadastrar" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        cadastrar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
