<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useSessaoStore } from './features/autenticacao/store/sessao.js'

const router = useRouter()
const sessao = useSessaoStore()
const autenticado = computed(() => Boolean(sessao.token))
function sair() { sessao.sair(); router.push('/login') }
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/eventos" aria-label="Ir para eventos">
        <span class="brand-mark" aria-hidden="true">C</span><span>Campus+</span>
      </RouterLink>
      <nav class="nav" aria-label="Navegação principal">
        <RouterLink to="/eventos">Eventos</RouterLink>
        <RouterLink to="/habitos">Hábitos</RouterLink>
        <RouterLink v-if="!autenticado" to="/login">Entrar</RouterLink>
        <button v-else class="nav-button" type="button" @click="sair">Sair</button>
      </nav>
    </header>
    <main><RouterView /></main>
  </div>
</template>
