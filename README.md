# PartyRank — Next.js

Site profissional de ranking de festas universitárias de SP.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v3** com shadcn/ui
- **Framer Motion** para animações
- **Lucide** para ícones

## Rodar local

```bash
npm install
npm run dev
```

Abre em http://localhost:3000

## Estrutura

```
app/
  page.tsx              # homepage com todas as seções
  festas/page.tsx       # listagem com busca e filtros
  festa/[slug]/page.tsx # página de detalhe
  login/page.tsx        # login split
  gerenciar/page.tsx    # dashboard PRO (kanban, budget, etc)
  layout.tsx            # layout global com background animado
  globals.css           # tokens de design + utilities

components/
  navbar.tsx
  ui/                   # shadcn (button, card, badge)
  sections/             # hero, ranking, featured, marquee, etc.

lib/
  mock-data.ts          # festas, depoimentos, stats
  utils.ts              # helpers (cn, formatPrice)
```

## Features implementadas

- Homepage com 9 seções animadas
- Listagem de festas com busca + filtros + ordenação
- Página de detalhe por slug
- Login split com background image
- Dashboard PRO completo (6 tabs: overview, kanban, budget, team, suppliers, timeline)
- Scroll animations com Framer Motion
- Dark mode nativo (tema festival)
- Responsivo completo
- SEO (metadata)

## Editar

- **Cores / tema:** `app/globals.css` (variáveis HSL)
- **Animações:** `tailwind.config.ts` (keyframes)
- **Dados:** `lib/mock-data.ts`
- **Componentes:** `components/sections/*.tsx`

## Deploy

```bash
npm run build
npm start
```

Ou deploy grátis no **Vercel**: `vercel deploy`

## Conectar com Firebase / Supabase

Substitui o `lib/mock-data.ts` por queries reais. A interface dos componentes
já está tipada em `Party` (veja `mock-data.ts`).
