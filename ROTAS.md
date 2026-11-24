| Rota | Tela | Parâmetros | Protegida |
| --- | --- | --- | --- |
| `/` | Home (redireciona para Eventos) | — | não |
| `/eventos` | Lista de eventos do campus | — | não |
| `/eventos/:id` | Detalhe e inscrição no evento | `id` | não |
| `/login` | Login | — | não |
| `/habitos` | Hábitos | — | não |
| `/habitos/:id` | Detalhe do hábito dentro da tela Hábitos | `id` | sim |
| `/:pathMatch(.*)*` | 404 | caminho inválido | não |
