import { requisitar } from './http.js'

export function entrar(email, senha) {
  return requisitar('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  })
}

export function registrar(dados) {
  return requisitar('/auth/registro', {
    method: 'POST',
    body: JSON.stringify(dados),
  })
}

export function buscarMe() {
  return requisitar('/auth/me')
}
