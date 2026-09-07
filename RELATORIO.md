# Relatório de implementação — PartyRank

Documento vivo. Atualiza a cada leva de mudanças no site.

---

## Leva 01 — 2026-05-01

**Objetivo:** materializar visualmente as ideias #02 (Placar das Ligas), #01 (Prêmio Anual) e #05 (Marketplace PRO + Listing Fee) com mock data, sem backend.

### O que foi entregue

#### 1. Refatoração de modelo de dados (`lib/mock-data.ts`)
- Adicionados tipos: `Tier` (aberto/verificado/oficial), `League` (universitaria/clubs/coletivos), `OrganizerType`, `Organizer`.
- Adicionado `tierMeta` e `leagueMeta` com cores, descrições e identidade visual de cada camada/liga.
- Criada lista `organizers` com 15 organizadores reais cobrindo as 3 ligas.
- Tipo `Party` ganhou os campos `organizerSlug` e `tier`.
- Mock de festas expandido de 12 → 27 festas distribuídas pelas 3 ligas (USP, FGV, Insper, Mack, PUC, ESPM; Audio, D-Edge, Warung, Villa Mix, Fabrique; NEON, Tribe, T4F, Mamba Negra). Cada organizador tem 1–4 festas pra a tabela ficar viva.

#### 2. Motor de pontuação das ligas (`lib/leagues.ts`)
- `leagueStandings(league)` → ordena os organizadores da liga por pontos, média e número de festas.
- `leagueLeader(league)` → líder da liga.
- `partiesByOrganizer(slug)` / `getOrganizer(slug)` / `organizersByLeague(league)`.
- Pontuação base: `nota × 10` (festa 4.7 = 47 pts). Empate: maior média.
- Mock de tendência (up/down/flat) por organizador via hash do slug.

#### 3. Rota `/ligas` — Placar das Ligas (Fase 1)
- Hero com 3 cards de líderes (atalho pra cada liga via âncora).
- Tabela completa por liga: posição (com pódio dourado/prata/bronze nos 3 primeiros), organizador + descrição, festas, média, pontos, indicador de tendência, barra de progresso relativa ao líder.
- Layout responsivo com versão mobile compacta.
- Bloco "como pontua" + CTA pra `/organizadores`.

#### 4. Seção "Brasileirão da Noite SP" na home (`components/sections/leagues-preview.tsx`)
- Inserida após `<Ranking />` e antes de `<Stats />` em `app/page.tsx`.
- 3 cards (1 por liga) mostrando: líder com pontos em destaque + 2º e 3º lugares + CTA "ver tabela completa".
- Mantém o vocabulário visual do site (rounded-3xl, gradients, glow, framer-motion).

#### 5. Rota `/premios` — landing do Prêmio Anual
- Hero com posicionamento ("o oscar da noite SP").
- 3 categorias por liga (Universidade do Ano, Club do Ano, Coletivo do Ano).
- 6 categorias gerais cruzando ligas (Festa do Ano, Melhor Line-up etc).
- 4 categorias por nicho de formato (Calourada, Rave, Rooftop, Avulsa).
- Bloco "como funciona" — voto popular (50%) + júri técnico (50%) + selo permanente.
- Calendário em 3 fases (nov / dez / jan).
- CTA pra `/organizadores`.

#### 6. Rota `/organizadores` — funil PRO
- Hero com posicionamento ("mais que ranking, parceiro de festa").
- Comparativo das 3 camadas (Aberta / Verificada / Oficial) com checklist de features.
- Bloco "Marketplace PRO" listando 5 categorias de fornecedor (Estrutura, Operação, Bar/comida, Talento, Marketing).
- Fluxo de "Direcionamento Estratégico" em 5 passos (Briefing → Playbook → Sugestão → Conta-gerente → Pós-festa).
- Bloco de benefícios (Disputa Placar, Concorre Prêmio, Distribuição, Identidade própria).
- CTA de contato via mailto provisório.

