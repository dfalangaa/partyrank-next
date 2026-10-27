# 00 — Inbox de ideias

Bloco de notas corrido. Ideia entra aqui bruta, sem formalidade.
Quando amadurece, vira arquivo numerado próprio e sai desta lista.

**Como usar:** escreve em cima, sem medo. Uma linha já vale.

---

## 2026-09-09 — sessão de brainstorm (2 sócios novos)

Contexto da sessão: direção escolhida = **lado organizador / monetização**.
Davi tem acesso direto a vários organizadores (atlética, club, coletivo).
Um sócio propôs "app só pro organizador".

### Decisão de embalagem (resolve o pedido do sócio sem pagar o preço)

App separado custa dois códigos, dois deploys, dois logins — e quebra o dado
compartilhado entre ranking e painel. O mesmo resultado sai de:

- rota `/studio` + `manifest.json` próprio → **PWA instalável**
- ícone no celular, push, abre direto no painel, sem navegador aparente
- mesma base de código, mesmo banco

Nativo fica como fase 2, se e quando a retenção justificar.

---

## Frente 1 — Organizador (o que dá grana sem depender de audiência)

### I1 · Memória institucional da atlética ⭐
**A dor que ninguém resolve:** diretoria de atlética troca todo ano. O
conhecimento da festa vai embora com a turma que sai — quanto custou o som, qual
segurança foi ruim, que horário o público encheu, quanto sobrou.

PartyRank guarda o histórico de edições: a diretoria nova abre e vê a festa do
ano passado inteira. Orçamento real, fornecedor usado, o que atrasou.

Por que é forte: lock-in que cresce com o tempo (ano 2 vale mais que ano 1),
ninguém faz, e o custo de construir é baixo — é leitura do dado que o painel
já coleta.

### I2 · Modo Noite (operação durante a festa) ⭐
Hoje isso acontece em grupo de WhatsApp. A hora de maior dor e zero ferramenta.

- check-in de fornecedor ("som chegou?", com hora)
- escala de equipe por turno, quem tá na portaria agora
- registro de incidente com timestamp
- contador de público por portaria
- lista de contatos de emergência numa tela

Barato de fazer (formulário + hora + lista). E tudo que entra aqui alimenta o
recap automaticamente.

### I3 · Recap pós-festa em 1 página ⭐
Fecha o loop e é o artefato que faz o organizador voltar.

Orçamento previsto vs real, onde estourou, avaliação de cada fornecedor,
público por hora, o que atrasou. Página compartilhável — o organizador manda
pra diretoria, pro patrocinador, pra faculdade.

É também o que justifica cobrar listing fee **sem precisar de audiência**:
o valor entregue é o relatório, não a visibilidade.

### I4 · Caderno de preços de SP (benchmark de fornecedor) ⭐⭐
O ativo mais defensável da lista. Sai de graça do orçamento que os
organizadores já preenchem no painel, agregado e anonimizado:

> "som pra 1.000 pessoas em SP: R$ 6k–11k · mediana R$ 8,2k"

Por que é forte:
- ninguém tem esse dado — nem Sympla, nem Eventbrite
- melhora sozinho conforme mais gente usa (efeito rede de verdade)
- alimenta a ideia 05 (marketplace) sem precisar de transação/escrow
- vira conteúdo de marketing e vira argumento de venda na mesma hora

### I5 · Orçamento que já nasce preenchido
O organizador cria a festa dizendo tipo + público esperado, e o painel já monta
o orçamento estimado por categoria, puxado do benchmark (I4). Ele ajusta em vez
de começar da folha em branco. Transforma o painel de "formulário" em
"consultor".

---

## Frente 2 — Usuário (hoje subdesenvolvido)

### I6 · "Vou nessa" em grupo ⭐
**Não é selo de presença** (essa foi descartada — não dá pra provar que foi).
É **decisão**: o grupo de amigos combina junto onde vai na sexta.

Link compartilhável, sem login pesado: "tô dentro / tô fora / me convence".
A dor real do universitário não é colecionar badge, é combinar com a galera —
hoje isso vive em print de story colado no grupo do WhatsApp.

Bônus: gera **dado de intenção** antes da festa. Isso é ouro pro organizador
(quantas pessoas sinalizaram) e é o que liga os dois lados do produto.

