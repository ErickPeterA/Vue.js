import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HabitosView from '../views/HabitosView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const estaAutenticado = () => Boolean(localStorage.getItem('habitos-session'))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/habitos',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/habitos',
      name: 'habitos',
      component: HabitosView,
    },
    {
      path: '/habitos/:id',
      name: 'habito-detalhe',
      component: HabitosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !estaAutenticado()) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  return true
})

export default router
