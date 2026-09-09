# AGENTS.md — Guia de desenvolvimento

## Visão do projeto

Este repositório contém um sistema de gerenciamento de hábitos desenvolvido integralmente em Vue.js. O objetivo é permitir que usuários autenticados cadastrem, acompanhem e avaliem seus hábitos, identificando aqueles que precisam ser melhorados.

O sistema deverá possuir autenticação, controle de acesso às áreas privadas e uma experiência simples para acompanhar a evolução de cada hábito.

## Referências obrigatórias

Antes de criar ou alterar funcionalidades, consulte estes documentos:

- `ESTRUTURA.md`: define a estrutura de páginas e módulos do projeto.
- `ROTAS.md`: define as rotas disponíveis, seus parâmetros e a necessidade de proteção.

Caso haja conflito entre uma implementação e esses documentos, preserve a estrutura e as rotas documentadas ou atualize a documentação junto com a alteração aprovada.

## Estrutura funcional

Os módulos principais definidos para a aplicação são:

- `src/autenticacao`: login, sessão do usuário, logout e proteção de rotas.
- `src/habitos`: listagem, criação, edição, remoção, detalhes e acompanhamento dos hábitos.
- `src/filtro`: filtros e formas de organização da lista de hábitos.
- `src/notificacao`: avisos, lembretes e mensagens de feedback ao usuário.

Mantenha cada responsabilidade no módulo correspondente. Componentes e lógicas compartilhadas devem ficar organizados de forma clara, sem duplicação desnecessária.

## Páginas e rotas

| Rota | Tela | Parâmetros | Protegida |
| --- | --- | --- | --- |
| `/` | Home | — | Não |
| `/login` | Login | — | Não |
| `/habitos` | Hábitos | — | Não |
| `/habitos/:id` | Detalhe do hábito | `id` | Sim |

Requisitos para as rotas:

- A rota `/habitos/:id` deve exigir usuário autenticado.
- Ao tentar acessar uma rota protegida sem sessão válida, o usuário deve ser redirecionado para `/login`.
- Depois do login, o usuário deve retornar à página solicitada quando possível.
- O parâmetro `id` deve ser validado antes de carregar ou alterar um hábito.
- Páginas inexistentes e hábitos não encontrados devem exibir um estado de erro amigável.

## Requisitos do produto

### Autenticação

- Disponibilizar tela de login em `/login`.
- Manter a sessão do usuário enquanto ela for válida.
- Oferecer logout e limpar corretamente os dados de sessão.
- Nunca expor senhas, tokens ou dados sensíveis em telas, logs ou repositório.

### Gerenciamento de hábitos

- Permitir visualizar os hábitos do usuário.
- Permitir cadastrar, editar e remover hábitos.
- Cada hábito deve ter informações suficientes para acompanhamento, como nome, descrição opcional, frequência/meta e status.
- Permitir registrar a realização ou pontuação de um hábito.
- Destacar hábitos com baixa pontuação, atrasados ou que precisam de melhoria.
- Exibir o detalhe de um hábito pela rota `/habitos/:id`.

### Filtros e feedback

- Permitir filtrar e/ou ordenar hábitos de maneira clara.
- Exibir feedback após ações importantes, como salvar, concluir, editar ou remover um hábito.
- Tratar carregamento, listas vazias e erros sem deixar a interface em estado ambíguo.

## Requisitos técnicos

- Desenvolver a interface e a lógica de apresentação em Vue.js.
- Usar componentes reutilizáveis e nomes claros para arquivos, componentes, funções e variáveis.
- Separar visualização, estado e acesso a dados de forma organizada.
- Não duplicar regras de negócio entre componentes.
- Validar dados de formulários no cliente e manter validação também no serviço/API quando existir backend.
- Usar rotas nomeadas ou constantes quando isso tornar a navegação mais segura e fácil de manter.
- Não adicionar dependências sem necessidade justificada.
- Manter `README.md`, `ESTRUTURA.md` e `ROTAS.md` atualizados quando uma mudança afetar seus conteúdos.

## Qualidade e experiência

- Priorizar interface responsiva, acessível e em português.
- Associar rótulos aos campos de formulário e garantir navegação por teclado.
- Exibir mensagens de erro acionáveis e compreensíveis.
- Confirmar ações destrutivas, como a exclusão de um hábito.
- Preservar os dados inseridos pelo usuário quando uma validação falhar, sempre que possível.
- Evitar alterações fora do escopo da tarefa atual.

## Critérios de aceite

Uma funcionalidade só deve ser considerada concluída quando:

1. Respeitar a estrutura e as rotas definidas neste projeto.
2. Funcionar para usuários autenticados e tratar corretamente os casos sem autenticação.
3. Possuir estados de carregamento, vazio e erro quando aplicável.
4. Validar entradas e não expor dados sensíveis.
5. For testada de forma compatível com a alteração realizada.
6. Tiver a documentação atualizada caso o comportamento, a estrutura ou as rotas tenham mudado.
