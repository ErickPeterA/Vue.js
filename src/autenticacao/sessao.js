import { ref } from 'vue'
import { entrar as autenticar } from '../api/auth-api.js'

const CHAVE_TOKEN = 'habitos-token'
const CHAVE_USUARIO = 'habitos-usuario'

function lerUsuario() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIO))
  } catch {
    return null
  }
}

const token = ref(localStorage.getItem(CHAVE_TOKEN) || '')
const usuario = ref(lerUsuario())

function salvarSessao(novoToken, novoUsuario) {
  token.value = novoToken
  usuario.value = novoUsuario
  localStorage.setItem(CHAVE_TOKEN, novoToken)
  localStorage.setItem(CHAVE_USUARIO, JSON.stringify(novoUsuario))
}

async function entrar(email, senha) {
  const resposta = await autenticar(email, senha)
  salvarSessao(resposta.token, resposta.usuario)
  return resposta.usuario
}

function sair() {
  token.value = ''
  usuario.value = null
  localStorage.removeItem(CHAVE_TOKEN)
  localStorage.removeItem(CHAVE_USUARIO)
}

export const sessao = { usuario, token, entrar, sair }