#### 7. Navbar atualizada (`components/navbar.tsx`)
- Links públicos: `festas`, `ligas`, `prêmios`, `mapa`, `pra organizadores`.
- `gerenciar` e `perfil` saíram do menu principal (continuam acessíveis pelo dropdown do usuário logado).

#### 8. Metadata global (`app/layout.tsx`)
- Title e description ajustados pra refletir escopo amplo (universitárias + clubs + raves + eventos), não apenas universitário.

---

### O que NÃO entrou nessa leva (e por quê)

| Item | Motivo |
|---|---|
| Rank de DJs / página de DJ | Precisa modelar `lineup` em cada festa + criar 30+ DJs. Vira sub-projeto próprio. |
| Marketplace PRO transacional | Precisa auth real, fornecedores reais, escrow. Por enquanto é landing comercial. |
| Hall da Fama | Adiada por decisão do Davi — esperar produto ganhar tração. |
| Voto verificado / check-in | Precisa app mobile / integração com portaria. |
| Pagamento real (listing fee, ingresso) | Precisa Stripe/Mercado Pago integrado. |
| Página de Atlética/Club/Coletivo (perfil do organizador) | Próximo grande passo — alimenta o portfólio público mencionado nas ideias 04 e 05. |

---

### Status do build

- Dev server **rodando** em `http://localhost:3000`.
- Todas as rotas testadas (HTTP 200): `/`, `/ligas`, `/premios`, `/organizadores`, `/festas`, `/festa/[slug]`, `/mapa`, `/gerenciar`.
- Refatoração de `mock-data.ts` foi aditiva (campos novos, nenhum removido) — rotas existentes não quebraram.
- Warnings pré-existentes do Tailwind sobre classes arbitrárias `duration-[1200ms]` / `ease-[cubic-bezier(...)]` permanecem; não são desta leva.

### Próximos passos sugeridos

1. **Validar visualmente** rodando `npm run dev` e percorrendo: home → `/ligas` → `/premios` → `/organizadores`.
2. **Ajustar copy / hierarquia** com base no feedback do Davi.
3. Página individual do organizador (`/organizadores/[slug]`) — ranking dele, histórico, festas, selos. Fechado o ciclo do Placar.
4. Modelar `lineup` em `Party` + tipo `DJ` pra começar Rank de DJs (ideia 04, Fase 1).
5. Conectar página de festa atual com `tier` (mostrar selo Oficial/Verificada na página de detalhe).

---

### Arquivos criados nesta leva

- `lib/leagues.ts`
- `app/ligas/page.tsx`
- `app/premios/page.tsx`
- `app/organizadores/page.tsx`
- `components/sections/leagues-preview.tsx`
- `RELATORIO.md` (este documento)

### Arquivos modificados nesta leva

- `lib/mock-data.ts` (refatoração + mock expandido)
- `app/page.tsx` (insere `<LeaguesPreview />`)
- `app/layout.tsx` (metadata)
- `components/navbar.tsx` (links principais)

---

## Leva 02 — 2026-05-01 (mesmo dia)

**Objetivo:** adicionar plano **Solo** entre Verificada e Oficial — pra organizador autônomo / festa pontual.

### Mudanças

- **Tier `"solo"`** adicionado em `lib/mock-data.ts` com cor rosa/coral (`from-rose-400 to-pink-500`).
- **`tierMeta.solo`** com label, descrição e cor.
- **`/organizadores`**: novo card Solo entre Verificada e Oficial:
  - Preço: **R$ 149 por festa** (taxa única) + 6% de fee no ingresso.
  - Posicionamento: organizador autônomo, festa pontual, MEI, freelancer.
  - Inclui: vende ingresso, página oficial, selo Solo, templates prontos, dashboard simplificado, suporte por email.
  - Não inclui: contratação no marketplace, direcionamento estratégico, conta-gerente.
