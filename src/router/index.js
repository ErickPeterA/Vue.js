import { createRouter, createWebHistory } from 'vue-router'
import { useSessaoStore } from '../features/autenticacao/store/sessao.js'
import EventoDetalheView from '../features/eventos/views/EventoDetalheView.vue'
import EventosView from '../features/eventos/views/EventosView.vue'
import HabitosView from '../views/HabitosView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', redirect: '/eventos' },
    { path: '/eventos', name: 'eventos', component: EventosView },
    { path: '/eventos/:id', name: 'evento-detalhe', component: EventoDetalheView, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/habitos', name: 'habitos', component: HabitosView },
    { path: '/habitos/:id', name: 'habito-detalhe', component: HabitosView, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
  scrollBehavior() { return { top: 0 } },
})
router.beforeEach((to) => {
  const sessao = useSessaoStore()
  if (to.meta.requiresAuth && !sessao.token) return { name: 'login', query: { redirect: to.fullPath } }
  return true
})
export default router
