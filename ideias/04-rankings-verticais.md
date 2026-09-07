# 04 — Rankings Verticais (DJs, Line-ups, Venues, Organizadores)

**Status:** aprovada
**Autor da ideia:** Davi (pivot da proposta de Cobertura Editorial)
**Data:** 2026-05-01

## Resumo

Família de rankings paralelos rodando o mesmo motor de pontuação — não só festa, mas **tudo no ecossistema da noite SP**: DJs, line-ups, venues, organizadores. Cada vertical é produto separado, mesma marca.

## Por que troca o "Editorial" como próximo passo

- **Custo operacional zero** — dado fala sozinho, não precisa pessoa escrevendo todo dia.
- **Auto-distribuição** — DJ bem ranqueado posta no Insta dele = marketing grátis.
- **Coerência total com a tese da marca** ("PartyRank ranqueia tudo").
- **Resolve problema real**: pessoa escolhe festa pelo line-up.

## Os rankings desta família

| Vertical | O que ranqueia | Valor pro usuário |
|---|---|---|
| 🎧 **Rank de DJs** | DJs que tocam nas festas | Decide que festa ir pelo line-up |
| 🎚️ **Rank de Line-ups** | Festa com line-up mais forte do mês | Decisão de compra |
| 🏛️ **Rank de Organizadores (geral)** | Top cruzando ligas | "Quem é o mais quente?" |
| 🏟️ **Rank de Venues** | Casas/clubs mais bem avaliados | Escolher entre 2 festas no mesmo dia |
| 📈 **Em Alta / Em Baixa** | Quem subiu/caiu | Dinâmica narrativa |

## Mecânica do Rank de DJs (o mais novo)

### Cálculo
Cada DJ pontua quando toca:
- Pontos = `nota_da_festa × peso_do_papel`
- Pesos: Headline ×1.0 / Co-headline ×0.7 / Opening ×0.4 / Residente ×0.3
- Soma o ano. Top 50 do semestre.

### Cortes derivados
- Top 50 geral
- Top 10 por gênero (eletrônica, funk, samba, hip-hop, rock)
- DJ Revelação (estreante alto)
- Em Alta (subiu mais nas últimas 4 semanas)

### Página do DJ (portfólio público)
- Histórico de festas + nota recebida em cada
- Posição atual no ranking
- Selos: "Headline 10x", "Top 10 Eletrônica 1º Sem 2026"
- Próximas festas confirmadas (link pra ingresso)
- Botão "Quero ver tocar" — sinal de demanda
- **Botão "Contato"** mostrando Insta/agência (sem intermediar — Marketplace PRO faz isso na ideia 05)

## Highlights Automáticos (substitui editorial humano)

Sistema gera frases curtas automaticamente quando ranking muda:
- *"DJ Marky ultrapassou Vintage Culture e assume a liderança da Eletrônica."*
- *"Mamba Negra emplacou 3 DJs no Top 10 do mês."*
- *"Audio bate FGV em pontuação líquida pela primeira vez no ano."*

Manchete sem redator. Dado vira narrativa.

## Pré-requisitos

### Modelagem de dado
- Estender `Party` com `lineup: Array<{ djSlug, role: "headline" | "co-headline" | "opening" | "resident" }>`
- Criar tipo `DJ` com `slug, name, genre, city, image, bio`
- Criar tipo `Venue` com `slug, name, address, capacity, image`
- Mockar 30–50 DJs e popular line-ups das festas existentes em `mock-data.ts`

## Riscos

- **Tabela morta sem narrativa** → mitigado pelos Highlights Automáticos.
- **DJ ranking gameable** (atlética enche line-up de DJ amigo) → mitigado pelo cálculo: pontos vêm da NOTA DA FESTA, não da presença sozinha. Festa ruim = DJ pontua pouco.
- **Risco de virar marketplace de booking** → resolvido na ideia 05: portfólio público é neutro, contratação é restrita à área PRO.

## Implementação — fases

### Fase 1 (visual, dá pra fazer com mock)
- Modelagem de DJ + Venue no `mock-data.ts`
- Rota `/djs` com Top 50
- Página `/djs/[slug]` (portfólio do DJ)
- Highlights Automáticos calculados a partir do mock
- Bloco "DJ em Alta" na home

### Fase 2 (depois)
- Rank de Line-ups, Venues, Organizadores Geral
- Filtros por gênero/cidade
- Comparador (DJ A vs DJ B)

### Fase 3 (com tração)
- Botão "Quero ver tocar" como sinal de demanda real
- Integração com agenda real do DJ (próximas festas confirmadas)

## Relação com outras ideias

- **Casa com 02 (Placar das Ligas)** — mesmo motor de pontuação, aplicado a outro objeto.
- **Pré-requisito de 05 (Marketplace PRO)** — portfólio público do DJ alimenta o perfil PRO de contratação.
- **Substitui ideia anterior de Cobertura Editorial** — não morre completamente, mas vira bônus pontual no futuro (matérias específicas pra Hall da Fama, prêmio anual etc), nunca como motor.
