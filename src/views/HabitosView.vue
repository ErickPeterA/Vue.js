<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { habitosMock } from '../data/habitos.js'

const route = useRoute()
const router = useRouter()

const busca = ref('')
const filtro = ref('Todos')

const categorias = ['Todos', ...new Set(habitosMock.map((habito) => habito.categoria))]

const habitosFiltrados = computed(() => {
  const termo = busca.value.toLowerCase().trim()

  return habitosMock.filter((habito) => {
    const bateCategoria = filtro.value === 'Todos' || habito.categoria === filtro.value
    const bateBusca = !termo || `${habito.nome} ${habito.descricao}`.toLowerCase().includes(termo)
    return bateCategoria && bateBusca
  })
})

const detalhe = computed(() => {
  if (!route.params.id) return null
  const id = Number(route.params.id)
  if (!Number.isInteger(id) || id <= 0) return undefined
  return habitosMock.find((habito) => habito.id === id)
})

function fecharDetalhe() {
  router.push('/habitos')
}
</script>

<template>
  <section class="habitos-page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Visão geral</p>
        <h1>Seus hábitos</h1>
        <p>Acompanhe o ritmo da semana e descubra onde vale colocar mais energia.</p>
      </div>
      <button class="secondary-button" type="button" @click="busca = ''; filtro = 'Todos'">
        Limpar filtros
      </button>
    </div>

    <div class="summary-grid" aria-label="Resumo dos hábitos">
      <article class="summary-card">
        <span>Total</span>
        <strong>{{ habitosMock.length }}</strong>
        <small>hábitos acompanhados</small>
      </article>
      <article class="summary-card">
        <span>Em dia</span>
        <strong>{{ habitosMock.filter((h) => h.status === 'Em dia').length }}</strong>
        <small>mantendo a constância</small>
      </article>
      <article class="summary-card attention">
        <span>Atenção</span>
        <strong>{{ habitosMock.filter((h) => h.pontuacao < 70).length }}</strong>
        <small>podem melhorar esta semana</small>
      </article>
    </div>

    <div class="toolbar">
      <div class="search-wrap">
        <label for="busca">Buscar hábito</label>
        <input id="busca" v-model="busca" type="search" placeholder="Ex.: caminhada" />
      </div>

      <div class="filter-wrap">
        <span>Categoria</span>
        <div class="filter-buttons" aria-label="Filtrar por categoria">
          <button
            v-for="categoria in categorias"
            :key="categoria"
            type="button"
            :class="{ active: filtro === categoria }"
            @click="filtro = categoria"
          >
            {{ categoria }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="habitosFiltrados.length" class="habit-grid">
      <article v-for="habito in habitosFiltrados" :key="habito.id" class="habit-card">
        <div class="habit-card-top">
          <span class="category-chip">{{ habito.categoria }}</span>
          <span :class="['status-chip', { warning: habito.pontuacao < 70 }]">{{ habito.status }}</span>
        </div>
        <h2>{{ habito.nome }}</h2>
        <p>{{ habito.descricao }}</p>
        <div class="progress-row">
          <div>
            <span>Progresso</span>
            <strong>{{ habito.pontuacao }}%</strong>
          </div>
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" :style="{ width: `${habito.pontuacao}%` }"></div>
          </div>
        </div>
        <div class="habit-card-footer">
          <span>{{ habito.meta }}</span>
          <RouterLink :to="`/habitos/${habito.id}`">Ver detalhe</RouterLink>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <strong>Nenhum hábito encontrado.</strong>
      <p>Tente limpar a busca ou selecionar outra categoria.</p>
    </div>

    <div v-if="route.params.id" class="detail-backdrop" @click.self="fecharDetalhe">
      <aside class="detail-panel" aria-live="polite">
        <button class="close-button" type="button" aria-label="Fechar detalhe" @click="fecharDetalhe">×</button>

        <template v-if="detalhe">
          <span class="category-chip">{{ detalhe.categoria }}</span>
          <h2>{{ detalhe.nome }}</h2>
          <p>{{ detalhe.descricao }}</p>
          <dl>
            <div><dt>Meta</dt><dd>{{ detalhe.meta }}</dd></div>
            <div><dt>Pontuação</dt><dd>{{ detalhe.pontuacao }}%</dd></div>
            <div><dt>Status</dt><dd>{{ detalhe.status }}</dd></div>
          </dl>
          <p class="detail-note">Este detalhe usa dados mockados, conforme permitido nesta etapa.</p>
        </template>

        <template v-else>
          <p class="eyebrow">Hábito não encontrado</p>
          <h2>Não foi possível abrir este hábito.</h2>
          <p>Confira o endereço ou volte para a lista.</p>
          <button class="primary-button" type="button" @click="fecharDetalhe">Voltar para hábitos</button>
        </template>
      </aside>
    </div>
  </section>
</template>
