"use client";

import { Ticket } from "lucide-react";
import type { Party } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { StickyCTA } from "@/components/sticky-cta";
import { openTicketCTA } from "@/components/festa/ticket-cta";

/**
 * Mobile-only sticky bottom buy bar. Shows price + a single primary CTA that
 * fires the existing TicketCTA checkout dialog (which is mounted hidden in the
 * same page so it can listen for the open event).
 */
export function MobileBuyBar({ party }: { party: Party }) {
  return (
    <StickyCTA>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
            a partir de
          </div>
          <div className="text-lg font-medium leading-none tracking-tight">
            {formatPrice(party.price / 100)}
          </div>
        </div>
        <button
          type="button"
          onClick={openTicketCTA}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-5 py-3 text-sm font-medium shadow-lg shadow-violet-500/30 active:scale-[0.98]"
        >
          <Ticket className="h-4 w-4" /> comprar ingresso
        </button>
      </div>
    </StickyCTA>
  );
}
