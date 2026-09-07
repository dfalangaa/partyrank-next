"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

type AppHeaderProps = {
  title?: string;
  /** Fallback href when there's no back history (e.g. deep-linked entry). */
  backTo?: string;
  right?: React.ReactNode;
  /** When true, the header floats translucent over the content. Default solid. */
  transparent?: boolean;
};

/**
 * Mobile-only navigation header in the iOS / Material native pattern:
 * chevron back · centered title · optional right slot. On desktop it stays
 * out of the way (returns null) so the marketing Navbar handles wayfinding.
 */
export function AppHeader({ title, backTo, right, transparent }: AppHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window === "undefined") return;
    if (window.history.length > 1) router.back();
    else if (backTo) router.push(backTo);
    else router.push("/");
  };

  const Back = backTo ? (
    <Link
      href={backTo}
      aria-label="voltar"
      className="flex h-9 w-9 items-center justify-center rounded-full text-white/85 active:bg-white/10"
    >
      <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
    </Link>
  ) : (
    <button
      type="button"
      onClick={handleBack}
      aria-label="voltar"
      className="flex h-9 w-9 items-center justify-center rounded-full text-white/85 active:bg-white/10"
    >
      <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
    </button>
  );

  return (
    <header
      className={`sticky top-14 z-30 flex h-12 items-center gap-2 border-b border-white/5 px-2 md:hidden ${
        transparent ? "bg-transparent" : "bg-background/85 backdrop-blur-xl"
      }`}
    >
      {Back}
      <h1 className="flex-1 truncate text-center text-[15px] font-semibold tracking-tight">
        {title}
      </h1>
      <div className="flex h-9 min-w-[36px] items-center justify-end">{right}</div>
    </header>
  );
}
