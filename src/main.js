import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { useSessaoStore } from './features/autenticacao/store/sessao.js'
import './styles.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const sessao = useSessaoStore(pinia)
if (sessao.token) {
  try { await sessao.restaurar() } catch (erro) {
    if (erro.status !== 0 && erro.status !== 401) console.error('Falha ao restaurar a sessão.')
  }
}

app.use(router).mount('#app')
