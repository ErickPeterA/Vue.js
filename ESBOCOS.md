# Esboços das telas implementadas

## 1. Login — `/login`

- Cabeçalho global com marca, link para Hábitos e acesso de sessão.
- Área de apresentação à esquerda com objetivo do sistema e três benefícios.
- Card de login à direita com e-mail, senha, validação de preenchimento/formato e botão Entrar.
- Ao autenticar, a sessão mock é guardada no `localStorage` e o usuário volta para a rota protegida solicitada, quando existir.
- Em telas pequenas, conteúdo e formulário ficam em uma única coluna.

## 2. Hábitos — `/habitos`

- Título, resumo da rotina e botão para limpar filtros.
- Três indicadores: total de hábitos, hábitos em dia e hábitos que precisam de atenção.
- Busca por texto e filtros por categoria.
- Cards com nome, descrição, meta, status e progresso.
- Estado vazio quando nenhum resultado corresponde aos filtros.
- Link de detalhe aponta para `/habitos/:id`; a rota é protegida e abre o detalhe dentro da mesma área, sem criar uma terceira tela principal.

## Estado de apoio — 404

- Qualquer rota não registrada mostra uma mensagem amigável e um botão para retornar a `/habitos`.
