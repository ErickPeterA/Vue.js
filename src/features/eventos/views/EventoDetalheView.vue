<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import FormularioInscricao from '../../inscricoes/components/FormularioInscricao.vue'
import { buscarEvento } from '../api/eventos-api.js'

dayjs.locale('pt-br')
const route = useRoute()
const evento = ref(null), carregando = ref(true), erro = ref('')
async function carregar() {
  carregando.value = true; erro.value = ''
  try { evento.value = await buscarEvento(route.params.id) } catch (falha) { erro.value = falha.status === 404 ? 'Evento não encontrado.' : falha.message }
  finally { carregando.value = false }
}
onMounted(carregar)
</script>

<template>
  <div class="event-detail-page">
    <RouterLink class="back-link" to="/eventos">← Voltar aos eventos</RouterLink>
    <div v-if="carregando" class="event-state loading-state" role="status"><span class="spinner" aria-hidden="true"></span><p>Carregando evento...</p></div>
    <div v-else-if="erro" class="event-state error-state" role="alert"><h1>{{ erro }}</h1><button class="secondary-button" type="button" @click="carregar">Tentar de novo</button></div>
    <div v-else class="event-detail-grid">
      <article class="event-detail-card"><p class="eyebrow">Evento do campus</p><h1>{{ evento.titulo }}</h1><p class="event-description">{{ evento.descricao }}</p>
        <dl class="event-facts"><div><dt>Data e horário</dt><dd>{{ dayjs(evento.data).format('DD [de] MMMM [de] YYYY [às] HH:mm') }}</dd></div><div><dt>Local</dt><dd>{{ evento.local }}</dd></div><div><dt>Vagas disponíveis</dt><dd>{{ evento.vagas }}</dd></div></dl>
      </article>
      <FormularioInscricao :evento-id="evento.id" />
    </div>
  </div>
</template>
