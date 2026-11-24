# Hábitos+

Projeto acadêmico em Vue.js para gerenciamento de hábitos.

## Funcionalidades desta etapa

- Login mock com validação e sessão em `localStorage`.
- Listagem de hábitos com dados mockados.
- Busca e filtro por categoria.
- Rota de detalhe protegida (`/habitos/:id`).
- Redirecionamento para o login e retorno para a rota solicitada.
- Menu de navegação, logout e página 404.
- Navegação com Vue Router usando histórico do navegador.

## Rodando o frontend

```bash
npm install
npm run dev
```

O Vite informa a URL local no terminal, normalmente `http://localhost:5173`.

## Eventos do campus

O frontend consome a API REST separada em `../api`. A variável `VITE_API_URL` está configurada como `http://localhost:3001` no `.env`, que não é versionado.

- `/eventos`: listagem com estados de carregamento, vazio e erro.
- `/eventos/:id`: detalhes e formulário de inscrição.
- Apenas a camada `api/` conhece `fetch`, URL e status HTTP.

Inicie a API conforme `../api/README.md` e depois execute `npm run dev` neste diretório.

## Documentação do projeto

- `AGENTS.md`: regras do projeto.
- `ROTAS.md`: mapa de rotas.
- `ESTRUTURA.md`: módulos funcionais.
- `ESBOCOS.md`: esboços em texto das telas desta etapa.
