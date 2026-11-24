<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { RouterLink } from 'vue-router'
import { useEventos } from '../composables/useEventos.js'

dayjs.locale('pt-br')
const { dados, carregando, erro, vazio, carregar } = useEventos()
const formatarData = (data) => dayjs(data).format('DD [de] MMMM [de] YYYY [às] HH:mm')
</script>

<template>
  <section aria-live="polite" :aria-busy="carregando">
    <div v-if="carregando" class="event-state loading-state" role="status">
      <span class="spinner" aria-hidden="true"></span><p>Carregando eventos do campus...</p>
    </div>
    <div v-else-if="erro" class="event-state error-state" role="alert">
      <h2>Não foi possível carregar os eventos</h2><p>{{ erro }}</p>
      <button class="secondary-button" type="button" @click="carregar">Tentar de novo</button>
    </div>
    <div v-else-if="vazio" class="event-state empty-state">
      <h2>Nenhum evento disponível</h2><p>Volte em breve para conferir a programação do campus.</p>
    </div>
    <div v-else class="event-grid">
      <article v-for="evento in dados" :key="evento.id" class="event-card">
        <p class="event-date">{{ formatarData(evento.data) }}</p>
        <h2>{{ evento.titulo }}</h2><p>{{ evento.descricao }}</p>
        <dl><div><dt>Local</dt><dd>{{ evento.local }}</dd></div><div><dt>Vagas</dt><dd>{{ evento.vagas }}</dd></div></dl>
        <RouterLink class="card-link" :to="`/eventos/${evento.id}`">Ver evento e inscrever-se</RouterLink>
      </article>
    </div>
  </section>
</template>
