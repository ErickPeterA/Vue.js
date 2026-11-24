import { requisitar } from '../../../api/http.js'

export function criarInscricao(dados) {
  return requisitar('/inscricoes', { method: 'POST', body: JSON.stringify(dados) })
}