- Grid dos planos virou responsivo `sm:grid-cols-2 xl:grid-cols-4` pra acomodar 4 cards sem ficar apertado.
- Cards reordenados: Aberta → Verificada → **Solo** → Oficial (preço crescente).

---

## Leva 03 — 2026-05-01 (mesmo dia)

**Objetivo:** ajustes de tom e navegação após primeiro feedback do Davi.

### Mudanças

- **Navbar:** link `ranking` (que apontava pra `/#ranking`) voltou a aparecer entre `festas` e `ligas`. Foi removido por engano na Leva 01.
- **Tom mais profissional:** todas as referências a "brasileirão" foram trocadas por vocabulário mais institucional.
  - Home (`leagues-preview`): título mudou de "o brasileirão da noite SP" → **"ranking oficial das ligas"**. Eyebrow virou "disputa institucional".
  - `/ligas`: eyebrow virou "placar oficial — temporada 2026". Subtítulo perdeu a referência a "Brasileirão paralelo, torcidas próprias" — agora soa mais Forbes que rede social.

---

## Leva 04 — 2026-05-01 (mesmo dia)

**Objetivo:** consolidar Ranking + Ligas em uma única seção com abas, reduzindo poluição da home e da navbar.

### Mudanças

- **`components/sections/ranking.tsx` reescrita** com tabs internas:
  - Tab "festas" — top 10 com filtros por categoria (conteúdo anterior).
  - Tab "ligas" — 3 cards de placar institucional (Universitária, Clubs, Coletivos) com líder + 2º + 3º.
  - Pill toggle no topo, filtros de categoria só aparecem quando tab = festas.
  - CTA do footer também muda conforme aba ("ver ranking completo" → `/festas` · "ver tabela completa" → `/ligas`).
- **Seção `<LeaguesPreview />` removida da home** (`app/page.tsx`) — virou aba dentro do Ranking.
- **Navbar limpa:** link `ligas` removido. Agora: `festas · ranking · prêmios · mapa · pra organizadores` (5 links). Quem quiser placar das ligas, abre Ranking → aba Ligas, ou clica em "ver tabela completa" pra ir ao `/ligas`.
- **`/ligas` continua existindo** como página completa pra quem quiser tabela detalhada — só não é mais entrada principal pela navbar.

---

## Leva 05 — 2026-05-01 (mesmo dia)

**Objetivo:** corrigir bugs do cadastro/login reportados pelo Davi.

### Bugs identificados

1. **(a) Submit silencioso** — formulário de cadastro fazia `return` sem mensagem se algum campo obrigatório estivesse vazio. Usuário clicava em "criar conta" e nada acontecia.
2. **(b) Sem reflexo de auth na navbar** — após criar conta com `router.push("/")` (navegação client-side), o componente `Navbar` continuava montado e o `useEffect` que lia o user do localStorage só rodava uma vez. Usuário "logava" mas a navbar continuava mostrando entrar/cadastrar.

### Correções

#### `lib/auth.ts`
- `setUser` e `logout` agora **emitem evento custom** `partyrank:auth-change`.
- Novo helper `onAuthChange(callback)` que assina o evento custom + `storage` event (cobre cross-tab) e retorna função pra cancelar.

#### `components/navbar.tsx`
- `useEffect` agora assina `onAuthChange` pra atualizar o estado do user ao vivo (depois de cadastro/login/logout em qualquer parte do app).