### I7 · Alerta de lote
Segue atlética / club / DJ → push quando abre lote ou sai line-up.
Baixo custo, valor óbvio, e é o que constrói a audiência que o listing fee
precisa pra valer algo.

---

## Frente 3 — Distribuição (você é o de marketing)

### I8 · O ranking se posta sozinho
Toda semana o ranking gera automaticamente o carrossel / story pronto pra
publicar — imagem, legenda, @ dos organizadores marcados.

O produto cospe o conteúdo em vez de você fabricar conteúdo à mão. Custo quase
zero e resolve distribuição, que é o gargalo real.

---

## Frente 4 — Sociedade (não é feature, é a decisão mais importante)

### I9 · Dividir as três frentes
Com 3 pessoas dá pra rodar venda consultiva **em paralelo** ao build, o que
sozinho era impossível:

| Frente | O que faz |
|---|---|
| Produto | constrói o painel / PWA |
| Organizador | conversa, fecha, faz onboarding humano |
| Conteúdo | ranking, Instagram/TikTok, audiência |

Definir isso antes de distribuir equity. Sem frente dona, tudo cai no Davi de
novo.

---

## Ideias cruas (sem desenvolver)

- Selo "fornecedor verificado" — reputação vinda da avaliação pós-job, não de pagamento
- Tabela de comparação de duas festas na mesma data (usuário decide entre as duas)
- Exportar a festa em PDF pra prestação de contas da atlética / faculdade
- Canal de WhatsApp como interface do painel (organizador não quer abrir site)
- Pré-cadastro de fornecedor pela indicação do próprio organizador ("quem você usa?")

---

## Não trazer de volta

- **Selo "Eu fui" / badge de presença** — descartada em 2026-05-01. Não dá pra
  provar presença; qualquer feature de coleção que dependa de auto-declaração
  cai no mesmo problema.

---

## 2026-09-09 — divisão de papéis (definida)

| Quem | Frente |
|---|---|
| Davi | **único que programa** + produto |
| Sócio 2 | venda / relacionamento com organizador |
| Sócio 3 | conteúdo / marketing |

**O que isso muda:** o orçamento de construção é uma pessoa só. Então tudo que
for pra roadmap tem que caber no Davi sozinho — e tem que ser demoável, porque
quem vende não é quem constrói. Feature que só faz sentido depois de 6 meses de
build não serve pra essa configuração.

**A favor:** venda consultiva e conteúdo passam a rodar **em paralelo** ao
build, o que era impossível sozinho. O gargalo deixa de ser distribuição e vira
"o que existe pra vender".

### Achado técnico (2026-09-09)
O PWA **já está montado**: `app/manifest.ts`, `public/sw.js`,
`components/install-prompt.tsx`, `components/sw-register.tsx`.

Logo o "app do organizador" = um segundo manifest com `start_url: "/studio"` e
ícone próprio. É configuração, não projeto novo. Custo perto de zero.

---

## 2026-09-15 — rodada 2: ideias que se auto-distribuem

Filtro usado: **um dev só, zero verba.** Então a ideia boa não é a que tem mais
feature — é a que coloca outra pessoa distribuindo por você. Todas abaixo saem
de coisa que já existe no repo.

### I10 · Lista e ranking de promoter ⭐⭐⭐
**A ideia que entra no fluxo de dinheiro sem tocar em dinheiro.**

Venda de ingresso é caríssima (gateway, split, antifraude, chargeback). Mas o
que realmente move festa universitária não é o checkout — é a **lista**. E lista
é formulário puro.

- cada promoter ganha um link próprio: `partyrank.com/festa/x?p=joao`
- ele vê em tempo real quantos entraram pelo dele
- a atlética vê o ranking dos promoters dela
- o nome entra na lista de portaria, exportável

Por que é a mais forte da lista:
- **o promoter é a pessoa mais motivada a divulgar do ecossistema inteiro** —
  ele ganha por cabeça. Dá um ranking pra ele e ele divulga o PartyRank sozinho,
  todo fim de semana, sem você pagar nada
- custo de construir ≈ 1/10 da venda de ingresso, e resolve dor comparável
- gera dado de conversão real, que é o que faz o recap e o benchmark valerem
- é o pé na porta pro ingresso depois, se um dia valer a pena

