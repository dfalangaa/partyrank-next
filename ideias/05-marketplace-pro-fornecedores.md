# 05 — Marketplace PRO + Listing Fee + Direcionamento

**Status:** aprovada
**Autor da ideia:** Davi
**Data:** 2026-05-01

## Resumo em uma linha

Área PRO restrita a organizadores parceiros — quem **paga listing fee** pra colocar a festa no PartyRank ganha acesso a **marketplace de fornecedores** (estrutura + equipe humana + DJs) e **direcionamento consultivo** da plataforma.

## A grande sacada

Não é SaaS mensal nem fee de ingresso isolados — é **pacote por festa**. Atlética paga uma vez por evento e recebe:
1. Página oficial no PartyRank (selo verificado, destaque)
2. Acesso ao marketplace PRO de fornecedores curados
3. Direcionamento consultivo (playbook, conta-gerente light, sugestões de fornecedor)
4. Dashboard PRO durante a festa
5. Recap e dado pós-festa

## Modelo de cobrança híbrido

| Componente | Valor | O que cobre |
|---|---|---|
| **Listing fee** | R$ 500–2.000 por festa (escala por tamanho) | Acesso à página oficial, marketplace, direcionamento, selos |
| **Fee de ingresso** | 5–8% sobre vendido | Operação de venda, antifraude, splits, repasse |
| **Comissão marketplace** | 10–15% sobre cada job de fornecedor contratado | Curadoria, escrow, dispute resolution |
| **Concierge premium (opcional)** | R$ 5k–20k por festa | PartyRank monta a equipe inteira (Fase 3) |
| **Dashboard PRO mensal (upgrade)** | R$ 800–2.500/mês | Atlética grande, faz 8+ festas/ano, ganha desconto em listing |

## Tipos de fornecedor no marketplace

- **Estrutura**: som, luz, palco, arena, climatização, gerador
- **Operação**: segurança, brigada, ambulância, limpeza, banheiro químico
- **Bar/comida**: bartender, food trucks, distribuidor de bebida, copo retornável
- **Equipe humana / talento**: DJs, hosts, fotógrafo, vídeo-maker, recepção, modelo de marca
- **Marketing**: social media, criação de arte, gestor de tráfego pago

## Direcionamento consultivo (a parte diferencial)

Quando atlética compra listing, dispara fluxo automático:

1. **Briefing** — formulário com: público esperado, orçamento, tema, data, tipo (calourada, formatura, edição-marca etc).
2. **Playbook entregue** — checklist + cronograma + benchmarks de festa similar (extraídos do dado interno).
3. **Sugestão automática de fornecedores** do marketplace que casam com orçamento e tipo.
4. **Conta-gerente light** — 1 reunião de kickoff + canal aberto até a festa.
5. **Pós-festa** — relatório com dado real (vendas, NPS, comparação com benchmark) + plano pra próxima edição.

**Esse é o diferencial frente ao Sympla.** Sympla é canal de venda. PartyRank vira **parceiro estratégico**.

## Por que é forte

1. **Receita potencial 3× maior que fee de ingresso isolado** — combina listing + fee + comissão marketplace.
2. **Lock-in pesado** — atlética que usa uma vez não volta a fazer festa sem PartyRank. Vira ERP de festa.
3. **Resolve dor real** — atlética pequena gasta semanas catando fornecedor. Marketplace cura isso em 1 hora.
4. **Não compromete neutralidade do ranking público** — área PRO é restrita, ranking público é cego pra contratações.
5. **Vantagem competitiva única** — Sympla, Eventbrite e ingresso.com não têm marketplace de fornecedor. Campo aberto.
6. **Reaproveita o que já existe** — `app/gerenciar/` já tem aba "suppliers". Evolução natural, não feature solta.

## Conta de padaria (festa média 1.000 ingressos × R$ 80)

| Receita | Valor |
|---|---|
| Listing fee | R$ 1.500 |
| Fee ingresso (7%) | R$ 5.600 |
| Comissão marketplace (15% sobre R$ 120k em fornecedores) | R$ 18.000 |
| **Total por festa Oficial** | **R$ 25.100** |

10 festas Oficiais/mês = **R$ 251k/mês** (vs R$ 56k só com fee de ingresso).

Concierge premium (em festas grandes) acrescenta R$ 5–20k extra por festa.

## Riscos

1. **Listing fee cria expectativa de valor entregue.** Se a página, marketplace e direcionamento forem fracos, vira "tô pagando pra existir" → queima a marca. Mitigação: entregar valor real desde a primeira festa Oficial — mesmo com poucos fornecedores no início, fazer onboarding humano impecável.

2. **Curadoria de fornecedor.** Fornecedor ruim machuca a marca PartyRank. Mitigação: critério rigoroso de entrada + sistema público de avaliação pós-job + remoção rápida em caso de problema.

3. **Conflito de interesse com ranking de DJ.** Se DJ paga pra estar no marketplace, há tentação de ranquear melhor. Mitigação: **separação técnica e contratual** — ranking público é cego pra contratações na área PRO. Critério público, dado público, auditável.

4. **Operacional pesado.** Escrow, dispute, suporte. Mitigação: começar simples (só catálogo + lead) e escalar pra transacional só quando volume justificar.

5. **Atlética pequena pode não ter dinheiro pro listing.** Mitigação: festa pequena entra na camada **Verificada** (grátis, sem benefícios PRO) e cresce pra Oficial quando justificar. Não força entrada paga.

## Implementação — fases

### Fase 1 — Catálogo público + onboarding manual (curto prazo)
- Página `/pro/marketplace` (mockada): listagem de fornecedores credenciados.
- Página `/organizadores` (landing): explica as 3 camadas, listing fee, marketplace, direcionamento.
- Botão "Quero colocar minha festa" → formulário de contato.
- Onboarding 100% humano (PartyRank atende, fecha listing, envia playbook por email).

### Fase 2 — Catálogo restrito + transação básica (médio prazo)
- Auth real, área restrita só pra organizador Oficial.
- Filtros, busca, comparativo de fornecedores.
- "Solicitar contato" enviado pela plataforma.
- Pagamento de listing fee online.

### Fase 3 — Marketplace transacional + Concierge (longo prazo)
- Contratação completa pela plataforma. Pagamento escrow.
- Concierge: PartyRank monta a equipe pro organizador, executa.
- Avaliação pós-job, dispute resolution.

## Relação com outras ideias

- **Reforça 04 (Rankings Verticais)** — DJ tem perfil público (ranking) + perfil PRO (contratação). Os dois lados se alimentam.
- **É o "como" da Prioridade #5 do roadmap** (Funil pro Organizador) — a página `/organizadores` que já estava no roadmap original ganha conteúdo claro: o que se compra com o listing fee.
- **Casa com Modelo de 3 Camadas (Prioridade #2 do roadmap)** — Aberto/Verificado/Oficial. Listing fee é o que diferencia Oficial.
- **NÃO interfere no ranking público** — separação sagrada.

## O que precisa estar pronto antes de cobrar de verdade

- [ ] Auth real
- [ ] Mecanismo de pagamento (listing fee + fee ingresso + repasse)
- [ ] Pelo menos 10–20 fornecedores credenciados
- [ ] Playbook escrito (PDF/notion)
- [ ] Pessoa pra fazer onboarding humano da Fase 1
- [ ] Critérios públicos de curadoria de fornecedor
- [ ] Termo de uso PRO com regras claras de neutralidade do ranking
