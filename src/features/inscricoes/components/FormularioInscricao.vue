<script setup>
import { nextTick, reactive, ref } from 'vue'
import { criarInscricao } from '../api/inscricoes-api.js'

const props = defineProps({ eventoId: { type: Number, required: true } })
const formulario = reactive({ nome: '', email: '' })
const erros = reactive({ nome: '', email: '' })
const enviando = ref(false)
const mensagem = ref('')
const tipoMensagem = ref('')
const nomeInput = ref(null)
const emailInput = ref(null)

function validarCampo(campo) {
  const valor = formulario[campo].trim()
  if (campo === 'nome') erros.nome = !valor ? 'Nome é obrigatório.' : valor.length < 3 ? 'Nome deve ter pelo menos 3 caracteres.' : ''
  else erros.email = !valor ? 'E-mail é obrigatório.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) ? 'Informe um e-mail válido.' : ''
  return !erros[campo]
}

async function focarPrimeiroErro() {
  await nextTick()
  if (erros.nome) nomeInput.value?.focus()
  else if (erros.email) emailInput.value?.focus()
}

async function enviar() {
  if (enviando.value) return
  mensagem.value = ''
  if (!validarCampo('nome') || !validarCampo('email')) {
    validarCampo('nome'); validarCampo('email')
    return focarPrimeiroErro()
  }
  enviando.value = true
  try {
    await criarInscricao({ eventoId: props.eventoId, nome: formulario.nome.trim(), email: formulario.email.trim() })
    mensagem.value = 'Inscrição realizada com sucesso!'
    tipoMensagem.value = 'sucesso'
    formulario.nome = ''; formulario.email = ''; erros.nome = ''; erros.email = ''
  } catch (falha) {
    tipoMensagem.value = 'erro'
    if (falha.status === 400) {
      erros.nome = falha.campos.nome || ''; erros.email = falha.campos.email || ''; mensagem.value = falha.message
      await focarPrimeiroErro()
    } else if (falha.status === 409) {
      erros.email = 'Este e-mail já está inscrito neste evento.'; mensagem.value = 'Você já possui uma inscrição neste evento.'
      await focarPrimeiroErro()
    } else mensagem.value = falha.message
  } finally { enviando.value = false }
}
</script>

<template>
  <form class="registration-form" novalidate @submit.prevent="enviar">
    <div class="form-heading"><p class="eyebrow">Garanta sua vaga</p><h2>Faça sua inscrição</h2><p>Preencha seus dados. A inscrição é gratuita.</p></div>
    <div class="field-group">
      <label for="inscricao-nome">Nome completo</label>
      <input id="inscricao-nome" ref="nomeInput" v-model="formulario.nome" type="text" autocomplete="name" :aria-invalid="Boolean(erros.nome)" :aria-describedby="erros.nome ? 'erro-nome' : undefined" @blur="validarCampo('nome')">
      <p v-if="erros.nome" id="erro-nome" class="field-error" role="alert">{{ erros.nome }}</p>
    </div>
    <div class="field-group">
      <label for="inscricao-email">E-mail</label>
      <input id="inscricao-email" ref="emailInput" v-model="formulario.email" type="email" autocomplete="email" :aria-invalid="Boolean(erros.email)" :aria-describedby="erros.email ? 'erro-email' : undefined" @blur="validarCampo('email')">
      <p v-if="erros.email" id="erro-email" class="field-error" role="alert">{{ erros.email }}</p>
    </div>
    <button class="primary-button" type="submit" :disabled="enviando">{{ enviando ? 'Enviando inscrição...' : 'Confirmar inscrição' }}</button>
    <p v-if="mensagem" class="form-message" :class="tipoMensagem" role="status">{{ mensagem }}</p>
  </form>
</template>
