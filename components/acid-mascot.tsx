"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { getUser, onAuthChange, type User } from "@/lib/auth";

const STORAGE_KEY = "partyrank_mascot_dismissed";
const DISMISS_DURATION_MS = 90_000;
const BUBBLE_INITIAL_DELAY_MS = 1_400;

type Tone = "violet" | "amber" | "emerald" | "rose";
type BearPose =
  | "default"
  | "sleep"
  | "vibe"
  | "vote"
  | "love"
  | "hi"
  | "peek";

type MascotMessage = {
  id: string;
  before: string;
  highlight: string;
  after: string;
  badge: string;
  cta: { label: string; href: string };
  tone: Tone;
  pose: BearPose;
};

function pickMessage(user: User | null, pathname: string): MascotMessage {
  if (pathname.startsWith("/festa/")) {
    return {
      id: "ingresso-festa",
      before: "ÚLTIMOS INGRESSOS —",
      highlight: "garanta o seu",
      after: "ANTES QUE ESGOTE",
      badge: "ao vivo",
      cta: { label: "comprar agora", href: pathname },
      tone: "rose",
      pose: "vibe",
    };
  }
  if (pathname.startsWith("/organizadores") || pathname.startsWith("/premios")) {
    if (user && !user.isOrganizer) {
      return {
        id: "virar-organizador",
        before: "TEM FESTA?",
        highlight: "dispute",
        after: "O TÍTULO DA SUA LIGA",
        badge: "novo",
        cta: { label: "começar agora", href: "/organizadores#planos" },
        tone: "amber",
        pose: "vote",
      };
    }
  }
  if (!user) {
    return {
      id: "cadastro",
      before: "CONTA GRÁTIS E VOCÊ",
      highlight: "desbloqueia",
      after: "O RANKING AO VIVO",
      badge: "live",
      cta: { label: "cadastrar grátis", href: "/login?mode=cadastrar" },
      tone: "violet",
      pose: "hi",
    };
  }
  if (!user.isPro) {
    return {
      id: "virar-pro",
      before: "5% DE CASHBACK,",
      highlight: "vire PRO",
      after: "AGORA",
      badge: "PRO",
      cta: { label: "ativar PRO", href: "/#planos" },
      tone: "violet",
      pose: "love",
    };
  }
  return {
    id: "festas-semana",
    before: "TOP 10 DA SEMANA —",
    highlight: "veja o ranking",
    after: "ATUALIZADO",
    badge: "live",
    cta: { label: "ver ranking", href: "/#ranking" },
    tone: "emerald",
    pose: "default",
  };
}

const toneStyles: Record<
  Tone,
  { dot: string; accent: string; halo: string; ring: string }
> = {
  violet: {
    dot: "bg-violet-300",
    accent: "text-violet-300",
    halo: "rgba(167, 139, 250, 0.42)",
    ring: "rgba(196, 181, 253, 0.55)",
  },
  amber: {
    dot: "bg-amber-300",
    accent: "text-amber-300",
    halo: "rgba(251, 191, 36, 0.42)",
    ring: "rgba(252, 211, 77, 0.55)",
  },
  emerald: {
    dot: "bg-emerald-300",
    accent: "text-emerald-300",
    halo: "rgba(52, 211, 153, 0.42)",
    ring: "rgba(110, 231, 183, 0.55)",
  },
  rose: {
    dot: "bg-rose-300",
    accent: "text-rose-300",
    halo: "rgba(244, 114, 182, 0.45)",
    ring: "rgba(253, 164, 175, 0.55)",
  },
};

type DismissMap = Record<string, number>;

function readDismissMap(): DismissMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const now = Date.now();
      const cleaned: DismissMap = {};
      for (const [id, ts] of Object.entries(parsed)) {
        if (typeof ts === "number" && now - ts < DISMISS_DURATION_MS) {
          cleaned[id] = ts;
        }
      }
      return cleaned;
    }
  } catch {}
  return {};
}

