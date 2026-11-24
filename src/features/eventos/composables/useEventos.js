import { computed, onMounted, ref } from 'vue'
import { listarEventos } from '../api/eventos-api.js'

export function useEventos() {
  const dados = ref([])
  const carregando = ref(false)
  const erro = ref('')
  const vazio = computed(() => !carregando.value && !erro.value && dados.value.length === 0)

  async function carregar() {
    carregando.value = true
    erro.value = ''
    try { dados.value = await listarEventos() } catch (falha) {
      dados.value = []
      erro.value = falha.message
    } finally { carregando.value = false }
  }

  onMounted(carregar)
  return { dados, carregando, erro, vazio, carregar }
}
