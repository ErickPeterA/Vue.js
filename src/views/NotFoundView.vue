<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found">
    <p class="error-code">404</p>
    <h1>Essa página não existe.</h1>
    <p>O endereço pode estar incorreto ou a página pode ter sido movida.</p>
    <RouterLink class="primary-button link-button" to="/habitos">Voltar para hábitos</RouterLink>
  </section>
</template>
