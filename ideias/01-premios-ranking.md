# 01 — Prêmio anual para o top do ranking

**Status:** rascunho
**Autor da ideia:** Davi
**Data:** 2026-05-01

## Ideia original

Quem ganhar o ranking do PartyRank das festas (top 1 ou top 3) recebe prêmios.
Objetivo: estimular engajamento do público e dos organizadores, dar peso real ao ranking.

> **Escopo:** PartyRank cobre 4 categorias — universitária, club, evento, rave. O prêmio não é só pra festa de faculdade. Cada liga/categoria tem seu campeão.

## Por que faz sentido para a marca

- Dá **stakes reais** ao ranking. Sem prêmio, o número é decoração. Com prêmio, vira disputa pública.
- Organizadores (atléticas, clubs, coletivos) passam a empurrar seu público pro PartyRank ("vota na gente") → distribuição orgânica gratuita.
- Vira evento anual com data fixa = pauta de imprensa = autoridade pra marca.
- Reforça o posicionamento "ranking confiável das festas de SP" — porque agora o ranking *vale* algo.

## Riscos a evitar

1. **Concurso de votos ≠ ranking de qualidade.** Se o critério for só "mais votada", festa grande sempre ganha. Não premia mérito, premia tamanho.
2. **Voto não-verificado é gameável.** Atlética pode criar contas falsas, mobilizar ex-alunos, manipular. Se vazar uma vez que houve fraude, a credibilidade da marca morre — e a marca *é* a credibilidade.
3. **Custo do prêmio.** Se PartyRank banca, é despesa. Se é só troféu simbólico, motivação fraca.
4. **Conflito de interesse.** Festa parceira (camada Oficial) não pode ter vantagem sobre festa só Verificada — isso destrói a neutralidade do ranking.

## Como deveria ser desenhado

### 1. Patrocinador banca o prêmio
Red Bull / vodka / banco digital / cervejaria. Não vira custo da plataforma, vira receita/co-marketing.
Patrocinador ganha exposição no público de noite SP (universitário, clubber, raver), PartyRank ganha autoridade.
Possível formato: "Festa do Ano 2026 apresentada por [Marca]".

### 2. Categorias múltiplas, não só "top 3 geral"
Distribui visibilidade e premia mérito, não só tamanho.

#### Prêmios por liga (alinhados ao Placar das Ligas — ideia 02)
- **Universidade do Ano** — campeão da Liga Universitária
- **Club do Ano** — campeão da Liga dos Clubs
- **Coletivo do Ano** — campeão da Liga dos Coletivos

#### Prêmios cruzando ligas (ranking individual de festa)
- **Festa do Ano** (geral, qualquer categoria)
- **Melhor Line-up**
- **Revelação do Ano** (organizador novo, qualquer liga)
- **Melhor Custo-Benefício**
- **Melhor Estrutura**
- **Festa do Povo** (puro voto popular, sem júri — pra não brigar com o prêmio principal)

#### Prêmios por nicho de formato
- **Melhor Calourada / Festa Universitária**
- **Melhor Rave / Open-air**
- **Melhor Rooftop / Pool**
- **Melhor Festa Avulsa** (eventos pontuais que ficam fora do placar contínuo — formaturas, one-offs, festivais)

### 3. Critério: voto popular + júri técnico
- Pesos: 50/50 ou 70/30 (popular/júri).
- Júri = curadoria PartyRank + jornalistas do meio + DJs reconhecidos + atléticas premiadas no ano anterior.
- Reduz gameabilidade e legitima o resultado.

### 4. Voto verificado quando o check-in existir
Quando a feature de check-in (NFC/QR na portaria) estiver pronta, só quem entrou na festa vota nela.
Mata fraude de raiz. Até lá: 1 voto por conta autenticada, captcha, regras públicas.

### 5. Estrutura do prêmio (camadas)
- Troféu físico
- Grana do patrocinador
- 1 ano de destaque na home do PartyRank
- Recap profissional pago (vídeo + galeria + matéria)
- **Selo permanente "Festa do Ano 2026"** na página da festa e da atlética — esse é o que mais vale a longo prazo

## Calendário sugerido

- **Indicações abertas:** novembro
- **Voto popular + julgamento do júri:** dezembro
- **Cerimônia / divulgação:** janeiro (vira ritual de início de ano letivo)

## O que precisa estar pronto antes

- [ ] Modelo de 3 camadas (Aberto / Verificado / Oficial) implementado — Prioridade #2 do roadmap.
- [ ] Ranking multi-eixo (line-up, público, estrutura, custo-benefício, segurança) — Prioridade #4 do roadmap. As categorias do prêmio derivam dos eixos.
- [ ] Página do Organizador (Atlética / Club / Coletivo) — Prioridade #3 do roadmap. É lá que o selo vive.
- [ ] Sistema de autenticação real e regras anti-fraude.
- [ ] Pelo menos 1 patrocinador fechado antes de anunciar publicamente.

## Próximos passos

1. Validar com Davi se o desenho acima faz sentido.
2. Esperar Prioridades #2, #3 e #4 do roadmap saírem.
3. Quando autenticação real estiver de pé, abrir conversa com possível patrocinador.
4. Modelar o sistema de votação anual no `mock-data.ts` pra prototipar a página de premiação.

## Notas / discussões

_(adicionar aqui conforme a ideia evoluir)_