// ============================================================
// URSO POLAR PARTYRANK — flat cartoon premium estilo referência
// + chain Drake. Outline grosso navy, branco puro, lentes pretas,
// expressão calma. Animações em camadas (respira, tilt, swing).
// ============================================================

const STROKE = "#15293f"; // deep navy uniforme
const SHADOW = "#cae0f0"; // icy blue-gray pra sombra do branco
const LENS = "#0a1220"; // lente quase preta com matiz navy
const STROKE_W = {
  body: 4,
  detail: 3,
  arm: 3.5,
  thin: 2,
};

// === Sunglasses (referência: dark sólido, sem neon) ===

function Sunglasses({
  position = "on",
}: {
  position?: "on" | "nose";
}) {
  const offsetY = position === "nose" ? 12 : 0;

  return (
    <g transform={`translate(0 ${offsetY})`}>
      {/* arm to ear left (curto, igual ref) */}
      <path
        d="M 100 110 Q 92 108 88 112"
        stroke={STROKE}
        strokeWidth={STROKE_W.detail}
        fill="none"
        strokeLinecap="round"
      />
      {/* arm to ear right */}
      <path
        d="M 180 110 Q 188 108 192 112"
        stroke={STROKE}
        strokeWidth={STROKE_W.detail}
        fill="none"
        strokeLinecap="round"
      />
      {/* bridge curtinha */}
      <rect x="136" y="110" width="8" height="3.5" rx="1.5" fill={STROKE} />
      {/* left lens — square com cantos arredondados (rx maior, dimensões mais quadradas) */}
      <rect
        x="100"
        y="98"
        width="36"
        height="26"
        rx="9"
        fill={LENS}
        stroke={STROKE}
        strokeWidth={STROKE_W.detail}
      />
      {/* right lens */}
      <rect
        x="144"
        y="98"
        width="36"
        height="26"
        rx="9"
        fill={LENS}
        stroke={STROKE}
        strokeWidth={STROKE_W.detail}
      />
      {/* highlights estáticos no canto superior — igual ref */}
      <ellipse cx={108} cy={104} rx={5} ry={2} fill="#ffffff" opacity={0.4} />
      <ellipse cx={152} cy={104} rx={5} ry={2} fill="#ffffff" opacity={0.4} />
      {/* flash sutil ocasional (não move, só brilha brevemente a cada ~6s) */}
      <motion.g
        animate={{ opacity: [0, 0, 0.65, 0, 0] }}
        transition={{
          times: [0, 0.85, 0.9, 0.95, 1],
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <rect x="100" y="98" width="36" height="26" rx="9" fill="#ffffff" />
        <rect x="144" y="98" width="36" height="26" rx="9" fill="#ffffff" />
      </motion.g>
    </g>
  );
}

function PeekEye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={6} ry={7} fill={STROKE} />
      <circle cx={cx + 1.5} cy={cy - 2} r={2} fill="#fff" />
    </g>
  );
}

// === Paw — chunky, simple ===

