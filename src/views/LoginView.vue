<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const formulario = reactive({
  email: '',
  senha: '',
})

const erros = reactive({
  email: '',
  senha: '',
})

const enviando = ref(false)
const mensagem = ref('')
const emit = defineEmits(['session-changed'])

function validar() {
  erros.email = ''
  erros.senha = ''

  if (!formulario.email) {
    erros.email = 'Informe seu e-mail.'
  } else if (!/^\S+@\S+\.\S+$/.test(formulario.email)) {
    erros.email = 'Digite um e-mail válido.'
  }

  if (!formulario.senha) {
    erros.senha = 'Informe sua senha.'
  } else if (formulario.senha.length < 6) {
    erros.senha = 'A senha precisa ter pelo menos 6 caracteres.'
  }

  return !erros.email && !erros.senha
}

async function entrar() {
  mensagem.value = ''

  if (!validar()) return

  enviando.value = true
  await new Promise((resolve) => setTimeout(resolve, 450))

  localStorage.setItem(
    'habitos-session',
    JSON.stringify({ email: formulario.email, criadoEm: new Date().toISOString() }),
  )
  emit('session-changed')

  const destino = typeof route.query.redirect === 'string' ? route.query.redirect : '/habitos'
  router.push(destino)
}
</script>

<template>
  <section class="login-page">
    <div class="login-copy">
      <span class="eyebrow">Sua rotina, mais clara</span>
      <h1>Transforme constância em progresso.</h1>
      <p>
        Entre para acompanhar seus hábitos, identificar o que precisa de atenção e
        manter o foco no que importa.
      </p>

      <div class="benefit-list" aria-label="Benefícios">
        <div><span>01</span><p>Metas simples de acompanhar.</p></div>
        <div><span>02</span><p>Visão rápida do seu desempenho.</p></div>
        <div><span>03</span><p>Feedback claro para melhorar a rotina.</p></div>
      </div>
    </div>

    <div class="login-card">
      <div class="card-heading">
        <p class="eyebrow">Bem-vindo de volta</p>
        <h2>Entrar na sua conta</h2>
        <p>Para esta versão acadêmica, qualquer e-mail válido e senha com 6 caracteres funciona.</p>
      </div>

      <form novalidate @submit.prevent="entrar">
        <div class="field-group">
          <label for="email">E-mail</label>
          <input
            id="email"
            v-model.trim="formulario.email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="voce@exemplo.com"
            :aria-invalid="Boolean(erros.email)"
            :aria-describedby="erros.email ? 'erro-email' : undefined"
          />
          <p v-if="erros.email" id="erro-email" class="field-error">{{ erros.email }}</p>
        </div>

        <div class="field-group">
          <label for="senha">Senha</label>
          <input
            id="senha"
            v-model="formulario.senha"
            name="senha"
            type="password"
            autocomplete="current-password"
            placeholder="Mínimo de 6 caracteres"
            :aria-invalid="Boolean(erros.senha)"
            :aria-describedby="erros.senha ? 'erro-senha' : undefined"
          />
          <p v-if="erros.senha" id="erro-senha" class="field-error">{{ erros.senha }}</p>
        </div>

        <p v-if="mensagem" class="form-message" role="status">{{ mensagem }}</p>

        <button class="primary-button" type="submit" :disabled="enviando">
          {{ enviando ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </section>
</template>
