import { sessao } from '../autenticacao/sessao.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function requisitar(caminho, opcoes = {}) {
  const headers = new Headers(opcoes.headers)
  if (opcoes.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  if (sessao.token.value) headers.set('Authorization', `Bearer ${sessao.token.value}`)

  const resposta = await fetch(`${API_URL}${caminho}`, { ...opcoes, headers })
  const corpo = await resposta.json().catch(() => ({}))

  if (!resposta.ok) {
    if (resposta.status === 401) {
      sessao.sair()
      if (window.location.pathname !== '/login') {
        const retorno = `${window.location.pathname}${window.location.search}${window.location.hash}`
        window.location.assign(`/login?redirect=${encodeURIComponent(retorno)}`)
      }
    }
    const erro = new Error(corpo.message || 'Não foi possível concluir a solicitação.')
    erro.status = resposta.status
    throw erro
  }

  return corpo
}
