| Rota | Tela | Parâmetros | Protegida |
| --- | --- | --- | --- |
| `/` | Home (redireciona para Hábitos) | — | não |
| `/login` | Login | — | não |
| `/habitos` | Hábitos | — | não |
| `/habitos/:id` | Detalhe do hábito dentro da tela Hábitos | `id` | sim |
| `/:pathMatch(.*)*` | 404 | caminho inválido | não |