#### `app/login/LoginContent.tsx`
- **Validação real**: regex de email, senha mínima de 6 caracteres, nome ≥ 2 chars (no cadastro).
- **Mensagens de erro inline** abaixo de cada campo, com cor rose-300 e ícone `AlertCircle`. Borda do input fica vermelha quando há erro.
- **Mensagem geral** de erro acima do botão pra falhas inesperadas (`errors.form`).
- Erros do campo limpam automaticamente quando o usuário começa a digitar nele.
- Erros são limpos quando alterna entre `entrar`/`cadastrar` (já que campos obrigatórios mudam).
- `noValidate` no `<form>` pra desabilitar a validação nativa do browser e usar só a nossa.
- **Hard reload no redirect** (`window.location.href = "/"`) substitui `router.push` — garantia extra de que toda UI sincroniza pós-login. O evento custom já cobriria, mas hard reload é à prova de qualquer estado em cache.
- Botão de submit ganha `disabled:cursor-not-allowed` pra deixar claro que não vai responder durante carregamento.
- Campos faculdade/curso marcados como "(opcional)" no label.

---

## Leva 06 — 2026-05-01 (mesmo dia)

**Objetivo:** corrigir o bug "todo perfil novo nasce PRO + com dashboard de organizador".

### O que estava acontecendo

1. **Auto-PRO via URL**: link da seção Pricing apontava pra `/login?plan=pro`, e o `LoginContent` lia `initialPlan` e setava `isPro: initialPlan === "pro"`. Resultado: qualquer um que clicasse em "virar fiel" no card Pro nascia já como PRO sem pagar.
2. **Dashboard pra todo mundo**: dropdown do user na navbar mostrava o link "dashboard" (`/gerenciar`) sem checar `isPro` ou `isOrganizer`.
3. **CTA do plano Organizador caía direto no dashboard**: card "organizer" do Pricing tinha `href: "/gerenciar"` — sem cadastro, sem fluxo, ia direto pra área PRO.

### Correções

- **`app/login/LoginContent.tsx`**: removido o `isPro: initialPlan === "pro"` em ambos `handleSubmit` e `handleGoogle`. Toda nova conta nasce com `isPro: false, isOrganizer: false`. Aviso visual pro user que veio com `?plan=pro` foi reescrito de "plano PRO selecionado" pra **"cadastre primeiro · ative PRO depois"** — honesto sobre não ter checkout real ainda.
- **`components/navbar.tsx`**: dropdown do user agora condicional:
  - Se `isPro || isOrganizer` → mostra link **"dashboard"** pra `/gerenciar`.
  - Caso contrário → mostra link **"virar PRO"** pra `/#planos` com badge "upgrade".
- **`components/sections/pricing.tsx`**: card "organizer" agora aponta pra `/organizadores` (a landing PRO) em vez de `/gerenciar`. CTA virou "saber mais".

### Nota pra usuários antigos

Quem criou conta ANTES dessa correção pode ter `isPro: true` salvo no localStorage. Pra reverter, basta deslogar e cadastrar de novo, ou abrir o DevTools → Application → Local Storage → apagar a chave `partyrank_user`.

---

## Leva 07 — 2026-05-01 (mesmo dia)

**Objetivo:** consertar o bug "clico em reivindicar e a conta desloga".

### O que estava acontecendo

CTA "reivindicar página" do plano Verificada (e similares Solo/Oficial) sempre apontava pra `/login?mode=cadastrar`. Como `/login` é fullscreen no `ConditionalChrome` (esconde a navbar), parecia que o usuário tinha sido deslogado — quando na verdade só tinha sido **enviado pro form de cadastro mesmo já estando logado**.

### Correções

#### Novo componente: `app/organizadores/PlanCTA.tsx`
Botão client auth-aware. Lê o user via `getUser()` + `onAuthChange` e decide o que fazer ao clicar conforme intent + estado:

- **`browse`** (festa Aberta): comportamento padrão, vai pra `/festas`. Não precisa de auth.
- **`official`** (festa Oficial): mailto pro time. Não precisa de auth.
- **`claim`** (festa Verificada) e **`solo`** (plano Solo):
  - Não logado → redireciona pra `/login?mode=cadastrar&intent=...`
  - Logado mas não-organizador → marca a conta como `isOrganizer: true` via `setUser({ ...user, isOrganizer: true })` e redireciona pra `/gerenciar`.
  - Logado e já organizador → vai direto pra `/gerenciar`.
