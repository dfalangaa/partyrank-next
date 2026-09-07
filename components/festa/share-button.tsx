"use client";

import { Share2 } from "lucide-react";
import { showToast } from "@/components/toast";

type ShareButtonProps = {
  title: string;
  text: string;
  /**
   * Path relative to the current host (e.g. "/festa/noite-colorida-usp"). The
   * full URL is built at click time so it works both in dev and prod without
   * hardcoding the domain.
   */
  path: string;
  /** Icon-only variant for cards / tight headers. */
  compact?: boolean;
};

export async function sharePartyLink({
  title,
  text,
  path,
}: Omit<ShareButtonProps, "compact">) {
  const url =
    typeof window === "undefined" ? path : new URL(path, window.location.origin).toString();

  // Native sheet on mobile
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      showToast("compartilhado");
      return;
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") return;
    }
  }

  // Desktop fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(url);
    showToast("link copiado");
  } catch {
    window.prompt("copia o link aí:", url);
  }
}

export function ShareButton({ title, text, path, compact }: ShareButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sharePartyLink({ title, text, path });
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="compartilhar"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/80 backdrop-blur transition hover:border-white/35 hover:bg-black/45"
      >
        <Share2 className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor="hover"
      aria-label="compartilhar"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/10"
    >
      <Share2 className="h-4 w-4" />
      compartilhar
    </button>
  );
}
