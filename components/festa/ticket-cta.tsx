"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Plus, Minus, ShieldCheck, Zap } from "lucide-react";
import type { Party } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Dialog, Field, inputClass } from "@/components/ui/dialog";
import { InviteFriends } from "@/components/festa/invite-friends";

const OPEN_EVENT = "partyrank:open-ticket-cta";

export function openTicketCTA() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }
}

export function TicketCTA({
  party,
  hideCard,
}: {
  party: Party;
  /** Hide the card and only render the modal (for mobile sticky bar use). */
  hideCard?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [step, setStep] = useState<"select" | "checkout" | "success">("select");
  const [form, setForm] = useState({ name: "", email: "", cpf: "" });

  // Listen for the external open trigger from the mobile sticky bar.
  useEffect(() => {
    const onOpen = () => {
      setStep("select");
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const fee = Math.round(party.price * 0.05);
  const total = (party.price + fee) * qty;

  return (
    <>
      {!hideCard && (
      <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm md:p-7">
        <div className="mb-1 text-[10px] uppercase tracking-[0.15em] text-white/50">
          ingresso a partir de
        </div>
        <div className="mb-5 flex items-baseline gap-2">
          <span className="text-4xl font-medium tracking-[-0.03em] md:text-5xl">
            {formatPrice(party.price / 100)}
          </span>
        </div>

        <button
          onClick={() => {
            setStep("select");
            setOpen(true);
          }}
          data-cursor="hover"
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 py-3.5 text-sm font-medium shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/50"
        >
          <Ticket className="h-4 w-4" /> comprar ingresso
        </button>

        <div className="mb-6">
          <InviteFriends
            partyId={party.id}
            partyName={party.name}
            partySlug={party.slug}
            partyDate={party.date}
          />
        </div>

        <div className="space-y-2.5 text-sm">
          <Row label="data" value={new Date(party.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })} />
          <Row label="organizador" value={party.organizer} />
          <Row label="avaliação" value={`★ ${party.rating}`} />
          <Row label="público esperado" value={`${party.attendees}`} />
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-300">
          <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>
            pagamento seguro · reembolso até 48h antes do evento · pix, cartão ou boleto
          </span>
        </div>
      </div>
      )}

      {/* Ticket modal — multi-step */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={
          step === "success"
            ? "ingresso confirmado!"
            : step === "checkout"
            ? "checkout"
            : `${party.name}`
        }
        size="lg"
      >
        {step === "select" && (
          <div className="space-y-5">
            <div className="text-sm text-white/65">
              {new Date(party.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}{" "}
              · {party.location}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">ingresso pista</div>
                  <div className="text-xs text-white/50">
                    {formatPrice(party.price / 100)} + R$ {(fee / 100).toFixed(2)} taxa
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-[1.5ch] text-center font-medium">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(8, q + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-lg font-medium">
                <span>total</span>
                <span>{formatPrice(total / 100)}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-3 text-xs text-violet-200">
              <Zap className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                <strong>PartyRank PRO</strong> economiza R$ {(fee / 100).toFixed(2)} de taxa por ingresso. assine por R$9,90/mês.
              </span>
            </div>

            <button
              onClick={() => setStep("checkout")}
              className="w-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 py-3.5 font-medium shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-0.5"
            >
              continuar
            </button>
          </div>
        )}

        {step === "checkout" && (
          <div className="space-y-4">
            <Field label="nome completo">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="seu nome"
                autoFocus
              />
            </Field>
            <Field label="email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="seu@email.com"
              />
            </Field>
            <Field label="cpf">
              <input
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                className={inputClass}
                placeholder="000.000.000-00"
              />
            </Field>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.15em] text-white/50">
                forma de pagamento
              </div>
              <div className="space-y-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 text-sm">
                  <input type="radio" name="pay" defaultChecked className="accent-violet-500" />
                  <span>Pix · pagamento na hora</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm hover:border-white/25">
                  <input type="radio" name="pay" className="accent-violet-500" />
                  <span>Cartão · até 12x sem juros</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base">
              <span className="text-white/65">total</span>
              <span className="text-2xl font-medium">{formatPrice(total / 100)}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep("select")}
                className="flex-1 rounded-full border border-white/15 bg-white/5 py-3 text-sm hover:bg-white/10"
              >
                voltar
              </button>
              <button
                onClick={() => {
                  if (!form.name || !form.email) {
                    alert("preencha nome e email");
                    return;
                  }
                  setStep("success");
                }}
                className="flex-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 text-sm font-medium"
                style={{ flex: 2 }}
              >
                pagar com pix
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/40"
            >
              <Ticket className="h-7 w-7 text-white" />
            </motion.div>
            <h3 className="mb-2 text-2xl font-medium">tá no role!</h3>
            <p className="mb-6 text-white/65">
              {qty} {qty === 1 ? "ingresso" : "ingressos"} pra <strong>{party.name}</strong> reservado(s).
              vamos enviar o QR code pro seu email em alguns segundos.
            </p>
            <button
              onClick={() => {
                setOpen(false);
                setQty(1);
                setStep("select");
                setForm({ name: "", email: "", cpf: "" });
              }}
              className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 text-sm font-medium"
            >
              fechar
            </button>
          </div>
        )}
      </Dialog>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/55">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