- Label do botão se adapta ao estado (`"reivindicar página"` → `"ativar página"` quando logado → `"ir pro dashboard"` se já é organizador).

#### `app/organizadores/page.tsx`
- Cada `tier.cta` agora tem campo `intent`.
- O `<Link>` inline foi substituído por `<PlanCTA intent label href variant />`.
- CTAs do Solo e Oficial reorganizados pra usar a mesma mecânica (Solo virou intent claim-like; Oficial continua mailto via `intent="official"`).

#### `app/login/LoginContent.tsx`
- Lê o query param `intent` da URL.
- Se `intent === "claim" || intent === "solo"`, marca `isOrganizer: true` no cadastro e redireciona pra `/gerenciar` em vez de `/`.
- Aviso visual no topo do form se o usuário veio com `intent=claim` ou `intent=solo`, deixando claro que está se cadastrando como organizador.

### Resultado
Agora se você estiver logado e clicar em "reivindicar página":
- A conta NÃO desloga.
- O botão **na hora** ativa `isOrganizer` no seu user e te leva pra `/gerenciar` — sem passar pelo cadastro.

Se NÃO estiver logado, vai pro cadastro normal e a conta criada já nasce como organizador.

## Leva 08 — 2026-05-02

**Objetivo:** dar tratamento de "cena" parallax ao site (igual a bola de disco do hero), com camadas foreground/background, scroll-driven motion e mascotes temáticos por seção.

### O que entrou

#### 1. Primitivo `<Scene>` + `<Layer>` (`components/scenes/scene.tsx`)
- `Scene` cria contexto com `scrollYProgress` (via framer-motion `useScroll`, offset start-end → end-start) e `mouseX`/`mouseY` normalizados ao centro do container, suavizados com `useSpring`.
- `Layer` consome o contexto e aplica parallax combinado (scroll + mouse) via `useTransform` num único `translate3d`. `depth` (0=front, 1=back) drive os defaults; `scrollSpeed` e `mouseStrength` permitem override.
- `SceneFront` é wrapper relativo pra texto/copy fixo em cima das camadas.
- `useSceneContext()` permite componentes filhos lerem mouse/scroll (ex.: tilt 3D do troféu/estatueta).

#### 2. `DancefloorScene` — home, entre `<MegaMarquee>` e `<Ranking>`
- 6 camadas: gradient indigo/magenta → smoke clouds animadas → laser beams oscilando → DJ booth silhueta com truss + spotlights + figura com headphones → multidão dançando (14 silhuetas com sway loop, ~33% com braços pra cima) → vinil PartyRank rotacionando + sparkle particles.
- Copy: "onde a noite começa" + selo `ao vivo · pista lotada`.
- Paleta: magenta/violeta dominante, lasers em rosa/violeta/cyan/âmbar.

#### 3. `StadiumScene` — topo de `/ligas`
- Cena substitui o h1 da página antiga (h1 "o título da noite SP" agora vive na cena).
- 6 camadas: gradient escuro → arquibancadas em tiers concêntricos (4 níveis, com ponto-multidão) → 4 holofotes coloridos pulsando → 3 bandeiras das ligas (Universitária violeta/fuchsia, Clubs pink/orange, Coletivos emerald/teal) tremulando via path animation → troféu dourado focal com tilt 3D no mouse + shine sweep + sparkles ao redor → confetti dourado/violeta/pink.
- Copy: "placar oficial · temporada 2026" + texto descritivo abaixo (continua na seção, não na cena).