function Paw({
  cx,
  cy,
  rot = 0,
  scale = 1,
  variant = "fist",
}: {
  cx: number;
  cy: number;
  rot?: number;
  scale?: number;
  variant?: "fist" | "peace" | "open";
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${scale})`}>
      <ellipse
        cx={0}
        cy={0}
        rx={13}
        ry={12}
        fill="#ffffff"
        stroke={STROKE}
        strokeWidth={STROKE_W.detail}
      />

      {variant === "peace" && (
        <g>
          <rect
            x={-6}
            y={-26}
            width={5}
            height={18}
            rx={2.5}
            fill="#ffffff"
            stroke={STROKE}
            strokeWidth={STROKE_W.detail}
          />
          <rect
            x={1}
            y={-26}
            width={5}
            height={18}
            rx={2.5}
            fill="#ffffff"
            stroke={STROKE}
            strokeWidth={STROKE_W.detail}
          />
        </g>
      )}
    </g>
  );
}

// === Bear body ===

function PolarBear({ pose = "default", size = 168 }: { pose?: BearPose; size?: number }) {
  const sleep = pose === "sleep";
  const vibe = pose === "vibe";
  const vote = pose === "vote";
  const love = pose === "love";
  const hi = pose === "hi";
  const peek = pose === "peek";

  const uid = useId().replace(/:/g, "");
  const pendantGrad = `bearPendant-${uid}`;
  const chainGrad = `bearChain-${uid}`;

  return (
    <svg
      viewBox="0 0 280 280"
      width={size}
      height={size}
      className="overflow-visible"
      style={{
        filter:
          "drop-shadow(0 18px 26px rgba(21, 41, 63, 0.32)) drop-shadow(0 6px 12px rgba(192, 132, 252, 0.18))",
      }}
    >
      <defs>
        {/* PR pendant gold */}
        <linearGradient id={pendantGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        {/* chain gold */}
        <linearGradient id={chainGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {/* GROUND SHADOW (pulsa com respiração) */}
      <motion.ellipse
        cx={140}
        cy={262}
        rx={66}
        ry={5}
        fill="rgba(21, 41, 63, 0.4)"
        animate={{ scaleX: [1, 0.94, 1], opacity: [0.4, 0.32, 0.4] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "140px 262px" }}
      />

      {/* RESPIRAÇÃO + TILT — wrapper anima o corpo todo */}
      <motion.g
        animate={{ scale: [1, 1.018, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "140px 200px" }}
      >
        {/* BACK LEGS (chunky, cartoon style) */}
        <g>
          <ellipse
            cx={108}
            cy={252}
            rx={20}
            ry={11}
            fill="#ffffff"
            stroke={STROKE}
            strokeWidth={STROKE_W.body}
          />
          <ellipse
            cx={172}
            cy={252}
            rx={20}
            ry={11}
            fill="#ffffff"
            stroke={STROKE}
            strokeWidth={STROKE_W.body}
          />
          <ellipse cx={108} cy={254} rx={10} ry={3} fill={SHADOW} opacity={0.7} />
          <ellipse cx={172} cy={254} rx={10} ry={3} fill={SHADOW} opacity={0.7} />
        </g>

        {/* BODY — pear shape, mais largo no quadril (igual referência) */}
        <path
          d="M 88 184
             C 88 162 104 152 140 152
             C 176 152 192 162 192 184
             C 196 222 178 252 140 254
             C 102 252 84 222 88 184 Z"
          fill="#ffffff"
          stroke={STROKE}
          strokeWidth={STROKE_W.body}
          strokeLinejoin="round"
        />
        {/* belly separation */}
        <path
          d="M 108 198
             C 108 180 120 170 140 170
             C 160 170 172 180 172 198
             C 172 218 158 230 140 230
             C 122 230 108 218 108 198 Z"
          fill="none"
          stroke={SHADOW}
          strokeWidth={STROKE_W.thin}
          opacity={0.85}
        />

        {/* TANK TOP — roupa de festa, cropped, V-neck */}
        <g>
          <defs>
            <linearGradient id={`tank-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#2d1b4e" />
            </linearGradient>
            <linearGradient id={`tankTrim-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          {/* tank fabric — cobre ombros e peito superior, V-neck */}
          <path
            d="M 96 152
               L 110 156
               L 130 174
               L 140 186
               L 150 174
               L 170 156
               L 184 152
               L 188 200
               L 92 200 Z"
            fill={`url(#tank-${uid})`}
            stroke={STROKE}
            strokeWidth={STROKE_W.detail}
            strokeLinejoin="round"
          />
          {/* trim neon na barra de baixo */}
          <path
            d="M 92 200 L 188 200"
            stroke={`url(#tankTrim-${uid})`}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
          {/* trim neon no V-neck */}
          <path
            d="M 110 156 L 130 174 L 140 186 L 150 174 L 170 156"
            stroke={`url(#tankTrim-${uid})`}
            strokeWidth={2.2}
            fill="none"
            strokeLinejoin="round"
          />
          {/* small "PR" graphic on chest */}
          <text
            x={140}
            y={196}
            textAnchor="middle"
            fontSize={11}
            fontWeight={900}
            fontFamily="ui-monospace, monospace"
            fill={`url(#tankTrim-${uid})`}
            letterSpacing={1}
            opacity={0.95}
          >
            PR
          </text>
        </g>

        {/* PR PENDANT chain (Cuban link) — pendulum swing */}
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "140px 138px" }}
        >
          {/* chain links arc */}
          {Array.from({ length: 9 }).map((_, i) => {
            const t = i / 8;
            const x = 116 + t * 48;
            const y = 142 + Math.sin(t * Math.PI) * 12;
            const rot = (t - 0.5) * 50;
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
                <ellipse
                  cx={0}
                  cy={0}
                  rx={4}
                  ry={2.4}
                  fill={`url(#${chainGrad})`}
                  stroke={STROKE}
                  strokeWidth={1.2}
                />
                <ellipse cx={0} cy={-0.6} rx={2.4} ry={0.9} fill="#fef9c3" opacity={0.7} />
              </g>
            );
          })}
          {/* pendant — diamond PR */}
          <g transform="translate(140 174)">
            <path
              d="M 0 -16 L 16 0 L 0 16 L -16 0 Z"
              fill={`url(#${pendantGrad})`}
              stroke={STROKE}
              strokeWidth={STROKE_W.detail}
              strokeLinejoin="round"
            />
            <path
              d="M 0 -10 L 10 0 L 0 10 L -10 0 Z"
              fill="none"
              stroke="#92400e"
              strokeWidth={1}
              opacity={0.5}
            />
            <text
              x={0}
              y={3.5}
              textAnchor="middle"
              fontSize={10}
              fontWeight={900}
              fontFamily="ui-monospace, monospace"
              fill={STROKE}
              letterSpacing={0.5}
            >
              PR
            </text>
            <path
              d="M -8 -4 L -2 -10"
              stroke="#fffbeb"
              strokeWidth={1.6}
              strokeLinecap="round"
              opacity={0.8}
            />
          </g>
        </motion.g>

        {/* HEAD — proporção igual ref (cabeça ≤ corpo), tilt independente sutil */}
        <motion.g
          animate={{ rotate: [-1.5, 1, -1.5] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "140px 108px" }}
        >
          {/* EARS — menores, posicionadas no topo do head menor */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.78, 1, 1] }}
            transition={{
              times: [0, 0.45, 0.5, 0.55, 1],
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "100px 76px" }}
          >
            <ellipse
              cx={100}
              cy={76}
              rx={11}
              ry={10}
              fill="#ffffff"
              stroke={STROKE}
              strokeWidth={STROKE_W.body}
            />
            <path
              d="M 98 80 Q 102 73 105 80"
              stroke={STROKE}
              strokeWidth={STROKE_W.thin}
              fill="none"
              strokeLinecap="round"
              opacity={0.85}
            />
          </motion.g>
          <motion.g
            animate={{ scaleY: [1, 1, 0.78, 1, 1] }}
            transition={{
              times: [0, 0.45, 0.5, 0.55, 1],
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.18,
            }}
            style={{ transformOrigin: "180px 76px" }}
          >
            <ellipse
              cx={180}
              cy={76}
              rx={11}
              ry={10}
              fill="#ffffff"
              stroke={STROKE}
              strokeWidth={STROKE_W.body}
            />
            <path
              d="M 175 80 Q 178 73 182 80"
              stroke={STROKE}
              strokeWidth={STROKE_W.thin}
              fill="none"
              strokeLinecap="round"
              opacity={0.85}
            />
          </motion.g>

          {/* head main — menor, equilibrada com corpo */}
          <ellipse
            cx={140}
            cy={108}
            rx={54}
            ry={46}
            fill="#ffffff"
            stroke={STROKE}
            strokeWidth={STROKE_W.body}
          />
          {/* subtle shadow on bottom-right */}
          <path
            d="M 188 112
               C 184 134 170 146 150 150
               L 152 134
               C 168 132 180 124 186 112 Z"
            fill={SHADOW}
            opacity={0.5}
          />

          {/* SNOUT — pequeno, abaixo dos óculos */}
          <ellipse cx={140} cy={134} rx={20} ry={14} fill="#ffffff" stroke={STROKE} strokeWidth={STROKE_W.thin} opacity={0.95} />

          {/* NOSE — small triangle (mais discreto) */}
          <path
            d="M 136 126
               Q 140 122 144 126
               Q 142 132 140 132
               Q 138 132 136 126 Z"
            fill={STROKE}
          />

          {/* MOUTH */}
          {(() => {
            if (sleep)
              return (
                <path
                  d="M 136 142 Q 140 145 144 142"
                  stroke={STROKE}
                  strokeWidth={STROKE_W.thin}
                  fill="none"
                  strokeLinecap="round"
                />
              );
            if (vibe || hi)
              return (
                <path
                  d="M 130 138 Q 140 150 150 138 Q 140 146 130 138 Z"
                  fill={STROKE}
                />
              );
            // default + vote + love + peek — boquinha calma minúscula (igual ref)
            return (
              <path
                d="M 138 138 Q 140 142 142 138"
                stroke={STROKE}
                strokeWidth={STROKE_W.thin}
                fill="none"
                strokeLinecap="round"
              />
            );
          })()}

          {/* SUNGLASSES */}
          {peek ? (
            <g>
              <Sunglasses position="nose" />
              <PeekEye cx={114} cy={104} />
              <PeekEye cx={166} cy={104} />
            </g>
          ) : (
            <Sunglasses position="on" />
          )}
        </motion.g>

        {/* ARMS — pose-specific (gentle bob com breath via wrapper) */}
        {(() => {
          if (vibe)
            return (
              <motion.g
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "140px 175px" }}
              >
                <path d="M 92 168 Q 70 130 64 84" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                <path d="M 92 168 Q 70 130 64 84" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                <path d="M 188 168 Q 210 130 216 84" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                <path d="M 188 168 Q 210 130 216 84" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                <Paw cx={64} cy={82} rot={-25} variant="open" />
                <Paw cx={216} cy={82} rot={25} variant="open" />
              </motion.g>
            );
          if (vote)
            return (
              <g>
                {/* left at side */}
                <path d="M 96 178 Q 76 200 80 226" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                <path d="M 96 178 Q 76 200 80 226" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                <Paw cx={80} cy={228} rot={-15} variant="open" />
                {/* right raised w/ mic */}
                <motion.g
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "184px 168px" }}
                >
                  <path d="M 184 168 Q 218 130 222 80" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                  <path d="M 184 168 Q 218 130 222 80" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                  <g transform="translate(222 80)">
                    <Paw cx={0} cy={0} variant="fist" />
                    <rect x={-3} y={-26} width={6} height={20} fill={STROKE} stroke={STROKE} strokeWidth={1} rx={1} />
                    <ellipse cx={0} cy={-30} rx={7} ry={8} fill={STROKE} />
                    <g fill="#888" opacity={0.7}>
                      <circle cx={-3} cy={-30} r={1} />
                      <circle cx={0} cy={-32} r={1} />
                      <circle cx={3} cy={-30} r={1} />
                      <circle cx={-2} cy={-28} r={1} />
                      <circle cx={2} cy={-28} r={1} />
                    </g>
                  </g>
                </motion.g>
              </g>
            );
          if (hi)
            return (
              <g>
                <path d="M 96 178 Q 76 200 80 226" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                <path d="M 96 178 Q 76 200 80 226" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                <Paw cx={80} cy={228} rot={-15} variant="open" />
                <motion.g
                  animate={{ rotate: [-22, 8, -22] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "184px 170px" }}
                >
                  <path d="M 184 170 Q 220 130 226 78" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                  <path d="M 184 170 Q 220 130 226 78" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                  <Paw cx={226} cy={76} rot={20} variant="open" />
                </motion.g>
              </g>
            );
          if (peek)
            return (
              <g>
                <path d="M 102 168 Q 104 142 112 124" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                <path d="M 102 168 Q 104 142 112 124" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                <path d="M 178 168 Q 176 142 168 124" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                <path d="M 178 168 Q 176 142 168 124" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                <Paw cx={112} cy={124} variant="open" />
                <Paw cx={168} cy={124} variant="open" />
              </g>
            );
          if (love)
            return (
              <g>
                {/* left at side */}
                <path d="M 96 178 Q 76 200 80 226" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                <path d="M 96 178 Q 76 200 80 226" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                <Paw cx={80} cy={228} rot={-15} variant="open" />
                {/* right pulling chain (flex pose) */}
                <motion.g
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M 184 174 Q 178 162 158 156" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
                  <path d="M 184 174 Q 178 162 158 156" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
                  <Paw cx={156} cy={156} rot={-30} variant="fist" />
                </motion.g>
              </g>
            );
          // DEFAULT — braços abertos estilo referência (welcome/T-pose)
          return (
            <g>
              <path d="M 92 178 Q 64 196 50 224" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
              <path d="M 92 178 Q 64 196 50 224" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
              <Paw cx={50} cy={226} rot={-30} variant="open" />
              <path d="M 188 178 Q 216 196 230 224" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" />
              <path d="M 188 178 Q 216 196 230 224" stroke={STROKE} strokeWidth={STROKE_W.arm} fill="none" strokeLinecap="round" />
              <Paw cx={230} cy={226} rot={30} variant="open" />
            </g>
          );
        })()}
      </motion.g>

      {/* DECORATIONS */}
      {sleep && (
        <g
          fill="#ffffff"
          fontFamily="ui-monospace, monospace"
          fontWeight={700}
          stroke={STROKE}
          strokeWidth={1}
        >
          <motion.text
            x={224}
            y={66}
            fontSize={20}
            animate={{ y: [66, 50], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          >
            z
          </motion.text>
          <motion.text
            x={244}
            y={48}
            fontSize={14}
            animate={{ y: [48, 32], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
          >
            z
          </motion.text>
          <motion.text
            x={258}
            y={36}
            fontSize={10}
            animate={{ y: [36, 20], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 2 }}
          >
            z
          </motion.text>
        </g>
      )}
      {love && (
        <g stroke={STROKE} strokeWidth={1.4}>
          <motion.path
            d="M 32 56 l 2.5 6 l 6 2.5 l -6 2.5 l -2.5 6 l -2.5 -6 l -6 -2.5 l 6 -2.5 z"
            fill={`url(#${pendantGrad})`}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "32px 65px" }}
          />
          <motion.path
            d="M 250 38 l 1.5 4 l 4 1.5 l -4 1.5 l -1.5 4 l -1.5 -4 l -4 -1.5 l 4 -1.5 z"
            fill={`url(#${pendantGrad})`}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{ transformOrigin: "252px 45px" }}
          />
          <motion.path
            d="M 240 110 l 1.5 4 l 4 1.5 l -4 1.5 l -1.5 4 l -1.5 -4 l -4 -1.5 l 4 -1.5 z"
            fill={`url(#${pendantGrad})`}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{ transformOrigin: "242px 117px" }}
          />
        </g>
      )}
      {vibe && (
        <g stroke={STROKE} strokeWidth={1.2}>
          <motion.path
            d="M 32 56 l 2.5 6 l 6 2.5 l -6 2.5 l -2.5 6 l -2.5 -6 l -6 -2.5 l 6 -2.5 z"
            fill="#fcd34d"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "32px 65px" }}
          />
          <motion.path
            d="M 250 38 l 2 5 l 5 2 l -5 2 l -2 5 l -2 -5 l -5 -2 l 5 -2 z"
            fill="#fcd34d"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "252px 45px" }}
          />
        </g>
      )}

      {/* Ambient sparkles */}
      <g>
        <motion.circle
          cx={48}
          cy={56}
          r={1.6}
          fill="#fff"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx={236}
          cy={40}
          r={1.4}
          fill="#fcd34d"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx={20}
          cy={140}
          r={1.2}
          fill="#c4b5fd"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: 2 }}
        />
      </g>
    </svg>
  );
}