### I11 · A página da festa vira o "link na bio" ⭐⭐
Atlética não tem site. Tem Instagram e um link de venda feio.

Se a página do PartyRank for melhor que qualquer coisa que ela monta sozinha —
line-up, mapa, contagem regressiva, lote atual, galeria da edição passada,
lista de promoter — ela **põe o link na bio de graça**.

Distribuição invertida: o organizador te distribui pro público dele. Você para
de comprar audiência e passa a pegar carona na que já existe. E `festa/[slug]`
já está construída — é questão de deixar boa o bastante pra ganhar da alternativa.

### I12 · Kit de divulgação que se gera sozinho ⭐⭐
Toda festa precisa das mesmas peças: anúncio, line-up, contagem regressiva,
"últimos ingressos", "é hoje". Hoje isso é Canva na madrugada ou designer pago.

O painel gera todas a partir do dado que já está lá, na identidade da atlética.
Baixa em PNG pronto pro story.

Duas coisas de uma vez:
1. valor entregue imediato — o organizador sente no primeiro dia
2. **cada peça leva a marca PartyRank pra dentro do Instagram da atlética**

Distribuição embutida no produto, não em campanha. E usa o que o projeto já tem
de melhor, que é o craft visual.

### I13 · Termômetro da noite (mapa que pulsa) ⭐⭐
O mapa já existe. Falta o tempo real.

Sexta 23h, a pergunta é uma só: **onde tá bombando agora?** Usuário sinaliza
"tá cheio / tá fraco / tá morrendo" e o sinal **decai em 30 minutos**. O mapa
pulsa com a noite.

Sacada de design: por ser sinal **efêmero**, não precisa provar presença — não
é credencial, é fofoca com prazo de validade. Isso contorna exatamente o motivo
pelo qual o selo "Eu fui" foi descartado.

É o Waze da noite de SP. É a coisa mais printável e mais compartilhável que o
produto pode ter, e não existe em lugar nenhum.

### I14 · Simulador "quanto custa fazer sua festa" ⭐⭐
Página pública, 5 perguntas (tipo, público, região, data, estrutura) → devolve
o orçamento estimado por categoria.

Três funções ao mesmo tempo:
- **isca de lead perfeita** pro sócio de vendas (quem simula está organizando)
- **conteúdo viral** pronto pro sócio de marketing
- **alimenta o caderno de preços** (I4) com cada simulação

E o mais bonito: começa com chute informado e fica mais preciso sozinho
conforme os painéis reais forem preenchendo orçamento.

### I15 · Score de execução do organizador
O ranking hoje mede a **festa**. Ninguém mede se a produtora **entrega**: fila
de 2h, bar que acabou, atraso de line-up, cancelamento.

Score de execução é o que faz o organizador *querer* estar bem ranqueado — ou
seja, é o que transforma o ranking em produto pago, e não em vaidade.

⚠️ Delicado: nota pública negativa gera atrito e risco jurídico. Começar só com
critério objetivo e verificável (atrasou? cancelou? mudou de local?), nunca com
texto livre de terceiro.

### I16 · Bolão da semana
O PartyRank não tem motivo pra você abrir numa terça. Bolão tem: palpite em
quem vai ser o top da semana, acerto vira ponto.

Retenção semanal barata, sem depender de provar presença. E dá ao sócio de
conteúdo um formato recorrente pronto ("fecha o bolão hoje").

### I17 · Galeria que vende a próxima edição
Foto de festa morre no rolo. Galeria por festa, colaborativa.

O ângulo que importa não é nostalgia do usuário — é que **o organizador usa a
galeria do ano passado pra vender a edição desse ano**. Prova social que ele
hoje monta na mão. Vira argumento de venda do listing.

---

### O fio condutor desta rodada

As quatro melhores (I10, I11, I12, I13) têm a mesma propriedade: **alguém que
não é você fica interessado em espalhar.** Promoter divulga pra ganhar cabeça,
organizador divulga porque a página é o site dele, a arte circula porque ele
precisa postar, e o termômetro circula porque é print de grupo.

Com um dev só e zero verba, isso vale mais que qualquer feature.
