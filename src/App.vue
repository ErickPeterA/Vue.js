<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { sessao } from './autenticacao/sessao.js'

const router = useRouter()

const autenticado = computed(() => Boolean(sessao.token.value))

function sair() {
  sessao.sair()
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/habitos" aria-label="Ir para hábitos">
        <span class="brand-mark" aria-hidden="true">✓</span>
        <span>Hábitos+</span>
      </RouterLink>

      <nav class="nav" aria-label="Navegação principal">
        <RouterLink to="/habitos">Hábitos</RouterLink>
        <RouterLink v-if="!autenticado" to="/login">Entrar</RouterLink>
        <button v-else class="nav-button" type="button" @click="sair">Sair</button>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>