#### 4. `RedCarpetScene` — topo de `/premios`
- Cena também assume o h1 ("o oscar da noite SP" continua, agora com cena por trás).
- 6 camadas: gradient borgonha/dourado → cortina de veludo com folds + faixa dourada no topo → flashes de paparazzi (10 pontos com pulse aleatório, escalas grandes) → cones de spotlight de cima → tapete vermelho em perspectiva trapezoidal com cordas e postes dourados → estatueta dourada (corpo + braços segurando rolo de filme + base com placa "FESTA DO ANO") com tilt 3D + shine sweep → confetti dourado/vermelho.
- Copy: eyebrow "prêmio partyrank · janeiro 2027" no overlay.

#### 5. Wiring
- `app/page.tsx`: `<DancefloorScene />` inserida entre `<MegaMarquee />` e `<Ranking />`.
- `app/ligas/page.tsx`: `<StadiumScene />` inserida no topo (full-bleed), header da página perdeu o h1 (que vive na cena agora) — mantém eyebrow + descrição + leader cards.
- `app/premios/page.tsx`: `<RedCarpetScene />` no topo, mesma reestruturação de header.

### Decisões de design

- **SVG, não canvas/Three.js**: cenas são SVG inline + framer-motion. Decisão pra escala, performance, diff visual (todo SVG é texto — fácil ajustar côr/forma sem ferramenta externa) e zero dep adicional. A bola de disco continua em Three.js no `WebGLBackground` — não compete porque ela só vive no hero.
- **Mouse parallax desktop-only de fato**: em touch, mouse motion values ficam em 0 — cenas continuam funcionando só com scroll parallax + idle animations. Sem código de feature detection.
- **`mix-blend-screen`** nos lasers e spotlights pra eles "iluminarem" as camadas atrás sem mascarar.
- **Mask top/bottom** em cada cena com gradient pro `bg-background` — emendar com seções vizinhas sem corte duro.
- **Copy curta dentro da cena** (eyebrow + h1 + 1 frase) — descrições mais longas continuam na seção logo abaixo.

### O que NÃO entrou

| Item | Motivo |
|---|---|
| `prefers-reduced-motion` guard | Decidido deixar pra próxima leva — iterar primeiro no visual antes de bloquear quem desativa motion. |
| Cena na `/organizadores` | Não pediu. Página já tem a seção "marketplace PRO" carregada visualmente — aguardar feedback. |
| Cena no `<CTA>` da home (afterparty / sunrise) | Cogitada na proposta, não entrou pra primeira leva — espera feedback primeiro. |
| Substituir o axolote por mascotes específicos por cena | Decidido manter o axolote como mascote oficial canto inferior + objetos focais por cena (vinil, troféu, estatueta). |
| Otimização de bundle (lazy-load SVG das cenas) | SVG inline não pesa o suficiente pra preocupar agora. |

### Status do build
- Dev server **rodando** em `http://localhost:3000`, ready em ~1s.
- `/`, `/ligas`, `/premios` retornam HTTP 200.
- Apenas os warnings pré-existentes do Tailwind sobre `duration-[1200ms]` / `ease-[cubic-bezier(...)]` aparecem no log — não são desta leva.
- Não rodou `tsc --noEmit` formal — Next dev compilou sem erros, mas pode ter type warnings escondidos. Próxima leva inclui type-check.

### Arquivos criados nesta leva
- `components/scenes/scene.tsx`
- `components/scenes/dancefloor-scene.tsx`
- `components/scenes/stadium-scene.tsx`
- `components/scenes/red-carpet-scene.tsx`

### Arquivos modificados nesta leva
- `app/page.tsx` (insere DancefloorScene)
- `app/ligas/page.tsx` (insere StadiumScene + remove h1 da página, fica na cena)
- `app/premios/page.tsx` (insere RedCarpetScene + remove h1 da página, fica na cena)

### Como reverter
- Cada cena é um componente isolado em `components/scenes/`. Pra desativar uma:
  - Home: remover `<DancefloorScene />` de `app/page.tsx`.
  - Ligas: remover bloco `<div className="pt-24..."><StadiumScene /></div>` do início de `LigasPage` e restaurar o `<h1>` original no header.
  - Prêmios: remover bloco da `RedCarpetScene` e restaurar `<h1>` em `PremiosPage`.

