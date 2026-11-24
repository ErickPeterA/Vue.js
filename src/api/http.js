import { useSessaoStore } from '../features/autenticacao/store/sessao.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function requisitar(caminho, opcoes = {}) {
  const sessao = useSessaoStore()
  const headers = new Headers(opcoes.headers)
  if (opcoes.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  if (sessao.token) headers.set('Authorization', `Bearer ${sessao.token}`)

  let resposta
  try { resposta = await fetch(`${API_URL}${caminho}`, { ...opcoes, headers }) } catch {
    const erro = new Error('Não foi possível conectar à API. Verifique se o servidor está ligado.')
    erro.status = 0
    throw erro
  }
  const corpo = await resposta.json().catch(() => ({}))
  if (!resposta.ok) {
    if (resposta.status === 401) {
      sessao.sair()
      if (window.location.pathname !== '/login') {
        const retorno = `${window.location.pathname}${window.location.search}${window.location.hash}`
        window.location.assign(`/login?redirect=${encodeURIComponent(retorno)}`)
      }
    }
    const erro = new Error(corpo.erro || 'Não foi possível concluir a solicitação.')
    erro.status = resposta.status
    erro.campos = corpo.campos || {}
    throw erro
  }
  return corpo
}
