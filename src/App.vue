<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const sessionVersion = ref(0)

const autenticado = computed(() => {
  sessionVersion.value
  return Boolean(localStorage.getItem('habitos-session'))
})

function sair() {
  localStorage.removeItem('habitos-session')
  sessionVersion.value += 1
  router.push('/login')
}

function atualizarSessao() {
  sessionVersion.value += 1
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
      <RouterView v-slot="{ Component }">
        <component :is="Component" @session-changed="atualizarSessao" />
      </RouterView>
    </main>
  </div>
</template>
