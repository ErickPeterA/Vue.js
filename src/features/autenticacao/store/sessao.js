import { defineStore } from 'pinia'
import { buscarMe, entrar as autenticar } from '../../../api/auth-api.js'

const CHAVE_TOKEN = 'campus-token'
const CHAVE_USUARIO = 'campus-usuario'
function lerUsuario() {
  try { return JSON.parse(localStorage.getItem(CHAVE_USUARIO)) } catch { return null }
}

export const useSessaoStore = defineStore('sessao', {
  state: () => ({ usuario: lerUsuario(), token: localStorage.getItem(CHAVE_TOKEN) || '' }),
  actions: {
    salvar(token, usuario) {
      this.token = token; this.usuario = usuario
      localStorage.setItem(CHAVE_TOKEN, token)
      localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario))
    },
    async entrar(email, senha) {
      const resposta = await autenticar(email, senha)
      this.salvar(resposta.token, resposta.usuario)
      return resposta.usuario
    },
    async restaurar() {
      if (!this.token) return null
      const resposta = await buscarMe()
      this.usuario = resposta.usuario
      localStorage.setItem(CHAVE_USUARIO, JSON.stringify(resposta.usuario))
      return resposta.usuario
    },
    sair() {
      this.usuario = null; this.token = ''
      localStorage.removeItem(CHAVE_TOKEN)
      localStorage.removeItem(CHAVE_USUARIO)
    },
  },
})