---

## Leva 09 — 2026-05-02 (mesmo dia, depois da Leva 08)

**Objetivo:** corrigir o desencaixe da Leva 08 e substituir o axolote por um mascote de respeito.

### Diagnóstico do feedback

Davi reportou: *"as cenas ficaram legais em si mas não combinaram com o site, parece desconexo"* + *"queria que usasse essa inteligência para fazer um mascote melhor e de respeito"*.

O problema das cenas (pista/estádio/tapete) não foi qualidade — foi tom. O site é editorial-institucional (lowercase + serif italic + dark Forbes-da-noite) e as cenas vieram com vocabulário visual de "festa kawaii brilhante" (smoke neon saturado, multidão dançando, troféu cartoon, paparazzi piscando). Apareceu como **outra marca pregada em cima**.

Decisão: reverter as cenas inteiras e gastar a "inteligência de craft" no mascote.

### O que foi feito

#### 1. Reversão completa da Leva 08
- **`app/page.tsx`**: removido `<DancefloorScene />` (volta a sequência original Hero → Stories → MegaMarquee → Ranking).
- **`app/ligas/page.tsx`**: removida a `<StadiumScene />` e restaurado o `<h1>` original "placar das ligas".
- **`app/premios/page.tsx`**: removida a `<RedCarpetScene />` e restaurado o `<h1>` original "o oscar da noite SP".
- **Pasta `components/scenes/` deletada** inteira (scene.tsx primitivo, dancefloor-scene.tsx, stadium-scene.tsx, red-carpet-scene.tsx).
- **Cache `.next` limpa** após reversão pra eliminar referências fantasma.

#### 2. Mascote nova: **O Curador** (substitui o axolote)
- **Conceito**: figura silhueta de paletó + gola alta + capuz, sem rosto, com **visor neon horizontal** no lugar dos olhos. Segura uma **prancheta digital** com "ranking ao vivo" (linhas que pulsam).
- **Por que funciona com o tom**: monocromática (preto/grafite + 1 accent que muda com o tom da mensagem), heráldica, sem fofura, presença contida. Lê como **porteiro de club hi-end + crítico do New Yorker** — alguém que **julga**.

#### 3. Implementação técnica
- **`components/acid-mascot.tsx` reescrito por dentro** mantendo o nome do export (`AcidMascot`) e toda a engrenagem externa intacta:
  - `pickMessage()` continua escolhendo a mensagem por path/auth/PRO/organizador.
  - Lógica de `bubbleOpen`, dismiss timer, `localStorage.partyrank_mascot_dismissed`, evento `onAuthChange` — tudo preservado.
  - `Tone` (violet/amber/emerald/rose) ganhou campos `hex` + `soft` (rgba glow) pra alimentar o accent do Curador via CSS variables (`--curator-accent`, `--curator-glow`).
- **Tipo `AxoPose` substituído por `CuratorPose`** com 7 estados: `idle`, `attentive`, `present`, `nod`, `seal`, `urgent`, `off`. Mensagens existentes foram remapeadas:
  - `ingresso-festa` → `urgent` (visor pisca rápido, sweep acelerado)
  - `virar-organizador` → `present` (prancheta levantada, dois braços)
  - `cadastro` → `nod` (figura inclina/bow loop)
  - `virar-pro` → `seal` (selo PR aparece pulsando na prancheta)
  - `festas-semana` → `idle` (visor sweep lento)
