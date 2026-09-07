# 02 — Placar das Ligas (rivalidade institucional)

**Status:** aprovada
**Autor da ideia:** PartyRank (proposta)
**Data:** 2026-05-01

## Resumo em uma linha

Vários **campeonatos paralelos** rolando o ano inteiro — atléticas brigam entre si, clubs brigam entre si, produtoras de rave brigam entre si. Cada liga tem sua tabela ao vivo e seu campeão.

## Por que ligas separadas (e não um placar único)

PartyRank cobre **4 categorias**: universitária, club, evento e rave. Comparar Audio Club com USP é pera com pera de outra árvore — públicos, preços, formato e calendário não batem. Um placar único viraria ranking sem sentido. **Múltiplas ligas resolvem:** cada nicho tem sua identidade, sua torcida e sua disputa.

## As 3 ligas + 1 categoria solta

| Liga | Quem disputa | Combustível da rivalidade |
|---|---|---|
| **Liga Universitária** | Atléticas e Ligas de faculdade (USP, Insper, FGV, Mack, PUC, ESPM...) | Faculdade × faculdade |
| **Liga dos Clubs** | Venues / casas noturnas (Audio, Bal, Fabrique, D-Edge, Lions...) | Casa × casa |
| **Liga dos Coletivos** | Produtoras de rave / eletrônica / open-air (Tribe, Warung, Tropikana, Mamba Negra...) | Produtora × produtora |
| **Eventos avulsos** | Festas pontuais, formaturas, rooftops one-off | NÃO entra no placar — só no ranking individual de festa |

## Como funciona (vale pra todas as ligas)

1. Cada festa tem nota (do ranking multi-eixo).
2. A nota da festa vira pontos pro organizador. Ex: festa 4.7 = 47 pts.
3. Pontos acumulam ao longo do semestre **dentro da liga**.
4. Cada liga tem sua tabela pública, atualizada a cada festa nova.
5. No fim do semestre: campeão da liga ganha selo permanente.

### Exemplos de tabela

```
LIGA UNIVERSITÁRIA — 1º SEMESTRE 2026
1.  USP        — 287 pts  (6 festas)
2.  Insper     — 271 pts  (5 festas)
3.  FGV        — 265 pts  (5 festas)
4.  Mackenzie  — 198 pts  (4 festas)

LIGA DOS CLUBS — 1º SEMESTRE 2026
1.  Audio       — 312 pts  (8 noites)
2.  D-Edge      — 289 pts  (7 noites)
3.  Bal Boutique — 254 pts  (6 noites)

LIGA DOS COLETIVOS — 1º SEMESTRE 2026
1.  Mamba Negra — 198 pts  (3 edições)
2.  Tropikana   — 187 pts  (4 edições)
3.  ODD         — 145 pts  (2 edições)
```

## Por que é forte pra marca

- **Continuidade.** Prêmio anual é pontual; o placar é diário. Razão pra abrir o app toda semana.
- **Rivalidade real e natural.** Insper × USP, Audio × D-Edge, Mamba × Tropikana — disputas que **já existem na cabeça do público**. PartyRank só dá o palco.
- **Cobertura ampla da marca.** Não é só festa de faculdade — todo público de noite SP se enxerga em alguma liga.
- **Atrai público trazendo público.** Cada nicho tem fãs militantes que querem ver seu clube/atlética/coletivo na ponta.
- **Organizador tem incentivo pra fazer festa MELHOR**, não só MAIS — quantidade não pesa, qualidade sim (média da nota).
- **Casa com o prêmio anual.** Placar = Brasileirão. Prêmio = Champions. Cobre o ano inteiro com narrativa.

## Regras de pontuação (proposta inicial)

### Cálculo base
- **Pontos por festa** = `nota_final × 10` (festa 4.7 → 47 pts).
- Empate decidido pela **média de nota** (premia consistência sobre volume).

### Multiplicadores (a discutir)
- **Estreante** (organizador novo na liga): ×1.2 — incentiva renovação.
- **Evento âncora do calendário** (calourada, aniversário do club, edição-marca do coletivo): ×1.1.
- **Festa Oficial** (camada parceira): SEM multiplicador — neutralidade do ranking é sagrada. Festa Verificada e Aberta pontuam igual desde que a nota seja válida.

### Desempate
1. Maior média de nota
2. Mais festas com nota ≥ 4.5
3. Mais votos totais

## Períodos

- **1º semestre:** 01/fev → 31/jul
- **2º semestre:** 01/ago → 31/jan
- **Tabela anual** = soma dos dois semestres → alimenta os prêmios "Universidade do Ano" / "Club do Ano" / "Coletivo do Ano".

## Riscos

1. **Organizador grande sempre vence.** USP tem mais atléticas, Audio tem mais noites — mais oportunidade de pontuar.
   *Mitigação:* divulgar tabela secundária por **média de nota** em paralelo. Ranking principal usa total + critério de desempate por média; ranking secundário inverte (média primeiro).
2. **Festa pequena boa fica invisível.**
   *Mitigação:* destaque "Festa Sub-100 da semana" / "Joia escondida" na home.
3. **Manipulação de votos pra subir na liga.**
   *Mitigação:* voto verificado quando check-in real chegar. Até lá: 1 voto/conta + captcha + regras públicas.
4. **Categoria "evento avulso" pode parecer cidadão de segunda classe.**
   *Mitigação:* prêmios próprios pro avulso ("Festa Avulsa do Ano", "Rooftop do Ano") — não entra no placar contínuo, mas tem seu lugar na premiação.

## Implementação — fases

### Fase 1 (MVP visual, dá pra fazer agora)
- Nova rota `/ligas` (ou `/placar`) com **3 tabelas**, uma por liga.
- Calcular pontos a partir do `mock-data.ts` existente: agrupar festas por organizador dentro da categoria, somar `rating × 10`.
- Card resumo "Líderes do Semestre" na home (1 destaque por liga).
- Página por organizador (atlética / club / coletivo): histórico de festas + posição na liga.

### Fase 2 (depois do ranking multi-eixo)
- Substituir `rating` único pelo score multi-eixo.
- Aplicar multiplicadores.
- Tabela atualiza em tempo real.

### Fase 3 (com check-in real)
- Voto verificado entra no cálculo.
- Selos automatizados.

## Relação com o resto do roadmap

| Depende de | Status |
|---|---|
| Modelo 3 camadas (Prioridade #2) | pendente |
| Página da Atlética/Club/Coletivo (Prioridade #3) | pendente — onde os selos vivem |
| Ranking multi-eixo (Prioridade #4) | pendente — pra ter "nota da festa" robusta |

## Próximos passos

1. ✅ Documentar (este arquivo).
2. Construir Fase 1: rota `/ligas` + seção na home.
3. Iterar visual com Davi.
4. Integrar com Prioridade #3 quando ela vier.
