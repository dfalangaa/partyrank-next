import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import { PRMark } from "@/components/pr-mark";
import { PRWordmark } from "@/components/pr-wordmark";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="group flex items-center gap-2">
              <PRMark size={40} variant="outline" className="transition-opacity group-hover:opacity-90" />
              <PRWordmark size="inline" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              o ranking em tempo real das festas universitárias que definem o
              fim de semana em são paulo.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://instagram.com"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol
            title="produto"
            links={[
              { href: "/festas", label: "festas" },
              { href: "/#ranking", label: "ranking" },
              { href: "/gerenciar", label: "dashboard PRO" },
              { href: "/#como-funciona", label: "como funciona" },
            ]}
          />
          <FooterCol
            title="empresa"
            links={[
              { href: "#", label: "sobre" },
              { href: "#", label: "carreira" },
              { href: "#", label: "imprensa" },
              { href: "#", label: "contato" },
            ]}
          />
          <FooterCol
            title="legal"
            links={[
              { href: "#", label: "termos" },
              { href: "#", label: "privacidade" },
              { href: "#", label: "cookies" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© 2026 PartyRank. feito em SP.</p>
          <p>a festa certa, sem perder tempo.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
        {title}
      </div>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-white/60 transition hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
