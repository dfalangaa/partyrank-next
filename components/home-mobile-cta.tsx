"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { StickyCTA } from "@/components/sticky-cta";
import { getUser, onAuthChange } from "@/lib/auth";

/**
 * Sticky-bottom signup nudge that only appears on the homepage for
 * anonymous mobile visitors. Hides immediately once auth completes so we
 * don't pester signed-in users.
 */
export function HomeMobileCTA() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setSignedIn(!!getUser());
    const unsub = onAuthChange(() => setSignedIn(!!getUser()));
    return () => unsub();
  }, []);

  // Render nothing until we know — prevents a flash of CTA for signed-in users
  if (signedIn !== false) return null;

  return (
    <StickyCTA>
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-white/55">grátis · sem cartão</div>
          <div className="text-sm font-medium">vote, salve e seja PRO</div>
        </div>
        <Link
          href="/login?mode=cadastrar"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-5 py-3 text-sm font-medium shadow-lg shadow-violet-500/30 active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" />
          criar conta
        </Link>
      </div>
    </StickyCTA>
  );
}
