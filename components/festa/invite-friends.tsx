"use client";

import { useEffect, useState } from "react";
import { UserPlus, Users } from "lucide-react";
import { sharePartyLink } from "@/components/festa/share-button";
import { showToast } from "@/components/toast";

/**
 * Stable per-browser referral handle so we can attribute future signups back
 * to the inviter. Stored client-side only — when auth lands, we'll migrate to
 * the user's account id.
 */
function getOrCreateRef() {
  if (typeof window === "undefined") return "";
  const k = "partyrank_ref";
  let v = localStorage.getItem(k);
  if (!v) {
    v = Math.random().toString(36).slice(2, 8);
    localStorage.setItem(k, v);
  }
  return v;
}

function readInvitesSent(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("partyrank_invites_sent") || "{}");
  } catch {
    return {};
  }
}

function markInvited(partyId: string, ref: string) {
  if (typeof window === "undefined") return;
  const all = readInvitesSent();
  const arr = all[partyId] || [];
  if (!arr.includes(ref)) arr.push(ref);
  all[partyId] = arr;
  localStorage.setItem("partyrank_invites_sent", JSON.stringify(all));
}

export function InviteFriends({
  partyId,
  partyName,
  partySlug,
  partyDate,
}: {
  partyId: string;
  partyName: string;
  partySlug: string;
  partyDate: string;
}) {
  const [ref, setRef] = useState("");
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    setRef(getOrCreateRef());
    setSentCount((readInvitesSent()[partyId] || []).length);
  }, [partyId]);

  const handleInvite = async () => {
    const d = new Date(partyDate).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
    });
    await sharePartyLink({
      title: partyName,
      text: `bora nessa? ${partyName} dia ${d}. vê o ranking aqui:`,
      path: `/festa/${partySlug}?ref=${ref}`,
    });
    // Track local — the actual sharePartyLink already toasts on copy/share,
    // so we just bump the counter and persist.
    markInvited(partyId, `t${Date.now()}`);
    setSentCount((c) => c + 1);
  };

  return (
    <button
      type="button"
      onClick={handleInvite}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-100 transition hover:border-violet-400/60 hover:bg-violet-500/20"
    >
      <UserPlus className="h-4 w-4" />
      <span>chamar a galera</span>
      {sentCount > 0 && (
        <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-violet-500/30 px-2 py-0.5 text-[10px] font-bold tabular-nums text-violet-100">
          <Users className="h-3 w-3" /> {sentCount}
        </span>
      )}
    </button>
  );
}