- **SVG novo (200×260 viewBox)**: paths customizados pra capuz + colarinho alto + lapela em V + braço com prancheta + sombra de chão. `<defs>` com `linearGradient` pro tecido + `radialGradient` pro vão escuro do rosto + rim light no ombro.
- **Visor animado** via framer-motion: rect bright que faz sweep horizontal de 63→127 (velocidade muda por pose). Tickmarks fixos. No `urgent`, opacidade pulsa em sync.
- **Prancheta animada**: 5 linhas de "ticker" cuja largura oscila (efeito de ranking se atualizando). Selo "PR" circular aparece com scale+rotate quando pose=`seal`.
- **Pin de lapela** (small dot) glow no accent — pequeno mas é o detalhe que fecha a vibe heráldica.

### O que NÃO entrou

| Item | Motivo |
|---|---|
| Curador "olhando pro cursor" | Idle vai pulando o visor à esquerda/direita já dá presença; cursor-tracking exige listener global e quebra perf no idle. Avaliar se Davi pedir. |
| Variantes B (Lince) e C (Mariposa) | Davi delegou a escolha — fui no Curador (Opção A) por casar mais direto com "respeito" + editorial. |
| `prefers-reduced-motion` | Próxima leva — vale aplicar ao mascote inteiro. |
| Cenas refeitas em tom monocromático editorial | Decisão foi reverter, não retrabalhar. Se Davi quiser algo decorativo de seção depois, parte do zero alinhando com o tom do Curador. |

### Status do build
- Dev server **rodando** em `http://localhost:3000`, ready em ~880ms após cache wipe.
- Todas as rotas testadas (HTTP 200): `/`, `/ligas`, `/premios`, `/organizadores`, `/festas`.
- Apenas os warnings pré-existentes do Tailwind (`duration-[1200ms]` / `ease-[cubic-bezier(...)]`) e o aviso `punycode` deprecado do Node — não são desta leva.

### Como ver o Curador funcionando

1. **Idle (logado, PRO)**: home `/` → mascote no canto inferior direito, accent **emerald**, visor sweep lento.
2. **Nod (não logado)**: abrir aba anônima → accent **violet**, figura faz reverência leve.
3. **Seal (logado, sem PRO)**: logar com conta normal → accent **violet**, selo "PR" pulsa na prancheta.
4. **Present (logado, sem isOrganizer, em /organizadores ou /premios)**: accent **amber**, prancheta sobe e dois braços a seguram.
5. **Urgent (em /festa/[slug])**: abrir qualquer festa individual → accent **rose**, visor pisca rapidíssimo.

### Arquivos modificados nesta leva
- `components/acid-mascot.tsx` (reescrito por dentro — Curador no lugar do Axo, lógica externa preservada)
- `app/page.tsx` (revertido)
- `app/ligas/page.tsx` (revertido)
- `app/premios/page.tsx` (revertido)

### Arquivos deletados nesta leva
- `components/scenes/scene.tsx`
- `components/scenes/dancefloor-scene.tsx`
- `components/scenes/stadium-scene.tsx`
- `components/scenes/red-carpet-scene.tsx`
- (pasta `components/scenes/` removida inteira)

### Como reverter pro axolote (se Davi não curtir o Curador)
- O arquivo `components/acid-mascot.tsx` foi reescrito; recuperar do histórico do RELATORIO antes desta leva exigiria reconstruir o axolote (Levas 01-07 referenciam mas não colaram código). Se for o caso, próxima leva volta ao axolote a partir do material em `~/Downloads/mascote party rank/` (Axo Mascot.html, axo.jsx).

---

### Pasta de ideias (anexa)

- `ideias/README.md` — índice
- `ideias/01-premios-ranking.md` — Prêmio anual (rascunho → refletido em `/premios`)
- `ideias/02-placar-institucional.md` — Placar das Ligas (aprovada → refletido em `/ligas` e home)
- `ideias/03-hall-da-fama.md` — adiada
- `ideias/04-rankings-verticais.md` — aprovada (não implementada nesta leva)
- `ideias/05-marketplace-pro-fornecedores.md` — aprovada → refletido em `/organizadores`
