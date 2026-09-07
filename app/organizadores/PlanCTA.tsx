"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getUser, setUser, onAuthChange, type User } from "@/lib/auth";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  intent: "browse" | "claim" | "solo" | "official";
  href: string; // fallback
  label: string;
  variant: Variant;
};

const baseClass =
  "group inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-sm font-medium transition";

const variantClass: Record<Variant, string> = {
  primary: "bg-white text-black hover:bg-white/90",
  outline:
    "border border-white/20 bg-white/5 text-white hover:bg-white/10",
  ghost:
    "border border-white/10 bg-transparent text-white/70 hover:border-white/20 hover:text-white",
};

export function PlanCTA({ intent, href, label, variant }: Props) {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUserState(getUser());
    setHydrated(true);
    return onAuthChange(() => setUserState(getUser()));
  }, []);

  // intent "browse" e "official" são links normais (browse = ver festas, official = mailto)
  // intent "claim" e "solo" precisam de auth-aware behavior
  const needsAuthAware = intent === "claim" || intent === "solo";

  const isLoggedIn = !!user;
  const isAlreadyOrganizer = !!user?.isOrganizer || !!user?.isPro;

  // resolve label dinâmico baseado em estado pra ser honesto com o user
  let resolvedLabel = label;
  if (needsAuthAware && hydrated) {
    if (isAlreadyOrganizer) {
      resolvedLabel = "ir pro dashboard";
    } else if (isLoggedIn) {
      resolvedLabel =
        intent === "claim" ? "ativar página" : "ativar plano solo";
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!needsAuthAware) return; // intent "browse" ou "official": deixa o Link normal seguir

    if (!hydrated) {
      // ainda não sabemos se o user está logado, deixa o link normal seguir
      return;
    }

    if (!isLoggedIn) {
      // não logado: redireciona pra cadastro com intent — quando logar, conta nasce com isOrganizer
      e.preventDefault();
      const params = new URLSearchParams({
        mode: "cadastrar",
        intent,
      });
      router.push(`/login?${params.toString()}`);
      return;
    }

    if (isAlreadyOrganizer) {
      // já é organizador: vai direto pro dashboard
      e.preventDefault();
      router.push("/gerenciar");
      return;
    }

    // logado mas não-organizador: marca como organizador e leva pro dashboard
    e.preventDefault();
    setUser({ ...user!, isOrganizer: true });
    router.push("/gerenciar");
  };

  return (
    <Link
      href={href}
      data-cursor="hover"
      onClick={handleClick}
      className={`${baseClass} ${variantClass[variant]}`}
    >
      <span>{resolvedLabel}</span>
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