// ============================================================
// MASCOT WRAPPER (engrenagem externa intacta)
// ============================================================

export function AcidMascot() {
  const pathname = usePathname() || "/";
  const [user, setUserState] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState<DismissMap>({});
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [, forceTick] = useState(0);

  useEffect(() => {
    setUserState(getUser());
    setDismissed(readDismissMap());
    setHydrated(true);
    return onAuthChange(() => setUserState(getUser()));
  }, []);

  const message = pickMessage(user, pathname);

  const dismissedAt = dismissed[message.id];
  const remaining = dismissedAt ? DISMISS_DURATION_MS - (Date.now() - dismissedAt) : 0;
  const isDismissed = remaining > 0;

  useEffect(() => {
    if (!hydrated || isDismissed) {
      setBubbleOpen(false);
      return;
    }
    const t = setTimeout(() => setBubbleOpen(true), BUBBLE_INITIAL_DELAY_MS);
    return () => clearTimeout(t);
  }, [hydrated, isDismissed, message.id]);

  useEffect(() => {
    if (!isDismissed) return;
    const timer = setTimeout(() => {
      setDismissed((prev) => {
        const next = { ...prev };
        delete next[message.id];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
      forceTick((n) => n + 1);
    }, remaining);
    return () => clearTimeout(timer);
  }, [isDismissed, message.id, remaining]);

  const handleDismiss = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next: DismissMap = { ...dismissed, [message.id]: Date.now() };
    setDismissed(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const toggleBubble = () => setBubbleOpen((v) => !v);

  if (!hydrated || isDismissed) return null;

  const tone = toneStyles[message.tone];

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[55] flex items-end gap-3 md:bottom-6 md:right-6">
      {/* Speech bubble */}
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative max-w-[240px] rounded-2xl border border-white/10 bg-background/95 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <div className="relative px-4 py-3 pr-8">
              <div
                className={`mb-1.5 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.22em] ${tone.accent}`}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full ${tone.dot} opacity-75`}
                  />
                  <span
                    className={`relative inline-flex h-1.5 w-1.5 rounded-full ${tone.dot}`}
                  />
                </span>
                {message.badge}
              </div>

              <p className="mb-2.5 text-[12px] font-medium leading-snug text-white/90">
                {message.before}{" "}
                <span className="font-serif italic font-normal gradient-text text-[15px]">
                  {message.highlight}
                </span>{" "}
                <span className="text-white/65">{message.after.toLowerCase()}</span>
              </p>

              <Link
                href={message.cta.href}
                className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-bold lowercase tracking-wide text-black transition-all hover:-translate-y-0.5"
              >
                <span>{message.cta.label}</span>
                <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <button
              onClick={handleDismiss}
              aria-label="dispensar mensagem"
              className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-2.5 w-2.5" />
            </button>

            <div className="absolute -right-1.5 bottom-6 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-background/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascote — Urso Polar */}
      <motion.button
        type="button"
        onClick={toggleBubble}
        aria-label={bubbleOpen ? "fechar mensagem" : "abrir mensagem"}
        className="pointer-events-auto group relative flex items-center justify-center"
        style={{ width: 168, height: 168 }}
        whileHover={{ scale: 1.06, y: -4 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        <span
          className="pointer-events-none absolute inset-2 -z-10 rounded-full blur-2xl transition-colors duration-500"
          style={{ background: tone.halo }}
        />
        {!bubbleOpen && (
          <span
            className="pointer-events-none absolute inset-3 animate-[mascotPulseRing_2.2s_ease-out_infinite] rounded-full ring-2 transition-colors duration-500"
            style={{
              borderColor: "transparent",
              boxShadow: `inset 0 0 0 2px ${tone.ring}`,
            }}
          />
        )}
        <PolarBear pose={message.pose} size={168} />
      </motion.button>
    </div>
  );
}
